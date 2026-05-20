import { Brain, Sigma } from 'lucide-react'
import type { CourseMeta } from '@/types/course'

export const courses: CourseMeta[] = [
  {
    id: 'deep-learning',
    slug: 'deep-learning',
    title: 'Introduction au Deep Learning',
    subtitle: 'Le cerveau artificiel',
    description:
      'Du cerveau biologique aux réseaux de neurones : cours visuel avec démos, quiz et export PDF.',
    accent: 'teal',
    chapterLabel: 'Chapitre',
    basePath: '/cours/deep-learning',
  },
  {
    id: 'algebre-lineaire',
    slug: 'algebre-lineaire',
    title: 'Algèbre linéaire',
    subtitle: 'Fondations pour la vision & le ML',
    description:
      'Vecteurs, matrices, transformations et SVD — le cœur mathématique du deep learning, pas à pas.',
    accent: 'violet',
    chapterLabel: 'Leçon',
    basePath: '/cours/algebre-lineaire',
  },
]

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug)
}

export const courseIcons: Record<string, typeof Brain> = {
  'deep-learning': Brain,
  'algebre-lineaire': Sigma,
}
