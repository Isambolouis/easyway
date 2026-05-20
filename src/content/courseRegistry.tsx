import { deepLearningChapters, getDeepLearningChapter } from './deepLearningChapters'
import { linearAlgebraChapters, getLinearAlgebraChapter } from './linearAlgebraChapters'
import { chapterViews as deepLearningViews } from '@/chapters/chapterViews'
import { linearAlgebraViews, ComingSoonLesson } from '@/chapters/linearAlgebraViews'
import type { ChapterMeta } from '@/types/course'
import type { ReactNode } from 'react'
import { getCourseBySlug } from './courses'

export function getChaptersForCourse(courseSlug: string): ChapterMeta[] {
  if (courseSlug === 'deep-learning') return deepLearningChapters
  if (courseSlug === 'algebre-lineaire') return linearAlgebraChapters
  return []
}

export function getChapter(courseSlug: string, lessonSlug: string) {
  if (courseSlug === 'deep-learning') return getDeepLearningChapter(lessonSlug)
  if (courseSlug === 'algebre-lineaire') return getLinearAlgebraChapter(lessonSlug)
  return undefined
}

export function getLessonView(courseSlug: string, lessonSlug: string): (() => ReactNode) | null {
  if (courseSlug === 'deep-learning') {
    const v = deepLearningViews[lessonSlug]
    return v ?? null
  }
  if (courseSlug === 'algebre-lineaire') {
    const v = linearAlgebraViews[lessonSlug]
    if (v) return v
    const meta = getLinearAlgebraChapter(lessonSlug)
    if (meta?.comingSoon) return () => <ComingSoonLesson title={meta.title} />
    return null
  }
  return null
}

export function getCourseFromPath(courseSlug: string) {
  return getCourseBySlug(courseSlug)
}
