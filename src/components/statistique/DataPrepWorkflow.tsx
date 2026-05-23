const STEPS = [
  { n: 1, title: 'Nettoyer les données', desc: 'Valeurs manquantes, doublons, erreurs de saisie.' },
  { n: 2, title: 'Moyenne et variance', desc: 'Comprendre le centre et la dispersion avant tout modèle.' },
  { n: 3, title: 'Normaliser', desc: 'Z-score ou mise à l’échelle pour comparer des variables.' },
  { n: 4, title: 'Corrélations', desc: 'Repérer les relations utiles et éviter la redondance.' },
]

export function DataPrepWorkflow() {
  return (
    <ol className="my-6 space-y-3">
      {STEPS.map((s) => (
        <li
          key={s.n}
          className="flex gap-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-white to-indigo-50/40 p-4 shadow-sm"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            {s.n}
          </span>
          <div>
            <p className="font-semibold text-deep">{s.title}</p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
