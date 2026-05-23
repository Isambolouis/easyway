import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuartilesSummary } from '@/components/statistique/QuartilesSummary'
import { StatistiqueCh5Exercises } from '@/components/statistique/StatistiqueCh5Exercises'
import { decile, percentile, quartiles } from '@/components/statistique/statsMath'
import { StatsOgiveChart } from '@/components/statistique/StatsCharts'
import { buildDistribution } from '@/components/statistique/statsDistribution'
import {
  CH5_QUARTILES_EX,
  CH5_FULL_SERIES,
  CH5_DECILES_SERIES,
} from '@/data/statistiqueSampleData'

const ogiveFromValues = (values: number[]) =>
  buildDistribution(values).map((r) => ({
    label: String(r.value),
    cumul: r.frequenceCumulee,
  }))

export function StatistiquePositionView() {
  const qEx = quartiles(CH5_QUARTILES_EX)
  const qFull = quartiles(CH5_FULL_SERIES)
  const n8 = CH5_QUARTILES_EX.length
  const d1 = decile(CH5_DECILES_SERIES, 1)
  const d5 = decile(CH5_DECILES_SERIES, 5)
  const d9 = decile(CH5_DECILES_SERIES, 9)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 5 — Quartiles, déciles et percentiles</strong> : situer une
          valeur dans une distribution — la <strong>position relative</strong>, au-delà du centre (moyenne).
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Savoir lire et calculer où se place une observation par rapport aux autres (classements, examens, data
        science).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.1 Idée générale</h3>
      <p className="text-muted">On découpe une série <strong>ordonnée</strong> en parts égales :</p>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[280px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Mesure</th>
              <th className="px-4 py-2">Découpage</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Quartiles</td>
              <td className="px-4 py-2">4 parts</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Déciles</td>
              <td className="px-4 py-2">10 parts</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Percentiles</td>
              <td className="px-4 py-2">100 parts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">5.2 Quartiles</h3>
      <p className="text-muted">Les quartiles divisent la série en <strong>4 parties égales</strong> :</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>
          <strong>Q₁</strong> → 25 % des données en dessous
        </li>
        <li>
          <strong>Q₂</strong> → 50 % (médiane)
        </li>
        <li>
          <strong>Q₃</strong> → 75 % en dessous
        </li>
      </ul>

      <h4 className="mt-6 font-semibold text-sky-800">Exemple — série ordonnée</h4>
      <MathBlock tex="2,\; 4,\; 6,\; 8,\; 10,\; 12,\; 14,\; 16" />
      <p className="text-sm text-muted">
        Positions intuitives (n = {n8}) : Q₁ au rang n/4, Q₂ au rang n/2, Q₃ au rang 3n/4 — valeurs centrales aux
        rangs 2, 4 et 6 donnent <strong>4</strong>, <strong>8</strong> et <strong>12</strong>.
      </p>
      <MathBlock tex="Q_1 \approx \frac{n}{4},\quad Q_2 \approx \frac{n}{2},\quad Q_3 \approx \frac{3n}{4}" />
      <QuartilesSummary values={CH5_QUARTILES_EX} />
      <p className="text-sm text-muted">
        Calcul par interpolation linéaire (outil du cours) : Q₁ ≈ {qEx.q1.toFixed(1)}, Q₂ ≈ {qEx.q2.toFixed(1)}, Q₃ ≈{' '}
        {qEx.q3.toFixed(1)}.
      </p>

      <Callout variant="resume" title="Interprétation">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>25 % des valeurs ≤ Q₁</li>
          <li>50 % des valeurs ≤ Q₂</li>
          <li>75 % des valeurs ≤ Q₃</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.3 Déciles</h3>
      <p className="text-muted">Les déciles divisent la série en <strong>10 parties égales</strong>.</p>
      <MathBlock tex="D_k \quad \Leftrightarrow \quad P_{10k} \quad \text{(formule courante : position } \frac{k(n+1)}{10}\text{)}" />
      <MathBlock tex="1,\; 2,\; 3,\; \ldots,\; 10" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-center text-sm">
          <p className="text-xs font-bold text-sky-800">D₁</p>
          <p className="font-semibold text-deep">{d1}</p>
          <p className="text-xs text-muted">≈ 10 % en dessous</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-center text-sm">
          <p className="text-xs font-bold text-sky-800">D₅</p>
          <p className="font-semibold text-deep">{d5}</p>
          <p className="text-xs text-muted">médiane</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-center text-sm">
          <p className="text-xs font-bold text-sky-800">D₉</p>
          <p className="font-semibold text-deep">{d9}</p>
          <p className="text-xs text-muted">≈ 90 % en dessous</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">5.4 Percentiles</h3>
      <p className="text-muted">Les percentiles divisent la série en <strong>100 parties égales</strong>.</p>
      <MathBlock tex="P_k \quad \text{(}k\,\% \text{ des valeurs en dessous, position } \frac{k(n+1)}{100}\text{)}" />
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>
          <strong>P₅₀</strong> = médiane = Q₂
        </li>
        <li>
          <strong>P₂₅</strong> = Q₁
        </li>
        <li>
          <strong>P₉₀</strong> → 90 % des valeurs en dessous
        </li>
      </ul>
      <Callout variant="definition" title="Exemple — classement">
        Si tu es au <strong>percentile 80</strong>, tu es meilleur que 80 % des individus (20 % au-dessus de toi).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.5 Comparaison</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[320px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Mesure</th>
              <th className="px-4 py-2">Parts</th>
              <th className="px-4 py-2">Usage</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Quartiles</td>
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2">Analyse rapide, boxplot</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Déciles</td>
              <td className="px-4 py-2">10</td>
              <td className="px-4 py-2">Analyse plus fine</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Percentiles</td>
              <td className="px-4 py-2">100</td>
              <td className="px-4 py-2">Classements, examens</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">5.6 Exemple complet</h3>
      <MathBlock tex="3,\; 5,\; 7,\; 9,\; 11,\; 13,\; 15,\; 17,\; 19,\; 21" />
      <QuartilesSummary values={CH5_FULL_SERIES} />
      <p className="text-sm text-muted">
        Lecture pédagogique : Q₁ ≈ 5, Q₂ ≈ 11, Q₃ ≈ 17 — 25 % ≤ 5, 50 % ≤ 11, 75 % ≤ 17. Calcul interpolé : Q₁ ≈{' '}
        {qFull.q1.toFixed(1)}, Q₂ ≈ {qFull.q2.toFixed(1)}, Q₃ ≈ {qFull.q3.toFixed(1)}.
      </p>

      <StatsOgiveChart
        data={ogiveFromValues(CH5_FULL_SERIES)}
        title="Ogive — lecture des quartiles"
        subtitle="Lire Q₁, Q₂, Q₃ sur l’axe des fréquences cumulées"
      />

      <p className="text-sm text-muted">
        P₉₀ de cette série ≈ <strong>{percentile(CH5_FULL_SERIES, 90).toFixed(1)}</strong>.
      </p>

      <StatistiqueCh5Exercises />
    </>
  )
}
