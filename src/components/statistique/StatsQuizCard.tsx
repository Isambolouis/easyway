import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Option = { id: string; label: string; correct: boolean }

const optionBase =
  'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition text-ink dark:text-[var(--color-ink)]'

const optionIdle =
  'border-slate-200 bg-white dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)]'

const optionHover =
  'hover:border-sky-400 hover:bg-sky-50/50 dark:hover:border-sky-500/60 dark:hover:bg-sky-950/40'

/** Quiz rapide — thème sky (cours statistique descriptive). */
export function StatsQuizCard({
  question,
  options,
  explanation,
}: {
  question: string
  options: Option[]
  explanation: string
}) {
  const [picked, setPicked] = useState<string | null>(null)
  const done = picked !== null

  return (
    <div className="scroll-x-card my-6 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 shadow-md dark:border-sky-600/40 dark:from-sky-950/55 dark:to-[var(--color-card)] dark:shadow-black/20">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
        Quiz rapide
      </p>
      <p className="mb-4 font-semibold text-deep">{question}</p>
      <ul className="space-y-2">
        {options.map((opt) => {
          const selected = picked === opt.id
          const showResult = done && selected
          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={done}
                onClick={() => setPicked(opt.id)}
                className={cn(
                  optionBase,
                  !done && optionIdle,
                  !done && optionHover,
                  selected && done && opt.correct && 'border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-950/45',
                  selected && done && !opt.correct && 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-950/40',
                  !selected && done && opt.correct && 'border-green-300 bg-green-50/60 dark:border-green-600 dark:bg-green-950/35',
                )}
              >
                {showResult && opt.correct && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                )}
                {showResult && !opt.correct && (
                  <XCircle className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                )}
                <span>{opt.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {done && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg border border-transparent bg-white/80 p-3 text-sm text-muted dark:border-[var(--color-border)] dark:bg-[var(--color-elevated)] dark:text-[var(--color-muted)]"
        >
          {explanation}
        </motion.p>
      )}
    </div>
  )
}
