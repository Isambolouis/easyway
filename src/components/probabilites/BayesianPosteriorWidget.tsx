import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import { computePosterior } from '@/components/probabilites/bayesianInferenceMath'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function ProbSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-deep">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(clamp01(Number(e.target.value)))}
          className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
        />
        <span className="w-12 text-right font-mono text-xs text-muted">{value.toFixed(2)}</span>
      </div>
    </label>
  )
}

export type BayesianPosteriorWidgetProps = {
  initialPrior?: number
  initialLikelihood?: number
  initialLikelihoodNot?: number
  title?: string
  thetaLabel?: string
}

export function BayesianPosteriorWidget({
  initialPrior = 0.5,
  initialLikelihood = 0.9,
  initialLikelihoodNot = 0.4,
  title = 'Inférence bayésienne — P(θ | D)',
  thetaLabel = 'θ',
}: BayesianPosteriorWidgetProps) {
  const [prior, setPrior] = useState(initialPrior)
  const [lik, setLik] = useState(initialLikelihood)
  const [likNot, setLikNot] = useState(initialLikelihoodNot)

  const { evidence, posterior } = useMemo(
    () => computePosterior(prior, lik, likNot),
    [prior, lik, likNot],
  )

  return (
    <div className="interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-deep">{title}</p>
      <MathBlock tex="P(\theta|D)=\frac{P(D|\theta)P(\theta)}{P(D)}" className="!my-2 text-sm" />
      <div className="space-y-3">
        <ProbSlider label={`P(${thetaLabel}) — prior`} value={prior} onChange={setPrior} />
        <ProbSlider label={`P(D | ${thetaLabel}) — likelihood`} value={lik} onChange={setLik} />
        <ProbSlider label={`P(D | ¬${thetaLabel})`} value={likNot} onChange={setLikNot} />
      </div>
      <MathBlock
        tex={`P(D)=${lik.toFixed(2)}\\times${prior.toFixed(2)}+${likNot.toFixed(2)}\\times${(1 - prior).toFixed(2)}=${evidence.toFixed(3)}`}
        className="!my-2 text-sm"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          Prior <strong>{(prior * 100).toFixed(0)} %</strong>
        </div>
        <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
          <MathInline tex={`P(${thetaLabel}|D)`} /> ≈ <strong>{(posterior * 100).toFixed(1)} %</strong>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        MAP : θ̂ = argmax P(θ|D) · MLE ignore le prior et maximise P(D|θ) seul.
      </p>
    </div>
  )
}

/** Exercice ch.13 : P(θ)=0.3, P(D|θ)=0.8, P(D|¬θ)=0.2 */
export function BayesianExam0363Widget() {
  return (
    <BayesianPosteriorWidget
      title="Exercice examen — calculer P(θ | D)"
      initialPrior={0.3}
      initialLikelihood={0.8}
      initialLikelihoodNot={0.2}
    />
  )
}

/** Exemple modèle performant : posterior ≈ 0.69 */
export function BayesianModelPerformanceWidget() {
  return (
    <BayesianPosteriorWidget
      title="Exemple — modèle performant (θ)"
      initialPrior={0.5}
      initialLikelihood={0.9}
      initialLikelihoodNot={0.4}
      thetaLabel="θ"
    />
  )
}

/** Examen final ex.7 */
export function BayesianFinalExamWidget() {
  return (
    <BayesianPosteriorWidget
      title="Exercice 7 — inférence bayésienne"
      initialPrior={0.4}
      initialLikelihood={0.9}
      initialLikelihoodNot={0.3}
    />
  )
}
