import { Link, useParams } from 'react-router-dom'
import { ArrowUp, FileDown, Menu, X } from 'lucide-react'
import { getCourseFromPath } from '@/content/courseRegistry'

export function Header({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}) {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseFromPath(courseId) : null

  return (
    <header className="no-print sticky top-1 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-deep lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to={course?.basePath ?? '/'} className="min-w-0">
            <p className="truncate text-sm font-bold text-deep">{course?.title ?? 'Bibliothèque de cours'}</p>
            <p className="truncate text-xs text-muted">{course?.subtitle ?? 'Deep Learning, Algèbre & Équations'}</p>
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-deep hover:bg-slate-50 sm:inline-flex sm:items-center sm:gap-1"
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
