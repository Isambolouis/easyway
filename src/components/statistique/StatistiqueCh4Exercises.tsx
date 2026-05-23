import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { DeviationTable } from '@/components/statistique/DeviationTable'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import {
  deviationTable,
  mean,
  meanWeighted,
  stdPop,
  stdWeighted,
  variancePop,
  varianceWeighted,
} from '@/components/statistique/statsMath'
import {
  CH4_EX1,
  CH4_EX3_A,
  CH4_EX3_B,
  CH4_EX4_WEIGHTED,
} from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function StatistiqueCh4Exercises() {
  const ex1m = mean(CH4_EX1)
  const ex1v = variancePop(CH4_EX1)
  const ex1s = stdPop(CH4_EX1)
  const ex1rows = deviationTable(CH4_EX1)

  const vA = variancePop(CH4_EX3_A)
  const vB = variancePop(CH4_EX3_B)

  const ex4m = meanWeighted(CH4_EX4_WEIGHTED)
  const ex4v = varianceWeighted(CH4_EX4_WEIGHTED)
  const ex4s = stdWeighted(CH4_EX4_WEIGHTED)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 4</h3>
      <p className="text-muted">Variance, écart-type et interprétation de la dispersion.</p>

      <Accordion title="Exercice 1 — Variance et écart-type" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="3,\; 5,\; 7,\; 9" className="!my-2" />
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="\bar{x} = \frac{3+5+7+9}{4} = 6" className="!my-2" />
        <DeviationTable rows={ex1rows} mean={ex1m} caption="Écarts à la moyenne" />
        <MathBlock
          tex={`\\sigma^2 = \\frac{${ex1rows.map((r) => r.ecart2).join('+')}}{4} = ${ex1v}`}
          className="!my-2"
        />
        <MathBlock tex={`\\sigma = \\sqrt{${ex1v}} \\approx ${ex1s.toFixed(3)}`} className="!my-2" />
        <ExerciseAnswer>
          σ² = {ex1v} · σ ≈ {ex1s.toFixed(3)}
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Interprétation de σ">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Interpréter : σ = 0 et σ très grand.</p>

        <StatsQuizCard
          question="Si σ = 0, que peut-on affirmer ?"
          options={[
            { id: 'a', label: 'Toutes les valeurs sont identiques', correct: true },
            { id: 'b', label: 'La moyenne est nulle', correct: false },
            { id: 'c', label: 'Il n’y a qu’une observation', correct: false },
          ]}
          explanation="σ = 0 ⟺ variance nulle ⟺ aucun écart à la moyenne : toutes les xᵢ sont égales."
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>σ = 0</strong> : aucune dispersion — toutes les observations sont égales à la moyenne.
          </li>
          <li>
            <strong>σ très grand</strong> : valeurs très éloignées de x̄ — forte hétérogénéité, risque accru
            d’outliers.
          </li>
        </ul>
        <ExerciseAnswer>σ = 0 → homogénéité parfaite · σ grand → dispersion forte</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Comparer deux séries">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">
          A : 10, 10, 10, 10 — B : 5, 10, 15, 20. Quelle série est la plus stable ? La plus grande variance ?
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3 text-sm">
            <p className="font-bold">Série A</p>
            <p className="text-muted">σ² = {vA} · σ = {stdPop(CH4_EX3_A)}</p>
          </div>
          <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3 text-sm">
            <p className="font-bold">Série B</p>
            <p className="text-muted">σ² = {vB} · σ = {stdPop(CH4_EX3_B).toFixed(2)}</p>
          </div>
        </div>
        <ExerciseAnswer>
          A plus stable (σ = 0) · B a la plus grande variance (σ² = {vB})
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Variance avec effectifs">
        <p className="font-medium text-deep">Énoncé</p>
        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full max-w-xs">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Valeur</th>
                <th className="px-3 py-2">Effectif</th>
              </tr>
            </thead>
            <tbody>
              {CH4_EX4_WEIGHTED.map((r) => (
                <tr key={r.value} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.value}</td>
                  <td className="px-3 py-1.5">{r.effectif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="\bar{x} = \frac{1\times 2 + 3\times 3 + 5\times 5}{10} = \frac{36}{10} = 3{,}6" className="!my-2" />
        <MathBlock
          tex="\sigma^2 = \frac{2(1-3{,}6)^2 + 3(3-3{,}6)^2 + 5(5-3{,}6)^2}{10}"
          className="!my-2"
        />
        <p className="text-sm text-muted">
          Moyenne = <strong>{ex4m}</strong> · Variance = <strong>{ex4v.toFixed(2)}</strong> · Écart-type σ ≈{' '}
          <strong>{ex4s.toFixed(2)}</strong>
        </p>
        <ExerciseAnswer>
          x̄ = {ex4m} · σ² ≈ {ex4v.toFixed(2)} · σ ≈ {ex4s.toFixed(2)}
        </ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>σ² = moyenne des (xᵢ − x̄)²</li>
          <li>σ = √σ² (même unité que les données)</li>
          <li>Avec effectifs : σ² = Σ nᵢ(xᵢ − x̄)² / N</li>
        </ul>
      </Callout>
    </div>
  )
}
