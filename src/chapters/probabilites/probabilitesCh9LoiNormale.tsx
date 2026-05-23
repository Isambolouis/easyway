import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  NormalDensityWidget,
  NormalEmpiricalRuleWidget,
  ZScoreExample130Widget,
  ZScoreExam5070Widget,
  ZScoreWidget,
} from '@/components/probabilites/ContinuousRVWidgets'
import { normalSymmetricIntervalProb } from '@/components/probabilites/continuousLawsMath'
import { ProbabilitesCh9NormaleExamExercises } from '@/components/probabilites/ProbabilitesCh9NormaleExamExercises'

const p68 = normalSymmetricIntervalProb(1)

export function ProbabilitesLoiNormaleView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 9 — Loi normale</strong> : pilier de la statistique et du machine
          learning (courbe en cloche, Z-score, règle empirique).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">9.1 Idée intuitive</h3>
      <p className="text-muted">
        La <strong>loi normale</strong> modélise de nombreux phénomènes naturels et techniques.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Taille, erreurs de mesure, bruit en IA</li>
        <li>Scores, performances, features en machine learning</li>
      </ul>
      <Callout variant="important">Aussi appelée courbe en cloche (Gauss).</Callout>

      <p className="mt-4 text-muted">Notation :</p>
      <MathBlock tex="X \sim \mathcal{N}(\mu, \sigma^2)" />
      <p className="text-sm text-muted">
        μ = moyenne (centre) · σ = écart-type (dispersion). La variance est σ².
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">9.2 Densité de la loi normale</h3>
      <p className="text-muted font-medium">Formule fondamentale</p>
      <NormalDensityWidget initialMu={0} initialSigma={1} />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Maximum au centre μ</li>
        <li>Courbe symétrique, décroissante vers les extrémités</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">9.3 Propriétés importantes</h3>
      <MathBlock tex="f(\mu - x) = f(\mu + x) \quad \text{(symétrie)}" />
      <MathBlock tex="\int_{-\infty}^{+\infty} f(x)\,dx = 1" />
      <p className="text-muted font-medium">Règle empirique (68–95–99,7)</p>
      <NormalEmpiricalRuleWidget />
      <DataTable
        headers={['Intervalle', 'Probabilité approximative']}
        rows={[
          ['[μ − σ, μ + σ]', `≈ ${(p68 * 100).toFixed(1)} %`],
          ['[μ − 2σ, μ + 2σ]', '≈ 95 %'],
          ['[μ − 3σ, μ + 3σ]', '≈ 99,7 %'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">9.4 Loi normale centrée réduite</h3>
      <MathBlock tex="Z \sim \mathcal{N}(0, 1)" />
      <p className="text-muted font-medium">Transformation (très important)</p>
      <ZScoreWidget title="Transformation — Z = (X − μ) / σ" />
      <Callout variant="definition">
        On ramène toute loi normale à la même échelle : loi normale standard.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">9.5 Pourquoi la loi normale est cruciale en IA</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Bruit des données et erreurs de prédiction</li>
        <li>Initialisation des réseaux de neurones (Xavier, He…)</li>
        <li>Hypothèses statistiques et tests</li>
        <li>Détection d’anomalies (valeurs à |Z| &gt; 2 ou 3)</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">9.6 Exemple simple</h3>
      <p className="text-muted">X ~ N(100, 15²). Standardiser X = 130.</p>
      <MathBlock tex="Z = \frac{130 - 100}{15} = 2" />
      <ZScoreExample130Widget />

      <h3 className="mt-10 text-xl font-bold text-deep">9.7 Interprétation du Z-score</h3>
      <DataTable
        headers={['Z', 'Interprétation']}
        rows={[
          ['Z > 0', 'Au-dessus de la moyenne'],
          ['Z < 0', 'En dessous de la moyenne'],
          ['|Z| = 2', 'Valeur éloignée (~ 5 % de la masse au-delà)'],
          ['|Z| = 3', 'Très rare (~ 0,3 % au-delà)'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">9.8 Probabilité en loi normale</h3>
      <MathBlock tex="P(\mu - \sigma \le X \le \mu + \sigma) \approx 0{,}68" />
      <p className="text-sm text-muted">
        En IA : score d’un modèle, erreur de prédiction — on compare souvent à μ ± kσ.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">9.9 Exemple examen</h3>
      <Accordion title="X ~ N(50, 10²) — Z pour X = 70" defaultOpen>
        <MathBlock tex="Z = \frac{70 - 50}{10} = 2" className="!my-2" />
        <ZScoreExam5070Widget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : Z = 2
        </p>
      </Accordion>

      <ProbabilitesCh9NormaleExamExercises />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Loi normale = courbe en cloche, paramètres μ et σ</li>
          <li>✔ Z-score : Z = (X − μ) / σ ~ N(0, 1)</li>
          <li>✔ Règle 68–95–99,7 %</li>
          <li>✔ Fondamentale en IA et data science</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/chaines-markov" className="font-semibold text-emerald-700 underline">
            Chapitre 10 — Chaînes de Markov
          </Link>
          , exercices examen supplémentaires ou simulation Python (normale + Z-score).
        </p>
      </Callout>

      <QuizCard
        question="X ~ N(10, 4) signifie σ = 2. Z pour X = 14 vaut…"
        options={[
          { id: 'a', label: '0', correct: false },
          { id: 'b', label: '1', correct: false },
          { id: 'c', label: '2', correct: true },
          { id: 'd', label: '4', correct: false },
        ]}
        explanation="Z = (14 − 10) / 2 = 2. Attention : N(μ, σ²) donne la variance en second paramètre."
      />
    </>
  )
}
