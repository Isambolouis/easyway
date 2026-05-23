import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { UnionEventsWidget } from '@/components/probabilites/UnionEventsWidget'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh3ExamExercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices corrigés — Probabilité classique (niveau examen)</h3>
      <p className="text-muted">
        Univers, événements, intersections, unions et complémentaire. Les exercices sur l’union incluent la carte
        interactive : modifiez les curseurs pour retrouver les valeurs de l’énoncé.
      </p>

      <Accordion title="Exercice 1 — Dé et union d’événements" defaultOpen>
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          Dé équilibré. A = pair, B = nombre ≥ 4. Calculer P(A ∪ B).
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="A = \{2,4,6\},\quad B = \{4,5,6\},\quad A \cap B = \{4,6\}" className="!my-2" />
        <MathBlock
          tex="P(A)=\frac{3}{6},\quad P(B)=\frac{3}{6},\quad P(A \cap B)=\frac{2}{6}"
          className="!my-2"
        />
        <MathBlock
          tex="P(A \cup B)=\frac{3}{6}+\frac{3}{6}-\frac{2}{6}=\frac{4}{6}=\frac{2}{3}"
          className="!my-2"
        />
        <p className="text-sm text-muted">Carte interactive (valeurs de l’exercice) :</p>
        <UnionEventsWidget initialPA={3 / 6} initialPB={3 / 6} initialPAB={2 / 6} />
        <ExerciseAnswer>Réponse : 2/3</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Complémentaire">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">Dé : probabilité de <strong>ne pas</strong> obtenir un multiple de 3 ?</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="A = \{3, 6\} \Rightarrow P(A) = \frac{2}{6} = \frac{1}{3}" className="!my-2" />
        <MathBlock tex="P(A^c) = 1 - P(A) = 1 - \frac{1}{3} = \frac{2}{3}" className="!my-2" />
        <ExerciseAnswer>Réponse : 2/3</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Tirage de cartes (rouge OU roi)">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">52 cartes : probabilité de tirer une carte rouge <strong>ou</strong> un roi ?</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">Rouges = 26, rois = 4, rois rouges = 2.</p>
        <MathBlock
          tex="P(A)=\frac{26}{52},\quad P(B)=\frac{4}{52},\quad P(A \cap B)=\frac{2}{52}"
          className="!my-2"
        />
        <MathBlock
          tex="P(A \cup B)=\frac{26}{52}+\frac{4}{52}-\frac{2}{52}=\frac{28}{52}=\frac{7}{13}"
          className="!my-2"
        />
        <p className="text-sm text-muted">Carte interactive :</p>
        <UnionEventsWidget initialPA={26 / 52} initialPB={4 / 52} initialPAB={2 / 52} />
        <ExerciseAnswer>Réponse : 7/13</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Deux dés (somme = 7)">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">Deux dés équilibrés : probabilité d’une somme égale à 7 ?</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="|\Omega| = 6 \times 6 = 36" className="!my-2" />
        <p className="text-sm text-muted">
          Cas favorables : (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 cas.
        </p>
        <MathBlock tex="P = \frac{6}{36} = \frac{1}{6}" className="!my-2" />
        <ExerciseAnswer>Réponse : 1/6</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Urne">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          Urne : 5 rouges, 3 bleues, 2 vertes. Probabilité de <strong>ne pas</strong> tirer une boule bleue ?
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">Total = 10 boules · non bleues = 7.</p>
        <MathBlock tex="P = \frac{7}{10}" className="!my-2" />
        <ExerciseAnswer>Réponse : 7/10</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé niveau examen">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>P(A) = cas favorables / cas possibles</li>
          <li>Complémentaire : 1 − P(A)</li>
          <li>Union : P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</li>
          <li>Dénombrement (produit, listes de cas)</li>
        </ul>
      </Callout>
    </div>
  )
}
