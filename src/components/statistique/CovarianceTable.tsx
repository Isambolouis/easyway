import type { CovarianceRow } from '@/components/statistique/statsMath'

export function CovarianceTable({
  rows,
  meanX,
  meanY,
  caption,
}: {
  rows: CovarianceRow[]
  meanX: number
  meanY: number
  caption?: string
}) {
  const sum = rows.reduce((s, r) => s + r.product, 0)
  const cov = sum / rows.length

  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white shadow-sm">
      {caption && (
        <p className="border-b border-sky-100 bg-sky-50/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-900">
          {caption}
        </p>
      )}
      <table className="w-full min-w-[360px] text-sm">
        <thead>
          <tr className="text-left text-xs font-bold uppercase text-sky-900">
            <th className="px-3 py-2">X</th>
            <th className="px-3 py-2">Y</th>
            <th className="px-3 py-2">X − x̄</th>
            <th className="px-3 py-2">Y − ȳ</th>
            <th className="px-3 py-2">Produit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100">
              <td className="px-3 py-1.5 font-medium">{r.x}</td>
              <td className="px-3 py-1.5">{r.y}</td>
              <td className="px-3 py-1.5 text-muted">
                {r.dx >= 0 ? '+' : ''}
                {r.dx}
              </td>
              <td className="px-3 py-1.5 text-muted">
                {r.dy >= 0 ? '+' : ''}
                {r.dy}
              </td>
              <td className="px-3 py-1.5 font-medium text-sky-800">{r.product}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-sky-200 bg-sky-50/50 font-semibold text-deep">
            <td className="px-3 py-2" colSpan={2}>
              x̄ = {meanX} · ȳ = {meanY}
            </td>
            <td className="px-3 py-2" colSpan={2}>
              Σ produits = {sum}
            </td>
            <td className="px-3 py-2">Cov = {cov}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
