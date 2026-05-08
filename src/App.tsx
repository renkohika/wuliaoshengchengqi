import { useState, useRef } from 'react'
import { BadgePreview } from '@/components/BadgePreview'
import { SizeSelector } from '@/components/SizeSelector'
import { BackgroundSelector } from '@/components/BackgroundSelector'
import { BorderSelector } from '@/components/BorderSelector'
import { ImageUpload } from '@/components/ImageUpload'
import { ExportButton } from '@/components/ExportButton'
import {
  BADGE_SIZES,
  BACKGROUND_OPTIONS,
  BORDER_OPTIONS,
  type BadgeConfig,
  type LayerTransform,
} from '@/lib/badge-config'

type ActiveLayer = 'background' | 'border' | 'decoration' | 'image'

function App() {
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('image')

  const [config, setConfig] = useState<BadgeConfig>({
    size: BADGE_SIZES[1],
    background: BACKGROUND_OPTIONS[0],
    border: BORDER_OPTIONS[0],
    backgroundMode: 'preset',
    customBgColors: ['#7c3aed'],
    borderMode: 'preset',
    customBorderColors: ['#222222'],
    decoration: { imageUrl: null, layer: 'above' },
    bgTransform: { x: 0, y: 0, scale: BACKGROUND_OPTIONS[0].type === 'image' ? 1.25 : 1 },
    borderTransform: { x: 0, y: 0, scale: 1 },
    decoTransform: { x: 0, y: 0, scale: 1 },
    image: null,
    imageScale: 1,
    imageX: 0,
    imageY: 0,
  })

  const handleLayerTransformChange = (layer: ActiveLayer, t: LayerTransform) => {
    if (layer === 'background') setConfig((p) => ({ ...p, bgTransform: t }))
    else if (layer === 'border') setConfig((p) => ({ ...p, borderTransform: t }))
    else if (layer === 'decoration') setConfig((p) => ({ ...p, decoTransform: t }))
    else setConfig((p) => ({ ...p, imageX: t.x, imageY: t.y, imageScale: t.scale }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2.5">
          <img src="/logo.jpg" alt="千岛" className="w-7 h-7 rounded-md" />
          <h1 className="text-sm font-semibold tracking-tight text-foreground">
            吧唧无料生成器
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_420px] gap-6 md:gap-8">
          <div className="flex flex-col items-center justify-center min-h-[320px] md:min-h-[440px] rounded-xl bg-card border border-border p-6 md:p-8">
            <BadgePreview
              config={config}
              previewRef={previewRef}
              activeLayer={activeLayer}
              onLayerTransformChange={handleLayerTransformChange}
            />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="space-y-5">
              <SizeSelector
                selected={config.size}
                onSelect={(size) => setConfig((prev) => ({ ...prev, size }))}
              />
              <div className="h-px bg-border" />
              <div onPointerDown={() => setActiveLayer('background')}>
                <BackgroundSelector
                  selected={config.background}
                  onSelect={(background) => setConfig((prev) => ({
                    ...prev,
                    background,
                    bgTransform: { x: 0, y: 0, scale: background.type === 'image' ? 1.25 : 1 },
                  }))}
                  mode={config.backgroundMode}
                  onModeChange={(backgroundMode) => setConfig((prev) => ({ ...prev, backgroundMode }))}
                  customColors={config.customBgColors}
                  onCustomColorsChange={(customBgColors) => setConfig((prev) => ({ ...prev, customBgColors }))}
                />
              </div>
              <div className="h-px bg-border" />
              <div onPointerDown={(e) => {
                // 判断点击的是边框还是装饰tab区域（通过data属性或默认border）
                const target = e.target as HTMLElement
                const decoTab = target.closest('[data-layer="decoration"]')
                setActiveLayer(decoTab ? 'decoration' : 'border')
              }}>
                <BorderSelector
                  selected={config.border}
                  onSelect={(border) => setConfig((prev) => ({ ...prev, border }))}
                  mode={config.borderMode}
                  onModeChange={(borderMode) => setConfig((prev) => ({ ...prev, borderMode }))}
                  customColors={config.customBorderColors}
                  onCustomColorsChange={(customBorderColors) => setConfig((prev) => ({ ...prev, customBorderColors }))}
                  decoration={config.decoration}
                  onDecorationChange={(decoration) => setConfig((prev) => ({ ...prev, decoration }))}
                />
              </div>
              <div className="h-px bg-border" />
              <div onPointerDown={() => setActiveLayer('image')}>
                <ImageUpload
                  image={config.image}
                  imageScale={config.imageScale}
                  imageX={config.imageX}
                  imageY={config.imageY}
                  onImageChange={(image) => setConfig((prev) => ({ ...prev, image }))}
                  onScaleChange={(imageScale) => setConfig((prev) => ({ ...prev, imageScale }))}
                  onPositionChange={(imageX, imageY) => setConfig((prev) => ({ ...prev, imageX, imageY }))}
                />
              </div>
            </div>
            <div className="mt-auto pt-2">
              <ExportButton previewRef={previewRef} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
