import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

function drawPlot(
  canvas: HTMLCanvasElement,
  title: string,
  color: string,
  fn: (x: number) => number,
  xmin: number,
  xmax: number,
  ymin: number,
  ymax: number,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width
  const H = canvas.height
  const pad = { l: 36, r: 12, t: 28, b: 28 }
  const iw = W - pad.l - pad.r
  const ih = H - pad.t - pad.b

  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#1e3a5f'
  ctx.font = 'bold 11px Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(title, W / 2, 18)

  const xs = (x: number) => pad.l + ((x - xmin) / (xmax - xmin)) * iw
  const ys = (y: number) => pad.t + (1 - (y - ymin) / (ymax - ymin)) * ih

  ctx.strokeStyle = '#cbd5e1'
  ctx.beginPath()
  ctx.moveTo(xs(0), pad.t)
  ctx.lineTo(xs(0), pad.t + ih)
  ctx.moveTo(pad.l, ys(0))
  ctx.lineTo(pad.l + iw, ys(0))
  ctx.stroke()

  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i <= 120; i++) {
    const x = xmin + (i / 120) * (xmax - xmin)
    let y = fn(x)
    if (!Number.isFinite(y)) y = ymax
    y = Math.max(ymin, Math.min(ymax, y))
    const px = xs(x)
    const py = ys(y)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()
}

export function ActivationPlots() {
  const ref1 = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLCanvasElement>(null)
  const ref3 = useRef<HTMLCanvasElement>(null)
  const ref4 = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref1.current)
      drawPlot(ref1.current, 'Sigmoïde', '#1e3a5f', (x) => 1 / (1 + Math.exp(-x)), -5, 5, -0.05, 1.05)
    if (ref2.current) drawPlot(ref2.current, 'Tanh', '#0d9488', Math.tanh, -3, 3, -1.05, 1.05)
    if (ref3.current) drawPlot(ref3.current, 'ReLU', '#f97316', (x) => Math.max(0, x), -3, 3, -0.5, 3.2)
    if (ref4.current) {
      const canvas = ref4.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      drawPlot(canvas, 'Entropie binaire', '#7c3aed', () => 0, 0, 1, 0, 0.75)
      const W = canvas.width
      const H = canvas.height
      const pad = { l: 36, r: 12, t: 28, b: 28 }
      const iw = W - pad.l - pad.r
      const ih = H - pad.t - pad.b
      const xs = (p: number) => pad.l + p * iw
      const ys = (h: number) => pad.t + (1 - h / 0.75) * ih
      ctx.strokeStyle = '#7c3aed'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 1; i < 100; i++) {
        const p = 0.02 + (i / 100) * 0.96
        const Hb = -(p * Math.log(p) + (1 - p) * Math.log(1 - p))
        const px = xs(p)
        const py = ys(Hb)
        if (i === 1) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.stroke()
    }
  }, [])

  const canvas = (r: React.RefObject<HTMLCanvasElement | null>) => (
    <canvas ref={r} width={280} height={150} className="w-full rounded-lg" />
  )

  return (
    <FadeIn>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-2 shadow-sm">{canvas(ref1)}</div>
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-2 shadow-sm">{canvas(ref2)}</div>
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-2 shadow-sm">{canvas(ref3)}</div>
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-2 shadow-sm">{canvas(ref4)}</div>
      </div>
    </FadeIn>
  )
}
