import { Accordion } from '@/components/ui/Accordion'
import { MathBlock } from '@/components/ui/MathBlock'
import { StatsQuizCard } from '@/components/statistique/StatsQuizCard'
import { bivariateStats, mean, stdPop } from '@/components/statistique/statsMath'
import { CH10_CLIENTS, CH10_STORE_SALES } from '@/data/statistiqueSampleData'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

const revenus = CH10_CLIENTS.map((c) => c.revenu)
const depenses = CH10_CLIENTS.map((c) => c.depenses)
const clientStats = bivariateStats(revenus, depenses)
const ventes = CH10_STORE_SALES.map((d) => d.ventes)

export function StatistiqueCh10Exercises() {
  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Exercices — Chapitre 10</h3>
      <p className="text-muted">Applications réelles — data science, économie et IA.</p>

      <Accordion title="Exercice 1 — EDA clients" defaultOpen>
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-sm text-muted">
          Dataset clients : revenus 300, 500, 800, 1200. Interpréter la moyenne et la corrélation revenu / dépenses.
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <p className="text-sm text-muted">
          x̄ = {mean(revenus)} — profil moyen modéré. r = {clientStats.r.toFixed(2)} : corrélation positive forte ;
          plus le revenu augmente, plus les dépenses augmentent (segmentation marketing, prédiction panier).
        </p>
        <ExerciseAnswer>Moyenne 700 · relation linéaire positive — base d’un modèle de dépenses</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — PIB par habitant">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-sm text-muted">Pays B : PIB = 2000, Population = 20 M. Calculer le PIB/habitant.</p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <MathBlock tex="2000 / 20 = 100" className="!my-2" />
        <p className="text-sm text-muted">
          Même résultat pour A et C dans le tableau du cours — comparaison équitable du niveau de vie, pas du PIB
          brut seul.
        </p>
        <ExerciseAnswer>PIB/hab. = 100 (unités cohérentes avec le tableau CH10_GDP)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Normalisation avant l’IA">
        <StatsQuizCard
          question="Pourquoi normaliser (z-score) avant un modèle d’IA ?"
          options={[
            { id: 'a', label: 'Rendre les variables comparables et stabiliser l’apprentissage', correct: true },
            { id: 'b', label: 'Supprimer toutes les corrélations du dataset', correct: false },
            { id: 'c', label: 'Remplacer la validation croisée', correct: false },
          ]}
          explanation="Des variables à échelles très différentes (âge vs revenu) peuvent dominer la perte. Le z-score centre et met à l’échelle sans changer l’information relative."
        />
      </Accordion>

      <Accordion title="Exercice 4 — Analyse complète du magasin">
        <p className="font-medium text-deep">Énoncé</p>
        <p className="mt-1 text-sm text-muted">
          Ventes : 100, 120, 150, 130, 200 (lun → ven). Synthèse analyste : moyenne, dispersion, tendance, pic.
        </p>
        <p className="mt-4 font-medium text-deep">Correction</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Moyenne = {mean(ventes)} ventes/jour</li>
          <li>σ ≈ {stdPop(ventes).toFixed(1)} — variations modérées</li>
          <li>Tendance globale croissante (lun → ven)</li>
          <li>Pic vendredi (200) — prévoir stocks et personnel</li>
        </ul>
        <ExerciseAnswer>Magasin performant avec variabilité ; action : renforcer le vendredi</ExerciseAnswer>
      </Accordion>
    </div>
  )
}
