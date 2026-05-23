import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import {
  MonteCarloAccuracyWidget,
  MonteCarloErrorWidget,
  MonteCarloExpectationWidget,
  MonteCarloIntegralWidget,
  MonteCarloPiWidget,
  MonteCarloProbabilityWidget,
} from '@/components/probabilites/MonteCarloWidgets'
import {
  errorRatio,
  estimateAccuracy,
  estimateExpectationFromFreq,
  estimatePi,
} from '@/components/probabilites/monteCarloMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh12MonteCarloExamExercises() {
  const piEst = estimatePi(7850, 10000)
  const ex = estimateExpectationFromFreq([1, 2, 3], [300, 500, 200])
  const acc = estimateAccuracy(7200, 10000)
  const errDiv = errorRatio(1000, 10000)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices examen + concours — Monte Carlo</h3>
      <p className="text-muted">Corrections détaillées avec widgets interactifs.</p>

      <Accordion title="Exercice 1 — Estimation P(X > 0)" defaultOpen>
        <p className="text-muted">2 000 simulations, 1 240 fois X &gt; 0.</p>
        <MathBlock tex="P(X>0) \approx \frac{1240}{2000}=0{,}62" className="!my-2" />
        <MonteCarloProbabilityWidget initialN={2000} initialSuccesses={1240} />
        <ExerciseAnswer>Réponse : 0,62</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Estimation de π">
        <MathBlock tex="\pi \approx 4 \times \frac{7850}{10000} \approx 3{,}14" className="!my-2" />
        <MonteCarloPiWidget initialTotal={10000} initialInCircle={7850} />
        <ExerciseAnswer>π̂ ≈ {piEst.toFixed(2)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Espérance E(X) par simulation">
        <MathBlock tex="E(X)=\frac{300+1000+600}{1000}=1{,}9" className="!my-2" />
        <MonteCarloExpectationWidget />
        <ExerciseAnswer>E(X) = {ex.toFixed(1)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Intégrale ∫₀¹ x² dx">
        <MathBlock tex="I=\int_0^1 x^2\,dx = \frac{1}{3} \approx 0{,}333" className="!my-2" />
        <p className="text-sm text-muted">Monte Carlo : I ≈ (1/n) Σ Xᵢ² avec Xᵢ ~ U(0,1).</p>
        <MonteCarloIntegralWidget />
        <ExerciseAnswer>Réponse théorique : 1/3 — MC converge vers cette valeur</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Accuracy modèle IA">
        <MathBlock tex="\text{Accuracy}=\frac{7200}{10000}=0{,}72" className="!my-2" />
        <MonteCarloAccuracyWidget />
        <ExerciseAnswer>Accuracy = {(acc * 100).toFixed(0)} %</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 6 — Erreur ∝ 1/√n">
        <MathBlock
          tex="\frac{\text{Err}_{10000}}{\text{Err}_{1000}}=\frac{\sqrt{1000}}{\sqrt{10000}}=\frac{1}{\sqrt{10}}"
          className="!my-2"
        />
        <MonteCarloErrorWidget />
        <ExerciseAnswer>L’erreur diminue environ {errDiv.toFixed(2)} fois (√10 ≈ 3,16)</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé concours">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Probabilité ≈ fréquence relative</li>
          <li>✔ π, intégrales, espérance par moyenne empirique</li>
          <li>✔ Accuracy = correct / total</li>
          <li>✔ Erreur ~ 1/√n</li>
        </ul>
      </Callout>
    </div>
  )
}
