export function binomCoeff(n: number, k: number): number {
  if (k < 0 || k > n || n < 0) return 0
  let kk = Math.min(k, n - k)
  let r = 1
  for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1)
  return r
}

export function bernoulliPMF(p: number, x: 0 | 1): number {
  return x === 1 ? p : 1 - p
}

export function binomialPMF(n: number, p: number, k: number): number {
  if (k < 0 || k > n) return 0
  return binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

export function geometricPMF(p: number, k: number): number {
  if (k < 1) return 0
  return Math.pow(1 - p, k - 1) * p
}

export function poissonPMF(lambda: number, k: number): number {
  if (k < 0 || lambda < 0) return 0
  let term = Math.exp(-lambda)
  for (let i = 1; i <= k; i++) term *= lambda / i
  return term
}

export function binomialPMFVector(n: number, p: number): { k: number; p: number }[] {
  return Array.from({ length: n + 1 }, (_, k) => ({ k, p: binomialPMF(n, p, k) }))
}

export function geometricPMFVector(p: number, maxK: number): { k: number; p: number }[] {
  return Array.from({ length: maxK }, (_, i) => {
    const k = i + 1
    return { k, p: geometricPMF(p, k) }
  })
}

export function poissonPMFVector(lambda: number, maxK: number): { k: number; p: number }[] {
  const rows: { k: number; p: number }[] = []
  let sum = 0
  for (let k = 0; k <= maxK; k++) {
    const pk = poissonPMF(lambda, k)
    rows.push({ k, p: pk })
    sum += pk
  }
  return rows
}
