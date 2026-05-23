import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import { cn } from '@/lib/utils'

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

export type BayesTheoremWidgetProps = {
  initialPA?: number
  initialPBgivenA?: number
  initialPBgivenNotA?: number
  title?: string
}

export function BayesTheoremWidget({
  initialPA = 0.2,
  initialPBgivenA = 0.85,
  initialPBgivenNotA = 0.1,
  title,
}: BayesTheoremWidgetProps = {}) {
  const [pA, setPA] = useState(initialPA)
  const [pBgivenA, setPBgivenA] = useState(initialPBgivenA)
  const [pBgivenNotA, setPBgivenNotA] = useState(initialPBgivenNotA)

  const { pB, pBgivenA_times_pA, pAgivenB } = useMemo(() => {
    const pNotA = 1 - pA
    const pBVal = pBgivenA * pA + pBgivenNotA * pNotA
    const joint = pBgivenA * pA
    const posterior = pBVal > 0 ? joint / pBVal : 0
    return { pB: pBVal, pBgivenA_times_pA: joint, pAgivenB: posterior }
  }, [pA, pBgivenA, pBgivenNotA])

  const pBgivenNotA_times_pNotA = pB - pBgivenA_times_pA
  const purplePct = pB > 0.001 ? (pBgivenA_times_pA / pB) * 100 : 0

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      {title && <p className="border-b border-emerald-100 px-4 py-2 text-sm font-semibold text-deep">{title}</p>}
      <div className="interactive-panel__body grid min-w-[min(100%,20rem)] grid-cols-1 gap-6 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <MathBlock tex="P(A\mid B)=\frac{P(B\mid A)\,P(A)}{P(B)}" className="!my-0" />
          <div className="scroll-x-card space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <ProbSlider label="P(A)" value={pA} onChange={setPA} />
            <ProbSlider label="P(B | A)" value={pBgivenA} onChange={setPBgivenA} />
            <ProbSlider label="P(B | ¬A)" value={pBgivenNotA} onChange={setPBgivenNotA} />
          </div>
          <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-deep">
            <MathInline tex="P(A\mid B)" /> ≈ <strong>{pAgivenB.toFixed(2)}</strong>
            {' · '}
            <MathInline tex="P(B)" /> ≈ <strong>{pB.toFixed(2)}</strong>
          </p>
          <p className="text-xs text-muted">
            <MathInline tex="P(B)=P(B\mid A)P(A)+P(B\mid\neg A)P(\neg A)" />
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-muted">
            Posterior = preuve utile / preuve totale
          </p>
          <div className="relative mx-auto w-full max-w-md">
            <p className="mb-1 text-center text-xs text-muted">
              <MathInline tex="P(B)" /> = {pB.toFixed(2)}
            </p>
            <div className="relative h-14 w-full overflow-hidden rounded-lg border-2 border-slate-300 bg-white">
              {pB > 0.001 ? (
                <>
                  <div
                    className="absolute inset-y-0 left-0 bg-violet-500/85 transition-all duration-300"
                    style={{ width: `${purplePct}%` }}
                  />
                  <div
                    className="absolute inset-y-0 bg-amber-400/85 transition-all duration-300"
                    style={{ left: `${purplePct}%`, width: `${100 - purplePct}%` }}
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted">P(B) ≈ 0</div>
              )}
            </div>
            <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs">
              <span className="text-violet-800">
                <MathInline tex="P(B\mid A)P(A)" /> = {pBgivenA_times_pA.toFixed(3)}
              </span>
              <span className="text-amber-800">
                <MathInline tex="P(B\mid\neg A)P(\neg A)" /> = {pBgivenNotA_times_pNotA.toFixed(3)}
              </span>
            </div>
            <p className={cn('mt-2 text-center text-sm font-semibold text-deep')}>
              <MathInline tex="P(A\mid B)" /> ≈ {pAgivenB.toFixed(2)} ({(pAgivenB * 100).toFixed(1)} %)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
