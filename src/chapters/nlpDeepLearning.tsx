import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'

export function NlpDeepLearningView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong>Deep Learning</strong> a révolutionné le NLP. BoW, TF-IDF et n-grams étaient limités par la sparsité,
          les dépendances courtes et l’absence de contexte. Les réseaux profonds permettent l’apprentissage automatique des
          représentations, la compréhension contextuelle, la génération de texte et les modèles conversationnels modernes.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">6.1 Réseaux de neurones artificiels</h3>
      <p className="text-muted">Inspirés du cerveau : neurones, couches, connexions pondérées.</p>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Entrée → Couche cachée → Sortie`}
      </pre>
      <p className="text-muted">Un neurone : (1) combinaison linéaire, (2) activation non linéaire.</p>
      <MathBlock tex="z=\sum_{i=1}^{n}w_i x_i+b,\quad a=f(z)" />
      <p className="text-sm text-muted">Le neurone apprend quelles caractéristiques combiner.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.2 Fonctions d’activation</h3>
      <p className="text-muted">Sans non-linéarité, le réseau reste un modèle linéaire.</p>

      <h4 className="mt-4 font-semibold text-indigo-800">A. Sigmoid</h4>
      <MathBlock tex="\sigma(x)=\frac{1}{1+e^{-x}}" />
      <p className="text-sm text-muted">Sortie ∈ (0, 1) — limite : gradient qui disparaît.</p>

      <h4 className="mt-4 font-semibold text-indigo-800">B. Tanh</h4>
      <MathBlock tex="\tanh(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}}" />
      <p className="text-sm text-muted">Sortie ∈ [−1, 1].</p>

      <h4 className="mt-4 font-semibold text-indigo-800">C. ReLU</h4>
      <MathBlock tex="\text{ReLU}(x)=\max(0,x)" />
      <p className="text-sm text-muted">Simple, rapide, atténue le vanishing gradient — la plus utilisée aujourd’hui.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.3 Forward propagation</h3>
      <p className="text-muted">Entrée → sortie : multiplication matricielle, activation, sortie finale.</p>
      <MathBlock tex="Z=WX+b,\quad A=f(Z)" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.4 Fonction de perte</h3>
      <p className="text-muted">Le modèle minimise une erreur — en NLP, souvent la <strong>cross-entropy</strong> :</p>
      <MathBlock tex="L=-\sum_{i=1}^{n}y_i\log(\hat{y}_i)" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['yᵢ', 'Vraie valeur'],
          ['ŷᵢ', 'Prédiction'],
        ]}
      />
      <p className="text-sm text-muted">Faible loss → bon modèle ; grande loss → mauvais modèle.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.5 Descente de gradient</h3>
      <MathBlock tex="w=w-\eta\frac{\partial L}{\partial w}" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['η', 'Learning rate'],
          ['L', 'Fonction de perte'],
        ]}
      />
      <p className="text-sm text-muted">Le modèle « descend » vers le minimum de l’erreur.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.6 Backpropagation</h3>
      <p className="text-muted">Calcule l’influence de chaque poids sur l’erreur — règle de la chaîne :</p>
      <MathBlock tex="\frac{\partial L}{\partial w}=\frac{\partial L}{\partial a}\frac{\partial a}{\partial z}\frac{\partial z}{\partial w}" />
      <Callout variant="important">Sans backpropagation, impossible d’entraîner les réseaux profonds.</Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6.7 NLP et séquences temporelles</h3>
      <p className="text-muted">
        « Le chat mange. » — l’ordre compte. Les réseaux feed-forward ne mémorisent pas les séquences → solution :{' '}
        <strong>RNN</strong>.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.8 RNN (Recurrent Neural Networks)</h3>
      <p className="text-muted">Mémoire temporelle : chaque état dépend de l’entrée actuelle et de l’état précédent.</p>
      <MathBlock tex="h_t=f(Wx_t+Uh_{t-1}+b)" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['xₜ', 'Entrée actuelle'],
          ['hₜ', 'État caché'],
          ['hₜ₋₁', 'Mémoire précédente'],
        ]}
      />
      <p className="text-sm text-muted">Applications : traduction, génération, reconnaissance vocale.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.9–6.10 Limites et vanishing gradient</h3>
      <p className="text-muted">
        « Le livre que j’ai acheté hier … est excellent » — lien lointain livre → excellent. Les RNN oublient les
        informations anciennes quand les gradients deviennent très petits en backprop.
      </p>
      <MathBlock tex="\prod_{t=1}^{n}\frac{\partial h_t}{\partial h_{t-1}}\to 0\ \text{si dérivées }<1" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.11 LSTM</h3>
      <p className="text-muted">
        Long Short-Term Memory (Hochreiter & Schmidhuber) — cellule mémoire et portes de contrôle.
      </p>
      <DataTable
        headers={['Porte', 'Fonction']}
        rows={[
          ['Forget Gate', 'Oublie'],
          ['Input Gate', 'Mémorise'],
          ['Output Gate', 'Produit la sortie'],
        ]}
      />
      <MathBlock tex="f_t=\sigma(W_f[h_{t-1},x_t]+b_f)" />
      <MathBlock tex="i_t=\sigma(W_i[h_{t-1},x_t]+b_i)" />
      <MathBlock tex="C_t=f_t\odot C_{t-1}+i_t\odot\tilde{C}_t" />
      <p className="text-sm text-muted">Mémorisation longue, stabilité, meilleures performances séquentielles.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.12 GRU</h3>
      <p className="text-muted">Gated Recurrent Unit — version simplifiée du LSTM, moins de paramètres, plus rapide.</p>
      <MathBlock tex="h_t=(1-z_t)\odot h_{t-1}+z_t\odot\tilde{h}_t" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.13 Attention Mechanism</h3>
      <p className="text-muted">
        Révolution du NLP : le modèle apprend quels mots regarder. Pour prédire « mange » dans « Le chat noir mange le
        poisson », il se concentre sur « chat ».
      </p>
      <MathBlock tex="\text{Attention}(Q,K,V)=\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
      <DataTable
        headers={['Symbole', 'Rôle']}
        rows={[
          ['Q', 'Query'],
          ['K', 'Key'],
          ['V', 'Value'],
        ]}
      />
      <p className="text-sm text-muted">Base des Transformers et des grands modèles génératifs.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.14 Transformers</h3>
      <p className="text-muted">
        Google Brain, 2017 — « Attention Is All You Need ». Abandon des RNN, attention seule, parallélisation et longues
        dépendances.
      </p>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Entrée → Embedding → Self-Attention → Feed Forward → Sortie`}
      </pre>

      <h3 className="mt-10 text-xl font-bold text-deep">6.15 Position Encoding</h3>
      <p className="text-muted">Pas d’ordre naturel — encodage positionnel sinus/cosinus :</p>
      <MathBlock tex="PE(pos,2i)=\sin\left(\frac{pos}{10000^{2i/d}}\right)" />
      <MathBlock tex="PE(pos,2i+1)=\cos\left(\frac{pos}{10000^{2i/d}}\right)" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.16 BERT et GPT</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
          <p className="font-bold text-indigo-900">BERT (Google)</p>
          <p className="mt-1 text-sm text-muted">Bidirectionnel — compréhension contextuelle (encodage).</p>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
          <p className="font-bold text-indigo-900">GPT-4 (génération)</p>
          <MathBlock tex="P(w_t\mid w_1,\ldots,w_{t-1})" className="!my-2" />
          <p className="text-sm text-muted">Autoregressif — assistants, code, dialogue.</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">
        Applications : assistants IA, génération, traduction, résumé, agents conversationnels.
      </p>

      <Accordion title="Exemple Python — Hugging Face Transformers" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from transformers import pipeline

generator = pipeline("text-generation")
result = generator("Le NLP est", max_length=20)
print(result)`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé">
        Réseaux neuronaux, activations, forward/backprop, RNN, LSTM, GRU, attention, Transformers, BERT, GPT — base des
        systèmes NLP modernes.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi les RNN ont-ils besoin de mémoire ?</li>
        <li>Quel problème résout le LSTM ?</li>
        <li>Pourquoi l’attention est-elle révolutionnaire ?</li>
        <li>Pourquoi les Transformers sont-ils plus efficaces que les RNN ?</li>
        <li>Différence BERT vs GPT ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — Rôle de l’activation</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <p className="text-sm text-muted">
          Introduit la non-linéarité pour modéliser des relations complexes ; sans elle, toute la profondeur se réduit à
          une seule transformation linéaire.
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — Vanishing gradient</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">
          Les gradients multipliés sur de longues séquences tendent vers 0 — les premiers mots ne reçoivent presque plus
          de signal d’apprentissage ; les dépendances longues sont impossibles à apprendre.
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — RNN vs LSTM vs Transformers</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <DataTable
          headers={['Modèle', 'Force', 'Limite']}
          rows={[
            ['RNN', 'Séquences, mémoire simple', 'Vanishing gradient, lent'],
            ['LSTM', 'Longues dépendances, portes', 'Séquentiel, difficile à paralléliser'],
            ['Transformers', 'Attention parallèle, contexte global', 'Coût quadratique en longueur'],
          ]}
        />
      </Accordion>

      <QuizCard
        question="BERT par rapport à GPT…"
        options={[
          { id: 'a', label: 'BERT encode bidirectionnellement ; GPT génère mot à mot (autoregressif)', correct: true },
          { id: 'b', label: 'BERT et GPT n’utilisent pas l’attention', correct: false },
          { id: 'c', label: 'GPT est uniquement entraîné sur des images', correct: false },
        ]}
        explanation="BERT lit tout le contexte (compréhension) ; GPT prédit le token suivant (génération)."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>VII — Architectures modernes et grands modèles de langage</strong> (fine-tuning,
        prompt engineering, RLHF, agents IA).
      </Callout>
    </>
  )
}
