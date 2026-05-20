export type MentalMathOp = 'add' | 'sub' | 'mul' | 'div'

export type MentalMathQuestion = {
  id: string
  op: MentalMathOp
  a: number
  b: number
  label: string
  answer: number
  timeLimitSec: number
}

const OPS: MentalMathOp[] = ['add', 'sub', 'mul', 'div']

const OP_LABELS: Record<MentalMathOp, string> = {
  add: 'Addition',
  sub: 'Soustraction',
  mul: 'Multiplication',
  div: 'Division',
}

/** Durée par type de question (secondes) */
export const TIME_LIMIT_BY_OP: Record<MentalMathOp, number> = {
  add: 12,
  sub: 12,
  mul: 18,
  div: 22,
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickOp(): MentalMathOp {
  return OPS[randInt(0, OPS.length - 1)]!
}

function generateOne(op: MentalMathOp, index: number): MentalMathQuestion {
  let a: number
  let b: number
  let answer: number
  let symbol: string

  switch (op) {
    case 'add':
      a = randInt(2, 99)
      b = randInt(2, 99)
      answer = a + b
      symbol = '+'
      break
    case 'sub':
      a = randInt(10, 99)
      b = randInt(2, a)
      answer = a - b
      symbol = '−'
      break
    case 'mul':
      a = randInt(2, 12)
      b = randInt(2, 12)
      answer = a * b
      symbol = '×'
      break
    case 'div': {
      b = randInt(2, 12)
      const q = randInt(2, 12)
      a = b * q
      answer = q
      symbol = '÷'
      break
    }
  }

  return {
    id: `q-${index}-${Date.now()}`,
    op,
    a,
    b,
    label: `${a} ${symbol} ${b}`,
    answer,
    timeLimitSec: TIME_LIMIT_BY_OP[op],
  }
}

/** Génère une session : entre 1 et 10 questions, opérations aléatoires. */
export function generateMentalMathSession(): MentalMathQuestion[] {
  const count = randInt(1, 10)
  return Array.from({ length: count }, (_, i) => generateOne(pickOp(), i))
}

export function checkAnswer(expected: number, userValue: string): boolean {
  const parsed = Number.parseFloat(userValue.replace(',', '.').trim())
  if (!Number.isFinite(parsed)) return false
  return Math.abs(parsed - expected) < 1e-6
}

export { OP_LABELS }
