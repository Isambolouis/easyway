import type { ReactNode } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { Callout } from '@/components/ui/Callout'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const recapRows = [
  { q: '1.1', result: '(−1, 3)', status: 'Correct' },
  { q: '1.2', result: 'v⃗ ∈ ℝ²', status: 'Correct (préciser la méthode)' },
  { q: '1.3', result: 'Sous-espace = plan ℝ²', status: 'Correct avec précision' },
]

export function Lesson2Exercise1Correction() {
  return (
    <FadeIn>
      <div className="scroll-x-card rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
        <div className="border-b border-green-100 bg-green-600/10 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-green-800">Correction détaillée</p>
          <h3 className="mt-1 text-lg font-bold text-deep">Exercice 1 — u⃗₁ = (1, 2), u⃗₂ = (3, 1)</h3>
        </div>

        <div className="space-y-4 p-5">
          <Step
            id="1.1"
            title="Calcul de v⃗ = 2u⃗₁ − u⃗₂"
            blocks={['2\\vec{u}_1 = (2,\\,4)', '2\\vec{u}_1 - \\vec{u}_2 = (2-3,\\,4-1) = (-1,\\,3)']}
            hint="Opérations vectorielles bien appliquées."
          />
          <Step
            id="1.2"
            title="Vérification que v⃗ ∈ ℝ²"
            blocks={['\\vec{v} = (-1,\\,3)', '-1,\\,3 \\in \\mathbb{R} \\Rightarrow \\vec{v} \\in \\mathbb{R}^2']}
            hint="Regarde les coordonnées : deux composantes réelles suffisent."
            note="Si tu as calculé u⃗₁ + u⃗₂ = (4, 3), c’est une bonne manipulation — mais pour ℝ², observe directement v⃗."
          />
          <Step
            id="1.3"
            title="Interprétation géométrique"
            blocks={[
              'E = \\{\\alpha \\vec{u}_1 + \\beta \\vec{u}_2 \\mid \\alpha, \\beta \\in \\mathbb{R}\\}',
              'E = \\mathrm{span}\\{\\vec{u}_1, \\vec{u}_2\\} = \\mathbb{R}^2',
            ]}
            hint="Combinaison linéaire = un vecteur ; toutes les combinaisons = sous-espace (ici le plan)."
            extra={
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                <li><strong>Alignés</strong> → droite</li>
                <li><strong>Non alignés</strong> → tout le plan ℝ²</li>
              </ul>
            }
          />
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[280px] text-sm">
              <thead>
                <tr className="bg-deep text-left text-white">
                  <th className="px-3 py-2">Question</th>
                  <th className="px-3 py-2">Résultat</th>
                  <th className="px-3 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recapRows.map((row, i) => (
                  <tr key={row.q} className={i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-3 py-2 font-medium">{row.q}</td>
                    <td className="px-3 py-2">{row.result}</td>
                    <td className="px-3 py-2 text-green-700">✅ {row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout variant="resume" title="Ce que tu maîtrises">
            <ul className="list-disc space-y-1 pl-5">
              <li>Opérations vectorielles</li>
              <li>Combinaisons linéaires</li>
              <li>Sous-espace engendré</li>
            </ul>
          </Callout>
        </div>
      </div>
    </FadeIn>
  )
}

function Step({
  id,
  title,
  blocks,
  hint,
  note,
  extra,
}: {
  id: string
  title: string
  blocks: string[]
  hint: string
  note?: string
  extra?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="scroll-x-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span className="font-semibold text-deep">{id}) {title}</span>
      </div>
      {blocks.map((tex) => (
        <MathBlock key={tex} tex={tex} className="!my-1" />
      ))}
      {note && <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">{note}</p>}
      {extra}
      <p className="mt-2 text-sm text-muted">➡️ {hint}</p>
    </motion.div>
  )
}
