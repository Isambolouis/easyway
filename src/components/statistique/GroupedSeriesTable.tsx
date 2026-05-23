import type { GroupedClassRow } from '@/components/statistique/groupedSeries'

export function GroupedSeriesTable({
  rows,
  caption,
  showDensity = true,
}: {
  rows: GroupedClassRow[]
  caption?: string
  showDensity?: boolean
}) {
  const N = rows.reduce((s, r) => s + r.effectif, 0)

  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white shadow-sm">
      {caption && (
        <p className="border-b border-sky-100 bg-sky-50/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-900">
          {caption}
        </p>
      )}
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase text-sky-900">
            <th className="px-3 py-2">Classe</th>
            <th className="px-3 py-2">nᵢ</th>
            <th className="px-3 py-2">fᵢ</th>
            <th className="px-3 py-2">Fᵢ</th>
            <th className="px-3 py-2">Centre</th>
            <th className="px-3 py-2">h</th>
            {showDensity && <th className="px-3 py-2">dᵢ</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium text-deep">{r.label}</td>
              <td className="px-3 py-2">{r.effectif}</td>
              <td className="px-3 py-2">{(r.frequence * 100).toFixed(0)} %</td>
              <td className="px-3 py-2">{r.frequenceCumulee.toFixed(2)}</td>
              <td className="px-3 py-2">{r.centre}</td>
              <td className="px-3 py-2">{r.amplitude}</td>
              {showDensity && <td className="px-3 py-2">{r.densite.toFixed(2)}</td>}
            </tr>
          ))}
          <tr className="border-t-2 border-sky-200 bg-sky-50/50 font-semibold text-deep">
            <td className="px-3 py-2">Total</td>
            <td className="px-3 py-2">N = {N}</td>
            <td className="px-3 py-2">100 %</td>
            <td className="px-3 py-2">1,00</td>
            <td colSpan={showDensity ? 3 : 2} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
