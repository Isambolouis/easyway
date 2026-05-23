import { deepLearningChapters, getDeepLearningChapter } from './deepLearningChapters'
import { linearAlgebraChapters, getLinearAlgebraChapter } from './linearAlgebraChapters'
import { equationsChapters, getEquationsChapter } from './equationsChapters'
import { functionsChapters, getFunctionsChapter } from './functionsChapters'
import { nlpChapters, getNlpChapter } from './nlpChapters'
import { probabilitesChapters, getProbabilitesChapter } from './probabilitesChapters'
import { chapterViews as deepLearningViews } from '@/chapters/chapterViews'
import { linearAlgebraViews, ComingSoonLesson } from '@/chapters/linearAlgebraViews'
import { equationsViews, EquationsComingSoon } from '@/chapters/equationsViews'
import { functionsViews, FunctionsComingSoon } from '@/chapters/functionsViews'
import { nlpViews } from '@/chapters/nlpViews'
import { probabilitesViews } from '@/chapters/probabilitesViews'
import type { ChapterMeta } from '@/types/course'
import type { ReactNode } from 'react'
import { getCourseBySlug } from './courses'

export function getChaptersForCourse(courseSlug: string): ChapterMeta[] {
  if (courseSlug === 'deep-learning') return deepLearningChapters
  if (courseSlug === 'algebre-lineaire') return linearAlgebraChapters
  if (courseSlug === 'equations-mathematiques') return equationsChapters
  if (courseSlug === 'fonctions-mathematiques') return functionsChapters
  if (courseSlug === 'nlp') return nlpChapters
  if (courseSlug === 'probabilites') return probabilitesChapters
  return []
}

export function getChapter(courseSlug: string, lessonSlug: string) {
  if (courseSlug === 'deep-learning') return getDeepLearningChapter(lessonSlug)
  if (courseSlug === 'algebre-lineaire') return getLinearAlgebraChapter(lessonSlug)
  if (courseSlug === 'equations-mathematiques') return getEquationsChapter(lessonSlug)
  if (courseSlug === 'fonctions-mathematiques') return getFunctionsChapter(lessonSlug)
  if (courseSlug === 'nlp') return getNlpChapter(lessonSlug)
  if (courseSlug === 'probabilites') return getProbabilitesChapter(lessonSlug)
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
  if (courseSlug === 'equations-mathematiques') {
    const v = equationsViews[lessonSlug]
    if (v) return v
    const meta = getEquationsChapter(lessonSlug)
    if (meta?.comingSoon) return () => <EquationsComingSoon title={meta.title} />
    return null
  }
  if (courseSlug === 'fonctions-mathematiques') {
    const v = functionsViews[lessonSlug]
    if (v) return v
    const meta = getFunctionsChapter(lessonSlug)
    if (meta?.comingSoon) return () => <FunctionsComingSoon title={meta.title} />
    return null
  }
  if (courseSlug === 'nlp') {
    const v = nlpViews[lessonSlug]
    return v ?? null
  }
  if (courseSlug === 'probabilites') {
    const v = probabilitesViews[lessonSlug]
    return v ?? null
  }
  return null
}

export function getCourseFromPath(courseSlug: string) {
  return getCourseBySlug(courseSlug)
}
