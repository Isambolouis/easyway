import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  VAEElobWidget,
  VAESchemaWidget,
  VariationalGaussianWidget,
} from '@/components/probabilites/VariationalInferenceWidgets'

export function ProbabilitesVariationalInferenceView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 14 — Inférence variationnelle</strong> : niveau recherche IA —
          approximer des postérieurs intractables (VAE, Bayesian deep learning, modèles génératifs).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">14.1 Problème fondamental</h3>
      <p className="text-muted">
        En inférence bayésienne, on veut <strong>P(θ|D)</strong>. Souvent ce calcul est impossible directement
        (intégrales intraitables).
      </p>
      <Callout variant="important">
        Solution : approximer la vraie distribution par une famille plus simple q(θ) ≈ P(θ|D).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">14.2–14.4 Idée clé et KL</h3>
      <MathBlock tex="q^*(\theta)=\arg\min_q KL(q(\theta)\|P(\theta|D))" />
      <MathBlock tex="KL(q\|p)=\int q(\theta)\log\frac{q(\theta)}{p(\theta|D)}\,d\theta" />
      <p className="text-sm text-muted">KL = 0 → distributions identiques · KL grand → mauvaise approximation.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">14.5–14.7 ELBO</h3>
      <MathBlock tex="P(\theta|D)=\frac{P(D,\theta)}{P(D)}" />
      <MathBlock tex="\mathcal{L}(q)=E_q[\log P(D,\theta)] - E_q[\log q(\theta)]" />
      <MathBlock tex="\log P(D)=\mathcal{L}(q)+KL(q\|p)" />
      <Callout variant="definition">
        <strong>Maximiser l’ELBO</strong> = <strong>minimiser KL</strong> — c’est l’objectif d’entraînement en pratique.
      </Callout>
      <VAEElobWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">14.8 Applications en IA</h3>
      <DataTable
        headers={['Domaine', 'Usage']}
        rows={[
          ['VAE', 'Espace latent + reconstruction'],
          ['Bayesian DL', 'Incertitude sur les poids'],
          ['NLP / vision', 'Modèles génératifs'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">14.9–14.10 Approximation gaussienne & optimisation</h3>
      <p className="text-muted">
        On choisit q(θ) = N(μ, σ²) et on optimise (μ, σ) par gradient — comme un réseau de neurones.
      </p>
      <VariationalGaussianWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">14.11 Lien avec les VAE</h3>
      <VAESchemaWidget />
      <MathBlock tex="\text{ELBO}=E[\log p(x|z)]-KL(q(z|x)\|p(z))" />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Premier terme : reconstruction des données</li>
        <li>Second terme : régularisation de l’espace latent</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">14.12–14.13 Intuition & exercice</h3>
      <p className="text-muted">
        On remplace un calcul probabiliste impossible par une <strong>optimisation</strong> d’une approximation.
      </p>
      <Accordion title="Exercice — ajuster μ et σ pour minimiser KL" defaultOpen>
        <p className="text-muted">
          Utilisez le widget ci-dessus : alignez q(θ) sur la courbe cible p(θ|D) pour faire tendre KL vers 0.
        </p>
        <VariationalGaussianWidget />
      </Accordion>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Approximer P(θ|D) par q(θ) simple</li>
          <li>✔ Minimiser KL · maximiser ELBO</li>
          <li>✔ Base des VAE et de l’IA générative moderne</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape & complément DL">
        <p className="text-sm">
          <Link to="/cours/probabilites/probabilites-deep-learning" className="font-semibold text-emerald-700 underline">
            Complément — Probabilités & Deep Learning
          </Link>{' '}
          (softmax, cross-entropy),{' '}
          <Link to="/cours/probabilites/exercices-probabilites" className="font-semibold text-emerald-700 underline">
            sujet examen final
          </Link>
          , ou projet IA (spam + génération).
        </p>
      </Callout>

      <QuizCard
        question="En inférence variationnelle, maximiser l’ELBO équivaut à…"
        options={[
          { id: 'a', label: 'Maximiser KL(q||p)', correct: false },
          { id: 'b', label: 'Minimiser KL(q||p)', correct: true },
          { id: 'c', label: 'Ignorer P(D)', correct: false },
          { id: 'd', label: 'Fixer q = prior', correct: false },
        ]}
        explanation="log P(D) = ELBO + KL. Maximiser ELBO à KL fixe revient à minimiser KL."
      />
    </>
  )
}
