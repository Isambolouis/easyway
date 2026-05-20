import { Link, useParams } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { getChapter, getChaptersForCourse, getCourseFromPath } from '@/content/courseRegistry'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function LessonLayout({ children }: { children: ReactNode }) {
  const { courseId, slug } = useParams<{ courseId: string; slug: string }>()
  if (!courseId || !slug) return null

  const course = getCourseFromPath(courseId)
  const meta = getChapter(courseId, slug)
  const chapters = getChaptersForCourse(courseId)
  if (!course || !meta) return null

  const idx = chapters.findIndex((c) => c.slug === slug)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null
  const base = course.basePath

  return (
    <article className="print-break-before max-w-3xl">
      <FadeIn>
        <p className="text-sm font-semibold text-teal">
          {course.chapterLabel} {meta.number}
          {meta.comingSoon && (
            <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">Bientôt</span>
          )}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-deep">{meta.title}</h1>
        <p className="mt-2 text-lg text-muted">{meta.description}</p>
      </FadeIn>
      <div className="prose-course mt-8 space-y-4 text-[1.05rem] leading-relaxed text-ink/90">{children}</div>
      <nav className="no-print mt-12 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6">
        {prev ? (
          <Link
            to={`${base}/${prev.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" /> {prev.title}
          </Link>
        ) : (
          <Link to={base} className="text-sm text-muted hover:text-deep">
            ← Accueil du cours
          </Link>
        )}
        {next && !next.comingSoon ? (
          <Link
            to={`${base}/${next.slug}`}
            className="inline-flex items-center gap-1 rounded-xl bg-deep px-4 py-2 text-sm font-semibold text-white hover:bg-deep/90"
          >
            {next.title} <ChevronRight className="h-4 w-4" />
          </Link>
        ) : next ? (
          <span className="text-sm text-muted">Leçon suivante — bientôt</span>
        ) : null}
      </nav>
    </article>
  )
}
