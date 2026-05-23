import type { ReactNode } from 'react'
import { ProbabilitesIntroView, ProbabilitesCombinatoireView } from '@/chapters/probabilites/probabilitesPartI'
import {
  ProbabilitesClassiqueView,
  ProbabilitesConditionnelleView,
  ProbabilitesBayesView,
} from '@/chapters/probabilites/probabilitesPartII'
import {
  ProbabilitesVariablesDiscretesView,
  ProbabilitesLoisDiscretesView,
} from '@/chapters/probabilites/probabilitesPartIII'
import {
  ProbabilitesVariablesContinuesView,
  ProbabilitesLoiNormaleView,
} from '@/chapters/probabilites/probabilitesPartIV'
import {
  ProbabilitesMarkovView,
  ProbabilitesProcessusView,
  ProbabilitesMonteCarloView,
} from '@/chapters/probabilites/probabilitesPartV'
import {
  ProbabilitesBayesianInferenceView,
  ProbabilitesVariationalInferenceView,
  ProbabilitesDeepLearningView,
} from '@/chapters/probabilites/probabilitesPartVI'
import {
  ProbabilitesExercicesView,
  ProbabilitesProjetFinalView,
} from '@/chapters/probabilites/probabilitesPartVII'

export const probabilitesViews: Record<string, () => ReactNode> = {
  'introduction-probabilites': () => <ProbabilitesIntroView />,
  'ensembles-combinatoire': () => <ProbabilitesCombinatoireView />,
  'probabilite-classique': () => <ProbabilitesClassiqueView />,
  'probabilite-conditionnelle': () => <ProbabilitesConditionnelleView />,
  'theoreme-bayes': () => <ProbabilitesBayesView />,
  'variables-aleatoires-discretes': () => <ProbabilitesVariablesDiscretesView />,
  'lois-discretes': () => <ProbabilitesLoisDiscretesView />,
  'variables-aleatoires-continues': () => <ProbabilitesVariablesContinuesView />,
  'loi-normale': () => <ProbabilitesLoiNormaleView />,
  'chaines-markov': () => <ProbabilitesMarkovView />,
  'processus-stochastiques': () => <ProbabilitesProcessusView />,
  'simulation-monte-carlo': () => <ProbabilitesMonteCarloView />,
  'probabilites-machine-learning': () => <ProbabilitesBayesianInferenceView />,
  'inference-variationnelle': () => <ProbabilitesVariationalInferenceView />,
  'probabilites-deep-learning': () => <ProbabilitesDeepLearningView />,
  'exercices-probabilites': () => <ProbabilitesExercicesView />,
  'projet-final-probabilites': () => <ProbabilitesProjetFinalView />,
}
