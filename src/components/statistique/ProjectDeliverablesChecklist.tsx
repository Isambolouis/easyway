const ITEMS = [
  'Analyse descriptive complète',
  'Moyenne et médiane interprétées',
  'Dispersion (σ) et graphiques',
  'Corrélations heures / présence vs notes',
  'Modèle linéaire (pont vers ML)',
  'Décision pédagogique (élèves à risque)',
]

export function ProjectDeliverablesChecklist() {
  return (
    <ul className="my-6 grid gap-2 sm:grid-cols-2">
      {ITEMS.map((label) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm font-medium text-sky-900"
        >
          <span className="text-sky-600" aria-hidden>
            ✔
          </span>
          {label}
        </li>
      ))}
    </ul>
  )
}
