import { useEffect, useMemo, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { QuizCard } from '@/components/ui/QuizCard'
import { cn } from '@/lib/utils'
import { clampByte } from './imagePixelUtils'
import {
  boxKernel,
  convolve2d,
  convolve2dStride,
  convolve3x3Patch,
  gaussianKernel,
  LAPLACIAN,
  medianFilter,
  addSaltPepper,
  sharpen,
  sobelMagnitude,
  SOBEL_X,
  SOBEL_Y,
} from './imageConvUtils'
import { buildSampleGrayImage, putGrayImageData } from './imageSampleUtils'

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-white to-cyan-50/40 p-4 shadow-sm dark:border-[var(--color-border)] dark:from-[var(--color-card)] dark:to-cyan-950/20'

const W = 64
const H = 48
const SCALE = 4

const EXAMPLE_PATCH = [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90],
]

const BOX_3 = boxKernel(3)

function ImagePreview({ data, w, h, label }: { data: number[]; w: number; h: number; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    putGrayImageData(ctx, data, w, h, SCALE)
  }, [data, w, h])
  return (
    <div className="text-center">
      <p className="mb-1 text-xs font-bold text-muted">{label}</p>
      <canvas ref={ref} width={w * SCALE} height={h * SCALE} className="mx-auto rounded-lg border dark:border-[var(--color-border)]" style={{ imageRendering: 'pixelated' }} />
    </div>
  )
}

function DualPreview({
  left,
  right,
  lw = W,
  lh = H,
  rw = W,
  rh = H,
  leftLabel,
  rightLabel,
}: {
  left: number[]
  right: number[]
  lw?: number
  lh?: number
  rw?: number
  rh?: number
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ImagePreview data={left} w={lw} h={lh} label={leftLabel} />
      <ImagePreview data={right} w={rw} h={rh} label={rightLabel} />
    </div>
  )
}

export function ConvolutionManualLab() {
  const { rawSum, value } = convolve3x3Patch(EXAMPLE_PATCH, BOX_3)
  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Exemple 3×3 — filtre moyenneur</p>
      <div className="interactive-panel__body mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold text-muted">Patch f (voisinage)</p>
          <table className="mx-auto border-collapse text-center font-mono text-sm">
            <tbody>
              {EXAMPLE_PATCH.map((row, j) => (
                <tr key={j}>
                  {row.map((v, i) => (
                    <td key={i} className={cn('h-12 w-12 border border-cyan-200', j === 1 && i === 1 && 'bg-cyan-100 font-bold ring-2 ring-cyan-500 dark:bg-cyan-900/50')}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-center text-xs text-muted">Pixel central → 50</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-muted">Noyau K = ⅑·1₃ₓ₃</p>
          <table className="mx-auto border-collapse text-center font-mono text-sm text-muted">
            <tbody>
              {BOX_3.map((row, j) => (
                <tr key={j}>
                  {row.map((v, i) => (
                    <td key={i} className="h-10 w-10 border border-cyan-100">
                      {(v * 9).toFixed(0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 rounded-xl bg-cyan-50/60 p-3 text-sm dark:bg-cyan-950/30">
            <p>Somme = 10+20+…+90 = <strong>{rawSum}</strong></p>
            <p className="mt-1">
              g = 450/9 = <strong className="text-deep">{value}</strong> (moyenne locale)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

type FilterType = 'mean' | 'gaussian' | 'sobel' | 'laplacian' | 'sharpen' | 'median'

export function SpatialFiltersLab() {
  const src = useMemo(() => buildSampleGrayImage(W, H), [])
  const [filter, setFilter] = useState<FilterType>('mean')
  const [kSize, setKSize] = useState(3)
  const [sigma, setSigma] = useState(1.2)
  const [noise, setNoise] = useState(false)
  const [seed, setSeed] = useState(0)

  const input = useMemo(() => (noise ? addSaltPepper(src, 8, seed) : src), [src, noise, seed])

  const out = useMemo(() => {
    switch (filter) {
      case 'mean':
        return convolve2d(input, W, H, boxKernel(kSize))
      case 'gaussian':
        return convolve2d(input, W, H, gaussianKernel(kSize, sigma))
      case 'sobel':
        return sobelMagnitude(input, W, H)
      case 'laplacian':
        return convolve2d(input, W, H, LAPLACIAN).map((v) => clampByte(Math.abs(v - 128) * 2))
      case 'sharpen':
        return sharpen(input, W, H)
      case 'median':
        return medianFilter(input, W, H, kSize)
      default:
        return input
    }
  }, [input, filter, kSize, sigma])

  const labels: Record<FilterType, string> = {
    mean: 'Moyenneur — flou, réduit le bruit',
    gaussian: 'Gaussien — flou pondéré',
    sobel: 'Sobel — magnitude des contours',
    laplacian: 'Laplacien — dérivée seconde',
    sharpen: 'Accentuation — original + contours',
    median: 'Médian — robuste au sel-poivre',
  }

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Filtres spatiaux — convolution en direct</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(['mean', 'gaussian', 'sobel', 'laplacian', 'sharpen', 'median'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn('rounded-lg px-2 py-1 text-xs font-semibold capitalize', filter === f ? 'bg-cyan-600 text-white' : 'border text-muted')}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">{labels[filter]}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {(filter === 'mean' || filter === 'gaussian' || filter === 'median') && (
          <label className="text-sm text-muted">
            Taille {kSize}×{kSize}
            <input type="range" min={3} max={7} step={2} value={kSize} onChange={(e) => setKSize(Number(e.target.value))} className="ml-2 w-24" />
          </label>
        )}
        {filter === 'gaussian' && (
          <label className="text-sm text-muted">
            σ = {sigma.toFixed(1)}
            <input type="range" min={0.5} max={3} step={0.1} value={sigma} onChange={(e) => setSigma(Number(e.target.value))} className="ml-2 w-24" />
          </label>
        )}
        {filter === 'median' && (
          <>
            <button type="button" onClick={() => setNoise(!noise)} className={cn('rounded-lg px-3 py-1 text-sm font-semibold', noise ? 'bg-cyan-600 text-white' : 'border text-muted')}>
              Bruit sel-poivre
            </button>
            {noise && (
              <button type="button" className="text-sm text-cyan-700 dark:text-cyan-300" onClick={() => setSeed((s) => s + 1)}>
                ↻ Régénérer
              </button>
            )}
          </>
        )}
      </div>
      <DualPreview left={input} right={out} leftLabel="f(x,y)" rightLabel="g(x,y)" />
    </div>
  )
}

export function SobelKernelsLab() {
  const src = useMemo(() => buildSampleGrayImage(W, H), [])
  const gx = useMemo(() => convolve2d(src, W, H, SOBEL_X).map((v) => clampByte(Math.abs(v))), [src])
  const gy = useMemo(() => convolve2d(src, W, H, SOBEL_Y).map((v) => clampByte(Math.abs(v))), [src])
  const mag = useMemo(() => sobelMagnitude(src, W, H), [src])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Sobel — G_x, G_y et magnitude</p>
      <MathBlock tex="|G|=\sqrt{G_x^2+G_y^2}" />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="text-center text-xs font-mono text-muted">S_x</div>
        <div className="text-center text-xs font-mono text-muted">S_y</div>
        <ImagePreview data={gx} w={W} h={H} label="|G_x|" />
        <ImagePreview data={gy} w={W} h={H} label="|G_y|" />
      </div>
      <div className="mt-3">
        <ImagePreview data={mag} w={W} h={H} label="Magnitude |G|" />
      </div>
    </div>
  )
}

export function MedianVsMeanLab() {
  const base = [10, 12, 13, 15, 250]
  const mean = Math.round(base.reduce((a, b) => a + b, 0) / base.length)
  const sorted = [...base].sort((a, b) => a - b)
  const med = sorted[Math.floor(sorted.length / 2)]

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Moyenne vs médiane — bruit impulsionnel</p>
      <p className="mt-2 font-mono text-sm text-muted">Voisinage : [{base.join(', ')}]</p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-xl border border-cyan-100 p-3 dark:border-[var(--color-border)]">
          <p className="text-xs text-muted">Moyenne</p>
          <p className="text-2xl font-bold text-deep">{mean}</p>
          <p className="text-xs text-red-600">Sensible à 250</p>
        </div>
        <div className="rounded-xl border border-cyan-100 p-3 dark:border-[var(--color-border)]">
          <p className="text-xs text-muted">Médiane</p>
          <p className="text-2xl font-bold text-deep">{med}</p>
          <p className="text-xs text-green-700 dark:text-green-400">Bruit éliminé → 13</p>
        </div>
      </div>
    </div>
  )
}

export function PaddingStrideLab() {
  const src = useMemo(() => buildSampleGrayImage(32, 24), [])
  const [padding, setPadding] = useState<'zero' | 'replicate' | 'reflect'>('replicate')
  const [stride, setStride] = useState(1)
  const k = useMemo(() => boxKernel(3), [])

  const strided = useMemo(() => convolve2dStride(src, 32, 24, k, stride), [src, k, stride])
  const full = useMemo(() => convolve2d(src, 32, 24, k, padding), [src, k, padding])

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Padding & stride</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(['zero', 'replicate', 'reflect'] as const).map((p) => (
          <button key={p} type="button" onClick={() => setPadding(p)} className={cn('rounded-lg px-2 py-1 text-xs font-semibold', padding === p ? 'bg-cyan-600 text-white' : 'border text-muted')}>
            {p}
          </button>
        ))}
      </div>
      <label className="mt-3 block text-sm text-muted">
        Stride : <strong>{stride}</strong> (1 = chaque pixel · 2 = saut)
        <input type="range" min={1} max={2} value={stride} onChange={(e) => setStride(Number(e.target.value))} className="w-full max-w-xs" />
      </label>
      <DualPreview
        left={full}
        right={strided.data}
        lw={32}
        lh={24}
        rw={strided.w}
        rh={strided.h}
        leftLabel={`Conv. padding=${padding}`}
        rightLabel={`Stride=${stride}`}
      />
    </div>
  )
}

export function CnnFeatureMapsLab() {
  const src = useMemo(() => buildSampleGrayImage(W, H), [])
  const maps = useMemo(
    () => [
      { name: 'Filtre 1 — horizontal', data: convolve2d(src, W, H, SOBEL_X).map((v) => clampByte(Math.abs(v))) },
      { name: 'Filtre 2 — vertical', data: convolve2d(src, W, H, SOBEL_Y).map((v) => clampByte(Math.abs(v))) },
      { name: 'Filtre 3 — lissage', data: convolve2d(src, W, H, gaussianKernel(5, 1)) },
    ],
    [src],
  )

  return (
    <div className={panel}>
      <p className="text-sm font-bold text-deep">Feature maps — comme un CNN (noyaux fixes)</p>
      <p className="mt-1 text-xs text-muted">En deep learning, les noyaux sont appris ; ici : Sobel + Gaussien.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {maps.map((m) => (
          <ImagePreview key={m.name} data={m.data} w={W} h={H} label={m.name} />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Entrée H×W×1 → sortie H×W×C (cartes de caractéristiques).</p>
    </div>
  )
}

export function ImageCh1ConvolutionQuiz() {
  return (
    <QuizCard
      question="Un filtre moyenneur 3×3 sur un voisinage dont la somme vaut 450 donne :"
      options={[
        { id: 'a', label: 'g = 50 (450/9)', correct: true },
        { id: 'b', label: 'g = 450', correct: false },
        { id: 'c', label: 'g = 90', correct: false },
      ]}
      explanation="Chaque coefficient vaut 1/9 : la convolution calcule la moyenne des 9 pixels."
    />
  )
}
