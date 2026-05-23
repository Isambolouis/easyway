import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'

export function Lesson6DeterminantExercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices — Le déterminant
      </h3>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">1. Calculer det(A) et det(B)</p>
          <p className="mt-2 text-sm text-ink/90">
            a) A = [[2, 5], [1, 3]] &nbsp;·&nbsp; b) B = [[1, 2, 1], [0, 3, 2], [4, 0, 1]]
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'calc' ? null : 'calc')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'calc' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Indice de calcul
        </button>
        <AnimatePresence>
          {open === 'calc' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              <strong>2×2 :</strong> ad − bc. &nbsp;
              <strong>3×3 :</strong> règle de Sarrus (diagonales ↘ moins diagonales ↙).
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">2. Interpréter le signe du déterminant</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/90">
            <li>Que signifie un déterminant <strong>négatif</strong> ?</li>
            <li>Et un déterminant <strong>positif</strong> ?</li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'sign' ? null : 'sign')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'sign' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Indice sur le signe
        </button>
        <AnimatePresence>
          {open === 'sign' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Pense à l’<strong>orientation</strong> : le signe indique si la transformation conserve ou inverse le sens
              (effet « miroir » en 2D).
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Callout variant="definition" title="Signification géométrique du signe (aperçu)">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>det &gt; 0</strong> : l’aire/volume est conservé en valeur absolue, orientation directe (pas de
            réflexion).
          </li>
          <li>
            <strong>det &lt; 0</strong> : la transformation inverse l’orientation (comme un miroir) — aire/volume compté
            en valeur absolue, signe négatif.
          </li>
          <li>
            <strong>det = 0</strong> : écrasement — pas d’inverse, vecteurs colonnes dépendants.
          </li>
        </ul>
      </Callout>

      <Accordion title="Vérification NumPy" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[2, 5], [1, 3]])
B = np.array([[1, 2, 1], [0, 3, 2], [4, 0, 1]])

print("det(A) =", np.linalg.det(A))
print("det(B) =", np.linalg.det(B))`}
        </pre>
      </Accordion>
    </div>
  )
}
