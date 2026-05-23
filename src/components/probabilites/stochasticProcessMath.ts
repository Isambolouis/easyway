import { poissonPMF } from '@/components/probabilites/discreteLawsMath'

/** Pas ε ∈ {+1, -1} avec P(+1) = p */
export function stepExpectation(pUp: number): number {
  return 2 * pUp - 1
}

export function stepVariance(pUp: number): number {
  const e = stepExpectation(pUp)
  return 1 - e * e
}

/** X_0 = 0, X_{t+1} = X_t + ε_t i.i.d. */
export function randomWalkExpectation(t: number, pUp: number): number {
  return t * stepExpectation(pUp)
}

export function randomWalkVarianceAt1(pUp: number): number {
  return stepVariance(pUp)
}

/** N(t) ~ Poisson(λt) */
export function poissonProcessPMF(k: number, lambda: number, t: number): number {
  return poissonPMF(lambda * t, k)
}

/** Loi des probabilités totales : P(C) = P(C|A)P(A) + P(C|¬A)P(¬A) */
export function totalProbability(
  pCgivenA: number,
  pA: number,
  pCgivenNotA: number,
): number {
  return pCgivenA * pA + pCgivenNotA * (1 - pA)
}
