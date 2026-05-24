import { Link } from 'react-router-dom'
import { computerVisionSubCourses, subCourseBasePath } from '@/content/computerVision'
import { getCourseBySlug } from '@/content/courses'
import { COMPUTER_VISION_SLUG } from '@/content/computerVision'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight, Eye, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ComputerVisionHubPage() {
  const course = getCourseBySlug(COMPUTER_VISION_SLUG)
  if (!course) return null

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <Link to="/" className="text-sm text-muted hover:text-deep">
          ← Bibliothèque
        </Link>
        <span className="mt-4 inline-block rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Computer Vision
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-deep">{course.title}</h1>
        <p className="mt-2 text-2xl font-medium text-muted">{course.subtitle}</p>
        <p className="mt-4 text-lg text-muted">{course.description}</p>
      </FadeIn>

      <h2 className="mt-10 text-xl font-bold text-deep">Sous-cours</h2>
      <p className="mt-2 text-muted">
        Choisis un module. Le parcours <strong>Images</strong> est disponible ; d’autres modules arriveront ensuite.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {computerVisionSubCourses.map((sub, i) => {
          const Icon = sub.icon
          const locked = !sub.available
          return (
            <FadeIn key={sub.slug} delay={i * 0.06}>
              {locked ? (
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 opacity-75 dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]">
                  <Icon className="mb-3 h-6 w-6 text-slate-400" />
                  <h3 className="font-bold text-slate-500">{sub.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{sub.subtitle}</p>
                  <Lock className="mt-4 h-4 w-4 text-slate-400" />
                </div>
              ) : (
                <Link
                  to={subCourseBasePath(sub.slug)}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border-2 border-cyan-200 bg-cyan-50/40 p-6 shadow-md transition hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg dark:border-cyan-800 dark:bg-cyan-950/30',
                  )}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-bold text-deep">{sub.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{sub.subtitle}</p>
                  <p className="mt-3 flex-1 text-sm text-ink/80">{sub.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                    Ouvrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </FadeIn>
          )
        })}
        <FadeIn delay={0.12}>
          <div className="flex h-full flex-col rounded-2xl border border-dashed border-slate-300 p-6 dark:border-[var(--color-border)]">
            <Eye className="mb-3 h-6 w-6 text-muted" />
            <h3 className="font-bold text-muted">Modules à venir</h3>
            <p className="mt-2 text-sm text-muted">Vidéo, 3D avancée, déploiement edge…</p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
