import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh1Exercises() {
  return (
  <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices corrigés — Chapitre 1</h3>
      <p className="text-muted">
        Progression du simple vers le plus intéressant : dé, pièce, cartes, incompatibilité, certains et impossibles.
      </p>

      <Accordion title="Exercice 1 — Dé à 6 faces" defaultOpen>
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          On lance un dé équilibré à 6 faces. Quelle est la probabilité d’obtenir un nombre <strong>pair</strong> ?
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="mt-1 text-sm text-muted">Univers :</p>
        <MathBlock tex="\Omega = \{1, 2, 3, 4, 5, 6\}" className="!my-2" />
        <p className="text-sm text-muted">Événement A (nombre pair) :</p>
        <MathBlock tex="A = \{2, 4, 6\}" className="!my-2" />
        <p className="text-sm text-muted">
          Cas favorables = 3 · Cas possibles = 6
        </p>
        <MathBlock tex="P(A) = \frac{3}{6} = \frac{1}{2}" className="!my-2" />
        <ExerciseAnswer>Réponse : 1/2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Pièce de monnaie">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          On lance une pièce équilibrée. Quelle est la probabilité d’obtenir <strong>Face</strong> ?
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="\Omega = \{\text{Face}, \text{Pile}\}" className="!my-2" />
        <p className="text-sm text-muted">Événement A = obtenir Face :</p>
        <MathBlock tex="A = \{\text{Face}\}" className="!my-2" />
        <MathBlock tex="P(A) = \frac{1}{2}" className="!my-2" />
        <ExerciseAnswer>Réponse : 1/2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Carte à jouer">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          On tire une carte au hasard dans un jeu de 52 cartes. Quelle est la probabilité de tirer un <strong>As</strong>{' '}
          ?
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">Dans un jeu de 52 cartes, il y a 4 As.</p>
        <MathBlock tex="P(A) = \frac{4}{52} = \frac{1}{13}" className="!my-2" />
        <ExerciseAnswer>Réponse : 1/13</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Événements incompatibles">
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          On lance un dé. A = obtenir un nombre pair, B = obtenir un nombre impair. Montrer que A et B sont
          incompatibles.
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="A = \{2, 4, 6\}, \quad B = \{1, 3, 5\}" className="!my-2" />
        <p className="text-sm text-muted">Intersection :</p>
        <MathBlock tex="A \cap B = \emptyset" className="!my-2" />
        <p className="text-sm text-muted">Ils ne peuvent pas se produire en même temps.</p>
        <ExerciseAnswer>Conclusion : A et B sont incompatibles</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Événements certains et impossibles">
        <p className="font-medium text-deep">Questions</p>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-muted">
          <li>Probabilité d’obtenir un nombre entre 1 et 6</li>
          <li>Probabilité d’obtenir 7</li>
        </ol>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">1. Événement certain :</p>
        <MathBlock tex="P(\Omega) = 1" className="!my-2" />
        <p className="text-sm text-muted">2. Événement impossible :</p>
        <MathBlock tex="P(\emptyset) = 0" className="!my-2" />
        <ExerciseAnswer>Réponses : 1 · 0</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé pédagogique">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Probabilité = cas favorables / cas possibles</li>
          <li>Toujours entre 0 et 1</li>
          <li>1 = certain · 0 = impossible</li>
        </ul>
      </Callout>
    </div>
  )
}
