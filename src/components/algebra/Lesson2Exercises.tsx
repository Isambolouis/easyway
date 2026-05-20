import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Lesson2Exercise1Correction } from '@/components/algebra/Lesson2Exercise1Correction'

export function Lesson2Exercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices — Leçon 2
      </h3>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 1 — u⃗₁ = (1, 2), u⃗₂ = (3, 1)</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>Calculer v⃗ = 2u⃗₁ − u⃗₂</li>
            <li>Vérifier que v⃗ ∈ ℝ²</li>
            <li>Interpréter géométriquement les combinaisons αu⃗₁ + βu⃗₂ (α, β ∈ ℝ)</li>
          </ol>
        </div>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex1' ? null : 'ex1')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex1' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {open === 'ex1' ? 'Masquer l’indice' : 'Voir l’indice vers la correction'}
        </button>
        <AnimatePresence>
          {open === 'ex1' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              La <strong>correction détaillée pas à pas</strong> est affichée ci-dessous ↓
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 2 — Python / NumPy</p>
        </div>
        <pre className="overflow-x-auto bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

u1 = np.array([1, 2])
u2 = np.array([3, 1])
v = 2*u1 - u2
print("v =", v)  # [-1  3]`}
        </pre>
        <button
          type="button"
          onClick={() => setOpen(open === 'ex2' ? null : 'ex2')}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open === 'ex2' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Astuce : modifier les coefficients
        </button>
        <AnimatePresence>
          {open === 'ex2' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              Essaie <code className="rounded bg-slate-100 px-1">3*u1 + 0.5*u2</code> ou{' '}
              <code className="rounded bg-slate-100 px-1">-2*u1 + u2</code>.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Lesson2Exercise1Correction />
    </div>
  )
}
