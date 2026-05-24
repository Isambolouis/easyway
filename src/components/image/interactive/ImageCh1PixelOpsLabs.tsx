import { useEffect, useMemo, useRef, useState } from 'react'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import { clampByte, grayToCss } from './imagePixelUtils'
import {
  applyAffine,
  applyGamma,
  applyLog,
  applyNegative,
  applyThreshold,
  blendImages,
  buildSampleGrayImage,
  computeHistogram,
  diffImages,
  equalizeHistogram,
  normalizeToByte,
  putGrayImageData,
  quantizeImage,
} from './imageSampleUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

const W = 64
const H = 48
const SCALE = 4

function useSampleImage() {
  return useMemo(() => buildSampleGrayImage(W, H), [])
}

function DualImagePreview({
  left,
  right,
  leftLabel,
  rightLabel,
}: {
  left: number[]
  right: number[]
  leftLabel: string
  rightLabel: string
}) {
  const c1 = useRef<HTMLCanvasElement>(null)
  const c2 = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    for (const [ref, data] of [
      [c1, left],
      [c2, right],
    ] as const) {
      const canvas = ref.current
      if (!canvas) continue
      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      putGrayImageData(ctx, data, W, H, SCALE)
    }
  }, [left, right])

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="text-center">
        <p className="mb-1 text-xs font-bold text-muted">{leftLabel}</p>
        <canvas ref={c1} width={W * SCALE} height={H * SCALE} className="mx-auto rounded-lg border border-cyan-100 dark:border-[var(--color-border)]" style={{ imageRendering: 'pixelated' }} />
      </div>
      <div className="text-center">
        <p className="mb-1 text-xs font-bold text-muted">{rightLabel}</p>
        <canvas ref={c2} width={W * SCALE} height={H * SCALE} className="mx-auto rounded-lg border border-cyan-100 dark:border-[var(--color-border)]" style={{ imageRendering: 'pixelated' }} />
      </div>
    </div>
  )
}

export function AffineTransformLab() {
  const src = useSampleImage()
  const [alpha, setAlpha] = useState(1.2)
  const [beta, setBeta] = useState(10)
  const out = useMemo(() => applyAffine(src, alpha, beta), [src, alpha, beta])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Transformation affine — g = α·f + β</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-muted">
          α (contraste) : <strong>{alpha.toFixed(2)}</strong>
          <input type="range" min={0.3} max={2.5} step={0.05} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-sm text-muted">
          β (luminosité) : <strong>{beta}</strong>
          <input type="range" min={-80} max={80} value={beta} onChange={(e) => setBeta(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <DualImagePreview left={src} right={out} leftLabel="f(x,y)" rightLabel="g(x,y)" />
      <p className="mt-2 text-xs text-muted">Valeurs saturées à [0, 255] — ex. 300 → 255.</p>
    </div>
  )
}

export function ArithmeticPixelLab() {
  const src = useSampleImage()
  const [mode, setMode] = useState<'add' | 'sub' | 'mul'>('add')
  const [c, setC] = useState(40)
  const [alpha, setAlpha] = useState(1.3)

  const out = useMemo(() => {
    if (mode === 'add') return src.map((v) => clampByte(v + c))
    if (mode === 'sub') return src.map((v) => clampByte(v - c))
    return src.map((v) => clampByte(alpha * v))
  }, [src, mode, c, alpha])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Opérations arithmétiques ponctuelles</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(
          [
            ['add', '+ c'],
            ['sub', '− c'],
            ['mul', '× α'],
          ] as const
        ).map(([m, label]) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={cn('rounded-lg px-3 py-1 text-sm font-semibold', mode === m ? 'bg-cyan-600 text-white' : 'border text-muted')}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'mul' ? (
        <label className="mt-3 block text-sm text-muted">
          α = <strong>{alpha.toFixed(2)}</strong>
          <input type="range" min={0.3} max={2.5} step={0.05} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      ) : (
        <label className="mt-3 block text-sm text-muted">
          c = <strong>{c}</strong>
          <input type="range" min={-100} max={100} value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <div className="mt-3 rounded-lg bg-cyan-50/50 p-2 font-mono text-sm dark:bg-cyan-950/30">
        {mode === 'add' && `g = f + ${c} → éclaircit`}
        {mode === 'sub' && `g = f − ${c} → assombrit`}
        {mode === 'mul' && `g = ${alpha.toFixed(2)}·f → ${alpha > 1 ? 'contraste ↑' : 'contraste ↓'}`}
      </div>
      <DualImagePreview left={src} right={out} leftLabel="Entrée" rightLabel="Sortie" />
    </div>
  )
}

export function NegativeThresholdLab() {
  const src = useSampleImage()
  const [neg, setNeg] = useState(false)
  const [t, setT] = useState(100)
  const [threshOnly, setThreshOnly] = useState(false)

  const out = useMemo(() => {
    let d = neg ? applyNegative(src) : [...src]
    if (threshOnly) d = applyThreshold(d, t)
    return d
  }, [src, neg, t, threshOnly])

  const pixelA = 200
  const pixelB = 50
  const outA = (threshOnly || neg ? applyThreshold(neg ? applyNegative([pixelA]) : [pixelA], t) : [pixelA])[0]
  const outB = (threshOnly || neg ? applyThreshold(neg ? applyNegative([pixelB]) : [pixelB], t) : [pixelB])[0]

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Négatif & seuillage</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setNeg(!neg)} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', neg ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          Négatif 255−f
        </button>
        <button type="button" onClick={() => setThreshOnly(!threshOnly)} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', threshOnly ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          Seuillage T
        </button>
      </div>
      {threshOnly && (
        <label className="mt-3 block text-sm text-muted">
          Seuil T = <strong>{t}</strong>
          <input type="range" min={0} max={255} value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted">
            <th className="py-1">Pixel</th>
            <th className="py-1">f</th>
            <th className="py-1">g</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>{pixelA}</td>
            <td>
              <span className="inline-block h-4 w-4 rounded border align-middle" style={{ background: grayToCss(outA) }} /> {outA}
            </td>
          </tr>
          <tr>
            <td>B</td>
            <td>{pixelB}</td>
            <td>
              <span className="inline-block h-4 w-4 rounded border align-middle" style={{ background: grayToCss(outB) }} /> {outB}
            </td>
          </tr>
        </tbody>
      </table>
      <DualImagePreview left={src} right={out} leftLabel="Entrée" rightLabel="Sortie" />
    </div>
  )
}

export function LogGammaLab() {
  const src = useSampleImage()
  const [mode, setMode] = useState<'log' | 'gamma'>('gamma')
  const [gamma, setGamma] = useState(0.6)

  const out = useMemo(() => {
    if (mode === 'log') return applyLog(src)
    return applyGamma(src, gamma)
  }, [src, mode, gamma])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Log & correction gamma</p>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => setMode('log')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', mode === 'log' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          log(1+f)
        </button>
        <button type="button" onClick={() => setMode('gamma')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', mode === 'gamma' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          f^γ
        </button>
      </div>
      {mode === 'gamma' && (
        <label className="mt-3 block text-sm text-muted">
          γ = <strong>{gamma.toFixed(2)}</strong> {gamma < 1 ? '(éclaircit)' : '(assombrit)'}
          <input type="range" min={0.2} max={2.5} step={0.05} value={gamma} onChange={(e) => setGamma(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <DualImagePreview left={src} right={out} leftLabel="Entrée" rightLabel="Sortie" />
    </div>
  )
}

export function NormalizeQuantizeLab() {
  const src = useSampleImage()
  const [mode, setMode] = useState<'norm' | 'quant'>('norm')
  const [levels, setLevels] = useState(8)

  const out = useMemo(() => {
    if (mode === 'norm') return normalizeToByte(src)
    return quantizeImage(src, levels)
  }, [src, mode, levels])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Normalisation & quantification</p>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => setMode('norm')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', mode === 'norm' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          Normaliser [0,1]
        </button>
        <button type="button" onClick={() => setMode('quant')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', mode === 'quant' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          Quantifier
        </button>
      </div>
      {mode === 'quant' && (
        <label className="mt-3 block text-sm text-muted">
          Niveaux : <strong>{levels}</strong>
          <input type="range" min={2} max={64} value={levels} onChange={(e) => setLevels(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <DualImagePreview left={src} right={out} leftLabel="Entrée" rightLabel="Sortie" />
      {mode === 'norm' && <p className="mt-2 text-xs text-muted">g = (f − f_min) / (f_max − f_min) — essentiel pour le deep learning.</p>}
    </div>
  )
}

function HistChart({ data, highlight }: { data: number[]; highlight?: 'narrow' | 'wide' }) {
  const hist = useMemo(() => computeHistogram(data), [data])
  const max = Math.max(...hist, 1)
  return (
    <div className="flex h-20 items-end gap-px">
      {hist.map((count, i) => {
        const active = highlight === 'narrow' ? i > 80 && i < 180 : highlight === 'wide' ? count > max * 0.02 : true
        return (
          <div
            key={i}
            className={cn('flex-1 min-w-0 rounded-t', active ? 'bg-cyan-600' : 'bg-cyan-200/50')}
            style={{ height: `${(count / max) * 100}%` }}
            title={`${i}: ${count}`}
          />
        )
      })}
    </div>
  )
}

export function HistogramEqualizationLab() {
  const src = useSampleImage()
  const [eq, setEq] = useState(false)
  const out = useMemo(() => (eq ? equalizeHistogram(src) : src), [src, eq])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Histogramme & égalisation</p>
      <p className="mt-1 text-xs text-muted">h(r_k) = n_k — distribution des niveaux de gris.</p>
      <button
        type="button"
        onClick={() => setEq(!eq)}
        className={cn('mt-3 rounded-lg px-4 py-2 text-sm font-semibold', eq ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
      >
        {eq ? '✓ Égalisation activée' : 'Appliquer égalisation d’histogramme'}
      </button>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold text-muted">Avant — {eq ? 'contraste faible possible' : 'distribution actuelle'}</p>
          <HistChart data={src} highlight={eq ? 'narrow' : undefined} />
        </div>
        <div>
          <p className="text-xs font-bold text-muted">Après — histogramme étalé</p>
          <HistChart data={out} highlight={eq ? 'wide' : undefined} />
        </div>
      </div>
      <DualImagePreview left={src} right={out} leftLabel="f" rightLabel="g" />
    </div>
  )
}

const MASK_SIZE = 6

function emptyMask(): boolean[][] {
  return Array.from({ length: MASK_SIZE }, () => Array(MASK_SIZE).fill(false))
}

export function BinaryLogicLab() {
  const [a, setA] = useState(() => {
    const m = emptyMask()
    m[1][1] = m[1][2] = m[2][1] = m[2][2] = true
    return m
  })
  const [b, setB] = useState(() => {
    const m = emptyMask()
    m[2][2] = m[2][3] = m[3][2] = m[3][3] = true
    return m
  })
  const [op, setOp] = useState<'and' | 'or' | 'xor' | 'not'>('and')

  const result = useMemo(() => {
    const r = emptyMask()
    for (let y = 0; y < MASK_SIZE; y++) {
      for (let x = 0; x < MASK_SIZE; x++) {
        const va = a[y][x]
        const vb = b[y][x]
        if (op === 'and') r[y][x] = va && vb
        else if (op === 'or') r[y][x] = va || vb
        else if (op === 'xor') r[y][x] = va !== vb
        else r[y][x] = !va
      }
    }
    return r
  }, [a, b, op])

  const toggle = (set: typeof setA, y: number, x: number) => {
    set((prev) => prev.map((row, j) => row.map((c, i) => (j === y && i === x ? !c : c))))
  }

  const MaskGrid = ({
    mask,
    onToggle,
    label,
    readOnly = false,
  }: {
    mask: boolean[][]
    onToggle?: (y: number, x: number) => void
    label: string
    readOnly?: boolean
  }) => (
    <div>
      <p className="mb-1 text-xs font-bold text-muted">{label}</p>
      <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `repeat(${MASK_SIZE}, 20px)` }}>
        {mask.flatMap((row, y) =>
          row.map((cell, x) => {
            const cls = cn('h-5 w-5 rounded-sm border', cell ? 'bg-cyan-600 border-cyan-700' : 'bg-white border-slate-200 dark:bg-slate-800')
            return readOnly ? (
              <div key={`${y}-${x}`} className={cls} />
            ) : (
              <button key={`${y}-${x}`} type="button" className={cls} onClick={() => onToggle?.(y, x)} />
            )
          }),
        )}
      </div>
    </div>
  )

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Opérations logiques (masques binaires)</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(['and', 'or', 'xor', 'not'] as const).map((o) => (
          <button key={o} type="button" onClick={() => setOp(o)} className={cn('rounded-lg px-2 py-1 text-xs font-semibold uppercase', op === o ? 'bg-cyan-600 text-white' : 'border text-muted')}>
            {o === 'not' ? 'NOT A' : o}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-4">
        <MaskGrid mask={a} onToggle={(y, x) => toggle(setA, y, x)} label="Masque A" />
        {op !== 'not' && <MaskGrid mask={b} onToggle={(y, x) => toggle(setB, y, x)} label="Masque B" />}
        <MaskGrid mask={result} label={op === 'and' ? 'A ∩ B' : op === 'or' ? 'A ∪ B' : op === 'xor' ? 'A ⊕ B' : '¬A'} readOnly />
      </div>
    </div>
  )
}

export function ImageDiffBlendLab() {
  const src = useSampleImage()
  const shifted = useMemo(() => {
    const d = [...src]
    const offset = 4
    for (let y = H - 1; y >= 0; y--) {
      for (let x = W - 1; x >= 0; x--) {
        const nx = x - offset
        const ny = y
        d[y * W + x] = nx >= 0 ? src[ny * W + nx] : 0
      }
    }
    return d
  }, [src])

  const [tab, setTab] = useState<'diff' | 'blend'>('diff')
  const [alpha, setAlpha] = useState(0.5)

  const out = useMemo(() => {
    if (tab === 'diff') return diffImages(src, shifted)
    return blendImages(src, shifted, alpha)
  }, [src, shifted, tab, alpha])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Différence & fusion d’images</p>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => setTab('diff')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', tab === 'diff' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          |f − g| — mouvement
        </button>
        <button type="button" onClick={() => setTab('blend')} className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', tab === 'blend' ? 'bg-cyan-600 text-white' : 'border text-muted')}>
          α·f + (1−α)·g
        </button>
      </div>
      {tab === 'blend' && (
        <label className="mt-3 block text-sm text-muted">
          α = <strong>{alpha.toFixed(2)}</strong>
          <input type="range" min={0} max={1} step={0.05} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <DualImagePreview left={tab === 'diff' ? src : src} right={out} leftLabel={tab === 'diff' ? 'f et g décalées' : 'Fusion'} rightLabel="Résultat" />
    </div>
  )
}

export function RoiMaskLab() {
  const src = useSampleImage()
  const [x0, setX0] = useState(12)
  const [y0, setY0] = useState(8)
  const [x1, setX1] = useState(44)
  const [y1, setY1] = useState(36)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const masked = useMemo(() => {
    return src.map((v, i) => {
      const x = i % W
      const y = Math.floor(i / W)
      const inside = x >= x0 && x <= x1 && y >= y0 && y <= y1
      return inside ? v : clampByte(v * 0.15)
    })
  }, [src, x0, y0, x1, y1])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    putGrayImageData(ctx, masked, W, H, SCALE)
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 2
    ctx.strokeRect(x0 * SCALE, y0 * SCALE, (x1 - x0) * SCALE, (y1 - y0) * SCALE)
  }, [masked, x0, y0, x1, y1])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">ROI — région d’intérêt & masque</p>
      <p className="mt-1 text-xs text-muted">Zone encadrée = ROI conservée · extérieur atténué (masque).</p>
      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <label className="text-muted">
          x₀ <input type="range" min={0} max={W - 4} value={x0} onChange={(e) => setX0(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-muted">
          x₁ <input type="range" min={4} max={W - 1} value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-muted">
          y₀ <input type="range" min={0} max={H - 4} value={y0} onChange={(e) => setY0(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-muted">
          y₁ <input type="range" min={4} max={H - 1} value={y1} onChange={(e) => setY1(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <canvas ref={canvasRef} width={W * SCALE} height={H * SCALE} className="mx-auto mt-3 rounded-lg border dark:border-[var(--color-border)]" style={{ imageRendering: 'pixelated' }} />
    </div>
  )
}

export function ImageCh1PixelOpsQuiz() {
  return (
    <QuizCard
      question="La transformation g(x,y) = α·f(x,y) + β modifie principalement :"
      options={[
        { id: 'a', label: 'Contraste (α) et luminosité (β)', correct: true },
        { id: 'b', label: 'Uniquement la taille de l’image', correct: false },
        { id: 'c', label: 'La résolution spatiale', correct: false },
      ]}
      explanation="C’est la transformation affine ponctuelle classique : α étire/comprime les niveaux, β les translate."
    />
  )
}
