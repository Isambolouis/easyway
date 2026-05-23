import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'

const DEFAULT_WORDS = [
  { id: 'gratuit', label: 'gratuit', pWordGivenSpam: 0.8, pWordGivenHam: 0.05 },
  { id: 'argent', label: 'argent', pWordGivenSpam: 0.7, pWordGivenHam: 0.08 },
  { id: 'gagne', label: 'gagne', pWordGivenSpam: 0.9, pWordGivenHam: 0.03 },
]

function clamp01(v: number) {
  return Math.min(1, Math.max(0.001, v))
}

/** Score Naive Bayes : produit des P(mot|classe) × prior (proportions, pas normalisées). */
export function NaiveBayesSpamWidget() {
  const [priorSpam, setPriorSpam] = useState(0.4)

  const { scoreSpam, scoreHam, ratio } = useMemo(() => {
    let s = priorSpam
    let h = 1 - priorSpam
    for (const w of DEFAULT_WORDS) {
      s *= w.pWordGivenSpam
      h *= w.pWordGivenHam
    }
    const total = s + h
    return { scoreSpam: s, scoreHam: h, ratio: total > 0 ? s / total : 0.5 }
  }, [priorSpam])

  const decision = ratio > 0.5 ? 'Spam' : 'Non-spam'

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      <div className="interactive-panel__body space-y-4 p-4 sm:p-5">
        <MathBlock tex="P(\text{Spam}|M) \propto P(\text{Spam}) \prod_i P(m_i|\text{Spam})" className="!my-0" />
        <div className="scroll-x-card overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[280px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-3 py-2 font-semibold text-deep">Mot</th>
                <th className="px-3 py-2 font-semibold text-deep">P(mot|Spam)</th>
                <th className="px-3 py-2 font-semibold text-deep">P(mot|Ham)</th>
              </tr>
            </thead>
            <tbody>
              {DEFAULT_WORDS.map((w) => (
                <tr key={w.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 font-medium">{w.label}</td>
                  <td className="px-3 py-2 font-mono text-violet-800">{w.pWordGivenSpam}</td>
                  <td className="px-3 py-2 font-mono text-slate-600">{w.pWordGivenHam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label className="block text-sm">
          <span className="font-medium text-deep">P(Spam) a priori</span>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="range"
              min={0.05}
              max={0.95}
              step={0.01}
              value={priorSpam}
              onChange={(e) => setPriorSpam(clamp01(Number(e.target.value)))}
              className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
            />
            <span className="w-12 font-mono text-xs text-muted">{priorSpam.toFixed(2)}</span>
          </div>
        </label>
        <p className="text-sm text-muted">
          Produit spam ≈ {priorSpam.toFixed(2)} × 0.8 × 0.7 × 0.9 ={' '}
          <strong>{(priorSpam * 0.8 * 0.7 * 0.9).toExponential(2)}</strong>
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-3 text-center">
            <p className="text-xs text-muted">Score Spam (proportionnel)</p>
            <p className="text-lg font-bold text-violet-900">{scoreSpam.toExponential(2)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-xs text-muted">Score Non-spam</p>
            <p className="text-lg font-bold text-slate-700">{scoreHam.toExponential(2)}</p>
          </div>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-violet-600 transition-all duration-300"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
        <p className="text-center text-sm font-semibold text-deep">
          P(Spam | mots) ≈ {(ratio * 100).toFixed(0)} % → <span className="text-violet-700">{decision}</span>
        </p>
        <p className="text-xs text-muted">
          Hypothèse naïve : <MathInline tex="P(M|\text{Spam}) \approx \prod P(m_i|\text{Spam})" /> — les mots sont
          traités comme indépendants sachant la classe.
        </p>
      </div>
    </div>
  )
}
