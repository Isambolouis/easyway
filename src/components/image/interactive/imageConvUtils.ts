import { clampByte } from './imagePixelUtils'

export type PaddingMode = 'zero' | 'replicate' | 'reflect'

function getPixel(data: number[], w: number, h: number, x: number, y: number, pad: PaddingMode): number {
  if (x >= 0 && x < w && y >= 0 && y < h) return data[y * w + x]
  if (pad === 'zero') return 0
  const rx = Math.max(0, Math.min(w - 1, x))
  const ry = Math.max(0, Math.min(h - 1, y))
  if (pad === 'replicate') return data[ry * w + rx]
  const refX = x < 0 ? -x : x >= w ? 2 * (w - 1) - x : x
  const refY = y < 0 ? -y : y >= h ? 2 * (h - 1) - y : y
  return data[refY * w + refX]
}

export function convolve2d(
  data: number[],
  w: number,
  h: number,
  kernel: number[][],
  padding: PaddingMode = 'replicate',
): number[] {
  const kh = kernel.length
  const kw = kernel[0].length
  const oy = Math.floor((kh - 1) / 2)
  const ox = Math.floor((kw - 1) / 2)
  const out: number[] = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0
      for (let j = 0; j < kh; j++) {
        for (let i = 0; i < kw; i++) {
          sum += kernel[j][i] * getPixel(data, w, h, x + i - ox, y + j - oy, padding)
        }
      }
      out.push(clampByte(sum))
    }
  }
  return out
}

/** Sortie réduite pour illustrer le stride. */
export function convolve2dStride(
  data: number[],
  w: number,
  h: number,
  kernel: number[][],
  stride: number,
): { data: number[]; w: number; h: number } {
  const kh = kernel.length
  const ox = Math.floor((kh - 1) / 2)
  const oy = ox
  const outW = Math.ceil(w / stride)
  const outH = Math.ceil(h / stride)
  const out: number[] = []
  for (let y = 0; y < h; y += stride) {
    for (let x = 0; x < w; x += stride) {
      let sum = 0
      for (let j = 0; j < kh; j++) {
        for (let i = 0; i < kh; i++) {
          sum += kernel[j][i] * getPixel(data, w, h, x + i - ox, y + j - oy, 'replicate')
        }
      }
      out.push(clampByte(sum))
    }
  }
  return { data: out, w: outW, h: outH }
}

export function boxKernel(size: number): number[][] {
  const v = 1 / (size * size)
  return Array.from({ length: size }, () => Array(size).fill(v))
}

export function gaussianKernel(size: number, sigma: number): number[][] {
  const k = Array.from({ length: size }, () => Array(size).fill(0))
  const c = Math.floor(size / 2)
  let sum = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - c
      const dy = y - c
      const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
      k[y][x] = g
      sum += g
    }
  }
  return k.map((row) => row.map((v) => v / sum))
}

export const SOBEL_X: number[][] = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
]

export const SOBEL_Y: number[][] = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
]

export const LAPLACIAN: number[][] = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0],
]

export function sobelMagnitude(data: number[], w: number, h: number): number[] {
  const gx = convolve2d(data, w, h, SOBEL_X)
  const gy = convolve2d(data, w, h, SOBEL_Y)
  return gx.map((v, i) => clampByte(Math.sqrt(v * v + (gy[i] ?? 0) ** 2)))
}

export function sharpen(data: number[], w: number, h: number): number[] {
  const lap = convolve2d(data, w, h, LAPLACIAN)
  return data.map((v, i) => clampByte(v + lap[i] * 0.5))
}

export function medianFilter(data: number[], w: number, h: number, size: number): number[] {
  const r = Math.floor(size / 2)
  const out: number[] = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const vals: number[] = []
      for (let j = -r; j <= r; j++) {
        for (let i = -r; i <= r; i++) {
          vals.push(getPixel(data, w, h, x + i, y + j, 'replicate'))
        }
      }
      vals.sort((a, b) => a - b)
      out.push(vals[Math.floor(vals.length / 2)])
    }
  }
  return out
}

export function addSaltPepper(data: number[], amount: number, seed = 0): number[] {
  return data.map((v, i) => {
    const r = Math.sin((i + seed) * 12.9898) * 43758.5453
    const p = r - Math.floor(r)
    if (p < amount / 200) return 0
    if (p < amount / 100) return 255
    return v
  })
}

/** Convolution manuelle sur patch 3×3 — retourne somme et résultat. */
export function convolve3x3Patch(patch: number[][], kernel: number[][]): { rawSum: number; value: number } {
  let rawSum = 0
  let weighted = 0
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      rawSum += patch[j][i]
      weighted += patch[j][i] * kernel[j][i]
    }
  }
  return { rawSum, value: clampByte(weighted) }
}
