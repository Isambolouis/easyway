import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { Figure } from '@/components/ui/Figure'
import { Accordion } from '@/components/ui/Accordion'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { FadeIn } from '@/components/ui/FadeIn'
import { NeuronDemo } from '@/components/interactive/NeuronDemo'
import { ActivationPlots } from '@/components/interactive/ActivationPlots'
import type { ReactNode } from 'react'

function IAStackSvg() {
  return (
    <svg viewBox="0 0 520 120" className="w-full" aria-hidden>
      <rect x="10" y="25" width="140" height="70" rx="12" fill="#f1f5f9" stroke="#1e3a5f" strokeWidth="2" />
      <text x="80" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a5f">IA</text>
      <path d="M155 60 H185" stroke="#0d9488" strokeWidth="3" />
      <rect x="190" y="25" width="160" height="70" rx="12" fill="#ecfdf5" stroke="#0d9488" strokeWidth="2" />
      <text x="270" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f766e">Machine Learning</text>
      <path d="M355 60 H385" stroke="#f97316" strokeWidth="3" />
      <rect x="390" y="25" width="120" height="70" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="450" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill="#c2410c">Deep Learning</text>
    </svg>
  )
}

export const chapterViews: Record<string, () => ReactNode> = {
  introduction: () => (
    <>
      <Figure caption="L’IA englobe le ML, qui englobe le deep learning.">
        <IAStackSvg />
      </Figure>
      <FadeIn>
        <p>
          L’<strong>intelligence artificielle</strong> regroupe les techniques visant à doter des systèmes de
          capacités cognitives (perception, langage, planification). Le <strong>machine learning</strong> apprend à
          partir de données. Le <strong>deep learning</strong> empile des couches de neurones pour des
          représentations hiérarchiques.
        </p>
      </FadeIn>
      <Callout variant="important" title="Cerveau artificiel">
        Métaphore pédagogique&nbsp;: neurones connectés et signaux — pas une copie biologique, mais une inspiration
        architecturale.
      </Callout>
      <Accordion title="Frise historique (détails)" defaultOpen>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>1943</strong> — McCulloch &amp; Pitts</li>
          <li><strong>1958</strong> — Perceptron</li>
          <li><strong>1986</strong> — Rétropropagation</li>
          <li><strong>2012</strong> — AlexNet</li>
          <li><strong>2017+</strong> — Transformers</li>
        </ul>
      </Accordion>
      <QuizCard
        question="Le deep learning est principalement basé sur…"
        options={[
          { id: 'a', label: 'Des règles if/else codées à la main', correct: false },
          { id: 'b', label: 'Des réseaux de neurones à plusieurs couches', correct: true },
          { id: 'c', label: 'Uniquement des bases de données SQL', correct: false },
        ]}
        explanation="Le deep learning s’appuie sur des réseaux profonds entraînés sur des données."
      />
    </>
  ),

  'traitement-information': () => (
    <>
      <Figure caption="Entrée sensorielle → transmission → analyse → décision → action.">
        <svg viewBox="0 0 700 100" className="w-full" aria-hidden>
          {['Entrée', 'Transmission', 'Analyse', 'Décision', 'Action'].map((label, i) => (
            <g key={label}>
              <rect x={10 + i * 135} y="20" width="120" height="60" rx="10" fill={i % 2 ? '#f8fafc' : '#ecfdf5'} stroke="#64748b" strokeWidth="2" />
              <text x={70 + i * 135} y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{label}</text>
            </g>
          ))}
        </svg>
      </Figure>
      <DataTable
        headers={['Modalité', 'Traitement (schématique)']}
        rows={[
          ['Vision', 'Cortex visuel (occipital) → formes, visages'],
          ['Audition', 'Fréquences, parole, musique'],
          ['Olfaction', 'Limbique, mémoire émotionnelle'],
          ['Toucher', 'Cortex somatosensoriel'],
          ['Langage', 'Aires de Broca / Wernicke'],
        ]}
      />
    </>
  ),

  'cerveau-biologique': () => (
    <>
      <p>Le cerveau est un système distribué&nbsp;: cortex, lobes, hippocampe, thalamus, amygdale, tronc, neurones et synapses.</p>
      <DataTable
        headers={['Structure', 'Rôle']}
        rows={[
          ['Cortex', 'Perception, langage, exécutif'],
          ['Frontal', 'Planification, contrôle moteur'],
          ['Temporal', 'Audition, mémoire sémantique'],
          ['Pariétal', 'Intégration sensorielle, espace'],
          ['Occipital', 'Vision'],
          ['Hippocampe', 'Consolidation mémoire'],
          ['Synapses', 'Plasticité, apprentissage'],
        ]}
      />
    </>
  ),

  'neurone-biologique': () => (
    <>
      <Figure caption="Dendrites → soma → axone → synapses.">
        <svg viewBox="0 0 600 160" className="w-full" aria-hidden>
          <path d="M20 90 L60 60 M20 100 L65 100 M20 110 L60 130" stroke="#1e3a5f" strokeWidth="2" fill="none" />
          <circle cx="120" cy="100" r="35" fill="#f8fafc" stroke="#1e3a5f" strokeWidth="2.5" />
          <text x="120" y="105" textAnchor="middle" fontSize="12" fontWeight="700">Soma</text>
          <path d="M155 100 H280" stroke="#1e3a5f" strokeWidth="4" />
          <circle cx="320" cy="100" r="6" fill="#f97316" />
          <text x="400" y="105" textAnchor="middle" fontSize="11" fill="#c2410c">Synapse</text>
        </svg>
      </Figure>
      <Callout variant="definition">Analogie&nbsp;: vote pondéré avec seuil sur de nombreuses entrées.</Callout>
    </>
  ),

  transition: () => (
    <DataTable
      headers={['Biologique', 'Artificiel']}
      rows={[
        ['Neurone', 'Unité / nœud'],
        ['Synapse', 'Poids w'],
        ['Signal', 'Activation numérique'],
        ['Apprentissage', 'Entraînement'],
        ['Mémoire', 'Paramètres'],
      ]}
    />
  ),

  'reseau-neuronal': () => (
    <>
      <Figure caption="Couches input → hidden → output.">
        <svg viewBox="0 0 500 140" className="w-full" aria-hidden>
          {['Input', 'Hidden', 'Output'].map((l, i) => (
            <g key={l}>
              <rect x={40 + i * 160} y="30" width="90" height="80" rx="10" fill="#f8fafc" stroke="#1e3a5f" strokeWidth="2" />
              <text x={85 + i * 160} y="78" textAnchor="middle" fontSize="12" fontWeight="700">{l}</text>
            </g>
          ))}
        </svg>
      </Figure>
      <p>Chaque couche transforme les activations via combinaisons linéaires et non-linéarités.</p>
    </>
  ),

  'neurone-artificiel': () => (
    <>
      <NeuronDemo />
      <MathBlock tex="z = \sum_i w_i x_i + b,\quad a = f(z)" />
    </>
  ),

  mathematiques: () => (
    <>
      <p>Vecteurs, matrices, gradients et fonctions de perte structurent l’entraînement.</p>
      <ActivationPlots />
      <MathBlock tex="\mathcal{L}_{CE} = -\sum_k q_k \log \hat{p}_k" />
      <MathBlock tex="w \leftarrow w - \eta \frac{\partial \mathcal{L}}{\partial w}" />
    </>
  ),

  apprentissage: () => (
  <>
      <DataTable
        headers={['Application', 'Idée']}
        rows={[
          ['Vision', 'Filtres hiérarchiques'],
          ['Langage', 'Embeddings + contexte'],
          ['ChatGPT', 'Prédiction de texte + alignement'],
          ['Voitures autonomes', 'Fusion capteurs + planification'],
        ]}
      />
    </>
  ),

  comparaison: () => (
    <DataTable
      headers={['Critère', 'Biologique', 'Artificiel']}
      rows={[
        ['Vitesse', 'Parallélisme massif', 'GPU, matrices'],
        ['Énergie', '~dizaine de watts', 'Entraînement coûteux'],
        ['Créativité', 'Culture, émotions', 'Génération statistique'],
        ['Limites', 'Fatigue', 'Hallucinations, biais'],
      ]}
    />
  ),

  conclusion: () => (
    <>
      <Callout variant="resume">
        Le deep learning excelle sur des tâches bien définies avec beaucoup de données ; l’IAG reste un horizon
        ouvert.
      </Callout>
      <blockquote className="mt-8 rounded-2xl bg-gradient-to-br from-deep to-teal p-6 text-center text-lg italic text-white">
        « Comprendre la machine, c’est aussi mieux comprendre l’humain — et ce qui nous distingue encore. »
      </blockquote>
    </>
  ),
}
