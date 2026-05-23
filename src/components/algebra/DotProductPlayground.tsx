import { useMemo, useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

type Vec = [number, number]

function dot(a: Vec, b: Vec) {
  return a[0] * b[0] + a[1] * b[1]
}

function norm(v: Vec) {
  return Math.hypot(v[0], v[1])
}

function toSvg([x, y]: Vec, ox: number, oy: number, s: number) {
  return { x: ox + x * s, y: oy - y * s }
}

export function DotProductPlayground() {
  const [u, setU] = useState<Vec>([2, 1])
  const [v, setV] = useState<Vec>([1, -2])

  const d = useMemo(() => dot(u, v), [u, v])
  const nu = useMemo(() => norm(u), [u])
  const nv = useMemo(() => norm(v), [v])
  const cosTheta = nu && nv ? d / (nu * nv) : 0
  const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI)

  const W = 400
  const H = 320
  const ox = W / 2
  const oy = H / 2
  const s = 36

  const ou = toSvg(u, ox, oy, s)
  const ov = toSvg(v, ox, oy, s)

  let interpretation = 'Orthogonaux (u·v = 0)'
  if (d > 0.01) interpretation = 'Même sens global (angle < 90°)'
  if (d < -0.01) interpretation = 'Directions opposées (angle > 90°)'

  return (
    <FadeIn>
      <div className="interactive-panel my-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/80 to-white p-4 shadow-md">
        <p className="font-semibold text-deep">Démo interactive — produit scalaire</p>
        <div className="interactive-panel__body mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm">
            u = ({u[0]}, {u[1]})
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={u[0]}
              onChange={(e) => setU([Number(e.target.value), u[1]])}
              className="mt-1 w-full accent-violet-600"
            />
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={u[1]}
              onChange={(e) => setU([u[0], Number(e.target.value)])}
              className="mt-1 w-full accent-violet-600"
            />
          </label>
          <label className="text-sm">
            v = ({v[0]}, {v[1]})
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={v[0]}
              onChange={(e) => setV([Number(e.target.value), v[1]])}
              className="mt-1 w-full accent-teal-600"
            />
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={v[1]}
              onChange={(e) => setV([v[0], Number(e.target.value)])}
              className="mt-1 w-full accent-teal-600"
            />
          </label>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full min-w-[280px] max-w-md">
          <line x1={0} y1={oy} x2={W} y2={oy} stroke="#cbd5e1" strokeWidth={1} />
          <line x1={ox} y1={0} x2={ox} y2={H} stroke="#cbd5e1" strokeWidth={1} />
          <line x1={ox} y1={oy} x2={ou.x} y2={ou.y} stroke="#7c3aed" strokeWidth={2.5} markerEnd="url(#arrU)" />
          <line x1={ox} y1={oy} x2={ov.x} y2={ov.y} stroke="#0d9488" strokeWidth={2.5} markerEnd="url(#arrV)" />
          <defs>
            <marker id="arrU" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#7c3aed" />
            </marker>
            <marker id="arrV" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#0d9488" />
            </marker>
          </defs>
          <text x={ou.x + 6} y={ou.y - 4} className="fill-violet-700 text-xs font-bold">
            u
          </text>
          <text x={ov.x + 6} y={ov.y - 4} className="fill-teal-700 text-xs font-bold">
            v
          </text>
        </svg>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl bg-white/90 p-3 text-sm sm:grid-cols-2">
          <p>
            <strong>u·v</strong> = {d.toFixed(2)}
          </p>
          <p>
            <strong>|u|</strong> = {nu.toFixed(2)}, <strong>|v|</strong> = {nv.toFixed(2)}
          </p>
          <p>
            <strong>θ</strong> ≈ {angleDeg.toFixed(1)}°
          </p>
          <p>
            <strong>cos(θ)</strong> = {cosTheta.toFixed(3)}
          </p>
        </div>
        <p className="mt-2 text-center text-sm font-medium text-violet-800">{interpretation}</p>
      </div>
    </FadeIn>
  )
}
