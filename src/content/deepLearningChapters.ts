import {
  Brain,
  Cpu,
  GitBranch,
  Layers,
  LineChart,
  Microscope,
  Network,
  Sparkles,
  Zap,
  BookOpen,
  Scale,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export const deepLearningChapters: ChapterMeta[] = [
  { id: 's1', slug: 'introduction', number: 1, title: 'Introduction au Deep Learning', description: 'IA, machine learning, deep learning et métaphore du cerveau artificiel.', icon: Sparkles },
  { id: 's2', slug: 'traitement-information', number: 2, title: 'Traitement de l’information', description: 'Chaîne sensorielle → décision → action et perception multimodale.', icon: Zap },
  { id: 's3', slug: 'cerveau-biologique', number: 3, title: 'Architecture du cerveau biologique', description: 'Cortex, lobes, structures limbiques et rôles fonctionnels.', icon: Brain },
  { id: 's4', slug: 'neurone-biologique', number: 4, title: 'Le neurone biologique', description: 'Dendrites, axone, synapses et potentiels d’action.', icon: Microscope },
  { id: 's5', slug: 'transition', number: 5, title: 'Vers le cerveau artificiel', description: 'Inspiration scientifique et tableau comparatif.', icon: GitBranch },
  { id: 's6', slug: 'reseau-neuronal', number: 6, title: 'Architecture d’un réseau', description: 'Couches, flux de données et apprentissage.', icon: Network },
  { id: 's7', slug: 'neurone-artificiel', number: 7, title: 'Le neurone artificiel', description: 'Poids, biais, somme pondérée et activation.', icon: Cpu },
  { id: 's8', slug: 'mathematiques', number: 8, title: 'Mathématiques & statistiques', description: 'Matrices, gradients, pertes et rétropropagation.', icon: LineChart },
  { id: 's9', slug: 'apprentissage', number: 9, title: 'Apprentissage & applications', description: 'Vision, langage, exemples concrets et limites.', icon: Layers },
  { id: 's10', slug: 'comparaison', number: 10, title: 'Biologique vs artificiel', description: 'Synthèse comparative sur huit critères.', icon: Scale },
  { id: 's11', slug: 'conclusion', number: 11, title: 'Conclusion', description: 'Limites, IAG et ouverture philosophique.', icon: BookOpen },
]

export function getDeepLearningChapter(slug: string) {
  return deepLearningChapters.find((c) => c.slug === slug)
}
