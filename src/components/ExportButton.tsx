import { Download, ShoppingCart } from 'lucide-react'
import html2canvas from 'html2canvas'

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
}

export function ExportButton({ previewRef }: ExportButtonProps) {
  const handleExport = async () => {
    if (!previewRef.current) return
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = `badge-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleExport}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
      >
        <Download className="w-4 h-4" />
        导出 PNG
      </button>
      <button
        onClick={() => {}}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
      >
        <ShoppingCart className="w-4 h-4" />
        一键购买吧唧
      </button>
    </div>
  )
}
