import { useRef, useCallback, useId, useState, useEffect } from 'react'
import { type BadgeConfig, type LayerTransform, buildCustomBgStyle, buildGradientBorderSvg } from '@/lib/badge-config'
import { trimTransparent } from '@/lib/trim-transparent'

type ActiveLayer = 'background' | 'border' | 'decoration' | 'image'

interface BadgePreviewProps {
  config: BadgeConfig
  previewRef: React.RefObject<HTMLDivElement>
  activeLayer: ActiveLayer
  onLayerTransformChange: (layer: ActiveLayer, transform: LayerTransform) => void
}

function getBackgroundStyle(bg: BadgeConfig['background']): React.CSSProperties {
  if (bg.type === 'solid') return { backgroundColor: bg.value }
  if (bg.type === 'gradient') return { background: bg.value }
  if (bg.type === 'image') {
    return { backgroundImage: `url(${bg.value})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
  }
  return { backgroundColor: '#fff', backgroundImage: bg.value, backgroundSize: '20px 20px' }
}

// 获取当前活跃图层的 transform
function getActiveTransform(config: BadgeConfig, layer: ActiveLayer): LayerTransform {
  if (layer === 'background') return config.bgTransform
  if (layer === 'border') return config.borderTransform
  if (layer === 'decoration') return config.decoTransform
  return { x: config.imageX, y: config.imageY, scale: config.imageScale }
}

// 判断当前图层是否有内容可操作
function layerHasContent(config: BadgeConfig, layer: ActiveLayer): boolean {
  if (layer === 'background') return config.background.type === 'image' || config.backgroundMode === 'custom'
  if (layer === 'border') return !!(config.border.svg || config.border.imageUrl)
  if (layer === 'decoration') return !!config.decoration.imageUrl
  return !!config.image
}

const LAYER_LABELS: Record<ActiveLayer, string> = {
  background: '底图',
  border: '边框',
  decoration: '素材',
  image: '照片',
}

export function BadgePreview({ config, previewRef, activeLayer, onLayerTransformChange }: BadgePreviewProps) {
  const size = config.size.px
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const transformStart = useRef<LayerTransform>({ x: 0, y: 0, scale: 1 })
  const pinchStartDist = useRef(0)
  const pinchStartScale = useRef(1)
  const gradientId = useId()

  const canOperate = layerHasContent(config, activeLayer)

  // 底图样式
  const bgStyle = config.backgroundMode === 'custom'
    ? buildCustomBgStyle(config.customBgColors)
    : (config.background.type !== 'image' ? getBackgroundStyle(config.background) : { backgroundColor: 'transparent' })

  // 边框 SVG
  const borderSvgContent = (() => {
    if (!config.border.svg) return ''
    return buildGradientBorderSvg(config.border.svg, config.customBorderColors, gradientId.replace(/:/g, ''))
  })()

  // 裁剪边框图片透明边距
  const [trimmedBorderUrl, setTrimmedBorderUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!config.border.imageUrl) { setTrimmedBorderUrl(null); return }
    let cancelled = false
    trimTransparent(config.border.imageUrl).then((url) => { if (!cancelled) setTrimmedBorderUrl(url) })
    return () => { cancelled = true }
  }, [config.border.imageUrl])

  // 裁剪装饰素材透明边距
  const [trimmedDecorationUrl, setTrimmedDecorationUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!config.decoration.imageUrl) { setTrimmedDecorationUrl(null); return }
    let cancelled = false
    trimTransparent(config.decoration.imageUrl).then((url) => { if (!cancelled) setTrimmedDecorationUrl(url) })
    return () => { cancelled = true }
  }, [config.decoration.imageUrl])

  // 拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!canOperate) return
    e.preventDefault()
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    transformStart.current = getActiveTransform(config, activeLayer)

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      const dx = ev.clientX - dragStart.current.x
      const dy = ev.clientY - dragStart.current.y
      onLayerTransformChange(activeLayer, {
        ...transformStart.current,
        x: transformStart.current.x + dx,
        y: transformStart.current.y + dy,
      })
    }
    const handleMouseUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [canOperate, config, activeLayer, onLayerTransformChange])

  // 触摸
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!canOperate) return

    // 双指缩放
    if (e.touches.length === 2) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist.current = Math.hypot(dx, dy)
      const t = getActiveTransform(config, activeLayer)
      pinchStartScale.current = t.scale
      transformStart.current = t

      const handlePinchMove = (ev: TouchEvent) => {
        if (ev.touches.length < 2) return
        ev.preventDefault()
        const mdx = ev.touches[0].clientX - ev.touches[1].clientX
        const mdy = ev.touches[0].clientY - ev.touches[1].clientY
        const dist = Math.hypot(mdx, mdy)
        const ratio = dist / pinchStartDist.current
        const newScale = Math.min(5, Math.max(0.2, pinchStartScale.current * ratio))
        onLayerTransformChange(activeLayer, { ...transformStart.current, scale: newScale })
      }
      const handlePinchEnd = () => {
        window.removeEventListener('touchmove', handlePinchMove)
        window.removeEventListener('touchend', handlePinchEnd)
      }
      window.addEventListener('touchmove', handlePinchMove, { passive: false })
      window.addEventListener('touchend', handlePinchEnd)
      return
    }

    // 单指拖拽
    const touch = e.touches[0]
    isDragging.current = true
    dragStart.current = { x: touch.clientX, y: touch.clientY }
    transformStart.current = getActiveTransform(config, activeLayer)

    const handleTouchMove = (ev: TouchEvent) => {
      if (!isDragging.current || ev.touches.length !== 1) return
      const t = ev.touches[0]
      const dx = t.clientX - dragStart.current.x
      const dy = t.clientY - dragStart.current.y
      onLayerTransformChange(activeLayer, {
        ...transformStart.current,
        x: transformStart.current.x + dx,
        y: transformStart.current.y + dy,
      })
    }
    const handleTouchEnd = () => {
      isDragging.current = false
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }, [canOperate, config, activeLayer, onLayerTransformChange])

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!canOperate) return
    e.preventDefault()
    const t = getActiveTransform(config, activeLayer)
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(5, Math.max(0.2, t.scale * delta))
    onLayerTransformChange(activeLayer, { ...t, scale: newScale })
  }, [canOperate, config, activeLayer, onLayerTransformChange])

  // 构建 transform 样式（默认值时不输出 transform 属性避免浏览器渲染差异）
  const buildTransformStyle = (t: LayerTransform): React.CSSProperties => {
    if (t.x === 0 && t.y === 0 && t.scale === 1) return {}
    return { transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})` }
  }

  // 装饰素材渲染
  const renderDecoration = () => {
    if (!config.decoration.imageUrl) return null
    const t = config.decoTransform
    return (
      <img
        src={trimmedDecorationUrl ?? config.decoration.imageUrl}
        alt=""
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          width: '100%',
          height: '100%',
          opacity: 1,
          objectFit: 'cover',
          objectPosition: 'center',
          ...buildTransformStyle(t),
        }}
        draggable={false}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative rounded-full overflow-hidden border border-border shadow-sm"
        ref={previewRef as React.RefObject<HTMLDivElement>}
        style={{ width: size, height: size, cursor: canOperate ? 'grab' : 'default' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        {/* 底图层 */}
        {config.background.type === 'image' && config.backgroundMode === 'preset' ? (
          <img
            src={config.background.value}
            alt=""
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              ...buildTransformStyle(config.bgTransform),
            }}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0" style={bgStyle} />
        )}

        {/* 照片层 */}
        {config.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={config.image}
              alt="Photo"
              className="pointer-events-none select-none"
              style={{
                transform: `translate(${config.imageX}px, ${config.imageY}px) scale(${config.imageScale})`,
                maxWidth: 'none',
                maxHeight: 'none',
                width: size,
                height: size,
                objectFit: 'contain',
              }}
              draggable={false}
            />
          </div>
        )}

        {/* 装饰层：边框下 */}
        {config.decoration.layer === 'below' && renderDecoration()}

        {/* SVG 边框 */}
        {borderSvgContent && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={buildTransformStyle(config.borderTransform)}
            dangerouslySetInnerHTML={{ __html: borderSvgContent }}
          />
        )}

        {/* 图片边框 */}
        {config.border.imageUrl && (
          <img
            src={trimmedBorderUrl ?? config.border.imageUrl}
            alt=""
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              width: '100%',
              height: '100%',
              opacity: 1,
              objectFit: 'cover',
              objectPosition: 'center',
              ...buildTransformStyle(config.borderTransform),
            }}
            draggable={false}
          />
        )}

        {/* 装饰层：边框上 */}
        {config.decoration.layer === 'above' && renderDecoration()}
      </div>

      <span className="text-xs text-muted-foreground tracking-wide">
        {config.size.mm}mm
        {canOperate && ` — 拖拽移动${LAYER_LABELS[activeLayer]}，滚轮缩放`}
      </span>
    </div>
  )
}
