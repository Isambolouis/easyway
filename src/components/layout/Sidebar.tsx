import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getChaptersForCourse, getCourseFromPath } from '@/content/courseRegistry'
import { quizCategories } from '@/content/quizCategories'
import { cn } from '@/lib/utils'
import { ChevronRight, Lock, BookOpen, Zap } from 'lucide-react'
import { algebraLevels, chaptersByLevel } from '@/content/linearAlgebraChapters'
import { equationLevels, equationsChaptersByLevel } from '@/content/equationsChapters'
import { functionLevels, functionsChaptersByLevel } from '@/content/functionsChapters'
import { nlpLevels, nlpChaptersByLevel } from '@/content/nlpChapters'
import { probabilitesLevels, probabilitesChaptersByLevel } from '@/content/probabilitesChapters'

type SidebarTab = 'cours' | 'quiz'

function SidebarTabs({
  active,
  onChange,
}: {
  active: SidebarTab
  onChange: (t: SidebarTab) => void
}) {
  return (
    <div className="mb-4 flex rounded-xl bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange('cours')}
        className={cn(
          'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold uppercase tracking-wide transition',
          active === 'cours' ? 'bg-white text-deep shadow-sm' : 'text-muted hover:text-deep',
        )}
      >
        <BookOpen className="h-3.5 w-3.5" />
        Cours
      </button>
      <button
        type="button"
        onClick={() => onChange('quiz')}
        className={cn(
          'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold uppercase tracking-wide transition',
          active === 'quiz' ? 'bg-white text-teal shadow-sm' : 'text-muted hover:text-deep',
        )}
      >
        <Zap className="h-3.5 w-3.5" />
        Quiz
      </button>
    </div>
  )
}

function QuizSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-1">
      <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-teal-700">Catégories</p>
      {quizCategories.map((cat) => {
        const Icon = cat.icon
        const locked = !cat.available
        return (
          <NavLink
            key={cat.id}
            to={locked ? '#' : cat.path}
            onClick={(e) => {
              if (locked) e.preventDefault()
              else onNavigate?.()
            }}
            className={({ isActive }) =>
              cn(
                'group flex items-start gap-2 rounded-xl px-2 py-2.5 text-sm transition',
                locked && 'cursor-not-allowed opacity-55',
                isActive && !locked
                  ? 'bg-teal text-white shadow-md'
                  : 'text-ink/80 hover:bg-teal-50 hover:text-teal-900',
              )
            }
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 leading-snug">
              <span className="font-medium">{cat.title}</span>
              {!locked && (
                <span className="mt-0.5 block text-[10px] opacity-80 line-clamp-2">{cat.description}</span>
              )}
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
  )
}

function useStateFromRoute(isQuizRoute: boolean): [SidebarTab, (t: SidebarTab) => void] {
  const [tab, setTab] = useState<SidebarTab>(isQuizRoute ? 'quiz' : 'cours')
  useEffect(() => {
    setTab(isQuizRoute ? 'quiz' : 'cours')
  }, [isQuizRoute])
  return [tab, setTab]
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()
  const location = useLocation()
  const course = courseId ? getCourseFromPath(courseId) : null
  const chapters = courseId ? getChaptersForCourse(courseId) : []

  const isQuizRoute = location.pathname.startsWith('/quiz')
  const [tab, setTab] = useStateFromRoute(isQuizRoute)

  const isAlgebra = courseId === 'algebre-lineaire'
  const isEquations = courseId === 'equations-mathematiques'
  const isFunctions = courseId === 'fonctions-mathematiques'
  const isNlp = courseId === 'nlp'
  const isProbabilites = courseId === 'probabilites'

  const levelNav = (
    levels: { id: number; title: string }[],
    byLevel: (n: number) => ReturnType<typeof getChaptersForCourse>,
    accent: 'violet' | 'amber' | 'rose' | 'indigo' | 'emerald',
  ) =>
    levels.map((level) => (
      <div key={level.id} className="mb-3">
        <p
          className={cn(
            'px-2 py-1 text-[10px] font-bold uppercase tracking-wider',
            accent === 'violet'
              ? 'text-violet-600'
              : accent === 'amber'
                ? 'text-amber-700'
                : accent === 'rose'
                  ? 'text-rose-700'
                  : accent === 'emerald'
                    ? 'text-emerald-700'
                    : 'text-indigo-700',
          )}
        >
          P.{level.id} — {level.title}
        </p>
        {byLevel(level.id).map((ch) => {
          const Icon = ch.icon
          const locked = ch.comingSoon
          return (
            <NavLink
              key={ch.slug}
              to={locked ? '#' : `${course!.basePath}/${ch.slug}`}
              onClick={(e) => {
                if (locked) e.preventDefault()
                else onNavigate?.()
              }}
              className={({ isActive }) =>
                cn(
                  'group flex items-start gap-2 rounded-xl px-2 py-2 text-sm transition',
                  locked && 'cursor-not-allowed opacity-60',
                  isActive && !locked
                    ? accent === 'violet'
                      ? 'bg-violet-600 text-white shadow-md'
                      : accent === 'amber'
                        ? 'bg-amber-600 text-white shadow-md'
                        : accent === 'rose'
                          ? 'bg-rose-600 text-white shadow-md'
                          : accent === 'emerald'
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-indigo-600 text-white shadow-md'
                    : accent === 'violet'
                      ? 'text-ink/80 hover:bg-violet-50 hover:text-violet-900'
                      : accent === 'amber'
                        ? 'text-ink/80 hover:bg-amber-50 hover:text-amber-900'
                        : accent === 'rose'
                          ? 'text-ink/80 hover:bg-rose-50 hover:text-rose-900'
                          : accent === 'emerald'
                            ? 'text-ink/80 hover:bg-emerald-50 hover:text-emerald-900'
                            : 'text-ink/80 hover:bg-indigo-50 hover:text-indigo-900',
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

  const coursContent = !course || !courseId ? (
    <>
      <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted">Bibliothèque</p>
      <NavLink
        to="/"
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            'rounded-xl px-2 py-2 text-sm font-medium transition',
            isActive ? 'bg-deep text-white' : 'text-deep hover:bg-slate-100',
          )
        }
      >
        Tous les cours
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/" className="mb-2 px-2 text-xs text-muted hover:text-deep" onClick={onNavigate}>
        ← Bibliothèque
      </NavLink>
      <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted">{course.title}</p>
      {isAlgebra
        ? levelNav(algebraLevels, chaptersByLevel, 'violet')
        : isEquations
          ? levelNav(equationLevels, equationsChaptersByLevel, 'amber')
          : isFunctions
            ? levelNav(functionLevels, functionsChaptersByLevel, 'rose')
            : isNlp
              ? levelNav(nlpLevels, nlpChaptersByLevel, 'indigo')
              : isProbabilites
                ? levelNav(probabilitesLevels, probabilitesChaptersByLevel, 'emerald')
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
    </>
  )

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Navigation">
      <SidebarTabs
        active={tab}
        onChange={(t) => {
          setTab(t)
          if (t === 'quiz') {
            if (!isQuizRoute) navigate('/quiz/calcul-mental')
            onNavigate?.()
          }
        }}
      />
      {tab === 'quiz' ? <QuizSidebarNav onNavigate={onNavigate} /> : coursContent}
    </nav>
  )
}
