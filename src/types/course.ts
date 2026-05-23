import type { LucideIcon } from 'lucide-react'

export type ChapterMeta = {
  id: string
  slug: string
  number: number
  title: string
  description: string
  icon: LucideIcon
  comingSoon?: boolean
}

export type CourseMeta = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  accent: 'teal' | 'violet' | 'amber' | 'rose' | 'indigo'
  chapterLabel: string
  basePath: string
}
