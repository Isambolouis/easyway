import { Brain, Calculator, type LucideIcon } from 'lucide-react'

export type QuizCategory = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  path: string
  available: boolean
  accent: string
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'calcul-mental',
    title: 'Calcul mental',
    description: 'Addition, soustraction, multiplication et division — nombres entiers.',
    icon: Calculator,
    path: '/quiz/calcul-mental',
    available: true,
    accent: 'teal',
  },
  {
    id: 'bientot',
    title: 'Bientôt',
    description: 'Algèbre, fractions, pourcentages…',
    icon: Brain,
    path: '#',
    available: false,
    accent: 'slate',
  },
]

export function getQuizCategory(id: string) {
  return quizCategories.find((c) => c.id === id)
}
