import { Link } from 'react-router-dom'
import { imageCoursePlanParts } from '@/content/image/imageCoursePlanData'
import { subCourseBasePath } from '@/content/computerVision'
import { MathBlock } from '@/components/ui/MathBlock'

const base = subCourseBasePath('images')

export function ImagePlanOutline({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-10">
      {imageCoursePlanParts.map((part) => (
        <section key={part.id} className="scroll-x-card rounded-2xl border border-cyan-200/80 bg-white p-5 dark:border-[var(--color-border)] dark:bg-[var(--color-card)]">
          <h3 className="text-lg font-bold text-deep">{part.title}</h3>
          {part.chapters.map((ch) => (
            <div key={ch.slug} className="mt-6">
              <h4 className="text-base font-semibold text-deep">
                {compact ? (
                  <Link to={`${base}/${ch.slug}`} className="text-cyan-700 hover:underline dark:text-cyan-300">
                    Chapitre {ch.number} — {ch.title}
                  </Link>
                ) : (
                  <>Chapitre {ch.number} — {ch.title}</>
                )}
              </h4>
              <div className="mt-3 space-y-4 text-sm text-muted">
                {ch.sections.map((sec) => (
                  <div key={sec.id}>
                    <p className="font-semibold text-deep">{sec.title}</p>
                    {sec.intro && <p className="mt-1">{sec.intro}</p>}
                    {sec.math && (
                      <div className="my-2">
                        <MathBlock tex={sec.math} className="!my-2" />
                      </div>
                    )}
                    {sec.reading && sec.reading.length > 0 && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cyan-800 dark:text-cyan-300">
                        Lecture
                      </p>
                    )}
                    {sec.reading?.map((r, i) => (
                      <p key={i} className="ml-4">
                        · {r}
                      </p>
                    ))}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {sec.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {sec.mathAfter && (
                      <div className="my-2">
                        <MathBlock tex={sec.mathAfter} className="!my-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
