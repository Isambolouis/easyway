import { Link } from 'react-router-dom'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { DataTable } from '@/components/ui/DataTable'
import {
  BernoulliLawWidget,
  BinomialLawWidget,
  CoinExamBinomialWidget,
  GeometricLawWidget,
  PoissonLawWidget,
} from '@/components/probabilites/DiscreteLawsWidgets'

export function ProbabilitesLoisDiscretesView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 7 — Lois de probabilité discrètes</strong> : modèles incontournables
          en probabilités, statistiques et machine learning (clics, spam, trafic, conversions…).
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">7.1 Idée générale</h3>
      <p className="text-muted">
        Une <strong>loi de probabilité</strong> décrit comment une variable aléatoire se répartit sur ses valeurs
        possibles.
      </p>
      <Callout variant="important">« Quelle est la probabilité de chaque valeur possible ? »</Callout>
      <p className="text-muted">Exemple — dé équilibré :</p>
      <MathBlock tex="P(X=x)=\frac{1}{6},\quad x\in\{1,2,3,4,5,6\}" />

      <h3 className="mt-10 text-xl font-bold text-deep">7.2 Loi de Bernoulli</h3>
      <p className="text-muted">
        Une expérience à <strong>deux issues</strong> : succès (1) ou échec (0). On note X ~ B(p) avec p = probabilité
        de succès.
      </p>
      <MathBlock tex="P(X=1)=p,\quad P(X=0)=1-p" />
      <BernoulliLawWidget />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Clic sur une publicité (oui / non)</li>
        <li>Test médical positif (oui / non)</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">7.3 Loi binomiale</h3>
      <p className="text-muted">
        <strong>Nombre de succès</strong> sur n répétitions <strong>indépendantes</strong> de Bernoulli. On note X ~
        B(n, p).
      </p>
      <MathBlock tex="P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}" />
      <p className="text-muted">
        Exemple : on lance une pièce 5 fois, p = 0,5, X = nombre de Pile. Ici k = nombre de succès et{' '}
        <strong>C(n, k)</strong> compte les positions des succès.
      </p>
      <BinomialLawWidget initialN={5} initialP={0.5} initialK={3} />
      <Callout variant="definition" title="Applications IA">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Nombre de clics sur un site</li>
          <li>Emails spam dans une boîte</li>
          <li>Clients convertis sur n visites</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">7.4 Loi géométrique</h3>
      <p className="text-muted">
        Nombre d’essais <strong>avant le premier succès</strong> (attente du premier « oui »).
      </p>
      <MathBlock tex="P(X=k)=(1-p)^{k-1}p" />
      <GeometricLawWidget />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Premier clic publicitaire</li>
        <li>Premier défaut sur une chaîne de production</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">7.5 Loi de Poisson</h3>
      <p className="text-muted">
        Modélise le <strong>nombre d’événements rares</strong> sur un intervalle (temps, surface, volume). Paramètre λ =
        taux moyen.
      </p>
      <MathBlock tex="P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!}" />
      <PoissonLawWidget initialLambda={3} />
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Appels par minute, erreurs système, visiteurs web</li>
        <li>Détection d’anomalies, trafic réseau</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">7.6 Comparaison des lois</h3>
      <DataTable
        headers={['Loi', 'Situation', 'Usage']}
        rows={[
          ['Bernoulli', '1 essai', 'Succès / échec'],
          ['Binomiale', 'n essais indépendants', 'Nombre de succès'],
          ['Géométrique', 'Attente', 'Premier succès'],
          ['Poisson', 'Événements rares', 'Comptage dans le temps'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">7.7 Résumé important</h3>
      <Callout variant="resume">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Bernoulli = 1 test</li>
          <li>✔ Binomiale = répétitions indépendantes</li>
          <li>✔ Géométrique = attente du premier succès</li>
          <li>✔ Poisson = événements rares (λ = moyenne)</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">7.8 Exercice type examen</h3>
      <Accordion title="Pièce 4 fois — probabilité d’exactement 2 Pile" defaultOpen>
        <p className="text-muted">On utilise la loi binomiale avec n = 4, p = 0,5, k = 2.</p>
        <MathBlock tex="P(X=2)=\binom{4}{2}(0.5)^2(0.5)^2" className="!my-2" />
        <MathBlock tex="\binom{4}{2}=6 \quad\Rightarrow\quad P(X=2)=6\times0.25\times0.25=0.375" className="!my-2" />
        <CoinExamBinomialWidget />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : P(X = 2) = 0,375 (37,5 %)
        </p>
      </Accordion>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          <Link
            to="/cours/probabilites/variables-aleatoires-continues"
            className="font-semibold text-emerald-700 underline"
          >
            Chapitre 8 — Variables aléatoires continues
          </Link>
          , exercices difficiles sur les lois, ou simulation Python (binomiale + Poisson).
        </p>
      </Callout>

      <QuizCard
        question="λ appels/minute en moyenne, événements indépendants et rares : quelle loi pour le nombre d’appels en 1 minute ?"
        options={[
          { id: 'a', label: 'Bernoulli', correct: false },
          { id: 'b', label: 'Binomiale', correct: false },
          { id: 'c', label: 'Poisson P(λ)', correct: true },
          { id: 'd', label: 'Géométrique', correct: false },
        ]}
        explanation="Comptage d’événements rares sur un intervalle fixe → Poisson. La binomiale modélise n essais à deux issues."
      />
    </>
  )
}
