import {
  Dice5,
  Layers,
  Scale,
  GitBranch,
  Sparkles,
  BarChart3,
  LineChart,
  Bell,
  Workflow,
  Waves,
  Cpu,
  Brain,
  Network,
  BookCheck,
  FolderKanban,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type ProbabilitesLevel = {
  id: number
  title: string
  subtitle: string
}

export const probabilitesLevels: ProbabilitesLevel[] = [
  { id: 1, title: 'Partie I', subtitle: 'Fondements mathématiques' },
  { id: 2, title: 'Partie II', subtitle: 'Calcul des probabilités' },
  { id: 3, title: 'Partie III', subtitle: 'Variables aléatoires discrètes' },
  { id: 4, title: 'Partie IV', subtitle: 'Variables continues & statistiques' },
  { id: 5, title: 'Partie V', subtitle: 'Probabilités avancées' },
  { id: 6, title: 'Partie VI', subtitle: 'Informatique & IA' },
  { id: 7, title: 'Partie VII', subtitle: 'Projet & exercices' },
]

export const probabilitesChapters: (ChapterMeta & { level: number })[] = [
  {
    id: 'prob1',
    slug: 'introduction-probabilites',
    number: 1,
    level: 1,
    title: 'Introduction aux probabilités',
    description: 'Définition, historique, univers, événements et vocabulaire.',
    icon: Dice5,
  },
  {
    id: 'prob2',
    slug: 'ensembles-combinatoire',
    number: 2,
    level: 1,
    title: 'Analyse combinatoire',
    description: 'Dénombrement, factorielle, permutations, arrangements, combinaisons.',
    icon: Layers,
  },
  {
    id: 'prob3',
    slug: 'probabilite-classique',
    number: 3,
    level: 2,
    title: 'Probabilité classique',
    description: 'Formule favorables/possibles, propriétés, complémentaire et union.',
    icon: Scale,
  },
  {
    id: 'prob4',
    slug: 'probabilite-conditionnelle',
    number: 4,
    level: 2,
    title: 'Probabilité conditionnelle',
    description: 'P(A|B), multiplication, indépendance — IA, spam, diagnostic.',
    icon: GitBranch,
  },
  {
    id: 'prob5',
    slug: 'theoreme-bayes',
    number: 5,
    level: 2,
    title: 'Théorème de Bayes',
    description: 'Inversion conditionnelle, exemple médical, Naive Bayes, exercices examen.',
    icon: Sparkles,
  },
  {
    id: 'prob6',
    slug: 'variables-aleatoires-discretes',
    number: 6,
    level: 3,
    title: 'Variables aléatoires discrètes',
    description: 'Loi, table de loi, espérance, variance, écart-type, applications IA.',
    icon: BarChart3,
  },
  {
    id: 'prob7',
    slug: 'lois-discretes',
    number: 7,
    level: 3,
    title: 'Lois de probabilité discrètes',
    description: 'Bernoulli, binomiale, géométrique, Poisson, comparaison et exercice examen.',
    icon: LineChart,
  },
  {
    id: 'prob8',
    slug: 'variables-aleatoires-continues',
    number: 8,
    level: 4,
    title: 'Variables aléatoires continues',
    description: 'Densité, uniforme, normale, Z-score, exponentielle et exercices examen.',
    icon: Bell,
  },
  {
    id: 'prob9',
    slug: 'loi-normale',
    number: 9,
    level: 4,
    title: 'Loi normale',
    description: 'Densité, règle 68-95-99,7, Z-score, exercices examen et applications IA.',
    icon: Bell,
  },
  {
    id: 'prob10',
    slug: 'chaines-markov',
    number: 10,
    level: 5,
    title: 'Chaînes de Markov',
    description: 'Propriété de Markov, matrice P, NLP, PageRank et exercices examen.',
    icon: Workflow,
  },
  {
    id: 'prob11',
    slug: 'processus-stochastiques',
    number: 11,
    level: 5,
    title: 'Processus stochastiques',
    description: 'Marche aléatoire, Poisson, Markov, exercices avancés et IA.',
    icon: Waves,
  },
  {
    id: 'prob12',
    slug: 'simulation-monte-carlo',
    number: 12,
    level: 5,
    title: 'Simulation et méthodes numériques',
    description: 'Monte Carlo, π, intégrales, accuracy IA, erreur 1/√n et exercices concours.',
    icon: Cpu,
  },
  {
    id: 'prob13',
    slug: 'probabilites-machine-learning',
    number: 13,
    level: 6,
    title: 'Inférence bayésienne avancée',
    description: 'Prior, likelihood, posterior, MAP/MLE, spam et exercice examen.',
    icon: Brain,
  },
  {
    id: 'prob14',
    slug: 'inference-variationnelle',
    number: 14,
    level: 6,
    title: 'Inférence variationnelle',
    description: 'KL, ELBO, approximation q(θ), VAE et IA générative.',
    icon: Network,
  },
  {
    id: 'prob15',
    slug: 'exercices-probabilites',
    number: 15,
    level: 7,
    title: 'Exercices corrigés',
    description: 'Sujet examen final probabilités + IA (7 exercices) et rappels.',
    icon: BookCheck,
  },
  {
    id: 'prob16',
    slug: 'projet-final-probabilites',
    number: 16,
    level: 7,
    title: 'Projet final',
    description: 'Analyse de données, mini-IA probabiliste et Monte-Carlo.',
    icon: FolderKanban,
  },
]

export function getProbabilitesChapter(slug: string) {
  return probabilitesChapters.find((c) => c.slug === slug)
}

export function probabilitesChaptersByLevel(level: number) {
  return probabilitesChapters.filter((c) => c.level === level)
}
