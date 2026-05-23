import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { BayesTheoremWidget } from '@/components/probabilites/BayesTheoremWidget'
import { ConditionalProbabilityWidget } from '@/components/probabilites/ConditionalProbabilityWidget'
import { NaiveBayesSpamWidget } from '@/components/probabilites/NaiveBayesSpamWidget'
import { ClassificationProbWidget } from '@/components/probabilites/ClassificationProbWidget'

export function ProbabilitesMLView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Ce chapitre relie les probabilités au <strong className="text-deep">machine learning</strong> : comment les
          formules servent dans les systèmes intelligents (spam, diagnostic, classification).
        </p>
        <p className="mt-2 text-sm text-muted">
          Prérequis utiles :{' '}
          <Link to="/cours/probabilites/probabilite-conditionnelle" className="font-semibold text-emerald-700 underline">
            Ch. 4 — Conditionnelle
          </Link>
          ,{' '}
          <Link to="/cours/probabilites/theoreme-bayes" className="font-semibold text-emerald-700 underline">
            Ch. 5 — Bayes
          </Link>
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Idée générale</h3>
      <p className="text-muted">En machine learning probabiliste, on ne dit pas seulement « ceci est spam », mais :</p>
      <MathBlock tex="P(\text{Spam}|\text{Email}) = 0{,}97" />
      <Callout variant="important">
        Le modèle produit des <strong>prédictions probabilistes</strong> — avec un degré de confiance.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.1 Filtrage de spam (Naive Bayes)</h3>
      <p className="text-muted">Objectif : calculer <strong>P(Spam | Mots)</strong>.</p>
      <p className="text-sm text-muted">
        Email contenant par ex. : « gratuit », « argent », « gagne ».
      </p>

      <h4 className="mt-4 font-semibold text-deep">Formule de Bayes</h4>
      <MathBlock tex="P(\text{Spam}|M) = \frac{P(M|\text{Spam})\,P(\text{Spam})}{P(M)}" />

      <h4 className="mt-4 font-semibold text-deep">Hypothèse naïve</h4>
      <p className="text-muted">Les mots sont supposés indépendants sachant la classe :</p>
      <MathBlock tex="P(M|\text{Spam}) \approx P(m_1|\text{Spam})\,P(m_2|\text{Spam}) \cdots P(m_n|\text{Spam})" />

      <p className="text-muted">Décision : comparer P(Spam | Mots) et P(Non-spam | Mots) — choisir le plus grand.</p>

      <NaiveBayesSpamWidget />

      <BayesTheoremWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">2.2 Diagnostic médical</h3>
      <p className="text-muted">
        Patient : fièvre, toux, fatigue. On cherche <strong>P(Maladie | Symptômes)</strong>.
      </p>
      <p className="text-sm text-muted">Ex. : grippe G, symptômes S = fièvre + toux.</p>
      <MathBlock tex="P(G|S) = \frac{P(S|G)\,P(G)}{P(S)}" />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li><strong>P(G)</strong> = fréquence de la grippe dans la population</li>
        <li><strong>P(S|G)</strong> = probabilité des symptômes si grippe</li>
        <li><strong>P(G|S)</strong> = probabilité de grippe sachant les symptômes</li>
      </ul>
      <p className="text-muted">Si P(G|S) dépasse un seuil → diagnostic positif.</p>
      <ConditionalProbabilityWidget
        title="Analogie diagnostic — P(maladie | symptômes)"
        initialPB={0.35}
        initialPAB={0.28}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">2.3 Classification (machine learning)</h3>
      <p className="text-muted">Classer un objet dans une catégorie :</p>
      <DataTable
        headers={['Données x', 'Classe y']}
        rows={[
          ['Email', 'spam / non spam'],
          ['Image', 'chat / chien'],
          ['Patient', 'malade / sain'],
        ]}
      />
      <MathBlock tex="\hat{y} = \arg\max_y P(y|x)" />
      <p className="text-sm text-muted">
        <strong>x</strong> = features · <strong>y</strong> = classe · on prend la classe de probabilité maximale.
      </p>
      <ClassificationProbWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">2.4 Exemple IA simple</h3>
      <p className="text-muted">Email avec « offre », « gratuit » → calculer P(Spam|x) vs P(Non-spam|x).</p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Si P(Spam|x) &gt; P(Non-spam|x) → classé spam</li>
        <li>Sinon → boîte normale</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">2.5 Pourquoi les probabilités en IA ?</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold text-deep">Sans probabilités</p>
          <p className="mt-1 text-sm text-muted">IA rigide — règles fixes, peu adaptée au bruit.</p>
        </div>
        <div className="scroll-x-card rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <p className="font-semibold text-deep">Avec probabilités</p>
          <p className="mt-1 text-sm text-muted">
            Gestion de l’incertitude, décisions robustes, apprentissage sur données, généralisation.
          </p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">2.6 Résumé global</h3>
      <Callout variant="resume">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ IA = calcul de probabilités</li>
          <li>✔ Classification = argmax de P(y|x)</li>
          <li>✔ Spam = Bayes + Naive Bayes</li>
          <li>✔ Diagnostic = probabilité conditionnelle</li>
          <li>✔ Naive Bayes = indépendance des features sachant la classe</li>
        </ul>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Formule clé</h3>
      <MathBlock tex="P(y|x) = \frac{P(x|y)\,P(y)}{P(x)}" />

      <h3 className="mt-8 text-xl font-bold text-deep">Compléments (cours avancé)</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li><strong>Régression probabiliste</strong> — prédire une distribution, pas seulement un point</li>
        <li><strong>Réseaux bayésiens</strong> — graphes de dépendances entre variables</li>
        <li><strong>Inférence</strong> — MLE, MAP, intervalles de confiance</li>
      </ul>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          Approfondir le <Link to="/cours/probabilites/theoreme-bayes" className="font-semibold text-emerald-700 underline">Ch. 5 — Bayes</Link>, les{' '}
          <Link to="/cours/probabilites/inference-variationnelle" className="font-semibold text-emerald-700 underline">inférence variationnelle</Link>{' '}
          (softmax, cross-entropy), ou un TP Python Naive Bayes.
        </p>
      </Callout>

      <QuizCard
        question="En classification probabiliste, la prédiction est…"
        options={[
          { id: 'a', label: 'La classe avec P(y|x) maximal', correct: true },
          { id: 'b', label: 'Toujours la classe 0', correct: false },
          { id: 'c', label: 'La moyenne des features', correct: false },
          { id: 'd', label: 'Le premier mot du texte', correct: false },
        ]}
        explanation="ŷ = argmax_y P(y|x) : on choisit la classe la plus probable."
      />
    </>
  )
}
