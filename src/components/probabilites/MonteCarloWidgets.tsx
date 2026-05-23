import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import {
  errorRatio,
  estimateAccuracy,
  estimateExpectationFromFreq,
  estimatePi,
  estimateProbability,
  monteCarloIntegralXSquared,
} from '@/components/probabilites/monteCarloMath'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm'

function ProbSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
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
        <span className="w-16 text-right font-mono text-xs text-muted">{value.toLocaleString('fr-FR')}</span>
      </div>
    </label>
  )
}

/** Ex. 1 — P(X>0) ≈ succès / n */
export function MonteCarloProbabilityWidget({
  initialN = 2000,
  initialSuccesses = 1240,
}: {
  initialN?: number
  initialSuccesses?: number
}) {
  const [n, setN] = useState(initialN)
  const [successes, setSuccesses] = useState(Math.min(initialSuccesses, initialN))
  const p = estimateProbability(successes, n)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Estimation de P(X &gt; 0)</p>
      <MathBlock tex="P(X>0) \approx \frac{\#\{X_i>0\}}{n}" className="!my-2 text-sm" />
      <ProbSlider label="n (simulations)" value={n} onChange={(v) => { setN(v); setSuccesses((s) => Math.min(s, v)) }} min={100} max={10000} step={100} />
      <ProbSlider label="#(Xᵢ > 0)" value={successes} onChange={setSuccesses} min={0} max={n} step={10} />
      <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
        P̂(X &gt; 0) = <strong>{p.toFixed(3)}</strong> ({successes}/{n})
      </p>
    </div>
  )
}

/** Ex. 2 — estimation de π */
export function MonteCarloPiWidget({
  initialTotal = 10000,
  initialInCircle = 7850,
}: {
  initialTotal?: number
  initialInCircle?: number
}) {
  const [total, setTotal] = useState(initialTotal)
  const [inside, setInside] = useState(Math.min(initialInCircle, initialTotal))
  const piEst = estimatePi(inside, total)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Estimation de π (cercle dans le carré)</p>
      <MathBlock tex="\pi \approx 4 \times \frac{\text{points cercle}}{\text{points totaux}}" className="!my-2 text-sm" />
      <ProbSlider label="Points totaux" value={total} onChange={(v) => { setTotal(v); setInside((x) => Math.min(x, v)) }} min={1000} max={50000} step={500} />
      <ProbSlider label="Points dans le cercle" value={inside} onChange={setInside} min={0} max={total} step={50} />
      <p className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
        π̂ ≈ <strong>{piEst.toFixed(4)}</strong> (vrai π ≈ 3,14159)
      </p>
    </div>
  )
}

/** Ex. 3 — E(X) par fréquences */
export function MonteCarloExpectationWidget() {
  const values = [1, 2, 3]
  const freqs = [300, 500, 200]
  const ex = estimateExpectationFromFreq(values, freqs)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Espérance empirique E(X)</p>
      <MathBlock tex="E(X) \approx \frac{1}{n}\sum x_i" className="!my-2 text-sm" />
      <table className="mt-2 w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-1 text-left">Valeur</th>
            <th className="py-1 text-right">Fréquence</th>
          </tr>
        </thead>
        <tbody>
          {values.map((v, i) => (
            <tr key={v}>
              <td className="py-1">{v}</td>
              <td className="py-1 text-right font-mono">{freqs[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MathBlock tex="E(X)=\frac{1\times300+2\times500+3\times200}{1000}=1{,}9" className="!my-2 text-sm" />
      <p className="text-sm">
        Ê(X) = <strong>{ex.toFixed(1)}</strong>
      </p>
    </div>
  )
}

/** Ex. 4 — ∫₀¹ x² dx */
export function MonteCarloIntegralWidget() {
  const [n, setN] = useState(5000)
  const [seed, setSeed] = useState(0)
  const estimate = useMemo(() => {
    void seed
    return monteCarloIntegralXSquared(n)
  }, [n, seed])

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Intégrale I = ∫₀¹ x² dx</p>
      <MathBlock tex="I \approx \frac{1}{n}\sum_{i=1}^n X_i^2,\quad X_i \sim U(0,1)" className="!my-2 text-sm" />
      <ProbSlider label="n" value={n} onChange={setN} min={500} max={50000} step={500} />
      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
      >
        Relancer la simulation
      </button>
      <p className="mt-2 text-sm">
        Î ≈ <strong>{estimate.toFixed(4)}</strong> · valeur exacte I = 1/3 ≈ 0,3333
      </p>
    </div>
  )
}

/** Ex. 5 — accuracy modèle IA */
export function MonteCarloAccuracyWidget() {
  const correct = 7200
  const total = 10000
  const acc = estimateAccuracy(correct, total)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Accuracy d’un modèle (10 000 prédictions)</p>
      <MathBlock tex="\text{Accuracy}=\frac{\text{correct}}{\text{total}}" className="!my-2 text-sm" />
      <p className="text-sm text-muted">7 200 correctes sur 10 000.</p>
      <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
        Accuracy = {(acc * 100).toFixed(0)} %
      </p>
    </div>
  )
}

/** Ex. 6 — erreur ∝ 1/√n */
export function MonteCarloErrorWidget() {
  const [n1, setN1] = useState(1000)
  const [n2, setN2] = useState(10000)
  const ratio = errorRatio(n1, n2)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Erreur Monte Carlo ~ 1/√n</p>
      <MathBlock tex="\frac{\text{Err}_{n_2}}{\text{Err}_{n_1}} \approx \sqrt{\frac{n_1}{n_2}}" className="!my-2 text-sm" />
      <ProbSlider label="n₁" value={n1} onChange={setN1} min={100} max={5000} step={100} />
      <ProbSlider label="n₂" value={n2} onChange={setN2} min={1000} max={100000} step={1000} />
      <p className="text-sm">
        En passant de n₁ à n₂, l’erreur est divisée par environ{' '}
        <strong>{ratio.toFixed(2)}</strong> (√10 ≈ 3,16 pour 1000 → 10 000).
      </p>
    </div>
  )
}
