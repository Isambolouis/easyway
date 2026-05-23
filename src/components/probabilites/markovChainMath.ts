export type MarkovMatrix = number[][]

export const WEATHER_LABELS = ['Soleil', 'Nuage', 'Pluie'] as const
export const WEATHER_EMOJI = ['☀️', '☁️', '🌧️'] as const

/** Matrice météo par défaut (chapitre 10) */
export const DEFAULT_WEATHER_MATRIX: MarkovMatrix = [
  [0.7, 0.2, 0.1],
  [0.3, 0.4, 0.3],
  [0.2, 0.3, 0.5],
]

export function normalizeRow(row: number[]): number[] {
  const sum = row.reduce((s, v) => s + v, 0)
  if (sum <= 0) return row.map(() => 1 / row.length)
  return row.map((v) => v / sum)
}

export function normalizeMatrix(P: MarkovMatrix): MarkovMatrix {
  return P.map((row) => normalizeRow([...row]))
}

export function rowSums(P: MarkovMatrix): number[] {
  return P.map((row) => row.reduce((s, v) => s + v, 0))
}

/** Distribution π (ligne) après k pas : π P^k */
export function distributionAfterSteps(initial: number[], P: MarkovMatrix, steps: number): number[] {
  let dist = [...initial]
  for (let s = 0; s < steps; s++) dist = multiplyVectorMatrix(dist, P)
  return dist
}

export function multiplyVectorMatrix(v: number[], P: MarkovMatrix): number[] {
  const n = P.length
  return Array.from({ length: n }, (_, j) =>
    v.reduce((sum, _, i) => sum + v[i] * (P[i]?.[j] ?? 0), 0),
  )
}

export function matrixPower(P: MarkovMatrix, k: number): MarkovMatrix {
  const n = P.length
  let result: MarkovMatrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  )
  let base = P.map((row) => [...row])
  let exp = k
  while (exp > 0) {
    if (exp % 2 === 1) result = multiplyMatrices(result, base)
    base = multiplyMatrices(base, base)
    exp = Math.floor(exp / 2)
  }
  return result
}

export function multiplyMatrices(A: MarkovMatrix, B: MarkovMatrix): MarkovMatrix {
  const n = A.length
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0),
    ),
  )
}

/** Probabilité d'un chemin i₀ → i₁ → … → iₖ */
export function pathProbability(indices: number[], P: MarkovMatrix): number {
  if (indices.length < 2) return 1
  let p = 1
  for (let t = 0; t < indices.length - 1; t++) {
    p *= P[indices[t]]?.[indices[t + 1]] ?? 0
  }
  return p
}
