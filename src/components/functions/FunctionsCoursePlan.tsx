import { functionLevels, functionsChaptersByLevel } from '@/content/functionsChapters'
import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Lock, CheckCircle2 } from 'lucide-react'

export function FunctionsCoursePlan() {
  return (
    <div className="my-10 space-y-8">
      <FadeIn>
        <h3 className="text-xl font-bold text-deep">Plan du cours — Fonctions mathématiques</h3>
        <p className="mt-2 text-muted">
          Sept parties : fondements → étude complète → limites & dérivées → approfondissements à venir.
        </p>
      </FadeIn>
      {functionLevels.map((level, li) => (
        <FadeIn key={level.id} delay={li * 0.06}>
          <div className="rounded-2xl border border-rose-200 bg-white p-4 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-sm font-bold text-white">
                {level.id}
              </span>
              <div>
                <p className="font-bold text-deep">{level.title}</p>
                <p className="text-sm text-muted">{level.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {functionsChaptersByLevel(level.id).map((ch) => {
                const Icon = ch.icon
                const active = !ch.comingSoon
                return (
                  <li key={ch.slug}>
                    <Link
                      to={active ? `/cours/fonctions-mathematiques/${ch.slug}` : '#'}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition',
                        active
                          ? 'border-rose-200 bg-rose-50 hover:border-rose-400 hover:shadow-sm'
                          : 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-70',
                      )}
                      onClick={(e) => !active && e.preventDefault()}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-rose-700" />
                      <span className="flex-1 font-medium text-deep">
                        Leçon {ch.number}. {ch.title}
                      </span>
                      {active ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-slate-400" />
                      )}
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
