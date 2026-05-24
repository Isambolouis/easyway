import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import type { ImageChapterContent } from '@/content/image/imageChapterTypes'

export function ImageChapterView({ content }: { content: ImageChapterContent }) {
  return (
    <>
      {content.lead && (
        <FadeIn>
          <p className="text-lg text-muted">{content.lead}</p>
        </FadeIn>
      )}
      {content.partTitle && (
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          {content.partTitle}
        </p>
      )}
      {content.sections.map((sec) => {
        const paired =
          sec.bullets &&
          sec.paragraphs &&
          sec.bullets.length === sec.paragraphs.length &&
          sec.paragraphs.length > 0

        return (
          <section key={sec.id} className="mt-10">
            <h3 className="text-xl font-bold text-deep">{sec.title}</h3>

            {sec.intro && <p className="mt-3 text-muted">{sec.intro}</p>}
            {sec.math && <MathBlock tex={sec.math} />}

            {sec.reading && sec.reading.length > 0 && (
              <>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                  Lecture
                </p>
                <ul className="mt-2 list-none space-y-1 pl-0 text-muted">
                  {sec.reading.map((r, i) => (
                    <li key={i}>· {r}</li>
                  ))}
                </ul>
              </>
            )}

            {paired ? (
              <ul className="mt-3 space-y-4">
                {sec.bullets!.map((b, i) => (
                  <li key={i} className="list-none rounded-xl border border-cyan-100 bg-cyan-50/30 p-3 dark:border-[var(--color-border)] dark:bg-cyan-950/20">
                    <p className="font-semibold text-deep">{b}</p>
                    <p className="mt-2 text-sm text-muted">{sec.paragraphs![i]}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                    {sec.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {sec.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-muted">
                    {p}
                  </p>
                ))}
              </>
            )}

            {sec.mathAfter && <MathBlock tex={sec.mathAfter} />}

            {sec.callout && (
              <Callout variant={sec.callout.variant} title={sec.callout.title}>
                {sec.callout.body}
              </Callout>
            )}
          </section>
        )
      })}
    </>
  )
}
