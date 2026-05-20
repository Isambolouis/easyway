import { Link, Navigate, useParams } from 'react-router-dom'
import { getChaptersForCourse, getCourseFromPath } from '@/content/courseRegistry'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight, Lock } from 'lucide-react'
import { AlgebraCoursePlan } from '@/components/algebra/AlgebraCoursePlan'
import { cn } from '@/lib/utils'

export function CourseHomePage() {
  const { courseId } = useParams<{ courseId: string }>()
  if (!courseId) return <Navigate to="/" replace />
  const course = getCourseFromPath(courseId)
  const chapters = getChaptersForCourse(courseId)
  if (!course) return <Navigate to="/" replace />

  const isAlgebra = courseId === 'algebre-lineaire'

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white',
            isAlgebra ? 'bg-violet-600' : 'bg-teal',
          )}
        >
          {course.chapterLabel}s interactifs
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-deep">{course.title}</h1>
        <p className="mt-2 text-2xl font-medium text-muted">{course.subtitle}</p>
        <p className="mt-4 text-lg text-muted">{course.description}</p>
      </FadeIn>

      {isAlgebra && <AlgebraCoursePlan />}

      <h2 className="mt-10 text-xl font-bold text-deep">
        {isAlgebra ? 'Commencer par la leçon 1' : 'Chapitres'}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {chapters.map((ch, i) => {
          const Icon = ch.icon
          const locked = ch.comingSoon
          return (
            <FadeIn key={ch.slug} delay={i * 0.03}>
              {locked ? (
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 opacity-75">
                  <div className="mb-3 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-slate-400" />
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-xs font-bold text-muted">
                    {course.chapterLabel} {ch.number}
                  </p>
                  <h3 className="font-semibold text-slate-500">{ch.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">Bientôt disponible</p>
                </div>
              ) : (
                <Link
                  to={`${course.basePath}/${ch.slug}`}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg',
                    isAlgebra ? 'border-violet-200 hover:border-violet-400' : 'border-slate-200 hover:border-teal/40',
                  )}
                >
                  <Icon className={cn('mb-3 h-5 w-5', isAlgebra ? 'text-violet-600' : 'text-teal')} />
                  <p className="text-xs font-bold text-muted">
                    {course.chapterLabel} {ch.number}
                  </p>
                  <h3 className="font-semibold text-deep group-hover:text-teal">{ch.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{ch.description}</p>
                  <span
                    className={cn(
                      'mt-4 inline-flex items-center gap-1 text-sm font-semibold',
                      isAlgebra ? 'text-violet-700' : 'text-teal',
                    )}
                  >
                    Lire <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}
