import { imageLevels, imageChaptersByLevel } from '@/content/image/imageChapters'
import { subCourseBasePath } from '@/content/computerVision'
import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { CheckCircle2, ImageIcon } from 'lucide-react'

const base = subCourseBasePath('images')

export function ImageCoursePlan() {
  return (
    <div className="my-10 space-y-8">
      <FadeIn>
        <div className="flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 dark:border-cyan-800 dark:bg-cyan-950/40">
          <ImageIcon className="h-8 w-8 shrink-0 text-cyan-700 dark:text-cyan-300" />
          <div>
            <h3 className="text-xl font-bold text-deep">Sous-cours — Images numériques</h3>
            <p className="mt-2 text-muted">
              10 parties · 19 chapitres — du pixel aux CNN, OpenCV et projets de vision. Chaque chapitre conserve le
              plan détaillé avec explications.
            </p>
          </div>
        </div>
      </FadeIn>
      {imageLevels.map((level, li) => (
        <FadeIn key={level.id} delay={li * 0.04}>
          <div className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-md dark:border-[var(--color-border)] dark:bg-[var(--color-card)]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-sm font-bold text-white">
                {level.id}
              </span>
              <div>
                <p className="font-bold text-deep">{level.title}</p>
                <p className="text-sm text-muted">{level.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {imageChaptersByLevel(level.id).map((ch) => {
                const Icon = ch.icon
                return (
                  <li key={ch.slug}>
                    <Link
                      to={`${base}/${ch.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-cyan-100 bg-cyan-50/30 px-3 py-2.5 text-sm transition hover:border-cyan-400 hover:shadow-sm dark:border-[var(--color-border)] dark:bg-cyan-950/20"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                      <span className="min-w-0 flex-1">
                        <span className="font-semibold text-deep">
                          {ch.number === 0 ? 'Introduction' : `Ch. ${ch.number}`} — {ch.title}
                        </span>
                      </span>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-600 opacity-60" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
