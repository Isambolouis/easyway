import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  BayesianExam0363Widget,
  BayesianModelPerformanceWidget,
} from '@/components/probabilites/BayesianPosteriorWidget'
import { NaiveBayesSpamWidget } from '@/components/probabilites/NaiveBayesSpamWidget'
export function ProbabilitesBayesianInferenceView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 13 — Inférence bayésienne avancée</strong> : mettre à jour une
          croyance avec les données — base du ML bayésien et de l’IA incertaine.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">13.1 Idée intuitive</h3>
      <p className="text-muted">
        L’inférence bayésienne <strong>met à jour une croyance</strong> lorsque de nouvelles données arrivent (test
        médical, performance d’un modèle, etc.).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">13.2 Théorème de Bayes (forme IA)</h3>
      <MathBlock tex="P(\theta|D)=\frac{P(D|\theta)\,P(\theta)}{P(D)}" />
      <DataTable
        headers={['Terme', 'Nom', 'Rôle']}
        rows={[
          ['P(θ)', 'Prior', 'Croyance initiale'],
          ['P(D|θ)', 'Likelihood', 'Modèle des données'],
          ['P(θ|D)', 'Posterior', 'Croyance mise à jour'],
          ['P(D)', 'Evidence', 'Normalisation'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">13.3 Processus d’inférence</h3>
      <ol className="list-decimal space-y-1 pl-5 text-muted">
        <li>Hypothèse initiale (prior)</li>
        <li>Observation des données</li>
        <li>Calcul de la vraisemblance</li>
        <li>Mise à jour → posterior</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">13.4–13.5 Exemple modèle performant</h3>
      <p className="text-sm text-muted">θ = « modèle performant », P(θ)=0,5, P(D|θ)=0,9, P(D|¬θ)=0,4.</p>
      <BayesianModelPerformanceWidget />
      <MathBlock tex="P(D)=0{,}65 \quad P(\theta|D)=\frac{0{,}45}{0{,}65}\approx 0{,}69" />

      <h3 className="mt-10 text-xl font-bold text-deep">13.6 Importance en IA moderne</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Machine learning bayésien, diagnostic, NLP probabiliste</li>
        <li>Gestion de l’incertitude, apprentissage avec peu de données</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">13.7–13.8 MAP vs MLE</h3>
      <MathBlock tex="\theta_{MAP}=\arg\max_\theta P(\theta|D)" />
      <MathBlock tex="\theta_{MLE}=\arg\max_\theta P(D|\theta)" />
      <DataTable
        headers={['Méthode', 'Utilise le prior ?']}
        rows={[
          ['MLE', 'Non'],
          ['MAP', 'Oui'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">13.9 Lien avec le machine learning</h3>
      <p className="text-muted">
        IA classique : minimise une erreur · IA bayésienne : maximise une probabilité (posterior ou vraisemblance).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">13.10 Exemple spam</h3>
      <p className="text-muted">P(Spam | Mots) — chaque mot met à jour la probabilité de spam.</p>
      <NaiveBayesSpamWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">13.11 Exercice type examen</h3>
      <Accordion title="P(θ)=0,3 · P(D|θ)=0,8 · P(D|¬θ)=0,2 — calculer P(θ|D)" defaultOpen>
        <MathBlock tex="P(D)=0{,}8\times0{,}3+0{,}2\times0{,}7=0{,}38" className="!my-2" />
        <MathBlock tex="P(\theta|D)=\frac{0{,}24}{0{,}38}\approx 0{,}63" className="!my-2" />
        <BayesianExam0363Widget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : P(θ|D) ≈ 0,63
        </p>
      </Accordion>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Prior + likelihood → posterior</li>
          <li>✔ P(D) = loi totale</li>
          <li>✔ MAP vs MLE</li>
          <li>✔ Applications spam, diagnostic, IA probabiliste</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Applications ML complémentaires">
        <p className="text-sm">
          Voir aussi{' '}
          <Link to="/cours/probabilites/exercices-probabilites" className="font-semibold text-emerald-700 underline">
            exercices corrigés
          </Link>{' '}
          et{' '}
          <Link to="/cours/probabilites/inference-variationnelle" className="font-semibold text-emerald-700 underline">
            chapitre 14 — Inférence variationnelle
          </Link>
          .
        </p>
      </Callout>

      <QuizCard
        question="P(θ)=0,4, P(D|θ)=0,9, P(D|¬θ)=0,3. P(θ|D) vaut environ…"
        options={[
          { id: 'a', label: '0,40', correct: false },
          { id: 'b', label: '0,54', correct: false },
          { id: 'c', label: '0,67', correct: true },
          { id: 'd', label: '0,90', correct: false },
        ]}
        explanation="P(D)=0,36+0,18=0,54. P(θ|D)=0,36/0,54=0,67."
      />
    </>
  )
}
