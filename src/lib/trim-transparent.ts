// 运行时裁剪图片透明边距：扫描非透明像素的包围盒，输出贴紧内容的方形画布
// 用于边框/素材图片，让抠图后的 PNG 能撑满预览容器

const cache = new Map<string, string>()

const ALPHA_THRESHOLD = 10 // alpha > 10 视为有效像素

export async function trimTransparent(src: string): Promise<string> {
  if (!src) return src
  const cached = cache.get(src)
  if (cached) return cached

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const { width, height } = img
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) return resolve(src)
        ctx.drawImage(img, 0, 0)

        const { data } = ctx.getImageData(0, 0, width, height)

        let minX = width
        let minY = height
        let maxX = -1
        let maxY = -1

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3]
            if (alpha > ALPHA_THRESHOLD) {
              if (x < minX) minX = x
              if (x > maxX) maxX = x
              if (y < minY) minY = y
              if (y > maxY) maxY = y
            }
          }
        }

        // 全透明 / JPG 没有 alpha 通道 → 原图返回
        if (maxX < minX || maxY < minY) {
          cache.set(src, src)
          return resolve(src)
        }

        const w = maxX - minX + 1
        const h = maxY - minY + 1

        // 输出方形画布（边长取 max），内容居中，避免后续 cover 裁切或 fill 拉伸变形
        const size = Math.max(w, h)
        const out = document.createElement('canvas')
        out.width = size
        out.height = size
        const octx = out.getContext('2d')
        if (!octx) return resolve(src)
        const dx = (size - w) / 2
        const dy = (size - h) / 2
        octx.drawImage(canvas, minX, minY, w, h, dx, dy, w, h)

        const result = out.toDataURL('image/png')
        cache.set(src, result)
        resolve(result)
      } catch {
        // 跨域等错误：回退到原图
        resolve(src)
      }
    }

    img.onerror = () => resolve(src)
    img.src = src
  })
}
