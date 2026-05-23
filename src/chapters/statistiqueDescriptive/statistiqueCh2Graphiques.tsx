import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { StatistiqueCh2Exercises } from '@/components/statistique/StatistiqueCh2Exercises'
import { pieSliceAngles } from '@/components/statistique/pieAngles'
import {
  StatsBarChart,
  StatsHistogram,
  StatsOgiveChart,
  StatsPieChart,
  StatsScatterChart,
} from '@/components/statistique/StatsCharts'
import {
  CH2_BAR_NOTES,
  CH2_HIST_CLASSES,
  CH2_OGIVE,
  CH2_PIE_ABC,
  CH2_SCATTER_TAILLE_POIDS,
} from '@/data/statistiqueSampleData'

const pieAngles = pieSliceAngles(CH2_PIE_ABC)

export function StatistiqueGraphiquesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 2 — Représentations graphiques</strong> : transformer des tableaux
          en visualisations pour comprendre les tendances, comparer et repérer les anomalies.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Comprendre rapidement les tendances</li>
          <li>Comparer des valeurs</li>
          <li>Détecter des anomalies</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.1 Diagramme en bâtons</h3>
      <p className="text-muted">
        Un diagramme en bâtons représente des <strong>valeurs discrètes</strong> avec des barres{' '}
        <strong>séparées</strong> (une barre par modalité).
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[200px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Effectif</th>
            </tr>
          </thead>
          <tbody>
            {CH2_BAR_NOTES.map((r) => (
              <tr key={r.note} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{r.note}</td>
                <td className="px-4 py-2">{r.effectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsBarChart
        data={CH2_BAR_NOTES}
        xKey="note"
        yKey="effectif"
        title="Diagramme en bâtons — notes"
        subtitle="Barre la plus haute → modalité la plus fréquente"
      />

      <Callout variant="resume" title="Lecture & interprétation">
        <p className="text-sm">
          La barre la plus haute correspond à la note <strong>14</strong> (effectif 5) → c’est la note{' '}
          <strong>dominante</strong>. Ce graphique permet de voir rapidement la forme de la distribution.
        </p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.2 Histogramme</h3>
      <p className="text-muted">
        L’histogramme représente des données <strong>continues groupées en classes</strong> : les barres se{' '}
        <strong>touchent</strong>.
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Classe</th>
              <th className="px-4 py-2">Effectif</th>
            </tr>
          </thead>
          <tbody>
            {CH2_HIST_CLASSES.map((r) => (
              <tr key={r.classe} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{r.classe}</td>
                <td className="px-4 py-2">{r.effectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsHistogram
        data={CH2_HIST_CLASSES.map((r) => ({ label: r.classe, count: r.effectif }))}
        title="Histogramme — classes d’amplitude égale"
        subtitle="Classe 10–20 la plus représentée"
      />

      <Callout variant="important" title="Différence importante">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Diagramme en bâtons</strong> → données <strong>discrètes</strong>
          </li>
          <li>
            <strong>Histogramme</strong> → données <strong>continues</strong> par classes
          </li>
        </ul>
      </Callout>

      <p className="mt-4 text-muted">Hauteur des barres :</p>
      <MathBlock tex="\text{Hauteur} = \text{effectif} \quad \text{(classes de même largeur)}" />
      <MathBlock tex="\text{Hauteur} = \frac{\text{effectif}}{\text{amplitude}} \quad \text{(classes de largeurs différentes)}" />
      <Callout variant="definition" title="Lecture">
        L’<strong>aire</strong> d’une barre représente la quantité de données dans la classe.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.3 Diagramme circulaire (camembert)</h3>
      <p className="text-muted">
        Représentation en <strong>parts d’un cercle</strong> — adapté aux variables qualitatives à peu de
        modalités.
      </p>
      <MathBlock tex="\text{Angle} = \frac{n_i}{N} \times 360^\circ" />

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <StatsPieChart data={CH2_PIE_ABC} title="Camembert — catégories A, B, C" subtitle="N = 60" />
        <div className="scroll-x-card overflow-x-auto rounded-xl border border-sky-200 bg-white p-4 text-sm shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase text-sky-900">Calcul des angles</p>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold uppercase text-muted">
                <th className="py-1">Cat.</th>
                <th className="py-1">nᵢ</th>
                <th className="py-1">Angle</th>
              </tr>
            </thead>
            <tbody>
              {pieAngles.map((row) => (
                <tr key={row.name} className="border-t border-slate-100">
                  <td className="py-1.5 font-medium">{row.name}</td>
                  <td className="py-1.5">{row.effectif}</td>
                  <td className="py-1.5">{row.angleDeg.toFixed(0)}°</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted">Ex. A : (10/60) × 360 = 60° · B : 120° · C : 180°</p>
        </div>
      </div>

      <Callout variant="resume" title="Lecture">
        Plus la part est grande, plus la catégorie est importante — ici <strong>C</strong> (180°) est majoritaire.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.4 Courbe des fréquences cumulées (ogive)</h3>
      <p className="text-muted">
        Courbe reliant les <strong>fréquences cumulées</strong> F<sub>i</sub> (voir chapitre 1).
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Valeur</th>
              <th className="px-4 py-2">Fᵢ</th>
            </tr>
          </thead>
          <tbody>
            {CH2_OGIVE.map((r) => (
              <tr key={r.label} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{r.label}</td>
                <td className="px-4 py-2">{r.cumul.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsOgiveChart
        data={CH2_OGIVE}
        title="Ogive — fréquences cumulées"
        subtitle="Ex. F(14) = 0,6 → 60 % des données ≤ 14"
      />

      <Callout variant="important" title="Interprétation">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Lecture des <strong>médianes</strong> et <strong>quartiles</strong> sur l’axe vertical</li>
          <li>« x % des données sont inférieures à une valeur donnée »</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.5 Nuage de points (aperçu)</h3>
      <p className="text-muted">
        Représente la relation entre <strong>deux variables quantitatives</strong> — approfondi au chapitre 7
        (corrélation).
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-xs">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Taille (cm)</th>
              <th className="px-4 py-2">Poids (kg)</th>
            </tr>
          </thead>
          <tbody>
            {CH2_SCATTER_TAILLE_POIDS.map((r, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.taille}</td>
                <td className="px-4 py-2">{r.poids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsScatterChart
        data={CH2_SCATTER_TAILLE_POIDS}
        xKey="taille"
        yKey="poids"
        title="Nuage de points — taille vs poids"
        subtitle="Tendance ascendante → corrélation positive"
      />

      <Callout variant="resume" title="Lecture du nuage">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Tendance <strong>ascendante</strong> → corrélation positive</li>
          <li>Tendance <strong>descendante</strong> → corrélation négative</li>
          <li>Points dispersés sans forme → faible lien linéaire</li>
        </ul>
      </Callout>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Bâtons vs histogramme</p>
          <p className="mt-2 text-muted">
            Bâtons : barres <strong>séparées</strong>, valeurs isolées. Histogramme : barres{' '}
            <strong>jointives</strong>, classes continues.
          </p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Quand utiliser quoi ?</p>
          <p className="mt-2 text-muted">
            Notes entières → bâtons. Températures par tranches → histogramme. Sexe, région → camembert. Position
            (médiane) → ogive.
          </p>
        </div>
      </div>

      <StatistiqueCh2Exercises />
    </>
  )
}
