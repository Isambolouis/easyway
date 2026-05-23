import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Option = { id: string; label: string; correct: boolean }

export function QuizCard({
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
    <div className="scroll-x-card my-8 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 shadow-md">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-violet-700">Quiz rapide</p>
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
                  'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition',
                  !done && 'hover:border-teal hover:bg-teal-50/50',
                  selected && done && opt.correct && 'border-green-500 bg-green-50',
                  selected && done && !opt.correct && 'border-red-400 bg-red-50',
                  !selected && done && opt.correct && 'border-green-300 bg-green-50/60',
                )}
              >
                {showResult && opt.correct && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                {showResult && !opt.correct && <XCircle className="h-4 w-4 text-red-500" />}
                {opt.label}
              </button>
            </li>
          )
        })}
      </ul>
      {done && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-white/80 p-3 text-sm text-muted"
        >
          {explanation}
        </motion.p>
      )}
    </div>
  )
}
