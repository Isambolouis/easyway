import {
  FunctionSquare,
  HelpCircle,
  Globe,
  LineChart,
  Minus,
  TrendingUp,
  Square,
  Divide,
  ArrowDownUp,
  Zap,
  Activity,
  Target,
  GitMerge,
  FlipHorizontal,
  Cpu,
  Dumbbell,
  BookOpen,
  Infinity,
  Sigma,
  Code2,
  Sparkles,
  ClipboardList,
  Calculator,
  ListChecks,
  Search,
  BarChart3,
  ArrowUpDown,
  Shapes,
  Workflow,
  Brain,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type FunctionLevel = {
  id: number
  title: string
  subtitle: string
}

export const functionLevels: FunctionLevel[] = [
  { id: 1, title: 'Partie I', subtitle: 'Fondements' },
  { id: 2, title: 'Partie II', subtitle: 'Types de fonctions classiques' },
  { id: 3, title: 'Partie III', subtitle: 'Comportement & outils' },
  { id: 4, title: 'Partie IV', subtitle: 'Symétrie, applications & bilan' },
  { id: 5, title: 'Partie V', subtitle: 'Étude complète pas à pas' },
  { id: 6, title: 'Partie VI', subtitle: 'Limites, continuité & dérivées' },
  { id: 7, title: 'Partie VII', subtitle: 'Approfondissements (à venir)' },
]

export const functionsChapters: (ChapterMeta & { level: number })[] = [
  { id: 'fn1', slug: 'introduction-fonctions', number: 1, level: 1, title: 'Qu’est-ce qu’une fonction ?', description: 'Règle, machine, f(x)=x+2 et premiers calculs.', icon: FunctionSquare },
  { id: 'fn2', slug: 'vocabulaire-fonctions', number: 2, level: 1, title: 'Vocabulaire essentiel', description: 'Variable, image, antécédent, notation f : x ↦ …', icon: HelpCircle },
  { id: 'fn3', slug: 'domaine-definition', number: 3, level: 1, title: 'Domaine de définition', description: 'Ensemble des x admissibles, exclusions (division, racine).', icon: Globe },
  { id: 'fn4', slug: 'representation-graphique-affine', number: 4, level: 1, title: 'Graphique & fonction affine', description: 'y=f(x), tableau de valeurs, f(x)=ax+b.', icon: LineChart },
  { id: 'fn5', slug: 'constante-lineaire', number: 5, level: 2, title: 'Constante & linéaire', description: 'f(x)=k et f(x)=ax, droites horizontales et par l’origine.', icon: Minus },
  { id: 'fn6', slug: 'quadratique', number: 6, level: 2, title: 'Fonction quadratique', description: 'ax²+bx+c, parabole, symétrie autour de 0.', icon: Square },
  { id: 'fn7', slug: 'racine-valeur-absolue', number: 7, level: 2, title: 'Racine & valeur absolue', description: '√x, |x|, domaines et interprétation distance.', icon: Target },
  { id: 'fn8', slug: 'inverse', number: 8, level: 2, title: 'Fonction inverse', description: '1/x, asymptotes, deux branches.', icon: Divide },
  { id: 'fn9', slug: 'exponentielle-logarithme', number: 9, level: 2, title: 'Exponentielle & logarithme', description: 'e^x, ln(x), croissance et inverse.', icon: TrendingUp },
  { id: 'fn10', slug: 'trigonometrie', number: 10, level: 2, title: 'Sinus & cosinus', description: 'Ondes, rotations, animations et jeux.', icon: Activity },
  { id: 'fn11', slug: 'croissance-decroissance', number: 11, level: 3, title: 'Croissance & décroissance', description: 'Monotonie, exemple x² avant et après 0.', icon: ArrowDownUp },
  { id: 'fn12', slug: 'extrema', number: 12, level: 3, title: 'Maximum & minimum', description: 'Points les plus hauts ou bas sur un intervalle.', icon: Zap },
  { id: 'fn13', slug: 'resolution-graphique', number: 13, level: 3, title: 'Résolution graphique', description: 'f(x)=0, intersections avec l’axe des x.', icon: Target },
  { id: 'fn14', slug: 'composition-fonctions', number: 14, level: 3, title: 'Composition de fonctions', description: '(f∘g)(x)=f(g(x)), enchaînement de règles.', icon: GitMerge },
  { id: 'fn15', slug: 'paires-impaires', number: 15, level: 4, title: 'Fonctions paires & impaires', description: 'Symétries f(-x)=f(x) et f(-x)=-f(x).', icon: FlipHorizontal },
  { id: 'fn16', slug: 'applications', number: 16, level: 4, title: 'Applications concrètes', description: 'IA, data science, jeux, physique, graphisme.', icon: Cpu },
  { id: 'fn17', slug: 'exercices-bilan', number: 17, level: 4, title: 'Exercices & résumé', description: 'Entraînement progressif et bilan du cours.', icon: Dumbbell },
  { id: 'fn18', slug: 'etude-complete-methode', number: 18, level: 5, title: 'Étude complète — méthode', description: 'Les 6 étapes pour comprendre une fonction.', icon: ClipboardList },
  { id: 'fn19', slug: 'domaine-approfondi', number: 19, level: 5, title: 'Domaine (approfondi)', description: 'Division, racine carrée, exemples guidés.', icon: Globe },
  { id: 'fn20', slug: 'images-tableau-valeurs', number: 20, level: 5, title: 'Images & tableau de valeurs', description: 'Calculer f(a), construire un tableau.', icon: Calculator },
  { id: 'fn21', slug: 'zeros-fonction', number: 21, level: 5, title: 'Zéros d’une fonction', description: 'Résoudre f(x)=0, interprétation graphique.', icon: Search },
  { id: 'fn22', slug: 'signe-tableau', number: 22, level: 5, title: 'Signe & tableau de signe', description: 'Positif, négatif, nul — méthode systématique.', icon: ListChecks },
  { id: 'fn23', slug: 'variations-monotonie', number: 23, level: 5, title: 'Croissante & décroissante', description: 'Monotonie intuitive, exemples y=x et y=−x.', icon: ArrowUpDown },
  { id: 'fn24', slug: 'paraboles-sommet', number: 24, level: 5, title: 'Paraboles & sommet', description: 'ax²+bx+c, axe de symétrie x=−b/(2a).', icon: Shapes },
  { id: 'fn25', slug: 'etude-complete-exemple', number: 25, level: 5, title: 'Exemple complet', description: 'Étude de f(x)=x²−4x+3 de A à Z.', icon: BarChart3 },
  { id: 'fn26', slug: 'composee-reciproque', number: 26, level: 5, title: 'Composée & réciproque', description: 'f∘g et f⁻¹(x), sens des opérations.', icon: Workflow },
  { id: 'fn27', slug: 'applications-informatique', number: 27, level: 5, title: 'Applications informatique', description: 'IA, jeux, graphiques — sigmoid, ReLU…', icon: Brain },
  { id: 'fn28', slug: 'exercices-etude-bilan', number: 28, level: 5, title: 'Exercices & bilan final', description: 'Entraînement et synthèse avant le calcul.', icon: Dumbbell },
  { id: 'fn29', slug: 'introduction-limites', number: 29, level: 6, title: 'Introduction aux limites', description: 'Idée intuitive, notation lim_{x→a} f(x).', icon: Infinity },
  { id: 'fn30', slug: 'limites-gauche-droite', number: 30, level: 6, title: 'Limites à gauche & à droite', description: 'Exemple 1/x en 0, quand la limite n’existe pas.', icon: Divide },
  { id: 'fn31', slug: 'limites-infinies-asymptotes', number: 31, level: 6, title: 'Limites à l’infini & asymptotes', description: 'x², 1/x, asymptotes verticale et horizontale.', icon: TrendingUp },
  { id: 'fn32', slug: 'formes-indeterminees-continuite', number: 32, level: 6, title: '0/0 & continuité', description: 'Factorisation, fonction continue ou non.', icon: ListChecks },
  { id: 'fn33', slug: 'introduction-derivees', number: 33, level: 6, title: 'Introduction aux dérivées', description: 'Pente, tangente, règle x^n, f\'(x)=2x.', icon: Sigma },
  { id: 'fn34', slug: 'exercices-limites-derivees', number: 34, level: 6, title: 'Exercices limites & dérivées', description: 'Entraînement et bilan — pont vers l’IA.', icon: Dumbbell },
  { id: 'fn35', slug: 'derivees-avancees', number: 35, level: 7, title: 'Dérivées avancées', description: 'Tableaux de variations, règles composées.', icon: Sigma, comingSoon: true },
  { id: 'fn36', slug: 'integrales', number: 36, level: 7, title: 'Intégrales', description: 'Aire sous la courbe, primitives.', icon: BookOpen, comingSoon: true },
  { id: 'fn37', slug: 'optimisation-ia', number: 37, level: 7, title: 'Optimisation & IA', description: 'Descente de gradient, fonctions de coût.', icon: Sparkles, comingSoon: true },
  { id: 'fn38', slug: 'equations-differentielles', number: 38, level: 7, title: 'Équations différentielles', description: 'Modèles dynamiques et ML.', icon: Code2, comingSoon: true },
]

export function getFunctionsChapter(slug: string) {
  return functionsChapters.find((c) => c.slug === slug)
}

export function functionsChaptersByLevel(level: number) {
  return functionsChapters.filter((c) => c.level === level)
}
