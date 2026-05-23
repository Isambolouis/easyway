import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'

export function NlpTachesAvanceesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le NLP moderne est partout : moteurs de recherche, assistants, cybersécurité, médecine, finance, éducation,
          robotique, IA générative. Ces applications reposent sur le <strong>Deep Learning</strong>, les{' '}
          <strong>Transformers</strong> et les grands modèles pré-entraînés.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">8.1 Analyse de sentiments</h3>
      <p className="text-muted">Déterminer l’opinion dans un texte — ex. « Ce téléphone est excellent » → positif.</p>
      <DataTable
        headers={['Classe', 'Exemple']}
        rows={[
          ['Positif', '« J’adore ce produit. »'],
          ['Négatif', '« Très mauvaise qualité. »'],
          ['Neutre', '« Le produit est disponible. »'],
        ]}
      />
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Texte → Prétraitement → Vectorisation → Modèle NLP → Classe prédite`}
      </pre>
      <MathBlock tex="P(c\mid d)" />
      <MathBlock tex="L=-[y\log(\hat{y})+(1-y)\log(1-\hat{y})]" />
      <p className="text-sm text-muted">Applications : avis clients, réseaux sociaux, finance, marketing.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.2 Reconnaissance d’entités nommées (NER)</h3>
      <p className="text-muted">Identifie personnes, organisations, lieux, dates, montants.</p>
      <p className="text-sm italic">« Elon Musk visite Paris en 2026. »</p>
      <DataTable
        headers={['Texte', 'Type']}
        rows={[
          ['Elon Musk', 'PERSON'],
          ['Paris', 'LOCATION'],
          ['2026', 'DATE'],
        ]}
      />
      <p className="text-sm text-muted">Architectures : Transformers, BiLSTM-CRF.</p>
      <MathBlock tex="P(Y\mid X)=\frac{1}{Z(X)}\exp\left(\sum_k\lambda_k f_k(Y,X)\right)" />
      <p className="text-xs text-muted">CRF — modélise les dépendances entre étiquettes.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.3 Traduction automatique</h3>
      <DataTable
        headers={['Français', 'Anglais']}
        rows={[['Bonjour', 'Hello']]}
      />
      <p className="text-muted">
        Anciennes approches : règles, statistique, phrase-based. Aujourd’hui : Transformers, attention, Seq2Seq.
      </p>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Phrase source → Encodeur → Vecteur latent → Décodeur → Phrase traduite`}
      </pre>
      <MathBlock tex="P(y\mid x)=\prod_{t=1}^{T}P(y_t\mid y_{<t},x)" />
      <p className="text-sm text-muted">Google Translate, DeepL.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.4 Résumé automatique</h3>
      <DataTable
        headers={['Méthode', 'Principe']}
        rows={[
          ['Extractive', 'Sélection de phrases existantes'],
          ['Abstractive', 'Génération de nouvelles phrases'],
        ]}
      />
      <MathBlock tex="P(\text{summary}\mid\text{document})" />
      <p className="text-sm text-muted">Presse, recherche, juridique, médical.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.5 Question Answering (QA)</h3>
      <DataTable
        headers={['Type', 'Description']}
        rows={[
          ['Extractif', 'Extrait une réponse du contexte'],
          ['Génératif', 'Génère une réponse'],
        ]}
      />
      <Callout variant="definition" title="Exemple">
        <p className="text-sm">
          Contexte : « Kinshasa est la capitale de la RDC. »
          <br />
          Question : « Quelle est la capitale de la RDC ? » → <strong>Kinshasa</strong>
        </p>
      </Callout>
      <MathBlock tex="P(\text{answer}\mid\text{question},\text{context})" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.6 Chatbots et systèmes conversationnels</h3>
      <DataTable
        headers={['Type', 'Technologie']}
        rows={[
          ['Rule-Based', 'Règles'],
          ['Retrieval-Based', 'Recherche de réponses'],
          ['Generative', 'LLMs + mémoire + outils'],
        ]}
      />
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Utilisateur → Compréhension NLP → Gestion dialogue → Génération réponse`}
      </pre>

      <h3 className="mt-10 text-xl font-bold text-deep">8.7 Speech Recognition (ASR)</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Audio → Caractéristiques → Acoustic Model → Language Model → Texte`}
      </pre>
      <p className="text-sm text-muted">MFCC, analyse fréquentielle (FFT).</p>
      <MathBlock tex="X_k=\sum_{n=0}^{N-1}x_n e^{-j2\pi kn/N}" />
      <p className="text-sm text-muted">Assistants vocaux, transcription, sous-titrage.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.8 Text-to-Speech (TTS)</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Texte → Analyse linguistique → Phonèmes → Synthèse vocale → Audio`}
      </pre>
      <p className="text-sm text-muted">Modèles : Tacotron, WaveNet, VITS.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.9 Recherche d’information (IR)</h3>
      <p className="text-muted">Trouver les documents les plus pertinents — moteurs de recherche, bibliothèques.</p>
      <MathBlock tex="\cos(\theta)=\frac{A\cdot B}{|A|\,|B|}" />
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        {`Requête → Vectorisation → Similarité → Classement documents`}
      </pre>

      <h3 className="mt-10 text-xl font-bold text-deep">8.10 Détection de spam</h3>
      <DataTable
        headers={['Message', 'Classe']}
        rows={[
          ['« Gagnez 1 million !!! »', 'Spam'],
          ['« Bonjour professeur »', 'Non-spam'],
        ]}
      />
      <p className="text-sm text-muted">Naive Bayes, SVM, Transformers.</p>
      <MathBlock tex="\hat{y}=\arg\max_c P(c\mid d)" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.11 NLP multimodal</h3>
      <p className="text-muted">Texte + image + audio + vidéo — description d’images, OCR, assistants visuels.</p>
      <MathBlock tex="h=f(h_{\text{text}},h_{\text{image}},h_{\text{audio}})" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.12 IA générative</h3>
      <MathBlock tex="P(x)=\prod_{t=1}^{T}P(x_t\mid x_{<t})" />
      <p className="text-sm text-muted">Texte, images, audio, code — assistants, rédaction, multimédia.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">8.13 Évaluation des systèmes NLP</h3>
      <MathBlock tex="\text{Accuracy}=\frac{TP+TN}{TP+TN+FP+FN}" />
      <MathBlock tex="\text{Precision}=\frac{TP}{TP+FP}" />
      <MathBlock tex="\text{Recall}=\frac{TP}{TP+FN}" />
      <MathBlock tex="F_1=2\times\frac{\text{Precision}\times\text{Recall}}{\text{Precision}+\text{Recall}}" />

      <h3 className="mt-10 text-xl font-bold text-deep">8.14 Limites actuelles</h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
        <li>
          <strong>Hallucinations</strong> — informations inventées
        </li>
        <li>
          <strong>Biais</strong> — culturels, sociaux, linguistiques
        </li>
        <li>
          <strong>Coût énergétique</strong> — GPU massifs, consommation importante
        </li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">8.15 Futur du NLP</h3>
      <p className="text-muted">
        Agents autonomes, IA multimodale, raisonnement avancé, IA embarquée, modèles spécialisés, IA scientifique.
      </p>

      <Accordion title="Exemple Python — sentiment-analysis (Transformers)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("Ce cours de NLP est excellent")
print(result)`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé">
        Sentiments, NER, traduction, résumé, QA, chatbots, ASR, TTS, IR, spam, multimodal, IA générative — dominés par
        Transformers et LLMs.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Résumé extractif vs abstractive ?</li>
        <li>Pourquoi les Transformers dominent la traduction ?</li>
        <li>Rôle de la similarité cosinus ?</li>
        <li>Pourquoi les LLMs hallucinent-ils ?</li>
        <li>Défis éthiques du NLP moderne ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — Chatbots règles vs génératifs</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <DataTable
          headers={['Type', 'Avantage', 'Limite']}
          rows={[
            ['Règles', 'Contrôle, prévisible', 'Ne scale pas, rigide'],
            ['Génératif (LLM)', 'Flexible, naturel', 'Hallucinations, coût'],
          ]}
        />
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — Embeddings en IR</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">
          Représentation dense du sens — requête et documents comparés par similarité cosinus au-delà du mot exact.
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Attention en traduction</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <p className="text-sm text-muted">
          Le décodeur pondère dynamiquement chaque mot source — alignement flexible entre langues, dépendances longues.
        </p>
      </Accordion>

      <QuizCard
        question="Un résumé abstractive…"
        options={[
          { id: 'a', label: 'Génère de nouvelles phrases reformulées', correct: true },
          { id: 'b', label: 'Copie uniquement des phrases du document source', correct: false },
          { id: 'c', label: 'Ne nécessite aucun modèle de langage', correct: false },
        ]}
        explanation="L’extractif sélectionne des phrases existantes ; l’abstractive reformule comme un humain."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>IX — Implémentation pratique du NLP avec Python</strong> (NLTK, spaCy, PyTorch,
        Transformers, pipelines complets).
      </Callout>
    </>
  )
}
