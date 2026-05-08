import { BACKGROUND_OPTIONS, type BackgroundOption } from '@/lib/badge-config'
import { cn } from '@/lib/utils'
import { Check, Upload } from 'lucide-react'
import { ColorStopsEditor } from '@/components/ColorStopsEditor'

interface BackgroundSelectorProps {
  selected: BackgroundOption
  onSelect: (bg: BackgroundOption) => void
  mode: 'preset' | 'custom'
  onModeChange: (mode: 'preset' | 'custom') => void
  customColors: string[]
  onCustomColorsChange: (colors: string[]) => void
}

function getSwatchStyle(bg: BackgroundOption): React.CSSProperties {
  if (bg.type === 'solid') return { backgroundColor: bg.value }
  if (bg.type === 'gradient') return { background: bg.value }
  if (bg.type === 'image') {
    return { backgroundImage: `url(${bg.value})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
  }
  return { backgroundColor: '#fff', backgroundImage: bg.value, backgroundSize: '8px 8px' }
}

export function BackgroundSelector({
  selected,
  onSelect,
  mode,
  onModeChange,
  customColors,
  onCustomColorsChange,
}: BackgroundSelectorProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      onSelect({
        id: `custom-bg-${Date.now()}`,
        label: '自定义底图',
        type: 'image',
        value: dataUrl,
      })
    }
    reader.readAsDataURL(file)
    // 清空 input 以便重复上传同一文件
    e.target.value = ''
  }

  const isCustomUpload = selected.id.startsWith('custom-bg-')

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          底图
        </label>
        <div className="flex bg-secondary rounded-md p-0.5 text-[11px]">
          <button
            onClick={() => onModeChange('preset')}
            className={cn(
              "px-2.5 py-1 rounded transition-all duration-200",
              mode === 'preset'
                ? "bg-card text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            预设
          </button>
          <button
            onClick={() => onModeChange('custom')}
            className={cn(
              "px-2.5 py-1 rounded transition-all duration-200",
              mode === 'custom'
                ? "bg-card text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            自定义
          </button>
        </div>
      </div>

      {mode === 'preset' ? (
        <>
          <div className="grid grid-cols-8 gap-1.5">
            {BACKGROUND_OPTIONS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => onSelect(bg)}
                title={bg.label}
                className={cn(
                  "relative w-full aspect-square rounded-md border transition-all duration-200",
                  selected.id === bg.id
                    ? "border-foreground ring-1 ring-foreground/20 scale-110 z-10"
                    : "border-border hover:border-foreground/30 hover:scale-105"
                )}
                style={getSwatchStyle(bg)}
              >
                {selected.id === bg.id && (
                  <Check className="absolute inset-0 m-auto w-3 h-3 text-foreground/70" />
                )}
              </button>
            ))}
          </div>

          {/* 自定义上传底图 */}
          <label
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md border border-dashed cursor-pointer transition-colors',
              isCustomUpload
                ? 'border-foreground bg-secondary text-foreground'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {isCustomUpload && selected.type === 'image' ? (
              <img src={selected.value} alt="" className="w-6 h-6 rounded object-cover" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span className="text-[11px] flex-1">
              {isCustomUpload ? '已使用自定义底图，点击更换' : '上传自定义底图'}
            </span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </>
      ) : (
        <ColorStopsEditor colors={customColors} onChange={onCustomColorsChange} />
      )}
    </div>
  )
}
