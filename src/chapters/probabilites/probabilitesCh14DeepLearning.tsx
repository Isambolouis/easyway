import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { Callout } from '@/components/ui/Callout'

/** Complément : softmax, cross-entropy, MLE — après inférence variationnelle */
export function ProbabilitesDeepLearningView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Complément — Probabilités & Deep Learning</strong> : softmax, entropie
          croisée et lien avec la vraisemblance. Prérequis :{' '}
          <Link to="/cours/probabilites/probabilites-machine-learning" className="font-semibold text-emerald-700 underline">
            ch. 13 — Inférence bayésienne
          </Link>
          .
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Softmax</h3>
      <MathBlock tex="P(y_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}" />
      <p className="text-sm text-muted">Scores zᵢ → distribution sur K classes.</p>

      <h3 className="mt-8 text-xl font-bold text-deep">Cross-Entropy</h3>
      <MathBlock tex="L = -\sum_i y_i \log(\hat{y}_i)" />

      <h3 className="mt-8 text-xl font-bold text-deep">Maximum de vraisemblance</h3>
      <MathBlock tex="\hat{\theta} = \arg\max_\theta \prod_{i=1}^n P(x_i \mid \theta)" />

      <h3 className="mt-8 text-xl font-bold text-deep">Modèles génératifs</h3>
      <DataTable
        headers={['Modèle', 'Idée']}
        rows={[
          ['VAE', 'ELBO + espace latent (ch. 14)'],
          ['GAN', 'Jeu adversarial'],
          ['Diffusion', 'Débruitage progressif'],
        ]}
      />

      <Callout variant="definition">
        <p className="text-sm">
          L’inférence variationnelle détaillée (ELBO, VAE) :{' '}
          <Link to="/cours/probabilites/inference-variationnelle" className="font-semibold text-emerald-700 underline">
            Chapitre 14 — Inférence variationnelle
          </Link>
          .
        </p>
      </Callout>

      <QuizCard
        question="Softmax en classification à 3 classes produit…"
        options={[
          { id: 'a', label: '3 valeurs quelconques', correct: false },
          { id: 'b', label: '3 probabilités qui somment à 1', correct: true },
          { id: 'c', label: 'Une seule probabilité', correct: false },
          { id: 'd', label: 'Toujours [0,1,0]', correct: false },
        ]}
        explanation="Softmax = distribution catégorielle."
      />
    </>
  )
}
