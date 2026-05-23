import {
  BarChart3,
  BookOpen,
  Box,
  Calculator,
  ChartPie,
  Layers,
  LineChart,
  ScatterChart,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  FlaskConical,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type StatistiqueLevel = {
  id: number
  title: string
  subtitle: string
}

export const statistiqueLevels: StatistiqueLevel[] = [
  { id: 1, title: 'Partie I', subtitle: 'Fondements & organisation' },
  { id: 2, title: 'Partie II', subtitle: 'Mesures descriptives' },
  { id: 3, title: 'Partie III', subtitle: 'Relations & séries' },
  { id: 4, title: 'Partie IV', subtitle: 'Synthèse & applications' },
]

export const statistiqueDescriptiveChapters: (ChapterMeta & { level: number })[] = [
  {
    id: 'stat0',
    slug: 'introduction-statistique-descriptive',
    number: 0,
    level: 1,
    title: 'Introduction générale',
    description: 'Descriptive vs inférentielle, types de données, population et échantillon.',
    icon: BookOpen,
  },
  {
    id: 'stat1',
    slug: 'organisation-des-donnees',
    number: 1,
    level: 1,
    title: 'Organisation des données',
    description: 'Tableaux, effectifs, fréquences relatives et cumulées.',
    icon: Table2,
  },
  {
    id: 'stat2',
    slug: 'representations-graphiques',
    number: 2,
    level: 1,
    title: 'Représentations graphiques',
    description: 'Bâtons, histogramme, camembert et ogive.',
    icon: ChartPie,
  },
  {
    id: 'stat3',
    slug: 'tendance-centrale',
    number: 3,
    level: 2,
    title: 'Mesures de tendance centrale',
    description: 'Moyenne, médiane et mode.',
    icon: Target,
  },
  {
    id: 'stat4',
    slug: 'mesures-dispersion',
    number: 4,
    level: 2,
    title: 'Mesures de dispersion',
    description: 'Étendue, variance et écart-type.',
    icon: BarChart3,
  },
  {
    id: 'stat5',
    slug: 'position-relative',
    number: 5,
    level: 2,
    title: 'Position relative',
    description: 'Quartiles, déciles et percentiles.',
    icon: Layers,
  },
  {
    id: 'stat6',
    slug: 'boite-a-moustaches',
    number: 6,
    level: 2,
    title: 'Boîte à moustaches',
    description: 'Construction, lecture et valeurs aberrantes.',
    icon: Box,
  },
  {
    id: 'stat7',
    slug: 'correlation-variables',
    number: 7,
    level: 3,
    title: 'Corrélation',
    description: 'Nuage de points, covariance et coefficient r.',
    icon: ScatterChart,
  },
  {
    id: 'stat8',
    slug: 'series-statistiques',
    number: 8,
    level: 3,
    title: 'Séries statistiques',
    description: 'Séries simples, classes et centres.',
    icon: LineChart,
  },
  {
    id: 'stat9',
    slug: 'interpretation-statistique',
    number: 9,
    level: 4,
    title: 'Interprétation statistique',
    description: 'Tendances, conclusions et décision.',
    icon: TrendingUp,
  },
  {
    id: 'stat10',
    slug: 'applications-pratiques',
    number: 10,
    level: 4,
    title: 'Applications pratiques',
    description: 'EDA, économie, IA et cas magasin — synthèse du cours.',
    icon: Calculator,
  },
  {
    id: 'stat11',
    slug: 'bonus-standardisation',
    number: 11,
    level: 4,
    title: 'Bonus — standardisation',
    description: 'Z-score, intro à la loi normale.',
    icon: Sparkles,
  },
  {
    id: 'stat12',
    slug: 'projet-performances-classe',
    number: 12,
    level: 4,
    title: 'Projet — performances classe',
    description: 'EDA complète : notes, corrélation, élèves à risque.',
    icon: FlaskConical,
  },
]

export function getStatistiqueChapter(slug: string) {
  return statistiqueDescriptiveChapters.find((c) => c.slug === slug)
}

export function statistiqueChaptersByLevel(level: number) {
  return statistiqueDescriptiveChapters.filter((c) => c.level === level)
}
