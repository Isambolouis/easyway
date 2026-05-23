import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { CorrelationSummary } from '@/components/statistique/CorrelationSummary'
import { CovarianceTable } from '@/components/statistique/CovarianceTable'
import { StatsScatterChart } from '@/components/statistique/StatsCharts'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import {
  bivariateStats,
  covarianceTable,
  interpretCorrelation,
} from '@/components/statistique/statsMath'
import {
  CH7_EX1_X,
  CH7_EX1_Y,
  CH7_STRESS_DATA,
} from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex1 = bivariateStats(CH7_EX1_X, CH7_EX1_Y)
const ex1rows = covarianceTable(CH7_EX1_X, CH7_EX1_Y)
const stressX = CH7_STRESS_DATA.map((d) => d.heures)
const stressY = CH7_STRESS_DATA.map((d) => d.stress)
const ex4 = bivariateStats(stressX, stressY)
const ex4rows = covarianceTable(stressX, stressY)

export function StatistiqueCh7Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 7</h3>
      <p className="text-muted">Covariance, corrélation de Pearson et interprétation.</p>

      <Accordion title="Exercice 1 — Covariance" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full max-w-xs">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">X</th>
                <th className="px-3 py-2">Y</th>
              </tr>
            </thead>
            <tbody>
              {CH7_EX1_X.map((x, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{x}</td>
                  <td className="px-3 py-1.5">{CH7_EX1_Y[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-muted">
          <li>Calculer la covariance</li>
          <li>Interpréter</li>
        </ol>

        <CovarianceTable rows={ex1rows} meanX={ex1.meanX} meanY={ex1.meanY} caption="Calcul — exercice 1" />
        <CorrelationSummary {...ex1} />

        <ExerciseAnswer>
          Cov = {ex1.cov.toFixed(2)} · r = {ex1.r.toFixed(2)} → relation positive parfaite (Y = 2X)
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Covariance vs corrélation">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">
          Différence entre covariance et corrélation — pourquoi r est plus utile ?
        </p>

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Covariance</strong> : signe et amplitude dépendent des <strong>unités</strong> (mètres vs
            centimètres change Cov).
          </li>
          <li>
            <strong>Corrélation r</strong> : normalise par σ_X et σ_Y → toujours entre −1 et 1, comparable entre
            jeux de données.
          </li>
        </ul>
        <MathBlock tex="r = \frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y}" className="!my-2" />
        <ExerciseAnswer>r = mesure standardisée, idéale en data science et ML</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Interpréter r">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Type de relation pour r = 0,85 · r = −0,6 · r = 0,1</p>

        <StatsQuizCard
          question="r = −0,6 indique :"
          options={[
            { id: 'a', label: 'Forte relation positive', correct: false },
            { id: 'b', label: 'Corrélation négative modérée à forte', correct: true },
            { id: 'c', label: 'Aucune relation', correct: false },
          ]}
          explanation="Le signe négatif : quand X augmente, Y tend à diminuer. |r| = 0,6 → lien linéaire notable."
        />

        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>
            <strong>r = 0,85</strong> → {interpretCorrelation(0.85)}
          </li>
          <li>
            <strong>r = −0,6</strong> → {interpretCorrelation(-0.6)}
          </li>
          <li>
            <strong>r = 0,1</strong> → {interpretCorrelation(0.1)}
          </li>
        </ul>
        <ExerciseAnswer>0,85 : + forte · −0,6 : − modérée · 0,1 : quasi nulle</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Heures d'étude et stress">
        <p className="font-medium text-deep">Énoncé</p>
        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full max-w-xs">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Heures</th>
                <th className="px-3 py-2">Stress</th>
              </tr>
            </thead>
            <tbody>
              {CH7_STRESS_DATA.map((r) => (
                <tr key={r.heures} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.heures}</td>
                  <td className="px-3 py-1.5">{r.stress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <StatsScatterChart
          data={CH7_STRESS_DATA}
          xKey="heures"
          yKey="stress"
          title="Nuage de points — exercice 4"
          subtitle="Tendance descendante"
        />
        <CovarianceTable rows={ex4rows} meanX={ex4.meanX} meanY={ex4.meanY} caption="Tableau complet" />
        <CorrelationSummary {...ex4} />

        <p className="mt-4 text-sm text-muted">
          Plus les heures d’étude augmentent, plus le stress <strong>diminue</strong> → covariance négative, r
          négatif.
        </p>
        <ExerciseAnswer>
          Cov ≈ {ex4.cov.toFixed(2)} · r ≈ {ex4.r.toFixed(2)} → corrélation négative forte
        </ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Cov &gt; 0 : X et Y varient dans le même sens</li>
          <li>−1 ≤ r ≤ 1 · r invariant à l’échelle</li>
          <li>Corrélation ≠ causalité</li>
        </ul>
      </Callout>
    </div>
  )
}
