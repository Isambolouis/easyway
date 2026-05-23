import type { ReactNode } from 'react'
import {
  StatistiqueIntroView,
  StatistiqueOrganisationView,
  StatistiqueGraphiquesView,
} from '@/chapters/statistiqueDescriptive/statistiquePartI'
import {
  StatistiqueTendanceView,
  StatistiqueDispersionView,
  StatistiquePositionView,
  StatistiqueBoxplotView,
} from '@/chapters/statistiqueDescriptive/statistiquePartII'
import {
  StatistiqueCorrelationView,
  StatistiqueSeriesView,
} from '@/chapters/statistiqueDescriptive/statistiquePartIII'
import {
  StatistiqueInterpretationView,
  StatistiqueApplicationsView,
  StatistiqueBonusView,
  StatistiqueProjetClasseView,
} from '@/chapters/statistiqueDescriptive/statistiquePartIV'

export const statistiqueDescriptiveViews: Record<string, () => ReactNode> = {
  'introduction-statistique-descriptive': () => <StatistiqueIntroView />,
  'organisation-des-donnees': () => <StatistiqueOrganisationView />,
  'representations-graphiques': () => <StatistiqueGraphiquesView />,
  'tendance-centrale': () => <StatistiqueTendanceView />,
  'mesures-dispersion': () => <StatistiqueDispersionView />,
  'position-relative': () => <StatistiquePositionView />,
  'boite-a-moustaches': () => <StatistiqueBoxplotView />,
  'correlation-variables': () => <StatistiqueCorrelationView />,
  'series-statistiques': () => <StatistiqueSeriesView />,
  'interpretation-statistique': () => <StatistiqueInterpretationView />,
  'applications-pratiques': () => <StatistiqueApplicationsView />,
  'bonus-standardisation': () => <StatistiqueBonusView />,
  'projet-performances-classe': () => <StatistiqueProjetClasseView />,
}
