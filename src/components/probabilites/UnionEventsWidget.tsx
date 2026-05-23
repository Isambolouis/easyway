import { useId, useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function clampIntersect(pA: number, pB: number, pAB: number) {
  return Math.min(pA, pB, clamp01(pAB))
}

/** Géométrie du Venn : rayons ∝ √P, distance entre centres ↓ quand P(A∩B) augmente. */
function vennGeometry(pA: number, pB: number, pAB: number) {
  const rA = 16 + 42 * Math.sqrt(Math.max(pA, 0.02))
  const rB = 16 + 42 * Math.sqrt(Math.max(pB, 0.02))
  const minP = Math.min(pA, pB)
  const overlapRatio = minP > 0.001 ? pAB / minP : 0
  const dTouch = rA + rB - 4
  const dNested = Math.abs(rA - rB) * 0.35
  const dist = dTouch - overlapRatio * (dTouch - dNested)
  const cx = 120
  const cy = 72
  return {
    rA,
    rB,
    cxA: cx - dist / 2,
    cxB: cx + dist / 2,
    cy,
    labelX: cx,
    labelY: cy,
  }
}

function ProbSlider({
  label,
  value,
  onChange,
  max,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  max?: number
}) {
  const hi = max ?? 1
  return (
    <label className="block text-sm">
      <span className="font-medium text-deep">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={hi}
          step={0.01}
          value={value}
          onChange={(e) => onChange(clamp01(Number(e.target.value)))}
          className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
        />
        <span className="w-12 text-right font-mono text-xs text-muted">{value.toFixed(2)}</span>
      </div>
    </label>
  )
}

export type UnionEventsWidgetProps = {
  initialPA?: number
  initialPB?: number
  initialPAB?: number
}

export function UnionEventsWidget({
  initialPA = 0.38,
  initialPB = 0.72,
  initialPAB = 0.15,
}: UnionEventsWidgetProps = {}) {
  const clipAId = useId()
  const [pA, setPA] = useState(initialPA)
  const [pB, setPB] = useState(initialPB)
  const [pAB, setPAB] = useState(() => clampIntersect(initialPA, initialPB, initialPAB))

  const pIntersect = useMemo(() => clampIntersect(pA, pB, pAB), [pA, pB, pAB])

  const pUnion = useMemo(() => clamp01(pA + pB - pIntersect), [pA, pB, pIntersect])

  const geom = useMemo(() => vennGeometry(pA, pB, pIntersect), [pA, pB, pIntersect])

  const setPAClamped = (v: number) => {
    const next = clamp01(v)
    setPA(next)
    setPAB((prev) => clampIntersect(next, pB, prev))
  }

  const setPBClamped = (v: number) => {
    const next = clamp01(v)
    setPB(next)
    setPAB((prev) => clampIntersect(pA, next, prev))
  }

  const setPABClamped = (v: number) => {
    setPAB(clampIntersect(pA, pB, v))
  }

  const labelA = { x: geom.cxA - geom.rA * 0.45, y: geom.cy }
  const labelB = { x: geom.cxB + geom.rB * 0.45, y: geom.cy }

  return (
    <div className="interactive-panel my-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
      <div className="interactive-panel__body grid min-w-[min(100%,20rem)] grid-cols-1 gap-6 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <MathBlock tex="P(A \cup B) = P(A) + P(B) - P(A \cap B)" className="!my-0" />
          <div className="scroll-x-card space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <ProbSlider label="P(A)" value={pA} onChange={setPAClamped} />
            <ProbSlider label="P(B)" value={pB} onChange={setPBClamped} />
            <ProbSlider
              label="P(A ∩ B)"
              value={pIntersect}
              onChange={setPABClamped}
              max={Math.min(pA, pB)}
            />
          </div>
          <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-deep">
            <MathInline tex="P(A \cup B)" /> ≈ <strong>{pUnion.toFixed(2)}</strong>
            <span className="text-muted">
              {' '}
              (= {pA.toFixed(2)} + {pB.toFixed(2)} − {pIntersect.toFixed(2)})
            </span>
          </p>
          <p className="text-xs text-muted">
            Les cercles <strong>s’agrandissent</strong> avec P(A) et P(B) ; ils se <strong>rapprochent</strong> quand
            P(A ∩ B) augmente.
          </p>
        </div>

        <div className="flex min-w-[240px] flex-col items-center justify-center">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
            Diagramme de Venn (dynamique)
          </p>
          <svg viewBox="0 0 240 144" className="h-auto w-full max-w-[340px]">
            <defs>
              <clipPath id={clipAId}>
                <circle cx={geom.cxA} cy={geom.cy} r={geom.rA} />
              </clipPath>
            </defs>
            <circle
              cx={geom.cxA}
              cy={geom.cy}
              r={geom.rA}
              fill="#93c5fd"
              fillOpacity={0.5}
              stroke="#2563eb"
              strokeWidth={2}
              className="transition-all duration-200"
            />
            <circle
              cx={geom.cxB}
              cy={geom.cy}
              r={geom.rB}
              fill="#fde68a"
              fillOpacity={0.55}
              stroke="#b45309"
              strokeWidth={2}
              className="transition-all duration-200"
            />
            <circle
              cx={geom.cxB}
              cy={geom.cy}
              r={geom.rB}
              fill="#a78bfa"
              fillOpacity={0.82}
              stroke="#6d28d9"
              strokeWidth={1.5}
              clipPath={`url(#${clipAId})`}
              className="transition-all duration-200"
            />
            <text
              x={labelA.x}
              y={labelA.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={20}
              fontWeight={700}
              fill="#1e3a5f"
              className="pointer-events-none select-none"
            >
              A
            </text>
            <text
              x={labelB.x}
              y={labelB.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={20}
              fontWeight={700}
              fill="#78350f"
              className="pointer-events-none select-none"
            >
              B
            </text>
            {pIntersect > 0.01 && (
              <text
                x={geom.labelX}
                y={geom.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fontWeight={700}
                fill="#1e1b4b"
                className="pointer-events-none select-none"
              >
                {pIntersect.toFixed(2)}
              </text>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
