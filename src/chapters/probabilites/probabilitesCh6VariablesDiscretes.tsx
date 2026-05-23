import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import { DieLawWidget, GainExerciseLawWidget } from '@/components/probabilites/DiscreteRVPlayground'

export function ProbabilitesVariablesDiscretesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 6 — Variables aléatoires discrètes</strong> : fondement pour l’IA,
          les statistiques et la data science — transformer le hasard en nombres et en lois.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">6.1 Définition intuitive</h3>
      <p className="text-muted">
        Une <strong>variable aléatoire</strong> est une fonction qui associe un <strong>nombre</strong> à chaque
        résultat d’une expérience aléatoire.
      </p>
      <Callout variant="important">On transforme le hasard en nombres.</Callout>
      <p className="text-muted">
        Exemple : on lance un dé et X = résultat du dé. Alors X ∈ {'{1, 2, 3, 4, 5, 6}'}.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.2 Variable aléatoire discrète</h3>
      <p className="text-muted">
        La variable est <strong>discrète</strong> si elle prend un ensemble <strong>fini ou dénombrable</strong> de
        valeurs.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Résultat d’un dé ou d’une pièce (après codage)</li>
        <li>Nombre de clients, clics, erreurs dans un système</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">6.3 Loi de probabilité</h3>
      <p className="text-muted">À chaque valeur xᵢ est associée une probabilité pᵢ = P(X = xᵢ).</p>
      <MathBlock tex="P(X=x)=\frac{1}{6},\quad x\in\{1,2,3,4,5,6\} \quad \text{(dé équilibré)}" />

      <DieLawWidget />

      <h3 className="mt-10 text-xl font-bold text-deep">6.4 Condition importante</h3>
      <MathBlock tex="\sum_i P(X=x_i) = 1" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.5 Espérance mathématique</h3>
      <p className="text-muted">L’espérance est la <strong>moyenne théorique</strong> (pondérée par les probabilités).</p>
      <MathBlock tex="E(X)=\sum_i x_i\,P(X=x_i)" />
      <p className="text-sm text-muted">Exemple — dé équilibré :</p>
      <MathBlock tex="E(X)=\frac{1+2+3+4+5+6}{6}=3{,}5" />
      <Callout variant="definition">
        On n’obtient jamais 3,5 sur un seul lancer — c’est la valeur moyenne sur <strong>beaucoup</strong> de lancers.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6.6 Variance</h3>
      <p className="text-muted">La variance mesure la <strong>dispersion</strong> autour de la moyenne.</p>
      <MathBlock tex="V(X)=E\left[(X-E(X))^2\right]" />
      <p className="text-muted">Forme pratique :</p>
      <MathBlock tex="V(X)=E(X^2)-[E(X)]^2" />

      <h4 className="mt-4 font-semibold text-emerald-800">Exemple — dé</h4>
      <MathBlock tex="E(X)=3{,}5" />
      <MathBlock tex="E(X^2)=\frac{1^2+2^2+3^2+4^2+5^2+6^2}{6}=\frac{91}{6}" />
      <MathBlock tex="V(X)=\frac{91}{6}-3{,}5^2=\frac{35}{12}" />

      <h3 className="mt-10 text-xl font-bold text-deep">6.7 Écart-type</h3>
      <MathBlock tex="\sigma=\sqrt{V(X)}" />
      <p className="text-sm text-muted">Exemple : σ = √(35/12) ≈ 1,71.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">6.8 Interprétation intuitive</h3>
      <DataTable
        headers={['Mesure', 'Rôle']}
        rows={[
          ['Espérance', 'Centre des valeurs'],
          ['Variance', 'Dispersion (en unités²)'],
          ['Écart-type', 'Dispersion dans la même unité que X'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">6.9 Application en IA</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Modéliser le bruit et l’incertitude</li>
        <li>Analyser et résumer des données</li>
        <li>Construire des modèles probabilistes</li>
      </ul>
      <DataTable
        headers={['Contexte', 'Variable X']}
        rows={[
          ['Spam', 'Nombre de mots « spam » dans un email'],
          ['Médical', 'Nombre de symptômes présents'],
          ['ML', 'E[Loss] = perte moyenne attendue'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">6.10 Mini exercice type examen</h3>
      <Accordion title="Gain au dé : pair +2, impair −1 — calculer E(X)" defaultOpen>
        <p className="text-muted">
          On lance un dé. X = +2 si pair, X = −1 si impair. P(pair) = P(impair) = 3/6.
        </p>
        <MathBlock
          tex="E(X)=2\times\frac{3}{6}+(-1)\times\frac{3}{6}=\frac{6}{6}-\frac{3}{6}=\frac{1}{2}"
          className="!my-2"
        />
        <GainExerciseLawWidget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : E(X) = 0,5
        </p>
      </Accordion>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Variable aléatoire = fonction du hasard → nombre</li>
          <li>✔ Loi de probabilité = distribution (table ou formule)</li>
          <li>✔ Espérance = moyenne théorique</li>
          <li>✔ Variance = dispersion · écart-type = √V(X)</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link to="/cours/probabilites/lois-discretes" className="font-semibold text-emerald-700 underline">
            Chapitre 7 — Lois de probabilité
          </Link>{' '}
          (Bernoulli, binomiale, Poisson…), exercices examen ou simulation Python.
        </p>
      </Callout>

      <QuizCard
        question="Dé équilibré : quelle est E(X) ?"
        options={[
          { id: 'a', label: '3', correct: false },
          { id: 'b', label: '3,5', correct: true },
          { id: 'c', label: '4', correct: false },
          { id: 'd', label: '21', correct: false },
        ]}
        explanation="E(X) = (1+2+3+4+5+6)/6 = 21/6 = 3,5."
      />
    </>
  )
}
