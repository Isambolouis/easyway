import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'

export function NlpLLMView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les modèles modernes de NLP atteignent des performances extraordinaires grâce aux données massives, aux GPU,
          aux Transformers et à l’apprentissage auto-supervisé. Ces systèmes sont les{' '}
          <strong>Large Language Models (LLMs)</strong> — GPT-4, Claude, Gemini, Llama…
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">7.1 Self-Attention</h3>
      <p className="text-muted">
        Chaque mot observe tous les autres et évalue leur importance. Pour « mange » dans « Le chat noir mange le
        poisson », le modèle regarde « chat » et « poisson ».
      </p>
      <DataTable
        headers={['Élément', 'Rôle']}
        rows={[
          ['Query (Q)', 'Ce que le mot cherche'],
          ['Key (K)', 'Information disponible'],
          ['Value (V)', 'Contenu transmis'],
        ]}
      />
      <MathBlock tex="\text{Score}(Q,K)=QK^T" />
      <MathBlock tex="\text{Attention}(Q,K,V)=\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
      <p className="text-sm text-muted">
        QKᵀ mesure la similarité ; Softmax transforme les scores en probabilités d’attention.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.2 Multi-Head Attention</h3>
      <p className="text-muted">
        Plusieurs têtes en parallèle — chacune apprend un type de relation (grammaire, sémantique…).
      </p>
      <MathBlock tex="\text{MultiHead}(Q,K,V)=\text{Concat}(\text{head}_1,\ldots,\text{head}_h)W^O" />
      <p className="text-sm text-muted">Compréhension plus riche, apprentissage parallèle, meilleure contextualisation.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.3 Feed Forward Networks</h3>
      <p className="text-muted">Après l’attention, chaque token traverse un réseau dense.</p>
      <MathBlock tex="\text{FFN}(x)=\max(0,xW_1+b_1)W_2+b_2" />
      <p className="text-sm text-muted">Extrait des caractéristiques complexes et augmente la capacité du modèle.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.4 Layer Normalization</h3>
      <MathBlock tex="\text{LayerNorm}(x)=\frac{x-\mu}{\sqrt{\sigma^2+\epsilon}}\gamma+\beta" />
      <p className="text-sm text-muted">Stabilise l’apprentissage, accélère la convergence, limite les gradients explosifs.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.5 Architecture complète du Transformer</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Entrée → Embedding → Position Encoding
→ Multi-Head Attention → Feed Forward → Sortie`}
      </pre>
      <DataTable
        headers={['Partie', 'Fonction']}
        rows={[
          ['Encodeur', 'Compréhension'],
          ['Décodeur', 'Génération'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.6 Pré-entraînement (Pretraining)</h3>
      <p className="text-muted">
        Entraînement sur des milliards de mots (livres, web, code…) — prédire le mot masqué ou le mot suivant.
      </p>
      <h4 className="mt-4 font-semibold text-indigo-800">A. Autoregressif (GPT)</h4>
      <MathBlock tex="P(w_t\mid w_1,w_2,\ldots,w_{t-1})" />
      <h4 className="mt-4 font-semibold text-indigo-800">B. Masqué (BERT)</h4>
      <p className="text-sm text-muted">« Le chat [MASK] du poisson » → prédire « mange ».</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.7 Fonction de perte des LLMs</h3>
      <MathBlock tex="L=-\sum_{i=1}^{N}y_i\log(\hat{y}_i)" />
      <p className="text-sm text-muted">Cross-entropy — pénalise les faibles probabilités sur la bonne réponse.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.8 Fine-Tuning</h3>
      <p className="text-muted">Spécialisation après pré-entraînement — médecine, finance, droit, éducation…</p>
      <MathBlock tex="\theta^*=\arg\min_\theta L(\theta)" />

      <h3 className="mt-10 text-xl font-bold text-deep">7.9 Transfer Learning</h3>
      <p className="text-muted">
        Réutiliser un modèle déjà entraîné — moins de données, entraînement plus rapide, meilleures performances.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.10 Prompt Engineering</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-bold text-deep">Prompt faible</p>
          <p className="mt-1 font-mono text-xs text-muted">Parle du NLP.</p>
        </div>
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-3">
          <p className="text-xs font-bold text-deep">Prompt précis</p>
          <p className="mt-1 font-mono text-xs text-muted">
            Explique le NLP au niveau Master 1 avec des exemples mathématiques.
          </p>
        </div>
      </div>
      <DataTable
        headers={['Type', 'Description']}
        rows={[
          ['Zero-shot', 'Sans exemple'],
          ['One-shot', 'Un exemple'],
          ['Few-shot', 'Plusieurs exemples'],
          ['Chain-of-Thought', 'Raisonnement étape par étape'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.11 Chain-of-Thought Prompting</h3>
      <pre className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed">
        {`Étape 1 : identifier les données
Étape 2 : appliquer la formule
Étape 3 : calculer le résultat`}
      </pre>
      <p className="text-sm text-muted">Le raisonnement intermédiaire améliore logique, précision et problèmes complexes.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.12 RLHF</h3>
      <p className="text-muted">
        Reinforcement Learning from Human Feedback — utilisé par ChatGPT. Le modèle apprend des préférences humaines.
      </p>
      <MathBlock tex="J(\theta)=\mathbb{E}[R(\tau)]" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['R', 'Récompense'],
          ['τ', 'Trajectoire conversationnelle'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.13 Hallucinations des LLMs</h3>
      <p className="text-muted">
        Informations fausses mais grammaticalement convaincantes — génération probabiliste, pas de compréhension réelle.
        Les modèles doivent être vérifiés, supervisés et alignés.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.14 Alignement des modèles</h3>
      <p className="text-muted">Rendre les modèles utiles, sûrs et honnêtes — RLHF, filtrage, safety tuning, instruction tuning.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.15 Compression des modèles</h3>
      <p className="text-muted">Milliards de paramètres — mémoire GPU énorme.</p>
      <DataTable
        headers={['Technique', 'Objectif']}
        rows={[
          ['Quantization', 'Réduire la précision numérique'],
          ['Pruning', 'Supprimer les poids inutiles'],
          ['Distillation', 'Entraîner un petit modèle'],
        ]}
      />
      <DataTable
        headers={['Format', 'Bits']}
        rows={[
          ['FP32', '32'],
          ['FP16', '16'],
          ['INT8', '8'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.16 Agents IA conversationnels</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Utilisateur → LLM → Mémoire → Outils externes → Réponse`}
      </pre>
      <p className="text-sm text-muted">Recherche, code, analyse, raisonnement, planification.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.17 Coût computationnel</h3>
      <MathBlock tex="O(n^2)\ \text{pour une séquence de longueur }n" />
      <p className="text-sm text-muted">
        Solutions : Sparse Attention, Flash Attention, Linear Attention, architectures hybrides.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">7.18 Modèles multimodaux</h3>
      <p className="text-muted">
        Texte + image + audio + vidéo + code — GPT-4, Gemini. Applications : assistants visuels, OCR, génération
        image-texte, IA éducative, robotique.
      </p>

      <Accordion title="Exemple Python — Hugging Face sentiment-analysis" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("Le NLP est fascinant")
print(result)`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé">
        Self-Attention, Multi-Head, Transformers, pré-entraînement, fine-tuning, transfer learning, prompt engineering,
        RLHF, compression, agents — cœur de l’IA générative moderne.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi le Self-Attention est-il puissant ?</li>
        <li>Avantage du Multi-Head Attention ?</li>
        <li>Pourquoi le fine-tuning est-il important ?</li>
        <li>Qu’est-ce que le RLHF ?</li>
        <li>Pourquoi les LLMs hallucinent-ils ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — BERT vs GPT</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <DataTable
          headers={['Modèle', 'Entraînement', 'Usage']}
          rows={[
            ['BERT', 'Masquage bidirectionnel', 'Compréhension, classification'],
            ['GPT', 'Autoregressif (mot suivant)', 'Génération, dialogue'],
          ]}
        />
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — Complexité quadratique</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">
          Chaque token compare sa query à toutes les keys — n tokens × n comparaisons → O(n²) en mémoire et calcul.
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Prompt Engineering</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <p className="text-sm text-muted">
          Guide le comportement du modèle sans réentraînement — instructions, exemples, format de sortie ; crucial pour
          fiabilité et tâches spécialisées.
        </p>
      </Accordion>

      <QuizCard
        question="Le RLHF sert principalement à…"
        options={[
          { id: 'a', label: 'Aligner le modèle sur les préférences humaines', correct: true },
          { id: 'b', label: 'Réduire la taille du vocabulaire', correct: false },
          { id: 'c', label: 'Remplacer la tokenisation', correct: false },
        ]}
        explanation="Après pré-entraînement, une récompense humaine affine les réponses (utilité, sécurité, honnêteté)."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>VIII — Applications avancées du NLP</strong> (sentiments, traduction, résumé, QA,
        chatbots, multimodal).
      </Callout>
    </>
  )
}
