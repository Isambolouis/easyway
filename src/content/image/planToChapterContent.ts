import type { ImageChapterContent, ImageSection } from '@/content/image/imageChapterTypes'
import { imageSectionExplanations } from '@/content/image/imageChapterExplanations'
import { imageCoursePlanParts, type ImagePlanChapter, type ImagePlanSection } from '@/content/image/imageCoursePlanData'

function planSectionToContent(sec: ImagePlanSection): ImageSection {
  const explanations = imageSectionExplanations[sec.id]
  return {
    id: sec.id,
    title: sec.title,
    intro: sec.intro,
    bullets: sec.bullets,
    math: sec.math,
    mathAfter: sec.mathAfter,
    reading: sec.reading,
    paragraphs: explanations,
    callout:
      sec.id === '1.3'
        ? {
            variant: 'definition',
            title: 'Lecture',
            body: 'La matrice est la structure de données centrale de tout le traitement d’image : filtres, IA et vision reposent sur ces nombres.',
          }
        : undefined,
  }
}

function chapterToContent(ch: ImagePlanChapter, partTitle: string): ImageChapterContent {
  return {
    partTitle,
    lead: `Chapitre ${ch.number} — ${ch.title}. Chaque section reprend le plan du cours ; les puces sont celles du syllabus, suivies d’explications pour approfondir.`,
    sections: ch.sections.map((s) => planSectionToContent(s)),
  }
}

const slugToChapter = new Map<string, { ch: ImagePlanChapter; partTitle: string }>()
for (const part of imageCoursePlanParts) {
  for (const ch of part.chapters) {
    slugToChapter.set(ch.slug, { ch, partTitle: part.title })
  }
}

export function getImageChapterContentFromPlan(slug: string): ImageChapterContent | null {
  const entry = slugToChapter.get(slug)
  if (!entry) return null
  return chapterToContent(entry.ch, entry.partTitle)
}

export function getAllImageChapterSlugsFromPlan(): string[] {
  return [...slugToChapter.keys()]
}
