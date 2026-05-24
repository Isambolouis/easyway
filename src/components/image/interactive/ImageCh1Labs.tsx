import { useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import {
  decimalToBinary8,
  formatBytes,
  grayToCss,
  quantizeLevel,
  rgbToCss,
} from './imagePixelUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

const CH1_MATRIX: number[][] = [
  [12, 200, 45],
  [56, 78, 90],
  [123, 255, 18],
]

const WAVELENGTHS = [
  { color: 'Violet', range: '380–450 nm', css: '#8b5cf6' },
  { color: 'Bleu', range: '450–495 nm', css: '#3b82f6' },
  { color: 'Vert', range: '495–570 nm', css: '#22c55e' },
  { color: 'Jaune', range: '570–590 nm', css: '#eab308' },
  { color: 'Rouge', range: '620–750 nm', css: '#ef4444' },
]

const LIGHT_STEPS = [
  'Source lumineuse',
  'Lumière frappe l’objet',
  'Réflexion partielle',
  'Capteur (œil / caméra)',
  'Conversion en signal numérique',
]

/** Scène 16×12 pour démo vision humaine / machine */
function buildDemoScene(w: number, h: number): number[][] {
  const m: number[][] = Array.from({ length: h }, () => Array(w).fill(40))
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (y < h * 0.45) m[y][x] = 30 + x * 2
      else if (y > h * 0.72) m[y][x] = 90 + (x % 5) * 8
      else m[y][x] = 55 + ((x + y) % 7) * 12
    }
  }
  const cx = Math.floor(w * 0.72)
  const cy = Math.floor(h * 0.28)
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (cx + dx >= 0 && cx + dx < w && cy + dy >= 0 && cy + dy < h) {
        m[cy + dy][cx + dx] = 240
      }
    }
  }
  return m
}

export function VisionHumanVsMachineLab() {
  const [machine, setMachine] = useState(false)
  const [hover, setHover] = useState<{ x: number; y: number; v: number } | null>(null)
  const scene = useMemo(() => buildDemoScene(16, 12), [])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Démo — Vision humaine vs vision machine</p>
      <p className="mt-1 text-sm text-muted">
        Bascule : le cerveau interprète la scène ; l’ordinateur ne voit qu’un tableau de nombres.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMachine(false)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-semibold transition',
            !machine ? 'bg-cyan-600 text-white' : 'border border-cyan-200 bg-white text-muted dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]',
          )}
        >
          👁 Vision humaine
        </button>
        <button
          type="button"
          onClick={() => setMachine(true)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-semibold transition',
            machine ? 'bg-cyan-600 text-white' : 'border border-cyan-200 bg-white text-muted dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]',
          )}
        >
          🖥 Vision machine
        </button>
      </div>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div
          className="overflow-auto rounded-xl border border-cyan-100 bg-slate-900/5 p-2 dark:border-[var(--color-border)]"
          style={{ imageRendering: 'pixelated' }}
        >
          <div
            className="inline-grid gap-px"
            style={{ gridTemplateColumns: `repeat(${scene[0].length}, 14px)` }}
          >
            {scene.flatMap((row, y) =>
              row.map((v, x) => (
                <div
                  key={`${x}-${y}`}
                  className="relative h-[14px] w-[14px] cursor-crosshair"
                  style={{ backgroundColor: grayToCss(v) }}
                  onMouseEnter={() => setHover({ x, y, v })}
                  onMouseLeave={() => setHover(null)}
                >
                  {machine && (
                    <span className="absolute inset-0 flex items-center justify-center text-[6px] font-bold leading-none text-white mix-blend-difference">
                      {v}
                    </span>
                  )}
                </div>
              )),
            )}
          </div>
        </div>
        <div className="text-sm text-muted">
          {machine ? (
            <>
              <p>
                Position survolée :{' '}
                <strong className="text-deep">
                  ({hover?.x ?? '—'}, {hover?.y ?? '—'}) → I = {hover?.v ?? '—'}
                </strong>
              </p>
              <p className="mt-2">
                Pas d’interprétation « ciel » ou « soleil » : seulement{' '}
                <MathInline tex="I(x,y)" /> dans une matrice.
              </p>
            </>
          ) : (
            <p>
              Tu perçois une scène (ciel, sol, source lumineuse). Le cerveau complète et interprète — ce que la
              machine ne fait pas sans apprentissage.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function LightPipelineLab() {
  const [step, setStep] = useState(0)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Chaîne physique de formation d’une image</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {LIGHT_STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold transition',
              step === i ? 'bg-cyan-600 text-white' : 'bg-cyan-100/80 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200',
            )}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-cyan-100 bg-white/80 p-4 text-sm text-deep dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]">
        <strong>Étape {step + 1} —</strong> {LIGHT_STEPS[step]}
      </p>
    </div>
  )
}

export function WavelengthSpectrumLab() {
  const [idx, setIdx] = useState(2)
  const w = WAVELENGTHS[idx]
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Spectre visible — longueur d’onde et couleur</p>
      <div
        className="mt-4 h-10 w-full cursor-pointer rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 20%, #22c55e 45%, #eab308 65%, #ef4444 85%, #dc2626 100%)',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const t = (e.clientX - rect.left) / rect.width
          setIdx(Math.min(4, Math.floor(t * 5)))
        }}
        role="slider"
        aria-label="Spectre visible"
        tabIndex={0}
      />
      <p className="mt-3 text-center text-sm font-semibold" style={{ color: w.css }}>
        {w.color} — {w.range}
      </p>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-cyan-100 text-xs uppercase text-muted dark:border-[var(--color-border)]">
            <th className="py-2">Couleur</th>
            <th className="py-2">λ approx.</th>
          </tr>
        </thead>
        <tbody>
          {WAVELENGTHS.map((row, i) => (
            <tr
              key={row.color}
              className={cn('border-b border-cyan-50 dark:border-[var(--color-border)]', i === idx && 'bg-cyan-50/60 dark:bg-cyan-950/30')}
            >
              <td className="py-2 font-medium" style={{ color: row.css }}>
                {row.color}
              </td>
              <td className="py-2 text-muted">{row.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PixelGridMatrixLab() {
  const [hover, setHover] = useState<{ x: number; y: number; v: number } | null>(null)
  const cols = CH1_MATRIX[0].length

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Grille interactive — fonction I(x, y)</p>
      <p className="mt-1 text-sm text-muted">Survole une case : position et intensité du pixel.</p>
      <div className="interactive-panel__body mt-4 grid gap-6 lg:grid-cols-2">
        <div
          className="inline-grid gap-1 rounded-xl border border-cyan-100 p-2 dark:border-[var(--color-border)]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(48px, 1fr))` }}
        >
          {CH1_MATRIX.flatMap((row, y) =>
            row.map((v, x) => (
              <button
                key={`${x}-${y}`}
                type="button"
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded-lg border-2 text-xs font-bold transition',
                  hover?.x === x && hover?.y === y
                    ? 'border-cyan-500 ring-2 ring-cyan-300'
                    : 'border-transparent',
                )}
                style={{ backgroundColor: grayToCss(v), color: v > 128 ? '#0f172a' : '#f8fafc' }}
                onMouseEnter={() => setHover({ x, y, v })}
                onMouseLeave={() => setHover(null)}
              >
                <span className="opacity-80">({x},{y})</span>
                <span className="text-base">{v}</span>
              </button>
            )),
          )}
        </div>
        <div>
          <p className="text-sm text-muted">
            {hover ? (
              <>
                <MathInline tex={`I(${hover.x},${hover.y}) = ${hover.v}`} />
              </>
            ) : (
              'Survole un pixel…'
            )}
          </p>
          <MathBlock
            tex={String.raw`\text{Image} = \begin{bmatrix} 12 & 200 & 45 \\ 56 & 78 & 90 \\ 123 & 255 & 18 \end{bmatrix}`}
          />
        </div>
      </div>
    </div>
  )
}

export function GrayscalePixelLab() {
  const [v, setV] = useState(145)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Un pixel en niveaux de gris (8 bits)</p>
      <div className="interactive-panel__body mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div
          className="h-32 w-32 rounded-2xl border-4 border-cyan-200 shadow-inner dark:border-cyan-700"
          style={{ backgroundColor: grayToCss(v) }}
        />
        <div className="w-full max-w-xs space-y-3">
          <label className="block text-sm text-muted">
            Intensité <MathInline tex="I(x,y)" /> : <strong className="text-deep">{v}</strong>
          </label>
          <input type="range" min={0} max={255} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full" />
          <p className="text-xs text-muted">
            Binaire : <code className="rounded bg-slate-100 px-1 dark:bg-[var(--color-elevated)]">{decimalToBinary8(v)}</code>
          </p>
          <p className="text-xs text-muted">0 = noir · 255 = blanc</p>
        </div>
      </div>
    </div>
  )
}

export function ImageTypeLab() {
  const [mode, setMode] = useState<'binary' | 'gray' | 'rgb'>('gray')
  const [r, setR] = useState(255)
  const [g, setG] = useState(0)
  const [b, setB] = useState(0)
  const [threshold, setThreshold] = useState(128)
  const [gray, setGray] = useState(120)

  const preview =
    mode === 'binary'
      ? grayToCss(gray >= threshold ? 255 : 0)
      : mode === 'gray'
        ? grayToCss(gray)
        : rgbToCss(r, g, b)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Types d’images — binaire, niveaux de gris, RGB</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(['binary', 'gray', 'rgb'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-semibold',
              mode === m ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted dark:border-[var(--color-border)]',
            )}
          >
            {m === 'binary' ? 'Binaire' : m === 'gray' ? 'Niveaux de gris' : 'RGB'}
          </button>
        ))}
      </div>
      <div className="interactive-panel__body mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <div className="h-28 w-28 rounded-2xl border-2 border-cyan-200" style={{ backgroundColor: preview }} />
          {mode === 'rgb' && (
            <p className="text-center text-sm font-mono text-deep">
              P = ({r}, {g}, {b})
            </p>
          )}
        </div>
        <div className="space-y-3 text-sm">
          {mode === 'binary' && (
            <>
              <label className="text-muted">Seuil (0 ou 1)</label>
              <input type="range" min={0} max={255} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
              <label className="text-muted">Intensité source</label>
              <input type="range" min={0} max={255} value={gray} onChange={(e) => setGray(Number(e.target.value))} />
            </>
          )}
          {mode === 'gray' && (
            <input type="range" min={0} max={255} value={gray} onChange={(e) => setGray(Number(e.target.value))} />
          )}
          {mode === 'rgb' && (
            <>
              {(['R', 'G', 'B'] as const).map((ch, i) => {
                const val = [r, g, b][i]
                const set = [setR, setG, setB][i]
                return (
                  <label key={ch} className="flex items-center gap-2 text-muted">
                    {ch}
                    <input type="range" min={0} max={255} value={val} onChange={(e) => set(Number(e.target.value))} className="flex-1" />
                    <span className="w-8 text-right text-deep">{val}</span>
                  </label>
                )
              })}
              <p className="text-xs text-muted">Tenseur H × W × 3 (3 canaux par pixel)</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function MemorySizeLab() {
  const [w, setW] = useState(1920)
  const [h, setH] = useState(1080)
  const [channels, setChannels] = useState(3)
  const [bytesPer, setBytesPer] = useState(1)
  const total = w * h * channels * bytesPer

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Taille mémoire — T = H × W × C × B</p>
      <div className="interactive-panel__body mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3 text-sm">
          <label className="block text-muted">
            Largeur W: <strong>{w}</strong>
            <input type="range" min={64} max={3840} step={64} value={w} onChange={(e) => setW(Number(e.target.value))} className="mt-1 w-full" />
          </label>
          <label className="block text-muted">
            Hauteur H: <strong>{h}</strong>
            <input type="range" min={64} max={2160} step={64} value={h} onChange={(e) => setH(Number(e.target.value))} className="mt-1 w-full" />
          </label>
          <label className="block text-muted">
            Canaux C
            <select
              value={channels}
              onChange={(e) => setChannels(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-cyan-200 bg-white px-2 py-1 dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]"
            >
              <option value={1}>1 (niveaux de gris)</option>
              <option value={3}>3 (RGB)</option>
              <option value={4}>4 (RGBA)</option>
            </select>
          </label>
          <label className="block text-muted">
            Octets par canal B
            <select
              value={bytesPer}
              onChange={(e) => setBytesPer(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-cyan-200 bg-white px-2 py-1 dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]"
            >
              <option value={1}>1 (8 bits)</option>
              <option value={2}>2 (16 bits)</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-cyan-50/50 p-4 dark:bg-cyan-950/30">
          <p className="text-sm text-muted">
            {w} × {h} × {channels} × {bytesPer} =
          </p>
          <p className="text-2xl font-bold text-cyan-800 dark:text-cyan-200">{total.toLocaleString('fr-FR')} octets</p>
          <p className="text-sm text-muted">≈ {formatBytes(total)}</p>
        </div>
      </div>
    </div>
  )
}

/** Motif 8×8 pour effet pixelisation au zoom */
const ZOOM_PATTERN: number[][] = [
  [20, 40, 60, 80, 100, 120, 140, 160],
  [30, 50, 70, 90, 110, 130, 150, 170],
  [45, 65, 85, 105, 125, 145, 165, 185],
  [55, 75, 95, 115, 135, 155, 175, 195],
  [65, 85, 105, 125, 145, 165, 185, 205],
  [75, 95, 115, 135, 155, 175, 195, 215],
  [85, 105, 125, 145, 165, 185, 205, 225],
  [95, 115, 135, 155, 175, 195, 215, 235],
]

export function PixelZoomLab() {
  const [zoom, setZoom] = useState(4)
  const cell = 8
  const size = ZOOM_PATTERN.length * cell * zoom

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Zoom numérique — pixels visibles</p>
      <p className="mt-1 text-sm text-muted">
        En agrandissant, les carrés apparaissent : l’ordinateur « invente » parfois des valeurs (interpolation).
      </p>
      <label className="mt-4 block text-sm text-muted">
        Facteur de zoom : <strong>{zoom}×</strong>
      </label>
      <input type="range" min={1} max={16} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full max-w-md" />
      <div className="mt-4 overflow-auto rounded-xl border border-cyan-100 p-2 dark:border-[var(--color-border)]">
        <div
          className="inline-grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${ZOOM_PATTERN[0].length}, ${cell * zoom}px)`,
            imageRendering: 'pixelated',
          }}
        >
          {ZOOM_PATTERN.flatMap((row, y) =>
            row.map((v, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: cell * zoom,
                  height: cell * zoom,
                  backgroundColor: grayToCss(v),
                }}
              />
            )),
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        Affichage {size}×{size} px — résolution native 8×8 pixels
      </p>
    </div>
  )
}

export function SamplingQuantizationLab() {
  const [samples, setSamples] = useState(12)
  const [bits, setBits] = useState(8)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    // Courbe continue (lumière simulée)
    ctx.strokeStyle = '#0e7490'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let x = 0; x < w; x++) {
      const t = x / w
      const y = h * 0.5 - Math.sin(t * Math.PI * 2) * (h * 0.35) - Math.cos(t * Math.PI * 4) * (h * 0.08)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Échantillons
    for (let i = 0; i < samples; i++) {
      const x = (i / (samples - 1 || 1)) * (w - 1)
      const t = x / w
      const raw = 128 + Math.sin(t * Math.PI * 2) * 90 + Math.cos(t * Math.PI * 4) * 20
      const q = quantizeLevel(raw, bits)
      const y = h - (q / 255) * (h - 20) - 10
      ctx.fillStyle = '#0891b2'
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#164e63'
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, h)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }, [samples, bits])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Discrétisation — échantillonnage & quantification</p>
      <div className="interactive-panel__body mt-4 space-y-4">
        <label className="block text-sm text-muted">
          Points d’échantillonnage (monde continu → pixels) : <strong>{samples}</strong>
          <input type="range" min={4} max={40} value={samples} onChange={(e) => setSamples(Number(e.target.value))} className="w-full" />
        </label>
        <label className="block text-sm text-muted">
          Profondeur (bits) — quantification : <strong>{bits}</strong> bits → {2 ** bits} niveaux
          <input type="range" min={1} max={8} value={bits} onChange={(e) => setBits(Number(e.target.value))} className="w-full" />
        </label>
        <canvas ref={canvasRef} width={520} height={160} className="w-full max-w-full rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
        <p className="text-xs text-muted">
          Ligne cyan = signal continu · Points = échantillons quantifiés (moins de bits → moins de nuances).
        </p>
      </div>
    </div>
  )
}

export function ImageCh1Quiz() {
  return (
    <QuizCard
      question="Pour une image RGB 1920×1080 en 8 bits par canal, combien d’octets occupe-t-elle (sans compression) ?"
      options={[
        { id: 'a', label: '1920 × 1080 × 3 ≈ 6,2 Mo', correct: true },
        { id: 'b', label: '1920 × 1080 ≈ 2 Mo', correct: false },
        { id: 'c', label: '1920 × 1080 × 8', correct: false },
      ]}
      explanation="T = H × W × C × B avec C=3 canaux et B=1 octet par canal → 6 220 800 octets."
    />
  )
}
