import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  ExamUniform010Widget,
  ExponentialTailWidget,
  NormalDensityWidget,
  UniformLawWidget,
  ZScoreWidget,
} from '@/components/probabilites/ContinuousRVWidgets'
import { ProbabilitesCh8ContinuesExamExercises } from '@/components/probabilites/ProbabilitesCh8ContinuesExamExercises'

export function ProbabilitesVariablesContinuesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 8 — Variables aléatoires continues</strong> : fondamental pour la
          statistique, le machine learning et la modélisation du réel (temps, taille, température…).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">8.1 Idée intuitive</h3>
      <p className="text-muted">
        Une variable continue peut prendre une <strong>infinité de valeurs</strong> sur un intervalle (contrairement au
        discret : dé, pièces).
      </p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Temps d’attente, taille, poids, température, vitesse</li>
        <li>Exemple : X = temps du bus → 2,1 min, 2,12 min, 2,125 min…</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">8.2 Point important</h3>
      <Callout variant="important">
        Pour une variable continue : <strong>P(X = x) = 0</strong>. La probabilité d’une valeur exacte est nulle — on
        travaille avec des <strong>intervalles</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">8.3 Fonction de densité</h3>
      <p className="text-muted">
        La variable est décrite par une <strong>fonction de densité</strong> f(x). Ce n’est pas une probabilité, mais une
        « intensité » : la probabilité est l’<strong>aire sous la courbe</strong>.
      </p>
      <MathBlock tex="P(a \le X \le b) = \int_a^b f(x)\,dx" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.4 Propriétés de la densité</h3>
      <MathBlock tex="f(x) \ge 0 \quad\text{et}\quad \int_{-\infty}^{+\infty} f(x)\,dx = 1" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.5 Fonction de répartition</h3>
      <MathBlock tex="F(x) = P(X \le x)" />
      <p className="text-sm text-muted">F(x) donne la probabilité cumulée jusqu’à x.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.6 Espérance (cas continu)</h3>
      <MathBlock tex="E(X) = \int_{-\infty}^{+\infty} x\,f(x)\,dx" />
      <p className="text-sm text-muted">Moyenne théorique d’une variable continue.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.7 Variance (cas continu)</h3>
      <MathBlock tex="V(X) = \int (x - E(X))^2 f(x)\,dx" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.8 Loi uniforme continue</h3>
      <p className="text-muted">Répartition égale sur [a, b]. Notation X ~ U(a, b).</p>
      <MathBlock tex="f(x)=\frac{1}{b-a},\quad x\in[a,b]" />
      <UniformLawWidget initialA={0} initialB={10} initialLo={0} initialHi={10} />
      <p className="text-sm text-muted">Exemple : temps d’attente entre 0 et 10 minutes.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.9 Loi normale (très importante)</h3>
      <p className="text-muted">
        X ~ N(μ, σ²) : courbe en cloche, centrée en μ, dispersion contrôlée par σ.
      </p>
      <NormalDensityWidget initialMu={0} initialSigma={1} />

      <h3 className="mt-10 text-xl font-bold text-deep">8.10 Importance en IA</h3>
      <DataTable
        headers={['Domaine', 'Rôle de la normale']}
        rows={[
          ['Erreurs de modèles', 'Hypothèse de bruit gaussien'],
          ['Réseaux neuronaux', 'Initialisation des poids'],
          ['Données naturelles', 'Taille, poids, mesures'],
          ['Régression', 'Résidus souvent modélisés en N(μ, σ²)'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">8.11 Standardisation (Z-score)</h3>
      <MathBlock tex="Z = \frac{X - \mu}{\sigma} \sim \mathcal{N}(0, 1)" />
      <p className="text-sm text-muted">Permet de comparer et d’utiliser une table unique Φ(z) = P(Z ≤ z).</p>
      <ZScoreWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">8.12 Exercice type examen</h3>
      <Accordion title="X ~ U(0, 10) — calculer P(2 ≤ X ≤ 5)" defaultOpen>
        <p className="text-muted">Densité f(x) = 1/10 sur [0, 10].</p>
        <MathBlock tex="P(2 \le X \le 5) = \int_2^5 \frac{1}{10}\,dx = \frac{3}{10}" className="!my-2" />
        <ExamUniform010Widget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : P = 3/10 = 0,3
        </p>
      </Accordion>

      <ProbabilitesCh8ContinuesExamExercises />

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Variable continue = infinité de valeurs sur un intervalle</li>
          <li>✔ P(X = x) = 0 — probabilité = aire sous f</li>
          <li>✔ Densité f(x) ≥ 0, aire totale = 1</li>
          <li>✔ Loi normale = fondamentale en IA</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/loi-normale" className="font-semibold text-emerald-700 underline">
            Chapitre 9 — Loi normale (approfondie)
          </Link>
          , simulation Python ou exercices niveau concours.
        </p>
      </Callout>

      <h3 className="mt-8 text-lg font-bold text-deep">Loi exponentielle (aperçu)</h3>
      <p className="text-sm text-muted">Temps d’attente sans mémoire — très utilisée en fiabilité et files d’attente.</p>
      <ExponentialTailWidget initialLambda={2} initialA={1} />

      <QuizCard
        question="Pour une variable continue, P(X = 5) vaut…"
        options={[
          { id: 'a', label: '1', correct: false },
          { id: 'b', label: '0', correct: true },
          { id: 'c', label: 'f(5)', correct: false },
          { id: 'd', label: 'F(5)', correct: false },
        ]}
        explanation="Un point isolé a probabilité nulle ; seuls les intervalles ont une probabilité positive."
      />
    </>
  )
}
