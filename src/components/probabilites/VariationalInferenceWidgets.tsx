import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import { DensityPlotCanvas } from '@/components/probabilites/DensityPlotCanvas'
import {
  gaussianPDF,
  klGaussian1D,
  logEvidenceDecomposition,
  vaeElbo,
} from '@/components/probabilites/variationalInferenceMath'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm'

function ProbSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.05,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-deep">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
        />
        <span className="w-14 text-right font-mono text-xs text-muted">{value.toFixed(2)}</span>
      </div>
    </label>
  )
}

/** q(θ)=N(μ,σ²) vs posterior cible p≈N(2, 0.6²) — minimiser KL */
export function VariationalGaussianWidget({
  targetMu = 2,
  targetSigma = 0.6,
}: {
  targetMu?: number
  targetSigma?: number
}) {
  const [mu, setMu] = useState(0)
  const [sigma, setSigma] = useState(1.2)
  const kl = klGaussian1D(mu, sigma, targetMu, targetSigma)
  const xMin = targetMu - 4
  const xMax = targetMu + 4

  const fnQ = useMemo(() => (x: number) => gaussianPDF(x, mu, sigma), [mu, sigma])
  const fnP = useMemo(() => (x: number) => gaussianPDF(x, targetMu, targetSigma), [targetMu, targetSigma])

  return (
    <div className={`${panel} grid gap-4 lg:grid-cols-2`}>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-deep">Approximation q(θ) ≈ P(θ|D)</p>
        <MathBlock tex="q(\theta)=\mathcal{N}(\mu,\sigma^2)" className="!my-1 text-sm" />
        <ProbSlider label="μ (moyenne de q)" value={mu} onChange={setMu} min={-1} max={4} />
        <ProbSlider label="σ (écart-type de q)" value={sigma} onChange={setSigma} min={0.2} max={2} step={0.05} />
        <p className="text-sm">
          Cible p ≈ N({targetMu}, {targetSigma}²) ·{' '}
          <MathInline tex="KL(q\|p)" /> ≈ <strong>{kl.toFixed(3)}</strong>
        </p>
        <p className="text-xs text-muted">Rapprochez μ et σ de la cible pour faire baisser KL → 0.</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted">q(θ) — approximation</p>
        <DensityPlotCanvas fn={fnQ} xMin={xMin} xMax={xMax} curveColor="#2563eb" height={160} />
        <p className="text-xs text-muted">p(θ|D) — cible (fixe)</p>
        <DensityPlotCanvas fn={fnP} xMin={xMin} xMax={xMax} curveColor="#94a3b8" height={160} />
      </div>
    </div>
  )
}

/** ELBO = reconstruction − KL (forme VAE) */
export function VAEElobWidget() {
  const [recon, setRecon] = useState(0.85)
  const [kl, setKl] = useState(0.25)
  const elbo = vaeElbo(recon, kl)
  const logPD = logEvidenceDecomposition(elbo, kl)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">ELBO — forme VAE</p>
      <MathBlock tex="\mathcal{L}=E[\log p(x|z)] - KL(q(z|x)\|p(z))" className="!my-2 text-sm" />
      <ProbSlider label="E[log p(x|z)] — reconstruction" value={recon} onChange={setRecon} min={0} max={1} />
      <ProbSlider label="KL(q(z|x) || p(z))" value={kl} onChange={setKl} min={0} max={1} />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
          ELBO = <strong>{elbo.toFixed(3)}</strong>
        </div>
        <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
          log P(D) ≈ ELBO + KL = <strong>{logPD.toFixed(3)}</strong>
        </div>
      </div>
      <div className="mt-3 flex h-16 items-end gap-2">
        <div className="flex flex-1 flex-col items-center">
          <div className="w-full rounded-t bg-emerald-500" style={{ height: `${recon * 100}%`, minHeight: 4 }} />
          <span className="mt-1 text-[10px]">Recon.</span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="w-full rounded-t bg-amber-500" style={{ height: `${kl * 100}%`, minHeight: 4 }} />
          <span className="mt-1 text-[10px]">KL</span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="w-full rounded-t bg-violet-600" style={{ height: `${Math.max(0, elbo) * 100}%`, minHeight: 4 }} />
          <span className="mt-1 text-[10px]">ELBO</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">Maximiser ELBO = minimiser KL(q||p) — entraînement par gradient.</p>
    </div>
  )
}

/** Schéma encodeur / décodeur */
export function VAESchemaWidget() {
  return (
    <div className={`${panel} flex flex-wrap items-center justify-center gap-3 py-6 text-sm`}>
      <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 font-medium">x</span>
      <span className="text-muted">→</span>
      <span className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 font-medium">Encodeur q(z|x)</span>
      <span className="text-muted">→</span>
      <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 font-medium">z</span>
      <span className="text-muted">→</span>
      <span className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 font-medium">Décodeur p(x|z)</span>
      <span className="text-muted">→</span>
      <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 font-medium">x̂</span>
    </div>
  )
}
