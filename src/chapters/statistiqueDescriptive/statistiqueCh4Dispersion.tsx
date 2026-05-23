import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { DeviationTable } from '@/components/statistique/DeviationTable'
import { DispersionCompareCard } from '@/components/statistique/DispersionCompareCard'
import { StatistiqueCh4Exercises } from '@/components/statistique/StatistiqueCh4Exercises'
import { StatsSummary } from '@/components/statistique/StatsSummary'
import {
  deviationTable,
  mean,
  meanWeighted,
  stdPop,
  stdWeighted,
  variancePop,
  varianceWeighted,
} from '@/components/statistique/statsMath'
import {
  CH4_SERIES_A,
  CH4_SERIES_B,
  CH4_VARIANCE_EX,
  CH4_SALARY_LOW,
  CH4_SALARY_HIGH,
  CH3_WEIGHTED_NOTES,
} from '@/data/statistiqueSampleData'

export function StatistiqueDispersionView() {
  const exRows = deviationTable(CH4_VARIANCE_EX)
  const exMean = mean(CH4_VARIANCE_EX)
  const exVar = variancePop(CH4_VARIANCE_EX)
  const exStd = stdPop(CH4_VARIANCE_EX)

  const mA = mean(CH4_SERIES_A)
  const mB = mean(CH4_SERIES_B)

  const wMean = meanWeighted(CH3_WEIGHTED_NOTES)
  const wVar = varianceWeighted(CH3_WEIGHTED_NOTES)
  const wStd = stdWeighted(CH3_WEIGHTED_NOTES)

  const salLowStd = stdPop(CH4_SALARY_LOW)
  const salHighStd = stdPop(CH4_SALARY_HIGH)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 4 — Variance et écart-type</strong> : mesurer la{' '}
          <strong>dispersion</strong> — savoir si les données sont proches ou éloignées de la moyenne.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Compléter la tendance centrale (ch. 3) : deux séries peuvent avoir la même moyenne mais une dispersion
        très différente.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.1 Idée de la dispersion</h3>
      <div className="mt-4 grid gap-4 text-sm text-muted lg:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="font-bold text-deep">Série A</p>
          <p>9, 10, 10, 11, 10 → x̄ = {mA.toFixed(0)}</p>
          <p className="mt-1 text-sky-800">Stable, faible dispersion</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="font-bold text-deep">Série B</p>
          <p>0, 10, 20, 10, 10 → x̄ = {mB.toFixed(0)}</p>
          <p className="mt-1 text-sky-800">Très dispersée autour de 10</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DispersionCompareCard label="A" values={CH4_SERIES_A} />
        <DispersionCompareCard label="B" values={CH4_SERIES_B} />
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">4.2 La variance</h3>
      <p className="text-muted">
        La variance mesure l’écart moyen <strong>au carré</strong> par rapport à la moyenne.
      </p>
      <MathBlock tex="\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2" />

      <h4 className="mt-6 font-semibold text-sky-800">Étapes de calcul</h4>
      <ol className="list-decimal space-y-1 pl-5 text-muted">
        <li>Calculer la moyenne x̄</li>
        <li>Soustraire chaque valeur : xᵢ − x̄</li>
        <li>Élever au carré : (xᵢ − x̄)²</li>
        <li>Faire la moyenne des carrés</li>
      </ol>

      <h4 className="mt-8 font-semibold text-sky-800">Exemple complet — 2, 4, 6, 8</h4>
      <MathBlock tex="\bar{x} = \frac{2+4+6+8}{4} = 5" />
      <DeviationTable rows={exRows} mean={exMean} caption="Écarts à la moyenne" />
      <MathBlock tex="\sigma^2 = \frac{9+1+1+9}{4} = \frac{20}{4} = 5" />
      <p className="text-sm text-muted">
        Vérification : σ² = <strong>{exVar}</strong>.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.3 Écart-type</h3>
      <p className="text-muted">Racine carrée de la variance — même unité que les données.</p>
      <MathBlock tex="\sigma = \sqrt{\sigma^2}" />
      <MathBlock tex="\sigma = \sqrt{5} \approx 2{,}236" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsSummary label="Variance" value={String(exVar)} />
        <StatsSummary label="Écart-type" value={exStd.toFixed(3)} />
        <StatsSummary label="Moyenne" value={String(exMean)} />
      </div>
      <Callout variant="resume" title="Interprétation">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Petit σ</strong> → données proches de la moyenne
          </li>
          <li>
            <strong>Grand σ</strong> → données très dispersées
          </li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.4 Interprétation statistique</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[240px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Situation</th>
              <th className="px-4 py-2">Interprétation</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">σ faible</td>
              <td className="px-4 py-2">Données homogènes</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">σ élevé</td>
              <td className="px-4 py-2">Données hétérogènes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="mt-6 font-semibold text-sky-800">Exemple concret — salaires</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Salaires A</p>
          <p className="text-muted">1000, 1020, 980, 1005</p>
          <p className="mt-2 font-semibold text-green-800">σ ≈ {salLowStd.toFixed(1)} — faible dispersion</p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-4 text-sm">
          <p className="font-bold text-deep">Salaires B</p>
          <p className="text-muted">200, 1000, 3000, 500</p>
          <p className="mt-2 font-semibold text-orange-800">σ ≈ {salHighStd.toFixed(0)} — forte dispersion</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">4.5 Cas avec effectifs</h3>
      <MathBlock tex="\sigma^2 = \frac{\sum n_i(x_i - \bar{x})^2}{\sum n_i}" />
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-xs">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">xᵢ</th>
              <th className="px-4 py-2">nᵢ</th>
            </tr>
          </thead>
          <tbody>
            {CH3_WEIGHTED_NOTES.map((r) => (
              <tr key={r.value} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.value}</td>
                <td className="px-4 py-2">{r.effectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">
        Moyenne x̄ ≈ <strong>{wMean.toFixed(2)}</strong> · σ² ≈ <strong>{wVar.toFixed(2)}</strong> · σ ≈{' '}
        <strong>{wStd.toFixed(2)}</strong>
      </p>

      <StatistiqueCh4Exercises />
    </>
  )
}
