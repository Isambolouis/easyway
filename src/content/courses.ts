import { Brain, Sigma, Equal, FunctionSquare, MessageSquare, Dice5, ChartColumn } from 'lucide-react'
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
  {
    id: 'equations-mathematiques',
    slug: 'equations-mathematiques',
    title: 'Équations mathématiques',
    subtitle: 'De A à Z — bases solides',
    description:
      'Équations, inconnues, premier degré, quadratiques et systèmes — progressif et illustré, pour maîtriser l’algèbre.',
    accent: 'amber',
    chapterLabel: 'Leçon',
    basePath: '/cours/equations-mathematiques',
  },
  {
    id: 'fonctions-mathematiques',
    slug: 'fonctions-mathematiques',
    title: 'Fonctions mathématiques',
    subtitle: 'Du concept aux applications',
    description:
      'Définition, domaine, graphiques, fonctions classiques, composition et applications en IA — cours progressif.',
    accent: 'rose',
    chapterLabel: 'Leçon',
    basePath: '/cours/fonctions-mathematiques',
  },
  {
    id: 'nlp',
    slug: 'nlp',
    title: 'Traitement Automatique du Langage Naturel',
    subtitle: 'NLP — Master 1 IA / Data Science',
    description:
      'Du texte brut aux Transformers et LLMs : prétraitement, embeddings, deep learning, tâches avancées et projet.',
    accent: 'indigo',
    chapterLabel: 'Chapitre',
    basePath: '/cours/nlp',
  },
  {
    id: 'probabilites',
    slug: 'probabilites',
    title: 'Probabilités',
    subtitle: 'Fondements, statistiques & IA',
    description:
      'Du dénombrement à Bayes, lois discrètes et normale, Markov et Monte-Carlo — jusqu’au machine learning et deep learning probabiliste.',
    accent: 'emerald',
    chapterLabel: 'Chapitre',
    basePath: '/cours/probabilites',
  },
  {
    id: 'statistique-descriptive',
    slug: 'statistique-descriptive',
    title: 'Statistique descriptive',
    subtitle: 'Organiser, résumer et visualiser les données',
    description:
      'Types de données, tableaux et fréquences, graphiques modernes, tendance centrale, dispersion, quartiles, boxplot, corrélation et applications — cours universitaire progressif.',
    accent: 'sky',
    chapterLabel: 'Chapitre',
    basePath: '/cours/statistique-descriptive',
  },
]

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug)
}

export const courseIcons: Record<string, typeof Brain> = {
  'deep-learning': Brain,
  'algebre-lineaire': Sigma,
  'equations-mathematiques': Equal,
  'fonctions-mathematiques': FunctionSquare,
  nlp: MessageSquare,
  probabilites: Dice5,
  'statistique-descriptive': ChartColumn,
}
