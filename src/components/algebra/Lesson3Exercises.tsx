import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'

export function Lesson3Exercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices — Leçon 3
      </h3>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 1 — u⃗₁ = (1, 1), u⃗₂ = (2, 2)</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>Ces deux vecteurs forment-ils une base de ℝ² ?</li>
            <li>Trouve une combinaison linéaire reliant u⃗₁ et u⃗₂ s’ils sont dépendants.</li>
          </ol>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex1' ? null : 'ex1')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex1' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {open === 'ex1' ? 'Masquer l’indice' : 'Voir un indice'}
        </button>
        <AnimatePresence>
          {open === 'ex1' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Compare les directions : u⃗₂ est-il un multiple de u⃗₁ ? Résous αu⃗₁ + βu⃗₂ = 0⃗ avec le système 2×2.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 2 — Python / NumPy (rang)</p>
        </div>
        <pre className="overflow-x-auto bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

u1 = np.array([1, 1])
u2 = np.array([2, 2])

M = np.column_stack((u1, u2))
rang = np.linalg.matrix_rank(M)
print("Rang de la matrice =", rang)
# rang = 2 → indépendants ; rang = 1 → dépendants`}
        </pre>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex2' ? null : 'ex2')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex2' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Astuce sur le rang
        </button>
        <AnimatePresence>
          {open === 'ex2' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Essaie ensuite avec <code className="rounded bg-slate-100 px-1">u2 = [3, 1]</code> (leçon 2) et compare
              les rangs.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
