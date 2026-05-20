import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  generateMentalMathSession,
  checkAnswer,
  OP_LABELS,
  type MentalMathQuestion,
} from '@/lib/mentalMathEngine'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  Clock,
  Divide,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Asterisk,
  Sparkles,
  Timer,
  XCircle,
  X,
} from 'lucide-react'

type Phase = 'idle' | 'playing' | 'finished'

/** Temps d’affichage du feedback avant la question suivante */
const FEEDBACK_PAUSE_MS = 2800

type AnswerRecord = {
  question: MentalMathQuestion
  userAnswer: string
  correct: boolean
  timedOut: boolean
}

const OP_ICONS = {
  add: Plus,
  sub: Minus,
  mul: Asterisk,
  div: Divide,
} as const

function SessionProgress({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold text-muted">
        <span>
          Question {Math.min(current + 1, total)} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function TimerRing({ secondsLeft, total }: { secondsLeft: number; total: number }) {
  const ratio = total > 0 ? secondsLeft / total : 0
  const urgent = secondsLeft <= 3
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-lg font-bold tabular-nums',
        urgent ? 'border-red-300 bg-red-50 text-red-700' : 'border-teal/30 bg-teal/5 text-teal-800',
      )}
    >
      <Timer className={cn('h-5 w-5', urgent && 'animate-pulse')} />
      <span>{Math.max(0, secondsLeft)}s</span>
      <div className="ml-1 h-2 w-16 overflow-hidden rounded-full bg-slate-200">
        <div
          className={cn('h-full transition-all duration-1000 ease-linear', urgent ? 'bg-red-500' : 'bg-teal')}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  )
}

export function MentalMathQuizSession() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [questions, setQuestions] = useState<MentalMathQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [records, setRecords] = useState<AnswerRecord[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const advanceLock = useRef(false)
  const timeoutHandled = useRef(false)

  const current = questions[index]
  const total = questions.length

  const startSession = useCallback(() => {
    const session = generateMentalMathSession()
    setQuestions(session)
    setIndex(0)
    setRecords([])
    setInput('')
    setFeedback(null)
    advanceLock.current = false
    timeoutHandled.current = false
    setSecondsLeft(session[0]?.timeLimitSec ?? 12)
    setPhase('playing')
  }, [])

  const goNext = useCallback(
    (record: AnswerRecord) => {
      if (advanceLock.current) return
      advanceLock.current = true
      setRecords((prev) => [...prev, record])
      setFeedback(record.correct ? 'correct' : record.timedOut ? 'timeout' : 'wrong')

      window.setTimeout(() => {
        const nextIndex = index + 1
        if (nextIndex >= questions.length) {
          setPhase('finished')
          setFeedback(null)
        } else {
          setIndex(nextIndex)
          setInput('')
          setFeedback(null)
          setSecondsLeft(questions[nextIndex]!.timeLimitSec)
          advanceLock.current = false
          timeoutHandled.current = false
          inputRef.current?.focus()
        }
      }, FEEDBACK_PAUSE_MS)
    },
    [index, questions],
  )

  const submitAnswer = useCallback(
    (timedOut = false) => {
      if (!current || phase !== 'playing' || feedback) return
      const ok = !timedOut && checkAnswer(current.answer, input)
      goNext({
        question: current,
        userAnswer: timedOut ? '' : input,
        correct: ok,
        timedOut,
      })
    },
    [current, phase, feedback, input, goNext],
  )

  useEffect(() => {
    if (phase !== 'playing' || !current || feedback) return
    setSecondsLeft(current.timeLimitSec)
    const interval = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [phase, index, current?.id, feedback, current?.timeLimitSec])

  useEffect(() => {
    if (phase === 'playing' && secondsLeft === 0 && !feedback && current && !timeoutHandled.current) {
      timeoutHandled.current = true
      submitAnswer(true)
    }
  }, [secondsLeft, phase, feedback, current, submitAnswer])

  useEffect(() => {
    if (phase === 'playing' && !feedback) {
      inputRef.current?.focus()
    }
  }, [phase, index, feedback])

  const score = records.filter((r) => r.correct).length

  if (phase === 'idle') {
    return (
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/10 via-white to-emerald-50/40 p-8 shadow-xl"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-lg">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-deep">Calcul mental</h1>
          <p className="mt-2 text-muted">
            Session aléatoire : <strong>1 à 10 questions</strong> parmi +, −, ×, ÷. Chaque question a son minuteur
            selon le type d’opération.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-teal" /> Addition — 12 s
            </li>
            <li className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-teal" /> Soustraction — 12 s
            </li>
            <li className="flex items-center gap-2">
              <Asterisk className="h-4 w-4 text-teal" /> Multiplication — 18 s
            </li>
            <li className="flex items-center gap-2">
              <Divide className="h-4 w-4 text-teal" /> Division — 22 s (résultat entier)
            </li>
          </ul>
          <button
            type="button"
            onClick={startSession}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-teal/90 hover:shadow-xl"
          >
            <Play className="h-5 w-5" />
            Démarrer une session
          </button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'finished') {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0
    return (
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-deep">Session terminée</h2>
          <p className="mt-2 text-4xl font-bold text-teal">
            {score} / {total}
          </p>
          <p className="text-muted">{pct}% de bonnes réponses</p>
          <div className="mt-6 max-h-48 space-y-2 overflow-y-auto">
            {records.map((r, i) => (
              <div
                key={r.question.id}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-2 text-sm',
                  r.correct ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900',
                )}
              >
                <span>
                  {i + 1}. {r.question.label}
                </span>
                <span className="font-mono font-semibold">
                  {r.correct ? '✓' : r.timedOut ? '⏱' : `✗ (${r.question.answer})`}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={startSession}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-deep px-6 py-3 font-semibold text-white hover:bg-deep/90"
          >
            <RotateCcw className="h-5 w-5" />
            Nouvelle session
          </button>
        </motion.div>
      </div>
    )
  }

  if (!current) return null

  const OpIcon = OP_ICONS[current.op]

  return (
    <div className="mx-auto max-w-xl">
      <SessionProgress current={index} total={total} />

      <motion.div
        layout
        className={cn(
          'mt-6 rounded-3xl border p-6 shadow-xl transition-colors',
          feedback === 'correct' && 'border-green-400 bg-green-50/80',
          feedback === 'wrong' && 'border-red-300 bg-red-50/80',
          feedback === 'timeout' && 'border-amber-300 bg-amber-50/80',
          !feedback && 'border-slate-200 bg-white',
        )}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            <OpIcon className="h-3.5 w-3.5" />
            {OP_LABELS[current.op]}
          </span>
          <TimerRing secondsLeft={secondsLeft} total={current.timeLimitSec} />
        </div>

        <p className="text-center font-mono text-5xl font-bold tracking-tight text-deep md:text-6xl">
          {current.label}
          <span className="text-teal"> = ?</span>
        </p>

        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault()
            submitAnswer(false)
          }}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={input}
            disabled={!!feedback}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ta réponse"
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-center text-2xl font-semibold text-deep outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!!feedback || !input.trim()}
            className="mt-4 w-full rounded-2xl bg-teal py-3.5 font-bold text-white shadow-md transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Valider
          </button>
        </form>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              {feedback === 'correct' && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Correct !</span>
                </>
              )}
              {feedback === 'wrong' && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-800">
                    Réponse : <strong>{current.answer}</strong>
                  </span>
                </>
              )}
              {feedback === 'timeout' && (
                <>
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-amber-900">
                    Temps écoulé — réponse : <strong>{current.answer}</strong>
                  </span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-sm text-muted hover:text-deep"
        onClick={() => setPhase('idle')}
      >
        <X className="h-4 w-4" /> Quitter la session
      </button>
    </div>
  )
}
