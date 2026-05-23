import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { mean, median, mode, meanWeighted } from '@/components/statistique/statsMath'
import {
  CH3_EX1_MEAN,
  CH3_EX2_WEIGHTED,
  CH3_EX3_MEDIAN,
  CH3_EX4_MODE,
} from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function StatistiqueCh3Exercises() {
  const ex1 = mean(CH3_EX1_MEAN)
  const ex2 = meanWeighted(CH3_EX2_WEIGHTED)
  const ex3 = median(CH3_EX3_MEDIAN)
  const ex4 = mode(CH3_EX4_MODE)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 3</h3>
      <p className="text-muted">Moyenne, médiane et mode — calculs et interprétation.</p>

      <Accordion title="Exercice 1 — Moyenne simple" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="5,\; 7,\; 9,\; 11,\; 13" className="!my-2" />
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="\bar{x} = \frac{5+7+9+11+13}{5} = \frac{45}{5} = 9" className="!my-2" />
        <ExerciseAnswer>Moyenne = {ex1}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Moyenne avec effectifs">
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
              {CH3_EX2_WEIGHTED.map((r) => (
                <tr key={r.value} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.value}</td>
                  <td className="px-3 py-1.5">{r.effectif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock
          tex="\bar{x} = \frac{2\times 1 + 4\times 3 + 6\times 2}{6} = \frac{2+12+12}{6} = \frac{26}{6} \approx 4{,}33"
          className="!my-2"
        />
        <ExerciseAnswer>Moyenne ≈ {ex2.toFixed(2)} (N = 6)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Médiane">
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="3,\; 8,\; 12,\; 15,\; 20,\; 25" className="!my-2" />
        <p className="mt-1 text-sm text-muted">Série paire (n = 6) : moyenne des deux valeurs centrales.</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="M_e = \frac{12 + 15}{2} = 13{,}5" className="!my-2" />
        <ExerciseAnswer>Médiane = {ex3}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Mode">
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="1,\; 2,\; 2,\; 3,\; 3,\; 3,\; 4,\; 5" className="!my-2" />
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          La valeur <strong>3</strong> apparaît 3 fois (plus que toute autre) → série <strong>unimodale</strong>.
        </p>
        <ExerciseAnswer>Mode = {ex4}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Robustesse de la médiane">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Explique pourquoi la médiane est plus robuste que la moyenne.</p>

        <StatsQuizCard
          question="Si une note passe de 16 à 1000, quel indicateur change le plus ?"
          options={[
            { id: 'a', label: 'La moyenne', correct: true },
            { id: 'b', label: 'La médiane', correct: false },
            { id: 'c', label: 'Les deux autant', correct: false },
          ]}
          explanation="La moyenne intègre toutes les valeurs dans la somme : une extrême tire fortement le résultat. La médiane ne dépend que du rang au centre."
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          La <strong>moyenne</strong> utilise chaque valeur dans le calcul : un outlier (très grand ou très petit)
          déplace fortement x̄. La <strong>médiane</strong> ne dépend que de la position centrale après tri : une
          valeur extrême en bout de série change peu le centre.
        </p>
        <ExerciseAnswer>
          Médiane = résistante aux valeurs aberrantes · Moyenne = sensible à chaque observation
        </ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Récapitulatif">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>x̄ = (1/n) Σ xᵢ ou Σ nᵢxᵢ / N</li>
          <li>Médiane : valeur centrale (ou moyenne des deux centrales si n pair)</li>
          <li>Mode : valeur la plus fréquente (peut être multiple ou absent)</li>
        </ul>
      </Callout>
    </div>
  )
}
