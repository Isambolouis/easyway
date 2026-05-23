import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

export function Lesson7SystemesExercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices — Systèmes linéaires
      </h3>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 1 — Résolution</p>
          <p className="mt-1 text-sm text-ink/90">
            Résoudre : 3x + 2y = 8 &nbsp;·&nbsp; x − y = −1
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex1' ? null : 'ex1')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex1' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Indice
        </button>
        <AnimatePresence>
          {open === 'ex1' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Écris A et b, vérifie det(A) ≠ 0, puis x⃗ = A⁻¹b⃗ — ou substitue y = x + 1 dans la première équation.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 2 — Type de solution</p>
          <p className="mt-1 text-sm text-ink/90">2x + 4y = 8 &nbsp;·&nbsp; x + 2y = 5</p>
          <p className="mt-2 text-sm text-muted">→ unique ? aucune ? infinité ?</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex2' ? null : 'ex2')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex2' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Indice
        </button>
        <AnimatePresence>
          {open === 'ex2' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Compare les coefficients : la 2ᵉ ligne est-elle un multiple cohérent de la 1ʳᵉ (membre de droite inclus) ?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="scroll-x-card rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 3 — Interprétation géométrique</p>
          <p className="mt-1 text-sm text-ink/90">
            Que représentent les solutions d’un système à 2 équations dans le plan ?
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex3' ? null : 'ex3')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex3' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Indice
        </button>
        <AnimatePresence>
          {open === 'ex3' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Chaque équation = une droite. La solution = leur intersection (point, vide, ou droite entière).
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Accordion title="Résolution NumPy (np.linalg.solve)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[3, 2], [1, -1]])
b = np.array([8, -1])
x = np.linalg.solve(A, b)
print("x, y =", x)`}
        </pre>
      </Accordion>
    </div>
  )
}
