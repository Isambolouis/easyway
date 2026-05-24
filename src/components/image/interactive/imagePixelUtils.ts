export function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

export function grayToCss(v: number): string {
  const c = clampByte(v)
  return `rgb(${c},${c},${c})`
}

export function rgbToCss(r: number, g: number, b: number): string {
  return `rgb(${clampByte(r)},${clampByte(g)},${clampByte(b)})`
}

export function decimalToBinary8(n: number): string {
  return clampByte(n).toString(2).padStart(8, '0')
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes.toLocaleString('fr-FR')} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

/** Réduit une intensité 0–255 à `levels` niveaux discrets. */
export function quantizeLevel(value: number, bits: number): number {
  const levels = Math.max(2, 2 ** bits)
  const step = 255 / (levels - 1)
  return Math.round(Math.round(value / step) * step)
}
