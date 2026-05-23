import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { Link } from 'react-router-dom'
import { Accordion } from '@/components/ui/Accordion'
import { ConditionalProbabilityWidget } from '@/components/probabilites/ConditionalProbabilityWidget'
import { MultiplicationFormulaWidget } from '@/components/probabilites/MultiplicationFormulaWidget'
import { IndependentEventsWidget } from '@/components/probabilites/IndependentEventsWidget'

export function ProbabilitesConditionnelleView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 4 — Probabilité conditionnelle</strong> : pilier de l’IA, du
          diagnostic médical, du filtrage de spam et du machine learning.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">4.1 Idée intuitive</h3>
      <p className="text-muted">
        La probabilité conditionnelle répond à : <em>quelle est la probabilité de A sachant que B est déjà réalisé ?</em>
      </p>
      <p className="text-muted">
        On lit <strong>P(A|B)</strong> : « probabilité de A sachant B ».
      </p>
      <Callout variant="important" title="Exemple intuitif">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>A = être malade</li>
          <li>B = avoir de la fièvre</li>
          <li>On cherche P(A|B) : probabilité d’être malade <strong>sachant qu’on a déjà la fièvre</strong></li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.2 Définition mathématique</h3>
      <p className="text-muted">La probabilité conditionnelle est définie par (P(B) &gt; 0) :</p>
      <ConditionalProbabilityWidget />

      <h4 className="mt-4 font-semibold text-deep">Interprétation</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li><strong>A ∩ B</strong> = cas où A et B se réalisent ensemble</li>
        <li><strong>P(B)</strong> = nouvel univers (on sait que B est arrivé)</li>
      </ul>

      <h3 className="mt-10 text-xl font-bold text-deep">4.3 Exemple simple — le dé</h3>
      <p className="text-muted">
        A = pair = {'{2,4,6}'}, B = nombre ≥ 4 = {'{4,5,6}'}.
      </p>

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 1 — intersection</h4>
      <MathBlock tex="A \cap B = \{4, 6\}" />

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 2 — probabilités</h4>
      <MathBlock tex="P(A \cap B) = \frac{2}{6}, \quad P(B) = \frac{3}{6}" />

      <h4 className="mt-4 font-semibold text-emerald-800">Étape 3 — formule</h4>
      <ConditionalProbabilityWidget
        title="Exemple du dé — P(pair | ≥ 4)"
        initialPB={3 / 6}
        initialPAB={2 / 6}
      />

      <h4 className="mt-4 font-semibold text-emerald-800">Résultat</h4>
      <MathBlock tex="P(A|B) = \frac{2/6}{3/6} = \frac{2}{3}" />

      <h3 className="mt-10 text-xl font-bold text-deep">4.4 Signification profonde</h3>
      <p className="text-muted">
        Sans condition : on regarde tout l’univers. Avec la condition B : on <strong>réduit l’univers à B</strong> — on
        « zoome » sur un sous-ensemble.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">4.5 Formule de multiplication</h3>
      <p className="text-muted">En réarrangeant la définition :</p>
      <MathBlock tex="P(A \cap B) = P(A|B)\,P(B) = P(B|A)\,P(A)" />
      <MultiplicationFormulaWidget />

      <Callout variant="important">Très importante en IA et statistiques (chaînes de décisions, modèles génératifs).</Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4.6 Indépendance (cas spécial)</h3>
      <p className="text-muted">A et B sont <strong>indépendants</strong> si :</p>
      <MathBlock tex="P(A|B) = P(A)" />
      <p className="text-muted">Équivalent :</p>
      <MathBlock tex="P(A \cap B) = P(A)\,P(B)" />
      <p className="text-sm text-muted">Ex. : deux lancers de dé — le premier n’influence pas le second.</p>
      <IndependentEventsWidget initialPA={1 / 6} initialPB={1 / 6} />

      <h3 className="mt-10 text-xl font-bold text-deep">4.7 Exemple concret — cartes</h3>
      <p className="text-muted">A = roi, B = carte rouge. Rois rouges = 2, cartes rouges = 26.</p>
      <MathBlock tex="P(A \cap B) = \frac{2}{52}, \quad P(B) = \frac{26}{52}" />
      <ConditionalProbabilityWidget
        title="Cartes — P(roi | rouge)"
        initialPB={26 / 52}
        initialPAB={2 / 52}
      />
      <MathBlock tex="P(A|B) = \frac{2/52}{26/52} = \frac{1}{13}" />

      <h3 className="mt-10 text-xl font-bold text-deep">4.8 Exercice type examen — urne</h3>
      <Accordion title="Urne : P(rouge | pas blanche) ?" defaultOpen>
        <p className="text-muted">
          3 rouges, 2 noires, 5 blanches. On tire une boule ; on sait qu’elle n’est pas blanche.
        </p>
        <p className="mt-2 text-sm text-muted">Non blanches = 5 boules sur 10 → P(B) = 5/10.</p>
        <MathBlock tex="P(R \cap B) = \frac{3}{10}" className="!my-2" />
        <ConditionalProbabilityWidget initialPB={5 / 10} initialPAB={3 / 10} />
        <MathBlock tex="P(R|B) = \frac{3/10}{5/10} = \frac{3}{5}" className="!my-2" />
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : 3/5
        </p>
      </Accordion>

      <Callout variant="resume" title="Résumé du chapitre">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Probabilité conditionnelle = raisonner « dans un contexte donné »</li>
          <li>P(A|B) = P(A∩B) / P(B)</li>
          <li>Indépendance : pas d’influence entre A et B</li>
          <li>Très utilisé en IA (Naive Bayes, etc.)</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          Voir les <strong>applications en machine learning</strong> (spam, diagnostic, classification) dans le{' '}
          <Link to="/cours/probabilites/probabilites-machine-learning" className="font-semibold text-emerald-700 underline">
            Ch. 13 — Probabilités &amp; ML
          </Link>
          , puis le <strong>Chapitre 5 — Théorème de Bayes</strong> pour l’approfondissement formel.
        </p>
      </Callout>

      <QuizCard
        question="Dé : A = pair, B = ≥ 4. Quelle est P(A|B) ?"
        options={[
          { id: 'a', label: '1/2', correct: false },
          { id: 'b', label: '2/3', correct: true },
          { id: 'c', label: '1/3', correct: false },
          { id: 'd', label: '3/4', correct: false },
        ]}
        explanation="A∩B = {4,6}, P(B)=3/6 → P(A|B) = (2/6)/(3/6) = 2/3."
      />
    </>
  )
}
