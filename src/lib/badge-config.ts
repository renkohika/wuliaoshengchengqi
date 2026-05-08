export interface LayerTransform {
  x: number
  y: number
  scale: number
}

export interface BadgeConfig {
  size: BadgeSize
  background: BackgroundOption
  border: BorderOption
  backgroundMode: 'preset' | 'custom'
  customBgColors: string[]
  borderMode: 'preset' | 'custom'
  customBorderColors: string[]
  decoration: DecorationConfig
  bgTransform: LayerTransform
  borderTransform: LayerTransform
  decoTransform: LayerTransform
  image: string | null
  imageScale: number
  imageX: number
  imageY: number
}

export interface DecorationConfig {
  imageUrl: string | null
  layer: 'above' | 'below' // above = 在边框之上，below = 在边框之下被边框覆盖
}

export interface BadgeSize {
  label: string
  mm: number
  px: number
}

export interface BackgroundOption {
  id: string
  label: string
  type: 'solid' | 'gradient' | 'pattern' | 'image'
  value: string
}

export interface BorderOption {
  id: string
  label: string
  svg: string
  imageUrl?: string
}

export interface DecorationOption {
  id: string
  label: string
  imageUrl: string
}

export const BADGE_SIZES: BadgeSize[] = [
  { label: '44mm', mm: 44, px: 176 },
  { label: '58mm', mm: 58, px: 232 },
  { label: '75mm', mm: 75, px: 300 },
]

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  // Solids
  { id: 'white', label: 'White', type: 'solid', value: '#ffffff' },
  { id: 'warm-white', label: 'Warm', type: 'solid', value: '#faf8f5' },
  { id: 'blush', label: 'Blush', type: 'solid', value: '#fce4ec' },
  { id: 'lavender', label: 'Lavender', type: 'solid', value: '#ede7f6' },
  { id: 'mint', label: 'Mint', type: 'solid', value: '#e8f5e9' },
  { id: 'sky', label: 'Sky', type: 'solid', value: '#e3f2fd' },
  { id: 'cream', label: 'Cream', type: 'solid', value: '#fff8e1' },
  { id: 'slate', label: 'Slate', type: 'solid', value: '#eceff1' },
  // Gradients
  { id: 'rose', label: 'Rose', type: 'gradient', value: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
  { id: 'sunset', label: 'Sunset', type: 'gradient', value: 'linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)' },
  { id: 'ocean', label: 'Ocean', type: 'gradient', value: 'linear-gradient(135deg, #e3f2fd 0%, #ede7f6 100%)' },
  { id: 'aurora', label: 'Aurora', type: 'gradient', value: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' },
  { id: 'dusk', label: 'Dusk', type: 'gradient', value: 'linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)' },
  { id: 'pearl', label: 'Pearl', type: 'gradient', value: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' },
  // Patterns
  { id: 'dots', label: 'Dots', type: 'pattern', value: 'radial-gradient(circle, #e0e0e0 1.2px, transparent 1.2px)' },
  { id: 'grid', label: 'Grid', type: 'pattern', value: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)' },
  // Image backgrounds
  { id: 'img-gingham', label: '粉格纹', type: 'image', value: '/backgrounds/1.jpg' },
  { id: 'img-lavender-frame', label: '紫框菱格', type: 'image', value: '/backgrounds/2.jpg' },
  { id: 'img-pink-frame', label: '粉框菱格', type: 'image', value: '/backgrounds/3.jpg' },
  { id: 'img-dark-rose', label: '暗黑玫瑰', type: 'image', value: '/backgrounds/4.jpg' },
  { id: 'img-stripes', label: '奶油条纹', type: 'image', value: '/backgrounds/e.png' },
  { id: 'img-pink-lace', label: '粉色蕾丝', type: 'image', value: '/backgrounds/q.png' },
  { id: 'img-choco-donut', label: '巧克力甜甜圈', type: 'image', value: '/backgrounds/r.png' },
  { id: 'img-pink-donut', label: '粉色甜甜圈', type: 'image', value: '/backgrounds/t.png' },
  { id: 'img-blue-stars', label: '蓝色星星', type: 'image', value: '/backgrounds/u.png' },
  { id: 'img-blue-lace', label: '蓝色蕾丝', type: 'image', value: '/backgrounds/w.png' },
  { id: 'img-ipod-teal', label: 'iPod黄绿', type: 'image', value: '/backgrounds/i.png' },
  { id: 'img-pink-bow', label: '粉色蝴蝶结', type: 'image', value: '/backgrounds/pink-bow.png' },
  { id: 'img-poker-blue', label: '蓝白扑克', type: 'image', value: '/backgrounds/poker-blue.png' },
  { id: 'img-poker-light', label: '浅蓝扑克', type: 'image', value: '/backgrounds/poker-light.png' },
]

// SVG borders use a 100x100 viewBox coordinate system
export const BORDER_OPTIONS: BorderOption[] = [
  {
    id: 'none',
    label: '无边框',
    svg: '',
  },
  {
    id: 'simple',
    label: '圆环',
    svg: `<circle cx="50" cy="50" r="46" fill="none" stroke="#222" stroke-width="2.5"/>`,
  },
  {
    id: 'double',
    label: '双线',
    svg: `<circle cx="50" cy="50" r="47" fill="none" stroke="#222" stroke-width="1.5"/><circle cx="50" cy="50" r="43" fill="none" stroke="#222" stroke-width="0.8"/>`,
  },
  {
    id: 'dashed',
    label: '虚线',
    svg: `<circle cx="50" cy="50" r="46" fill="none" stroke="#444" stroke-width="1.8" stroke-dasharray="4 3"/>`,
  },
  {
    id: 'dots-border',
    label: '圆点',
    svg: `<circle cx="50" cy="50" r="46" fill="none" stroke="#333" stroke-width="2.5" stroke-dasharray="0.1 4.5" stroke-linecap="round"/>`,
  },
  {
    id: 'scallop',
    label: '波浪',
    svg: `<circle cx="50" cy="50" r="46" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="8 4" stroke-linecap="round"/>`,
  },
  {
    id: 'thin',
    label: '细线',
    svg: `<circle cx="50" cy="50" r="47" fill="none" stroke="#555" stroke-width="0.8"/>`,
  },
  {
    id: 'lace',
    label: '蕾丝',
    svg: `<circle cx="50" cy="50" r="47" fill="none" stroke="#444" stroke-width="2" stroke-dasharray="1.5 2.5" stroke-linecap="round"/><circle cx="50" cy="50" r="43" fill="none" stroke="#666" stroke-width="0.8" stroke-dasharray="5 3"/>`,
  },
  {
    id: 'gold',
    label: '金边',
    svg: `<circle cx="50" cy="50" r="47" fill="none" stroke="#b8860b" stroke-width="2.5"/><circle cx="50" cy="50" r="44" fill="none" stroke="#daa520" stroke-width="0.8"/>`,
  },
  // Image borders
  { id: 'img-ribbon', label: '蝴蝶结', svg: '', imageUrl: '/borders/1.png' },
  { id: 'img-scallop-purple', label: '紫花边', svg: '', imageUrl: '/borders/2.png' },
  { id: 'img-scallop-cream', label: '奶黄花边', svg: '', imageUrl: '/borders/3.png' },
  { id: 'img-scallop-mint', label: '薄荷花边', svg: '', imageUrl: '/borders/4.png' },
  { id: 'img-heart-yellow', label: '黄心蕾丝', svg: '', imageUrl: '/borders/5.png' },
]

export const DECORATION_OPTIONS: DecorationOption[] = [
  { id: 'deco-1', label: '素材1', imageUrl: '/decorations/1.png' },
  { id: 'deco-heart-pink', label: '粉色爱心', imageUrl: '/decorations/heart-pink.svg' },
  { id: 'deco-star-blue', label: '蓝色星星', imageUrl: '/decorations/star-blue.svg' },
  { id: 'deco-bow-purple', label: '紫色蝴蝶结', imageUrl: '/decorations/bow-purple.svg' },
  { id: 'deco-crown-gold', label: '金色皇冠', imageUrl: '/decorations/crown-gold.svg' },
  { id: 'deco-heart-bubble', label: '爱心气泡', imageUrl: '/decorations/heart-bubble.svg' },
  { id: 'deco-sparkles', label: '闪闪星星', imageUrl: '/decorations/sparkles-pink.svg' },
]

// Utility: build CSS style from custom color array
export function buildCustomBgStyle(colors: string[]): React.CSSProperties {
  if (colors.length === 1) {
    return { backgroundColor: colors[0] }
  }
  const stops = colors.map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`).join(', ')
  return { background: `linear-gradient(135deg, ${stops})` }
}

// Utility: build gradient CSS string for preview bar
export function buildGradientCSS(colors: string[]): string {
  if (colors.length === 1) return colors[0]
  const stops = colors.map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`).join(', ')
  return `linear-gradient(135deg, ${stops})`
}

// Utility: inject SVG linearGradient into border SVG and replace stroke colors
export function buildGradientBorderSvg(baseSvg: string, colors: string[], gradientId: string): string {
  if (!baseSvg || colors.length === 0) return baseSvg

  const stops = colors.map((c, i) => {
    const offset = colors.length === 1 ? '0%' : `${Math.round((i / (colors.length - 1)) * 100)}%`
    return `<stop offset="${offset}" stop-color="${c}"/>`
  }).join('')

  const defs = `<defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">${stops}</linearGradient></defs>`
  const modifiedSvg = baseSvg.replace(/stroke="[^"]*"/g, `stroke="url(#${gradientId})"`)

  return defs + modifiedSvg
}
