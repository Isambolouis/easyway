import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { FrequencyTable } from '@/components/statistique/FrequencyTable'
import { StatistiqueCh1Exercises } from '@/components/statistique/StatistiqueCh1Exercises'
import { buildDistribution } from '@/components/statistique/statsDistribution'
import { CH1_SERIES_NOTES } from '@/data/statistiqueSampleData'
import { StatsBarChart, StatsOgiveChart } from '@/components/statistique/StatsCharts'

const ch1Distribution = buildDistribution(CH1_SERIES_NOTES)
const ch1BarData = ch1Distribution.map((r) => ({ note: String(r.value), effectif: r.effectif }))
const ch1OgiveData = ch1Distribution.map((r) => ({
  label: String(r.value),
  cumul: r.frequenceCumulee,
}))

export function StatistiqueOrganisationView() {
  const row14 = ch1Distribution.find((r) => r.value === 14)
  const fCumul14 = row14?.frequenceCumulee ?? 0

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 1 — Organisation des données</strong> : transformer des données
          brutes en tableaux et fréquences exploitables, première étape de toute analyse descriptive.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">1.1 Définition</h3>
      <p className="text-muted">L’organisation des données consiste à :</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>collecter les données ;</li>
        <li>les classer ;</li>
        <li>les présenter sous forme exploitable (tableaux, fréquences).</li>
      </ul>
      <Callout variant="important" title="Objectif">
        Transformer des <strong>données brutes</strong> en <strong>information compréhensible</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1.2 Types de données</h3>

      <h4 className="mt-6 font-semibold text-sky-800">Données qualitatives</h4>
      <p className="text-muted">Données <strong>non numériques</strong> (ou codées par des labels).</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Sexe (M, F)</li>
        <li>Couleur (rouge, bleu)</li>
        <li>Niveau (faible, moyen, élevé) — <em>ordinale</em> si un ordre existe</li>
      </ul>

      <h4 className="mt-6 font-semibold text-sky-800">Données quantitatives</h4>
      <p className="text-muted">Données <strong>numériques</strong> :</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li><strong>Discrètes</strong> : valeurs entières (nombre d’élèves, notes entières).</li>
        <li><strong>Continues</strong> : valeurs réelles (taille, poids, température).</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">1.3 Population et échantillon</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>
          <strong>Population</strong> : ensemble total étudié.
        </li>
        <li>
          <strong>Échantillon</strong> : sous-ensemble de la population.
        </li>
      </ul>
      <Callout variant="definition" title="Exemple">
        Population : tous les étudiants d’une université. Échantillon : 50 étudiants choisis au hasard dans cette
        université.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1.4 Série statistique</h3>
      <p className="text-muted">
        Une <strong>série statistique</strong> est une liste de valeurs observées (souvent réordonnée pour les
        calculs).
      </p>
      <p className="text-sm text-muted">Exemple (notes) :</p>
      <MathBlock tex="12,\; 14,\; 15,\; 14,\; 10,\; 18,\; 16" />
      <p className="text-sm text-muted">N = 7 observations dans cette série.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">1.5 Tableau statistique</h3>
      <p className="text-muted">
        On regroupe les valeurs identiques et on compte les <strong>effectifs</strong> n<sub>i</sub>.
      </p>
      <FrequencyTable rows={ch1Distribution} caption="Distribution des notes — exemple du cours" showCumulative={false} />
      <p className="text-muted">Total des effectifs :</p>
      <MathBlock tex="N = \sum n_i = 7" />

      <StatsBarChart
        data={ch1BarData}
        xKey="note"
        yKey="effectif"
        title="Diagramme des effectifs"
        subtitle="La note 14 apparaît deux fois (n = 2)"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">1.6 Fréquence</h3>
      <p className="text-muted">
        La <strong>fréquence relative</strong> f<sub>i</sub> est la proportion d’une modalité dans l’échantillon :
      </p>
      <MathBlock tex="f_i = \frac{n_i}{N}" />
      <p className="text-sm text-muted">où n<sub>i</sub> = effectif de la modalité, N = effectif total.</p>

      <h4 className="mt-6 font-semibold text-sky-800">Exemple — note 14</h4>
      <MathBlock tex="f_{14} = \frac{2}{7} \approx 0{,}286" />
      <Callout variant="resume" title="Interprétation">
        Environ <strong>28,6 %</strong> des étudiants ont la note 14 dans cette série.
      </Callout>

      <FrequencyTable rows={ch1Distribution} caption="Tableau avec fréquences fᵢ" showCumulative={false} />

      <h3 className="mt-10 text-xl font-bold text-deep">1.7 Fréquence cumulée</h3>
      <p className="text-muted">
        La fréquence cumulée F<sub>i</sub> est la <strong>somme progressive</strong> des fréquences (modalités
        ordonnées) :
      </p>
      <MathBlock tex="F_i = \sum_{k \leq i} f_k" />
      <FrequencyTable rows={ch1Distribution} caption="Fréquences et fréquences cumulées" />

      <h4 className="mt-6 font-semibold text-deep">Interprétation</h4>
      <p className="text-muted">
        Pour la note 14, F<sub>i</sub> = <strong>{fCumul14.toFixed(2)}</strong> (soit{' '}
        {(fCumul14 * 100).toFixed(0)} %) signifie :
      </p>
      <Callout variant="important" title="Lecture">
        <strong>{(fCumul14 * 100).toFixed(0)} %</strong> des étudiants ont une note <strong>≤ 14</strong>.
      </Callout>

      <StatsOgiveChart
        data={ch1OgiveData}
        title="Ogive — fréquences cumulées de la série"
        subtitle="Lire la proportion cumulée sur l’axe vertical"
      />

      <StatistiqueCh1Exercises />
    </>
  )
}
