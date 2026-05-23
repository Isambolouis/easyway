import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { Accordion } from '@/components/ui/Accordion'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import type { ReactNode } from 'react'
import { NlpModelisationProbabilisteView } from '@/chapters/nlpModelisationProbabiliste'
import { NlpWordEmbeddingsView } from '@/chapters/nlpWordEmbeddings'
import { NlpDeepLearningView } from '@/chapters/nlpDeepLearning'
import { NlpLLMView } from '@/chapters/nlpLLM'
import { NlpTachesAvanceesView } from '@/chapters/nlpTachesAvancees'

export const nlpViews: Record<string, () => ReactNode> = {
  'introduction-nlp': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong className="text-deep">Traitement Automatique du Langage Naturel</strong> (Natural Language
          Processing — NLP) permet aux machines de comprendre, analyser, générer et manipuler le langage humain.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1.1 Définition du NLP</h3>
      <p className="text-muted">
        Branche de l’<strong>Intelligence Artificielle</strong> — interaction homme-machine via le langage naturel.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {['IA', 'Linguistique', 'Mathématiques', 'Statistiques', 'Machine Learning', 'Deep Learning'].map((d) => (
          <span key={d} className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">
            {d}
          </span>
        ))}
      </div>

      <Callout variant="important" title="Exemples concrets au quotidien">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>ChatGPT, Gemini, Claude</li>
          <li>Google Translate, DeepL</li>
          <li>Correction automatique (WhatsApp, Gmail)</li>
          <li>Assistants vocaux (Siri, Alexa)</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1.2 Pourquoi le NLP est-il difficile ?</h3>
      <blockquote className="my-4 border-l-4 border-indigo-400 bg-indigo-50/60 py-3 pl-4 italic text-deep">
        « Le professeur regarde les étudiants avec des lunettes. »
      </blockquote>
      <p className="text-muted">
        Qui porte les lunettes — le professeur ou les étudiants ? Cette <strong>ambiguïté</strong> illustre pourquoi le
        langage est difficile à modéliser pour une machine.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">1.3 Les niveaux d’analyse du langage</h3>

      <h4 className="mt-6 font-semibold text-indigo-800">A. Analyse lexicale</h4>
      <p className="text-muted">Étude des mots — étape de <strong>tokenisation</strong>.</p>
      <DataTable
        headers={['Mot', 'Type']}
        rows={[
          ['Les', 'Déterminant'],
          ['étudiants', 'Nom'],
          ['travaillent', 'Verbe'],
        ]}
      />
      <p className="text-sm text-muted">Phrase : « Les étudiants travaillent. »</p>

      <h4 className="mt-6 font-semibold text-indigo-800">B. Analyse syntaxique</h4>
      <p className="text-muted">Structure grammaticale — arbre syntaxique.</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Sujet → le chat</li>
        <li>Verbe → mange</li>
        <li>Complément → la souris</li>
      </ul>

      <h4 className="mt-6 font-semibold text-indigo-800">C. Analyse sémantique</h4>
      <p className="text-muted">
        « La banque est fermée » — institution financière ou bord de rivière ? Le <strong>contexte</strong> tranche.
      </p>

      <h4 className="mt-6 font-semibold text-indigo-800">D. Analyse pragmatique</h4>
      <p className="text-muted">
        « Il fait froid ici » peut impliquer « Ferme la fenêtre » — intention et situation réelle.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">1.4 Domaines mathématiques du NLP</h3>
      <DataTable
        headers={['Domaine', 'Rôle en NLP']}
        rows={[
          ['Probabilités', 'Prédire le mot suivant, modèles de langage'],
          ['Algèbre linéaire', 'Vecteurs de mots, matrices d’embeddings'],
          ['Statistiques', 'Apprentissage sur millions de phrases'],
        ]}
      />
      <MathBlock tex="P(\text{mange}\mid \text{Le chat})" />
      <p className="text-sm text-muted">Ex. : probabilité que le mot suivant soit « mange » après « Le chat ».</p>

      <h3 className="mt-10 text-xl font-bold text-deep">1.5 Les grandes tâches du NLP</h3>
      <DataTable
        headers={['Tâche', 'Exemple']}
        rows={[
          ['Classification de texte', '« J’adore ce film » → Positif'],
          ['Traduction automatique', 'Bonjour → Hello'],
          ['NER', 'Elon Musk → Personne, Paris → Lieu'],
          ['Génération de texte', 'Résumés, assistants, code'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">1.6 Évolution historique</h3>
      <div className="space-y-4">
        <div className="scroll-x-card rounded-xl border border-slate-200 p-4">
          <p className="font-bold text-deep">A. Symbolique (1950–1980)</p>
          <p className="mt-1 text-sm text-muted">Règles manuelles — limite : complexité impossible à couvrir.</p>
          <pre className="mt-2 rounded-lg bg-slate-100 p-3 text-xs">SI mot = &quot;chien&quot; ALORS catégorie = animal</pre>
        </div>
        <div className="scroll-x-card rounded-xl border border-slate-200 p-4">
          <p className="font-bold text-deep">B. Statistique (1980–2015)</p>
          <p className="mt-1 text-sm text-muted">Naive Bayes, HMM, SVM, n-grams — apprentissage depuis les données.</p>
          <MathBlock tex="P(w_n\mid w_{n-1})" className="!my-2" />
        </div>
        <div className="scroll-x-card rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
          <p className="font-bold text-deep">C. Deep Learning (2015–aujourd’hui)</p>
          <p className="mt-1 text-sm text-muted">RNN, LSTM, Transformers, BERT, GPT — GPU + Big Data.</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">1.7 Pipeline général</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-deep">
        {`Texte brut
   ↓
Nettoyage
   ↓
Tokenisation
   ↓
Vectorisation
   ↓
Modèle ML / DL
   ↓
Prédiction`}
      </pre>

      <Accordion title="Exemple Python — tokenisation simple" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`text = "Le NLP est fascinant"
tokens = text.split()
print(tokens)
# ['Le', 'NLP', 'est', 'fascinant']`}
        </pre>
      </Accordion>

      <h3 className="mt-10 text-xl font-bold text-deep">1.8 Importance actuelle</h3>
      <p className="text-muted">
        Moteurs de recherche, assistants, cybersécurité, médecine, finance, éducation, robotique — les LLM (ChatGPT,
        Gemini, Claude) reposent sur le NLP avancé.
      </p>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>NLP = linguistique + maths + stats + IA</li>
          <li>Symbolique → statistique → Deep Learning / Transformers</li>
          <li>Analyse lexicale, syntaxique, sémantique, pragmatique</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi le langage humain est-il difficile à modéliser ?</li>
        <li>Quelle différence entre syntaxe et sémantique ?</li>
        <li>Pourquoi les probabilités sont-elles importantes en NLP ?</li>
        <li>Symbolique vs approches neuronales ?</li>
        <li>Pourquoi les Transformers ont-ils révolutionné le NLP ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="text-muted font-medium">Exercice 1 — Ambiguïtés</p>
      <blockquote className="my-2 border-l-4 border-amber-300 bg-amber-50/50 py-2 pl-3 text-sm italic">
        « Je vois l’homme avec le télescope. »
      </blockquote>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <p className="text-sm text-muted">
          Qui possède le télescope ? L’observateur ou l’homme observé ? Deux lectures syntaxiques possibles.
        </p>
      </Accordion>

      <p className="mt-4 text-muted font-medium">Exercice 2 — Tokenisation</p>
      <p className="text-sm italic">« L’intelligence artificielle transforme le monde. »</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="font-mono text-sm text-deep">
          [L&apos;, intelligence, artificielle, transforme, le, monde, .] — selon le tokenizer (split simple vs spaCy).
        </p>
      </Accordion>

      <p className="mt-4 text-muted font-medium">Exercice 3 — Applications quotidiennes</p>
      <Accordion title="Exemples de réponses" defaultOpen={false}>
        <ul className="list-disc pl-5 text-sm text-muted">
          <li>Recherche Google</li>
          <li>Autocorrection du clavier</li>
          <li>Filtre anti-spam e-mail</li>
        </ul>
      </Accordion>

      <QuizCard
        question="La tokenisation correspond à…"
        options={[
          { id: 'a', label: 'Découper le texte en unités (mots, sous-mots)', correct: true },
          { id: 'b', label: 'Traduire en anglais', correct: false },
          { id: 'c', label: 'Entraîner un réseau de neurones', correct: false },
        ]}
        explanation="C’est la première étape de l’analyse lexicale — avant stop words et vectorisation."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>II — Fondements linguistiques</strong> (morphologie, syntaxe, sémantique, pragmatique).
      </Callout>
    </>
  ),

  'fondements-linguistiques': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le NLP ne repose pas que sur les maths et l’IA : il s’appuie sur la <strong>linguistique</strong>. Pour
          comprendre une langue, la machine doit saisir la structure des mots et des phrases, le sens et le{' '}
          <strong>contexte</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">2.1 Linguistique computationnelle</h3>
      <p className="text-muted">
        Étude des méthodes pour traiter le langage par ordinateur — <strong>base théorique</strong> du NLP. Le NLP en
        est l’<strong>application pratique</strong> à l’informatique.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.2 Morphologie</h3>
      <p className="text-muted">Structure interne des mots.</p>

      <h4 className="mt-4 font-semibold text-indigo-800">A. Morphèmes</h4>
      <p className="text-sm text-muted">Plus petite unité porteuse de sens.</p>
      <DataTable
        headers={['Mot', 'Décomposition']}
        rows={[
          ['malheureusement', 'mal + heure + use + ment'],
          ['impossible', 'im + possible'],
        ]}
      />

      <h4 className="mt-4 font-semibold text-indigo-800">B. Racine, préfixes, suffixes</h4>
      <DataTable
        headers={['Type', 'Exemple', 'Sens / fonction']}
        rows={[
          ['Racine', 'chantons, chanteur → chant', 'Sens principal'],
          ['Préfixe re-', 'répétition', ''],
          ['Préfixe im-', 'négation', ''],
          ['Suffixe -ment', 'adverbe', ''],
          ['Suffixe -eur', 'agent', ''],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">2.3 Tokenisation</h3>
      <p className="text-muted">Découpage en <strong>tokens</strong> (mots, sous-mots, caractères ou phrases).</p>
      <blockquote className="my-2 border-l-4 border-indigo-300 bg-indigo-50/50 py-2 pl-3 text-sm italic">
        « Le NLP transforme le monde. »
      </blockquote>
      <pre className="rounded-lg bg-slate-100 p-3 font-mono text-sm text-deep">
        [&quot;Le&quot;, &quot;NLP&quot;, &quot;transforme&quot;, &quot;le&quot;, &quot;monde&quot;]
      </pre>

      <h3 className="mt-10 text-xl font-bold text-deep">2.4 Normalisation des textes</h3>
      <p className="text-muted">Majuscules, fautes, accents, ponctuation, emojis — à homogénéiser.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <pre className="rounded-lg border border-slate-200 bg-white p-3 text-sm">J&apos;AIME le NLP !!! 😊</pre>
        <pre className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm">j aime le nlp</pre>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">2.5 Stemming</h3>
      <DataTable
        headers={['Mot', 'Stem']}
        rows={[
          ['manger', 'mang'],
          ['mangera', 'mang'],
          ['mangeons', 'mang'],
        ]}
      />
      <p className="text-sm text-muted">Rapide mais parfois imprécis.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.6 Lemmatisation</h3>
      <DataTable
        headers={['Mot', 'Lemme']}
        rows={[
          ['suis', 'être'],
          ['mangeait', 'manger'],
        ]}
      />
      <DataTable
        headers={['Méthode', 'Résultat', 'Précision']}
        rows={[
          ['Stemming', 'Approximation', 'Moyenne'],
          ['Lemmatisation', 'Mot réel (dictionnaire)', 'Élevée'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">2.7 Syntaxe</h3>
      <p className="text-muted">Organisation grammaticale — « Le chat mange la souris ».</p>
      <DataTable
        headers={['Élément', 'Fonction']}
        rows={[
          ['Le chat', 'Sujet'],
          ['mange', 'Verbe'],
          ['la souris', 'Complément'],
        ]}
      />
      <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
        {`Phrase
├── Sujet → Le chat
├── Verbe → mange
└── Complément → la souris`}
      </pre>
      <p className="mt-2 text-sm text-muted">
        Utile pour traduction, chatbots, résumé, assistants vocaux.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.8 POS Tagging (parties du discours)</h3>
      <DataTable
        headers={['Mot', 'Catégorie']}
        rows={[
          ['Les', 'Déterminant'],
          ['étudiants', 'Nom'],
          ['travaillent', 'Verbe'],
          ['sérieusement', 'Adverbe'],
        ]}
      />
      <p className="text-sm text-muted">Applications : correction, traduction, recherche d’information.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.9 Sémantique</h3>
      <DataTable
        headers={['Notion', 'Exemple']}
        rows={[
          ['Polysémie', 'avocat → fruit ou juriste'],
          ['Synonymie', 'heureux / joyeux'],
          ['Antonymie', 'grand / petit'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">2.10 Similarité sémantique</h3>
      <MathBlock tex="\cos(\theta)=\frac{A\cdot B}{|A|\,|B|}" />
      <p className="text-muted">
        Vecteurs proches pour « roi » et « reine », éloignés pour « roi » et « banane ».
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.11 Pragmatique</h3>
      <p className="text-muted">
        « Peux-tu ouvrir la porte ? » — grammaticalement une question, pragmatiquement une{' '}
        <strong>demande d’action</strong>. « C’est génial… » peut être sincère ou ironique.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.12 Ambiguïtés linguistiques</h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
        <li>
          <strong>Lexicale</strong> — « La souris est sur la table » (animal vs périphérique)
        </li>
        <li>
          <strong>Syntaxique</strong> — « Je vois l’homme avec les jumelles »
        </li>
        <li>
          <strong>Sémantique</strong> — « Il a cassé la banque » (finance vs expression)
        </li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">2.13 Linguistique et Deep Learning</h3>
      <Callout variant="important">
        BERT, GPT n’apprennent pas des règles explicites : ils infèrent la structure depuis des milliards de textes —
        contrairement aux systèmes symboliques.
      </Callout>

      <Accordion title="Exemple spaCy — POS tagging" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import spacy
nlp = spacy.load("fr_core_news_sm")
doc = nlp("Les étudiants apprennent le NLP.")
for token in doc:
    print(token.text, token.pos_)
# Les DET | étudiants NOUN | apprennent VERB | ...`}
        </pre>
      </Accordion>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Morphologie, syntaxe, sémantique, pragmatique, ambiguïtés</li>
          <li>Tokenisation, normalisation, stemming vs lemmatisation</li>
          <li>Base des modèles modernes (vecteurs + contexte)</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi la morphologie est-elle importante en NLP ?</li>
        <li>Stemming vs lemmatisation ?</li>
        <li>Pourquoi le contexte est-il essentiel ?</li>
        <li>Qu’est-ce qu’une ambiguïté lexicale ?</li>
        <li>Pourquoi des vecteurs de mots ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — Racine, préfixe, suffixe</p>
      <p className="text-sm">impossible, reconstruction, lentement</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <ul className="list-disc pl-5 text-sm text-muted">
          <li>impossible : im- (préfixe) + possible (racine)</li>
          <li>reconstruction : re- + construire + -tion</li>
          <li>lentement : lent + -ment (suffixe adverbe)</li>
        </ul>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — POS Tagging</p>
      <p className="text-sm italic">« Les chercheurs développent des modèles intelligents. »</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">
          Les (DET), chercheurs (NOUN), développent (VERB), des (DET), modèles (NOUN), intelligents (ADJ).
        </p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Ambiguïtés</p>
      <Accordion title="Exemples de réponses" defaultOpen={false}>
        <ul className="list-disc pl-5 text-sm text-muted">
          <li>« La banque de la rivière est escarpée. »</li>
          <li>« J&apos;ai vu Paul avec la jumelle de Marie. »</li>
        </ul>
      </Accordion>

      <QuizCard
        question="La lemmatisation par rapport au stemming…"
        options={[
          { id: 'a', label: 'Retourne une forme lexicale correcte (lemme)', correct: true },
          { id: 'b', label: 'Supprime toujours les voyelles', correct: false },
          { id: 'c', label: 'Ne s’applique qu’aux noms propres', correct: false },
        ]}
        explanation="La lemmatisation utilise le contexte et le dictionnaire ; le stemming tronque mécaniquement."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>III — Prétraitement des données textuelles</strong>.
      </Callout>
    </>
  ),

  'preprocessing-texte': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong>prétraitement</strong> est fondamental : le texte brut est souvent bruité, incohérent et non
          structuré. Avant tout modèle, il faut une représentation <strong>exploitable mathématiquement</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">3.1 Pipeline général</h3>
      <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
        {`Texte brut → Nettoyage → Normalisation → Tokenisation
→ Stop words → Stemming / Lemmatisation → Vectorisation → Matrice numérique`}
      </pre>

      <h3 className="mt-10 text-xl font-bold text-deep">3.2 Nettoyage</h3>
      <div className="space-y-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold text-deep">A. Caractères spéciaux</p>
          <p className="font-mono text-xs text-muted">« Le NLP est incroyable !!! 😊 #AI » → « Le NLP est incroyable AI »</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold text-deep">B. Minuscules</p>
          <p className="font-mono text-xs text-muted">NLP → nlp (réduit les doublons)</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold text-deep">C. Espaces</p>
          <p className="font-mono text-xs text-muted">« Bonjour     le monde » → « Bonjour le monde »</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">3.3 Normalisation Unicode</h3>
      <p className="text-muted">Accents, symboles — ex. « école » → « ecole » (selon le modèle).</p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.4 Tokenisation</h3>
      <DataTable
        headers={['Type', 'Exemple']}
        rows={[
          ['Par mots', '["Le", "deep", "learning", "révolutionne", "le", "NLP"]'],
          ['Par phrases', '["Bonjour.", "Comment allez-vous ?"]'],
          ['Sous-mots (Transformers)', '"internationalisation" → ["inter", "national", "isation"]'],
        ]}
      />
      <p className="text-sm text-muted">La sous-tokenisation réduit le vocabulaire et les mots inconnus (OOV).</p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.5 Distribution statistique</h3>
      <MathBlock tex="P(w)=\frac{f(w)}{N}" />
      <p className="text-sm text-muted">
        Corpus : « NLP est puissant. NLP est utile. » — N=6, f(NLP)=2 → P(NLP)=2/6 ≈ 0,333.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.6 Stop words</h3>
      <p className="text-muted">le, la, de, et, un… — peu informatifs, mais attention au contexte.</p>
      <Callout variant="important" title="Limite">
        « Je ne suis <strong>pas</strong> content » — supprimer « pas » détruit le sens (sentiment négatif).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.7 Stemming</h3>
      <DataTable
        headers={['Mot', 'Stem']}
        rows={[
          ['connexion', 'connex'],
          ['connecter', 'connect'],
          ['connecté', 'connect'],
        ]}
      />
      <p className="text-sm text-muted">Porter Stemmer — suffixes retirés itérativement. Limite : « université » → « univers ».</p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.8 Lemmatisation</h3>
      <DataTable
        headers={['Méthode', 'Basée sur', 'Précision']}
        rows={[
          ['Stemming', 'Heuristiques', 'Moyenne'],
          ['Lemmatisation', 'Morphologie + dictionnaire + contexte', 'Élevée'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">3.9 Représentation vectorielle</h3>
      <p className="text-muted">Vocabulaire : chat→0, chien→1, mange→2. One-Hot : chat=[1,0,0], etc.</p>
      <Callout variant="important">
        One-Hot : vecteurs grands, creux, aucune relation sémantique — distance roi/reine = roi/banane.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">3.10 Bag of Words</h3>
      <DataTable
        headers={['Document', 'chat', 'chien', 'mange']}
        rows={[
          ['D1 « chat mange »', '1', '0', '1'],
          ['D2 « chien mange »', '0', '1', '1'],
        ]}
      />
      <MathBlock tex="x_{d,t}=\text{Count}(t,d)" />

      <h3 className="mt-10 text-xl font-bold text-deep">3.11 Fréquence des termes (TF)</h3>
      <MathBlock tex="\text{TF}(t,d)=\frac{f(t,d)}{|d|}" />
      <p className="text-sm text-muted">Doc « NLP NLP IA » : TF(NLP) = 2/3.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">3.12–3.13 TF-IDF</h3>
      <p className="text-muted">Mots trop fréquents partout (système, données) peu discriminants.</p>
      <MathBlock tex="\text{IDF}(t)=\log\left(\frac{N}{\text{DF}(t)}\right)" />
      <MathBlock tex="\text{TF-IDF}(t,d)=\text{TF}(t,d)\times\text{IDF}(t)" />

      <h3 className="mt-10 text-xl font-bold text-deep">3.14 Sparsité</h3>
      <MathBlock tex="\text{Sparsity}=\frac{Z}{M\times N}" />
      <p className="text-sm text-muted">Matrices creuses → mémoire et temps de calcul.</p>

      <Accordion title="3.15 Pipeline Python — scikit-learn TfidfVectorizer" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`from sklearn.feature_extraction.text import TfidfVectorizer

documents = [
    "Le NLP est puissant",
    "Le deep learning transforme le NLP"
]
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(documents)
print(X.toarray())`}
        </pre>
      </Accordion>

      <Callout variant="important" title="Bibliothèques">
        <strong>NLTK</strong>, <strong>spaCy</strong> (prétraitement) · <strong>scikit-learn</strong> (TF-IDF, BoW).
      </Callout>

      <Callout variant="resume" title="Résumé">
        Nettoyage, tokenisation, stop words, stemming/lemmatisation, One-Hot, BoW, TF, TF-IDF — base des modèles NLP
        classiques.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Questions de réflexion</h3>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Pourquoi le nettoyage est-il important ?</li>
        <li>TF vs TF-IDF ?</li>
        <li>Pourquoi matrices creuses ?</li>
        <li>Limites du One-Hot ?</li>
        <li>Avantage de la sous-tokenisation ?</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices</h3>
      <p className="font-medium text-muted">Exercice 1 — Nettoyage</p>
      <p className="text-sm font-mono">« Le NLP est SUPER !!! 😊 »</p>
      <Accordion title="Correction exercice 1" defaultOpen={false}>
        <p className="text-sm text-muted">le nlp est super (minuscules, sans ponctuation/emojis).</p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 2 — TF de « IA »</p>
      <p className="text-sm italic">« IA et NLP sont des domaines de l&apos;IA »</p>
      <Accordion title="Correction exercice 2" defaultOpen={false}>
        <p className="text-sm text-muted">f(IA)=2, |d|=8 → TF(IA) = 2/8 = 0,25 (selon tokenisation).</p>
      </Accordion>

      <p className="mt-4 font-medium text-muted">Exercice 3 — Matrice BoW</p>
      <p className="text-sm">D1 : chat mange · D2 : chien dort</p>
      <Accordion title="Correction exercice 3" defaultOpen={false}>
        <DataTable
          headers={['', 'chat', 'chien', 'mange', 'dort']}
          rows={[
            ['D1', '1', '0', '1', '0'],
            ['D2', '0', '1', '0', '1'],
          ]}
        />
      </Accordion>

      <QuizCard
        question="TF-IDF augmente le poids d’un terme qui est…"
        options={[
          { id: 'a', label: 'Fréquent dans un doc mais rare dans le corpus', correct: true },
          { id: 'b', label: 'Absent de tous les documents', correct: false },
          { id: 'c', label: 'Identique dans tous les documents', correct: false },
        ]}
        explanation="IDF pénalise les termes trop répandus globalement — termes discriminants ressortent."
      />

      <Callout variant="important">
        Chapitre suivant : <strong>IV — Modélisation probabiliste du langage</strong> (n-grams, Bayes, Naive Bayes).
      </Callout>
    </>
  ),

  'modelisation-probabiliste': () => <NlpModelisationProbabilisteView />,
  'representation-texte': () => <NlpModelisationProbabilisteView />,
  'probabilites-nlp': () => <NlpModelisationProbabilisteView />,

  'word-embeddings': () => <NlpWordEmbeddingsView />,

  'deep-learning-nlp': () => <NlpDeepLearningView />,

  'llm-ia-generative': () => <NlpLLMView />,

  'machine-learning-nlp': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une fois le texte vectorisé, on applique des <strong>classifieurs</strong> supervisés — spam, sentiments,
          catégories de documents.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Algorithmes classiques</h3>
      <DataTable
        headers={['Algorithme', 'Usage typique']}
        rows={[
          ['Naive Bayes', 'Spam, sentiments (rapide, baseline solide)'],
          ['SVM', 'Classification texte haute dimension'],
          ['Régression logistique', 'Probabilités, interprétable'],
          ['Arbres / forêts', 'Features tabulaires + texte vectorisé'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Métriques d’évaluation</h3>
      <DataTable
        headers={['Métrique', 'Idée']}
        rows={[
          ['Accuracy', 'Part de bonnes prédictions'],
          ['Precision', 'Parmi les positifs prédits, combien sont vrais'],
          ['Recall', 'Parmi les vrais positifs, combien sont trouvés'],
          ['F1-score', 'Moyenne harmonique precision / recall'],
        ]}
      />
      <MathBlock tex="F_1=2\times\frac{\text{Precision}\times\text{Recall}}{\text{Precision}+\text{Recall}}" />

      <QuizCard
        question="F1 est surtout utile quand…"
        options={[
          { id: 'a', label: 'Les classes sont déséquilibrées', correct: true },
          { id: 'b', label: 'Toutes les classes sont équiprobables', correct: false },
          { id: 'c', label: 'On n’a pas de labels', correct: false },
        ]}
        explanation="F1 équilibre precision et recall — crucial en détection de spam ou de maladies rares."
      />

      <Callout variant="resume">
        Chapitre suivant : <strong>X — Machine Learning classique</strong> (complément), puis annexes.
      </Callout>
    </>
  ),

  'taches-avancees-nlp': () => <NlpTachesAvanceesView />,

  'tp-projets-nlp': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Mise en pratique progressive — de la préparation des données au fine-tuning d’un Transformer.
        </p>
      </FadeIn>

      <DataTable
        headers={['TP', 'Objectif']}
        rows={[
          ['TP 1', 'Prétraitement de texte (NLTK / spaCy)'],
          ['TP 2', 'Classification de sentiments'],
          ['TP 3', 'Construction d’un chatbot'],
          ['TP 4', 'Word Embeddings & similarité'],
          ['TP 5', 'Fine-tuning d’un Transformer'],
        ]}
      />

      <Callout variant="definition" title="Projet final">
        Développer une <strong>application NLP complète</strong> : problème réel, pipeline, modèle, évaluation et démo
        (notebook ou API).
      </Callout>

      <Accordion title="Exemples de sujets de projet" defaultOpen={false}>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Assistant FAQ sur documents internes (RAG)</li>
          <li>Analyse de sentiments sur avis clients</li>
          <li>Extracteur d’entités sur articles de presse</li>
          <li>Résumé automatique de comptes rendus</li>
        </ul>
      </Accordion>

      <Callout variant="resume">
        Chapitre suivant : <strong>X — Machine Learning classique</strong> (complément), puis{' '}
        <strong>annexes</strong> (outils, évaluation, bibliographie).
      </Callout>
    </>
  ),

  'ressources-evaluation': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Stack technique, grille d’évaluation et références pour aller plus loin.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Langages & bibliothèques</h3>
      <DataTable
        headers={['Outil', 'Usage']}
        rows={[
          ['Python', 'Langage principal du cours'],
          ['NLTK', 'Apprentissage, corpus, prétraitement'],
          ['spaCy', 'Pipelines industriels, NER'],
          ['scikit-learn', 'ML classique sur vecteurs'],
          ['PyTorch / TensorFlow', 'Deep Learning'],
          ['Transformers (HF)', 'BERT, GPT, fine-tuning'],
        ]}
      />

      <p className="mt-4 text-sm text-muted">Environnements : Jupyter Notebook, Google Colab.</p>

      <h3 className="mt-8 text-xl font-bold text-deep">Évaluation du cours (Master 1)</h3>
      <DataTable
        headers={['Élément', 'Pondération']}
        rows={[
          ['Interrogations', '20 %'],
          ['Travaux pratiques', '25 %'],
          ['Projet final', '35 %'],
          ['Examen final', '20 %'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Références principales</h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
        <li>Jurafsky & Martin — <em>Speech and Language Processing</em></li>
        <li>Christopher Manning — <em>Foundations of Statistical NLP</em></li>
        <li>Jacob Eisenstein — <em>Introduction to NLP</em></li>
        <li>Yoav Goldberg — <em>Neural Network Methods for NLP</em></li>
        <li>Delip Rao — <em>Natural Language Processing with PyTorch</em></li>
      </ul>

      <Callout variant="resume" title="Objectifs du cours — rappel">
        Comprendre fondements linguistiques et mathématiques, prétraiter et représenter le texte, implémenter modèles
        classiques et deep, construire des applications (chatbot, sentiments, traduction…) avec NLTK, spaCy, PyTorch et
        Transformers.
      </Callout>
    </>
  ),
}
