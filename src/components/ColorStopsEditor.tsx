import { Plus, X } from 'lucide-react'
import { buildGradientCSS } from '@/lib/badge-config'

interface ColorStopsEditorProps {
  colors: string[]
  onChange: (colors: string[]) => void
  max?: number
}

export function ColorStopsEditor({ colors, onChange, max = 3 }: ColorStopsEditorProps) {
  const handleColorChange = (index: number, value: string) => {
    const next = [...colors]
    next[index] = value
    onChange(next)
  }

  const handleAdd = () => {
    if (colors.length >= max) return
    onChange([...colors, '#cccccc'])
  }

  const handleRemove = (index: number) => {
    if (colors.length <= 1) return
    onChange(colors.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {/* Color inputs */}
      <div className="flex items-center gap-2 flex-wrap">
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-secondary rounded-lg px-2 py-1.5">
            <label className="relative w-6 h-6 rounded-md overflow-hidden border border-border cursor-pointer">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full" style={{ backgroundColor: color }} />
            </label>
            <span className="text-[10px] font-mono text-muted-foreground uppercase w-14">
              {color}
            </span>
            {colors.length > 1 && (
              <button
                onClick={() => handleRemove(i)}
                className="w-4 h-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        {colors.length < max && (
          <button
            onClick={handleAdd}
            className="w-8 h-8 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Gradient preview bar */}
      <div
        className="w-full h-2 rounded-full border border-border"
        style={{ background: buildGradientCSS(colors) }}
      />
    </div>
  )
}
