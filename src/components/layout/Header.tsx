import { Link, useLocation, useParams } from 'react-router-dom'
import { getQuizCategory } from '@/content/quizCategories'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { ArrowUp, FileDown, Menu, X } from 'lucide-react'
import { getCourseFromPath } from '@/content/courseRegistry'
import { getSubCourse } from '@/content/computerVision'

export function Header({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}) {
  const { courseId } = useParams<{ courseId: string }>()
  const location = useLocation()
  const quizMatch = location.pathname.match(/^\/quiz\/([^/]+)/)
  const quizCat = quizMatch ? getQuizCategory(quizMatch[1]!) : null
  const course = courseId ? getCourseFromPath(courseId) : null
  const cvSubMatch = location.pathname.match(/^\/cours\/computer-vision\/([^/]+)/)
  const cvSub = cvSubMatch?.[1] ? getSubCourse(cvSubMatch[1]) : null
  const headerTitle = quizCat
    ? `Quiz — ${quizCat.title}`
    : cvSub
      ? `${course?.title ?? 'Computer Vision'} — ${cvSub.title}`
      : (course?.title ?? 'Bibliothèque de cours')
  const headerSubtitle = quizCat
    ? 'Entraînement interactif'
    : cvSub
      ? cvSub.subtitle
      : (course?.subtitle ?? 'Deep Learning, Algèbre & Équations')

  return (
    <header className="no-print sticky top-1 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-[var(--color-border)] dark:bg-[color-mix(in_srgb,var(--color-card)_92%,transparent)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-deep lg:hidden dark:border-[var(--color-border)] dark:text-[var(--color-ink)]"
            onClick={onToggleSidebar}
            aria-label="Menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            to={quizCat ? '/quiz/calcul-mental' : cvSub ? location.pathname.split('/').slice(0, 4).join('/') : (course?.basePath ?? '/')}
            className="min-w-0"
          >
            <p className="truncate text-sm font-bold text-deep">{headerTitle}</p>
            <p className="truncate text-xs text-muted">{headerSubtitle}</p>
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-deep hover:bg-slate-50 sm:inline-flex sm:items-center sm:gap-1 dark:border-[var(--color-border)] dark:text-[var(--color-ink)] dark:hover:bg-[var(--color-card-hover)]"
          >
            <ArrowUp className="h-4 w-4" /> Haut
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-deep px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-deep/90"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </header>
  )
}
