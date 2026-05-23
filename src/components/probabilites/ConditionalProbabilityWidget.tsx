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
  max = 1,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  max?: number
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-deep">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={max}
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

export type ConditionalProbabilityWidgetProps = {
  initialPB?: number
  initialPAB?: number
  title?: string
}

/** P(A|B) = P(A∩B)/P(B) — barre : on « zoome » sur B, part violette = A∩B. */
export function ConditionalProbabilityWidget({
  initialPB = 0.65,
  initialPAB = 0.3,
  title,
}: ConditionalProbabilityWidgetProps = {}) {
  const [pB, setPB] = useState(initialPB)
  const [pAB, setPAB] = useState(() => Math.min(initialPAB, initialPB))

  const pABclamped = useMemo(() => Math.min(pAB, pB), [pAB, pB])
  const pAgivenB = useMemo(() => (pB > 0.001 ? pABclamped / pB : 0), [pABclamped, pB])

  const barW = 280
  const barH = 56
  const wB = pB * barW
  const wAB = pABclamped * barW

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      {title && <p className="border-b border-emerald-100 px-4 py-2 text-sm font-semibold text-deep">{title}</p>}
      <div className="interactive-panel__body grid min-w-[min(100%,20rem)] grid-cols-1 gap-6 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <MathBlock tex="P(A|B) = \frac{P(A \cap B)}{P(B)}" className="!my-0" />
          <div className="scroll-x-card space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <ProbSlider label="P(B)" value={pB} onChange={(v) => { setPB(v); setPAB((prev) => Math.min(prev, v)) }} />
            <ProbSlider
              label="P(A ∩ B)"
              value={pABclamped}
              onChange={setPAB}
              max={Math.max(pB, 0.01)}
            />
          </div>
          <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-deep">
            <MathInline tex="P(A|B)" /> ={' '}
            <span className="font-mono">
              {pABclamped.toFixed(2)}/{pB.toFixed(2)}
            </span>{' '}
            ≈ <strong>{pAgivenB.toFixed(2)}</strong>
          </p>
        </div>

        <div className="flex min-w-[240px] flex-col justify-center">
          <p className="mb-1 text-center text-sm font-medium text-deep">
            <MathInline tex="P(A|B)" /> ≈ {pAgivenB.toFixed(2)}
          </p>
          <p className="mb-3 text-center text-xs text-muted">
            <MathInline tex="A \cap B" /> est la partie de <MathInline tex="B" /> où <MathInline tex="A" /> arrive aussi
          </p>
          <svg viewBox={`0 0 ${barW} ${barH + 28}`} className="mx-auto h-auto w-full max-w-[320px]">
            <rect x={0} y={20} width={barW} height={barH} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={2} rx={4} />
            {wB > 0 && (
              <>
                <rect x={0} y={20} width={wB} height={barH} fill="#bfdbfe" fillOpacity={0.7} />
                <rect x={0} y={20} width={wAB} height={barH} fill="#a78bfa" fillOpacity={0.9} />
                <rect x={wB} y={20} width={barW - wB} height={barH} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
              </>
            )}
            <text x={wB / 2} y={14} textAnchor="middle" fontSize={11} fill="#1e40af" fontWeight={600}>
              P(B) = {pB.toFixed(2)}
            </text>
            <text x={wAB / 2} y={barH + 36} textAnchor="middle" fontSize={11} fill="#5b21b6" fontWeight={600}>
              P(A ∩ B) = {pABclamped.toFixed(2)}
            </text>
          </svg>
          <p className="mt-2 text-center text-xs text-muted">
            La barre colorée = nouvel univers (on sait que B est réalisé).
          </p>
        </div>
      </div>
    </div>
  )
}
