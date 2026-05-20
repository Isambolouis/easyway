import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    id: '1.1',
    title: 'a⃗ + b⃗',
    tex: '\\vec{a}+\\vec{b} = (2+3,\\,1+4) = (5,\\,5)',
    hint: 'Déplacement de 5 unités sur x et 5 sur y.',
  },
  {
    id: '1.2',
    title: '2a⃗ − b⃗',
    tex: '2\\vec{a}=(4,2),\\quad 2\\vec{a}-\\vec{b}=(4-3,\\,2-4)=(1,\\,-2)',
    hint: 'Opérations vectorielles de base maîtrisées.',
  },
  {
    id: '1.3',
    title: 'Produit scalaire a⃗ · b⃗',
    tex: '\\vec{a}\\cdot\\vec{b} = 2\\times3 + 1\\times4 = 10',
    hint: 'Produit positif → directions similaires (angle < 90°).',
  },
  {
    id: '1.4',
    title: 'Norme ‖a⃗‖',
    tex: '\\|\\vec{a}\\| = \\sqrt{2^2+1^2} = \\sqrt{5} \\approx 2{,}236',
    hint: 'Longueur du vecteur dans le plan.',
  },
]

export function Exercise1Correction() {
  return (
    <FadeIn>
      <div className="my-10 overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
        <div className="border-b border-green-100 bg-green-600/10 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-green-800">Correction détaillée</p>
          <h3 className="mt-1 text-lg font-bold text-deep">Exercice 1 — a⃗ = (2, 1), b⃗ = (3, 4)</h3>
        </div>
        <div className="space-y-4 p-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-deep">
                  {s.id}) {s.title}
                </span>
              </div>
              <MathBlock tex={s.tex} className="!my-2" />
              <p className="text-sm text-muted">➡️ {s.hint}</p>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-green-100 bg-white/80 px-5 py-4 text-sm text-ink/90">
          <p className="font-semibold text-deep">💡 Vision par ordinateur</p>
          <p className="mt-1">
            Similarité directionnelle (HOG), corrélation entre features en reconnaissance d’objets.
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
