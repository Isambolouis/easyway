import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { GroupedSeriesTable } from '@/components/statistique/GroupedSeriesTable'
import { StatistiqueCh8Exercises } from '@/components/statistique/StatistiqueCh8Exercises'
import { StatsDensityHistogram, StatsHistogram, StatsOgiveChart } from '@/components/statistique/StatsCharts'
import { buildGroupedSeries, meanFromGrouped } from '@/components/statistique/groupedSeries'
import { CH8_CLASS_DEFS, CH8_RAW_VALUES, CH8_FREQ_CUMUL_EX } from '@/data/statistiqueSampleData'

const ch8Rows = buildGroupedSeries(CH8_RAW_VALUES, CH8_CLASS_DEFS)
const ch8Mean = meanFromGrouped(ch8Rows)

export function StatistiqueSeriesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 8 — Séries statistiques groupées</strong> : organiser de grandes
          séries en <strong>classes</strong> pour simplifier l’analyse et construire des histogrammes fiables.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Regrouper des données continues en intervalles, calculer effectifs, fréquences, cumuls et densités.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">8.1 Série statistique groupée</h3>
      <p className="text-muted">
        Au lieu de lister chaque valeur, on regroupe les observations dans des <strong>intervalles</strong>.
      </p>
      <p className="text-sm text-muted">Données brutes (n = {CH8_RAW_VALUES.length}) :</p>
      <MathBlock tex="12,\; 15,\; 18,\; 21,\; 22,\; 24,\; 26,\; 28,\; 30,\; 35,\; 38,\; 40" />

      <GroupedSeriesTable rows={ch8Rows} caption="Série groupée — intervalles [a ; b[" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.2 Notion de classe</h3>
      <p className="text-muted">
        Une classe est un intervalle <strong>[aᵢ ; bᵢ[</strong> : aᵢ ≤ x &lt; bᵢ (borne supérieure exclue).
      </p>
      <Callout variant="definition" title="Exemple">
        « 10 – 19 » dans le cours signifie souvent la classe [10 ; 20[ en calcul — ici libellée « 10 – 19 » pour la
        lecture pédagogique.
      </Callout>
      <p className="text-sm text-muted">Les classes ne doivent pas se chevaucher.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.3 Amplitude de classe</h3>
      <MathBlock tex="h = b_i - a_i" />
      <p className="text-muted">
        Classe [10 ; 20[ : h = <strong>10</strong>. Petite amplitude → plus précis ; grande amplitude → tableau plus
        compact.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.4 Centre de classe</h3>
      <MathBlock tex="x_i = \frac{a_i + b_i}{2}" />
      <p className="text-muted">
        Classe [10 ; 20[ → centre = <strong>15</strong>. Utilisé pour la moyenne approximée : x̄ ≈{' '}
        <strong>{ch8Mean.toFixed(1)}</strong>.
      </p>
      <MathBlock tex="\bar{x} = \frac{1}{N} \sum_j n_j \cdot x_j" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.5 & 8.6 Fréquences absolues et relatives</h3>
      <p className="text-muted">
        <strong>Effectif nᵢ</strong> : nombre d’observations dans la classe.{' '}
        <strong>Fréquence relative</strong> fᵢ = nᵢ / N.
      </p>
      <p className="text-sm text-muted">
        Ex. si n = 4 sur N = 10 pour une classe : f = 4/10 = <strong>0,4</strong> → 40 % des données.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.7 Fréquence cumulée</h3>
      <p className="text-muted">Somme progressive des fᵢ :</p>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-md">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Classe</th>
              <th className="px-4 py-2">fᵢ</th>
              <th className="px-4 py-2">Fᵢ</th>
            </tr>
          </thead>
          <tbody>
            {CH8_FREQ_CUMUL_EX.map((r) => (
              <tr key={r.classe} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.classe}</td>
                <td className="px-4 py-2">{r.fi}</td>
                <td className="px-4 py-2">{r.Fi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout variant="resume" title="Lecture">
        Fᵢ = 0,5 → 50 % des données sont inférieures ou égales à la fin de cette classe.
      </Callout>

      <StatsOgiveChart
        data={ch8Rows.map((r) => ({ label: r.label, cumul: r.frequenceCumulee }))}
        title="Ogive — série groupée du chapitre"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">8.8 Densité de fréquence</h3>
      <MathBlock tex="d_i = \frac{n_i}{h_i}" />
      <p className="text-muted">Indispensable si les classes n’ont pas la même amplitude.</p>

      <StatsDensityHistogram
        data={ch8Rows.map((r) => ({ label: r.label, density: r.densite, effectif: r.effectif }))}
        title="Histogramme — hauteur = densité"
        subtitle="Aire de chaque barre ∝ effectif"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">8.9 Lien avec l’histogramme</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>
          <strong>Hauteur</strong> = densité dᵢ (ou effectif si toutes les h égales)
        </li>
        <li>
          <strong>Aire</strong> de la barre = effectif nᵢ
        </li>
      </ul>

      <StatsHistogram
        data={ch8Rows.map((r) => ({ label: r.label, count: r.effectif }))}
        title="Histogramme — effectifs (h constantes)"
        subtitle="Comparaison : ici h = 10 pour toutes les classes"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">8.10 Erreur fréquente</h3>
      <Callout variant="important" title="Ne pas confondre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Effectif</strong> nᵢ — nombre brut
          </li>
          <li>
            <strong>Fréquence</strong> fᵢ — proportion (sans unité)
          </li>
          <li>
            <strong>Densité</strong> dᵢ — effectif par unité de largeur (pour l’histogramme)
          </li>
        </ul>
      </Callout>

      <StatistiqueCh8Exercises />
    </>
  )
}
