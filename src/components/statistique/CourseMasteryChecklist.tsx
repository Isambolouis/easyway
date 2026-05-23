const ITEMS = [
  'Organisation des données',
  'Graphiques statistiques',
  'Moyenne, médiane, mode',
  'Variance et écart-type',
  'Quartiles et percentiles',
  'Boxplot',
  'Corrélation et covariance',
  'Séries groupées',
  'Analyse et interprétation',
  'Applications en IA et économie',
]

export function CourseMasteryChecklist() {
  return (
    <ul className="my-6 grid gap-2 sm:grid-cols-2">
      {ITEMS.map((label) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-sm font-medium text-emerald-900"
        >
          <span className="text-emerald-600" aria-hidden>
            ✔
          </span>
          {label}
        </li>
      ))}
    </ul>
  )
}
