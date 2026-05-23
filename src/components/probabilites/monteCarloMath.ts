/** Estimation Monte Carlo d'une probabilité */
export function estimateProbability(successes: number, n: number): number {
  if (n <= 0) return 0
  return successes / n
}

/** Estimation de π par points dans le cercle unité */
export function estimatePi(pointsInCircle: number, total: number): number {
  if (total <= 0) return 0
  return 4 * (pointsInCircle / total)
}

/** Espérance empirique à partir de fréquences */
export function estimateExpectationFromFreq(
  values: number[],
  frequencies: number[],
): number {
  const n = frequencies.reduce((s, f) => s + f, 0)
  if (n <= 0) return 0
  return values.reduce((s, x, i) => s + x * frequencies[i], 0) / n
}

/** Intégrale ∫_0^1 x² dx par Monte Carlo (échantillons uniformes) */
export function monteCarloIntegralXSquared(samples: number): number {
  if (samples <= 0) return 0
  let sum = 0
  for (let i = 0; i < samples; i++) {
    const x = Math.random()
    sum += x * x
  }
  return sum / samples
}

/** Accuracy IA */
export function estimateAccuracy(correct: number, total: number): number {
  return estimateProbability(correct, total)
}

/** Ratio des erreurs MC : Err(n2)/Err(n1) ≈ sqrt(n1/n2) */
export function errorRatio(n1: number, n2: number): number {
  if (n1 <= 0 || n2 <= 0) return 1
  return Math.sqrt(n1 / n2)
}
