import {
  ArrowRightLeft,
  Box,
  Grid3x3,
  Layers,
  LineChart,
  Move3d,
  RotateCw,
  Sigma,
  Sparkles,
  Split,
  Target,
  TrendingUp,
  VectorSquare,
  GitMerge,
  Scan,
  Boxes,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type AlgebraLevel = {
  id: number
  title: string
  subtitle: string
}

export const algebraLevels: AlgebraLevel[] = [
  { id: 1, title: 'Fondations', subtitle: 'Vecteurs & espaces' },
  { id: 2, title: 'Matrices', subtitle: 'Opérations & systèmes' },
  { id: 3, title: 'Géométrie', subtitle: 'Projections & transformations' },
  { id: 4, title: 'Décompositions', subtitle: 'Valeurs propres, SVD, PCA' },
]

export const linearAlgebraChapters: (ChapterMeta & { level: number })[] = [
  { id: 'al1', slug: 'introduction-vecteurs', number: 1, level: 1, title: 'Introduction aux vecteurs', description: 'Direction, norme, opérations et produit scalaire.', icon: VectorSquare },
  { id: 'al2', slug: 'espace-vectoriel', number: 2, level: 1, title: 'Espaces vectoriels & combinaisons linéaires', description: 'Combinaisons linéaires, span et intuition en ℝⁿ.', icon: Box },
  { id: 'al3', slug: 'base-dimension', number: 3, level: 1, title: 'Base et dimension', description: 'Indépendance linéaire, bases canoniques et dimension.', icon: Layers },
  { id: 'al4', slug: 'matrices-definition', number: 4, level: 2, title: 'Introduction aux matrices', description: 'Notation, types, opérations et transformations.', icon: Grid3x3 },
  { id: 'al5', slug: 'operations-matrices', number: 5, level: 2, title: 'Opérations fondamentales sur les matrices', description: 'Transposée, inverse, déterminant, rang, trace, puissances.', icon: Split },
  { id: 'al6', slug: 'determinant-applications', number: 6, level: 2, title: 'Le déterminant et ses applications', description: 'Calcul 2×2 et 3×3, géométrie et vision par ordinateur.', icon: Sigma },
  { id: 'al7', slug: 'systemes-lineaires', number: 7, level: 2, title: 'Systèmes linéaires', description: 'Ax = b, résolution par l’inverse, cas particuliers et vision.', icon: Scan },
  { id: 'al8', slug: 'produit-scalaire-vectoriel', number: 8, level: 3, title: 'Produit scalaire et orthogonalité', description: 'Dot product, angles, cosine similarity et applications vision.', icon: Target },
  { id: 'al9', slug: 'projections', number: 9, level: 3, title: 'Projection orthogonale', description: 'Proj sur vecteur, matrices P, PCA et vision.', icon: Scan },
  { id: 'al10', slug: 'multiplication-matrices', number: 10, level: 2, title: 'Multiplication & transformations', description: 'Produit matriciel et applications linéaires.', icon: GitMerge, comingSoon: true },
  { id: 'al11', slug: 'inverse-transposee', number: 11, level: 2, title: 'Inverse & transposée (approfondissement)', description: 'Propriétés avancées et cas particuliers.', icon: ArrowRightLeft, comingSoon: true },
  { id: 'al12', slug: 'rotations-base', number: 12, level: 3, title: 'Rotations & changement de base', description: 'Matrices de rotation et repères.', icon: RotateCw, comingSoon: true },
  { id: 'al13', slug: 'vision-transformations', number: 13, level: 3, title: 'Vision par ordinateur', description: 'Homographies, 3D → 2D, images.', icon: Move3d, comingSoon: true },
  { id: 'al14', slug: 'valeurs-propres', number: 14, level: 4, title: 'Valeurs & vecteurs propres', description: 'Diagonalisation et interprétation.', icon: Sparkles, comingSoon: true },
  { id: 'al15', slug: 'svd', number: 15, level: 4, title: 'Décomposition SVD', description: 'Singular Value Decomposition.', icon: Boxes, comingSoon: true },
  { id: 'al16', slug: 'pca', number: 16, level: 4, title: 'PCA', description: 'Réduction de dimension.', icon: TrendingUp, comingSoon: true },
  { id: 'al17', slug: 'applications-ia', number: 17, level: 4, title: 'Applications IA & vision', description: 'Cas pratiques en machine learning.', icon: LineChart, comingSoon: true },
]

export function getLinearAlgebraChapter(slug: string) {
  return linearAlgebraChapters.find((c) => c.slug === slug)
}

export function chaptersByLevel(level: number) {
  return linearAlgebraChapters.filter((c) => c.level === level)
}
