import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { Link } from 'react-router-dom'
import { CorrelationSummary } from '@/components/statistique/CorrelationSummary'
import { CourseMasteryChecklist } from '@/components/statistique/CourseMasteryChecklist'
import { DataPrepWorkflow } from '@/components/statistique/DataPrepWorkflow'
import { StatistiqueCh10Exercises } from '@/components/statistique/StatistiqueCh10Exercises'
import {
  StatsBarChart,
  StatsBoxPlot,
  StatsLineChart,
  StatsScatterChart,
} from '@/components/statistique/StatsCharts'
import { StatsSummary } from '@/components/statistique/StatsSummary'
import { bivariateStats, boxplotStats, mean, stdPop } from '@/components/statistique/statsMath'
import {
  CH10_CLIENTS,
  CH10_CLIENT_SCATTER,
  CH10_GDP,
  CH10_GDP_PER_CAPITA,
  CH10_IA_STUDY,
  CH10_IA_X,
  CH10_IA_Y,
  CH10_STORE_SALES,
} from '@/data/statistiqueSampleData'

const revenus = CH10_CLIENTS.map((c) => c.revenu)
const meanRevenu = mean(revenus)
const clientBivar = bivariateStats(
  CH10_CLIENTS.map((c) => c.revenu),
  CH10_CLIENTS.map((c) => c.depenses),
)
const iaStats = bivariateStats(CH10_IA_X, CH10_IA_Y)
const ventes = CH10_STORE_SALES.map((d) => d.ventes)
const meanVentes = mean(ventes)
const stdVentes = stdPop(ventes)
const gdpPib = CH10_GDP.map((g) => g.pib)
const gdpBox = boxplotStats(CH10_GDP_PER_CAPITA)

export function StatistiqueApplicationsView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 10 — Applications pratiques</strong> : la statistique descriptive
          comme <strong>outil de décision</strong> en data science, en économie et en intelligence artificielle.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Analyser des données réelles, comprendre des phénomènes économiques et{' '}
        <strong>préparer des modèles d’IA</strong> — au-delà du calcul, vers la prédiction et l’action.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">10.1 Statistique et data science</h3>
      <p className="text-muted">
        La statistique descriptive est la <strong>première étape</strong> de toute analyse de données. On l’appelle
        l’<strong>analyse exploratoire des données (EDA)</strong> : décrire avant de modéliser.
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[360px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Âge</th>
              <th className="px-4 py-2">Revenu</th>
              <th className="px-4 py-2">Dépenses</th>
            </tr>
          </thead>
          <tbody>
            {CH10_CLIENTS.map((c) => (
              <tr key={c.client} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{c.client}</td>
                <td className="px-4 py-2">{c.age}</td>
                <td className="px-4 py-2">{c.revenu}</td>
                <td className="px-4 py-2">{c.depenses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-4 grid gap-3 sm:grid-cols-3">
        <StatsSummary label="Moyenne revenu" value={meanRevenu.toFixed(0)} />
        <StatsSummary label="σ revenu" value={stdPop(revenus).toFixed(0)} />
        <StatsSummary label="r (revenu, dépenses)" value={clientBivar.r.toFixed(2)} />
      </div>
      <MathBlock tex={`\\bar{x} = \\frac{300+500+800+1200}{4} = ${meanRevenu}`} />
      <Callout variant="resume" title="Interprétation">
        Profil client moyen avec <strong>revenu modéré</strong> sur cet échantillon ; dépenses fortement liées au
        revenu (r ≈ {clientBivar.r.toFixed(2)}).
      </Callout>

      <StatsScatterChart
        data={CH10_CLIENT_SCATTER}
        xKey="revenu"
        yKey="depenses"
        title="Revenu vs dépenses — EDA"
        subtitle="Relation positive : clients plus aisés dépensent plus"
      />

      <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 text-sm text-muted">
        <p className="font-bold text-deep">Usage en data science</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>Moyenne</strong> → centre des données (segmentation, benchmarks)
          </li>
          <li>
            <strong>Variance / σ</strong> → stabilité, détection d’anomalies
          </li>
          <li>
            <strong>Corrélation</strong> → variables liées, choix de features
          </li>
        </ul>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">10.2 Statistique en économie</h3>
      <p className="text-muted">
        Croissance, inflation, revenus, inégalités : la statistique descriptive résume et compare des
        phénomènes macroéconomiques.
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Pays</th>
              <th className="px-4 py-2">PIB</th>
              <th className="px-4 py-2">Population (M)</th>
              <th className="px-4 py-2">PIB / hab.</th>
            </tr>
          </thead>
          <tbody>
            {CH10_GDP.map((g) => (
              <tr key={g.pays} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{g.pays}</td>
                <td className="px-4 py-2">{g.pib}</td>
                <td className="px-4 py-2">{g.population}</td>
                <td className="px-4 py-2 font-semibold text-deep">{g.pibParHabitant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MathBlock tex="\text{PIB/habitant} = \dfrac{\text{PIB}}{\text{Population}}" />
      <Callout variant="resume" title="Interprétation">
        Permet de <strong>comparer les pays</strong> à population égale en niveau de vie — le PIB brut seul peut
        tromper si la population diffère fortement.
      </Callout>

      <div className="my-4 grid gap-3 sm:grid-cols-2">
        <StatsSummary label="Moyenne PIB (échantillon)" value={mean(gdpPib).toFixed(0)} />
        <StatsSummary label="σ PIB" value={stdPop(gdpPib).toFixed(0)} />
      </div>
      <p className="text-sm text-muted">
        Ici PIB/habitant = 100 pour chaque pays : même niveau relatif malgré des PIB totaux différents. En pratique,
        on compare aussi les <strong>dispersions</strong> du PIB/hab. entre pays.
      </p>
      <StatsBoxPlot
        stats={gdpBox}
        title="PIB/habitant — disparités (données fictives)"
        subtitle="Boxplot pour visualiser médiane, étendue et outliers"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">10.3 Statistique et intelligence artificielle</h3>
      <p className="text-muted">
        L’IA s’appuie sur la statistique pour <strong>apprendre</strong>, détecter des <strong>patterns</strong> et{' '}
        <strong>prédire</strong>.
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-xs">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Heures</th>
              <th className="px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {CH10_IA_STUDY.map((r) => (
              <tr key={r.heures} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.heures}</td>
                <td className="px-4 py-2">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsScatterChart
        data={CH10_IA_STUDY.map((d) => ({ heures: d.heures, note: d.note }))}
        xKey="heures"
        yKey="note"
        title="Prédiction de notes — relation linéaire"
        subtitle="Corrélation positive forte → régression linéaire possible"
      />
      <CorrelationSummary {...iaStats} />
      <MathBlock tex="\text{Note} \approx a \cdot (\text{heures}) + b" />
      <Callout variant="definition" title="Idée IA">
        Un modèle linéaire simple estime <em>a</em> et <em>b</em> à partir des données — la statistique descriptive
        (r, Cov) justifie qu’une telle hypothèse est pertinente ici (r = {iaStats.r.toFixed(2)}).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">10.4 Préparation des données pour l’IA</h3>
      <p className="text-muted">Avant d’entraîner un modèle, quatre étapes statistiques courantes :</p>
      <DataPrepWorkflow />
      <MathBlock tex="z = \frac{x - \mu}{\sigma}" />
      <Callout variant="resume" title="Utilité de la normalisation">
        Rend les variables <strong>comparables</strong> (échelles différentes) et améliore souvent la convergence des
        algorithmes (réseaux de neurones, k-means, etc.).
      </Callout>
      <p className="text-sm text-muted">
        Voir aussi le chapitre bonus{' '}
        <Link to="/cours/statistique-descriptive/bonus-standardisation" className="font-semibold text-sky-700 underline">
          Z-score et standardisation
        </Link>
        .
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">10.5 Cas pratique — analyse d’un magasin</h3>
      <StatsBarChart
        data={CH10_STORE_SALES}
        xKey="jour"
        yKey="ventes"
        title="Ventes par jour"
        subtitle={`Moyenne ≈ ${meanVentes} · pic vendredi`}
      />
      <StatsLineChart
        data={CH10_STORE_SALES}
        xKey="jour"
        yKey="ventes"
        title="Tendance des ventes"
        subtitle="Progression globale avec variation en milieu de semaine"
      />
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        <StatsSummary label="Moyenne" value={`${meanVentes} ventes/j`} />
        <StatsSummary label="σ" value={stdVentes.toFixed(1)} />
      </div>
      <Callout variant="resume" title="Conclusion magasin">
        Activité <strong>saine</strong> (moyenne 140) avec <strong>variations</strong> (σ ≈ {stdVentes.toFixed(0)}) et{' '}
        <strong>pic le vendredi</strong> — utile pour stocks et staffing.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">10.6 Erreurs dans l’analyse réelle</h3>
      <ul className="list-disc space-y-2 pl-5 text-muted">
        <li>Analyser sans <strong>nettoyer</strong> les données</li>
        <li>Ignorer les <strong>valeurs extrêmes</strong></li>
        <li>Interpréter <strong>sans contexte</strong> métier</li>
        <li>Confondre <strong>corrélation et causalité</strong></li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">10.7 Statistique = base de l’IA moderne</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          'Recommandation (Netflix, YouTube)',
          'Détection de fraude bancaire',
          'Reconnaissance d’images',
          'Prédiction de prix',
        ].map((app) => (
          <div key={app} className="rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm font-medium text-violet-900">
            {app}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        Dans tous ces cas : EDA (moyennes, dispersions, corrélations, graphiques) puis modèles plus complexes.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">Conclusion du cours complet</h3>
      <p className="text-muted">Tu maîtrises maintenant les fondations de la statistique descriptive :</p>
      <CourseMasteryChecklist />

      <Callout variant="important" title="Suite logique">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Examen final</strong> (chapitres 1 à 10) — synthèse universitaire
          </li>
          <li>
            <Link
              to="/cours/statistique-descriptive/projet-performances-classe"
              className="font-semibold text-sky-700 underline"
            >
              Projet data science — performances d&apos;une classe
            </Link>
          </li>
          <li>
            Cours{' '}
            <Link to="/cours/probabilites" className="font-semibold text-sky-700 underline">
              Probabilités
            </Link>{' '}
            → statistique <strong>inférentielle</strong> et lois
          </li>
        </ul>
      </Callout>

      <StatistiqueCh10Exercises />
    </>
  )
}
