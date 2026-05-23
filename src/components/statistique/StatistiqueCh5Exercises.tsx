import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuartilesSummary } from '@/components/statistique/QuartilesSummary'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { decile, quartiles } from '@/components/statistique/statsMath'
import { CH5_CLASS_20, CH5_EX1 } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex1q = quartiles(CH5_EX1)
const d2 = decile(CH5_CLASS_20, 2)
const d5 = decile(CH5_CLASS_20, 5)
const d8 = decile(CH5_CLASS_20, 8)

export function StatistiqueCh5Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 5</h3>
      <p className="text-muted">Quartiles, déciles et percentiles — calcul et interprétation.</p>

      <Accordion title="Exercice 1 — Quartiles" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="4,\; 6,\; 8,\; 10,\; 12,\; 14,\; 16,\; 18" className="!my-2" />
        <ol className="list-decimal space-y-1 pl-5 text-muted">
          <li>Calculer Q₁, Q₂, Q₃</li>
          <li>Interpréter les résultats</li>
        </ol>

        <div className="mt-4">
          <QuartilesSummary values={CH5_EX1} />
        </div>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>
            <strong>25 %</strong> des valeurs sont ≤ {ex1q.q1.toFixed(1)} (Q₁)
          </li>
          <li>
            <strong>50 %</strong> sont ≤ {ex1q.q2.toFixed(1)} (Q₂ = médiane)
          </li>
          <li>
            <strong>75 %</strong> sont ≤ {ex1q.q3.toFixed(1)} (Q₃)
          </li>
        </ul>
        <ExerciseAnswer>
          Q₁ ≈ {ex1q.q1.toFixed(1)} · Q₂ ≈ {ex1q.q2.toFixed(1)} · Q₃ ≈ {ex1q.q3.toFixed(1)}
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Médiane, quartiles, déciles, percentiles">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">
          Expliquer : différence entre médiane et quartiles ; différence entre déciles et percentiles.
        </p>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Médiane = Q₂</strong> : un seul indicateur (50 %). Les <strong>quartiles</strong> découpent en{' '}
            <strong>4 parts</strong> (Q₁, Q₂, Q₃) pour décrire toute la distribution.
          </li>
          <li>
            <strong>Déciles</strong> : 10 parts (D₁…D₉). <strong>Percentiles</strong> : 100 parts (P₁…P₉₉) — plus fin.
            D₅ = P₅₀ = médiane.
          </li>
        </ul>
        <ExerciseAnswer>
          Quartiles = vue en 4 · Déciles/percentiles = finesse croissante du découpage
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Percentile 90">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Un étudiant est au percentile 90 en mathématiques. Que signifie-t-on ?</p>

        <StatsQuizCard
          question="Percentile 90 signifie :"
          options={[
            { id: 'a', label: 'Il a obtenu 90 % à l’examen', correct: false },
            { id: 'b', label: 'Il est meilleur que 90 % des élèves', correct: true },
            { id: 'c', label: '10 % des élèves ont une meilleure note', correct: false },
          ]}
          explanation="Le percentile 90 indique le rang relatif : 90 % des scores sont en dessous du sien (ou égal selon la convention « en dessous »)."
        />

        <ExerciseAnswer>
          Il est meilleur que 90 % des élèves (seuls 10 % sont au-dessus de lui)
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Déciles (classe de 20)">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">
          Classe de 20 élèves (rangs 1 à 20). Calculer D₂, D₅, D₈ et interpréter.
        </p>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="D_k \Rightarrow P_{10k} \text{ (environ } 10k\,\% \text{ en dessous)}" className="!my-2" />
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>D₂</strong> ≈ {d2.toFixed(1)} — environ 20 % des notes sont en dessous.
          </li>
          <li>
            <strong>D₅</strong> ≈ {d5.toFixed(1)} — médiane (50 % en dessous).
          </li>
          <li>
            <strong>D₈</strong> ≈ {d8.toFixed(1)} — environ 80 % en dessous.
          </li>
        </ul>
        <ExerciseAnswer>
          D₂ ≈ {d2.toFixed(1)} · D₅ ≈ {d5.toFixed(1)} · D₈ ≈ {d8.toFixed(1)}
        </ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Q₁ = P₂₅ · Q₂ = P₅₀ · Q₃ = P₇₅</li>
          <li>Percentile p → p % des données en dessous</li>
          <li>Utile pour classements et examens</li>
        </ul>
      </Callout>
    </div>
  )
}
