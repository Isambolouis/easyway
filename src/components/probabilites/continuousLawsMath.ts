/** Approximation de erf (Abramowitz & Stegun) */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * ax)
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t *
      Math.exp(-ax * ax))
  return sign * y
}

export function normalPDF(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0
  const z = (x - mu) / sigma
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z)
}

/** Φ(z) — loi normale centrée réduite */
export function standardNormalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2))
}

export function normalCDF(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return x < mu ? 0 : 1
  return standardNormalCDF((x - mu) / sigma)
}

/** P(μ − kσ ≤ X ≤ μ + kσ) pour X ~ N(μ, σ²) */
export function normalSymmetricIntervalProb(kSigma: number): number {
  return standardNormalCDF(kSigma) - standardNormalCDF(-kSigma)
}

export function zScore(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0
  return (x - mu) / sigma
}

export function uniformPDF(x: number, a: number, b: number): number {
  if (b <= a) return 0
  if (x < a || x > b) return 0
  return 1 / (b - a)
}

export function uniformProb(c: number, d: number, a: number, b: number): number {
  if (b <= a) return 0
  const lo = Math.max(a, Math.min(c, d))
  const hi = Math.min(b, Math.max(c, d))
  return Math.max(0, (hi - lo) / (b - a))
}

export function exponentialPDF(x: number, lambda: number): number {
  if (lambda <= 0 || x < 0) return 0
  return lambda * Math.exp(-lambda * x)
}

export function exponentialTailProb(a: number, lambda: number): number {
  if (a < 0 || lambda <= 0) return 0
  return Math.exp(-lambda * a)
}

/** ∫_a^b 2x dx sur [0,1] */
export function integral2x(a: number, b: number): number {
  const lo = Math.max(0, a)
  const hi = Math.min(1, b)
  if (hi <= lo) return 0
  return hi * hi - lo * lo
}

/** Normalisation : ∫_0^2 kx dx = 1 => k = 1/2 */
export function densityKLinear(): number {
  return 0.5
}
