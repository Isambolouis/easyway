import { useMemo } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'

type LawRow = { x: number; p: number; label?: string }

function computeStats(values: LawRow[]) {
  const sumP = values.reduce((s, r) => s + r.p, 0)
  const norm = values.map((r) => ({ ...r, p: r.p / sumP }))
  const ex = norm.reduce((s, r) => s + r.x * r.p, 0)
  const ex2 = norm.reduce((s, r) => s + r.x * r.x * r.p, 0)
  const variance = ex2 - ex * ex
  const sigma = Math.sqrt(Math.max(0, variance))
  return { norm, ex, ex2, variance, sigma, sumP }
}

function LawTable({ title, values }: { title: string; values: LawRow[] }) {
  const { norm, ex, ex2, variance, sigma } = useMemo(() => computeStats(values), [values])

  return (
    <div className="scroll-x-card my-4 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-deep">
        <span aria-hidden>📊</span> {title}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-b-2 border-emerald-200">
              <th className="bg-emerald-50/80 px-3 py-2 font-semibold text-deep">x</th>
              {norm.map((r) => (
                <th key={r.x} className="min-w-[3rem] border-l border-slate-100 px-2 py-2 font-mono">
                  {r.label ?? r.x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-emerald-50/50 px-3 py-2 font-semibold text-deep">P(X = x)</td>
              {norm.map((r) => (
                <td key={r.x} className="border-l border-slate-100 px-2 py-2 font-mono text-violet-800">
                  {r.p === 1 / 6 ? '1/6' : r.p.toFixed(3)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        Σ P(X = x) = {sumP(values).toFixed(4)} → normalisé à 1
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MathInline tex="E(X)" /> ≈ <strong>{ex.toFixed(3)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MathInline tex="E(X^2)" /> ≈ <strong>{ex2.toFixed(3)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MathInline tex="V(X)" /> ≈ <strong>{variance.toFixed(3)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <MathInline tex="\sigma" /> ≈ <strong>{sigma.toFixed(3)}</strong>
        </div>
      </div>
      <div className="mt-3 flex h-24 items-end justify-center gap-1 border-t border-slate-100 pt-3">
        {norm.map((r) => {
          const maxP = Math.max(...norm.map((x) => x.p))
          const h = maxP > 0 ? (r.p / maxP) * 100 : 0
          return (
            <div key={r.x} className="flex flex-col items-center gap-1">
              <div
                className="w-8 rounded-t bg-emerald-500/80 transition-all duration-300"
                style={{ height: `${Math.max(h, 8)}%`, minHeight: '0.5rem' }}
                title={`P=${r.p.toFixed(3)}`}
              />
              <span className="text-[10px] font-mono text-muted">{r.label ?? r.x}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function sumP(values: LawRow[]) {
  return values.reduce((s, r) => s + r.p, 0)
}

const DIE_LAW: LawRow[] = [1, 2, 3, 4, 5, 6].map((x) => ({ x, p: 1 / 6 }))

const GAIN_LAW: LawRow[] = [
  { x: 2, p: 3 / 6, label: '+2 (pair)' },
  { x: -1, p: 3 / 6, label: '−1 (impair)' },
]

export function DieLawWidget() {
  return (
    <div className="interactive-panel rounded-2xl border border-emerald-200 bg-emerald-50/30 p-1">
      <LawTable title="Table de loi — dé équilibré" values={DIE_LAW} />
    </div>
  )
}

export function GainExerciseLawWidget() {
  return <LawTable title="Table de loi — gain au dé (exercice)" values={GAIN_LAW} />
}

export function DiscreteRVFormulas() {
  return (
    <div className="my-4 space-y-2">
      <MathBlock tex="E(X)=\sum_i x_i\,P(X=x_i)" className="!my-1" />
      <MathBlock tex="V(X)=E(X^2)-[E(X)]^2" className="!my-1" />
      <MathBlock tex="\sigma=\sqrt{V(X)}" className="!my-1" />
    </div>
  )
}
