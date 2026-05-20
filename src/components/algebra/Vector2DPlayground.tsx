import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MathBlock } from '@/components/ui/MathBlock'
import { FadeIn } from '@/components/ui/FadeIn'

type Vec = [number, number]

function norm(v: Vec) {
  return Math.hypot(v[0], v[1])
}

function add(a: Vec, b: Vec): Vec {
  return [a[0] + b[0], a[1] + b[1]]
}

function scale(s: number, v: Vec): Vec {
  return [s * v[0], s * v[1]]
}

function dot(a: Vec, b: Vec) {
  return a[0] * b[0] + a[1] * b[1]
}

function toSvg([x, y]: Vec, ox: number, oy: number, scalePx: number) {
  return { x: ox + x * scalePx, y: oy - y * scalePx }
}

function Arrow({
  from,
  to,
  color,
  label,
  dashed,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  label?: string
  dashed?: boolean
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const tip = 9
  const end = { x: to.x - ux * tip, y: to.y - uy * tip }
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray={dashed ? '6 4' : undefined}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 8} fontSize={11} fill={color} fontWeight={600}>
          {label}
        </text>
      )}
    </g>
  )
}

export function Vector2DPlayground() {
  const [a, setA] = useState<Vec>([2, 1])
  const [b, setB] = useState<Vec>([3, 4])
  const [scalar, setScalar] = useState(2)
  const [showSum, setShowSum] = useState(true)
  const [showScaled, setShowScaled] = useState(false)

  const sum = add(a, b)
  const scaledA = scale(scalar, a)
  const na = norm(a)
  const nb = norm(b)
  const d = dot(a, b)
  const angleRad = na && nb ? Math.acos(Math.min(1, Math.max(-1, d / (na * nb)))) : 0
  const angleDeg = (angleRad * 180) / Math.PI

  const W = 420
  const H = 320
  const ox = W / 2
  const oy = H / 2
  const scalePx = 28

  const origin = { x: ox, y: oy }
  const pa = toSvg(a, ox, oy, scalePx)
  const pb = toSvg(b, ox, oy, scalePx)
  const pSum = toSvg(sum, ox, oy, scalePx)
  const pScaled = toSvg(scaledA, ox, oy, scalePx)

  const gridLines = useMemo(() => {
    const lines: React.ReactNode[] = []
    for (let i = -6; i <= 6; i++) {
      const p = i * scalePx
      lines.push(
        <line key={`v${i}`} x1={ox + p} y1={20} x2={ox + p} y2={H - 20} stroke="#e2e8f0" strokeWidth={1} />,
        <line key={`h${i}`} x1={20} y1={oy + p} x2={W - 20} y2={oy + p} stroke="#e2e8f0" strokeWidth={1} />,
      )
    }
    return lines
  }, [ox, oy, scalePx, H, W])

  const slider = (label: string, v: Vec, set: (n: Vec) => void, color: string) => (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-3" style={{ borderColor: `${color}40` }}>
      <p className="mb-2 text-sm font-semibold" style={{ color }}>
        {label} = ({v[0].toFixed(1)}, {v[1].toFixed(1)})
      </p>
      {(['x', 'y'] as const).map((axis, i) => (
        <label key={axis} className="mb-2 block text-xs text-muted">
          {axis} : {v[i].toFixed(1)}
          <input
            type="range"
            min={-5}
            max={5}
            step={0.1}
            value={v[i]}
            onChange={(e) => {
              const next: Vec = [...v]
              next[i] = Number(e.target.value)
              set(next)
            }}
            className="mt-1 w-full accent-violet-600"
          />
        </label>
      ))}
    </div>
  )

  return (
    <FadeIn>
      <div className="my-8 overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 shadow-lg">
        <div className="border-b border-violet-100 bg-violet-600/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Atelier interactif — plan 2D</p>
          <p className="text-sm text-muted">Déplace les composantes et observe les flèches en temps réel.</p>
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-[1fr_280px]">
          <div className="relative rounded-xl border border-slate-200 bg-slate-50/80 p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Représentation graphique de vecteurs">
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6 z" fill="context-stroke" />
                </marker>
              </defs>
              {gridLines}
              <line x1={20} y1={oy} x2={W - 20} y2={oy} stroke="#94a3b8" strokeWidth={1.5} />
              <line x1={ox} y1={20} x2={ox} y2={H - 20} stroke="#94a3b8" strokeWidth={1.5} />
              <text x={W - 28} y={oy - 8} fontSize={10} fill="#64748b">x</text>
              <text x={ox + 8} y={28} fontSize={10} fill="#64748b">y</text>
              <Arrow from={origin} to={pa} color="#7c3aed" label="a⃗" />
              <Arrow from={origin} to={pb} color="#0d9488" label="b⃗" />
              {showSum && <Arrow from={origin} to={pSum} color="#f97316" label="a⃗+b⃗" dashed />}
              {showScaled && <Arrow from={origin} to={pScaled} color="#2563eb" label={`${scalar}a⃗`} dashed />}
              <circle cx={pa.x} cy={pa.y} r={4} fill="#7c3aed" />
              <circle cx={pb.x} cy={pb.y} r={4} fill="#0d9488" />
            </svg>
          </div>
          <div className="space-y-3">
            {slider('a⃗', a, setA, '#7c3aed')}
            {slider('b⃗', b, setB, '#0d9488')}
            <label className="block rounded-xl border border-slate-200 bg-white/80 p-3 text-sm">
              <span className="font-semibold text-deep">Scalaire k = {scalar}</span>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.1}
                value={scalar}
                onChange={(e) => setScalar(Number(e.target.value))}
                className="mt-2 w-full accent-blue-600"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowSum((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${showSum ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                a⃗ + b⃗
              </button>
              <button
                type="button"
                onClick={() => setShowScaled((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${showScaled ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                k·a⃗
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-2 border-t border-violet-100 bg-white/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: '‖a⃗‖', value: na.toFixed(3) },
            { label: '‖b⃗‖', value: nb.toFixed(3) },
            { label: 'a⃗·b⃗', value: d.toFixed(3) },
            { label: 'Angle θ', value: `${angleDeg.toFixed(1)}°` },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              layout
              className="rounded-xl bg-violet-600/10 px-3 py-2 text-center"
            >
              <p className="text-xs font-bold text-violet-700">{stat.label}</p>
              <p className="text-lg font-bold text-deep">{stat.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <MathBlock tex={`\\|\\vec{a}\\| = \\sqrt{${a[0]}^2 + ${a[1]}^2} = ${na.toFixed(3)}`} />
          <MathBlock tex={`\\vec{a}\\cdot\\vec{b} = ${a[0]}\\times${b[0]} + ${a[1]}\\times${b[1]} = ${d.toFixed(3)}`} />
        </div>
      </div>
    </FadeIn>
  )
}
