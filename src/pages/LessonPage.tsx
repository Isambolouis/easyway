import { Navigate, useParams } from 'react-router-dom'
import { getChapter, getLessonView, getCourseFromPath } from '@/content/courseRegistry'
import { LessonLayout } from '@/components/course/LessonLayout'

export function LessonPage() {
  const { courseId, slug } = useParams<{ courseId: string; slug: string }>()
  if (!courseId || !slug) return <Navigate to="/" replace />

  const course = getCourseFromPath(courseId)
  const meta = getChapter(courseId, slug)
  const View = getLessonView(courseId, slug)

  if (!course || !meta || !View) return <Navigate to={course?.basePath ?? '/'} replace />

  return (
    <LessonLayout>
      <View />
    </LessonLayout>
  )
}
