import { clampByte, quantizeLevel } from './imagePixelUtils'

export function buildSampleGrayImage(w: number, h: number): number[] {
  const data: number[] = []
  const cx = w * 0.38
  const cy = h * 0.45
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const grad = 40 + (x / w) * 140 + (y / h) * 40
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      const spot = dist < w * 0.22 ? 200 - dist * 0.8 : 0
      data.push(clampByte(grad + spot))
    }
  }
  return data
}

export function imageMinMax(data: number[]): { min: number; max: number } {
  let min = 255
  let max = 0
  for (const v of data) {
    if (v < min) min = v
    if (v > max) max = v
  }
  return { min, max }
}

export function computeHistogram(data: number[], bins = 256): number[] {
  const h = Array(bins).fill(0)
  for (const v of data) h[clampByte(v)]++
  return h
}

export function equalizeHistogram(data: number[]): number[] {
  const h = computeHistogram(data)
  const cdf = h.reduce<number[]>((acc, count, i) => {
    acc.push((acc[i - 1] ?? 0) + count)
    return acc
  }, [])
  const total = data.length
  const lut = cdf.map((c) => clampByte((c / total) * 255))
  return data.map((v) => lut[v])
}

export function applyAffine(data: number[], alpha: number, beta: number): number[] {
  return data.map((v) => clampByte(alpha * v + beta))
}

export function applyNegative(data: number[]): number[] {
  return data.map((v) => 255 - v)
}

export function applyThreshold(data: number[], t: number): number[] {
  return data.map((v) => (v >= t ? 255 : 0))
}

export function applyLog(data: number[], c = 40): number[] {
  return data.map((v) => clampByte(c * Math.log(1 + v)))
}

export function applyGamma(data: number[], gamma: number, c = 1): number[] {
  return data.map((v) => clampByte(c * 255 * (v / 255) ** gamma))
}

export function normalize01(data: number[]): number[] {
  const { min, max } = imageMinMax(data)
  const span = Math.max(max - min, 1)
  return data.map((v) => (v - min) / span)
}

export function normalizeToByte(data: number[]): number[] {
  return normalize01(data).map((v) => clampByte(v * 255))
}

export function quantizeImage(data: number[], levels: number): number[] {
  const bits = Math.max(1, Math.round(Math.log2(levels)))
  return data.map((v) => quantizeLevel(v, bits))
}

export function blendImages(a: number[], b: number[], alpha: number): number[] {
  return a.map((v, i) => clampByte(alpha * v + (1 - alpha) * (b[i] ?? 0)))
}

export function diffImages(a: number[], b: number[]): number[] {
  return a.map((v, i) => clampByte(Math.abs(v - (b[i] ?? 0))))
}

export function putGrayImageData(
  ctx: CanvasRenderingContext2D,
  data: number[],
  w: number,
  h: number,
  scale = 1,
) {
  const img = ctx.createImageData(w * scale, h * scale)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = data[y * w + x]
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const px = x * scale + sx
          const py = y * scale + sy
          const i = (py * w * scale + px) * 4
          img.data[i] = v
          img.data[i + 1] = v
          img.data[i + 2] = v
          img.data[i + 3] = 255
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0)
}
