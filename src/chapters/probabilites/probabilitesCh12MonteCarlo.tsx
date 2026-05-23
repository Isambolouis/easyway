import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import {
  MonteCarloAccuracyWidget,
  MonteCarloErrorWidget,
  MonteCarloExpectationWidget,
  MonteCarloIntegralWidget,
  MonteCarloPiWidget,
  MonteCarloProbabilityWidget,
} from '@/components/probabilites/MonteCarloWidgets'
import { ProbabilitesCh12MonteCarloExamExercises } from '@/components/probabilites/ProbabilitesCh12MonteCarloExamExercises'

export function ProbabilitesMonteCarloView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 12 — Simulation Monte Carlo</strong> : approximer probabilités,
          intégrales et métriques IA par tirages aléatoires répétés.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">12.1 Principe</h3>
      <p className="text-muted">
        On remplace un calcul exact par la <strong>moyenne empirique</strong> sur de nombreuses simulations
        indépendantes.
      </p>
      <MathBlock tex="\int_a^b f(x)\,dx \approx (b-a)\cdot\frac{1}{N}\sum_{i=1}^N f(X_i),\quad X_i \sim U(a,b)" />
      <Callout variant="important">
        Plus N est grand, plus l’estimation est stable (loi des grands nombres). L’erreur typique décroît en{' '}
        <strong>1/√N</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">12.2 Estimer une probabilité</h3>
      <MathBlock tex="P(A) \approx \frac{\#\{i : A_i\}}{N}" />
      <MonteCarloProbabilityWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">12.3 Estimer π (classique)</h3>
      <p className="text-sm text-muted">Points aléatoires dans [-1,1]² : proportion dans le disque → π.</p>
      <MonteCarloPiWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">12.4 Estimer une espérance</h3>
      <MathBlock tex="E(X) \approx \frac{1}{n}\sum_{i=1}^n X_i" />
      <MonteCarloExpectationWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">12.5 Intégrale par Monte Carlo</h3>
      <MonteCarloIntegralWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">12.6 Erreur et nombre de simulations</h3>
      <MonteCarloErrorWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">12.7 Applications IA & data science</h3>
      <MonteCarloAccuracyWidget />
      <DataTable
        headers={['Usage', 'Exemple']}
        rows={[
          ['Évaluation de modèles', 'Accuracy, AUC par bootstrap'],
          ['Intégration', 'Risque, pricing'],
          ['MCMC', 'Inférence bayésienne'],
          ['RL', 'Politiques stochastiques'],
        ]}
      />

      <h3 className="mt-8 text-lg font-bold text-deep">Code Python</h3>
      <pre className="scroll-x-card overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100">
        {`import numpy as np

N = 100_000
x, y = np.random.uniform(-1, 1, N), np.random.uniform(-1, 1, N)
pi_est = 4 * np.mean(x**2 + y**2 <= 1)
print(pi_est)  # ≈ 3.14`}
      </pre>

      <ProbabilitesCh12MonteCarloExamExercises />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Probabilités et espérances ≈ fréquences empiriques</li>
          <li>✔ Intégrales et π par tirages aléatoires</li>
          <li>✔ Erreur ~ 1/√n</li>
          <li>✔ Métriques IA (accuracy, etc.)</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/probabilites-machine-learning" className="font-semibold text-emerald-700 underline">
            Chapitre 13 — Probabilités & machine learning
          </Link>
          , implémentation Python complète ou sujet examen final.
        </p>
      </Callout>

      <QuizCard
        question="De 1 000 à 10 000 simulations, l’erreur MC est divisée environ par…"
        options={[
          { id: 'a', label: '10', correct: false },
          { id: 'b', label: '√10 ≈ 3,16', correct: true },
          { id: 'c', label: '2', correct: false },
          { id: 'd', label: '100', correct: false },
        ]}
        explanation="Err ∝ 1/√n : ratio √(10000/1000) = √10."
      />
    </>
  )
}
