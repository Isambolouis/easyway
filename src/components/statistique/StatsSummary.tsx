export function StatsSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sky-200 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-700">{label}</p>
      <p className="mt-1 text-2xl font-bold text-deep">{value}</p>
    </div>
  )
}
