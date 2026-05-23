import { mean, stdPop, variancePop } from '@/components/statistique/statsMath'
import { StatsSummary } from '@/components/statistique/StatsSummary'
import { CentralTendencyChart } from '@/components/statistique/CentralTendencyChart'

export function DispersionCompareCard({
  label,
  values,
}: {
  label: string
  values: number[]
}) {
  const m = mean(values)
  const v = variancePop(values)
  const s = stdPop(values)

  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-bold text-deep">{label}</p>
      <p className="mb-3 text-xs text-muted">
        Valeurs : {values.join(', ')}
      </p>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <StatsSummary label="x̄" value={m.toFixed(1)} />
        <StatsSummary label="σ²" value={v.toFixed(2)} />
        <StatsSummary label="σ" value={s.toFixed(2)} />
      </div>
      <CentralTendencyChart
        values={values}
        title={`Série ${label}`}
        subtitle={`σ = ${s.toFixed(2)}`}
      />
    </div>
  )
}
