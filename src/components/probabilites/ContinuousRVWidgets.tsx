import { useMemo, useState, type ReactNode } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import { DensityPlotCanvas } from '@/components/probabilites/DensityPlotCanvas'
import {
  exponentialPDF,
  exponentialTailProb,
  integral2x,
  normalPDF,
  normalSymmetricIntervalProb,
  standardNormalCDF,
  zScore,
  uniformPDF,
  uniformProb,
} from '@/components/probabilites/continuousLawsMath'

function ProbSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.1,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-deep">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 min-h-[2.25rem] flex-1 cursor-pointer accent-emerald-600"
        />
        <span className="w-14 text-right font-mono text-xs text-muted">{value.toFixed(step >= 1 ? 0 : 1)}</span>
      </div>
    </label>
  )
}

const panel =
  'interactive-panel scroll-x-card rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm'

function WidgetGrid({ controls, plot }: { controls: ReactNode; plot: ReactNode }) {
  return (
    <div className={`${panel} grid gap-4 lg:grid-cols-2`}>
      <div className="min-w-[240px] space-y-3">{controls}</div>
      <div className="min-w-[200px]">{plot}</div>
    </div>
  )
}

export function NormalDensityWidget({
  initialMu = 0,
  initialSigma = 1,
}: {
  initialMu?: number
  initialSigma?: number
}) {
  const [mu, setMu] = useState(initialMu)
  const [sigma, setSigma] = useState(initialSigma)
  const sig = Math.max(0.2, sigma)
  const xMin = mu - 4 * sig
  const xMax = mu + 4 * sig
  const fn = useMemo(() => (x: number) => normalPDF(x, mu, sig), [mu, sig])

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">Densité normale — forme en cloche</p>
          <MathBlock
            tex="f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}"
            className="!my-1 text-sm"
          />
          <ProbSlider label="μ (moyenne)" value={mu} onChange={setMu} min={-5} max={5} step={0.1} />
          <ProbSlider label="σ (écart-type)" value={sig} onChange={setSigma} min={0.2} max={3} step={0.1} />
          <p className="text-xs text-muted">
            Pic en x = μ : f(μ) ≈ {(normalPDF(mu, mu, sig)).toFixed(3)}
          </p>
        </>
      }
      plot={
        <DensityPlotCanvas fn={fn} xMin={xMin} xMax={xMax} verticalLines={[{ x: mu, dashed: true }]} />
      }
    />
  )
}

export type ZScoreWidgetProps = {
  initialX?: number
  initialMu?: number
  initialSigma?: number
  title?: string
  muMin?: number
  muMax?: number
  sigmaMin?: number
  sigmaMax?: number
}

export function ZScoreWidget({
  initialX = 1.2,
  initialMu = 0,
  initialSigma = 1,
  title = 'Standardisation (Z-score)',
  muMin: muMinProp,
  muMax: muMaxProp,
  sigmaMin = 0.2,
  sigmaMax = 3,
}: ZScoreWidgetProps = {}) {
  const [x, setX] = useState(initialX)
  const [mu, setMu] = useState(initialMu)
  const [sigma, setSigma] = useState(initialSigma)
  const sig = Math.max(sigmaMin, sigma)
  const z = zScore(x, mu, sig)
  const phi = standardNormalCDF(z)
  const xMin = mu - 4 * sig
  const xMax = mu + 4 * sig
  const muMin = muMinProp ?? mu - 3 * sig
  const muMax = muMaxProp ?? mu + 3 * sig
  const fn = useMemo(() => (t: number) => normalPDF(t, mu, sig), [mu, sig])

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">{title}</p>
          <MathBlock tex="Z=\frac{X-\mu}{\sigma}" className="!my-1" />
          <ProbSlider label="x" value={x} onChange={setX} min={mu - 4 * sig} max={mu + 4 * sig} step={0.5} />
          <ProbSlider label="μ" value={mu} onChange={setMu} min={muMin} max={muMax} step={0.5} />
          <ProbSlider label="σ" value={sig} onChange={setSigma} min={sigmaMin} max={sigmaMax} step={0.5} />
          <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm">
            z = (x − μ) / σ ≈ <strong>{z.toFixed(2)}</strong>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
            <MathInline tex="P(X \le x) = \Phi(z)" /> ≈ <strong>{(phi * 100).toFixed(1)} %</strong>
          </div>
        </>
      }
      plot={
        <DensityPlotCanvas
          fn={fn}
          xMin={xMin}
          xMax={xMax}
          shadeFrom={xMin}
          shadeTo={x}
          verticalLines={[
            { x: mu, dashed: true, color: '#94a3b8' },
            { x, dashed: false },
          ]}
        />
      }
    />
  )
}

export type UniformLawWidgetProps = {
  initialA?: number
  initialB?: number
  initialLo?: number
  initialHi?: number
  title?: string
}

export function UniformLawWidget({
  initialA = 0,
  initialB = 10,
  initialLo = 2,
  initialHi = 5,
  title = 'Loi uniforme U(a, b)',
}: UniformLawWidgetProps) {
  const [a, setA] = useState(initialA)
  const [b, setB] = useState(Math.max(initialA + 1, initialB))
  const [lo, setLo] = useState(initialLo)
  const [hi, setHi] = useState(initialHi)
  const loC = Math.min(lo, hi)
  const hiC = Math.max(lo, hi)
  const prob = uniformProb(loC, hiC, a, b)
  const fn = useMemo(() => (x: number) => uniformPDF(x, a, b), [a, b])

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">{title}</p>
          <MathBlock tex="f(x)=\frac{1}{b-a},\quad x\in[a,b]" className="!my-1 text-sm" />
          <ProbSlider label="a" value={a} onChange={setA} min={0} max={15} step={0.5} />
          <ProbSlider
            label="b"
            value={b}
            onChange={(v) => setB(Math.max(a + 0.5, v))}
            min={1}
            max={20}
            step={0.5}
          />
          <ProbSlider label="borne gauche intégrale" value={loC} onChange={setLo} min={a} max={b} step={0.1} />
          <ProbSlider label="borne droite intégrale" value={hiC} onChange={setHi} min={a} max={b} step={0.1} />
          <MathBlock
            tex={`P(${loC.toFixed(1)} \\le X \\le ${hiC.toFixed(1)}) = \\frac{${(hiC - loC).toFixed(1)}}{${(b - a).toFixed(1)}} \\approx ${prob.toFixed(3)}`}
            className="!my-1 text-sm"
          />
        </>
      }
      plot={
        <DensityPlotCanvas
          fn={fn}
          xMin={a - 1}
          xMax={b + 1}
          yMax={1.5 / Math.max(0.5, b - a)}
          shadeFrom={loC}
          shadeTo={hiC}
          verticalLines={[
            { x: loC, dashed: true },
            { x: hiC, dashed: true },
          ]}
        />
      }
    />
  )
}

export function ExponentialTailWidget({
  initialLambda = 2,
  initialA = 1,
}: {
  initialLambda?: number
  initialA?: number
}) {
  const [lambda, setLambda] = useState(initialLambda)
  const [a, setA] = useState(initialA)
  const lam = Math.max(0.1, lambda)
  const prob = exponentialTailProb(a, lam)
  const fn = useMemo(() => (x: number) => exponentialPDF(x, lam), [lam])
  const xMax = Math.max(5, a + 4 / lam)

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">Loi exponentielle</p>
          <MathBlock tex="f(x)=\lambda e^{-\lambda x},\quad x\ge 0" className="!my-1 text-sm" />
          <MathBlock tex="P(X\ge a)=e^{-\lambda a}" className="!my-1 text-sm" />
          <ProbSlider label="λ" value={lam} onChange={setLambda} min={0.2} max={5} step={0.1} />
          <ProbSlider label="a" value={a} onChange={setA} min={0} max={xMax} step={0.1} />
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
            P(X ≥ a) ≈ <strong>{prob.toFixed(3)}</strong>
          </div>
        </>
      }
      plot={
        <DensityPlotCanvas
          fn={fn}
          xMin={0}
          xMax={xMax}
          shadeFrom={a}
          shadeTo={xMax}
          fillColor="rgba(16, 185, 129, 0.2)"
          verticalLines={[{ x: a, dashed: false, color: '#059669' }]}
          curveColor="#059669"
        />
      }
    />
  )
}

/** f(x) = 2x sur [0,1] — probabilité sur un intervalle */
export function Density2xWidget({ lo = 0, hi = 0.5 }: { lo?: number; hi?: number }) {
  const prob = integral2x(lo, hi)
  const fn = (x: number) => (x >= 0 && x <= 1 ? 2 * x : 0)

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">Densité f(x) = 2x sur [0, 1]</p>
          <MathBlock tex={`P(${lo} \\le X \\le ${hi}) = \\int_{${lo}}^{${hi}} 2x\\,dx = ${prob.toFixed(2)}`} />
        </>
      }
      plot={
        <DensityPlotCanvas fn={fn} xMin={-0.1} xMax={1.2} shadeFrom={lo} shadeTo={hi} curveColor="#7c3aed" />
      }
    />
  )
}

/** Examen ch.8 : U(0,10), P(2≤X≤5) */
export function ExamUniform010Widget() {
  return (
    <UniformLawWidget initialA={0} initialB={10} initialLo={2} initialHi={5} title="Exercice — X ~ U(0, 10)" />
  )
}

/** Règle empirique 68–95–99,7 % */
export function NormalEmpiricalRuleWidget({
  initialMu = 0,
  initialSigma = 1,
}: {
  initialMu?: number
  initialSigma?: number
}) {
  const [mu, setMu] = useState(initialMu)
  const [sigma, setSigma] = useState(initialSigma)
  const sig = Math.max(0.2, sigma)
  const fn = useMemo(() => (x: number) => normalPDF(x, mu, sig), [mu, sig])
  const p1 = normalSymmetricIntervalProb(1)
  const p2 = normalSymmetricIntervalProb(2)
  const p3 = normalSymmetricIntervalProb(3)
  const xMin = mu - 4 * sig
  const xMax = mu + 4 * sig

  return (
    <WidgetGrid
      controls={
        <>
          <p className="text-sm font-semibold text-deep">Règle empirique (68–95–99,7)</p>
          <ProbSlider label="μ" value={mu} onChange={setMu} min={-20} max={120} step={1} />
          <ProbSlider label="σ" value={sig} onChange={setSigma} min={0.5} max={25} step={0.5} />
          <div className="space-y-1 text-sm">
            <p>
              P(μ−σ ≤ X ≤ μ+σ) ≈ <strong>{(p1 * 100).toFixed(1)} %</strong>
            </p>
            <p>
              P(μ−2σ ≤ X ≤ μ+2σ) ≈ <strong>{(p2 * 100).toFixed(1)} %</strong>
            </p>
            <p>
              P(μ−3σ ≤ X ≤ μ+3σ) ≈ <strong>{(p3 * 100).toFixed(1)} %</strong>
            </p>
          </div>
        </>
      }
      plot={
        <DensityPlotCanvas
          fn={fn}
          xMin={xMin}
          xMax={xMax}
          shadeFrom={mu - sig}
          shadeTo={mu + sig}
          verticalLines={[
            { x: mu, dashed: true, color: '#64748b' },
            { x: mu - sig, dashed: true, color: '#94a3b8' },
            { x: mu + sig, dashed: true, color: '#94a3b8' },
          ]}
        />
      }
    />
  )
}

/** X ~ N(100, 15²), standardiser X = 130 */
export function ZScoreExample130Widget() {
  return (
    <ZScoreWidget
      title="Exemple — X ~ N(100, 15²), x = 130"
      initialMu={100}
      initialSigma={15}
      initialX={130}
      muMin={50}
      muMax={150}
      sigmaMin={5}
      sigmaMax={25}
    />
  )
}

/** Examen — X ~ N(50, 10²), X = 70 */
export function ZScoreExam5070Widget() {
  return (
    <ZScoreWidget
      title="Examen — X ~ N(50, 10²), x = 70"
      initialMu={50}
      initialSigma={10}
      initialX={70}
      muMin={20}
      muMax={80}
      sigmaMin={3}
      sigmaMax={20}
    />
  )
}
