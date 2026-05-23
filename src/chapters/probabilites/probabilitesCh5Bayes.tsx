import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { BayesTheoremWidget } from '@/components/probabilites/BayesTheoremWidget'
import { ProbabilitesCh5BayesExamExercises } from '@/components/probabilites/ProbabilitesCh5BayesExamExercises'

export function ProbabilitesBayesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 5 — Théorème de Bayes</strong> : pierre angulaire des probabilités
          et de l’intelligence artificielle (diagnostic, spam, classification).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">5.1 Idée intuitive</h3>
      <p className="text-muted">Bayes répond à : <em>comment inverser une probabilité conditionnelle ?</em></p>
      <p className="text-muted">
        On connaît souvent P(B|A), mais on veut P(A|B).
      </p>
      <Callout variant="important" title="Exemple concret">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>A = personne malade · B = test positif</li>
          <li>On connaît P(test+|malade), on veut P(malade|test+)</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.2 Formule de Bayes</h3>
      <BayesTheoremWidget title="Formule générale — déplacez les curseurs" />

      <h4 className="mt-4 font-semibold text-deep">Interprétation</h4>
      <DataTable
        headers={['Symbole', 'Rôle']}
        rows={[
          ['P(A)', 'Prior — croyance initiale'],
          ['P(B|A)', 'Vraisemblance — observation si A'],
          ['P(B)', 'Normalisation (évidence)'],
          ['P(A|B)', 'Posterior — croyance mise à jour'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">5.3 Version développée</h3>
      <MathBlock tex="P(B) = \sum_i P(B|A_i)\,P(A_i)" />
      <p className="text-sm text-muted">Utile lorsque plusieurs causes Aᵢ partitionnent l’univers.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.4 Exemple médical (très important)</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>P(M) = 0,01 (1 % malades)</li>
        <li>P(T|M) = 0,99 (test positif si malade)</li>
        <li>P(T|¬M) = 0,05 (faux positif)</li>
      </ul>
      <p className="mt-2 font-medium text-deep">Question : P(malade | test positif) ?</p>

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 1 — Bayes</h4>
      <MathBlock tex="P(M|T) = \frac{P(T|M)\,P(M)}{P(T)}" />

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 2 — P(T)</h4>
      <MathBlock tex="P(T) = P(T|M)P(M) + P(T|\neg M)P(\neg M)" />
      <MathBlock tex="P(T) = 0{,}99 \times 0{,}01 + 0{,}05 \times 0{,}99 = 0{,}0594" />

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 3 — Résultat</h4>
      <MathBlock tex="P(M|T) = \frac{0{,}0099}{0{,}0594} \approx 0{,}167" />

      <BayesTheoremWidget
        title="Exemple médical — M = malade, T = test+"
        initialPA={0.01}
        initialPBgivenA={0.99}
        initialPBgivenNotA={0.05}
      />

      <Callout variant="important" title="Conclusion importante">
        Même avec un test positif, la probabilité d’être malade n’est qu’environ <strong>16,7 %</strong> — maladie
        rare et nombreux faux positifs.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.5 Interprétation intuitive</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Beaucoup de faux positifs dans la population saine</li>
        <li>Maladie rare → le prior domine encore après un seul test</li>
        <li>Un test positif n’est pas une preuve absolue</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">5.6 Bayes en machine learning</h3>
      <MathBlock tex="P(y|x) = \frac{P(x|y)\,P(y)}{P(x)}" />
      <DataTable
        headers={['Application', 'Exemple']}
        rows={[
          ['Spam', 'P(Spam | mots)'],
          ['Médecine', 'P(maladie | symptômes)'],
          ['NLP', 'Classification de texte'],
          ['Vision', 'Reconnaissance d’objets'],
        ]}
      />
      <p className="text-sm text-muted">
        Voir aussi le{' '}
        <Link
          to="/cours/probabilites/probabilites-machine-learning"
          className="font-semibold text-emerald-700 underline"
        >
          chapitre ML
        </Link>
        .
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.7 Naive Bayes (cas spécial IA)</h3>
      <MathBlock tex="P(x_1,\ldots,x_n|y) \approx \prod_i P(x_i|y)" />
      <p className="text-muted">
        Hypothèse « naïve » : features indépendantes sachant la classe — approximation forte mais très efficace en
        pratique (spam, sentiments).
      </p>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Bayes inverse une conditionnelle</li>
          <li>✔ Met à jour une croyance (prior → posterior)</li>
          <li>✔ Base du Naive Bayes et de nombreux classifieurs</li>
          <li>✔ Applications : médecine, spam, NLP</li>
        </ul>
      </Callout>

      <ProbabilitesCh5BayesExamExercises />

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/variables-aleatoires-discretes" className="font-semibold text-emerald-700 underline">
            Chapitre 6 — Variables aléatoires discrètes
          </Link>
          , ou TP Python Naive Bayes.
        </p>
      </Callout>

      <QuizCard
        question="Maladie 1 %, P(T|M)=0,99, P(T|¬M)=0,05. P(M|T) ≈ ?"
        options={[
          { id: 'a', label: '99 %', correct: false },
          { id: 'b', label: '50 %', correct: false },
          { id: 'c', label: '17 %', correct: true },
          { id: 'd', label: '5 %', correct: false },
        ]}
        explanation="P(T)≈0,0594, numérateur≈0,0099 → P(M|T)≈0,167."
      />
    </>
  )
}
