import { quartiles } from '@/components/statistique/statsMath'
import { StatsSummary } from '@/components/statistique/StatsSummary'

export function QuartilesSummary({
  values,
  extraPercentiles,
}: {
  values: number[]
  extraPercentiles?: { label: string; p: number }[]
}) {
  const { q1, q2, q3 } = quartiles(values)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <StatsSummary label="Q₁ (25 %)" value={q1.toFixed(1)} />
      <StatsSummary label="Q₂ médiane" value={q2.toFixed(1)} />
      <StatsSummary label="Q₃ (75 %)" value={q3.toFixed(1)} />
      {extraPercentiles?.map(({ label, p }) => (
        <StatsSummary key={label} label={label} value={String(p)} />
      ))}
    </div>
  )
}
