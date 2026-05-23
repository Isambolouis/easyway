import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { BayesTheoremWidget } from '@/components/probabilites/BayesTheoremWidget'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh5BayesExamExercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices type examen — Théorème de Bayes</h3>
      <p className="text-muted">
        Chaque exercice avec widget : réglez les curseurs sur les valeurs de l’énoncé pour retrouver P(A|B).
      </p>

      <Accordion title="Exercice 1 — Test médical (2 % de prévalence)" defaultOpen>
        <p className="font-medium text-deep">Données</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-muted">
          <li>P(M) = 0,02 · P(T|M) = 0,95 · P(T|¬M) = 0,10</li>
        </ul>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="P(T) = 0{,}95 \times 0{,}02 + 0{,}10 \times 0{,}98 = 0{,}117" className="!my-2" />
        <MathBlock tex="P(M|T) = \frac{0{,}019}{0{,}117} \approx 0{,}162" className="!my-2" />
        <BayesTheoremWidget
          title="Ex. 1 — A = malade (M), B = test positif (T)"
          initialPA={0.02}
          initialPBgivenA={0.95}
          initialPBgivenNotA={0.1}
        />
        <ExerciseAnswer>Réponse : environ 16,2 %</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Spam et mot « gratuit »">
        <p className="font-medium text-deep">Données</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-muted">
          <li>P(S) = 0,4 · P(G|S) = 0,8 · P(G|¬S) = 0,2</li>
        </ul>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="P(G) = 0{,}8 \times 0{,}4 + 0{,}2 \times 0{,}6 = 0{,}44" className="!my-2" />
        <MathBlock tex="P(S|G) = \frac{0{,}32}{0{,}44} \approx 0{,}727" className="!my-2" />
        <BayesTheoremWidget
          title="Ex. 2 — A = spam (S), B = contient « gratuit » (G)"
          initialPA={0.4}
          initialPBgivenA={0.8}
          initialPBgivenNotA={0.2}
        />
        <ExerciseAnswer>Réponse : environ 72,7 %</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Machine défectueuse (usine A / B)">
        <p className="font-medium text-deep">Données</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-muted">
          <li>P(A) = 0,6 · P(D|A) = 0,03 · P(D|B) = 0,05 avec P(B) = 0,4</li>
        </ul>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="P(D) = 0{,}03 \times 0{,}6 + 0{,}05 \times 0{,}4 = 0{,}038" className="!my-2" />
        <MathBlock tex="P(A|D) = \frac{0{,}018}{0{,}038} \approx 0{,}474" className="!my-2" />
        <BayesTheoremWidget
          title="Ex. 3 — A = machine A, B = produit défectueux (D)"
          initialPA={0.6}
          initialPBgivenA={0.03}
          initialPBgivenNotA={0.05}
        />
        <ExerciseAnswer>Réponse : environ 47,4 %</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Deux tests positifs (niveau difficile)">
        <p className="font-medium text-deep">Données</p>
        <ul className="mt-1 list-disc pl-5 text-sm text-muted">
          <li>P(M) = 0,01 · sous hypothèse d’indépendance des tests sachant M : P(T₁∩T₂|M) ≈ 0,9 × 0,85</li>
        </ul>
        <p className="mt-4 font-medium text-deep">Structure</p>
        <MathBlock
          tex="P(M|T_1 \cap T_2) = \frac{P(T_1 \cap T_2|M)\,P(M)}{P(T_1 \cap T_2)}"
          className="!my-2"
        />
        <p className="text-sm text-muted">
          En examen, on estime P(T₁∩T₂|M) ≈ 0,765 puis on applique Bayes avec P(M) = 0,01 — résultat typique ≈{' '}
          <strong>28 %</strong> (selon le calcul complet de P(T₁∩T₂)).
        </p>
        <ExerciseAnswer>Réponse indicative : environ 28 %</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé techniques examen">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Bayes : P(A|B) = P(B|A)P(A) / P(B)</li>
          <li>P(B) par probabilités totales : P(B|A)P(A) + P(B|¬A)P(¬A)</li>
          <li>Interpréter : maladie rare + faux positifs → posterior souvent modeste</li>
        </ul>
      </Callout>
    </div>
  )
}
