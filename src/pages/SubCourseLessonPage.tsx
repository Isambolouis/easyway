import { Navigate, useParams } from 'react-router-dom'
import { COMPUTER_VISION_SLUG, getSubCourse, subCourseBasePath } from '@/content/computerVision'
import { getImageChapter } from '@/content/image/imageChapters'
import { imageViews } from '@/chapters/image/imageViews'
import { SubCourseLessonLayout } from '@/components/course/SubCourseLessonLayout'

export function SubCourseLessonPage() {
  const { subCourseId, slug } = useParams<{
    subCourseId: string
    slug: string
  }>()

  if (!subCourseId || !slug) return <Navigate to={`/cours/${COMPUTER_VISION_SLUG}`} replace />

  const sub = getSubCourse(subCourseId)
  if (!sub?.available) return <Navigate to={`/cours/${COMPUTER_VISION_SLUG}`} replace />

  if (subCourseId !== 'images') return <Navigate to={subCourseBasePath(subCourseId)} replace />

  const meta = getImageChapter(slug)
  const View = imageViews[slug]
  if (!meta || !View) return <Navigate to={subCourseBasePath(subCourseId)} replace />

  return (
    <SubCourseLessonLayout subCourseId={subCourseId} accent="cyan">
      <View />
    </SubCourseLessonLayout>
  )
}
