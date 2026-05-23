import { mean, stdPop } from '@/components/statistique/statsMath'
import { StatsSummary } from '@/components/statistique/StatsSummary'

export function ClassDispersionCompare({
  labelA,
  valuesA,
  labelB,
  valuesB,
}: {
  labelA: string
  valuesA: number[]
  labelB: string
  valuesB: number[]
}) {
  const mA = mean(valuesA)
  const mB = mean(valuesB)
  const sA = stdPop(valuesA)
  const sB = stdPop(valuesB)

  return (
    <div className="my-4 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-green-200 bg-green-50/40 p-4">
        <p className="font-bold text-deep">{labelA}</p>
        <p className="mt-1 text-xs text-muted">{valuesA.join(', ')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatsSummary label="x̄" value={mA.toFixed(1)} />
          <StatsSummary label="σ" value={sA.toFixed(2)} />
        </div>
        <p className="mt-2 text-sm font-medium text-green-800">→ homogène</p>
      </div>
      <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-4">
        <p className="font-bold text-deep">{labelB}</p>
        <p className="mt-1 text-xs text-muted">{valuesB.join(', ')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatsSummary label="x̄" value={mB.toFixed(1)} />
          <StatsSummary label="σ" value={sB.toFixed(2)} />
        </div>
        <p className="mt-2 text-sm font-medium text-orange-800">→ hétérogène</p>
      </div>
    </div>
  )
}
