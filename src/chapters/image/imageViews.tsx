import type { ReactNode } from 'react'
import { ImageChapterView } from '@/components/image/ImageChapterView'
import { getImageChapterContentFromPlan } from '@/content/image/planToChapterContent'
import { ImageIntroView } from '@/chapters/image/imageIntro'
import { ImageCh1NaturePixelView } from '@/chapters/image/imageCh1NaturePixel'

function chapterView(slug: string): () => ReactNode {
  return () => {
    const content = getImageChapterContentFromPlan(slug)
    if (!content) return null
    return <ImageChapterView content={content} />
  }
}

const slugs = [
  'nature-image-pixel',
  'algebre-lineaire-images',
  'statistiques-images',
  'manipulation-pixel',
  'transformations-geometriques',
  'filtres-spatiaux',
  'domaine-frequentiel',
  'segmentation-image',
  'detection-caracteristiques',
  'reconnaissance-objets',
  'vision-3d',
  'deep-learning-visuel-intro',
  'reseaux-convolutifs-cnn',
  'segmentation-detection-avancees',
  'generation-restauration',
  'applications-modernes',
  'opencv-complet',
  'projet-final-vision',
  'theorie-mathematique-avancee',
] as const

export const imageViews: Record<string, () => ReactNode> = {
  introduction: () => <ImageIntroView />,
  'nature-image-pixel': () => <ImageCh1NaturePixelView />,
  ...Object.fromEntries(
    slugs.filter((slug) => slug !== 'nature-image-pixel').map((slug) => [slug, chapterView(slug)]),
  ),
}
