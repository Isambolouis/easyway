import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function ProbSlider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
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

export type MultiplicationFormulaWidgetProps = {
  initialPA?: number
  initialPBgivenA?: number
}

/** P(A∩B) = P(A)·P(B|A) — rectangle : largeur P(A), hauteur P(B|A) dans A. */
export function MultiplicationFormulaWidget({
  initialPA = 0.6,
  initialPBgivenA = 0.35,
}: MultiplicationFormulaWidgetProps = {}) {
  const [pA, setPA] = useState(initialPA)
  const [pBgivenA, setPBgivenA] = useState(initialPBgivenA)

  const joint = useMemo(() => pA * pBgivenA, [pA, pBgivenA])

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      <div className="interactive-panel__body grid min-w-[min(100%,20rem)] grid-cols-1 gap-6 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <MathBlock tex="P(A \cap B) = P(A)\,P(B|A)" className="!my-0" />
          <div className="scroll-x-card space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <ProbSlider label="P(A)" value={pA} onChange={setPA} />
            <ProbSlider label="P(B|A)" value={pBgivenA} onChange={setPBgivenA} />
          </div>
          <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-deep">
            <MathInline tex="P(A \cap B)" /> = <MathInline tex="P(A) \cdot P(B|A)" /> ≈{' '}
            <strong>{joint.toFixed(2)}</strong>
          </p>
          <p className="text-xs text-muted">
            Équivalent : <MathInline tex="P(A \cap B) = P(B|A)\,P(A)" /> — très utilisé en IA et statistiques.
          </p>
        </div>

        <div className="flex min-w-[240px] flex-col justify-center">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
            Modèle en aires (Ω = carré unité)
          </p>
          <div className="relative mx-auto aspect-square w-full max-w-[280px]">
            <svg viewBox="0 0 100 100" className="h-full w-full rounded-lg border-2 border-slate-300 bg-white">
              <rect x={0} y={0} width={pA * 100} height={100} fill="#93c5fd" fillOpacity={0.35} />
              <rect
                x={0}
                y={0}
                width={pA * 100}
                height={pBgivenA * 100}
                fill="#a78bfa"
                fillOpacity={0.8}
              />
              <line
                x1={pA * 100}
                y1={0}
                x2={pA * 100}
                y2={100}
                stroke="#2563eb"
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <line
                x1={0}
                y1={pBgivenA * 100}
                x2={pA * 100}
                y2={pBgivenA * 100}
                stroke="#2563eb"
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text
                x={(pA * 100) / 2}
                y={(pBgivenA * 100) / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={700}
                fill="#1e1b4b"
              >
                {joint.toFixed(2)}
              </text>
            </svg>
            <p
              className="absolute -top-0.5 text-[10px] font-medium text-blue-800"
              style={{ left: `${(pA * 100) / 2}%`, transform: 'translateX(-50%)' }}
            >
              P(A) = {pA.toFixed(2)}
            </p>
            <p className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 pr-1 text-[10px] font-medium text-violet-900">
              P(B|A) = {pBgivenA.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
