import {
  MessageSquare,
  Languages,
  Filter,
  Sigma,
  Brain,
  Layers,
  Network,
  Sparkles,
  Bot,
  Code2,
  BookOpen,
} from 'lucide-react'
import type { ChapterMeta } from '@/types/course'

export type NlpLevel = {
  id: number
  title: string
  subtitle: string
}

export const nlpLevels: NlpLevel[] = [
  { id: 1, title: 'Chapitre I', subtitle: 'Introduction au NLP' },
  { id: 2, title: 'Chapitre II', subtitle: 'Fondements linguistiques' },
  { id: 3, title: 'Chapitre III', subtitle: 'Prétraitement des textes' },
  { id: 4, title: 'Chapitre IV', subtitle: 'Modélisation probabiliste' },
  { id: 5, title: 'Chapitre V', subtitle: 'Word Embeddings' },
  { id: 6, title: 'Chapitre VI', subtitle: 'Deep Learning' },
  { id: 7, title: 'Chapitre VII', subtitle: 'LLMs & architectures modernes' },
  { id: 8, title: 'Chapitre VIII', subtitle: 'Tâches avancées' },
  { id: 9, title: 'Chapitre IX', subtitle: 'Implémentation Python' },
  { id: 10, title: 'Chapitre X', subtitle: 'Machine Learning' },
  { id: 11, title: 'Annexes', subtitle: 'Outils, évaluation & références' },
]

export const nlpChapters: (ChapterMeta & { level: number })[] = [
  { id: 'nlp1', slug: 'introduction-nlp', number: 1, level: 1, title: 'Introduction au NLP', description: 'Définition, histoire, applications et défis.', icon: MessageSquare },
  { id: 'nlp2', slug: 'fondements-linguistiques', number: 2, level: 2, title: 'Fondements linguistiques', description: 'Morphologie, syntaxe, sémantique, pragmatique.', icon: Languages },
  { id: 'nlp3', slug: 'preprocessing-texte', number: 3, level: 3, title: 'Prétraitement des textes', description: 'Nettoyage, tokenisation, stop words, pipeline.', icon: Filter },
  { id: 'nlp4', slug: 'modelisation-probabiliste', number: 4, level: 4, title: 'Modélisation probabiliste', description: 'Chaîne de Markov, n-grams, Bayes, Naive Bayes, perplexité.', icon: Sigma },
  { id: 'nlp5', slug: 'word-embeddings', number: 5, level: 5, title: 'Représentation vectorielle & Embeddings', description: 'One-Hot, Word2Vec, GloVe, FastText, similarité cosinus.', icon: Layers },
  { id: 'nlp6', slug: 'deep-learning-nlp', number: 6, level: 6, title: 'Deep Learning pour le NLP', description: 'RNN, LSTM, GRU, attention, Transformers, BERT, GPT.', icon: Network },
  { id: 'nlp7', slug: 'llm-ia-generative', number: 7, level: 7, title: 'LLMs & architectures modernes', description: 'Self-Attention, fine-tuning, RLHF, prompt engineering, agents.', icon: Sparkles },
  { id: 'nlp8', slug: 'taches-avancees-nlp', number: 8, level: 8, title: 'Applications avancées du NLP', description: 'Sentiments, NER, traduction, résumé, QA, ASR, TTS, multimodal.', icon: Bot },
  { id: 'nlp9', slug: 'tp-projets-nlp', number: 9, level: 9, title: 'Implémentation pratique & TP', description: 'NLTK, spaCy, PyTorch, Transformers, pipelines et projet final.', icon: Code2 },
  { id: 'nlp10', slug: 'machine-learning-nlp', number: 10, level: 10, title: 'Machine Learning & textes', description: 'Classification, Naive Bayes, SVM, métriques F1 (complément).', icon: Brain },
  { id: 'nlp11', slug: 'ressources-evaluation', number: 11, level: 11, title: 'Outils & évaluation', description: 'Stack Python, grille d’évaluation, bibliographie.', icon: BookOpen },
]

export function getNlpChapter(slug: string) {
  return nlpChapters.find((c) => c.slug === slug)
}

export function nlpChaptersByLevel(level: number) {
  return nlpChapters.filter((c) => c.level === level)
}
