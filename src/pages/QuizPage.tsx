import { Navigate, useParams } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { MentalMathQuizSession } from '@/components/quiz/MentalMathQuizSession'
import { getQuizCategory } from '@/content/quizCategories'

export function QuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>()

  if (!categoryId) {
    return <Navigate to="/quiz/calcul-mental" replace />
  }

  const category = getQuizCategory(categoryId)

  if (!category?.available) {
    return <Navigate to="/quiz/calcul-mental" replace />
  }

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <span className="inline-block rounded-full bg-teal px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Quiz — {category.title}
        </span>
      </FadeIn>
      <div className="mt-8">
        {categoryId === 'calcul-mental' && <MentalMathQuizSession />}
      </div>
    </div>
  )
}
