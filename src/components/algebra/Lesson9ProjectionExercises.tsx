import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

export function Lesson9ProjectionExercises() {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-10 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercice — Projection orthogonale
      </h3>

      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
        <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
          <p className="font-semibold text-deep">u = (5, 2), &nbsp; v = (1, 3)</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
            <li>Calculer proj_v(u)</li>
            <li>Vérifier que proj_v(u) est parallèle à v</li>
            <li>Calculer la distance perpendiculaire ‖u − proj_v(u)‖</li>
          </ol>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100/80"
        >
          {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {open ? 'Masquer l’indice' : 'Voir l’indice'}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2 border-t border-amber-100 px-4 py-3 text-sm text-muted"
            >
              <p>
                <strong>1.</strong> proj_v(u) = ((u·v)/(v·v)) · v
              </p>
              <p>
                <strong>2.</strong> proj_v(u) = k·v pour un scalaire k — vérifie les rapports de coordonnées.
              </p>
              <p>
                <strong>3.</strong> d = ‖u − proj_v(u)‖ (composante perpendiculaire à v).
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Accordion title="NumPy" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

u = np.array([5., 2.])
v = np.array([1., 3.])
proj = (np.dot(u, v) / np.dot(v, v)) * v
dist = np.linalg.norm(u - proj)
print("proj =", proj)
print("distance =", dist)`}
        </pre>
      </Accordion>
    </div>
  )
}
