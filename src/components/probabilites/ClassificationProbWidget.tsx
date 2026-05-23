import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

/** Illustration de ŷ = argmax_y P(y|x) — deux classes. */
export function ClassificationProbWidget() {
  const [pSpam, setPSpam] = useState(0.82)

  const pHam = 1 - pSpam
  const predicted = pSpam >= pHam ? 'Spam' : 'Non-spam'

  const bars = useMemo(
    () => [
      { label: 'P(Spam | x)', value: pSpam, color: 'bg-violet-600' },
      { label: 'P(Non-spam | x)', value: pHam, color: 'bg-slate-500' },
    ],
    [pSpam, pHam],
  )

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      <div className="interactive-panel__body grid min-w-[min(100%,20rem)] grid-cols-1 gap-4 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-3">
          <MathBlock tex="\hat{y} = \arg\max_y P(y|x)" className="!my-0" />
          <label className="block text-sm">
            <span className="font-medium text-deep">P(Spam | email)</span>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={pSpam}
                onChange={(e) => setPSpam(clamp01(Number(e.target.value)))}
                className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
              />
              <span className="w-12 font-mono text-xs text-muted">{pSpam.toFixed(2)}</span>
            </div>
          </label>
          <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm">
            Classe prédite : <strong className="text-violet-800">{predicted}</strong>
          </p>
        </div>
        <div className="flex min-w-[200px] flex-col justify-center gap-3">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-medium text-deep">{b.label}</span>
                <span className="font-mono text-muted">{b.value.toFixed(2)}</span>
              </div>
              <div className="h-8 overflow-hidden rounded-lg bg-slate-200">
                <div
                  className={`flex h-full items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-300 ${b.color}`}
                  style={{ width: `${Math.max(b.value * 100, 4)}%` }}
                >
                  {b.value >= 0.15 && `${(b.value * 100).toFixed(0)}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
