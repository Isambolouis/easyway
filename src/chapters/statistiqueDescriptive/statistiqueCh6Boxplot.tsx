import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { BoxplotSummaryTable } from '@/components/statistique/BoxplotSummaryTable'
import { StatistiqueCh6Exercises } from '@/components/statistique/StatistiqueCh6Exercises'
import { StatsBoxPlot } from '@/components/statistique/StatsCharts'
import { boxplotStats } from '@/components/statistique/statsMath'
import { CH6_BOXPLOT_EX, CH6_OUTLIER_EX } from '@/data/statistiqueSampleData'

export function StatistiqueBoxplotView() {
  const main = boxplotStats(CH6_BOXPLOT_EX)
  const outlierEx = boxplotStats(CH6_OUTLIER_EX)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 6 — Boîte à moustaches (boxplot)</strong> : graphique essentiel en
          analyse exploratoire et en data science pour résumer une distribution en un coup d’œil.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Représenter une distribution avec <strong>5 valeurs clés</strong> : minimum, Q₁, médiane, Q₃, maximum — et
        repérer les valeurs aberrantes.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6.1 Définition</h3>
      <p className="text-muted">Le boxplot résume une série à travers :</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li><strong>Min</strong> — extrémité basse des moustaches</li>
        <li><strong>Q₁</strong> — 25 % des données en dessous</li>
        <li><strong>Médiane (Q₂)</strong> — 50 %</li>
        <li><strong>Q₃</strong> — 75 %</li>
        <li><strong>Max</strong> — extrémité haute des moustaches</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">6.2 Les 5 nombres clés</h3>
      <MathBlock tex="(\min,\; Q_1,\; Q_2,\; Q_3,\; \max)" />

      <h4 className="mt-6 font-semibold text-sky-800">Exemple</h4>
      <MathBlock tex="2,\; 4,\; 6,\; 8,\; 10,\; 12,\; 14,\; 16" />
      <p className="text-sm text-muted">
        Lecture pédagogique (rangs) : min = 2, Q₁ = 4, médiane = 8, Q₃ = 12, max = 16 → résumé{' '}
        <strong>(2, 4, 8, 12, 16)</strong>.
      </p>
      <BoxplotSummaryTable stats={main} caption="Cinq nombres — calcul interpolé" />
      <StatsBoxPlot stats={main} title="Boxplot — exemple du cours" subtitle="Distribution symétrique, pas d'outlier" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.3 Construction du boxplot</h3>
      <pre className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-slate-900 p-4 text-xs leading-relaxed text-sky-100">
{`min —— Q1 |────── MÉDIANE ──────| Q3 —— max
        └──── boîte (50 %) ────┘
        └──── moustaches ──────────┘`}
      </pre>
      <Callout variant="resume" title="Interprétation visuelle">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>La <strong>boîte</strong> contient 50 % des données (entre Q₁ et Q₃).</li>
          <li>Les <strong>moustaches</strong> montrent l’étendue des valeurs « normales ».</li>
          <li>Le trait indigo au centre = <strong>médiane</strong> (pas la moyenne).</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6.4 Intervalle interquartile (IQR)</h3>
      <MathBlock tex="\text{IQR} = Q_3 - Q_1" />
      <p className="text-muted">
        Sur l’exemple : IQR = 12 − 4 = <strong>8</strong> (calcul : {main.iqr.toFixed(1)}).
      </p>
      <Callout variant="definition" title="Interprétation">
        Petit IQR → données <strong>concentrées</strong> au centre. Grand IQR → <strong>dispersion</strong> forte dans
        la moitié centrale.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6.5 Valeurs aberrantes (outliers)</h3>
      <p className="text-muted">Valeurs très éloignées du reste — règle classique (Tukey) :</p>
      <MathBlock tex="\text{borne inf.} = Q_1 - 1{,}5 \times \text{IQR}" />
      <MathBlock tex="\text{borne sup.} = Q_3 + 1{,}5 \times \text{IQR}" />

      <h4 className="mt-6 font-semibold text-sky-800">Exemple numérique</h4>
      <p className="text-sm text-muted">Q₁ = 10, Q₃ = 20 → IQR = 10</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Borne inférieure = 10 − 15 = <strong>−5</strong></li>
        <li>Borne supérieure = 20 + 15 = <strong>35</strong></li>
      </ul>
      <p className="text-sm text-muted">Toute valeur &lt; −5 ou &gt; 35 est un <strong>outlier</strong>.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.6 Interprétation du boxplot</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">1. Centre</p>
          <p className="mt-1 text-muted">→ position de la médiane dans la boîte</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">2. Dispersion</p>
          <p className="mt-1 text-muted">→ largeur de la boîte (IQR)</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">3. Symétrie</p>
          <p className="mt-1 text-muted">→ médiane au milieu = symétrie ; décalée = asymétrie</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm">
          <p className="font-bold text-deep">4. Outliers</p>
          <p className="mt-1 text-muted">→ points orange isolés au-delà des moustaches</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">6.7 Exemple complet — outlier</h3>
      <MathBlock tex="1,\; 2,\; 3,\; 4,\; 5,\; 6,\; 7,\; 20" />
      <BoxplotSummaryTable stats={outlierEx} caption="Série avec valeur 20" showFences />
      <StatsBoxPlot
        stats={outlierEx}
        title="Boxplot — détection de l’outlier"
        subtitle={`${outlierEx.outliers.length} outlier(s) : ${outlierEx.outliers.join(', ')}`}
      />
      <Callout variant="important" title="Observation">
        <strong>20</strong> dépasse la borne supérieure ({outlierEx.upperFence.toFixed(1)}) → affiché comme{' '}
        <strong>valeur aberrante</strong>. Le cœur de la distribution reste entre 1 et 7.
      </Callout>

      <StatistiqueCh6Exercises />
    </>
  )
}
