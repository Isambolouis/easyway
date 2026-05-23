import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import {
  ClickTotalProbabilityWidget,
  PoissonProcessWidget,
  RandomWalkWidget,
} from '@/components/probabilites/StochasticProcessWidgets'
import { ProbabilitesCh11ProcessusExamExercises } from '@/components/probabilites/ProbabilitesCh11ProcessusExamExercises'

export function ProbabilitesProcessusView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 11 — Processus stochastiques</strong> : modèles temporels avancés
          (marche aléatoire, Poisson, lien avec Markov) pour la data science et l’IA.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">11.1 Introduction</h3>
      <p className="text-muted">
        Un <strong>processus stochastique</strong> est une famille de variables aléatoires {'{Xₜ}'} indexées par le
        temps (discret ou continu).
      </p>
      <DataTable
        headers={['Exemple', 'Interprétation']}
        rows={[
          ['Marche aléatoire', 'Position qui évolue par pas aléatoires'],
          ['Poisson', 'Comptage d’événements dans le temps'],
          ['Séries temporelles', 'Prévision, finance, capteurs'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">11.2 Marche aléatoire</h3>
      <MathBlock tex="X_{t+1} = X_t + \varepsilon_t" />
      <p className="text-sm text-muted">
        Souvent X₀ = 0 et εₜ ∈ {'{+1, −1}'} (ou pas réels). Modèle de base en finance, physique et exploration.
      </p>
      <RandomWalkWidget initialPUp={0.7} />

      <h3 className="mt-10 text-xl font-bold text-deep">11.3 Processus de Poisson</h3>
      <p className="text-muted">
        Compte les événements rares sur un intervalle de temps. N(t) ~ Poisson(λt) : λ = taux moyen par unité de
        temps.
      </p>
      <PoissonProcessWidget initialLambda={2} initialT={1} initialK={3} />

      <h3 className="mt-10 text-xl font-bold text-deep">11.4 Lien avec les chaînes de Markov</h3>
      <MathBlock tex="P(X_{t+1} \mid X_t, X_{t-1}, \ldots) = P(X_{t+1} \mid X_t)" />
      <Callout variant="definition">
        La marche aléatoire X_{'{t+1}'} = X_t + ε_t est <strong>markovienne</strong> : seul X_t compte pour prédire
        X_{'{t+1}'} (si les εₜ sont i.i.d.).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">11.5 Applications IA & data science</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Modélisation de clics, trafic, files d’attente</li>
        <li>Renforcement (exploration stochastique)</li>
        <li>Simulation avant Monte-Carlo (chapitre 12)</li>
      </ul>
      <ClickTotalProbabilityWidget />

      <ProbabilitesCh11ProcessusExamExercises />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Processus = évolution aléatoire dans le temps</li>
          <li>✔ Marche aléatoire : E[X_t] = t·E[ε], variance des pas</li>
          <li>✔ Poisson : P(N(t)=k) avec λt</li>
          <li>✔ Beaucoup de processus discrets sont markoviens</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/simulation-monte-carlo" className="font-semibold text-emerald-700 underline">
            Chapitre 12 — Simulation Monte Carlo
          </Link>
          , implémentation Python ou exercices niveau recherche.
        </p>
      </Callout>

      <QuizCard
        question="Marche avec X₀=0, E[ε]=0,4. E[X₂] vaut…"
        options={[
          { id: 'a', label: '0,4', correct: false },
          { id: 'b', label: '0,8', correct: true },
          { id: 'c', label: '1,6', correct: false },
          { id: 'd', label: '0', correct: false },
        ]}
        explanation="E[X_t] = t·E[ε] si les pas sont i.i.d. et X₀=0 : E[X₂] = 2×0,4 = 0,8."
      />
    </>
  )
}
