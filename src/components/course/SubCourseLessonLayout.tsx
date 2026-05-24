import { Link, useParams } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { COMPUTER_VISION_SLUG, getSubCourse, subCourseBasePath } from '@/content/computerVision'
import { imageChapters, getImageChapter } from '@/content/image/imageChapters'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

const accentLabel: Record<string, string> = {
  cyan: 'text-cyan-600 dark:text-cyan-400',
}

export function SubCourseLessonLayout({
  children,
  subCourseId,
  accent = 'cyan',
}: {
  children: ReactNode
  subCourseId: string
  accent?: 'cyan'
}) {
  const { slug } = useParams<{ slug: string }>()
  if (!slug) return null

  const sub = getSubCourse(subCourseId)
  const meta = getImageChapter(slug)
  const chapters = imageChapters
  if (!sub || !meta) return null

  const idx = chapters.findIndex((c) => c.slug === slug)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null
  const base = subCourseBasePath(subCourseId)
  const parentPath = `/cours/${COMPUTER_VISION_SLUG}`

  return (
    <article className="print-break-before w-full min-w-0 max-w-3xl">
      <FadeIn>
        <p className={`text-sm font-semibold ${accentLabel[accent]}`}>
          {sub.title} — {meta.number === 0 ? 'Introduction' : `Chapitre ${meta.number}`}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-deep">{meta.title}</h1>
        <p className="mt-2 text-lg text-muted">{meta.description}</p>
      </FadeIn>
      <div className="prose-course mt-8 min-w-0 max-w-full space-y-4 text-[1.05rem] leading-relaxed text-ink/90">
        {children}
      </div>
      <nav className="no-print mt-12 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6 dark:border-[var(--color-border)]">
        {prev ? (
          <Link
            to={`${base}/${prev.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-[var(--color-border)] dark:hover:bg-[var(--color-card-hover)]"
          >
            <ChevronLeft className="h-4 w-4" /> {prev.title}
          </Link>
        ) : (
          <Link to={base} className="text-sm text-muted hover:text-deep">
            ← Accueil du sous-cours
          </Link>
        )}
        {next ? (
          <Link
            to={`${base}/${next.slug}`}
            className="inline-flex items-center gap-1 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            {next.title} <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </nav>
      <p className="no-print mt-4 text-center text-xs text-muted">
        <Link to={parentPath} className="hover:text-deep">
          Computer Vision — tous les sous-cours
        </Link>
      </p>
    </article>
  )
}
