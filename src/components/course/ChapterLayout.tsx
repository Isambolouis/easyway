import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { chapters, getChapterBySlug } from '@/content/chapters'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function ChapterLayout({
  slug,
  children,
}: {
  slug: string
  children: ReactNode
}) {
  const meta = getChapterBySlug(slug)
  if (!meta) return null
  const idx = chapters.findIndex((c) => c.slug === slug)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  return (
    <article className="print-break-before w-full min-w-0 max-w-3xl">
      <FadeIn>
        <p className="text-sm font-semibold text-teal">Chapitre {meta.number}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-deep">{meta.title}</h1>
        <p className="mt-2 text-lg text-muted">{meta.description}</p>
      </FadeIn>
      <div className="prose-course mt-8 min-w-0 max-w-full space-y-4 text-[1.05rem] leading-relaxed text-ink/90">
        {children}
      </div>
      <nav className="no-print mt-12 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6">
        {prev ? (
          <Link
            to={`/chapitre/${prev.slug}`}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/chapitre/${next.slug}`}
            className="inline-flex items-center gap-1 rounded-xl bg-deep px-4 py-2 text-sm font-semibold text-white hover:bg-deep/90"
          >
            {next.title} <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </nav>
    </article>
  )
}
