import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { UnionEventsWidget } from '@/components/probabilites/UnionEventsWidget'
import { ProbabilitesCh3ExamExercises } from '@/components/probabilites/ProbabilitesCh3ExamExercises'

export function ProbabilitesClassiqueView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 3 — Probabilité classique</strong> : la base de presque tous les
          exercices en probabilités, dès que les issues sont équiprobables.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">3.1 Définition fondamentale</h3>
      <p className="text-muted">La probabilité classique s’applique lorsque :</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>tous les résultats sont <strong>équiprobables</strong> (même chance) ;</li>
        <li>on peut <strong>compter</strong> les cas favorables et possibles.</li>
      </ul>
      <MathBlock tex="P(A) = \frac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}" />
      <Callout variant="important" title="Interprétation simple">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Numérateur</strong> = ce qu’on veut obtenir</li>
          <li><strong>Dénominateur</strong> = tout ce qui est possible</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.2 Conditions d’utilisation</h3>
      <p className="text-muted">La formule classique fonctionne si :</p>
      <ul className="list-none space-y-1 pl-1 text-muted">
        <li>✔ Expérience aléatoire</li>
        <li>✔ Issues finies</li>
        <li>✔ Issues équiprobables</li>
      </ul>
      <p className="mt-2 text-sm text-muted">
        Exemples : dé équilibré, pièce équilibrée, tirage dans une urne bien mélangée.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.3 Exemple fondamental — le dé</h3>
      <p className="text-muted">On lance un dé équilibré. Probabilité d’obtenir un nombre <strong>supérieur à 4</strong> ?</p>
      <MathBlock tex="\Omega = \{1, 2, 3, 4, 5, 6\}" />
      <MathBlock tex="A = \{5, 6\} \Rightarrow P(A) = \frac{2}{6} = \frac{1}{3}" />

      <h3 className="mt-10 text-xl font-bold text-deep">3.4 Exemple — pièce de monnaie</h3>
      <p className="text-muted">Probabilité d’obtenir <strong>Face</strong> sur une pièce équilibrée.</p>
      <MathBlock tex="\Omega = \{\text{Face}, \text{Pile}\}, \quad P(\text{Face}) = \frac{1}{2}" />

      <h3 className="mt-10 text-xl font-bold text-deep">3.5 Exemple avancé — cartes</h3>
      <p className="text-muted">Jeu de 52 cartes : probabilité de tirer une carte <strong>rouge</strong> ?</p>
      <p className="text-sm text-muted">Cartes rouges = cœur + carreau = 26 cartes.</p>
      <MathBlock tex="P(A) = \frac{26}{52} = \frac{1}{2}" />

      <h3 className="mt-10 text-xl font-bold text-deep">3.6 Propriétés importantes</h3>

      <h4 className="mt-4 font-semibold text-deep">Probabilité totale</h4>
      <MathBlock tex="P(\Omega) = 1" />
      <p className="text-sm text-muted">L’univers contient tous les cas possibles.</p>

      <h4 className="mt-4 font-semibold text-deep">Événement impossible</h4>
      <MathBlock tex="P(\emptyset) = 0" />

      <h4 className="mt-4 font-semibold text-deep">Complémentaire</h4>
      <MathBlock tex="P(A^c) = 1 - P(A)" />
      <p className="text-sm text-muted">Ex. : si P(A) = 1/3, alors P(Aᶜ) = 2/3.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.7 Union de deux événements</h3>
      <p className="text-muted">Si A et B sont deux événements :</p>
      <MathBlock tex="P(A \cup B) = P(A) + P(B) - P(A \cap B)" />
      <UnionEventsWidget initialPA={3 / 6} initialPB={3 / 6} initialPAB={2 / 6} />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple — dé : pairs et nombres &gt; 3</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>A = nombres pairs = {'{2, 4, 6}'}</li>
        <li>B = nombres &gt; 3 = {'{4, 5, 6}'}</li>
        <li>A ∩ B = {'{4, 6}'}</li>
      </ul>
      <MathBlock tex="P(A) = \frac{3}{6},\quad P(B) = \frac{3}{6},\quad P(A \cap B) = \frac{2}{6}" />
      <MathBlock tex="P(A \cup B) = \frac{3}{6} + \frac{3}{6} - \frac{2}{6} = \frac{4}{6} = \frac{2}{3}" />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Probabilité classique = cas favorables / cas possibles</li>
          <li>✔ Univers = ensemble total</li>
          <li>✔ Complémentaire = 1 − P(A)</li>
          <li>✔ Union = addition − intersection</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Petit test rapide</h3>
      <Accordion title="Dé : P(nombre ≤ 3) ?" defaultOpen>
        <p className="text-muted">On lance un dé équilibré.</p>
        <MathBlock tex="A = \{1, 2, 3\}, \quad P(A) = \frac{3}{6} = \frac{1}{2}" className="!my-2" />
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : 1/2
        </p>
      </Accordion>

      <ProbabilitesCh3ExamExercises />

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          Le <strong>Chapitre 4 — Probabilité conditionnelle</strong> généralise ce cadre (diagnostic, spam, NLP, Bayes).
        </p>
      </Callout>

      <QuizCard
        question="Dé équilibré : P(obtenir strictement plus que 4) ?"
        options={[
          { id: 'a', label: '1/6', correct: false },
          { id: 'b', label: '1/3', correct: true },
          { id: 'c', label: '1/2', correct: false },
          { id: 'd', label: '2/3', correct: false },
        ]}
        explanation="Cas favorables {5, 6} : P(A) = 2/6 = 1/3."
      />
    </>
  )
}
