import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import {
  poissonProcessPMF,
  randomWalkExpectation,
  randomWalkVarianceAt1,
  stepExpectation,
  totalProbability,
} from '@/components/probabilites/stochasticProcessMath'

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

/** Marche aléatoire : X_{t+1} = X_t + ε_t */
export function RandomWalkWidget({ initialPUp = 0.7 }: { initialPUp?: number }) {
  const [pUp, setPUp] = useState(initialPUp)
  const [t, setT] = useState(2)
  const eEps = stepExpectation(pUp)
  const v1 = randomWalkVarianceAt1(pUp)
  const ex1 = randomWalkExpectation(1, pUp)
  const ext = randomWalkExpectation(t, pUp)

  const path = useMemo(() => {
    const positions = [0]
    let cur = 0
    for (let i = 0; i < t; i++) {
      cur += eEps
      positions.push(cur)
    }
    return positions
  }, [t, eEps])

  const maxAbs = Math.max(...path.map(Math.abs), 1)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Marche aléatoire — X_{'{t+1}'} = X_t + ε_t</p>
      <MathBlock tex="P(\varepsilon=+1)=p,\quad P(\varepsilon=-1)=1-p" className="!my-2 text-sm" />
      <ProbSlider label="p = P(ε = +1)" value={pUp} onChange={setPUp} min={0} max={1} />
      <ProbSlider label="t (nombre de pas)" value={t} onChange={setT} min={1} max={10} step={1} />
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MathInline tex="E[\varepsilon]" /> ≈ <strong>{eEps.toFixed(2)}</strong>
        </div>
        <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
          <MathInline tex="E[X_1]" /> ≈ <strong>{ex1.toFixed(2)}</strong>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
          <MathInline tex={`E[X_${t}]`} /> ≈ <strong>{ext.toFixed(2)}</strong>
        </div>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
        <MathInline tex="V(X_1)=V(\varepsilon)" /> ≈ <strong>{v1.toFixed(2)}</strong>
      </div>
      <div className="mt-4 flex h-28 items-end justify-center gap-1 border-t border-slate-100 pt-3">
        {path.map((pos, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-muted">{pos.toFixed(1)}</span>
            <div
              className="w-8 rounded-t bg-emerald-500/75"
              style={{
                height: `${((pos + maxAbs) / (2 * maxAbs)) * 80 + 10}%`,
                minHeight: '0.35rem',
              }}
            />
            <span className="text-[10px] text-muted">t={i}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">Trajectoire « moyenne » : chaque pas = E[ε] (déterministe pour visualiser E[X_t]).</p>
    </div>
  )
}

/** N(t) ~ Poisson(λt) */
export function PoissonProcessWidget({
  initialLambda = 2,
  initialT = 1,
  initialK = 3,
}: {
  initialLambda?: number
  initialT?: number
  initialK?: number
}) {
  const [lambda, setLambda] = useState(initialLambda)
  const [time, setTime] = useState(initialT)
  const [k, setK] = useState(initialK)
  const prob = poissonProcessPMF(k, lambda, time)
  const maxK = Math.min(15, Math.max(8, Math.ceil(lambda * time + 5)))

  const pmf = useMemo(() => {
    return Array.from({ length: maxK + 1 }, (_, i) => ({
      k: i,
      p: poissonProcessPMF(i, lambda, time),
    }))
  }, [lambda, time, maxK])

  const maxP = Math.max(...pmf.map((d) => d.p), 0.01)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Processus de Poisson — N(t) ~ Poisson(λt)</p>
      <MathBlock tex="P(N(t)=k)=\frac{(\lambda t)^k e^{-\lambda t}}{k!}" className="!my-2 text-sm" />
      <ProbSlider label="λ (taux)" value={lambda} onChange={setLambda} min={0.5} max={5} step={0.1} />
      <ProbSlider label="t (temps)" value={time} onChange={setTime} min={0.1} max={3} step={0.1} />
      <ProbSlider label="k (nombre d’événements)" value={k} onChange={setK} min={0} max={maxK} step={1} />
      <p className="text-sm">
        <MathInline tex={`P(N(${time.toFixed(1)})=${k})`} /> ≈ <strong>{prob.toFixed(3)}</strong>
      </p>
      <div className="mt-3 flex h-24 items-end justify-center gap-0.5">
        {pmf.map(({ k: kk, p }) => (
          <div key={kk} className="flex flex-col items-center">
            <div
              className={`w-5 rounded-t sm:w-6 ${kk === k ? 'bg-violet-600' : 'bg-emerald-500/70'}`}
              style={{ height: `${(p / maxP) * 100}%`, minHeight: '3px' }}
            />
            <span className="text-[9px] text-muted">{kk}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Exercice 5 — clics utilisateur actif / inactif */
export function ClickTotalProbabilityWidget() {
  const pCgivenA = 0.3
  const pA = 0.6
  const pCgivenNotA = 0.05
  const pC = totalProbability(pCgivenA, pA, pCgivenNotA)

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">Loi des probabilités totales — P(clic)</p>
      <ul className="list-disc pl-5 text-sm text-muted">
        <li>P(clic | actif) = 0,3 · P(actif) = 0,6</li>
        <li>P(clic | inactif) = 0,05 · P(inactif) = 0,4</li>
      </ul>
      <MathBlock tex="P(C)=P(C|A)P(A)+P(C|\neg A)P(\neg A)" className="!my-2" />
      <MathBlock tex="P(C)=0{,}3\times0{,}6+0{,}05\times0{,}4=0{,}2" className="!my-2" />
      <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
        P(clic) = {pC.toFixed(2)} (20 %)
      </p>
    </div>
  )
}
