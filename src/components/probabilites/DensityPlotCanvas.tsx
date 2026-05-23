import { useCallback, useEffect, useRef } from 'react'
import { RotateCcw } from 'lucide-react'

type VerticalLine = { x: number; dashed?: boolean; color?: string }

type Props = {
  fn: (x: number) => number
  xMin: number
  xMax: number
  yMin?: number
  yMax?: number
  height?: number
  shadeFrom?: number
  shadeTo?: number
  verticalLines?: VerticalLine[]
  curveColor?: string
  fillColor?: string
}

function niceStep(span: number) {
  const rough = span / 6
  const pow = Math.pow(10, Math.floor(Math.log10(rough)))
  const norm = rough / pow
  const step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10
  return step * pow
}

export function DensityPlotCanvas({
  fn,
  xMin,
  xMax,
  yMin = 0,
  yMax: yMaxProp,
  height = 220,
  shadeFrom,
  shadeTo,
  verticalLines = [],
  curveColor = '#2563eb',
  fillColor = 'rgba(37, 99, 235, 0.25)',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const w = Math.max(1, Math.floor(rect.width))
    const h = height
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const pad = { l: 40, r: 12, t: 12, b: 28 }
    const plotW = w - pad.l - pad.r
    const plotH = h - pad.t - pad.b

    let yMax = yMaxProp
    if (yMax == null) {
      let maxY = 0
      const samples = 120
      for (let i = 0; i <= samples; i++) {
        const x = xMin + (i / samples) * (xMax - xMin)
        maxY = Math.max(maxY, fn(x))
      }
      yMax = maxY * 1.15 || 1
    }

    const toX = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW
    const toY = (y: number) => pad.t + plotH - ((y - yMin) / (yMax! - yMin)) * plotH

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)

    const xStep = niceStep(xMax - xMin)
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const sx = toX(x)
      ctx.beginPath()
      ctx.moveTo(sx, pad.t)
      ctx.lineTo(sx, pad.t + plotH)
      ctx.stroke()
    }

    if (yMin <= 0 && yMax! >= 0) {
      const oy = toY(0)
      ctx.strokeStyle = '#94a3b8'
      ctx.beginPath()
      ctx.moveTo(pad.l, oy)
      ctx.lineTo(pad.l + plotW, oy)
      ctx.stroke()
    }

    const n = 200
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= n; i++) {
      const x = xMin + (i / n) * (xMax - xMin)
      pts.push({ x, y: Math.max(0, fn(x)) })
    }

    const sLo = shadeFrom != null ? Math.max(xMin, shadeFrom) : null
    const sHi = shadeTo != null ? Math.min(xMax, shadeTo) : null

    if (sLo != null && sHi != null && sHi > sLo) {
      ctx.beginPath()
      ctx.moveTo(toX(sLo), toY(0))
      for (const p of pts) {
        if (p.x >= sLo && p.x <= sHi) ctx.lineTo(toX(p.x), toY(p.y))
      }
      ctx.lineTo(toX(sHi), toY(0))
      ctx.closePath()
      ctx.fillStyle = fillColor
      ctx.fill()
    }

    ctx.strokeStyle = curveColor
    ctx.lineWidth = 2.5
    ctx.beginPath()
    pts.forEach((p, i) => {
      const sx = toX(p.x)
      const sy = toY(p.y)
      if (i === 0) ctx.moveTo(sx, sy)
      else ctx.lineTo(sx, sy)
    })
    ctx.stroke()

    for (const vl of verticalLines) {
      const sx = toX(vl.x)
      ctx.strokeStyle = vl.color ?? (vl.dashed ? '#94a3b8' : curveColor)
      ctx.lineWidth = vl.dashed ? 1.5 : 2
      ctx.setLineDash(vl.dashed ? [5, 4] : [])
      ctx.beginPath()
      ctx.moveTo(sx, pad.t)
      ctx.lineTo(sx, pad.t + plotH)
      ctx.stroke()
      ctx.setLineDash([])
    }

    ctx.fillStyle = '#64748b'
    ctx.font = '10px system-ui, sans-serif'
    ctx.textAlign = 'center'
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      ctx.fillText(String(Math.round(x * 10) / 10), toX(x), h - 8)
    }
  }, [fn, xMin, xMax, yMin, yMaxProp, height, shadeFrom, shadeTo, verticalLines, curveColor, fillColor])

  useEffect(() => {
    draw()
    const ro = new ResizeObserver(draw)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [draw])

  return (
    <div ref={containerRef} className="relative w-full min-w-[200px]">
      <canvas ref={canvasRef} className="block w-full touch-none" aria-hidden />
      <button
        type="button"
        onClick={draw}
        className="absolute bottom-2 left-2 rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:bg-slate-50"
        title="Rafraîchir le graphique"
        aria-label="Rafraîchir"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
