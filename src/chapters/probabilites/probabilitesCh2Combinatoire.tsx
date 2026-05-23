import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { Accordion } from '@/components/ui/Accordion'

export function ProbabilitesCombinatoireView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Chapitre 2 — Analyse combinatoire</strong> : compter correctement les cas
          possibles, condition indispensable pour appliquer les probabilités classiques.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">2.1 Pourquoi la combinatoire ?</h3>
      <p className="text-muted">En probabilités, on utilise souvent :</p>
      <MathBlock tex="P(A) = \frac{\text{cas favorables}}{\text{cas possibles}}" />
      <Callout variant="important">
        Le vrai défi est de <strong>compter les cas possibles sans se tromper</strong> — c’est le rôle de la
        combinatoire.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2.2 Principe fondamental de dénombrement</h3>
      <p className="text-muted">
        Si une action se fait en plusieurs étapes successives (étape 1 : n₁ choix, étape 2 : n₂ choix, étape 3 : n₃
        choix…), alors :
      </p>
      <MathBlock tex="N = n_1 \times n_2 \times n_3" />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple — code à 3 chiffres</h4>
      <p className="text-muted">Chaque position : 10 chiffres possibles (0 à 9).</p>
      <MathBlock tex="N = 10 \times 10 \times 10 = 1000" />
      <p className="text-sm font-medium text-deep">Il y a donc 1000 codes possibles.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.3 Factorielle</h3>
      <Callout variant="definition" title="Définition">
        La factorielle de n, notée n!, est le produit des entiers de 1 à n. Par convention : 0! = 1.
      </Callout>
      <MathBlock tex="n! = n \times (n-1) \times (n-2) \times \cdots \times 1" />
      <p className="mt-2 text-sm text-muted">Exemples :</p>
      <MathBlock tex="5! = 5 \times 4 \times 3 \times 2 \times 1 = 120" />
      <MathBlock tex="3! = 3 \times 2 \times 1 = 6" />

      <h3 className="mt-10 text-xl font-bold text-deep">2.4 Permutations</h3>
      <p className="text-muted">
        Une <strong>permutation</strong> est un arrangement de <strong>tous</strong> les éléments dans un ordre
        différent. Pour n éléments distincts :
      </p>
      <MathBlock tex="P_n = n!" />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple — 4 livres sur une étagère</h4>
      <MathBlock tex="4! = 4 \times 3 \times 2 \times 1 = 24" />
      <p className="text-sm font-medium text-deep">24 ordonnancements possibles.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">2.5 Arrangements</h3>
      <p className="text-muted">
        Un <strong>arrangement</strong> : choisir <strong>p éléments parmi n</strong> en tenant compte de{' '}
        <strong>l’ordre</strong>.
      </p>
      <MathBlock tex="A_n^p = \frac{n!}{(n-p)!}" />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple — podium (1ʳᵉ et 2ᵉ place)</h4>
      <p className="text-muted">Choisir 2 personnes parmi 5, l’ordre compte.</p>
      <MathBlock tex="A_5^2 = \frac{5!}{3!} = 20" />

      <h3 className="mt-10 text-xl font-bold text-deep">2.6 Combinaisons</h3>
      <p className="text-muted">
        Une <strong>combinaison</strong> : choisir p éléments parmi n <strong>sans tenir compte de l’ordre</strong>.
      </p>
      <MathBlock tex="C_n^p = \binom{n}{p} = \frac{n!}{p!\,(n-p)!}" />

      <h4 className="mt-6 font-semibold text-emerald-800">Exemple — groupe de 2 parmi 5</h4>
      <MathBlock tex="C_5^2 = \frac{5!}{2!\,3!} = 10" />
      <p className="text-sm text-muted">Ici l’ordre ne compte pas : {'{A, B}'} = {'{B, A}'}.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">Différence clé</h3>
      <DataTable
        headers={['Concept', 'Ordre important ?', 'Formule']}
        rows={[
          ['Permutation', 'Oui (tous les éléments)', 'n!'],
          ['Arrangement', 'Oui (p parmi n)', 'n! / (n−p)!'],
          ['Combinaison', 'Non', 'n! / (p!(n−p)!)'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">Exemple global (très important)</h3>
      <p className="text-muted">Cinq étudiants : A, B, C, D, E.</p>

      <div className="scroll-x-card mt-4 space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="font-semibold text-deep">Cas 1 — Président + vice-président</p>
          <p className="mt-1 text-sm text-muted">L’ordre compte → <strong>arrangement</strong></p>
          <MathBlock tex="A_5^2 = 20" className="!my-2" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold text-deep">Cas 2 — Groupe de 2 étudiants</p>
          <p className="mt-1 text-sm text-muted">L’ordre ne compte pas → <strong>combinaison</strong></p>
          <MathBlock tex="C_5^2 = 10" className="!my-2" />
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">Mini test</h3>
      <Accordion title="Combien de façons de choisir 3 élèves parmi 6 ?" defaultOpen>
        <p className="font-medium text-deep">Question</p>
        <p className="mt-1 text-muted">
          Choisir 3 élèves parmi 6 pour un comité (l’ordre ne compte pas). Combien de possibilités ?
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="C_6^3 = \frac{6!}{3!\,3!} = 20" className="!my-2" />
        <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
          Réponse : 20
        </p>
      </Accordion>

      <Callout variant="resume" title="À retenir">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Produit sur les étapes → principe de dénombrement.</li>
          <li>Ordre important ? → arrangement (ou permutation si p = n).</li>
          <li>Ordre sans importance ? → combinaison.</li>
        </ul>
      </Callout>

      <Callout variant="definition" title="Prochaine étape">
        <p className="text-sm">
          Le <strong>Chapitre 3 — Probabilité classique</strong> applique ces dénombrements à P(A) = favorables /
          possibles. Vous pourrez ensuite approfondir avec des exercices combinatoire avancés ou des applications
          (cryptographie, algorithmes, IA).
        </p>
      </Callout>

      <QuizCard
        question="5 étudiants : combien de duos possibles (ordre sans importance) ?"
        options={[
          { id: 'a', label: '20 (A₅²)', correct: false },
          { id: 'b', label: '10 (C₅²)', correct: true },
          { id: 'c', label: '120 (5!)', correct: false },
          { id: 'd', label: '25', correct: false },
        ]}
        explanation="Choisir 2 parmi 5 sans ordre : C₅² = 10."
      />
    </>
  )
}
