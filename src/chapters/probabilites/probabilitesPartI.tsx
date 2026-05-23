import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { IndependentEventsWidget } from '@/components/probabilites/IndependentEventsWidget'
import { ProbabilitesCh1Exercises } from '@/components/probabilites/ProbabilitesCh1Exercises'

export function ProbabilitesIntroView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Bienvenue dans le <strong className="text-deep">Chapitre 1</strong> : nous posons les fondements du
          raisonnement probabiliste, comme dans un cours universitaire de première année.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">1.1 Définition des probabilités</h3>
      <p className="text-muted">
        Les <strong>probabilités</strong> sont une branche des mathématiques qui étudie les phénomènes{' '}
        <strong>aléatoires</strong>, c’est-à-dire les situations dont le résultat ne peut pas être prédit avec
        certitude.
      </p>
      <Callout variant="important" title="En termes simples">
        Une probabilité mesure la <strong>chance qu’un événement se produise</strong>.
      </Callout>

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple concret — lancer un dé</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Impossible de connaître à l’avance le résultat exact.</li>
        <li>En revanche, on peut quantifier la chance d’obtenir un 6.</li>
      </ul>
      <MathBlock tex="P(6) = \frac{1}{6}" />
      <p className="text-sm text-muted">
        La valeur est entre <strong>0</strong> (impossible) et <strong>1</strong> (certain).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">1.2 Vocabulaire fondamental</h3>

      <h4 className="mt-6 font-semibold text-deep">Expérience aléatoire</h4>
      <p className="text-muted">Une expérience dont le résultat dépend du hasard.</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Lancer une pièce</li>
        <li>Tirer une carte</li>
        <li>Mesurer le temps d’attente d’un bus</li>
      </ul>

      <h4 className="mt-6 font-semibold text-deep">Univers (Ω)</h4>
      <p className="text-muted">L’ensemble de <strong>tous les résultats possibles</strong>.</p>
      <p className="text-sm text-muted">Exemple — dé à 6 faces :</p>
      <MathBlock tex="\Omega = \{1, 2, 3, 4, 5, 6\}" />

      <h4 className="mt-6 font-semibold text-deep">Événement</h4>
      <p className="text-muted">
        Un événement est un <strong>sous-ensemble de l’univers</strong> (ensemble de résultats favorables).
      </p>
      <p className="text-sm text-muted">Exemple — « obtenir un nombre pair » :</p>
      <MathBlock tex="A = \{2, 4, 6\}" />

      <h3 className="mt-10 text-xl font-bold text-deep">1.3 Types d’événements</h3>

      <h4 className="mt-6 font-semibold text-deep">Événement certain</h4>
      <p className="text-muted">Se produit toujours.</p>
      <p className="text-sm text-muted">Ex. : obtenir un nombre entre 1 et 6 avec un dé standard.</p>
      <MathBlock tex="P(\Omega) = 1" />

      <h4 className="mt-6 font-semibold text-deep">Événement impossible</h4>
      <p className="text-muted">Ne peut jamais se produire.</p>
      <p className="text-sm text-muted">Ex. : obtenir 7 avec un dé à 6 faces.</p>
      <MathBlock tex="P(\emptyset) = 0" />

      <h4 className="mt-6 font-semibold text-deep">Événements incompatibles</h4>
      <p className="text-muted">Ne peuvent pas se réaliser en même temps.</p>
      <p className="text-sm text-muted">
        Ex. : A = « pair », B = « impair » sur un seul lancer → A ∩ B = ∅.
      </p>
      <MathBlock tex="A \cap B = \emptyset" />

      <h4 className="mt-6 font-semibold text-deep">Événements indépendants</h4>
      <p className="text-muted">
        Deux événements sont <strong>indépendants</strong> si l’un n’influence pas l’autre.
      </p>
      <p className="text-sm text-muted">Ex. : lancer deux pièces de monnaie (une n’informe pas sur l’autre).</p>
      <MathBlock tex="P(A \cap B) = P(A)\,P(B)" />
      <IndependentEventsWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">1.4 Formule fondamentale (probabilité classique)</h3>
      <p className="text-muted">
        Lorsque toutes les issues sont <strong>équiprobables</strong> :
      </p>
      <MathBlock tex="P(A) = \frac{\text{cas favorables}}{\text{cas possibles}}" />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple complet</h4>
      <p className="text-muted">On lance un dé équilibré.</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Univers : {'{1, 2, 3, 4, 5, 6}'}</li>
        <li>Événement A = « nombre pair » = {'{2, 4, 6}'}</li>
      </ul>
      <MathBlock tex="P(A) = \frac{3}{6} = \frac{1}{2}" />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>La probabilité mesure le hasard (entre 0 et 1).</li>
          <li>L’<strong>univers</strong> Ω regroupe tous les résultats possibles.</li>
          <li>Un <strong>événement</strong> est un sous-ensemble de Ω.</li>
          <li>Indépendance : <strong>P(A ∩ B) = P(A) × P(B)</strong>.</li>
        </ul>
      </Callout>

      <ProbabilitesCh1Exercises />

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          Le <strong>Chapitre 2 — Combinatoire</strong> (permutations, arrangements, combinaisons) permet de compter
          les cas possibles avant d’appliquer P(A) = favorables / possibles. Des exercices plus avancés (concours, data
          science) pourront compléter ce chapitre plus tard.
        </p>
      </Callout>

      <QuizCard
        question="Dé équilibré : quelle est P(obtenir un nombre pair) ?"
        options={[
          { id: 'a', label: '1/6', correct: false },
          { id: 'b', label: '1/3', correct: false },
          { id: 'c', label: '1/2', correct: true },
          { id: 'd', label: '2/3', correct: false },
        ]}
        explanation="3 issues favorables (2, 4, 6) sur 6 : P(A) = 3/6 = 1/2."
      />
    </>
  )
}

export { ProbabilitesCombinatoireView } from '@/chapters/probabilites/probabilitesCh2Combinatoire'
