import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { CentralTendencyChart } from '@/components/statistique/CentralTendencyChart'
import { StatistiqueCh3Exercises } from '@/components/statistique/StatistiqueCh3Exercises'
import { StatsSummary } from '@/components/statistique/StatsSummary'
import { mean, median, mode, meanWeighted } from '@/components/statistique/statsMath'
import {
  NOTES_SIMPLE,
  CH3_WEIGHTED_NOTES,
  CH3_MEDIAN_EVEN,
  CH3_MODE_SERIES,
  CH3_OUTLIER_SERIES,
} from '@/data/statistiqueSampleData'

export function StatistiqueTendanceView() {
  const mSimple = mean(NOTES_SIMPLE)
  const mWeighted = meanWeighted(CH3_WEIGHTED_NOTES)
  const medOdd = median(NOTES_SIMPLE)
  const medEven = median(CH3_MEDIAN_EVEN)
  const modMode = mode(CH3_MODE_SERIES)
  const mOut = mean(CH3_OUTLIER_SERIES)
  const medOut = median(CH3_OUTLIER_SERIES)
  const Nweighted = CH3_WEIGHTED_NOTES.reduce((s, p) => s + p.effectif, 0)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 3 — Moyenne, médiane et mode</strong> : résumer une série par une
          valeur représentative — les <strong>mesures de tendance centrale</strong>.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif du chapitre">
        Savoir choisir et calculer l’indicateur adapté pour décrire le « centre » d’un jeu de données.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.1 La moyenne arithmétique</h3>
      <p className="text-muted">
        La moyenne est la <strong>somme des valeurs divisée par le nombre total</strong> d’observations.
      </p>
      <MathBlock tex="\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i" />

      <h4 className="mt-6 font-semibold text-sky-800">Exemple 1 — données simples</h4>
      <MathBlock tex="10,\; 12,\; 14,\; 16,\; 18" />
      <MathBlock tex="\bar{x} = \frac{10 + 12 + 14 + 16 + 18}{5} = \frac{70}{5} = 14" />
      <Callout variant="resume" title="Lecture">
        La valeur moyenne de la série est <strong>14</strong>.
      </Callout>

      <h4 className="mt-8 font-semibold text-sky-800">Exemple 2 — avec effectifs</h4>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full max-w-xs">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Effectif</th>
            </tr>
          </thead>
          <tbody>
            {CH3_WEIGHTED_NOTES.map((r) => (
              <tr key={r.value} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{r.value}</td>
                <td className="px-4 py-2">{r.effectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MathBlock tex="\bar{x} = \frac{\sum n_i x_i}{\sum n_i}" />
      <MathBlock tex="\bar{x} = \frac{10\times 2 + 12\times 1 + 14\times 3}{6} = \frac{74}{6} \approx 12{,}33" />
      <p className="text-sm text-muted">
        Calcul vérifié : N = {Nweighted}, moyenne ≈ <strong>{mWeighted.toFixed(2)}</strong>.
      </p>
      <Callout variant="resume" title="Lecture">
        La note moyenne est environ <strong>12,33</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.2 La médiane</h3>
      <p className="text-muted">
        La médiane est la valeur qui <strong>partage la série ordonnée en deux parties égales</strong> : 50 % des
        valeurs en dessous, 50 % au-dessus.
      </p>

      <h4 className="mt-6 font-semibold text-sky-800">Cas 1 — série impaire (n = 5)</h4>
      <MathBlock tex="10,\; 12,\; 14,\; 16,\; 18" />
      <p className="text-muted">
        Valeur centrale = <strong>{medOdd}</strong> → médiane = <strong>{medOdd}</strong>.
      </p>

      <h4 className="mt-6 font-semibold text-sky-800">Cas 2 — série paire (n = 4)</h4>
      <MathBlock tex="10,\; 12,\; 14,\; 16" />
      <MathBlock tex="M_e = \frac{x_{n/2} + x_{n/2+1}}{2}" />
      <MathBlock tex="M_e = \frac{12 + 14}{2} = 13" />
      <p className="text-sm text-muted">
        Médiane calculée : <strong>{medEven}</strong>.
      </p>

      <Callout variant="definition" title="Lecture intuitive">
        La médiane est <strong>robuste aux valeurs extrêmes</strong> : si une observation devient 1000, la médiane
        change peu.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.3 Le mode</h3>
      <p className="text-muted">
        Le mode est la valeur <strong>la plus fréquente</strong> dans la série.
      </p>
      <MathBlock tex="2,\; 3,\; 3,\; 3,\; 4,\; 5" />
      <p className="text-muted">
        Mode = <strong>{modMode}</strong> (la valeur 3 apparaît trois fois).
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-sm">
          <p className="font-bold text-deep">Unimodal</p>
          <p className="mt-1 text-muted">Un seul mode (ex. ci-dessus).</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-sm">
          <p className="font-bold text-deep">Bimodal</p>
          <p className="mt-1 text-muted">Deux valeurs dominantes à égalité.</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-sm">
          <p className="font-bold text-deep">Amodal</p>
          <p className="mt-1 text-muted">Toutes les fréquences égales → pas de mode.</p>
        </div>
      </div>
      <Callout variant="resume" title="Lecture">
        Le mode représente la valeur la plus « populaire ».
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.4 Comparaison des trois mesures</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[320px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Mesure</th>
              <th className="px-4 py-2">Sens</th>
              <th className="px-4 py-2">Valeurs extrêmes</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Moyenne</td>
              <td className="px-4 py-2">Centre global</td>
              <td className="px-4 py-2">Très sensible</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Médiane</td>
              <td className="px-4 py-2">Centre positionnel</td>
              <td className="px-4 py-2">Peu sensible</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">Mode</td>
              <td className="px-4 py-2">Plus fréquent</td>
              <td className="px-4 py-2">Non sensible</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="mt-6 font-semibold text-sky-800">Exemple concret — valeur aberrante</h4>
      <MathBlock tex="10,\; 12,\; 14,\; 16,\; 100" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsSummary label="Moyenne" value={mOut.toFixed(1)} />
        <StatsSummary label="Médiane" value={String(medOut)} />
        <StatsSummary label="Moyenne (série symétrique)" value={mSimple.toFixed(0)} />
      </div>

      <CentralTendencyChart
        values={CH3_OUTLIER_SERIES}
        title="Série avec outlier (100)"
        subtitle="La moyenne est tirée vers le haut ; la médiane reste 14"
      />

      <Callout variant="important" title="Conclusion">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            La <strong>moyenne</strong> ({mOut.toFixed(1)}) est <strong>tirée vers le haut</strong> par 100.
          </li>
          <li>
            La <strong>médiane</strong> ({medOut}) reste <strong>stable</strong>.
          </li>
          <li>
            Pour des revenus ou des notes avec outliers, préférer souvent la médiane pour « le centre typique ».
          </li>
        </ul>
      </Callout>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatsSummary label="Ex. symétrique — x̄" value={mSimple.toFixed(0)} />
        <StatsSummary label="Médiane" value={String(medOdd)} />
        <StatsSummary label="Mode (10…18)" value="aucun" />
      </div>

      <StatistiqueCh3Exercises />
    </>
  )
}
