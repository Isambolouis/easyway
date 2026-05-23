import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { CorrelationSummary } from '@/components/statistique/CorrelationSummary'
import { CovarianceTable } from '@/components/statistique/CovarianceTable'
import { StatistiqueCh7Exercises } from '@/components/statistique/StatistiqueCh7Exercises'
import { StatsScatterChart } from '@/components/statistique/StatsCharts'
import { bivariateStats, covarianceTable } from '@/components/statistique/statsMath'
import {
  CH7_STUDY_HOURS,
  CH7_STUDY_SCATTER,
  CH7_STUDY_X,
  CH7_STUDY_Y,
} from '@/data/statistiqueSampleData'

export function StatistiqueCorrelationView() {
  const study = bivariateStats(CH7_STUDY_X, CH7_STUDY_Y)
  const studyRows = covarianceTable(CH7_STUDY_X, CH7_STUDY_Y)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 7 — Corrélation et covariance</strong> : mesurer comment deux
          variables évoluent ensemble — pilier de l’analyse exploratoire, du machine learning et de l’IA.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Répondre à : évoluent-elles ensemble ? Dans quel sens ? Avec quelle intensité ?
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">7.1 Données bivariées</h3>
      <p className="text-muted">On observe deux variables sur les mêmes individus :</p>
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
      <Callout variant="definition" title="Question statistique">
        Est-ce que <strong>plus on étudie, plus la note augmente</strong> ?
      </Callout>

      <StatsScatterChart
        data={CH7_STUDY_SCATTER}
        xKey="heures"
        yKey="note"
        title="Nuage de points — heures d'étude vs note"
        subtitle="Points alignés en diagonale → corrélation positive forte"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.2 Covariance</h3>
      <MathBlock tex="\mathrm{Cov}(X,Y)=\frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})" />
      <ol className="list-decimal space-y-1 pl-5 text-muted">
        <li>Calculer x̄ et ȳ</li>
        <li>Écarts (xᵢ − x̄) et (yᵢ − ȳ)</li>
        <li>Multiplier les écarts</li>
        <li>Moyenne des produits</li>
      </ol>

      <p className="mt-4 text-sm text-muted">
        Moyennes : x̄ = <strong>3</strong>, ȳ = <strong>12</strong> (vérifié : {study.meanX}, {study.meanY}).
      </p>
      <CovarianceTable
        rows={studyRows}
        meanX={study.meanX}
        meanY={study.meanY}
        caption="Tableau des écarts — exemple du cours"
      />
      <MathBlock tex="\mathrm{Cov}(X,Y)=\frac{8+2+0+2+8}{5}=4" />
      <p className="text-sm text-muted">
        Calcul automatique : Cov = <strong>{study.cov.toFixed(2)}</strong>.
      </p>

      <Callout variant="resume" title="Interprétation">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Cov &gt; 0 → relation <strong>positive</strong></li>
          <li>Cov &lt; 0 → relation <strong>négative</strong></li>
          <li>Cov ≈ 0 → pas de relation linéaire</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">7.3 Limites de la covariance</h3>
      <Callout variant="important" title="Attention">
        La covariance dépend des <strong>unités</strong> (passer des mètres aux centimètres multiplie Cov par 10
        000). Il faut une mesure <strong>standardisée</strong> : la corrélation.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">7.4 Corrélation de Pearson</h3>
      <MathBlock tex="r=\frac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y}" />
      <MathBlock tex="-1 \le r \le 1" />
      <CorrelationSummary {...study} />
      <p className="text-sm text-muted">
        Avec σ_X ≈ {study.stdX.toFixed(2)} et σ_Y ≈ {study.stdY.toFixed(2)} : r = 4 / ({study.stdX.toFixed(2)} ×{' '}
        {study.stdY.toFixed(2)}) ≈ <strong>{study.r.toFixed(2)}</strong> → corrélation positive très forte.
      </p>

      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[300px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">r</th>
              <th className="px-4 py-2">Interprétation</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">1</td>
              <td className="px-4 py-2">Corrélation positive parfaite</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">0,7 à 0,9</td>
              <td className="px-4 py-2">Forte corrélation positive</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">0,3 à 0,6</td>
              <td className="px-4 py-2">Corrélation modérée</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">≈ 0</td>
              <td className="px-4 py-2">Pas de relation linéaire</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">−1</td>
              <td className="px-4 py-2">Corrélation négative parfaite</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">7.5 Types de corrélation</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-green-200 bg-green-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Positive</p>
          <p className="mt-1 text-muted">X ↑ → Y ↑ (heures d’étude, notes)</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Négative</p>
          <p className="mt-1 text-muted">X ↑ → Y ↓ (vitesse, temps de trajet)</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-bold text-deep">Nulle</p>
          <p className="mt-1 text-muted">Pas de lien linéaire (r ≈ 0)</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">7.6 Nuage de points (scatter plot)</h3>
      <p className="text-muted">
        Chaque point = un couple (X, Y). Points alignés → corrélation forte ; nuage dispersé → corrélation faible.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.7 Erreur fréquente</h3>
      <Callout variant="important" title="Corrélation ≠ causalité">
        <p className="text-sm">
          Exemple : ventes de glace ↑ et noyades ↑ en été. Ce n’est pas la glace qui cause les noyades — c’est la{' '}
          <strong>chaleur</strong> (variable cachée). En ML, toujours se méfier des corrélations spurieuses.
        </p>
      </Callout>

      <StatistiqueCh7Exercises />
    </>
  )
}
