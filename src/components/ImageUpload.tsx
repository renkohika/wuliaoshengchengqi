import { useState, useCallback } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { Upload, Eraser, ZoomIn, ZoomOut } from 'lucide-react'

interface ImageUploadProps {
  image: string | null
  imageScale: number
  imageX: number
  imageY: number
  onImageChange: (image: string | null) => void
  onScaleChange: (scale: number) => void
  onPositionChange: (x: number, y: number) => void
}

export function ImageUpload({
  image,
  imageScale,
  onImageChange,
  onScaleChange,
  onPositionChange,
}: ImageUploadProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [removeProgress, setRemoveProgress] = useState(0)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      onImageChange(ev.target?.result as string)
      onPositionChange(0, 0)
    }
    reader.readAsDataURL(file)
  }, [onImageChange, onPositionChange])

  const handleRemoveBg = useCallback(async () => {
    if (!image) return
    setIsRemoving(true)
    setRemoveProgress(0)
    try {
      const blob = await removeBackground(image, {
        progress: (key, current, total) => {
          if (total > 0) {
            setRemoveProgress(Math.round((current / total) * 100))
          }
          console.log(key, current, total)
        },
      })
      const url = URL.createObjectURL(blob)
      onImageChange(url)
    } catch (err) {
      console.error('Background removal failed:', err)
    } finally {
      setIsRemoving(false)
      setRemoveProgress(0)
    }
  }, [image, onImageChange])

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium tracking-wide text-muted-foreground">
        照片
      </label>

      <div className="flex flex-col gap-2">
        {/* Upload */}
        <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
          <Upload className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {image ? '更换照片' : '上传你推照片'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {image && (
          <>
            {/* Remove BG */}
            <button
              onClick={handleRemoveBg}
              disabled={isRemoving}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="text-xs">
                {isRemoving ? '抠图中...' : '一键抠图'}
              </span>
            </button>

            {/* Progress bar */}
            {isRemoving && (
              <div className="space-y-1">
                <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${removeProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  {removeProgress}%
                </p>
              </div>
            )}

            {/* Scale */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onScaleChange(Math.max(0.5, imageScale - 0.1))}
                className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={imageScale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="flex-1 h-1 accent-primary"
              />
              <button
                onClick={() => onScaleChange(Math.min(3, imageScale + 0.1))}
                className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-muted-foreground w-8 text-right">
                {Math.round(imageScale * 100)}%
              </span>
            </div>

            {/* Remove image */}
            <button
              onClick={() => { onImageChange(null); onPositionChange(0, 0) }}
              className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
            >
              移除照片
            </button>
          </>
        )}
      </div>
    </div>
  )
}
