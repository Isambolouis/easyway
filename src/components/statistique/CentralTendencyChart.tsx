import { buildDistribution } from '@/components/statistique/statsDistribution'
import { mean, median } from '@/components/statistique/statsMath'
import { StatsBarChart } from '@/components/statistique/StatsCharts'

export function CentralTendencyChart({
  values,
  title,
  subtitle,
}: {
  values: number[]
  title: string
  subtitle?: string
}) {
  const m = mean(values)
  const med = median(values)
  const data = buildDistribution(values).map((r) => ({
    label: String(r.value),
    effectif: r.effectif,
  }))

  return (
    <div>
      <StatsBarChart
        data={data}
        xKey="label"
        yKey="effectif"
        title={title}
        subtitle={subtitle}
      />
      <p className="-mt-2 mb-4 text-center text-xs text-muted">
        Moyenne = <strong className="text-indigo-700">{m.toFixed(2)}</strong> · Médiane ={' '}
        <strong className="text-sky-700">{med}</strong>
      </p>
    </div>
  )
}
