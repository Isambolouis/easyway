import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { Accordion } from '@/components/ui/Accordion'
import { MathBlock } from '@/components/ui/MathBlock'
import { ProbabilitesFinalExam } from '@/components/probabilites/ProbabilitesFinalExam'

export function ProbabilitesExercicesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Cette leçon regroupe le <strong className="text-deep">sujet d’examen final</strong> et des exercices
          corrigés couvrant tout le parcours probabilités + IA.
        </p>
      </FadeIn>

      <ProbabilitesFinalExam />

      <h3 className="mt-10 text-xl font-bold text-deep">Exercices fondamentaux (rappels)</h3>

      <Accordion title="Exercice — Dé à 6 faces">
        <p className="text-muted">A = « nombre ≥ 4 ». Calculer P(A) et P(Ā).</p>
        <MathBlock tex="P(A) = \frac{3}{6} = \frac{1}{2}, \quad P(\overline{A}) = \frac{1}{2}" />
      </Accordion>

      <Accordion title="Exercice — Combinaisons">
        <p className="text-muted">Tirer 3 boules parmi 10 sans ordre :</p>
        <MathBlock tex="C_{10}^3 = \frac{10!}{3! \cdot 7!} = 120" />
      </Accordion>

      <Accordion title="Exercice — Indépendance">
        <p className="text-muted">P(A)=0,3, P(B)=0,5, P(A∩B)=0,15. A et B sont-ils indépendants ?</p>
        <MathBlock tex="P(A)P(B) = 0{,}15 = P(A \cap B) \Rightarrow \text{oui, indépendants}" />
      </Accordion>

      <Callout variant="important" title="Études de cas">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Filtrage spam : Naive Bayes</li>
          <li>Files d’attente : Poisson</li>
          <li>Score de crédit : calibration probabiliste</li>
        </ul>
      </Callout>
    </>
  )
}

export function ProbabilitesProjetFinalView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong className="text-deep">projet final</strong> consolide théorie et pratique : analyse de données,
          simulation et composant probabiliste en Python.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1. Analyse probabiliste de données</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Charger un jeu de données (CSV)</li>
        <li>Estimer moyenne, variance, histogrammes</li>
        <li>Comparer à une loi théorique (binomiale, normale)</li>
      </ul>

      <h3 className="mt-8 text-xl font-bold text-deep">2. Mini système IA probabiliste</h3>
      <p className="text-muted">
        Classifier des textes courts (spam / non-spam) avec <code>sklearn.naive_bayes.MultinomialNB</code> ou
        implémentation manuelle de Bayes.
      </p>

      <h3 className="mt-8 text-xl font-bold text-deep">3. Simulation Monte-Carlo</h3>
      <p className="text-muted">Estimer π, une probabilité complexe ou une intégrale par tirages aléatoires.</p>

      <h3 className="mt-8 text-xl font-bold text-deep">4. Projet Python — squelette</h3>
      <pre className="scroll-x-card overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100">
        {`# projet_probabilites.py
# 1. stats descriptives + visualisation
# 2. estimateur Monte-Carlo
# 3. classifieur Naive Bayes + métriques (precision, recall)
# 4. rapport : interprétation probabiliste des résultats`}
      </pre>

      <Callout variant="resume" title="Livrables attendus">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Notebook ou script Python commenté</li>
          <li>Graphiques (histogramme, convergence Monte-Carlo)</li>
          <li>Rapport court (3–5 pages) : modèle, formules, résultats</li>
        </ul>
      </Callout>
    </>
  )
}
