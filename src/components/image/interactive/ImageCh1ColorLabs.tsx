import { useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import { clampByte, rgbToCss } from './imagePixelUtils'
import { colorCount24bit, hsvToRgb, luminance, rgbDistance, rgbToYcbcr } from './imageColorUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

const RGB_PRIMARIES: { name: string; rgb: [number, number, number] }[] = [
  { name: 'Noir', rgb: [0, 0, 0] },
  { name: 'Blanc', rgb: [255, 255, 255] },
  { name: 'Rouge', rgb: [255, 0, 0] },
  { name: 'Vert', rgb: [0, 255, 0] },
  { name: 'Bleu', rgb: [0, 0, 255] },
  { name: 'Jaune', rgb: [255, 255, 0] },
  { name: 'Cyan', rgb: [0, 255, 255] },
  { name: 'Magenta', rgb: [255, 0, 255] },
]

function RgbSliders({
  r,
  g,
  b,
  setR,
  setG,
  setB,
}: {
  r: number
  g: number
  b: number
  setR: (n: number) => void
  setG: (n: number) => void
  setB: (n: number) => void
}) {
  const channels: { label: string; val: number; set: (n: number) => void; bar: string }[] = [
    { label: 'R', val: r, set: setR, bar: 'bg-red-500' },
    { label: 'G', val: g, set: setG, bar: 'bg-green-500' },
    { label: 'B', val: b, set: setB, bar: 'bg-blue-500' },
  ]

  return (
    <>
      {channels.map(({ label, val, set, bar }) => (
        <label key={label} className="flex items-center gap-2 text-sm text-muted">
          <span className="w-4 font-bold text-deep">{label}</span>
          <input
            type="range"
            min={0}
            max={255}
            value={val}
            onChange={(e) => set(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-8 text-right font-mono text-deep">{val}</span>
          <div className={cn('h-2 w-8 rounded', bar)} style={{ opacity: (val / 255) * 0.5 + 0.5 }} />
        </label>
      ))}
    </>
  )
}

export function RgbAdditiveLab() {
  const [r, setR] = useState(200)
  const [g, setG] = useState(80)
  const [b, setB] = useState(40)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Mélange additif RGB</p>
      <p className="mt-1 text-sm text-muted">La couleur à l’écran = superposition des trois canaux lumineux.</p>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <RgbSliders r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-full overflow-hidden rounded-xl border border-cyan-100 dark:border-[var(--color-border)]">
            <div className="flex-1" style={{ background: `rgb(${r},0,0)` }} />
            <div className="flex-1" style={{ background: `rgb(0,${g},0)` }} />
            <div className="flex-1" style={{ background: `rgb(0,0,${b})` }} />
          </div>
          <div className="h-24 w-24 rounded-2xl border-2 border-cyan-300 shadow-lg" style={{ backgroundColor: rgbToCss(r, g, b) }} />
          <p className="font-mono text-sm text-deep">
            P = ({r}, {g}, {b})
          </p>
        </div>
      </div>
    </div>
  )
}

export function RgbPrimariesTableLab() {
  const [sel, setSel] = useState(2)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Couleurs fondamentales RGB</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted">
              <th className="py-2">Couleur</th>
              <th className="py-2">RGB</th>
              <th className="py-2">Aperçu</th>
            </tr>
          </thead>
          <tbody>
            {RGB_PRIMARIES.map((row, i) => (
              <tr
                key={row.name}
                className={cn(
                  'cursor-pointer border-b border-cyan-50 dark:border-[var(--color-border)]',
                  i === sel && 'bg-cyan-50/70 dark:bg-cyan-950/30',
                )}
                onClick={() => setSel(i)}
              >
                <td className="py-2 font-medium text-deep">{row.name}</td>
                <td className="py-2 font-mono text-muted">
                  ({row.rgb.join(', ')})
                </td>
                <td className="py-2">
                  <span
                    className="inline-block h-8 w-8 rounded-lg border border-slate-200 dark:border-[var(--color-border)]"
                    style={{ backgroundColor: rgbToCss(...row.rgb) }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function RgbCubeLab() {
  const [r, setR] = useState(255)
  const [g, setG] = useState(128)
  const [b, setB] = useState(64)
  const size = 140

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Cube RGB — espace 3D des couleurs</p>
      <p className="mt-1 text-sm text-muted">Chaque pixel est un point (R, G, B) dans le cube [0,255]³.</p>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <RgbSliders r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} />
        </div>
        <div className="flex items-center justify-center">
          <div
            className="relative"
            style={{ width: size + 40, height: size + 40, perspective: 400 }}
          >
            <div
              className="absolute left-1/2 top-1/2 border-2 border-cyan-400/60 bg-cyan-50/20 dark:bg-cyan-950/20"
              style={{
                width: size,
                height: size,
                transform: 'translate(-50%, -50%) rotateX(58deg) rotateZ(-38deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg ring-2 ring-cyan-500"
                style={{
                  left: `${(r / 255) * 100}%`,
                  top: `${100 - (g / 255) * 100}%`,
                  backgroundColor: rgbToCss(r, g, b),
                  boxShadow: `0 0 0 4px ${rgbToCss(r, g, b)}44`,
                }}
              />
            </div>
            <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted">
              Projection R–G (B = {b} → profondeur)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ColorDistanceLab() {
  const [r1, setR1] = useState(255)
  const [g1, setG1] = useState(0)
  const [b1, setB1] = useState(0)
  const [r2, setR2] = useState(200)
  const [g2, setG2] = useState(50)
  const [b2, setB2] = useState(50)
  const d = rgbDistance(r1, g1, b1, r2, g2, b2)
  const maxD = Math.sqrt(3 * 255 ** 2)
  const similarity = Math.max(0, 100 - (d / maxD) * 100)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Distance euclidienne entre deux couleurs</p>
      <MathBlock tex="d=\sqrt{(R_1-R_2)^2+(G_1-G_2)^2+(B_1-B_2)^2}" />
      <div className="interactive-panel__body mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold text-muted">Couleur A</p>
          <div className="mb-2 h-14 w-full rounded-xl" style={{ backgroundColor: rgbToCss(r1, g1, b1) }} />
          <RgbSliders r={r1} g={g1} b={b1} setR={setR1} setG={setG1} setB={setB1} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-muted">Couleur B</p>
          <div className="mb-2 h-14 w-full rounded-xl" style={{ backgroundColor: rgbToCss(r2, g2, b2) }} />
          <RgbSliders r={r2} g={g2} b={b2} setR={setR2} setG={setG2} setB={setB2} />
        </div>
      </div>
      <p className="mt-4 text-center text-lg font-bold text-cyan-800 dark:text-cyan-200">
        d ≈ {d.toFixed(1)} · similarité ≈ {similarity.toFixed(0)} %
      </p>
    </div>
  )
}

export function BitDepthLab() {
  const [bits, setBits] = useState(8)
  const colorsPerChannel = 2 ** bits
  const totalColors = bits <= 8 ? colorsPerChannel ** 3 : colorCount24bit()
  const levels = Math.min(16, colorsPerChannel)
  const ramp = Array.from({ length: levels }, (_, i) =>
    Math.round((i / (levels - 1 || 1)) * 255),
  )

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Profondeur de couleur (bits par canal)</p>
      <label className="mt-3 block text-sm text-muted">
        Bits par canal : <strong>{bits}</strong> → {colorsPerChannel.toLocaleString('fr-FR')} niveaux / canal
      </label>
      <input type="range" min={1} max={8} value={bits} onChange={(e) => setBits(Number(e.target.value))} className="w-full max-w-md" />
      <p className="mt-2 text-sm text-muted">
        RGB {bits * 3} bits/pixel → environ{' '}
        <strong className="text-deep">
          {bits === 8 ? '16,7 millions' : totalColors.toLocaleString('fr-FR')} couleurs
        </strong>
      </p>
      <div className="mt-4 flex h-10 w-full overflow-hidden rounded-lg">
        {ramp.map((v, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: rgbToCss(v, v * 0.6, 255 - v) }} />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">Bande dégradée quantifiée (moins de bits → bandes visibles).</p>
    </div>
  )
}

export function AlphaChannelLab() {
  const [r, setR] = useState(220)
  const [g, setG] = useState(60)
  const [b, setB] = useState(60)
  const [a, setA] = useState(180)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Canal Alpha — transparence</p>
      <p className="mt-1 text-sm text-muted">P = (R, G, B, A) — 0 = transparent, 255 = opaque.</p>
      <div
        className="interactive-panel__body mt-4 flex flex-col items-center gap-4 sm:flex-row"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        <div
          className="h-32 w-32 rounded-2xl border-2 border-white shadow-lg"
          style={{ backgroundColor: `rgba(${r},${g},${b},${a / 255})` }}
        />
        <div className="w-full max-w-xs space-y-2">
          <RgbSliders r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} />
          <label className="flex items-center gap-2 text-sm text-muted">
            Alpha
            <input type="range" min={0} max={255} value={a} onChange={(e) => setA(Number(e.target.value))} className="flex-1" />
            <span className="font-mono text-deep">{a}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export function MemoryChannelOrderLab() {
  const [bgr, setBgr] = useState(false)
  const pixels: [number, number, number][] = [
    [255, 0, 0],
    [0, 255, 0],
  ]
  const bytes = pixels.flatMap(([r, g, b]) => (bgr ? [b, g, r] : [r, g, b]))

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Ordre des canaux en mémoire</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setBgr(false)}
          className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', !bgr ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
        >
          RGB
        </button>
        <button
          type="button"
          onClick={() => setBgr(true)}
          className={cn('rounded-lg px-3 py-1.5 text-sm font-semibold', bgr ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
        >
          BGR (OpenCV)
        </button>
      </div>
      <div className="mt-4 flex gap-4">
        {pixels.map(([r, g, b], i) => (
          <div key={i} className="text-center">
            <div className="mx-auto h-12 w-12 rounded-lg border" style={{ backgroundColor: rgbToCss(r, g, b) }} />
            <p className="mt-1 text-xs text-muted">P{i + 1}</p>
          </div>
        ))}
      </div>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-3 font-mono text-sm text-cyan-200">
        {bytes.join(' ')}
      </pre>
      <p className="mt-2 text-xs text-muted">
        {bgr
          ? '(255,0,0) en BGR affiche du bleu à l’écran si interprété comme RGB.'
          : 'Ordre classique : rouge puis vert pour P1, P2.'}
      </p>
    </div>
  )
}

export function LuminanceFromRgbLab() {
  const [r, setR] = useState(100)
  const [g, setG] = useState(200)
  const [b, setB] = useState(50)
  const y = luminance(r, g, b)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Luminance depuis RGB</p>
      <MathBlock tex="Y = 0{,}299\,R + 0{,}587\,G + 0{,}114\,B" />
      <div className="interactive-panel__body mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <RgbSliders r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-20 w-20 rounded-xl border" style={{ backgroundColor: rgbToCss(r, g, b) }} />
          <span className="text-muted">→</span>
          <div className="h-20 w-20 rounded-xl border" style={{ backgroundColor: rgbToCss(y, y, y) }} />
          <p className="font-mono text-deep">Y = {y}</p>
        </div>
      </div>
    </div>
  )
}

export function HsvColorLab() {
  const [h, setH] = useState(0)
  const [s, setS] = useState(100)
  const [v, setV] = useState(100)
  const rgb = hsvToRgb(h, s, v)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Espace HSV — teinte, saturation, luminosité</p>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-sm text-muted">
            H (teinte) {h.toFixed(0)}°
            <input type="range" min={0} max={360} value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block text-sm text-muted">
            S (saturation) {s.toFixed(0)} %
            <input type="range" min={0} max={100} value={s} onChange={(e) => setS(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block text-sm text-muted">
            V (value) {v.toFixed(0)} %
            <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full" />
          </label>
          <div
            className="h-4 w-full rounded-full"
            style={{
              background:
                'linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red)',
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-28 w-28 rounded-2xl border-2 border-cyan-200 shadow-inner" style={{ backgroundColor: rgbToCss(rgb.r, rgb.g, rgb.b) }} />
          <p className="font-mono text-sm text-deep">
            RGB ({rgb.r}, {rgb.g}, {rgb.b})
          </p>
          <p className="text-xs text-muted">
            0° rouge · 120° vert · 240° bleu
          </p>
        </div>
      </div>
    </div>
  )
}

export function YcbcrLab() {
  const [r, setR] = useState(180)
  const [g, setG] = useState(100)
  const [b, setB] = useState(60)
  const { y, cb, cr } = rgbToYcbcr(r, g, b)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">YCbCr — luminance et chrominance (JPEG, vidéo)</p>
      <p className="mt-1 text-sm text-muted">L’œil perçoit mieux Y : on compresse Cb/Cr plus fortement.</p>
      <div className="interactive-panel__body mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <RgbSliders r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <div className="mx-auto h-16 w-full rounded-lg border" style={{ backgroundColor: rgbToCss(y, y, y) }} />
            <p className="mt-1 font-bold">Y</p>
            <p className="text-muted">{y}</p>
          </div>
          <div>
            <div className="mx-auto h-16 w-full rounded-lg border" style={{ backgroundColor: rgbToCss(128, cb, 128) }} />
            <p className="mt-1 font-bold">Cb</p>
            <p className="text-muted">{cb}</p>
          </div>
          <div>
            <div className="mx-auto h-16 w-full rounded-lg border" style={{ backgroundColor: rgbToCss(cr, 128, 128) }} />
            <p className="mt-1 font-bold">Cr</p>
            <p className="text-muted">{cr}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const NOISE_W = 64
const NOISE_H = 48

function buildBaseImage(): number[][] {
  return Array.from({ length: NOISE_H }, (_, y) =>
    Array.from({ length: NOISE_W }, (_, x) => {
      const v = 128 + 60 * Math.sin(x / 8) * Math.cos(y / 6)
      return clampByte(v)
    }),
  )
}

export function ImageNoiseLab() {
  const [type, setType] = useState<'none' | 'gaussian' | 'saltpepper'>('none')
  const [amount, setAmount] = useState(25)
  const [seed, setSeed] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const base = useMemo(() => buildBaseImage(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(NOISE_W, NOISE_H)
    for (let y = 0; y < NOISE_H; y++) {
      for (let x = 0; x < NOISE_W; x++) {
        let v = base[y][x]
        if (type === 'gaussian') {
          const n = (Math.random() - 0.5) * 2 * amount
          v = clampByte(v + n)
        } else if (type === 'saltpepper') {
          const p = amount / 100
          if (Math.random() < p / 2) v = 0
          else if (Math.random() < p) v = 255
        }
        const i = (y * NOISE_W + x) * 4
        img.data[i] = v
        img.data[i + 1] = v
        img.data[i + 2] = v
        img.data[i + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }, [base, type, amount, seed])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Bruit numérique — g(x,y) = f(x,y) + n(x,y)</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            ['none', 'Sans bruit'],
            ['gaussian', 'Gaussien'],
            ['saltpepper', 'Sel & poivre'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-semibold',
              type === id ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {type !== 'none' && (
        <label className="mt-3 block text-sm text-muted">
          Intensité : <strong>{amount}</strong>
          <input type="range" min={5} max={80} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full max-w-md" />
        </label>
      )}
      <button
        type="button"
        className="mt-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300"
        onClick={() => setSeed((s) => s + 1)}
      >
        ↻ Régénérer le bruit
      </button>
      <canvas
        ref={canvasRef}
        width={NOISE_W}
        height={NOISE_H}
        className="mt-4 w-full max-w-md rounded-xl border border-cyan-100 dark:border-[var(--color-border)]"
        style={{ imageRendering: 'pixelated' }}
      />
      <p className="mt-2 text-xs text-muted">« Régénérer » tire une nouvelle réalisation aléatoire du bruit.</p>
    </div>
  )
}

export function ImageCh1ColorQuiz() {
  return (
    <QuizCard
      question="En OpenCV, un pixel (255, 0, 0) en BGR correspond visuellement à :"
      options={[
        { id: 'a', label: 'Bleu pur (canal B à 255)', correct: true },
        { id: 'b', label: 'Rouge pur', correct: false },
        { id: 'c', label: 'Vert pur', correct: false },
      ]}
      explanation="OpenCV stocke les canaux dans l’ordre Bleu–Vert–Rouge : le premier octet est B=255."
    />
  )
}
