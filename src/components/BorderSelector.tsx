import { BORDER_OPTIONS, DECORATION_OPTIONS, type BorderOption, type DecorationConfig, buildGradientBorderSvg } from '@/lib/badge-config'
import { cn } from '@/lib/utils'
import { ColorStopsEditor } from '@/components/ColorStopsEditor'
import { Eraser, Image as ImageIcon, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { removeBackground } from '@imgly/background-removal'

interface BorderSelectorProps {
  selected: BorderOption
  onSelect: (border: BorderOption) => void
  mode: 'preset' | 'custom'
  onModeChange: (mode: 'preset' | 'custom') => void
  customColors: string[]
  onCustomColorsChange: (colors: string[]) => void
  decoration: DecorationConfig
  onDecorationChange: (decoration: DecorationConfig) => void
}

type Tab = 'border' | 'decoration'

export function BorderSelector({
  selected,
  onSelect,
  customColors,
  onCustomColorsChange,
  decoration,
  onDecorationChange,
}: BorderSelectorProps) {
  const [tab, setTab] = useState<Tab>('border')
  const [isRemovingBg, setIsRemovingBg] = useState(false)
  const [removeProgress, setRemoveProgress] = useState(0)
  const [enableRemoveBg, setEnableRemoveBg] = useState(false)

  // 只有 SVG 边框支持颜色自定义
  const canCustomizeColor = !!selected.svg

  const handleMaterialUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (ev) => {
      const imageDataUrl = ev.target?.result as string

      if (enableRemoveBg) {
        setIsRemovingBg(true)
        setRemoveProgress(0)
        try {
          const processedBlob = await removeBackground(imageDataUrl, {
            progress: (_key, current, total) => {
              if (total > 0) {
                setRemoveProgress(Math.round((current / total) * 100))
              }
            },
          })
          const processedUrl = URL.createObjectURL(processedBlob)
          onDecorationChange({ ...decoration, imageUrl: processedUrl })
        } catch (error) {
          console.error('抠图失败:', error)
          onDecorationChange({ ...decoration, imageUrl: imageDataUrl })
        } finally {
          setIsRemovingBg(false)
          setRemoveProgress(0)
        }
      } else {
        onDecorationChange({ ...decoration, imageUrl: imageDataUrl })
      }
    }
    reader.readAsDataURL(file)
  }

  const clearDecoration = () => {
    if (decoration.imageUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(decoration.imageUrl)
    }
    onDecorationChange({ ...decoration, imageUrl: null })
  }

  const handleBorderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      onSelect({
        id: `custom-border-${Date.now()}`,
        label: '自定义边框',
        svg: '',
        imageUrl: dataUrl,
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const isCustomBorder = selected.id.startsWith('custom-border-')

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium tracking-wide text-muted-foreground">
          边框 & 装饰
        </label>
        {/* Tab 切换 */}
        <div className="inline-flex bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setTab('border')}
            className={cn(
              'px-3 py-1 text-[11px] rounded-md transition-colors',
              tab === 'border' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            )}
          >
            边框
          </button>
          <button
            onClick={() => setTab('decoration')}
            className={cn(
              'px-3 py-1 text-[11px] rounded-md transition-colors',
              tab === 'decoration' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            )}
          >
            装饰素材
          </button>
        </div>
      </div>

      {/* 边框 tab */}
      {tab === 'border' && (
        <>
          <div className="grid grid-cols-3 gap-2">
            {BORDER_OPTIONS.map((border) => {
              const previewSvg = border.svg && selected.id === border.id && customColors.length > 0
                ? buildGradientBorderSvg(border.svg, customColors, `prev-${border.id}`)
                : border.svg

              return (
                <button
                  key={border.id}
                  onClick={() => onSelect(border)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-200',
                    selected.id === border.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full relative overflow-hidden',
                    selected.id === border.id ? 'bg-primary-foreground/20' : 'bg-background border border-border'
                  )}>
                    {previewSvg && (
                      <svg
                        className="absolute inset-0"
                        width="32"
                        height="32"
                        viewBox="0 0 100 100"
                        dangerouslySetInnerHTML={{ __html: previewSvg }}
                      />
                    )}
                    {border.imageUrl && (
                      <img
                        src={border.imageUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium leading-tight text-center">
                    {border.label}
                  </span>
                </button>
              )
            })}
          </div>

          {canCustomizeColor && (
            <ColorStopsEditor colors={customColors} onChange={onCustomColorsChange} />
          )}

          {/* 自定义上传边框 */}
          <label
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md border border-dashed cursor-pointer transition-colors',
              isCustomBorder
                ? 'border-foreground bg-secondary text-foreground'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {isCustomBorder && selected.imageUrl ? (
              <img src={selected.imageUrl} alt="" className="w-6 h-6 rounded object-cover" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span className="text-[11px] flex-1">
              {isCustomBorder ? '已使用自定义边框，点击更换' : '上传自定义边框'}
            </span>
            <input type="file" accept="image/*" onChange={handleBorderUpload} className="hidden" />
          </label>
        </>
      )}

      {/* 装饰素材 tab */}
      {tab === 'decoration' && (
        <div data-layer="decoration" className="space-y-3">
          {/* 图层位置切换 */}
          <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
            <span className="text-[11px] text-muted-foreground">图层位置</span>
            <div className="inline-flex bg-background rounded-md p-0.5 border border-border">
              <button
                onClick={() => onDecorationChange({ ...decoration, layer: 'above' })}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] rounded transition-colors',
                  decoration.layer === 'above' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                )}
              >
                边框上
              </button>
              <button
                onClick={() => onDecorationChange({ ...decoration, layer: 'below' })}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] rounded transition-colors',
                  decoration.layer === 'below' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                )}
              >
                边框下
              </button>
            </div>
          </div>

          {/* 预设装饰素材 + 上传入口 */}
          <div className="grid grid-cols-3 gap-2">
            {DECORATION_OPTIONS.map((deco) => (
              <button
                key={deco.id}
                onClick={() => onDecorationChange({ ...decoration, imageUrl: deco.imageUrl })}
                className={cn(
                  'flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-200',
                  decoration.imageUrl === deco.imageUrl
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full relative overflow-hidden',
                  decoration.imageUrl === deco.imageUrl ? 'bg-primary-foreground/20' : 'bg-background border border-border'
                )}>
                  <img
                    src={deco.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-medium leading-tight text-center">
                  {deco.label}
                </span>
              </button>
            ))}

            {/* 上传自定义素材按钮（占一格） */}
            <label
              className={cn(
                'flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-200 cursor-pointer',
                isRemovingBg && 'opacity-60 cursor-not-allowed',
                'bg-secondary text-secondary-foreground hover:bg-accent border border-dashed border-border'
              )}
            >
              <div className="w-8 h-8 rounded-full relative overflow-hidden bg-background border border-border flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-[10px] font-medium leading-tight text-center">
                上传素材
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleMaterialUpload}
                className="hidden"
                disabled={isRemovingBg}
              />
            </label>
          </div>

          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              id="remove-bg-checkbox"
              checked={enableRemoveBg}
              onChange={(e) => setEnableRemoveBg(e.target.checked)}
              className="w-4 h-4 rounded border-border"
              disabled={isRemovingBg}
            />
            <label htmlFor="remove-bg-checkbox" className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1">
              <Eraser className="w-3 h-3" />
              上传时自动抠图（去除背景）
            </label>
          </div>

          {isRemovingBg && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">正在抠图...</span>
                <span className="text-muted-foreground">{removeProgress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${removeProgress}%` }}
                />
              </div>
            </div>
          )}

          {decoration.imageUrl && (
            <div className="relative border border-border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <img
                  src={decoration.imageUrl}
                  alt="素材预览"
                  className="w-12 h-12 rounded object-cover bg-background"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">装饰素材</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">已叠加到画面</p>
                </div>
                <button
                  onClick={clearDecoration}
                  className="p-1.5 hover:bg-accent rounded transition-colors"
                  title="移除装饰"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
