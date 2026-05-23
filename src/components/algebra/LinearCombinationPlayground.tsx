import { useMemo, useState, useId } from 'react'
import { motion } from 'framer-motion'
import { MathBlock } from '@/components/ui/MathBlock'
import { FadeIn } from '@/components/ui/FadeIn'

type Vec = [number, number]

function toSvg([x, y]: Vec, ox: number, oy: number, s: number) {
  return { x: ox + x * s, y: oy - y * s }
}

export type LinearCombinationPlaygroundProps = {
  u1?: Vec
  u2?: Vec
  initialAlpha1?: number
  initialAlpha2?: number
  title?: string
  subtitle?: string
  hint?: string
}

export function LinearCombinationPlayground({
  u1 = [1, 0],
  u2 = [0, 1],
  initialAlpha1 = 1,
  initialAlpha2 = 1,
  title = 'Combinaison linéaire interactive',
  subtitle,
  hint,
}: LinearCombinationPlaygroundProps) {
  const [a1, setA1] = useState(initialAlpha1)
  const [a2, setA2] = useState(initialAlpha2)
  const markerId = useId().replace(/:/g, '')

  const result: Vec = useMemo(
    () => [a1 * u1[0] + a2 * u2[0], a1 * u1[1] + a2 * u2[1]],
    [a1, a2, u1, u2],
  )

  const W = 400
  const H = 320
  const ox = W / 2
  const oy = H / 2
  const scale = 42
  const O = { x: ox, y: oy }
  const p1 = toSvg(u1, ox, oy, scale)
  const p2 = toSvg(u2, ox, oy, scale)
  const pr = toSvg(result, ox, oy, scale)

  const defaultSubtitle = `α₁u⃗₁ + α₂u⃗₂ avec u⃗₁=(${u1[0]},${u1[1]}), u⃗₂=(${u2[0]},${u2[1]})`

  return (
    <FadeIn>
      <div className="interactive-panel my-8 rounded-2xl border border-violet-200 bg-gradient-to-br from-indigo-50 to-white shadow-lg">
        <div className="border-b border-violet-100 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">{title}</p>
          <p className="text-sm text-muted">{subtitle ?? defaultSubtitle}</p>
        </div>
        <div className="interactive-panel__body grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          <div className="min-h-[200px] min-w-0 shrink-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[280px] rounded-xl border border-slate-200 bg-slate-50">
            <line x1={20} y1={oy} x2={W - 20} y2={oy} stroke="#cbd5e1" />
            <line x1={ox} y1={20} x2={ox} y2={H - 20} stroke="#cbd5e1" />
            <line
              x1={O.x}
              y1={O.y}
              x2={p1.x}
              y2={p1.y}
              stroke="#7c3aed"
              strokeWidth={2}
              markerEnd={`url(#arr-${markerId})`}
            />
            <line
              x1={O.x}
              y1={O.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#0d9488"
              strokeWidth={2}
              markerEnd={`url(#arr-${markerId})`}
            />
            <line
              x1={O.x}
              y1={O.y}
              x2={pr.x}
              y2={pr.y}
              stroke="#f97316"
              strokeWidth={3}
              markerEnd={`url(#arr-${markerId})`}
            />
            <text x={p1.x + 6} y={p1.y - 4} fontSize={11} fill="#7c3aed">
              u₁
            </text>
            <text x={p2.x + 6} y={p2.y - 4} fontSize={11} fill="#0d9488">
              u₂
            </text>
            <text x={pr.x + 6} y={pr.y - 4} fontSize={11} fill="#c2410c" fontWeight="700">
              v⃗
            </text>
            <defs>
              <marker id={`arr-${markerId}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 z" fill="context-stroke" />
              </marker>
            </defs>
          </svg>
          </div>
          <div className="min-w-0 space-y-4">
            <label className="block text-sm">
              <span className="font-semibold text-violet-700">α₁ = {a1.toFixed(2)}</span>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.1}
                value={a1}
                onChange={(e) => setA1(Number(e.target.value))}
                className="mt-1 w-full accent-violet-600"
              />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-teal">α₂ = {a2.toFixed(2)}</span>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.1}
                value={a2}
                onChange={(e) => setA2(Number(e.target.value))}
                className="mt-1 w-full accent-teal"
              />
            </label>
            <div className="max-w-full overflow-x-auto">
              <MathBlock
                tex={`\\vec{v} = ${a1.toFixed(2)}\\begin{pmatrix}${u1[0]}\\\\${u1[1]}\\end{pmatrix} + ${a2.toFixed(2)}\\begin{pmatrix}${u2[0]}\\\\${u2[1]}\\end{pmatrix} = (${result[0].toFixed(2)},\\,${result[1].toFixed(2)})`}
                className="!inline-block min-w-min"
              />
            </div>
            {hint && (
              <motion.p layout className="rounded-lg bg-violet-50 p-3 text-sm text-muted">
                {hint}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
