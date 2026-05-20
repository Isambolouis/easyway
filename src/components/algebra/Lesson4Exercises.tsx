import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

export function Lesson4Exercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercice 4 — Leçon matrices
      </h3>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">
            A = [[1, 3], [2, 4]], &nbsp; B = [[2, 0], [1, 2]]
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>A + B</li>
            <li>2A</li>
            <li>A × B</li>
            <li>A × [2, 1]ᵀ (produit matrice–vecteur colonne)</li>
          </ol>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex' ? null : 'ex')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {open === 'ex' ? 'Masquer les indices' : 'Voir des indices'}
        </button>
        <AnimatePresence>
          {open === 'ex' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2 border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              <p>
                <strong>1–2 :</strong> même dimension → addition terme à terme ; scalaire sur chaque entrée.
              </p>
              <p>
                <strong>3 :</strong> ligne × colonne : (AB)ᵢⱼ = Σₖ aᵢₖ bₖⱼ.
              </p>
              <p>
                <strong>4 :</strong> A est 2×2, le vecteur a 2 composantes — une seule colonne.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Accordion title="Bonus — NumPy (vision & ML)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[1, 3], [2, 4]])
B = np.array([[2, 0], [1, 2]])
v = np.array([[2], [1]])  # vecteur colonne

print("A + B =\\n", A + B)
print("2*A =\\n", 2 * A)
print("A @ B =\\n", A @ B)
print("A @ v =\\n", A @ v)`}
        </pre>
      </Accordion>
    </div>
  )
}
