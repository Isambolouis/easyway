import { Link, Navigate, useParams } from 'react-router-dom'
import { getSubCourse, subCourseBasePath, COMPUTER_VISION_SLUG } from '@/content/computerVision'
import { getCourseBySlug } from '@/content/courses'
import { imageChapters } from '@/content/image/imageChapters'
import { ImageCoursePlan } from '@/components/image/ImageCoursePlan'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SubCourseHomePage() {
  const { subCourseId } = useParams<{ subCourseId: string }>()
  if (!subCourseId) return <Navigate to={`/cours/${COMPUTER_VISION_SLUG}`} replace />

  const sub = getSubCourse(subCourseId)
  const parent = getCourseBySlug(COMPUTER_VISION_SLUG)
  if (!sub || !parent || !sub.available) return <Navigate to={`/cours/${COMPUTER_VISION_SLUG}`} replace />

  const chapters = subCourseId === 'images' ? imageChapters : []
  const base = subCourseBasePath(sub.slug)

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <Link to={`/cours/${COMPUTER_VISION_SLUG}`} className="text-sm text-muted hover:text-deep">
          ← {parent.title}
        </Link>
        <span className="mt-4 inline-block rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Sous-cours
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-deep">{sub.title}</h1>
        <p className="mt-2 text-2xl font-medium text-muted">{sub.subtitle}</p>
        <p className="mt-4 text-lg text-muted">{sub.description}</p>
      </FadeIn>

      {subCourseId === 'images' && <ImageCoursePlan />}

      <h2 className="mt-10 text-xl font-bold text-deep">Commencer par l’introduction</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {chapters.map((ch, i) => {
          const Icon = ch.icon
          return (
            <FadeIn key={ch.slug} delay={i * 0.03}>
              <Link
                to={`${base}/${ch.slug}`}
                className={cn(
                  'group flex h-full flex-col rounded-2xl border border-cyan-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg dark:border-[var(--color-border)] dark:bg-[var(--color-card)]',
                )}
              >
                <Icon className="mb-3 h-5 w-5 text-cyan-700 dark:text-cyan-300" />
                <p className="text-xs font-bold text-muted">
                  {ch.number === 0 ? 'Introduction' : `Chapitre ${ch.number}`}
                </p>
                <h3 className="font-semibold text-deep group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                  {ch.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{ch.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Lire <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}
