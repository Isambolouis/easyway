import { ImageIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const COMPUTER_VISION_SLUG = 'computer-vision'

export type SubCourseMeta = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  available: boolean
}

export const computerVisionSubCourses: SubCourseMeta[] = [
  {
    id: 'cv-images',
    slug: 'images',
    title: 'Images numériques',
    subtitle: 'Compréhension et manipulation',
    description:
      'Du pixel à la CNN : fondements mathématiques, filtrage, segmentation, vision 3D, OpenCV et deep learning visuel.',
    icon: ImageIcon,
    available: true,
  },
]

export function getSubCourse(slug: string) {
  return computerVisionSubCourses.find((s) => s.slug === slug)
}

export function subCourseBasePath(subSlug: string) {
  return `/cours/${COMPUTER_VISION_SLUG}/${subSlug}`
}

export const computerVisionParentDescription =
  'Parcours modulaire : traitement d’image, vision par ordinateur et intelligence artificielle visuelle — commence par le sous-cours Images.'
