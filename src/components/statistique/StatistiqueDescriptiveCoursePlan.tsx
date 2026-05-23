import { statistiqueLevels, statistiqueChaptersByLevel } from '@/content/statistiqueDescriptiveChapters'
import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { CheckCircle2, GraduationCap } from 'lucide-react'

export function StatistiqueDescriptiveCoursePlan() {
  return (
    <div className="my-10 space-y-8">
      <FadeIn>
        <div className="flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50/50 p-4">
          <GraduationCap className="h-8 w-8 shrink-0 text-sky-700" />
          <div>
            <h3 className="text-xl font-bold text-deep">Plan du cours — Statistique descriptive</h3>
            <p className="mt-2 text-muted">
              Du typage des données aux graphiques modernes, mesures de position et dispersion, corrélation et
              interprétation — 12 chapitres + 1 projet réel avec jeux de données et visualisations interactives.
            </p>
          </div>
        </div>
      </FadeIn>
      {statistiqueLevels.map((level, li) => (
        <FadeIn key={level.id} delay={li * 0.05}>
          <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">
                {level.id}
              </span>
              <div>
                <p className="font-bold text-deep">{level.title}</p>
                <p className="text-sm text-muted">{level.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {statistiqueChaptersByLevel(level.id).map((ch) => {
                const Icon = ch.icon
                return (
                  <li key={ch.slug}>
                    <Link
                      to={`/cours/statistique-descriptive/${ch.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/40 px-3 py-2.5 text-sm transition hover:border-sky-400 hover:shadow-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-sky-700" />
                      <span className="flex-1 font-medium text-deep">
                        {ch.number === 0 ? 'Intro' : `Ch. ${ch.number}`}. {ch.title}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
