import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import {
  ClickTotalProbabilityWidget,
  PoissonProcessWidget,
  RandomWalkWidget,
} from '@/components/probabilites/StochasticProcessWidgets'
import {
  poissonProcessPMF,
  randomWalkExpectation,
  randomWalkVarianceAt1,
  stepExpectation,
  totalProbability,
} from '@/components/probabilites/stochasticProcessMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh11ProcessusExamExercises() {
  const pUp = 0.7
  const eEps = stepExpectation(pUp)
  const ex1 = randomWalkExpectation(1, pUp)
  const ex2 = randomWalkExpectation(2, pUp)
  const vx1 = randomWalkVarianceAt1(pUp)
  const pN13 = poissonProcessPMF(3, 2, 1)
  const pClick = totalProbability(0.3, 0.6, 0.05)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices avancés — Processus stochastiques</h3>
      <p className="text-muted">Niveau licence avancée / data science / IA.</p>

      <Accordion title="Exercice 1 — Marche aléatoire : E[X₁] et E[X₂]" defaultOpen>
        <p className="text-muted">
          X_{'{t+1}'} = X_t + ε_t, P(ε=+1)=0,7, P(ε=−1)=0,3, X₀=0.
        </p>
        <MathBlock tex="E[\varepsilon]=1\times0{,}7+(-1)\times0{,}3=0{,}4" className="!my-2" />
        <MathBlock tex="E[X_1]=0{,}4,\quad E[X_2]=2\times0{,}4=0{,}8" className="!my-2" />
        <RandomWalkWidget initialPUp={0.7} />
        <ExerciseAnswer>
          E[X₁] = {ex1.toFixed(1)} · E[X₂] = {ex2.toFixed(1)} (E[ε] = {eEps.toFixed(1)})
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Variance V(X₁)">
        <MathBlock tex="V(\varepsilon)=E(\varepsilon^2)-[E(\varepsilon)]^2=1-0{,}4^2=0{,}84" className="!my-2" />
        <p className="text-sm text-muted">V(X₁) = V(ε₁) car X₁ = ε₁.</p>
        <ExerciseAnswer>V(X₁) = {vx1.toFixed(2)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Processus de Poisson : P(N(1)=3), λ=2">
        <MathBlock tex="P(N(1)=3)=\frac{2^3 e^{-2}}{3!}=\frac{8e^{-2}}{6}\approx0{,}180" className="!my-2" />
        <PoissonProcessWidget initialLambda={2} initialT={1} initialK={3} />
        <ExerciseAnswer>P(N(1)=3) ≈ {pN13.toFixed(3)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Le processus est-il markovien ?">
        <p className="text-muted">
          X_{'{t+1}'} = X_t + ε_t avec εₜ indépendants. Le futur ne dépend que de X_t (pas de X_{'{t−1}'}…).
        </p>
        <MathBlock tex="P(X_{t+1}\mid X_t,X_{t-1},\ldots)=P(X_{t+1}\mid X_t)" className="!my-2" />
        <ExerciseAnswer>Oui — processus de Markov (mémoire d’ordre 1)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Modèle de clics (loi totale)">
        <p className="text-muted">
          P(clic|actif)=0,3 · P(actif)=0,6 · P(clic|inactif)=0,05.
        </p>
        <MathBlock tex="P(C)=0{,}3\times0{,}6+0{,}05\times0{,}4=0{,}2" className="!my-2" />
        <ClickTotalProbabilityWidget />
        <ExerciseAnswer>P(clic) = {pClick.toFixed(2)} (20 %)</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé des techniques">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Espérance d’un processus : linéarité, E[X_t] = t·E[ε]</li>
          <li>✔ Variance d’une marche (pas i.i.d.)</li>
          <li>✔ Poisson : λt dans la formule</li>
          <li>✔ Markov + loi totale des probabilités</li>
        </ul>
      </Callout>
    </div>
  )
}
