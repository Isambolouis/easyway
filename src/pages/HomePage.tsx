import { Link } from 'react-router-dom'
import { chapters, COURSE_SUBTITLE, COURSE_TITLE } from '@/content/chapters'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight } from 'lucide-react'

export function HomePage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <span className="inline-block rounded-full bg-teal px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Cours interactif
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-deep md:text-5xl">
          {COURSE_TITLE}
          
          <span className="mt-2 block text-2xl font-medium text-muted md:text-3xl">{COURSE_SUBTITLE}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Du cerveau biologique aux réseaux de neurones&nbsp;: cours progressif avec schémas, démos interactives,
          quiz et export PDF.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {chapters.map((ch, i) => {
          const Icon = ch.icon
          return (
            <FadeIn key={ch.slug} delay={i * 0.04}>
              <Link
                to={`/chapitre/${ch.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-muted">Chapitre {ch.number}</span>
                </div>
                <h2 className="font-semibold text-deep group-hover:text-teal">{ch.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{ch.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Lire <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}
