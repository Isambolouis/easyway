import { cn } from '@/lib/utils'

export function DataTable({
  headers,
  rows,
  className,
}: {
  headers: string[]
  rows: string[][]
  className?: string
}) {
  return (
    <div className={cn('scroll-x-card my-6 rounded-2xl border border-slate-200 shadow-md', className)}>
      <table className="w-full min-w-[320px] border-collapse bg-white text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="bg-deep px-3 py-2.5 text-left font-semibold text-white first:rounded-tl-2xl last:rounded-tr-2xl"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="border-t border-slate-100 px-3 py-2.5 align-top text-ink/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
