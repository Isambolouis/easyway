import { Accordion } from '@/components/ui/Accordion'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { bivariateStats, mean, median } from '@/components/statistique/statsMath'
import { PROJECT_CLASS_HEURES, PROJECT_CLASS_NOTES, PROJECT_CLASS_STUDENTS } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const study = bivariateStats(PROJECT_CLASS_HEURES, PROJECT_CLASS_NOTES)
const atRisk = PROJECT_CLASS_STUDENTS.filter((s) => s.note < 10)

export function StatistiqueProjetClasseExercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Projet classe</h3>
      <p className="text-muted">Synthèse analyste — vérifie ta compréhension du dataset.</p>

      <Accordion title="Exercice 1 — Moyenne et médiane" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-sm text-muted">Calcule x̄ et Me des notes. Que conclure si elles sont égales ?</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          x̄ = {mean(PROJECT_CLASS_NOTES)} · Me = {median(PROJECT_CLASS_NOTES)} — distribution symétrique / équilibrée,
          pas de queue dominante.
        </p>
        <ExerciseAnswer>Moyenne = médiane = 12,5 → pas d&apos;asymétrie forte</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Facteur principal">
        <StatsQuizCard
          question="Quelle variable est le plus fortement liée à la note dans ce projet ?"
          options={[
            { id: 'a', label: 'Heures d’étude (r élevé positif)', correct: true },
            { id: 'b', label: 'Numéro de l’élève dans l’alphabet', correct: false },
            { id: 'c', label: 'Aucune relation avec la présence', correct: false },
          ]}
          explanation={`Heures : r ≈ ${study.r.toFixed(2)}. Présence aussi positive. Les deux sont des leviers pédagogiques.`}
        />
      </Accordion>

      <Accordion title="Exercice 3 — Décision pédagogique">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-sm text-muted">Liste les élèves à risque (note &lt; 10) et propose une action.</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          {atRisk.map((s) => `${s.etudiant} (${s.note})`).join(', ')} — renforcer présence, tutorat, objectifs de
          progression.
        </p>
        <ExerciseAnswer>Élèves A et G — accompagnement ciblé</ExerciseAnswer>
      </Accordion>
    </div>
  )
}
