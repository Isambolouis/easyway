import { STUDENTS_SAMPLE } from '@/data/statistiqueSampleData'

export function StudentDataTable() {
  return (
    <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 bg-white">
      <table className="w-full min-w-[320px] text-sm">
        <thead>
          <tr className="border-b border-sky-100 bg-sky-50/80 text-left text-xs font-bold uppercase tracking-wide text-sky-900">
            <th className="px-4 py-2">Étudiant</th>
            <th className="px-4 py-2">Âge</th>
            <th className="px-4 py-2">Note</th>
            <th className="px-4 py-2">Sexe</th>
          </tr>
        </thead>
        <tbody>
          {STUDENTS_SAMPLE.map((row) => (
            <tr key={row.etudiant} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-2 font-medium text-deep">{row.etudiant}</td>
              <td className="px-4 py-2 text-muted">{row.age}</td>
              <td className="px-4 py-2 text-muted">{row.note}</td>
              <td className="px-4 py-2 text-muted">{row.sexe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
