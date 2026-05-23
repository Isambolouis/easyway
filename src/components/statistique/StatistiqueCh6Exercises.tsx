import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { BoxplotSummaryTable } from '@/components/statistique/BoxplotSummaryTable'
import { StatsBoxPlot } from '@/components/statistique/StatsCharts'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { boxplotStats } from '@/components/statistique/statsMath'
import { CH6_EX1, CH6_EX4 } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex1 = boxplotStats(CH6_EX1)
const ex4 = boxplotStats(CH6_EX4)

export function StatistiqueCh6Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 6</h3>
      <p className="text-muted">Boxplot, IQR et détection des valeurs aberrantes.</p>

      <Accordion title="Exercice 1 — Cinq nombres clés et IQR" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="5,\; 7,\; 8,\; 10,\; 12,\; 15,\; 18,\; 20" className="!my-2" />
        <ol className="list-decimal space-y-1 pl-5 text-muted">
          <li>Trouver les 5 nombres clés</li>
          <li>Calculer l’IQR</li>
          <li>Interpréter la distribution</li>
        </ol>

        <BoxplotSummaryTable stats={ex1} caption="Résumé — exercice 1" showFences />
        <StatsBoxPlot
          stats={ex1}
          title="Boxplot — exercice 1"
          subtitle={`IQR = ${ex1.iqr.toFixed(1)}`}
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          Boîte relativement large (IQR ≈ {ex1.iqr.toFixed(1)}) : les 50 % centraux sont étalés entre Q₁ et Q₃.
          Moustaches longues vers le haut — dispersion globale modérée à forte, sans outlier détecté (règle 1,5×IQR).
        </p>
        <ExerciseAnswer>
          IQR ≈ {ex1.iqr.toFixed(1)} · distribution étalée, médiane ≈ {ex1.q2.toFixed(1)}
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Rôle du boxplot">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">
          Explique le rôle du boxplot et la différence entre moyenne et médiane dans ce graphique.
        </p>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Rôle</strong> : résumer une distribution (centre, dispersion, asymétrie, outliers) en un coup
            d’œil — idéal en analyse exploratoire (EDA).
          </li>
          <li>
            Le boxplot affiche la <strong>médiane</strong> (trait dans la boîte), pas la moyenne. La moyenne peut être
            très différente si la série est asymétrique ou contient des extrêmes.
          </li>
        </ul>
        <ExerciseAnswer>Boxplot = médiane + quartiles + outliers · pas de moyenne affichée</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Impact d’une valeur extrême (1000)">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Une série contient une valeur très grande (ex. 1000). Impact sur moyenne, médiane, boxplot ?</p>

        <StatsQuizCard
          question="Quel indicateur du boxplot change le moins face à 1000 ?"
          options={[
            { id: 'a', label: 'La médiane (Q₂)', correct: true },
            { id: 'b', label: 'La moustache max', correct: false },
            { id: 'c', label: 'L’IQR', correct: false },
          ]}
          explanation="La médiane ne dépend que du rang central. 1000 devient souvent un point outlier isolé ; la boîte (Q₁–Q₃) change peu si les autres valeurs restent groupées."
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Moyenne</strong> : fortement tirée vers le haut.
          </li>
          <li>
            <strong>Médiane</strong> : peu affectée.
          </li>
          <li>
            <strong>Boxplot</strong> : 1000 apparaît comme <strong>outlier</strong> ; la boîte résume le cœur de la
            distribution.
          </li>
        </ul>
        <ExerciseAnswer>Moyenne ↑↑ · Médiane stable · Outlier sur le boxplot</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Boxplot complet et outliers">
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="3,\; 4,\; 5,\; 6,\; 7,\; 8,\; 9,\; 50" className="!my-2" />
        <p className="mt-1 text-muted">Construire le boxplot et détecter les outliers.</p>

        <BoxplotSummaryTable stats={ex4} caption="Calcul — exercice 4" showFences />
        <StatsBoxPlot stats={ex4} title="Boxplot — exercice 4" subtitle="50 = valeur aberrante" />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock
          tex={`\\text{Borne sup.} = Q_3 + 1{,}5 \\times \\text{IQR} \\approx ${ex4.upperFence.toFixed(1)}`}
          className="!my-2"
        />
        <p className="text-sm text-muted">
          <strong>50</strong> &gt; borne supérieure → <strong>outlier</strong>. Les moustaches s’arrêtent à{' '}
          {ex4.max} (max des valeurs « normales »).
        </p>
        <ExerciseAnswer>Outlier détecté : {ex4.outliers.join(', ')}</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>5 nombres : min, Q₁, Q₂, Q₃, max (moustaches)</li>
          <li>IQR = Q₃ − Q₁</li>
          <li>Outlier si &lt; Q₁ − 1,5×IQR ou &gt; Q₃ + 1,5×IQR</li>
        </ul>
      </Callout>
    </div>
  )
}
