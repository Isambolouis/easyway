export function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

/** Moyenne avec effectifs : x̄ = Σ(nᵢ xᵢ) / Σ nᵢ */
export function meanWeighted(pairs: { value: number; effectif: number }[]): number {
  const N = pairs.reduce((s, p) => s + p.effectif, 0)
  if (N === 0) return 0
  return pairs.reduce((s, p) => s + p.value * p.effectif, 0) / N
}

export function median(values: number[]): number {
  if (values.length === 0) return 0
  const s = [...values].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 === 0 ? (s[m - 1] + s[m]) / 2 : s[m]
}

export function mode(values: number[]): number | null {
  const freq = new Map<number, number>()
  values.forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1))
  let best: number | null = null
  let max = 0
  freq.forEach((count, v) => {
    if (count > max) {
      max = count
      best = v
    }
  })
  return max > 1 ? best : null
}

export function variancePop(values: number[]): number {
  if (values.length === 0) return 0
  const m = mean(values)
  return values.reduce((s, x) => s + (x - m) ** 2, 0) / values.length
}

export function stdPop(values: number[]): number {
  return Math.sqrt(variancePop(values))
}

/** Variance avec effectifs : σ² = Σ nᵢ(xᵢ − x̄)² / Σ nᵢ */
export function varianceWeighted(pairs: { value: number; effectif: number }[]): number {
  const m = meanWeighted(pairs)
  const N = pairs.reduce((s, p) => s + p.effectif, 0)
  if (N === 0) return 0
  return pairs.reduce((s, p) => s + p.effectif * (p.value - m) ** 2, 0) / N
}

export function stdWeighted(pairs: { value: number; effectif: number }[]): number {
  return Math.sqrt(varianceWeighted(pairs))
}

export type DeviationRow = { x: number; ecart: number; ecart2: number }

/** Tableau des écarts à la moyenne (étapes du calcul de σ²). */
export function deviationTable(values: number[]): DeviationRow[] {
  const m = mean(values)
  return values.map((x) => {
    const ecart = x - m
    return { x, ecart, ecart2: ecart ** 2 }
  })
}

export function quartile(values: number[], q: number): number {
  return percentile(values, q)
}

/** Percentile Pₚ : p % des valeurs sont en dessous (interpolation linéaire). */
export function percentile(values: number[], p: number): number {
  const s = [...values].sort((a, b) => a - b)
  if (s.length === 0) return 0
  const pos = (p / 100) * (s.length - 1)
  const lo = Math.floor(pos)
  const hi = Math.ceil(pos)
  if (lo === hi) return s[lo]
  return s[lo] + (pos - lo) * (s[hi] - s[lo])
}

/** Décile Dₖ : k × 10 % des données en dessous. Formule courante P = k(n+1)/100. */
export function decile(values: number[], k: number): number {
  return percentile(values, k * 10)
}

export function quartiles(values: number[]) {
  return {
    q1: quartile(values, 25),
    q2: quartile(values, 50),
    q3: quartile(values, 75),
  }
}

export function covariance(valuesX: number[], valuesY: number[]): number {
  const n = Math.min(valuesX.length, valuesY.length)
  if (n === 0) return 0
  const mx = mean(valuesX.slice(0, n))
  const my = mean(valuesY.slice(0, n))
  let sum = 0
  for (let i = 0; i < n; i++) sum += (valuesX[i] - mx) * (valuesY[i] - my)
  return sum / n
}

export function correlation(valuesX: number[], valuesY: number[]): number {
  const sx = stdPop(valuesX)
  const sy = stdPop(valuesY)
  if (sx === 0 || sy === 0) return 0
  return covariance(valuesX, valuesY) / (sx * sy)
}

export type CovarianceRow = {
  x: number
  y: number
  dx: number
  dy: number
  product: number
}

export function covarianceTable(x: number[], y: number[]): CovarianceRow[] {
  const mx = mean(x)
  const my = mean(y)
  const n = Math.min(x.length, y.length)
  const rows: CovarianceRow[] = []
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx
    const dy = y[i] - my
    rows.push({ x: x[i], y: y[i], dx, dy, product: dx * dy })
  }
  return rows
}

export function bivariateStats(x: number[], y: number[]) {
  return {
    meanX: mean(x),
    meanY: mean(y),
    stdX: stdPop(x),
    stdY: stdPop(y),
    cov: covariance(x, y),
    r: correlation(x, y),
  }
}

/** Régression linéaire y ≈ a·x + b (moindres carrés, variance population). */
export function linearRegression(x: number[], y: number[]) {
  const mx = mean(x)
  const my = mean(y)
  const v = variancePop(x)
  const cov = covariance(x, y)
  const slope = v === 0 ? 0 : cov / v
  const intercept = my - slope * mx
  return { slope, intercept, predict: (xv: number) => slope * xv + intercept }
}

export function interpretCorrelation(r: number): string {
  const a = Math.abs(r)
  if (a >= 0.9) return r > 0 ? 'corrélation positive très forte' : 'corrélation négative très forte'
  if (a >= 0.7) return r > 0 ? 'forte corrélation positive' : 'forte corrélation négative'
  if (a >= 0.3) return r > 0 ? 'corrélation modérée positive' : 'corrélation modérée négative'
  if (a < 0.1) return 'relation linéaire quasi nulle'
  return r > 0 ? 'corrélation faible positive' : 'corrélation faible négative'
}

export function histogramBins(values: number[], binWidth: number) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const bins: { label: string; count: number; mid: number }[] = []
  for (let lo = Math.floor(min / binWidth) * binWidth; lo <= max; lo += binWidth) {
    const hi = lo + binWidth
    const count = values.filter((v) => v >= lo && (v < hi || (hi >= max && v === max))).length
    bins.push({ label: `${lo}-${hi}`, count, mid: (lo + hi) / 2 })
  }
  return bins
}

export function cumulativeFrequencies(values: number[]) {
  const bins = histogramBins(values, 2)
  const total = values.length
  let cum = 0
  return bins.map((b) => {
    cum += b.count / total
    return { label: b.label, cumul: cum, freq: b.count / total }
  })
}

export type BoxplotSummary = {
  /** Extrémité moustache basse (données non aberrantes) */
  min: number
  q1: number
  q2: number
  q3: number
  /** Extrémité moustache haute */
  max: number
  iqr: number
  outliers: number[]
  lowerFence: number
  upperFence: number
  dataMin: number
  dataMax: number
}

export function boxplotStats(values: number[]): BoxplotSummary {
  if (values.length === 0) {
    return {
      min: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      max: 0,
      iqr: 0,
      outliers: [],
      lowerFence: 0,
      upperFence: 0,
      dataMin: 0,
      dataMax: 0,
    }
  }
  const q1 = quartile(values, 25)
  const q2 = quartile(values, 50)
  const q3 = quartile(values, 75)
  const iqr = q3 - q1
  const lowerFence = q1 - 1.5 * iqr
  const upperFence = q3 + 1.5 * iqr
  const inRange = values.filter((v) => v >= lowerFence && v <= upperFence)
  const min = inRange.length ? Math.min(...inRange) : q1
  const max = inRange.length ? Math.max(...inRange) : q3
  const outliers = values.filter((v) => v < lowerFence || v > upperFence)
  return {
    min,
    q1,
    q2,
    q3,
    max,
    iqr,
    outliers,
    lowerFence,
    upperFence,
    dataMin: Math.min(...values),
    dataMax: Math.max(...values),
  }
}
