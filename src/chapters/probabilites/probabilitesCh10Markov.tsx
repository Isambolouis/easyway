import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  MarkovNgramWidget,
  MarkovPathExamWidget,
  MarkovWeatherWidget,
} from '@/components/probabilites/MarkovChainWidgets'
import { ProbabilitesCh10MarkovExamExercises } from '@/components/probabilites/ProbabilitesCh10MarkovExamExercises'

export function ProbabilitesMarkovView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 10 — Chaînes de Markov</strong> : modèle puissant en IA, NLP et
          systèmes de prédiction (futur = fonction du présent seulement).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">10.1 Idée intuitive</h3>
      <p className="text-muted">
        Un système évolue dans le temps : le <strong>futur ne dépend que de l’état actuel</strong>, pas de tout
        l’historique détaillé.
      </p>
      <Callout variant="important" title="Propriété de Markov">
        <MathBlock tex="P(X_{n+1}\mid X_n,X_{n-1},\ldots,X_0)=P(X_{n+1}\mid X_n)" className="!my-1" />
        <p className="text-sm">Exemple météo : aujourd’hui influence demain ; la météo d’hier n’a plus d’impact direct.</p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">10.2 Définition</h3>
      <p className="text-muted">
        Suite de variables aléatoires X₀, X₁, X₂, … où chaque état ne dépend que du précédent.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.3 États et transitions</h3>
      <p className="text-muted">États possibles (exemple météo) : Soleil ☀️, Nuage ☁️, Pluie 🌧️.</p>
      <MathBlock tex="P_{ij}=P(X_{t+1}=j \mid X_t=i)" />

      <h3 className="mt-10 text-xl font-bold text-deep">10.4 Matrice de transition</h3>
      <MarkovWeatherWidget />
      <p className="text-sm text-muted">
        Chaque <strong>ligne</strong> = probabilités de départ depuis l’état i. Chaque ligne somme à 1 :{' '}
        <strong>Σⱼ Pᵢⱼ = 1</strong>.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.5 Exemple de transition</h3>
      <p className="text-muted">
        Si aujourd’hui il fait soleil (ligne 1 de la matrice par défaut) : P(Pluie demain) = 0,1.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.6 Évolution sur plusieurs étapes</h3>
      <MathBlock tex="\pi_{t+k} = \pi_t \cdot P^k" />
      <p className="text-sm text-muted">
        πₜ = distribution sur les états à l’instant t (vecteur ligne). Multiplier par P² pour 2 pas, etc.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.7 Applications en IA</h3>
      <DataTable
        headers={['Domaine', 'Usage']}
        rows={[
          ['NLP', 'Prédiction du mot suivant, n-grams, modèles de langage'],
          ['PageRank', 'Navigation web comme chaîne de Markov'],
          ['Reconnaissance vocale', 'Séquences sons → mots'],
          ['Recommandation', 'Comportement utilisateur (Netflix, YouTube)'],
        ]}
      />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple NLP</h4>
      <MarkovNgramWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">10.8 Exemple simple d’IA</h3>
      <p className="text-muted">
        État actuel = Nuage, matrice connue → le widget calcule les probabilités à t+1 et t+k.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.9 Exercice type examen</h3>
      <Accordion title="Soleil → Nuage → Pluie en 2 jours" defaultOpen>
        <p className="text-muted">
          P(Pluie|Nuage) = 0,3 · P(Nuage|Soleil) = 0,2. Chemin obligatoire via Nuage.
        </p>
        <MathBlock tex="P(S\to N\to P)=P(N|S)\times P(P|N)=0{,}2\times0{,}3=0{,}06" className="!my-2" />
        <MarkovPathExamWidget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : 6 %
        </p>
      </Accordion>

      <ProbabilitesCh10MarkovExamExercises />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Futur dépend uniquement du présent</li>
          <li>✔ Matrice de transition P, lignes qui somment à 1</li>
          <li>✔ Multiplication pour plusieurs pas</li>
          <li>✔ NLP, PageRank, prédiction</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/processus-stochastiques" className="font-semibold text-emerald-700 underline">
            Chapitre 11 — Processus stochastiques
          </Link>
          , exercices Markov supplémentaires ou simulation Python pas à pas.
        </p>
      </Callout>

      <QuizCard
        question="Propriété de Markov : P(Xₙ₊₁ | Xₙ, Xₙ₋₁, …) égale…"
        options={[
          { id: 'a', label: 'P(Xₙ₊₁ | X₀)', correct: false },
          { id: 'b', label: 'P(Xₙ₊₁ | Xₙ)', correct: true },
          { id: 'c', label: 'P(Xₙ)', correct: false },
          { id: 'd', label: '1', correct: false },
        ]}
        explanation="Mémoire d’ordre 1 : seul l’état présent compte pour le futur immédiat."
      />
    </>
  )
}
