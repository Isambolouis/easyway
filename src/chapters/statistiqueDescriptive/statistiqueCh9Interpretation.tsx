import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { AnalysisWorkflow } from '@/components/statistique/AnalysisWorkflow'
import { ClassDispersionCompare } from '@/components/statistique/ClassDispersionCompare'
import { CorrelationSummary } from '@/components/statistique/CorrelationSummary'
import { StatistiqueCh9Exercises } from '@/components/statistique/StatistiqueCh9Exercises'
import { GroupedSeriesTable } from '@/components/statistique/GroupedSeriesTable'
import { StatsScatterChart, StatsHistogram } from '@/components/statistique/StatsCharts'
import { bivariateStats } from '@/components/statistique/statsMath'
import { buildGroupedSeries } from '@/components/statistique/groupedSeries'
import {
  CH7_STUDY_HOURS,
  CH7_STUDY_SCATTER,
  CH7_STUDY_X,
  CH7_STUDY_Y,
  CH8_CLASS_DEFS,
  CH9_CLASS_A,
  CH9_CLASS_B,
  CH9_TREND,
} from '@/data/statistiqueSampleData'

const studyStats = bivariateStats(CH7_STUDY_X, CH7_STUDY_Y)
const distRows = buildGroupedSeries(
  [2, 8, 12, 15, 18, 22, 25, 28, 14, 16, 19, 21, 24, 11, 13, 17],
  CH8_CLASS_DEFS,
)

export function StatistiqueInterpretationView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 9 — Analyse et interprétation des données</strong> : passer du
          calcul à la <strong>compréhension</strong> et à la <strong>décision</strong>, comme en data science.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Analyser une série complète, interpréter moyenne, dispersion, corrélation et distribution — et formuler des
        conclusions argumentées.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.1 Démarche d’analyse statistique</h3>
      <AnalysisWorkflow />

      <h3 className="mt-10 text-xl font-bold text-deep">9.2 Lecture d’une série — notes et heures d’étude</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[280px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Étudiant</th>
              <th className="px-4 py-2">Heures (X)</th>
              <th className="px-4 py-2">Note (Y)</th>
            </tr>
          </thead>
          <tbody>
            {CH7_STUDY_HOURS.map((row) => (
              <tr key={row.etudiant} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{row.etudiant}</td>
                <td className="px-4 py-2">{row.heures}</td>
                <td className="px-4 py-2">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MathBlock tex="\bar{y} = \frac{8+10+12+14+16}{5} = 12" />
      <Callout variant="resume" title="Interprétation">
        La classe affiche un <strong>niveau moyen de 12/20</strong> sur cet échantillon.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.3 Analyse de la dispersion</h3>
      <p className="text-muted">Même moyenne ≈ 12, comportements très différents :</p>
      <ClassDispersionCompare
        labelA="Classe A"
        valuesA={CH9_CLASS_A}
        labelB="Classe B"
        valuesB={CH9_CLASS_B}
      />
      <Callout variant="important" title="Conclusion">
        Classe A <strong>homogène</strong> (σ faible) · Classe B <strong>hétérogène</strong> (σ élevé).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.4 Interprétation de σ</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-md">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">σ</th>
              <th className="px-4 py-2">Lecture</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Faible</td>
              <td className="px-4 py-2">Données stables, homogènes</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Moyen</td>
              <td className="px-4 py-2">Dispersion normale</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Élevé</td>
              <td className="px-4 py-2">Instabilité, écarts importants</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">
        Ex. σ ≈ 0,89 (classe A) vs σ ≈ 5,10 (classe B) sur les séries ci-dessus.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">9.5 Analyse de la corrélation</h3>
      <StatsScatterChart
        data={CH7_STUDY_SCATTER}
        xKey="heures"
        yKey="note"
        title="Heures d'étude vs notes"
        subtitle="Tendance positive claire"
      />
      <CorrelationSummary {...studyStats} />
      <Callout variant="resume" title="Interprétation">
        <strong>Corrélation positive forte</strong> : plus on étudie, meilleure est la note (r ≈ {studyStats.r.toFixed(2)}).
      </Callout>
      <Callout variant="important" title="Corrélation ≠ causalité">
        Ventes de glace et noyades augmentent en été — la <strong>chaleur</strong> est la cause commune. Toujours
        chercher le contexte et les variables cachées.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.6 Analyse d’une distribution (série groupée)</h3>
      <p className="text-sm text-muted">Répartition illustrative (effectifs par classe) :</p>
      <GroupedSeriesTable rows={distRows} caption="Distribution des scores" showDensity={false} />
      <StatsHistogram
        data={distRows.map((r) => ({ label: r.label, count: r.effectif }))}
        title="Histogramme des effectifs"
        subtitle="Majorité dans la tranche centrale"
      />
      <Callout variant="definition" title="Lecture">
        Concentration autour de la zone centrale (10–30) — distribution globalement centrée, queue possible selon
        les extrêmes.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.7 Détection de tendances</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-xs">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Temps</th>
              <th className="px-4 py-2">Valeur</th>
            </tr>
          </thead>
          <tbody>
            {CH9_TREND.map((r) => (
              <tr key={r.t} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.t}</td>
                <td className="px-4 py-2">{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted">
        Valeurs 5 → 7 → 9 : <strong>tendance croissante</strong>. À distinguer d’une corrélation entre deux
        variables différentes.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">9.8 Prise de décision</h3>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 text-sm text-muted">
        <p className="font-bold text-deep">Exemple entreprise — ventes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Moyenne élevée → produit performant en volume</li>
          <li>Variance élevée → marché instable, risque</li>
          <li>Corrélation forte (pub / prix) → levier d’action identifié</li>
        </ul>
      </div>
      <Callout variant="resume" title="Rôle de la statistique">
        Comprendre · prédire (avec prudence) · <strong>décider</strong> en s’appuyant sur des faits chiffrés.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.9 Erreurs d’interprétation</h3>
      <ul className="list-disc space-y-2 pl-5 text-muted">
        <li>Confondre <strong>moyenne</strong> et <strong>médiane</strong> (surtout si asymétrie)</li>
        <li>Croire que <strong>corrélation = causalité</strong></li>
        <li>Ignorer les <strong>valeurs extrêmes</strong> et outliers</li>
        <li>Interpréter <strong>sans contexte</strong> métier (secteur, période, population)</li>
      </ul>

      <StatistiqueCh9Exercises />
    </>
  )
}
