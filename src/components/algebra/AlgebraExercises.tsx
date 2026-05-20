import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lightbulb } from 'lucide-react'
import { MathBlock } from '@/components/ui/MathBlock'

type Exercise = {
  id: string
  title: string
  prompt: React.ReactNode
  solution: React.ReactNode
}

const exercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Exercice 1 — Calculs à la main',
    prompt: (
      <>
        <p>
          Soit <strong>a⃗ = (2, 1)</strong> et <strong>b⃗ = (3, 4)</strong>.
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Calcule a⃗ + b⃗</li>
          <li>Calcule 2a⃗ − b⃗</li>
          <li>Calcule a⃗ · b⃗</li>
          <li>Calcule ‖a⃗‖</li>
        </ol>
      </>
    ),
    solution: (
      <>
        <MathBlock tex="\vec{a}+\vec{b} = (5,\,5)" />
        <MathBlock tex="2\vec{a}-\vec{b} = (1,\,-2)" />
        <MathBlock tex="\vec{a}\cdot\vec{b} = 2\times3 + 1\times4 = 10" />
        <MathBlock tex="\|\vec{a}\| = \sqrt{2^2+1^2} = \sqrt{5} \approx 2{,}236" />
      </>
    ),
  },
  {
    id: 'ex2',
    title: 'Exercice 2 — Python / NumPy',
    prompt: (
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        {`import numpy as np

a = np.array([2, 1])
b = np.array([3, 4])
# 1. Produit scalaire
# 2. Angle en degrés`}
      </pre>
    ),
    solution: (
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-emerald-300">
        {`dot = np.dot(a, b)          # 10
na, nb = np.linalg.norm(a), np.linalg.norm(b)
angle = np.degrees(np.arccos(dot / (na * nb)))  # ≈ 11.31°`}
      </pre>
    ),
  },
]

export function AlgebraExercises() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="my-10 space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-deep">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Exercices corrigés
      </h3>
      {exercises.map((ex) => {
        const show = openId === ex.id
        return (
          <div key={ex.id} className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
            <div className="border-b border-amber-100 bg-white/80 px-4 py-3">
              <p className="font-semibold text-deep">{ex.title}</p>
              <div className="mt-2 text-sm text-ink/90">{ex.prompt}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(show ? null : ex.id)}
              className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100/80"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {show ? 'Masquer la correction' : 'Afficher la correction'}
            </button>
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-amber-100 bg-white px-4 py-3"
                >
                  {ex.solution}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
