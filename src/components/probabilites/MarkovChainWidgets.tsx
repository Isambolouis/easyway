import { useMemo, useState, type ReactNode } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import {
  DEFAULT_WEATHER_MATRIX,
  WEATHER_EMOJI,
  WEATHER_LABELS,
  distributionAfterSteps,
  normalizeMatrix,
  pathProbability,
  type MarkovMatrix,
} from '@/components/probabilites/markovChainMath'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm'

function WidgetGrid({ controls, plot }: { controls: ReactNode; plot: ReactNode }) {
  return (
    <div className={`${panel} grid gap-4 lg:grid-cols-2`}>
      <div className="min-w-[240px] space-y-3">{controls}</div>
      <div className="min-w-[200px]">{plot}</div>
    </div>
  )
}

function TransitionMatrixTable({
  P,
  onChange,
  readOnly = false,
}: {
  P: MarkovMatrix
  onChange?: (P: MarkovMatrix) => void
  readOnly?: boolean
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse text-center text-sm">
        <thead>
          <tr className="border-b-2 border-emerald-200">
            <th className="bg-emerald-50/80 px-2 py-2 text-left text-xs font-semibold">From \ To</th>
            {WEATHER_LABELS.map((l, j) => (
              <th key={l} className="px-2 py-2 font-medium">
                {WEATHER_EMOJI[j]} {l}
              </th>
            ))}
            <th className="px-2 py-2 text-xs text-muted">Σ</th>
          </tr>
        </thead>
        <tbody>
          {P.map((row, i) => {
            const sum = row.reduce((s, v) => s + v, 0)
            return (
              <tr key={WEATHER_LABELS[i]} className="border-b border-slate-100">
                <td className="bg-emerald-50/40 px-2 py-2 text-left font-medium">
                  {WEATHER_EMOJI[i]} {WEATHER_LABELS[i]}
                </td>
                {row.map((p, j) => (
                  <td key={j} className="px-1 py-1">
                    {readOnly ? (
                      <span className="font-mono">{p.toFixed(2)}</span>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        max={1}
                        step={0.05}
                        value={p}
                        onChange={(e) => {
                          const next = P.map((r) => [...r])
                          next[i][j] = Math.max(0, Number(e.target.value))
                          onChange?.(normalizeMatrix(next))
                        }}
                        className="w-14 rounded border border-slate-200 px-1 py-1 text-center font-mono text-xs"
                      />
                    )}
                  </td>
                ))}
                <td className={`px-2 font-mono text-xs ${Math.abs(sum - 1) < 0.01 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {sum.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function DistributionBars({ dist, title }: { dist: number[]; title: string }) {
  const max = Math.max(...dist, 0.01)
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-deep">{title}</p>
      <div className="flex h-24 items-end justify-center gap-2">
        {dist.map((p, i) => (
          <div key={WEATHER_LABELS[i]} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-muted">{(p * 100).toFixed(0)}%</span>
            <div
              className="w-10 rounded-t bg-emerald-500/80"
              style={{ height: `${(p / max) * 100}%`, minHeight: '4px' }}
            />
            <span className="text-[10px]">{WEATHER_EMOJI[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarkovWeatherWidget() {
  const [P, setP] = useState<MarkovMatrix>(() => DEFAULT_WEATHER_MATRIX.map((r) => [...r]))
  const [current, setCurrent] = useState(0)
  const [steps, setSteps] = useState(1)

  const tomorrow = useMemo(() => {
    const v = [0, 0, 0]
    v[current] = 1
    return distributionAfterSteps(v, P, 1)
  }, [P, current])

  const future = useMemo(() => {
    const v = [0, 0, 0]
    v[current] = 1
    return distributionAfterSteps(v, P, steps)
  }, [P, current, steps])

  return (
    <div className={panel}>
      <p className="mb-3 text-sm font-semibold text-deep">Matrice de transition — météo</p>
      <MathBlock tex="P_{ij}=P(X_{t+1}=j \mid X_t=i)" className="!my-2 text-sm" />
      <TransitionMatrixTable P={P} onChange={setP} />
      <p className="mt-2 text-xs text-muted">Chaque ligne somme à 1 (normalisation automatique).</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-deep">État aujourd’hui</span>
          <select
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            {WEATHER_LABELS.map((l, i) => (
              <option key={l} value={i}>
                {WEATHER_EMOJI[i]} {l}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-deep">Pas dans le futur (t + k)</span>
          <input
            type="range"
            min={1}
            max={5}
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="mt-2 h-2 w-full accent-emerald-600"
          />
          <span className="font-mono text-xs text-muted">k = {steps}</span>
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <DistributionBars dist={tomorrow} title="Demain (t + 1)" />
        <DistributionBars dist={future} title={`Dans ${steps} jour(s) (t + ${steps})`} />
      </div>

      <p className="mt-3 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
        Depuis {WEATHER_LABELS[current]} : P(Pluie demain) ={' '}
        <strong>{tomorrow[2].toFixed(2)}</strong>
        {current === 0 && ' (ex. soleil → pluie = 0,10 avec matrice par défaut)'}
      </p>
    </div>
  )
}

export function MarkovPathExamWidget() {
  const P = DEFAULT_WEATHER_MATRIX
  const path = [0, 1, 2] // Soleil → Nuage → Pluie
  const prob = pathProbability(path, P)

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">Chemin en 2 jours : Soleil → Nuage → Pluie</p>
          <MathBlock tex="P(S\to N\to P)=P(N|S)\times P(P|N)" className="!my-1" />
          <MathBlock tex="P=0{,}2\times0{,}3=0{,}06" className="!my-1" />
          <p className="text-sm text-muted">
            P(N|S) = {P[0][1].toFixed(1)} · P(P|N) = {P[1][2].toFixed(1)}
          </p>
          <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
            Probabilité ≈ {(prob * 100).toFixed(0)} %
          </p>
        </>
      }
      plot={
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          {['Soleil', 'Nuage', 'Pluie'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 font-medium">
                {WEATHER_EMOJI[i]} {label}
              </span>
              {i < 2 && (
                <span className="text-xs text-muted">
                  → P = {P[path[i]][path[i + 1]].toFixed(2)}
                </span>
              )}
            </div>
          ))}
        </div>
      }
    />
  )
}

const NLP_NEXT: Record<string, { word: string; p: number }[]> = {
  manger: [
    { word: 'pizza', p: 0.45 },
    { word: 'riz', p: 0.3 },
    { word: 'pain', p: 0.25 },
  ],
}

export function MarkovNgramWidget() {
  const context = 'je veux manger'
  const preds = NLP_NEXT.manger

  return (
    <div className={panel}>
      <p className="text-sm font-semibold text-deep">NLP — prédire le mot suivant (bigramme simplifié)</p>
      <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 font-mono text-sm">« {context} » → ?</p>
      <div className="mt-3 space-y-2">
        {preds.map(({ word, p }) => (
          <div key={word} className="flex items-center gap-3">
            <span className="w-16 font-medium">{word}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-violet-500" style={{ width: `${p * 100}%` }} />
            </div>
            <span className="w-12 text-right font-mono text-xs">{(p * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        <MathInline tex="P(w_t \mid w_{t-1})" /> — le futur (mot) ne dépend que du présent (mot précédent).
      </p>
    </div>
  )
}
