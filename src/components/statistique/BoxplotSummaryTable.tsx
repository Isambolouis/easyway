import type { BoxplotSummary } from '@/components/statistique/statsMath'

export function BoxplotSummaryTable({
  stats,
  caption,
  showFences,
}: {
  stats: BoxplotSummary
  caption?: string
  showFences?: boolean
}) {
  const rows = [
    { label: 'Min (moustache)', value: stats.min },
    { label: 'Q₁ (25 %)', value: stats.q1 },
    { label: 'Médiane Q₂', value: stats.q2 },
    { label: 'Q₃ (75 %)', value: stats.q3 },
    { label: 'Max (moustache)', value: stats.max },
    { label: 'IQR', value: stats.iqr },
  ]

  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white shadow-sm">
      {caption && (
        <p className="border-b border-sky-100 bg-sky-50/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-900">
          {caption}
        </p>
      )}
      <table className="w-full min-w-[260px] text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-slate-100 first:border-0">
              <td className="px-4 py-2 font-medium text-deep">{r.label}</td>
              <td className="px-4 py-2 text-muted">
                {typeof r.value === 'number' ? r.value.toFixed(2).replace(/\.00$/, '') : r.value}
              </td>
            </tr>
          ))}
          {showFences && (
            <>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-deep">Borne inférieure</td>
                <td className="px-4 py-2 text-muted">{stats.lowerFence.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-deep">Borne supérieure</td>
                <td className="px-4 py-2 text-muted">{stats.upperFence.toFixed(2)}</td>
              </tr>
            </>
          )}
          {stats.outliers.length > 0 && (
            <tr className="border-t border-orange-200 bg-orange-50/50">
              <td className="px-4 py-2 font-medium text-orange-900">Outliers</td>
              <td className="px-4 py-2 font-semibold text-orange-800">{stats.outliers.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
