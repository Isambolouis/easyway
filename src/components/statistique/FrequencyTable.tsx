import type { DistributionRow } from '@/components/statistique/statsDistribution'

export function FrequencyTable({
  rows,
  caption,
  showCumulative = true,
}: {
  rows: DistributionRow[]
  caption?: string
  showCumulative?: boolean
}) {
  const N = rows.reduce((s, r) => s + r.effectif, 0)

  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white shadow-sm">
      {caption && (
        <p className="border-b border-sky-100 bg-sky-50/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-900">
          {caption}
        </p>
      )}
      <table className="w-full min-w-[280px] text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase tracking-wide text-sky-900">
            <th className="px-4 py-2">xᵢ</th>
            <th className="px-4 py-2">nᵢ</th>
            <th className="px-4 py-2">fᵢ</th>
            {showCumulative && <th className="px-4 py-2">Fᵢ</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.value} className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium text-deep">{r.value}</td>
              <td className="px-4 py-2 text-muted">{r.effectif}</td>
              <td className="px-4 py-2 text-muted">{r.frequence.toFixed(2)}</td>
              {showCumulative && (
                <td className="px-4 py-2 font-medium text-sky-800">{r.frequenceCumulee.toFixed(2)}</td>
              )}
            </tr>
          ))}
          <tr className="border-t-2 border-sky-200 bg-sky-50/50 font-semibold text-deep">
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2">N = {N}</td>
            <td className="px-4 py-2">{(rows.reduce((s, r) => s + r.frequence, 0)).toFixed(2)}</td>
            {showCumulative && <td className="px-4 py-2">1,00</td>}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
