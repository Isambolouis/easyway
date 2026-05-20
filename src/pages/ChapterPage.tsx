import { Navigate, useParams } from 'react-router-dom'
import { getChapterBySlug } from '@/content/chapters'
import { chapterViews } from '@/chapters/chapterViews'
import { ChapterLayout } from '@/components/course/ChapterLayout'

export function ChapterPage() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug) return <Navigate to="/" replace />
  const meta = getChapterBySlug(slug)
  const View = chapterViews[slug]
  if (!meta || !View) return <Navigate to="/" replace />

  return (
    <ChapterLayout slug={slug}>
      <View />
    </ChapterLayout>
  )
}
