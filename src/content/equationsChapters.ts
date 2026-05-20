import {
  Equal,
  HelpCircle,
  Scale,
  Plus,
  Divide,
  Brackets,
  Square,
  Sigma,
  Grid3x3,
  LineChart,
  FunctionSquare,
  Layers,
  ArrowRightLeft,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type EquationLevel = {
  id: number
  title: string
  subtitle: string
}

export const equationLevels: EquationLevel[] = [
  { id: 1, title: 'Partie I', subtitle: 'Les bases absolues' },
  { id: 2, title: 'Partie II', subtitle: 'Résolution d’équations simples' },
  { id: 3, title: 'Partie III', subtitle: 'Équations quadratiques' },
  { id: 4, title: 'Partie IV', subtitle: 'Systèmes d’équations' },
  { id: 5, title: 'Partie V', subtitle: 'Équations avancées (optionnel)' },
]

export const equationsChapters: (ChapterMeta & { level: number })[] = [
  { id: 'eq1', slug: 'qu-est-ce-une-equation', number: 1, level: 1, title: 'Qu’est-ce qu’une équation ?', description: 'Égalité, expressions, exemples du quotidien.', icon: Equal },
  { id: 'eq2', slug: 'inconnue-solution-egalite', number: 2, level: 1, title: 'Inconnue, solution, égalité', description: 'Vocabulaire essentiel et propriété fondamentale.', icon: HelpCircle },
  { id: 'eq3', slug: 'proprietes-fondamentales', number: 3, level: 1, title: 'Propriétés fondamentales', description: 'Isoler l’inconnue : +, −, ×, ÷, distributivité.', icon: Scale },
  { id: 'eq4', slug: 'premier-degre', number: 4, level: 2, title: 'Équations du 1er degré', description: 'ax + b = c, méthode en 2 étapes.', icon: Plus },
  { id: 'eq5', slug: 'equations-fractions', number: 5, level: 2, title: 'Équations avec fractions', description: 'Éliminer les dénominateurs (PPCM).', icon: Divide },
  { id: 'eq6', slug: 'parentheses-distributivite', number: 6, level: 2, title: 'Parenthèses & distributivité', description: 'Développer, réduire, isoler x.', icon: Brackets },
  { id: 'eq7', slug: 'second-degre', number: 7, level: 3, title: 'Équations du 2nd degré', description: 'Forme ax²+bx+c=0, factorisation, cas particuliers.', icon: Square },
  { id: 'eq8', slug: 'discriminant', number: 8, level: 3, title: 'Le discriminant Δ', description: 'Formule universelle et nombre de solutions.', icon: Sigma },
  { id: 'eq9', slug: 'factorisation-paraboles', number: 9, level: 3, title: 'Paraboles & bilan', description: 'Interprétation géométrique des solutions.', icon: LineChart },
  { id: 'eq10', slug: 'systemes-deux-equations', number: 10, level: 4, title: 'Systèmes 2×2', description: 'Définition et intuition géométrique.', icon: Grid3x3 },
  { id: 'eq11', slug: 'methodes-systemes', number: 11, level: 4, title: 'Substitution & combinaison', description: 'Résolution pas à pas, règle add/soustraire.', icon: ArrowRightLeft },
  { id: 'eq12', slug: 'systemes-geometrie', number: 12, level: 4, title: 'Types de systèmes & matrices', description: 'Compatibles, incompatibles, forme Ax = b.', icon: Layers },
  { id: 'eq13', slug: 'equations-polynomiales', number: 13, level: 5, title: 'Équations polynomiales', description: 'Au-delà du degré 2 (aperçu).', icon: FunctionSquare, comingSoon: true },
  { id: 'eq14', slug: 'equations-fonctionnelles', number: 14, level: 5, title: 'Équations fonctionnelles', description: 'Introduction légère.', icon: FunctionSquare, comingSoon: true },
  { id: 'eq15', slug: 'equations-matricielles', number: 15, level: 5, title: 'Équations matricielles', description: 'Ax = b — pont vers l’algèbre linéaire.', icon: Grid3x3, comingSoon: true },
]

export function getEquationsChapter(slug: string) {
  return equationsChapters.find((c) => c.slug === slug)
}

export function equationsChaptersByLevel(level: number) {
  return equationsChapters.filter((c) => c.level === level)
}
