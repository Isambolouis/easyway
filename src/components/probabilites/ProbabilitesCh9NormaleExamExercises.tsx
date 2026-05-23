import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import {
  NormalEmpiricalRuleWidget,
  ZScoreExam5070Widget,
  ZScoreExample130Widget,
  ZScoreWidget,
} from '@/components/probabilites/ContinuousRVWidgets'
import { normalSymmetricIntervalProb, zScore } from '@/components/probabilites/continuousLawsMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh9NormaleExamExercises() {
  const z14 = zScore(14, 10, 2)
  const p68 = normalSymmetricIntervalProb(1)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices type examen — Loi normale</h3>
      <p className="text-muted">Standardisation, règle empirique et lecture de Φ(z).</p>

      <Accordion title="Exercice 1 — Standardiser X = 130, N(100, 15²)" defaultOpen>
        <MathBlock tex="Z = \frac{130 - 100}{15} = 2" className="!my-2" />
        <ZScoreExample130Widget />
        <ExerciseAnswer>Réponse : Z = 2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — X ~ N(50, 10²), X = 70">
        <MathBlock tex="Z = \frac{70 - 50}{10} = 2" className="!my-2" />
        <ZScoreExam5070Widget />
        <ExerciseAnswer>Réponse : Z = 2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — X ~ N(10, 4), calculer Z pour X = 14">
        <p className="text-sm text-muted">Variance σ² = 4 donc σ = 2.</p>
        <MathBlock tex="Z = \frac{14 - 10}{2} = 2" className="!my-2" />
        <ZScoreWidget initialMu={10} initialSigma={2} initialX={14} muMin={0} muMax={20} sigmaMin={1} sigmaMax={5} />
        <ExerciseAnswer>Réponse : Z = {z14.toFixed(0)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Règle empirique : P(μ − σ ≤ X ≤ μ + σ)">
        <MathBlock tex="P(\mu - \sigma \le X \le \mu + \sigma) \approx 0{,}68" className="!my-2" />
        <p className="text-sm text-muted">Valeur exacte (standard) : {(p68 * 100).toFixed(2)} %</p>
        <NormalEmpiricalRuleWidget initialMu={0} initialSigma={1} />
        <ExerciseAnswer>Réponse : environ 68 %</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Interprétation |Z| = 3">
        <p className="text-muted">
          Si |Z| = 3, la valeur est à 3 écarts-types de la moyenne — événement rare (≈ 0,3 % au-delà de μ ± 3σ).
        </p>
        <MathBlock tex="P(\mu - 3\sigma \le X \le \mu + 3\sigma) \approx 0{,}997" className="!my-2" />
        <ExerciseAnswer>Réponse : valeur extrême ; utile en détection d’anomalies</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé examen">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ N(μ, σ²) : le 2ᵉ paramètre est la variance</li>
          <li>✔ Z = (X − μ) / σ</li>
          <li>✔ 68 % dans [μ ± σ]</li>
          <li>✔ Tables / widgets : Φ(z) = P(Z ≤ z)</li>
        </ul>
      </Callout>
    </div>
  )
}
