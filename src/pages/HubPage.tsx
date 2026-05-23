import { Link } from 'react-router-dom'
import { courses, courseIcons } from '@/content/courses'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const accents = {
  teal: 'border-teal/30 hover:border-teal bg-teal/5 hover:shadow-teal/10',
  violet: 'border-violet-300 hover:border-violet-500 bg-violet-50 hover:shadow-violet/10',
  amber: 'border-amber-300 hover:border-amber-500 bg-amber-50 hover:shadow-amber-500/10',
  rose: 'border-rose-300 hover:border-rose-500 bg-rose-50 hover:shadow-rose-500/10',
  indigo: 'border-indigo-300 hover:border-indigo-500 bg-indigo-50 hover:shadow-indigo-500/10',
}

const iconBg = {
  teal: 'bg-teal text-white',
  violet: 'bg-violet-600 text-white',
  amber: 'bg-amber-600 text-white',
  rose: 'bg-rose-600 text-white',
  indigo: 'bg-indigo-600 text-white',
}

const linkAccent = {
  teal: 'text-teal',
  violet: 'text-violet-700',
  amber: 'text-amber-700',
  rose: 'text-rose-700',
  indigo: 'text-indigo-700',
}

export function HubPage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <span className="inline-block rounded-full bg-deep px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Bibliothèque de cours
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-deep">Apprendre l’IA & ses mathématiques</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Cours interactifs, quiz de calcul mental, démos et export PDF — choisis un parcours.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {courses.map((c, i) => {
          const Icon = courseIcons[c.slug] ?? courseIcons['deep-learning']
          return (
            <FadeIn key={c.slug} delay={i * 0.08}>
              <Link
                to={c.basePath}
                className={cn(
                  'group flex h-full flex-col rounded-2xl border-2 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl',
                  accents[c.accent],
                )}
              >
                <span className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-2xl', iconBg[c.accent])}>
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="text-xl font-bold text-deep">{c.title}</h2>
                <p className="mt-1 text-sm font-medium text-muted">{c.subtitle}</p>
                <p className="mt-3 flex-1 text-sm text-ink/80">{c.description}</p>
                <span className={cn('mt-5 inline-flex items-center gap-1 text-sm font-semibold', linkAccent[c.accent])}>
                  Ouvrir le cours <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}
