import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { MarkovPathExamWidget, MarkovWeatherWidget } from '@/components/probabilites/MarkovChainWidgets'
import { DEFAULT_WEATHER_MATRIX, pathProbability } from '@/components/probabilites/markovChainMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesCh10MarkovExamExercises() {
  const P = DEFAULT_WEATHER_MATRIX
  const probSunRain2 = pathProbability([0, 1, 2], P)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices type examen — Chaînes de Markov</h3>

      <Accordion title="Exercice 1 — Chemin Soleil → Nuage → Pluie (2 jours)" defaultOpen>
        <MarkovPathExamWidget />
        <ExerciseAnswer>Réponse : P = 0,06 (6 %)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — P(Pluie demain | Soleil aujourd’hui)">
        <MathBlock tex="P(\text{Pluie}\mid\text{Soleil})=P_{S,P}=0{,}1" className="!my-2" />
        <p className="text-sm text-muted">Lire la matrice : ligne Soleil, colonne Pluie.</p>
        <ExerciseAnswer>Réponse : 0,1 (10 %)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Vérifier qu’une ligne somme à 1">
        <p className="text-muted">Ligne Nuage : 0,3 + 0,4 + 0,3 = 1. Toute ligne d’une matrice de transition doit sommer à 1.</p>
        <MarkovWeatherWidget />
        <ExerciseAnswer>Réponse : condition nécessaire sur chaque ligne</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Produit de transitions sur un chemin">
        <MathBlock tex="P(\text{chemin})=\prod_t P(X_{t+1}\mid X_t)" className="!my-2" />
        <p className="text-sm text-muted">
          Ex. 1 recalculé : {P[0][1].toFixed(1)} × {P[1][2].toFixed(1)} = {probSunRain2.toFixed(2)}
        </p>
        <ExerciseAnswer>Réponse : multiplier les probabilités le long du chemin</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Interprétation NLP">
        <p className="text-muted">
          Pour prédire le mot après « manger », on utilise P(mot | manger) — Markov d’ordre 1 sur les mots.
        </p>
        <ExerciseAnswer>Réponse : le contexte immédiat suffit (hypothèse Markov)</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé examen">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Lire Pᵢⱼ dans la matrice</li>
          <li>✔ Chemin = produit des transitions</li>
          <li>✔ Σⱼ Pᵢⱼ = 1 par ligne</li>
          <li>✔ πₜ₊ₖ = πₜ Pᵏ</li>
        </ul>
      </Callout>
    </div>
  )
}
