/** Inférence bayésienne : P(θ|D) via loi totale */
export function computePosterior(
  priorTheta: number,
  likelihoodDgivenTheta: number,
  likelihoodDgivenNotTheta: number,
) {
  const pNotTheta = 1 - priorTheta
  const evidence = likelihoodDgivenTheta * priorTheta + likelihoodDgivenNotTheta * pNotTheta
  const posterior = evidence > 0 ? (likelihoodDgivenTheta * priorTheta) / evidence : 0
  return { evidence, posterior, priorTheta, likelihoodDgivenTheta, likelihoodDgivenNotTheta }
}

/** E(X), E(X²), V(X) pour loi discrète */
export function discreteExpectationVariance(values: number[], probs: number[]) {
  const ex = values.reduce((s, x, i) => s + x * probs[i], 0)
  const ex2 = values.reduce((s, x, i) => s + x * x * probs[i], 0)
  const variance = ex2 - ex * ex
  return { ex, ex2, variance }
}
