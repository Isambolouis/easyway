import { BayesTheoremWidget } from '@/components/nlp/BayesTheoremWidget'
import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'

export function NlpModelisationProbabilisteView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le langage humain possède une <strong>structure statistique</strong> : les mots ne sont pas aléatoires, ils
          suivent des <strong>dépendances probabilistes</strong>. Après « Le chat », « mange » est probable ; «
          ordinateur » l’est beaucoup moins. Le NLP probabiliste modélise ces dépendances mathématiquement.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">4.1 Probabilité et langage naturel</h3>
      <p className="text-muted">
        Soit une séquence de mots W = (w₁, w₂, …, wₙ). Un modèle de langage calcule la probabilité qu’une phrase
        apparaisse dans une langue :
      </p>
      <MathBlock tex="P(W)=P(w_1,w_2,\ldots,w_n)" />
      <Callout variant="definition" title="Exemple intuitif">
        <p className="text-sm">
          « Le chat mange du poisson. » → <strong>forte</strong> probabilité.
          <br />
          « Poisson mange le du chat. » → <strong>faible</strong> probabilité.
        </p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.2 Règle de la chaîne (Chain Rule)</h3>
      <MathBlock tex="P(w_1,w_2,\ldots,w_n)=\prod_{i=1}^{n}P(w_i\mid w_1,\ldots,w_{i-1})" />
      <p className="text-muted">Chaque mot dépend des mots précédents.</p>
      <MathBlock tex="P(\text{chat mange})=P(\text{chat})\times P(\text{mange}\mid\text{chat})" />
      <Callout variant="important" title="Problème principal">
        Pour de longues phrases, le nombre de dépendances explose — d’où l’<strong>hypothèse de Markov</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.3 Hypothèse de Markov</h3>
      <p className="text-muted">Un mot ne dépend que des mots récents.</p>
      <h4 className="mt-4 font-semibold text-indigo-800">Bigram</h4>
      <MathBlock tex="P(w_i\mid w_1,\ldots,w_{i-1})\approx P(w_i\mid w_{i-1})" />
      <h4 className="mt-4 font-semibold text-indigo-800">Trigram</h4>
      <MathBlock tex="P(w_i\mid w_1,\ldots,w_{i-1})\approx P(w_i\mid w_{i-2},w_{i-1})" />

      <h3 className="mt-10 text-xl font-bold text-deep">4.4 Modèles n-gram</h3>
      <DataTable
        headers={['Type', 'Taille']}
        rows={[
          ['Unigram', '1 mot'],
          ['Bigram', '2 mots'],
          ['Trigram', '3 mots'],
          ['4-gram', '4 mots'],
        ]}
      />
      <p className="mt-2 text-sm text-muted">Phrase : « Le NLP est fascinant »</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-bold text-deep">Unigrams</p>
          <p className="mt-1 font-mono text-xs text-muted">Le · NLP · est · fascinant</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-bold text-deep">Bigrams</p>
          <p className="mt-1 font-mono text-xs text-muted">Le NLP · NLP est · est fascinant</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs font-bold text-deep">Trigrams</p>
          <p className="mt-1 font-mono text-xs text-muted">Le NLP est · NLP est fascinant</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">4.5 Estimation des probabilités n-gram</h3>
      <MathBlock tex="P(w_i\mid w_{i-1})=\frac{\text{Count}(w_{i-1},w_i)}{\text{Count}(w_{i-1})}" />
      <p className="text-sm text-muted">Corpus : « Le chat mange », « Le chat dort »</p>
      <DataTable
        headers={['Expression', 'Count']}
        rows={[
          ['Le chat', '2'],
          ['chat mange', '1'],
          ['chat dort', '1'],
          ['chat', '2'],
        ]}
      />
      <p className="text-sm text-muted">
        P(mange|chat) = 1/2 · P(dort|chat) = 1/2
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.6 Problème des probabilités nulles</h3>
      <p className="text-muted">
        « Le chat pilote un avion » — si Count(chat, pilote) = 0, alors P(pilote|chat) = 0. Une seule probabilité nulle
        annule toute la phrase car P(W) = ∏ P(wᵢ|contexte) et 0 × x = 0.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.7 Lissage (Smoothing)</h3>
      <h4 className="mt-4 font-semibold text-indigo-800">Add-One (Laplace)</h4>
      <MathBlock tex="P(w_i\mid w_{i-1})=\frac{\text{Count}(w_{i-1},w_i)+1}{\text{Count}(w_{i-1})+V}" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['V', 'Taille du vocabulaire'],
          ['Count', 'Fréquence observée'],
        ]}
      />
      <p className="text-sm text-muted">
        Avantage : aucune probabilité nulle. Limite : déforme fortement les probabilités sur les grands corpus.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.8 Entropie du langage</h3>
      <MathBlock tex="H(X)=-\sum_{i=1}^{n}P(x_i)\log_2 P(x_i)" />
      <p className="text-muted">
        Faible entropie → langage prévisible (« Bonjour monsieur »). Forte entropie → imprévisible (« Quantum banane
        galaxie silence »).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.9 Perplexité</h3>
      <MathBlock tex="\text{PP}(W)=P(w_1,w_2,\ldots,w_n)^{-\frac{1}{n}}" />
      <p className="text-muted">
        Faible perplexité → bon modèle ; forte → mauvais modèle. Intuition : nombre moyen de choix sur lesquels le
        modèle hésite.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.10 Théorème de Bayes en NLP</h3>
      <p className="text-muted">
        Très utilisé pour la classification, la détection de spam et l’analyse de sentiments.
      </p>
      <h4 className="mt-4 font-semibold text-indigo-800">Formule fondamentale</h4>
      <BayesTheoremWidget />
      <p className="text-sm text-muted">
        Ex. : calculer P(Spam|message) en inversant les probabilités à partir de P(message|Spam) et P(Spam).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.11 Naive Bayes</h3>
      <p className="text-muted">Hypothèse : les mots sont indépendants conditionnellement à la classe.</p>
      <MathBlock tex="P(c\mid d)\propto P(c)\prod_{i=1}^{n}P(w_i\mid c)" />
      <DataTable
        headers={['Symbole', 'Signification']}
        rows={[
          ['c', 'Classe (spam / ham, positif / négatif…)'],
          ['d', 'Document'],
          ['wᵢ', 'Mot i'],
        ]}
      />
      <p className="text-sm text-muted">Applications : spam, sentiments, catégorisation automatique.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.12 Limites des modèles probabilistes classiques</h3>
      <h4 className="mt-4 font-semibold text-indigo-800">A. Dépendances longues</h4>
      <p className="text-muted">
        « Le livre que j’ai acheté hier est intéressant » — « livre » influence « intéressant » mais plusieurs mots les
        séparent ; les n-grams ne capturent pas cela.
      </p>
      <h4 className="mt-4 font-semibold text-indigo-800">B. Explosion combinatoire</h4>
      <MathBlock tex="\text{Nombre de n-grams possibles} \approx V^n" />
      <p className="text-sm text-muted">V = 100 000, trigram → 100 000³ combinaisons — colossal.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.13 Transition vers le Deep Learning</h3>
      <p className="text-muted">
        Ces limites ont conduit aux embeddings, réseaux neuronaux et Transformers — représentations continues,
        dépendances complexes et relations sémantiques profondes.
      </p>

      <Accordion title="Exemple Python — bigrams simples" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from collections import defaultdict

corpus = ["le chat mange", "le chat dort"]
bigrams = defaultdict(int)

for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        bigram = (words[i], words[i + 1])
        bigrams[bigram] += 1

print(dict(bigrams))
# {('le', 'chat'): 2, ('chat', 'mange'): 1, ('chat', 'dort'): 1}`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé">
        Règle de la chaîne, Markov, n-grams, smoothing, entropie, perplexité, Bayes, Naive Bayes — base historique du
        NLP statistique, avant les embeddings et le Deep Learning.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi utilise-t-on l’hypothèse de Markov ?</li>
        <li>Quel problème résout le smoothing ?</li>
        <li>Pourquoi les n-grams souffrent-ils d’explosion combinatoire ?</li>
        <li>Quelle est l’utilité de la perplexité ?</li>
        <li>Pourquoi Naive Bayes est-il dit « naïf » ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — Bigrams</p>
      <p className="text-sm italic">« Le NLP transforme le monde »</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <p className="font-mono text-sm text-muted">Le NLP · NLP transforme · transforme le · le monde</p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — P(monde|le)</p>
      <p className="text-sm text-muted">Corpus : « le monde change », « le monde évolue »</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">Count(le, monde) = 2, Count(le) = 2 → P(monde|le) = 2/2 = 1.</p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Limites des n-grams</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <p className="text-sm text-muted">
          Contexte limité à n−1 mots, explosion de Vⁿ, données creuses, probabilités nulles sans smoothing, incapacité à
          modéliser les dépendances longues.
        </p>
      </Accordion>

      <QuizCard
        question="Le smoothing (Laplace) sert surtout à…"
        options={[
          { id: 'a', label: 'Éviter les probabilités nulles sur des n-grams jamais vus', correct: true },
          { id: 'b', label: 'Augmenter la taille du vocabulaire', correct: false },
          { id: 'c', label: 'Supprimer les stop words', correct: false },
        ]}
        explanation="Sans lissage, un bigram inconnu met P(W)=0 ; le +1 au numérateur et +V au dénominateur redistribuent une masse de probabilité."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>V — Représentation vectorielle et Word Embeddings</strong> (Word2Vec, CBOW, Skip-Gram,
        GloVe, FastText).
      </Callout>
    </>
  )
}
