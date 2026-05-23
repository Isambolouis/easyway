/** KL(N(μ_q, σ_q²) || N(μ_p, σ_p²)) en 1D */
export function klGaussian1D(muQ: number, sigmaQ: number, muP: number, sigmaP: number): number {
  const vQ = Math.max(1e-6, sigmaQ * sigmaQ)
  const vP = Math.max(1e-6, sigmaP * sigmaP)
  const sQ = Math.sqrt(vQ)
  const sP = Math.sqrt(vP)
  return Math.log(sP / sQ) + (vQ + (muQ - muP) ** 2) / (2 * vP) - 0.5
}

export function gaussianPDF(x: number, mu: number, sigma: number): number {
  const s = Math.max(1e-6, sigma)
  const z = (x - mu) / s
  return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z)
}

/** Décomposition ELBO type VAE : L = E[log p(x|z)] − KL(q(z|x) || p(z)) */
export function vaeElbo(reconstruction: number, kl: number): number {
  return reconstruction - kl
}

/** log P(D) = ELBO + KL(q||p) — ici ELBO et KL en unités cohérentes pour la démo */
export function logEvidenceDecomposition(elbo: number, kl: number): number {
  return elbo + kl
}
