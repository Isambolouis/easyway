import { useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import { clampByte, grayToCss } from './imagePixelUtils'
import {
  chessboardDistance,
  discreteGradient,
  euclideanDistance,
  manhattanDistance,
} from './imageMathUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

type DistMode = 'euclidean' | 'manhattan' | 'chessboard'

const DIST_FORMULAS: Record<DistMode, string> = {
  euclidean: String.raw`d=\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}`,
  manhattan: String.raw`d=|x_1-x_2|+|y_1-y_2|`,
  chessboard: String.raw`d=\max(|x_1-x_2|,|y_1-y_2|)`,
}

function computeDist(mode: DistMode, x1: number, y1: number, x2: number, y2: number) {
  if (mode === 'manhattan') return manhattanDistance(x1, y1, x2, y2)
  if (mode === 'chessboard') return chessboardDistance(x1, y1, x2, y2)
  return euclideanDistance(x1, y1, x2, y2)
}

export function Signal1Dvs2DLab() {
  const [dim, setDim] = useState<'1d' | '2d'>('2d')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    if (dim === '1d') {
      ctx.strokeStyle = '#0891b2'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < w; x++) {
        const t = x / w
        const y = h / 2 - Math.sin(t * Math.PI * 4) * (h * 0.35)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.fillStyle = '#64748b'
      ctx.font = '12px sans-serif'
      ctx.fillText('s(t) — signal 1D (temps)', 12, 20)
    } else {
      const cell = 8
      for (let y = 0; y < h / cell; y++) {
        for (let x = 0; x < w / cell; x++) {
          const v = clampByte(128 + 80 * Math.sin(x / 3) * Math.cos(y / 4))
          ctx.fillStyle = grayToCss(v)
          ctx.fillRect(x * cell, y * cell, cell, cell)
        }
      }
      ctx.fillStyle = '#64748b'
      ctx.font = '12px sans-serif'
      ctx.fillText('f(x,y) — signal 2D (spatial)', 12, 20)
    }
  }, [dim])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Signal 1D vs signal 2D</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setDim('1d')}
          className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', dim === '1d' ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
        >
          1D — s(t)
        </button>
        <button
          type="button"
          onClick={() => setDim('2d')}
          className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', dim === '2d' ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
        >
          2D — f(x,y)
        </button>
      </div>
      <canvas ref={canvasRef} width={420} height={160} className="mt-4 w-full max-w-full rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
    </div>
  )
}

export function DiscreteGridLab() {
  const [sel, setSel] = useState<{ m: number; n: number } | null>(null)
  const rows = 5
  const cols = 6
  const grid = useMemo(() => {
    return Array.from({ length: rows }, (_, m) =>
      Array.from({ length: cols }, (_, n) => clampByte(30 + m * 35 + n * 18 + ((m * n) % 7) * 12)),
    )
  }, [])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Notation discrète f[m, n]</p>
      <p className="mt-1 text-sm text-muted">Clique une case : ligne m, colonne n.</p>
      <div
        className="mt-4 inline-grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, 44px)` }}
      >
        {grid.flatMap((row, m) =>
          row.map((v, n) => (
            <button
              key={`${m}-${n}`}
              type="button"
              className={cn(
                'flex h-11 flex-col items-center justify-center rounded-lg text-[10px] font-bold transition',
                sel?.m === m && sel?.n === n ? 'ring-2 ring-cyan-500' : '',
              )}
              style={{ backgroundColor: grayToCss(v), color: v > 128 ? '#0f172a' : '#f8fafc' }}
              onClick={() => setSel({ m, n })}
            >
              <span>f[{m},{n}]</span>
              <span className="text-xs opacity-90">{v}</span>
            </button>
          )),
        )}
      </div>
      {sel && (
        <p className="mt-3 font-mono text-deep">
          f[{sel.m}, {sel.n}] = {grid[sel.m][sel.n]} — image {rows}×{cols}
        </p>
      )}
    </div>
  )
}

const TENSOR_EXAMPLES = [
  { dim: '0D', name: 'Scalaire', ex: 'Température = 22', shape: '()' },
  { dim: '1D', name: 'Vecteur', ex: 'Pixel gris = 128', shape: '(N,)' },
  { dim: '2D', name: 'Matrice', ex: 'Image niveaux de gris', shape: '(M, N)' },
  { dim: '3D', name: 'Tenseur 3D', ex: 'Image RGB', shape: '(M, N, 3)' },
  { dim: '4D', name: 'Tenseur 4D', ex: 'Vidéo RGB', shape: '(T, M, N, 3)' },
]

export function TensorStructureLab() {
  const [idx, setIdx] = useState(2)
  const t = TENSOR_EXAMPLES[idx]
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Tenseurs — de la matrice à la vidéo</p>
      <input type="range" min={0} max={4} value={idx} onChange={(e) => setIdx(Number(e.target.value))} className="mt-3 w-full max-w-md" />
      <div className="mt-4 rounded-xl border border-cyan-100 bg-white/80 p-4 dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]">
        <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{t.dim}</p>
        <p className="font-semibold text-deep">{t.name}</p>
        <p className="mt-2 text-sm text-muted">{t.ex}</p>
        <p className="mt-2 font-mono text-sm text-deep">Forme : {t.shape}</p>
      </div>
    </div>
  )
}

export function NyquistAliasingLab() {
  const [samples, setSamples] = useState(24)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fSignal = 5

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = '#94a3b8'
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    for (let x = 0; x < w; x++) {
      const t = (x / w) * Math.PI * 2 * fSignal
      const y = h / 2 - Math.sin(t) * (h * 0.38)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    const aliasing = samples < fSignal * 2
    for (let i = 0; i < samples; i++) {
      const x = (i / (samples - 1 || 1)) * (w - 1)
      const t = (x / w) * Math.PI * 2 * fSignal
      const raw = Math.sin(t)
      const y = h / 2 - raw * (h * 0.38)
      ctx.fillStyle = aliasing ? '#ef4444' : '#0891b2'
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [samples])

  const fs = samples
  const nyquistOk = fs >= 2 * fSignal

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Nyquist-Shannon — f_s ≥ 2 f_max</p>
      <label className="mt-3 block text-sm text-muted">
        Fréquence d’échantillonnage f_s : <strong>{samples}</strong> (f_max du signal ≈ {fSignal})
        <input type="range" min={4} max={40} value={samples} onChange={(e) => setSamples(Number(e.target.value))} className="w-full" />
      </label>
      <canvas ref={canvasRef} width={480} height={140} className="mt-4 w-full rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
      <p className={cn('mt-2 text-sm font-semibold', nyquistOk ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
        {nyquistOk ? '✓ Échantillonnage suffisant' : '✗ Aliasing — motifs faux, escaliers, perte de détail'}
      </p>
    </div>
  )
}

export function SpatialFrequencyLab() {
  const [freq, setFreq] = useState(2)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    const img = ctx.createImageData(w, h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const v = clampByte(128 + 127 * Math.sin((x / w) * Math.PI * 2 * freq) * Math.cos((y / h) * Math.PI * 2 * (freq / 2)))
        const i = (y * w + x) * 4
        img.data[i] = v
        img.data[i + 1] = v
        img.data[i + 2] = v
        img.data[i + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }, [freq])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Fréquences spatiales</p>
      <label className="mt-3 block text-sm text-muted">
        Fréquence : <strong>{freq < 4 ? 'Basse (zones lisses)' : 'Haute (contours, textures)'}</strong>
        <input type="range" min={1} max={12} value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="w-full" />
      </label>
      <canvas ref={canvasRef} width={200} height={200} className="mt-4 rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
    </div>
  )
}

const GRAD_GRID = [
  [40, 42, 45, 50, 80, 120, 160, 200],
  [42, 44, 48, 55, 90, 130, 170, 210],
  [45, 48, 52, 60, 100, 140, 180, 220],
  [50, 55, 60, 70, 110, 150, 190, 230],
  [80, 90, 100, 120, 160, 200, 230, 240],
  [120, 130, 140, 160, 200, 230, 245, 250],
]

export function GradientMagnitudeLab() {
  const [hover, setHover] = useState<{ m: number; n: number } | null>(null)
  const g = hover ? discreteGradient(GRAD_GRID, hover.m, hover.n) : null

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Gradient — magnitude et direction</p>
      <MathBlock tex={String.raw`|\nabla f|=\sqrt{\left(\frac{\partial f}{\partial x}\right)^2+\left(\frac{\partial f}{\partial y}\right)^2}`} />
      <div
        className="mt-4 inline-grid gap-px"
        style={{ gridTemplateColumns: `repeat(${GRAD_GRID[0].length}, 36px)` }}
      >
        {GRAD_GRID.flatMap((row, m) =>
          row.map((v, n) => (
            <div
              key={`${m}-${n}`}
              className="flex h-9 cursor-crosshair items-center justify-center text-[9px] font-bold"
              style={{
                backgroundColor: grayToCss(v),
                color: v > 128 ? '#0f172a' : '#fff',
                outline: hover?.m === m && hover?.n === n ? '2px solid #0891b2' : undefined,
              }}
              onMouseEnter={() => setHover({ m, n })}
              onMouseLeave={() => setHover(null)}
            />
          )),
        )}
      </div>
      {g && hover && (
        <p className="mt-3 text-sm text-muted">
          ∂f/∂x ≈ {g.gx.toFixed(0)} · ∂f/∂y ≈ {g.gy.toFixed(0)} · |∇f| ≈{' '}
          <strong className="text-deep">{g.mag.toFixed(1)}</strong> · θ ≈ {g.theta.toFixed(0)}°
          {g.mag > 40 ? ' → contour probable' : ' → zone uniforme'}
        </p>
      )}
    </div>
  )
}

export function PixelNeighborhoodLab() {
  const [conn, setConn] = useState<4 | 8>(4)
  const center = { m: 2, n: 2 }
  const neighbors: { m: number; n: number }[] = []
  const dirs4 = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const dirs8 = [...dirs4, [1, 1], [1, -1], [-1, 1], [-1, -1]]
  for (const [dm, dn] of conn === 4 ? dirs4 : dirs8) {
    neighbors.push({ m: center.m + dm, n: center.n + dn })
  }

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Voisinage 4-connexe vs 8-connexe</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setConn(4)} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', conn === 4 ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          4-connexe
        </button>
        <button type="button" onClick={() => setConn(8)} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', conn === 8 ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          8-connexe
        </button>
      </div>
      <div className="mt-4 inline-grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }, (_, i) => {
          const m = Math.floor(i / 5)
          const n = i % 5
          const isCenter = m === center.m && n === center.n
          const isNeighbor = neighbors.some((p) => p.m === m && p.n === n)
          return (
            <div
              key={i}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold',
                isCenter && 'bg-cyan-600 text-white',
                isNeighbor && 'bg-cyan-200 text-cyan-900 dark:bg-cyan-800 dark:text-cyan-100',
                !isCenter && !isNeighbor && 'bg-slate-100 text-muted dark:bg-slate-800',
              )}
            >
              {isCenter ? 'P' : isNeighbor ? 'V' : ''}
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-muted">P = pixel central · V = voisin ({conn}-connexe)</p>
    </div>
  )
}

export function PixelDistanceLab() {
  const [mode, setMode] = useState<DistMode>('euclidean')
  const [x1, setX1] = useState(6)
  const [y1, setY1] = useState(6)
  const [x2, setX2] = useState(-6)
  const [y2, setY2] = useState(-6)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const dx = x2 - x1
  const dy = y2 - y1
  const d = computeDist(mode, x1, y1, x2, y2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    const pad = 36
    const range = 14
    const toX = (x: number) => pad + ((x + range / 2) / range) * (w - 2 * pad)
    const toY = (y: number) => h - pad - ((y + range / 2) / range) * (h - 2 * pad)

    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    for (let i = -6; i <= 6; i += 2) {
      const gx = toX(i)
      const gy = toY(i)
      ctx.beginPath()
      ctx.moveTo(gx, pad)
      ctx.lineTo(gx, h - pad)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pad, gy)
      ctx.lineTo(w - pad, gy)
      ctx.stroke()
    }

    const px1 = toX(x1)
    const py1 = toY(y1)
    const px2 = toX(x2)
    const py2 = toY(y2)
    const cornerX = px2
    const cornerY = py1

    if (mode === 'euclidean') {
      ctx.setLineDash([6, 4])
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(px1, py1)
      ctx.lineTo(cornerX, cornerY)
      ctx.lineTo(px2, py2)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#64748b'
      ctx.font = '11px sans-serif'
      const midX = (px1 + cornerX) / 2
      const midY = (py1 + cornerY) / 2
      ctx.fillText(`Δx = ${Math.abs(dx).toFixed(0)}`, midX - 20, py1 + 18)
      ctx.fillText(`Δy = ${Math.abs(dy).toFixed(0)}`, cornerX + 8, midY)

      ctx.strokeStyle = '#0891b2'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(px1, py1)
      ctx.lineTo(px2, py2)
      ctx.stroke()
    } else {
      ctx.strokeStyle = '#0891b2'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      if (mode === 'manhattan') {
        ctx.moveTo(px1, py1)
        ctx.lineTo(cornerX, cornerY)
        ctx.lineTo(px2, py2)
      } else {
        ctx.strokeRect(
          Math.min(px1, px2),
          Math.min(py1, py2),
          Math.abs(px2 - px1),
          Math.abs(py2 - py1),
        )
      }
      ctx.stroke()
    }

    const drawPoint = (px: number, py: number, label: string) => {
      ctx.fillStyle = '#0891b2'
      ctx.beginPath()
      ctx.arc(px, py, 7, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#0e7490'
      ctx.font = 'bold 11px sans-serif'
      const tw = ctx.measureText(label).width
      ctx.fillStyle = '#e0f2fe'
      ctx.strokeStyle = '#0891b2'
      ctx.lineWidth = 1
      const bx = px - tw / 2 - 6
      const by = py - 28
      ctx.beginPath()
      ctx.roundRect(bx, by, tw + 12, 18, 9)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#0e7490'
      ctx.fillText(label, px - tw / 2, by + 13)
    }

    drawPoint(px1, py1, `A (${x1.toFixed(1)}, ${y1.toFixed(1)})`)
    drawPoint(px2, py2, `B (${x2.toFixed(1)}, ${y2.toFixed(1)})`)

    ctx.fillStyle = '#0891b2'
    ctx.font = 'bold 12px sans-serif'
    const mx = (px1 + px2) / 2
    const my = (py1 + py2) / 2 - 12
    ctx.fillText(`d = ${d.toFixed(2)}`, mx - 24, my)
  }, [mode, x1, y1, x2, y2, dx, dy, d])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Distance entre pixels</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(['euclidean', 'manhattan', 'chessboard'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn('rounded-lg px-3 py-1 text-xs font-semibold sm:text-sm', mode === m ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
          >
            {m === 'euclidean' ? 'Euclidienne' : m === 'manhattan' ? 'Manhattan' : 'Chessboard'}
          </button>
        ))}
      </div>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <MathBlock tex={DIST_FORMULAS[mode]} />
        <canvas ref={canvasRef} width={400} height={280} className="w-full rounded-xl border border-cyan-100 bg-white dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
          <p className="font-bold text-deep">Point A</p>
          <label className="text-muted">
            x₁ <input type="range" min={-8} max={8} step={0.5} value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full" />
          </label>
          <label className="text-muted">
            y₁ <input type="range" min={-8} max={8} step={0.5} value={y1} onChange={(e) => setY1(Number(e.target.value))} className="w-full" />
          </label>
        </div>
        <div className="space-y-2 rounded-lg border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
          <p className="font-bold text-deep">Point B</p>
          <label className="text-muted">
            x₂ <input type="range" min={-8} max={8} step={0.5} value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-full" />
          </label>
          <label className="text-muted">
            y₂ <input type="range" min={-8} max={8} step={0.5} value={y2} onChange={(e) => setY2(Number(e.target.value))} className="w-full" />
          </label>
        </div>
      </div>
    </div>
  )
}

export function SpatialCorrelationLab() {
  const [offset, setOffset] = useState(1)
  const base = 140
  const neighbor = clampByte(base + offset)
  const far = clampByte(base - 40)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Corrélation spatiale — pixels voisins similaires</p>
      <MathBlock tex="f(x,y) \approx f(x+1,y)" />
      <p className="mt-3 text-sm text-muted">
        Pixel central : <strong>{base}</strong> · voisin (+{offset}) : <strong>{neighbor}</strong> · pixel éloigné :{' '}
        <strong>{far}</strong>
      </p>
      <label className="mt-3 block text-sm text-muted">
        Décalage du voisin
        <input type="range" min={0} max={20} value={offset} onChange={(e) => setOffset(Number(e.target.value))} className="w-full max-w-md" />
      </label>
      <p className="mt-2 text-xs text-muted">Les images naturelles ont une forte redondance locale → utile pour compression et IA.</p>
    </div>
  )
}

export function ImageCh1MathQuiz() {
  return (
    <QuizCard
      question="Pour reconstruire un signal sans aliasing, Nyquist impose :"
      options={[
        { id: 'a', label: 'f_s ≥ 2 f_max', correct: true },
        { id: 'b', label: 'f_s = f_max', correct: false },
        { id: 'c', label: 'f_s ≤ f_max / 2', correct: false },
      ]}
      explanation="Il faut au moins deux échantillons par période du signal le plus rapide."
    />
  )
}
