import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { pieSliceAngles } from '@/components/statistique/pieAngles'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { StatsBarChart, StatsHistogram, StatsPieChart } from '@/components/statistique/StatsCharts'
import { CH2_EX1_BARS, CH2_EX2_HIST, CH2_EX3_PIE } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex3Angles = pieSliceAngles(CH2_EX3_PIE)

export function StatistiqueCh2Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 2</h3>
      <p className="text-muted">
        Lecture de graphiques, construction et réflexion sur le choix du bon type de représentation.
      </p>

      <Accordion title="Exercice 1 — Diagramme en bâtons" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Valeur</th>
                <th className="px-3 py-2">Effectif</th>
              </tr>
            </thead>
            <tbody>
              {CH2_EX1_BARS.map((r) => (
                <tr key={r.valeur} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.valeur}</td>
                  <td className="px-3 py-1.5">{r.effectif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-muted">
          <li>Décris la distribution</li>
          <li>Quelle est la valeur dominante ?</li>
        </ol>

        <StatsBarChart
          data={CH2_EX1_BARS}
          xKey="valeur"
          yKey="effectif"
          title="Diagramme en bâtons — exercice 1"
          subtitle="Barres séparées (données discrètes)"
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          La distribution est <strong>asymétrique</strong> : peu de valeurs 1 et 3, pic à 4, valeur 2 aussi
          fréquente. La barre la plus haute correspond à la valeur <strong>4</strong> (effectif 6).
        </p>
        <ExerciseAnswer>Valeur dominante : 4 (effectif = 6)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Histogramme">
        <p className="font-medium text-deep">Énoncé</p>
        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Intervalle</th>
                <th className="px-3 py-2">Effectif</th>
              </tr>
            </thead>
            <tbody>
              {CH2_EX2_HIST.map((r) => (
                <tr key={r.classe} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.classe}</td>
                  <td className="px-3 py-1.5">{r.effectif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-muted">
          <li>Construis l’histogramme</li>
          <li>Quelle classe est la plus représentée ?</li>
        </ol>

        <StatsHistogram
          data={CH2_EX2_HIST.map((r) => ({ label: r.classe, count: r.effectif }))}
          title="Histogramme — exercice 2"
          subtitle="Classes de même amplitude (5 unités)"
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          Classe la plus représentée : <strong>10–15</strong> avec 10 observations (plus haute barre).
        </p>
        <ExerciseAnswer>Classe dominante : [10 ; 15[ (effectif 10)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Camembert (angles)">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Effectifs : A = 15, B = 25, C = 10. Calculer les angles et interpréter.</p>

        <StatsPieChart data={CH2_EX3_PIE} title="Camembert — exercice 3" subtitle="N = 50" />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="N = 15 + 25 + 10 = 50" className="!my-2" />
        <div className="scroll-x-card overflow-x-auto rounded-lg border border-sky-200 text-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Catégorie</th>
                <th className="px-3 py-2">nᵢ</th>
                <th className="px-3 py-2">Part</th>
                <th className="px-3 py-2">Angle</th>
              </tr>
            </thead>
            <tbody>
              {ex3Angles.map((row) => (
                <tr key={row.name} className="border-t border-slate-100">
                  <td className="px-3 py-1.5 font-medium">{row.name}</td>
                  <td className="px-3 py-1.5">{row.effectif}</td>
                  <td className="px-3 py-1.5">{(row.part * 100).toFixed(0)} %</td>
                  <td className="px-3 py-1.5">{row.angleDeg.toFixed(0)}°</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <MathBlock
          tex="A:\ \frac{15}{50}\times 360 = 108^\circ \quad B:\ 180^\circ \quad C:\ 72^\circ"
          className="!my-2"
        />
        <p className="text-sm text-muted">
          <strong>B</strong> occupe la plus grande part (50 % du cercle) → catégorie la plus importante.
        </p>
        <ExerciseAnswer>B domine (180°), puis A (108°), puis C (72°)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Histogramme vs diagramme en bâtons">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Explique la différence entre histogramme et diagramme en bâtons.</p>

        <StatsQuizCard
          question="Quel graphique pour des notes entières distinctes (10, 11, 12…) ?"
          options={[
            { id: 'a', label: 'Histogramme (barres jointives)', correct: false },
            { id: 'b', label: 'Diagramme en bâtons (barres séparées)', correct: true },
            { id: 'c', label: 'Camembert uniquement', correct: false },
          ]}
          explanation="Les modalités sont discrètes et isolées → bâtons séparés. L’histogramme sert aux classes continues contiguës."
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Diagramme en bâtons</strong> : une barre par valeur <em>discrète</em>, barres espacées, hauteur =
            effectif.
          </li>
          <li>
            <strong>Histogramme</strong> : classes <em>continues</em> qui se touchent, hauteur = effectif ou
            effectif/amplitude ; l’<strong>aire</strong> compte.
          </li>
        </ul>
        <ExerciseAnswer>
          Bâtons = discret · Histogramme = continu groupé en classes
        </ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Bâtons → modalités discrètes</li>
          <li>Histogramme → classes continues (aires)</li>
          <li>Camembert → parts qualitatives (angle = nᵢ/N × 360°)</li>
          <li>Ogive → fréquences cumulées, lecture des percentiles</li>
        </ul>
      </Callout>
    </div>
  )
}
