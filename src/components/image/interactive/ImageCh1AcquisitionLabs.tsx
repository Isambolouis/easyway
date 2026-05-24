import { useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import { clampByte, grayToCss, rgbToCss } from './imagePixelUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

const ACQUISITION_STEPS = [
  'Lumière',
  'Objet',
  'Lentille',
  'Capteur',
  'Signal électrique',
  'Numérisation',
  'Image',
]

const CAMERA_PIPELINE = [
  'Capture lumineuse',
  'Photon → électron',
  'Amplification',
  'Numérisation (ADC)',
  'Dématriçage Bayer',
  'Réduction du bruit',
  'Correction couleur',
  'Compression',
  'Stockage',
]

const REFLECTANCE_SAMPLES = [
  { name: 'Neige', r: 0.92, note: 'Réflectance élevée' },
  { name: 'Béton gris', r: 0.45, note: 'Moyenne' },
  { name: 'Charbon', r: 0.06, note: 'Très faible' },
  { name: 'Métal poli', r: 0.75, note: 'Spéculaire, variable' },
]

type BayerCell = 'R' | 'G' | 'B'

function bayerAt(x: number, y: number): BayerCell {
  const evenX = x % 2 === 0
  const evenY = y % 2 === 0
  if (evenY && evenX) return 'G'
  if (evenY && !evenX) return 'R'
  if (!evenY && evenX) return 'B'
  return 'G'
}

const BAYER_COLOR: Record<BayerCell, string> = {
  R: '#ef4444',
  G: '#22c55e',
  B: '#3b82f6',
}

export function AcquisitionPipelineLab() {
  const [step, setStep] = useState(0)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Pipeline de formation d’image</p>
      <div className="mt-4 flex flex-wrap items-center gap-1">
        {ACQUISITION_STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                'rounded-lg px-2 py-1 text-xs font-semibold transition sm:text-sm',
                step === i ? 'bg-cyan-600 text-white' : 'bg-cyan-100/80 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200',
              )}
            >
              {label}
            </button>
            {i < ACQUISITION_STEPS.length - 1 && <span className="text-cyan-400">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-cyan-100 bg-white/80 p-3 text-sm dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]">
        <strong>Étape {step + 1} — {ACQUISITION_STEPS[step]}</strong>
      </p>
    </div>
  )
}

export function ReflectanceModelLab() {
  const [reflectance, setReflectance] = useState(0.6)
  const [light, setLight] = useState(0.85)
  const i = clampByte(reflectance * light * 255)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Modèle I = R · L</p>
      <MathBlock tex="I = R \cdot L" />
      <div className="interactive-panel__body mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm text-muted">
            Réflectance R : <strong>{reflectance.toFixed(2)}</strong>
            <input type="range" min={0.05} max={1} step={0.01} value={reflectance} onChange={(e) => setReflectance(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block text-sm text-muted">
            Lumière incidente L : <strong>{light.toFixed(2)}</strong>
            <input type="range" min={0.1} max={1} step={0.01} value={light} onChange={(e) => setLight(Number(e.target.value))} className="w-full" />
          </label>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-24 w-full max-w-[200px] rounded-xl border" style={{ backgroundColor: grayToCss(i) }} />
          <p className="font-mono text-deep">I ≈ {i} (intensité captée)</p>
        </div>
      </div>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs uppercase text-muted">
            <th className="py-2">Objet</th>
            <th className="py-2">R</th>
            <th className="py-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {REFLECTANCE_SAMPLES.map((row) => (
            <tr key={row.name} className="border-b border-cyan-50 dark:border-[var(--color-border)]">
              <td className="py-2">{row.name}</td>
              <td className="py-2 font-mono">{row.r}</td>
              <td className="py-2 text-muted">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PinholeProjectionLab() {
  const [X, setX] = useState(2)
  const [Y, setY] = useState(1)
  const [Z, setZ] = useState(5)
  const [f, setF] = useState(35)
  const x = (f * X) / Z
  const y = (f * Y) / Z
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    const lensX = w * 0.22
    const planeX = w * 0.78
    const cy = h / 2
    const scale = 18
    const pz = Z
    const px = X * scale
    const py = -Y * scale
    const objX = lensX + (px / pz) * (lensX - 40)
    const objY = cy + (py / pz) * (lensX - 40)
    const imgY = cy + (y / f) * 40

    ctx.strokeStyle = '#94a3b8'
    ctx.setLineDash([4, 4])
    ctx.strokeRect(planeX - 4, 20, 8, h - 40)
    ctx.setLineDash([])

    ctx.fillStyle = '#0891b2'
    ctx.beginPath()
    ctx.arc(lensX, cy, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#0f766e'
    ctx.beginPath()
    ctx.arc(objX, objY, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(objX, objY)
    ctx.lineTo(lensX, cy)
    ctx.lineTo(planeX, imgY)
    ctx.stroke()

    ctx.fillStyle = '#dc2626'
    ctx.beginPath()
    ctx.arc(planeX, imgY, 7, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#64748b'
    ctx.font = '11px sans-serif'
    ctx.fillText('Objet 3D', objX - 20, objY - 14)
    ctx.fillText('(x,y)', planeX - 12, imgY - 12)
    ctx.fillText('f', lensX - 4, cy - 14)
  }, [X, Y, Z, f, x, y])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Caméra sténopé — projection perspective</p>
      <MathBlock tex="x = \dfrac{fX}{Z}, \quad y = \dfrac{fY}{Z}" />
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2 text-sm">
          <label className="text-muted">
            X : <strong>{X}</strong>
            <input type="range" min={-4} max={4} step={0.1} value={X} onChange={(e) => setX(Number(e.target.value))} className="w-full" />
          </label>
          <label className="text-muted">
            Y : <strong>{Y}</strong>
            <input type="range" min={-4} max={4} step={0.1} value={Y} onChange={(e) => setY(Number(e.target.value))} className="w-full" />
          </label>
          <label className="text-muted">
            Z (profondeur) : <strong>{Z}</strong>
            <input type="range" min={1} max={12} step={0.1} value={Z} onChange={(e) => setZ(Number(e.target.value))} className="w-full" />
          </label>
          <label className="text-muted">
            f (focale) : <strong>{f} mm</strong>
            <input type="range" min={10} max={80} value={f} onChange={(e) => setF(Number(e.target.value))} className="w-full" />
          </label>
          <p className="font-mono text-deep">
            Projection : x = {x.toFixed(2)}, y = {y.toFixed(2)}
          </p>
          <p className="text-xs text-muted">Z grand → objet lointain → projection petite sur le capteur.</p>
        </div>
        <canvas ref={canvasRef} width={400} height={200} className="w-full rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
      </div>
    </div>
  )
}

export function CcdCmosLab() {
  const [tech, setTech] = useState<'ccd' | 'cmos'>('cmos')
  const info = {
    ccd: {
      title: 'CCD',
      points: ['Qualité historique élevée', 'Coût plus élevé', 'Lecture séquentielle plus lente'],
    },
    cmos: {
      title: 'CMOS',
      points: ['Rapide et économique', 'Dominant (smartphones, webcams, IA)', 'Lecture pixel par pixel intégrée'],
    },
  }[tech]

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">CCD vs CMOS</p>
      <div className="mt-3 flex gap-2">
        {(['ccd', 'cmos'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTech(t)}
            className={cn('rounded-lg px-4 py-2 text-sm font-semibold uppercase', tech === t ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
        {info.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export function AdcQuantizationLab() {
  const [bits, setBits] = useState(4)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const levels = 2 ** bits

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = '#0e7490'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let px = 0; px < w; px++) {
      const t = px / w
      const raw = 128 + 90 * Math.sin(t * Math.PI * 3)
      const q = Math.round(raw / (255 / (levels - 1))) * (255 / (levels - 1))
      const y = h - (q / 255) * (h - 20) - 10
      if (px === 0) ctx.moveTo(px, y)
      else ctx.lineTo(px, y)
    }
    ctx.stroke()

    for (let i = 0; i < levels; i++) {
      const lv = (i / (levels - 1)) * 255
      const y = h - (lv / 255) * (h - 20) - 10
      ctx.strokeStyle = '#cbd5e1'
      ctx.setLineDash([2, 4])
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }, [bits, levels])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">ADC — quantification réelle</p>
      <p className="mt-1 text-sm text-muted">Signal analogique → niveaux discrets.</p>
      <label className="mt-3 block text-sm text-muted">
        Résolution ADC : <strong>{bits} bits</strong> → {levels} niveaux
        <input type="range" min={2} max={8} value={bits} onChange={(e) => setBits(Number(e.target.value))} className="w-full max-w-md" />
      </label>
      <canvas ref={canvasRef} width={480} height={140} className="mt-4 w-full max-w-full rounded-xl border border-cyan-100 dark:border-[var(--color-border)]" />
    </div>
  )
}

export function DynamicRangeLab() {
  const [iMin, setIMin] = useState(8)
  const [iMax, setIMax] = useState(240)
  const dr = iMax / Math.max(iMin, 1)

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Dynamic Range — DR = I_max / I_min</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-muted">
          I_min : <strong>{iMin}</strong>
          <input type="range" min={1} max={100} value={iMin} onChange={(e) => setIMin(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-sm text-muted">
          I_max : <strong>{iMax}</strong>
          <input type="range" min={100} max={255} value={iMax} onChange={(e) => setIMax(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <div
        className="mt-4 h-12 w-full rounded-lg"
        style={{ background: `linear-gradient(90deg, ${grayToCss(iMin)}, ${grayToCss(iMax)})` }}
      />
      <p className="mt-2 text-center text-lg font-bold text-cyan-800 dark:text-cyan-200">DR ≈ {dr.toFixed(1)}</p>
    </div>
  )
}

export function ExposureTriangleLab() {
  const [aperture, setAperture] = useState(2.8)
  const [shutterMs, setShutterMs] = useState(8)
  const [iso, setIso] = useState(400)

  const brightness = (100 / aperture ** 2) * (shutterMs / 10) * (iso / 400)
  const blur = shutterMs / 4
  const noise = iso / 200
  const exposureScore = Math.min(100, brightness)
  const clipped = brightness > 95

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Triangle d’exposition — ouverture · vitesse · ISO</p>
      <div className="interactive-panel__body mt-4 space-y-3">
        <label className="block text-sm text-muted">
          Ouverture f/<strong>{aperture}</strong>
          <input type="range" min={1.8} max={16} step={0.1} value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="w-full" />
        </label>
        <label className="block text-sm text-muted">
          Temps d’exposition : <strong>1/{Math.round(1000 / shutterMs)} s</strong> ({shutterMs} ms)
          <input type="range" min={1} max={200} value={shutterMs} onChange={(e) => setShutterMs(Number(e.target.value))} className="w-full" />
        </label>
        <label className="block text-sm text-muted">
          ISO : <strong>{iso}</strong>
          <input type="range" min={100} max={6400} step={100} value={iso} onChange={(e) => setIso(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950/30">
          <p className="text-xs text-muted">Luminosité</p>
          <p className="font-bold text-deep">{exposureScore.toFixed(0)} %</p>
        </div>
        <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950/30">
          <p className="text-xs text-muted">Flou mouvement</p>
          <p className="font-bold text-deep">{blur.toFixed(0)} %</p>
        </div>
        <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950/30">
          <p className="text-xs text-muted">Bruit</p>
          <p className="font-bold text-deep">{noise.toFixed(0)} %</p>
        </div>
      </div>
      <div
        className="mt-4 h-20 w-full rounded-xl border"
        style={{
          backgroundColor: grayToCss(clipped ? 255 : clampByte(exposureScore * 2.2)),
          filter: `blur(${blur * 0.08}px)`,
          opacity: clipped ? 1 : 0.95,
        }}
      />
      <p className="mt-2 text-xs text-muted">
        {clipped ? '⚠ Saturation possible (zones brûlées)' : shutterMs > 50 ? 'Temps long → risque de flou de mouvement' : 'Réglage équilibré'}
      </p>
    </div>
  )
}

export function MotionBlurLab() {
  const [shutter, setShutter] = useState(30)
  const [speed, setSpeed] = useState(50)
  const blurPx = (shutter / 1000) * speed * 0.8

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Flou de mouvement</p>
      <label className="mt-3 block text-sm text-muted">
        Temps d’exposition : <strong>{shutter} ms</strong>
        <input type="range" min={1} max={120} value={shutter} onChange={(e) => setShutter(Number(e.target.value))} className="w-full" />
      </label>
      <label className="block text-sm text-muted">
        Vitesse de l’objet : <strong>{speed}</strong>
        <input type="range" min={0} max={100} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" />
      </label>
      <div className="relative mt-6 h-16 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
        <div
          className="absolute top-1/2 h-8 w-12 -translate-y-1/2 rounded-lg bg-cyan-600"
          style={{
            left: '20%',
            boxShadow: `${blurPx}px 0 12px 0 rgba(8,145,178,0.5), ${blurPx * 2}px 0 20px 0 rgba(8,145,178,0.25)`,
          }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">Trajectoire pendant l’exposition → étirement des pixels.</p>
    </div>
  )
}

export function SnrLab() {
  const [signal, setSignal] = useState(180)
  const [noise, setNoise] = useState(25)
  const [seed, setSeed] = useState(0)
  const snr = signal / Math.max(noise, 1)
  const observed = useMemo(() => {
    const r = Math.sin(seed * 12.9898) * 43758.5453
    const n = (r - Math.floor(r) - 0.5) * noise * 2
    return clampByte(signal + n)
  }, [signal, noise, seed])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Rapport signal / bruit (SNR)</p>
      <MathBlock tex="SNR = \dfrac{\text{Signal}}{\text{Bruit}}" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-muted">
          Signal
          <input type="range" min={50} max={240} value={signal} onChange={(e) => setSignal(Number(e.target.value))} className="w-full" />
        </label>
        <label className="text-sm text-muted">
          Bruit
          <input type="range" min={5} max={80} value={noise} onChange={(e) => setNoise(Number(e.target.value))} className="w-full" />
        </label>
      </div>
      <p className="mt-2 text-center font-bold text-cyan-800 dark:text-cyan-200">SNR ≈ {snr.toFixed(2)}</p>
      <div className="mx-auto mt-3 h-16 w-16 rounded-lg border" style={{ backgroundColor: grayToCss(observed) }} />
      <button type="button" className="mt-2 w-full text-sm font-semibold text-cyan-700 dark:text-cyan-300" onClick={() => setSeed((s) => s + 1)}>
        ↻ Nouvelle réalisation du bruit
      </button>
    </div>
  )
}

export function ExposureSaturationLab() {
  const [exposure, setExposure] = useState(50)
  const hist = useMemo(() => {
    const bins = Array(16).fill(0)
    for (let i = 0; i < 200; i++) {
      const v = clampByte(40 + exposure * 2.2 + (Math.sin(i * 0.3) * 30 + (i % 17) * 3))
      const b = Math.min(15, Math.floor(v / 16))
      bins[b]++
    }
    return bins
  }, [exposure])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Exposition — saturation & sous-exposition</p>
      <label className="mt-3 block text-sm text-muted">
        Exposition : <strong>{exposure}</strong>
        <input type="range" min={0} max={100} value={exposure} onChange={(e) => setExposure(Number(e.target.value))} className="w-full" />
      </label>
      <div className="mt-4 flex h-24 items-end gap-0.5">
        {hist.map((h, i) => (
          <div
            key={i}
            className={cn('flex-1 rounded-t', i === 15 && exposure > 75 ? 'bg-red-500' : 'bg-cyan-600')}
            style={{ height: `${(h / Math.max(...hist, 1)) * 100}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        {exposure > 75 ? 'Pixels saturés → perte de détail (zones brûlées)' : exposure < 25 ? 'Sous-exposition → bruit visible' : 'Histogramme équilibré'}
      </p>
    </div>
  )
}

export function WhiteBalanceLab() {
  const [temp, setTemp] = useState(5500)
  const rgb = useMemo(() => {
    if (temp < 5500) {
      const t = (temp - 2000) / 3500
      return { r: 255, g: clampByte(180 + t * 75), b: clampByte(100 + t * 120) }
    }
    const t = (temp - 5500) / 4500
    return { r: clampByte(255 - t * 40), g: clampByte(240 - t * 30), b: 255 }
  }, [temp])

  const sources = [
    { name: 'Bougie', t: 2000 },
    { name: 'Soleil', t: 5500 },
    { name: 'Néon', t: 9000 },
  ]

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Balance des blancs — température de couleur</p>
      <label className="mt-3 block text-sm text-muted">
        Température : <strong>{temp} K</strong>
        <input type="range" min={2000} max={9000} step={100} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full" />
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {sources.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setTemp(s.t)}
            className="rounded-lg border border-cyan-200 px-3 py-1 text-sm text-muted hover:bg-cyan-50 dark:border-[var(--color-border)]"
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="mt-4 h-24 w-full rounded-xl border" style={{ backgroundColor: rgbToCss(rgb.r, rgb.g, rgb.b) }} />
    </div>
  )
}

const BAYER_SIZE = 8

export function BayerDemosaicLab() {
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)
  const hovered = hover ? bayerAt(hover.x, hover.y) : null

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Matrice de Bayer & dématriçage</p>
      <MathBlock tex="\begin{matrix} G & R \\ B & G \end{matrix}" />
      <p className="mt-1 text-sm text-muted">Chaque photosite ne capte qu’un canal ; l’RGB complet est reconstruit.</p>
      <div
        className="mt-4 inline-grid gap-px rounded-lg border border-cyan-100 p-1 dark:border-[var(--color-border)]"
        style={{ gridTemplateColumns: `repeat(${BAYER_SIZE}, 28px)` }}
      >
        {Array.from({ length: BAYER_SIZE * BAYER_SIZE }, (_, i) => {
          const x = i % BAYER_SIZE
          const y = Math.floor(i / BAYER_SIZE)
          const cell = bayerAt(x, y)
          return (
            <div
              key={i}
              className="flex h-7 w-7 cursor-crosshair items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: BAYER_COLOR[cell] }}
              onMouseEnter={() => setHover({ x, y })}
              onMouseLeave={() => setHover(null)}
            >
              {cell}
            </div>
          )
        })}
      </div>
      {hovered && (
        <p className="mt-2 text-sm text-muted">
          Pixel ({hover!.x}, {hover!.y}) → canal <strong className="text-deep">{hovered}</strong> uniquement
        </p>
      )}
      <p className="mt-2 text-xs text-muted">Deux verts (G) : l’œil est plus sensible au vert.</p>
    </div>
  )
}

export function CameraPipelineLab() {
  const [step, setStep] = useState(0)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Pipeline interne d’une caméra</p>
      <ol className="mt-4 space-y-2">
        {CAMERA_PIPELINE.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                'w-full rounded-lg px-3 py-2 text-left text-sm transition',
                step === i ? 'bg-cyan-600 font-semibold text-white' : 'bg-cyan-50/50 text-muted hover:bg-cyan-100 dark:bg-cyan-950/20',
              )}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function RawVsJpegLab() {
  const [mode, setMode] = useState<'raw' | 'jpeg'>('raw')
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">RAW vs JPEG</p>
      <div className="mt-3 flex gap-2">
        {(['raw', 'jpeg'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn('rounded-lg px-4 py-2 text-sm font-semibold uppercase', mode === m ? 'bg-cyan-600 text-white' : 'border border-cyan-200 text-muted')}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="font-bold text-deep">Taille fichier</p>
          <p className="text-muted">{mode === 'raw' ? '~24 Mo (12 MP, 16 bits)' : '~3 Mo (compression)'}</p>
        </div>
        <div>
          <p className="font-bold text-deep">Flexibilité</p>
          <p className="text-muted">{mode === 'raw' ? 'Correction expo, WB, récupération hautes lumières' : 'Prêt à l’emploi, perte irréversible'}</p>
        </div>
      </div>
    </div>
  )
}

export function ImageCh1AcquisitionQuiz() {
  return (
    <QuizCard
      question="Sur un capteur Bayer, chaque photosite mesure en une prise :"
      options={[
        { id: 'a', label: 'Un seul canal (R, G ou B)', correct: true },
        { id: 'b', label: 'Les trois canaux RGB complets', correct: false },
        { id: 'c', label: 'Uniquement la luminance Y', correct: false },
      ]}
      explanation="La matrice de Bayer n’a qu’un filtre coloré par pixel ; le RGB complet est reconstruit par dématriçage."
    />
  )
}
