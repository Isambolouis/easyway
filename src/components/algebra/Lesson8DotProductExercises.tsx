import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

export function Lesson8DotProductExercises() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices — Produit scalaire
      </h3>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 1 — Produits scalaires</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>u = (2, 1), v = (3, −2)</li>
            <li>u = (1, 2), v = (2, 1)</li>
            <li>u = (4, −1), v = (−4, 1)</li>
          </ol>
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
              Formule : u·v = x₁x₂ + y₁y₂. Un résultat nul indique l’orthogonalité.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 2 — Orthogonalité</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>u = (1, 2), v = (−4, 2)</li>
            <li>u = (3, 5), v = (−5, 3)</li>
            <li>u = (2, 1), v = (1, 2)</li>
          </ol>
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
              Calcule u·v pour chaque paire : orthogonal ⟺ produit scalaire = 0.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">Exercice 3 — Angle</p>
          <p className="mt-1 text-sm text-ink/90">Angle entre u = (1, 1) et v = (1, 0)</p>
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
              cos(θ) = (u·v) / (|u||v|), puis θ en degrés avec arccos.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Accordion title="NumPy — dot, norm, angle" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

u = np.array([1, 1])
v = np.array([1, 0])
dot = np.dot(u, v)
angle = np.degrees(np.arccos(dot / (np.linalg.norm(u) * np.linalg.norm(v))))
print("u·v =", dot, "angle =", angle, "°")`}
        </pre>
      </Accordion>
    </div>
  )
}
