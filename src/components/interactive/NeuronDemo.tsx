import { useMemo, useState } from 'react'
import { MathBlock } from '@/components/ui/MathBlock'
import { FadeIn } from '@/components/ui/FadeIn'

type Act = 'relu' | 'sigmoid' | 'tanh'

function activate(z: number, act: Act) {
  if (act === 'relu') return Math.max(0, z)
  if (act === 'sigmoid') return 1 / (1 + Math.exp(-z))
  return Math.tanh(z)
}

export function NeuronDemo() {
  const [x1, setX1] = useState(0.8)
  const [x2, setX2] = useState(-0.3)
  const [w1, setW1] = useState(1.2)
  const [w2, setW2] = useState(-0.7)
  const [b, setB] = useState(0.1)
  const [act, setAct] = useState<Act>('relu')

  const z = w1 * x1 + w2 * x2 + b
  const a = useMemo(() => activate(z, act), [z, act])

  const slider = (label: string, value: number, set: (v: number) => void) => (
    <label className="block text-sm">
      <span className="font-medium text-deep">
        {label} = {value.toFixed(2)}
      </span>
      <input
        type="range"
        min={-2}
        max={2}
        step={0.05}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-1 w-full accent-teal"
      />
    </label>
  )

  return (
    <FadeIn>
      <div className="my-8 rounded-2xl border border-teal/30 bg-gradient-to-br from-teal-50 to-white p-5 shadow-lg">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-teal">Démo interactive</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {slider('x₁', x1, setX1)}
            {slider('x₂', x2, setX2)}
            {slider('w₁', w1, setW1)}
            {slider('w₂', w2, setW2)}
            {slider('b', b, setB)}
            <label className="block text-sm font-medium text-deep">
              Activation
              <select
                value={act}
                onChange={(e) => setAct(e.target.value as Act)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              >
                <option value="relu">ReLU</option>
                <option value="sigmoid">Sigmoïde</option>
                <option value="tanh">Tanh</option>
              </select>
            </label>
          </div>
          <div>
            <MathBlock tex={`z = ${w1.toFixed(2)} \\cdot ${x1.toFixed(2)} + ${w2.toFixed(2)} \\cdot ${x2.toFixed(2)} + ${b.toFixed(2)} = ${z.toFixed(3)}`} />
            <MathBlock tex={`a = f(z) = ${a.toFixed(4)}`} />
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-deep transition-all duration-300"
                style={{ width: `${Math.min(100, Math.abs(a) * 50)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
