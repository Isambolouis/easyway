const STEPS = [
  { n: 1, icon: '📥', title: 'Collecte', desc: 'Obtenir des données fiables, définir les variables.' },
  { n: 2, icon: '📊', title: 'Organisation', desc: 'Tableaux, classes, effectifs et fréquences.' },
  { n: 3, icon: '📈', title: 'Indicateurs', desc: 'Moyenne, médiane, σ, quartiles, corrélation…' },
  { n: 4, icon: '🔍', title: 'Visualisation', desc: 'Graphiques, boxplot, nuage de points.' },
  { n: 5, icon: '🧠', title: 'Interprétation', desc: 'Expliquer, conclure, décider (avec contexte).' },
]

export function AnalysisWorkflow() {
  return (
    <ol className="my-6 space-y-3">
      {STEPS.map((s) => (
        <li
          key={s.n}
          className="flex gap-4 rounded-xl border border-sky-200 bg-gradient-to-r from-white to-sky-50/50 p-4 shadow-sm"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-lg text-white">
            {s.n}
          </span>
          <div>
            <p className="font-semibold text-deep">
              {s.icon} {s.title}
            </p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
