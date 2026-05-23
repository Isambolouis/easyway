import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { GroupedSeriesTable } from '@/components/statistique/GroupedSeriesTable'
import { StatsHistogram, StatsOgiveChart } from '@/components/statistique/StatsCharts'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { buildGroupedSeries } from '@/components/statistique/groupedSeries'
import { CH8_EX1_CLASS_DEFS, CH8_EX1_RAW } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const ex1Rows = buildGroupedSeries(CH8_EX1_RAW, CH8_EX1_CLASS_DEFS)

export function StatistiqueCh8Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 8</h3>
      <p className="text-muted">Séries groupées, effectifs, fréquences et densités.</p>

      <Accordion title="Exercice 1 & 2 — Série groupée complète" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <MathBlock tex="5,\; 7,\; 9,\; 12,\; 15,\; 18,\; 21,\; 24,\; 27,\; 30" className="!my-2" />
        <p className="text-sm text-muted">Classes : [0 ; 10[ · [10 ; 20[ · [20 ; 30[</p>

        <GroupedSeriesTable rows={ex1Rows} caption="Effectifs, fréquences et cumul — exercices 1 & 2" />

        <StatsHistogram
          data={ex1Rows.map((r) => ({ label: r.label, count: r.effectif }))}
          title="Histogramme des effectifs"
          subtitle="Amplitudes égales (h = 10)"
        />

        <StatsOgiveChart
          data={ex1Rows.map((r) => ({ label: r.label, cumul: r.frequenceCumulee }))}
          title="Ogive des fréquences cumulées"
        />

        <ExerciseAnswer>
          [0;10[ : n=3 · [10;20[ : n=3 · [20;30[ : n=4 · Σ fᵢ = 1
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Centres et amplitudes">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Trouver les centres de classes et les amplitudes.</p>

        <div className="scroll-x-card my-3 overflow-x-auto rounded-lg border border-slate-200 text-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
                <th className="px-3 py-2">Classe</th>
                <th className="px-3 py-2">h</th>
                <th className="px-3 py-2">Centre xᵢ</th>
              </tr>
            </thead>
            <tbody>
              {ex1Rows.map((r) => (
                <tr key={r.label} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{r.label}</td>
                  <td className="px-3 py-1.5">{r.amplitude}</td>
                  <td className="px-3 py-1.5">{r.centre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <MathBlock tex="x_i = \frac{a_i + b_i}{2}" className="!my-2" />
        <p className="text-sm text-muted">Ex. classe [10 ; 20[ : h = 10, centre = 15.</p>
        <ExerciseAnswer>Centres : 5, 15, 25 — amplitudes : 10 pour chaque classe</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Densité et histogramme">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-muted">Pourquoi la densité est-elle nécessaire pour l’histogramme ?</p>

        <StatsQuizCard
          question="Si deux classes ont la même effectif mais des amplitudes différentes, que doit-on comparer ?"
          options={[
            { id: 'a', label: 'Les effectifs bruts uniquement', correct: false },
            { id: 'b', label: 'Les densités nᵢ / hᵢ', correct: true },
            { id: 'c', label: 'Les centres de classes', correct: false },
          ]}
          explanation="L’aire de chaque barre doit être proportionnelle à l’effectif. Aire = hauteur × largeur → hauteur = nᵢ/hᵢ = densité."
        />

        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          Avec des classes de <strong>même amplitude</strong>, hauteur = effectif suffit. Si les classes ont des
          largeurs différentes, la <strong>hauteur = densité</strong> garantit que l’<strong>aire</strong> reflète
          l’effectif — sinon on sous-estime ou surestime visuellement certaines classes.
        </p>
        <MathBlock tex="d_i = \frac{n_i}{h_i} \quad \Rightarrow \quad \text{aire} = d_i \times h_i = n_i" className="!my-2" />
        <ExerciseAnswer>Densité → aires correctes dans l’histogramme</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Classe [a ; b[ : a ≤ x &lt; b</li>
          <li>fᵢ = nᵢ/N · Fᵢ cumul des fᵢ</li>
          <li>Histogramme : hauteur = densité si h variable</li>
        </ul>
      </Callout>
    </div>
  )
}
