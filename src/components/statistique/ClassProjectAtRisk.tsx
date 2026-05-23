import { PROJECT_AT_RISK_THRESHOLD } from '@/data/statistiqueSampleData'

export type ClassStudentRow = {
  etudiant: string
  heures: number
  presence: number
  note: number
}

export function ClassProjectAtRisk({
  students,
  threshold = PROJECT_AT_RISK_THRESHOLD,
}: {
  students: ClassStudentRow[]
  threshold?: number
}) {
  const atRisk = students.filter((s) => s.note < threshold)

  return (
    <div className="my-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm">
      <p className="text-sm font-bold text-amber-900">
        Élèves à risque — note &lt; {threshold}/20
      </p>
      {atRisk.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Aucun élève sous le seuil sur cet échantillon.</p>
      ) : (
        <>
          <div className="mt-3 overflow-x-auto rounded-xl border border-amber-200/80 bg-white text-sm">
            <table className="w-full min-w-[320px]">
              <thead>
                <tr className="bg-amber-50 text-left text-xs font-bold uppercase text-amber-900">
                  <th className="px-3 py-2">Élève</th>
                  <th className="px-3 py-2">Note</th>
                  <th className="px-3 py-2">Heures</th>
                  <th className="px-3 py-2">Présence</th>
                </tr>
              </thead>
              <tbody>
                {atRisk.map((s) => (
                  <tr key={s.etudiant} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-semibold text-deep">{s.etudiant}</td>
                    <td className="px-3 py-2 text-amber-800">{s.note}</td>
                    <td className="px-3 py-2">{s.heures}</td>
                    <td className="px-3 py-2">{s.presence} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Accompagnement personnalisé</li>
            <li>Suivi présence et temps d&apos;étude</li>
            <li>Objectifs intermédiaires (note ≥ {threshold})</li>
          </ul>
        </>
      )}
    </div>
  )
}
