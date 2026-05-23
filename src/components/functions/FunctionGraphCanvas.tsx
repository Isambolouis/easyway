import { useCallback, useEffect, useRef, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react'
import { cn } from '@/lib/utils'
import { graphPresets, type FunctionGraphPreset, type GraphPresetId } from './functionGraphPresets'

type ViewState = {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

function niceStep(span: number, targetTicks = 6) {
  const rough = span / targetTicks
  const pow = Math.pow(10, Math.floor(Math.log10(rough)))
  const norm = rough / pow
  const step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10
  return step * pow
}

function formatTick(v: number) {
  if (Math.abs(v) < 1e-9) return '0'
  if (Math.abs(v) >= 1000 || (Math.abs(v) < 0.01 && v !== 0)) return v.toExponential(0)
  const r = Math.round(v * 100) / 100
  return Number.isInteger(r) ? String(r) : r.toFixed(1)
}

type Props = {
  preset: FunctionGraphPreset
  className?: string
  height?: number
  curveColor?: string
  showOriginMarker?: boolean
}

export function FunctionGraphCanvas({
  preset,
  className,
  height = 280,
  curveColor = '#2563eb',
  showOriginMarker = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<ViewState>(preset.defaultView)
  const viewRef = useRef(view)
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  viewRef.current = view

  const resetView = useCallback(() => setView(preset.defaultView), [preset.defaultView])

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

    const pad = { l: 44, r: 16, t: 16, b: 36 }
    const plotW = w - pad.l - pad.r
    const plotH = h - pad.t - pad.b
    const { xMin, xMax, yMin, yMax } = viewRef.current

    const toScreenX = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW
    const toScreenY = (y: number) => pad.t + plotH - ((y - yMin) / (yMax - yMin)) * plotH

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    const xStep = niceStep(xMax - xMin)
    const yStep = niceStep(yMax - yMin)

    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const sx = toScreenX(x)
      ctx.beginPath()
      ctx.moveTo(sx, pad.t)
      ctx.lineTo(sx, pad.t + plotH)
      ctx.stroke()
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const sy = toScreenY(y)
      ctx.beginPath()
      ctx.moveTo(pad.l, sy)
      ctx.lineTo(pad.l + plotW, sy)
      ctx.stroke()
    }

    if (yMin <= 0 && yMax >= 0) {
      const oy = toScreenY(0)
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(pad.l, oy)
      ctx.lineTo(pad.l + plotW, oy)
      ctx.stroke()
    }
    if (xMin <= 0 && xMax >= 0) {
      const ox = toScreenX(0)
      ctx.beginPath()
      ctx.moveTo(ox, pad.t)
      ctx.lineTo(ox, pad.t + plotH)
      ctx.stroke()
    }

    ctx.fillStyle = '#64748b'
    ctx.font = '11px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < xStep / 2) continue
      ctx.fillText(formatTick(x), toScreenX(x), pad.t + plotH + 6)
    }
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < yStep / 2) continue
      ctx.fillText(formatTick(y), pad.l - 6, toScreenY(y))
    }

    const xStart = preset.xDomain ? preset.xDomain[0] : xMin
    const xEnd = preset.xDomain ? preset.xDomain[1] : xMax
    const samples = Math.max(200, Math.floor(plotW * 2))
    const dx = (xEnd - xStart) / samples

    ctx.strokeStyle = curveColor
    ctx.lineWidth = 2.5
    ctx.lineJoin = 'round'
    ctx.beginPath()
    let started = false

    for (let i = 0; i <= samples; i++) {
      const x = xStart + i * dx
      const y = preset.fn(x)
      if (y === null || !Number.isFinite(y)) {
        started = false
        continue
      }
      const sx = toScreenX(x)
      const sy = toScreenY(y)
      if (!started) {
        ctx.moveTo(sx, sy)
        started = true
      } else {
        ctx.lineTo(sx, sy)
      }
    }
    ctx.stroke()

    if (showOriginMarker && xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0) {
      const y0 = preset.fn(0)
      if (y0 !== null && Number.isFinite(y0)) {
        const ox = toScreenX(0)
        const oy = toScreenY(y0)
        ctx.fillStyle = curveColor
        ctx.beginPath()
        ctx.arc(ox, oy, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }, [preset, height, curveColor, showOriginMarker])

  useEffect(() => {
    draw()
    const ro = new ResizeObserver(() => draw())
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [draw, view])

  const zoomAt = (clientX: number, clientY: number, factor: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const pad = { l: 44, r: 16, t: 16, b: 36 }
    const plotW = rect.width - pad.l - pad.r
    const plotH = height - pad.t - pad.b
    const px = clientX - rect.left - pad.l
    const py = clientY - rect.top - pad.t
    if (px < 0 || py < 0 || px > plotW || py > plotH) return

    setView((v) => {
      const fx = px / plotW
      const fy = 1 - py / plotH
      const cx = v.xMin + fx * (v.xMax - v.xMin)
      const cy = v.yMin + fy * (v.yMax - v.yMin)
      const xSpan = (v.xMax - v.xMin) / factor
      const ySpan = (v.yMax - v.yMin) / factor
      return {
        xMin: cx - fx * xSpan,
        xMax: cx + (1 - fx) * xSpan,
        yMin: cy - fy * ySpan,
        yMax: cy + (1 - fy) * ySpan,
      }
    })
  }

  const panBy = (dxPx: number, dyPx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const pad = { l: 44, r: 16, t: 16, b: 36 }
    const plotW = rect.width - pad.l - pad.r
    const plotH = height - pad.t - pad.b

    setView((v) => {
      const dx = (dxPx / plotW) * (v.xMax - v.xMin)
      const dy = (dyPx / plotH) * (v.yMax - v.yMin)
      return {
        xMin: v.xMin - dx,
        xMax: v.xMax - dx,
        yMin: v.yMin + dy,
        yMax: v.yMax + dy,
      }
    })
  }

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12
    zoomAt(e.clientX, e.clientY, factor)
  }

  return (
    <div
      className={cn(
        'my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md',
        className,
      )}
    >
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex min-h-[120px] items-center justify-center border-b border-slate-100 bg-slate-50/80 p-6 md:border-b-0 md:border-r">
          <div className="text-center text-lg [&_.katex]:text-xl">
            <MathBlock tex={preset.tex} className="!my-0 !border-0 !bg-transparent" />
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onPointerDown={(e) => {
            dragging.current = true
            lastPointer.current = { x: e.clientX, y: e.clientY }
            ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return
            const dx = e.clientX - lastPointer.current.x
            const dy = e.clientY - lastPointer.current.y
            lastPointer.current = { x: e.clientX, y: e.clientY }
            panBy(dx, dy)
          }}
          onPointerUp={(e) => {
            dragging.current = false
            ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
          }}
          onPointerLeave={() => {
            dragging.current = false
          }}
        >
          <canvas ref={canvasRef} className="block w-full touch-none" aria-label={`Graphique de ${preset.tex}`} />

          <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] text-muted shadow-sm">
            <Move className="h-3 w-3" />
            Glisser · molette zoom
          </div>

          <div className="absolute bottom-2 right-2 flex gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              title="Zoom avant"
              onClick={() => {
                const rect = containerRef.current?.getBoundingClientRect()
                if (rect) zoomAt(rect.left + rect.width / 2, rect.top + height / 2, 1.25)
              }}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              title="Zoom arrière"
              onClick={() => {
                const rect = containerRef.current?.getBoundingClientRect()
                if (rect) zoomAt(rect.left + rect.width / 2, rect.top + height / 2, 0.8)
              }}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              title="Réinitialiser la vue"
              onClick={resetView}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Plusieurs graphiques empilés (une leçon avec plusieurs exemples) */
export function FunctionGraphStack({
  presetIds,
  className,
}: {
  presetIds: GraphPresetId[]
  className?: string
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {presetIds.map((id) => (
        <FunctionGraphCanvas
          key={id}
          preset={graphPresets[id]}
          showOriginMarker={id === 'x-squared' || id === '3x'}
        />
      ))}
    </div>
  )
}
