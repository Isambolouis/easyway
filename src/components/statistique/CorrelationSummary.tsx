import { interpretCorrelation } from '@/components/statistique/statsMath'
import { StatsSummary } from '@/components/statistique/StatsSummary'

export function CorrelationSummary({
  meanX,
  meanY,
  stdX,
  stdY,
  cov,
  r,
}: {
  meanX: number
  meanY: number
  stdX: number
  stdY: number
  cov: number
  r: number
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatsSummary label="x̄" value={meanX.toFixed(2)} />
        <StatsSummary label="ȳ" value={meanY.toFixed(2)} />
        <StatsSummary label="σ_X" value={stdX.toFixed(2)} />
        <StatsSummary label="σ_Y" value={stdY.toFixed(2)} />
        <StatsSummary label="Cov(X,Y)" value={cov.toFixed(2)} />
      </div>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-3 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-800">Corrélation r</p>
        <p className="text-2xl font-bold text-deep">{r.toFixed(3)}</p>
        <p className="mt-1 text-sm text-muted">{interpretCorrelation(r)}</p>
      </div>
    </div>
  )
}
