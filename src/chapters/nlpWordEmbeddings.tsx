import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'

export function NlpWordEmbeddingsView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les algorithmes de Machine Learning ne comprennent pas directement les mots — pour une machine, « chat » n’a
          aucun sens. Le NLP doit transformer le langage en <strong>représentations vectorielles</strong> exploitables
          numériquement.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">5.1 Représentation discrète des mots</h3>
      <h4 className="mt-4 font-semibold text-indigo-800">A. Encodage d’indices</h4>
      <DataTable
        headers={['Mot', 'Index']}
        rows={[
          ['chat', '0'],
          ['chien', '1'],
          ['mange', '2'],
        ]}
      />
      <p className="text-sm text-muted">Limite : les indices ne portent aucun sens mathématique.</p>

      <h4 className="mt-6 font-semibold text-indigo-800">B. One-Hot Encoding</h4>
      <p className="text-sm text-muted">Vocabulaire : [&quot;chat&quot;, &quot;chien&quot;, &quot;mange&quot;]</p>
      <DataTable
        headers={['Mot', 'Vecteur']}
        rows={[
          ['chat', '[1, 0, 0]'],
          ['chien', '[0, 1, 0]'],
          ['mange', '[0, 0, 1]'],
        ]}
      />
      <MathBlock tex="x_i \in \mathbb{R}^{V},\quad x_{ij}=\begin{cases}1 & \text{si } i=j\\0 & \text{sinon}\end{cases}" />

      <Callout variant="important" title="Limites du One-Hot">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Sparsité</strong> — vecteurs très grands, remplis de zéros.
          </li>
          <li>
            <strong>Absence de sémantique</strong> — distance(roi, reine) = distance(roi, banane).
          </li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.2 Distributional Hypothesis</h3>
      <blockquote className="my-4 border-l-4 border-indigo-400 bg-indigo-50/60 py-3 pl-4 italic text-deep">
        « Les mots apparaissant dans des contextes similaires ont des sens similaires. » — Zellig Harris
      </blockquote>
      <p className="text-muted">
        « roi » et « reine » partagent des contextes (royaume, trône, couronne) — leurs vecteurs doivent être proches.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.3 Word Embeddings</h3>
      <p className="text-muted">
        Représentation <strong>dense et continue</strong> : réduction de dimension, capture du sens, relations
        sémantiques apprises.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <pre className="rounded-lg bg-slate-100 p-3 text-xs">[0, 0, 0, 1, 0, 0, 0, 0]  ← one-hot</pre>
        <pre className="rounded-lg bg-indigo-50 p-3 text-xs text-indigo-900">[0.23, -0.71, 0.44, 0.89]  ← embedding</pre>
      </div>
      <p className="mt-2 text-sm text-muted">
        Dimensions typiques : 50, 100, 300, 768, 1024.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.4 Word2Vec</h3>
      <p className="text-muted">
        Développé par Tomas Mikolov (Google Research) — apprend automatiquement des représentations vectorielles.
      </p>
      <DataTable
        headers={['Architecture', 'Objectif']}
        rows={[
          ['CBOW', 'Prédire le mot central à partir du contexte'],
          ['Skip-Gram', 'Prédire le contexte à partir du mot central'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">5.5 CBOW (Continuous Bag of Words)</h3>
      <p className="text-muted">
        Phrase : « Le chat mange du poisson » — contexte [&quot;Le&quot;, &quot;chat&quot;, &quot;du&quot;, &quot;poisson&quot;], cible
        &quot;mange&quot;.
      </p>
      <MathBlock tex="P(w_t\mid w_{t-c},\ldots,w_{t+c})" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['wₜ', 'Mot cible'],
          ['c', 'Fenêtre de contexte'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">5.6 Skip-Gram</h3>
      <p className="text-muted">
        Mot central « mange » → prédire [&quot;Le&quot;, &quot;chat&quot;, &quot;du&quot;, &quot;poisson&quot;]. Mieux pour les mots rares et les
        relations sémantiques fines.
      </p>
      <MathBlock tex="\prod_{-c\leq j\leq c,\,j\neq 0}P(w_{t+j}\mid w_t)" />

      <h3 className="mt-10 text-xl font-bold text-deep">5.7 Fonction Softmax</h3>
      <MathBlock tex="\text{Softmax}(x_i)=\frac{e^{x_i}}{\sum_{j=1}^{n}e^{x_j}}" />
      <p className="text-muted">Transforme des scores en distribution de probabilités.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.8 Fonction de perte</h3>
      <MathBlock tex="J=-\log P(w_O\mid w_I)" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['wᵢ', 'Mot d’entrée'],
          ['wₒ', 'Mot cible'],
        ]}
      />
      <p className="text-sm text-muted">Maximiser les probabilités correctes via log-vraisemblance négative.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.9 Similarité cosinus</h3>
      <MathBlock tex="\cos(\theta)=\frac{A\cdot B}{|A|\,|B|}" />
      <DataTable
        headers={['Valeur', 'Signification']}
        rows={[
          ['1', 'Très similaire'],
          ['0', 'Indépendant'],
          ['-1', 'Opposé'],
        ]}
      />
      <Callout variant="definition" title="Analogie célèbre">
        <MathBlock tex="\vec{\text{Roi}}-\vec{\text{Homme}}+\vec{\text{Femme}}\approx\vec{\text{Reine}}" className="!my-2" />
        <p className="text-sm text-muted">Les embeddings capturent des régularités sémantiques en géométrie vectorielle.</p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5.10 GloVe</h3>
      <p className="text-muted">
        Stanford — <strong>Global Vectors</strong> : combine statistiques globales et relations locales via une matrice de
        cooccurrence Xᵢⱼ (nombre de fois que j apparaît près de i).
      </p>
      <MathBlock tex="J=\sum_{i,j}f(X_{ij})\left(w_i^T w_j+b_i+b_j-\log X_{ij}\right)^2" />
      <p className="text-sm text-muted">Meilleure stabilité, relations globales, bonnes performances sémantiques.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.11 FastText</h3>
      <p className="text-muted">
        Meta — représentation par <strong>sous-mots</strong> (caractères). « intelligence » → in, intel, gence…
      </p>
      <p className="text-sm text-muted">
        Gère mots rares, fautes orthographiques, langues morphologiquement riches.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">5.12 Espaces vectoriels sémantiques</h3>
      <p className="text-muted">Mots proches sémantiquement → proches mathématiquement (clustering).</p>
      <DataTable
        headers={['Groupe', 'Mots']}
        rows={[
          ['Animaux', 'chat, chien, lion'],
          ['Informatique', 'serveur, GPU, CPU'],
          ['Médecine', 'hôpital, médecin'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">5.13 Réduction de dimension</h3>
      <p className="text-muted">Visualisation : PCA, t-SNE, UMAP.</p>
      <h4 className="mt-4 font-semibold text-indigo-800">PCA</h4>
      <p className="text-sm text-muted">Maximiser la variance projetée.</p>
      <MathBlock tex="\text{Var}(X)=\frac{1}{N}\sum_{i=1}^{N}(x_i-\mu)^2" />

      <h3 className="mt-10 text-xl font-bold text-deep">5.14 Limites des embeddings statiques</h3>
      <p className="text-muted">
        Word2Vec et GloVe : <strong>un seul vecteur par mot</strong>. « banque » (financière vs rivière) — même vecteur,
        contexte ignoré.
      </p>
      <Callout variant="important" title="Solution moderne">
        Embeddings <strong>contextuels</strong> : BERT, GPT, Transformers — le vecteur dépend de la phrase.
      </Callout>

      <Accordion title="Exemple Python — gensim Word2Vec" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from gensim.models import Word2Vec

sentences = [
    ["le", "chat", "mange"],
    ["le", "chien", "court"]
]

model = Word2Vec(sentences, vector_size=50, window=2, min_count=1)
print(model.wv["chat"])`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé">
        One-Hot, hypothèse distributionnelle, Word2Vec (CBOW / Skip-Gram), GloVe, FastText, cosinus, espaces
        sémantiques — compréhension, analogies et généralisation linguistique.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi le One-Hot est-il limité ?</li>
        <li>CBOW vs Skip-Gram ?</li>
        <li>Pourquoi les embeddings capturent-ils le sens ?</li>
        <li>Rôle de Softmax ?</li>
        <li>Pourquoi FastText gère-t-il mieux les mots rares ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — One-Hot</p>
      <p className="text-sm font-mono">[&quot;IA&quot;, &quot;NLP&quot;, &quot;Python&quot;]</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <DataTable
          headers={['Mot', 'Vecteur']}
          rows={[
            ['IA', '[1, 0, 0]'],
            ['NLP', '[0, 1, 0]'],
            ['Python', '[0, 0, 1]'],
          ]}
        />
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — Analogie Roi − Homme + Femme</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">
          L’entraînement place des mots de même relation (genre, rôle) dans des directions parallèles dans l’espace ;
          l’arithmétique vectorielle retrouve le mot le plus proche de « reine ».
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Comparer Word2Vec, GloVe, FastText</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <DataTable
          headers={['Modèle', 'Force', 'Limite']}
          rows={[
            ['Word2Vec', 'Contexte local, analogies', 'Un vecteur par mot'],
            ['GloVe', 'Statistiques globales, stable', 'Statique'],
            ['FastText', 'Sous-mots, OOV, fautes', 'Plus lourd à entraîner'],
          ]}
        />
      </Accordion>

      <QuizCard
        question="Skip-Gram par rapport à CBOW…"
        options={[
          { id: 'a', label: 'Prédit le contexte à partir du mot central — mieux pour mots rares', correct: true },
          { id: 'b', label: 'Utilise uniquement des vecteurs one-hot', correct: false },
          { id: 'c', label: 'Ne nécessite pas de fonction Softmax', correct: false },
        ]}
        explanation="Skip-Gram entraîne plus d’exemples par mot rare ; CBOW moyenne le contexte pour prédire le centre."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>VI — Deep Learning pour le NLP</strong> (RNN, LSTM, attention, Transformers, BERT,
        GPT).
      </Callout>
    </>
  )
}
