import { useMemo, useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

type Vec = [number, number]

function dot(a: Vec, b: Vec) {
  return a[0] * b[0] + a[1] * b[1]
}

function scale(s: number, v: Vec): Vec {
  return [s * v[0], s * v[1]]
}

function sub(a: Vec, b: Vec): Vec {
  return [a[0] - b[0], a[1] - b[1]]
}

function norm(v: Vec) {
  return Math.hypot(v[0], v[1])
}

function projOnto(u: Vec, v: Vec): Vec {
  const vv = dot(v, v)
  if (vv === 0) return [0, 0]
  return scale(dot(u, v) / vv, v)
}

function toSvg([x, y]: Vec, ox: number, oy: number, s: number) {
  return { x: ox + x * s, y: oy - y * s }
}

export function ProjectionPlayground() {
  const [u, setU] = useState<Vec>([3, 4])
  const [v, setV] = useState<Vec>([2, 1])

  const p = useMemo(() => projOnto(u, v), [u, v])
  const residual = useMemo(() => sub(u, p), [u, p])
  const dist = useMemo(() => norm(residual), [residual])

  const W = 400
  const H = 320
  const ox = W / 2
  const oy = H / 2
  const s = 32

  const ou = toSvg(u, ox, oy, s)
  const ov = toSvg(v, ox, oy, s)
  const op = toSvg(p, ox, oy, s)
  return (
    <FadeIn>
      <div className="interactive-panel my-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/80 to-white p-4 shadow-md">
        <p className="font-semibold text-deep">Démo — proj<sub>v</sub>(u) et distance perpendiculaire</p>
        <div className="interactive-panel__body mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm">
            u = ({u[0]}, {u[1]})
            <input
              type="range"
              min={-5}
              max={5}
              value={u[0]}
              onChange={(e) => setU([Number(e.target.value), u[1]])}
              className="mt-1 w-full accent-violet-600"
            />
            <input
              type="range"
              min={-5}
              max={5}
              value={u[1]}
              onChange={(e) => setU([u[0], Number(e.target.value)])}
              className="mt-1 w-full accent-violet-600"
            />
          </label>
          <label className="text-sm">
            v = ({v[0]}, {v[1]})
            <input
              type="range"
              min={-5}
              max={5}
              value={v[0]}
              onChange={(e) => setV([Number(e.target.value), v[1]])}
              className="mt-1 w-full accent-teal-600"
            />
            <input
              type="range"
              min={-5}
              max={5}
              value={v[1]}
              onChange={(e) => setV([v[0], Number(e.target.value)])}
              className="mt-1 w-full accent-teal-600"
            />
          </label>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full min-w-[280px] max-w-md">
          <line x1={0} y1={oy} x2={W} y2={oy} stroke="#e2e8f0" />
          <line x1={ox} y1={0} x2={ox} y2={H} stroke="#e2e8f0" />
          <line x1={ox} y1={oy} x2={ou.x} y2={ou.y} stroke="#7c3aed" strokeWidth={2} />
          <line x1={ox} y1={oy} x2={ov.x} y2={ov.y} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" />
          <line x1={ox} y1={oy} x2={op.x} y2={op.y} stroke="#0d9488" strokeWidth={2.5} />
          <line x1={op.x} y1={op.y} x2={ou.x} y2={ou.y} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" />
          <circle cx={ou.x} cy={ou.y} r={4} fill="#7c3aed" />
          <circle cx={op.x} cy={op.y} r={4} fill="#0d9488" />
        </svg>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl bg-white/90 p-3 text-sm sm:grid-cols-2">
          <p>
            <strong className="text-teal-700">proj_v(u)</strong> = ({p[0].toFixed(2)}, {p[1].toFixed(2)})
          </p>
          <p>
            <strong className="text-amber-700">u − proj</strong> = ({residual[0].toFixed(2)}, {residual[1].toFixed(2)})
          </p>
          <p className="sm:col-span-2">
            <strong>Distance ⊥</strong> = ‖u − proj_v(u)‖ ≈ {dist.toFixed(2)}
          </p>
        </div>
        <p className="mt-2 text-center text-xs text-muted">
          Violet = u · Teal = projection · Orange pointillé = composante perpendiculaire
        </p>
      </div>
    </FadeIn>
  )
}
