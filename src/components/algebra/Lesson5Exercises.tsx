import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

export function Lesson5Exercises() {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices pratiques — Leçon 5
      </h3>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">A = [[2, 3], [1, 4]]</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>Trouver Aᵀ</li>
            <li>Trouver det(A)</li>
            <li>Trouver A⁻¹</li>
            <li>Trouver Tr(A)</li>
            <li>Trouver le rang de A</li>
          </ol>
          <p className="mt-2 text-sm text-muted">2. Vérifier avec NumPy.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {open ? 'Masquer les indices' : 'Voir des indices'}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2 border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              <p>
                <strong>det :</strong> ad − bc pour une 2×2. Si det ≠ 0, utilise la formule de l’inverse 2×2.
              </p>
              <p>
                <strong>Trace :</strong> somme des éléments diagonaux.
              </p>
              <p>
                <strong>Rang :</strong> 2 si les lignes ne sont pas proportionnelles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Accordion title="Vérification NumPy" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[2, 3], [1, 4]])

print("A^T =\\n", A.T)
print("det =", np.linalg.det(A))
print("inv =\\n", np.linalg.inv(A))
print("trace =", np.trace(A))
print("rang =", np.linalg.matrix_rank(A))`}
        </pre>
      </Accordion>
    </div>
  )
}
