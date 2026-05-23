import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import {
  Density2xWidget,
  ExponentialTailWidget,
  UniformLawWidget,
} from '@/components/probabilites/ContinuousRVWidgets'
import { densityKLinear, exponentialTailProb, integral2x } from '@/components/probabilites/continuousLawsMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh8ContinuesExamExercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices type examen — Variables continues</h3>
      <p className="text-muted">Difficulté progressive (licence / data science). Chaque correction est détaillée.</p>

      <Accordion title="Exercice 1 — Loi uniforme U(0, 8)" defaultOpen>
        <p className="text-muted">Calculer P(2 ≤ X ≤ 6).</p>
        <MathBlock tex="f(x)=\frac{1}{8}" className="!my-2" />
        <MathBlock tex="P(2 \le X \le 6)=\int_2^6 \frac{1}{8}\,dx=\frac{4}{8}=\frac{1}{2}" className="!my-2" />
        <UniformLawWidget initialA={0} initialB={8} initialLo={2} initialHi={6} title="Ex. 1 — U(0, 8)" />
        <ExerciseAnswer>Réponse : 1/2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Densité f(x) = 2x sur [0, 1]">
        <p className="text-muted">Calculer P(0 ≤ X ≤ 0,5).</p>
        <MathBlock tex="P=\int_0^{0.5} 2x\,dx = [x^2]_0^{0.5} = 0.25" className="!my-2" />
        <Density2xWidget lo={0} hi={0.5} />
        <ExerciseAnswer>Réponse : 0,25 (vérification : {integral2x(0, 0.5).toFixed(2)})</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Trouver k pour f(x) = kx sur [0, 2]">
        <p className="text-muted">Condition de normalisation : ∫₀² f(x) dx = 1.</p>
        <MathBlock tex="\int_0^2 kx\,dx = k\cdot\frac{2^2}{2} = 2k = 1 \Rightarrow k=\frac{1}{2}" className="!my-2" />
        <ExerciseAnswer>Réponse : k = 1/2 (constante : {densityKLinear()})</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Loi exponentielle (λ = 2)">
        <p className="text-muted">Densité exponentielle (λ = 2), x ≥ 0. Calculer P(X ≥ 1).</p>
        <MathBlock tex="P(X \ge a)=e^{-\lambda a} \Rightarrow P(X \ge 1)=e^{-2} \approx 0.135" className="!my-2" />
        <ExponentialTailWidget initialLambda={2} initialA={1} />
        <ExerciseAnswer>
          Réponse : e⁻² ≈ {exponentialTailProb(1, 2).toFixed(3)}
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Espérance continue">
        <p className="text-muted">f(x) = 2x sur [0, 1]. Calculer E(X).</p>
        <MathBlock tex="E(X)=\int_0^1 x\cdot 2x\,dx = \int_0^1 2x^2\,dx = 2\cdot\frac{1}{3}=\frac{2}{3}" className="!my-2" />
        <ExerciseAnswer>Réponse : E(X) = 2/3 ≈ 0,667</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé examen">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Intégrales de probabilité</li>
          <li>✔ Densité et normalisation (k)</li>
          <li>✔ Lois uniforme et exponentielle</li>
          <li>✔ Espérance continue</li>
        </ul>
      </Callout>
    </div>
  )
}
