import { NavLink, useParams } from 'react-router-dom'
import { getChaptersForCourse, getCourseFromPath } from '@/content/courseRegistry'
import { cn } from '@/lib/utils'
import { ChevronRight, Lock } from 'lucide-react'
import { algebraLevels, chaptersByLevel } from '@/content/linearAlgebraChapters'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseFromPath(courseId) : null
  const chapters = courseId ? getChaptersForCourse(courseId) : []

  if (!course || !courseId) {
    return (
      <nav className="flex flex-col gap-1 p-3" aria-label="Cours">
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted">Bibliothèque</p>
        <NavLink to="/" className="rounded-xl px-2 py-2 text-sm font-medium text-deep hover:bg-slate-100">
          Tous les cours
        </NavLink>
      </nav>
    )
  }

  const isAlgebra = courseId === 'algebre-lineaire'

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Sommaire">
      <NavLink to="/" className="mb-2 px-2 text-xs text-muted hover:text-deep" onClick={onNavigate}>
        ← Bibliothèque
      </NavLink>
      <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted">{course.title}</p>

      {isAlgebra
        ? algebraLevels.map((level) => (
            <div key={level.id} className="mb-3">
              <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                N{level.id} — {level.title}
              </p>
              {chaptersByLevel(level.id).map((ch) => {
                const Icon = ch.icon
                const locked = ch.comingSoon
                return (
                  <NavLink
                    key={ch.slug}
                    to={locked ? '#' : `${course.basePath}/${ch.slug}`}
                    onClick={(e) => {
                      if (locked) e.preventDefault()
                      else onNavigate?.()
                    }}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-start gap-2 rounded-xl px-2 py-2 text-sm transition',
                        locked && 'cursor-not-allowed opacity-60',
                        isActive && !locked
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'text-ink/80 hover:bg-violet-50 hover:text-violet-900',
                      )
                    }
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0 flex-1 leading-snug">
                      <span className="block text-[10px] opacity-80">L.{ch.number}</span>
                      {ch.title}
                    </span>
                    {locked ? (
                      <Lock className="h-3.5 w-3.5 shrink-0 opacity-50" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-60 [[aria-current=page]_&]:opacity-100" />
                    )}
                  </NavLink>
                )
              })}
            </div>
          ))
        : chapters.map((ch) => {
            const Icon = ch.icon
            return (
              <NavLink
                key={ch.slug}
                to={`${course.basePath}/${ch.slug}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'group flex items-start gap-2 rounded-xl px-2 py-2.5 text-sm transition',
                    isActive
                      ? 'bg-deep text-white shadow-md'
                      : 'text-ink/80 hover:bg-slate-100 hover:text-deep',
                  )
                }
              >
                <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', 'text-teal')} />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs opacity-80">Ch. {ch.number}</span>
                  <span className="font-medium leading-snug">{ch.title}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 opacity-0 transition group-hover:opacity-60 [[aria-current=page]_&]:opacity-100" />
              </NavLink>
            )
          })}
    </nav>
  )
}
