import type { DeviationRow } from '@/components/statistique/statsMath'

export function DeviationTable({
  rows,
  mean,
  caption,
}: {
  rows: DeviationRow[]
  mean: number
  caption?: string
}) {
  const sumSq = rows.reduce((s, r) => s + r.ecart2, 0)

  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white shadow-sm">
      {caption && (
        <p className="border-b border-sky-100 bg-sky-50/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-900">
          {caption}
        </p>
      )}
      <table className="w-full min-w-[280px] text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase text-sky-900">
            <th className="px-4 py-2">xᵢ</th>
            <th className="px-4 py-2">xᵢ − x̄</th>
            <th className="px-4 py-2">(xᵢ − x̄)²</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.x} className="border-t border-slate-100">
              <td className="px-4 py-2 font-medium">{r.x}</td>
              <td className="px-4 py-2 text-muted">
                {r.ecart >= 0 ? '+' : ''}
                {r.ecart}
              </td>
              <td className="px-4 py-2">{r.ecart2}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-sky-200 bg-sky-50/50 font-semibold text-deep">
            <td className="px-4 py-2" colSpan={2}>
              x̄ = {mean} · Σ(xᵢ − x̄)²
            </td>
            <td className="px-4 py-2">{sumSq}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
