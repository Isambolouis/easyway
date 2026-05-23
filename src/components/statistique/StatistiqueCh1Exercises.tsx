import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { FrequencyTable } from '@/components/statistique/FrequencyTable'
import { buildDistribution, frequencySum } from '@/components/statistique/statsDistribution'
import { CH1_EX2_NOTES } from '@/data/statistiqueSampleData'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex2Rows = buildDistribution(CH1_EX2_NOTES)

export function StatistiqueCh1Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 1</h3>
      <p className="text-muted">
        Quatre exercices progressifs. Ouvrez chaque correction après avoir tenté la question.
      </p>

      <Accordion title="Exercice 1 — Identification des variables">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Classifie les variables suivantes :</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
          <li>Âge des étudiants</li>
          <li>Couleur des yeux</li>
          <li>Poids</li>
          <li>Nombre d’enfants</li>
        </ol>

        <StatsQuizCard
          question="1. Âge des étudiants — quelle est la bonne classification ?"
          options={[
            { id: 'a', label: 'Qualitative nominale', correct: false },
            { id: 'b', label: 'Quantitative continue', correct: true },
            { id: 'c', label: 'Qualitative ordinale', correct: false },
          ]}
          explanation="L’âge est numérique et peut prendre toute valeur réelle (17,3 ans…) → quantitative continue."
        />

        <p className="mt-4 font-medium text-deep">Correction complète</p>
        <ul className="mt-2 space-y-2 text-sm text-muted">
          <li>
            <strong>1. Âge</strong> → quantitative <strong>continue</strong> (valeurs réelles possibles).
          </li>
          <li>
            <strong>2. Couleur des yeux</strong> → qualitative <strong>nominale</strong> (bleu, marron… sans ordre
            naturel).
          </li>
          <li>
            <strong>3. Poids</strong> → quantitative <strong>continue</strong>.
          </li>
          <li>
            <strong>4. Nombre d’enfants</strong> → quantitative <strong>discrète</strong> (entiers 0, 1, 2…).
          </li>
        </ul>
        <ExerciseAnswer>
          Âge : continue · Yeux : nominale · Poids : continue · Enfants : discrète
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Tableau statistique et fréquences" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Notes : 8, 10, 10, 12, 14, 14, 14, 16, 18</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
          <li>Construire le tableau des effectifs</li>
          <li>Calculer les fréquences</li>
          <li>Vérifier que la somme des fréquences = 1</li>
        </ol>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <FrequencyTable rows={ex2Rows} caption="Tableau complet — exercice 2" />
        <p className="mt-2 text-sm text-muted">
          N = 9. Pour la note 14 : n = 3 donc f = 3/9 ≈ 0,33. Somme des fᵢ ={' '}
          <strong>{frequencySum(ex2Rows).toFixed(2)}</strong>.
        </p>
        <MathBlock tex="f_{14} = \frac{3}{9} = \frac{1}{3} \approx 0{,}333" className="!my-2" />
        <ExerciseAnswer>Somme des fréquences = 1 ✓</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Interprétation de la fréquence cumulée">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">On sait que F(15) = 0,75. Que signifie cette information ?</p>

        <StatsQuizCard
          question="Que signifie F(15) = 0,75 ?"
          options={[
            { id: 'a', label: '75 % des étudiants ont exactement la note 15', correct: false },
            { id: 'b', label: '75 % des étudiants ont une note ≤ 15', correct: true },
            { id: 'c', label: '75 % des étudiants ont une note ≥ 15', correct: false },
          ]}
          explanation="F(x) est la fréquence cumulée : proportion des données inférieures ou égales à x. Ici, 75 % ont une note au plus égale à 15."
        />

        <p className="mt-4 font-medium text-deep">Correction détaillée</p>
        <p className="text-sm text-muted">
          F<sub>i</sub> = ∑ f<sub>i</sub> jusqu’à la modalité considérée. F(15) = 0,75 signifie que{' '}
          <strong>75 %</strong> de l’échantillon a une note <strong>inférieure ou égale à 15</strong> (et donc 25 %
          strictement au-dessus de 15).
        </p>
        <ExerciseAnswer>75 % des étudiants ont une note ≤ 15</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Niveau avancé (classe de 40)">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">40 étudiants : 10 ont la note 10, 15 la note 12, 10 la note 14, 5 la note 16.</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
          <li>Construire le tableau complet</li>
          <li>Calculer les fréquences</li>
          <li>Interpréter la fréquence de la note 14</li>
        </ol>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <FrequencyTable
          rows={[
            { value: 10, effectif: 10, frequence: 0.25, frequenceCumulee: 0.25 },
            { value: 12, effectif: 15, frequence: 0.375, frequenceCumulee: 0.625 },
            { value: 14, effectif: 10, frequence: 0.25, frequenceCumulee: 0.875 },
            { value: 16, effectif: 5, frequence: 0.125, frequenceCumulee: 1 },
          ]}
          caption="Classe de 40 — distribution des notes"
        />
        <p className="mt-2 text-sm text-muted">
          Fréquence de la note 14 : f = 10/40 = <strong>0,25</strong> → <strong>25 %</strong> de la classe a obtenu
          14/20.
        </p>
        <MathBlock tex="f_{14} = \frac{10}{40} = 0{,}25 \Rightarrow 25\,\%" className="!my-2" />
        <ExerciseAnswer>25 % des étudiants ont la note 14</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>N = ∑ nᵢ · fᵢ = nᵢ / N · ∑ fᵢ = 1</li>
          <li>Fᵢ = proportion des valeurs ≤ xᵢ</li>
          <li>Toujours ordonner les modalités avant de cumuler</li>
        </ul>
      </Callout>
    </div>
  )
}
