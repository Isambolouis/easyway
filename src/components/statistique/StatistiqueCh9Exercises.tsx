import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { bivariateStats } from '@/components/statistique/statsMath'
import { CH7_EX1_X, CH7_EX1_Y } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex1 = bivariateStats(CH7_EX1_X, CH7_EX1_Y)

export function StatistiqueCh9Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 9</h3>
      <p className="text-muted">Interprétation et synthèse — penser comme un analyste.</p>

      <Accordion title="Exercice 1 — Interpréter X et Y" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="(1,2),\ (2,4),\ (3,6)" className="!my-2" />
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          Relation <strong>linéaire positive parfaite</strong> : Y = 2X. Cov = {ex1.cov.toFixed(2)}, r ={' '}
          {ex1.r.toFixed(2)}. Chaque unité en X ajoute 2 en Y.
        </p>
        <ExerciseAnswer>Corrélation positive forte — plus X augmente, plus Y augmente</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Même moyenne, variances différentes">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Deux séries ont la même moyenne mais des variances différentes. Conclusion ?</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          Elles ont le même <strong>niveau central</strong> mais une <strong>dispersion</strong> différente : l’une
          est plus homogène (faible σ²), l’autre plus instable. Il faut toujours rapporter moyenne <em>et</em>{' '}
          dispersion.
        </p>
        <ExerciseAnswer>Même centre, comportements différents — comparer σ ou IQR</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Boxplot asymétrique à droite">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Un boxplot montre une forte asymétrie à droite. Interpréter.</p>

        <StatsQuizCard
          question="Asymétrie à droite signifie :"
          options={[
            { id: 'a', label: 'Médiane tirée vers le haut, queue vers les grandes valeurs', correct: true },
            { id: 'b', label: 'Toutes les valeurs sont identiques', correct: false },
            { id: 'c', label: 'Moyenne = médiane forcément', correct: false },
          ]}
          explanation="La boîte est décalée vers le bas : quelques valeurs très élevées (outliers ou queue longue). La moyenne est souvent > médiane."
        />

        <ExerciseAnswer>Queue à droite — quelques valeurs élevées isolées, moyenne souvent &gt; médiane</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Analyse complète d'une classe">
        <p className="font-medium text-deep">Énoncé</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          <li>Moyenne des notes = 12</li>
          <li>σ = 5</li>
          <li>Corrélation étude / note = 0,8</li>
        </ul>

        <p className="mt-4 font-medium text-deep">Correction — synthèse type rapport</p>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm text-muted">
          <p>
            <strong>Centre :</strong> niveau moyen 12/20 — correct mais perfectible selon le barème.
          </p>
          <p className="mt-2">
            <strong>Dispersion :</strong> σ = 5 → forte hétérogénéité ; écarts importants entre élèves — penser
            groupes de niveau ou soutien.
          </p>
          <p className="mt-2">
            <strong>Relation étude–note :</strong> r = 0,8 → plus on travaille, mieux on réussit (lien fort mais
            pas causalité seule : motivation, préparation…).
          </p>
          <p className="mt-2">
            <strong>Décision :</strong> maintenir l’accompagnement ciblé sur les faibles notes ; encourager les
            heures d’étude (facteur associé au succès).
          </p>
        </div>
        <ExerciseAnswer>Analyse multicritère : centre + dispersion + corrélation + contexte</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Méthode analyste">
        Toujours enchaîner : décrire → comparer → expliquer → recommander — sans oublier le contexte métier.
      </Callout>
    </div>
  )
}
