import { BADGE_SIZES, type BadgeSize } from '@/lib/badge-config'
import { cn } from '@/lib/utils'

interface SizeSelectorProps {
  selected: BadgeSize
  onSelect: (size: BadgeSize) => void
}

export function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        尺寸
      </label>
      <div className="flex gap-2">
        {BADGE_SIZES.map((size) => (
          <button
            key={size.mm}
            onClick={() => onSelect(size)}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200",
              selected.mm === size.mm
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}
