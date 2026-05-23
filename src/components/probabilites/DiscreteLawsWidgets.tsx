import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import {
  bernoulliPMF,
  binomCoeff,
  binomialPMF,
  binomialPMFVector,
  geometricPMF,
  geometricPMFVector,
  poissonPMF,
  poissonPMFVector,
} from '@/components/probabilites/discreteLawsMath'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function ProbSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
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
        <span className="w-14 text-right font-mono text-xs text-muted">
          {step >= 1 ? value : value.toFixed(2)}
        </span>
      </div>
    </label>
  )
}

function PMFBarChart({
  data,
  highlightK,
  xLabel = 'k',
}: {
  data: { k: number; p: number }[]
  highlightK?: number
  xLabel?: string
}) {
  const maxP = Math.max(...data.map((d) => d.p), 0.001)
  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <p className="mb-2 text-xs text-muted">Répartition P(X = {xLabel})</p>
      <div className="flex h-28 items-end justify-center gap-0.5 sm:gap-1">
        {data.map(({ k, p }) => {
          const h = (p / maxP) * 100
          const active = highlightK === k
          return (
            <div key={k} className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-mono text-muted sm:text-[10px]">{p.toFixed(2)}</span>
              <div
                className={`w-6 rounded-t transition-all sm:w-8 ${active ? 'bg-violet-600' : 'bg-emerald-500/75'}`}
                style={{ height: `${Math.max(h, 6)}%`, minHeight: '0.35rem' }}
                title={`P(X=${k})=${p.toFixed(4)}`}
              />
              <span className={`font-mono text-[10px] ${active ? 'font-bold text-violet-800' : 'text-muted'}`}>
                {k}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const panelClass = 'interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4'

export function BernoulliLawWidget({ initialP = 0.35 }: { initialP?: number }) {
  const [p, setP] = useState(initialP)
  const p0 = bernoulliPMF(p, 0)
  const p1 = bernoulliPMF(p, 1)

  return (
    <div className={panelClass}>
      <p className="mb-3 text-sm font-semibold text-deep">Loi de Bernoulli — X ~ B(p)</p>
      <ProbSlider label="p (probabilité de succès)" value={p} onChange={(v) => setP(clamp01(v))} />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          P(X = 0) = 1 − p = <strong>{p0.toFixed(3)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          P(X = 1) = p = <strong>{p1.toFixed(3)}</strong>
        </div>
      </div>
      <PMFBarChart data={[{ k: 0, p: p0 }, { k: 1, p: p1 }]} xLabel="x" />
    </div>
  )
}

export type BinomialLawWidgetProps = {
  initialN?: number
  initialP?: number
  initialK?: number
  title?: string
}

export function BinomialLawWidget({
  initialN = 5,
  initialP = 0.5,
  initialK = 2,
  title = 'Loi binomiale — X ~ B(n, p)',
}: BinomialLawWidgetProps) {
  const [n, setN] = useState(initialN)
  const [p, setP] = useState(initialP)
  const [k, setK] = useState(initialK)

  const kClamped = Math.min(Math.max(0, k), n)
  const coeff = binomCoeff(n, kClamped)
  const prob = binomialPMF(n, p, kClamped)
  const pmf = useMemo(() => binomialPMFVector(n, p), [n, p])

  return (
    <div className={panelClass}>
      <p className="mb-3 text-sm font-semibold text-deep">{title}</p>
      <div className="space-y-3">
        <ProbSlider
          label="n (nombre d’essais)"
          value={n}
          onChange={(v) => {
            const nn = Math.round(Math.min(20, Math.max(1, v)))
            setN(nn)
            setK((prev) => Math.min(prev, nn))
          }}
          min={1}
          max={20}
          step={1}
        />
        <ProbSlider label="p (probabilité de succès)" value={p} onChange={(v) => setP(clamp01(v))} />
        <ProbSlider
          label="k (nombre de succès observé)"
          value={kClamped}
          onChange={(v) => setK(Math.round(Math.min(n, Math.max(0, v))))}
          min={0}
          max={n}
          step={1}
        />
      </div>
      <MathBlock
        tex={`P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k} \\Rightarrow P(X=${kClamped})=\\binom{${n}}{${kClamped}}\\cdot${p.toFixed(2)}^{${kClamped}}\\cdot${(1 - p).toFixed(2)}^{${n - kClamped}}`}
        className="!my-3 text-sm"
      />
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
          C<sub>n</sub><sup>k</sup> = <strong>{coeff}</strong>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
          <MathInline tex="P(X=k)" /> ≈ <strong>{prob.toFixed(4)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          ({(prob * 100).toFixed(1)} %)
        </div>
      </div>
      <PMFBarChart data={pmf} highlightK={kClamped} />
    </div>
  )
}

export function GeometricLawWidget({ initialP = 0.25 }: { initialP?: number }) {
  const [p, setP] = useState(initialP)
  const maxK = 12
  const pmf = useMemo(() => geometricPMFVector(p, maxK), [p])
  const [k, setK] = useState(3)
  const kClamped = Math.min(Math.max(1, k), maxK)
  const prob = geometricPMF(p, kClamped)

  return (
    <div className={panelClass}>
      <p className="mb-3 text-sm font-semibold text-deep">Loi géométrique — essais avant le 1<sup>er</sup> succès</p>
      <ProbSlider label="p" value={p} onChange={(v) => setP(clamp01(v))} />
      <ProbSlider label="k (rang du premier succès)" value={kClamped} onChange={setK} min={1} max={maxK} step={1} />
      <MathBlock tex={`P(X=k)=(1-p)^{k-1}p`} className="!my-2" />
      <p className="text-sm text-muted">
        <MathInline tex={`P(X=${kClamped})`} /> ≈ <strong>{prob.toFixed(4)}</strong>
      </p>
      <PMFBarChart data={pmf} highlightK={kClamped} />
    </div>
  )
}

export function PoissonLawWidget({ initialLambda = 3 }: { initialLambda?: number }) {
  const [lambda, setLambda] = useState(initialLambda)
  const maxK = Math.min(20, Math.max(8, Math.ceil(lambda + 4 * Math.sqrt(lambda))))
  const pmf = useMemo(() => poissonPMFVector(lambda, maxK), [lambda, maxK])
  const [k, setK] = useState(Math.min(3, maxK))
  const kClamped = Math.min(Math.max(0, k), maxK)
  const prob = poissonPMF(lambda, kClamped)

  return (
    <div className={panelClass}>
      <p className="mb-3 text-sm font-semibold text-deep">Loi de Poisson — X ~ P(λ)</p>
      <ProbSlider
        label="λ (taux moyen d’événements)"
        value={lambda}
        onChange={(v) => setLambda(Math.min(15, Math.max(0.1, v)))}
        min={0.1}
        max={15}
        step={0.1}
      />
      <ProbSlider label="k" value={kClamped} onChange={setK} min={0} max={maxK} step={1} />
      <MathBlock tex={`P(X=k)=\\frac{\\lambda^k e^{-\\lambda}}{k!}`} className="!my-2" />
      <p className="text-sm text-muted">
        <MathInline tex={`P(X=${kClamped})`} /> ≈ <strong>{prob.toFixed(4)}</strong> · E(X) = λ = {lambda.toFixed(1)}
      </p>
      <PMFBarChart data={pmf} highlightK={kClamped} />
    </div>
  )
}

/** Exercice examen : 4 pièces, exactement 2 Pile */
export function CoinExamBinomialWidget() {
  return (
    <BinomialLawWidget
      initialN={4}
      initialP={0.5}
      initialK={2}
      title="Exercice — 4 lancers, exactement 2 succès (Pile)"
    />
  )
}
