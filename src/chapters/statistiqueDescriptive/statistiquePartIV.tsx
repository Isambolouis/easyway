import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { Link } from 'react-router-dom'
import { StatistiqueInterpretationView } from '@/chapters/statistiqueDescriptive/statistiqueCh9Interpretation'
import { StatistiqueApplicationsView } from '@/chapters/statistiqueDescriptive/statistiqueCh10Applications'
import { StatistiqueProjetClasseView } from '@/chapters/statistiqueDescriptive/statistiqueProjetClasse'
import { NOTES_EXTENDED } from '@/data/statistiqueSampleData'
import { mean, stdPop } from '@/components/statistique/statsMath'

export { StatistiqueInterpretationView, StatistiqueApplicationsView, StatistiqueProjetClasseView }

export function StatistiqueBonusView() {
  const data = NOTES_EXTENDED
  const m = mean(data)
  const s = stdPop(data)
  const zExample = ((18 - m) / s).toFixed(2)

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Chapitre bonus : <strong>standardisation</strong> et premier lien avec la loi normale — pont vers la
          statistique inférentielle.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">Z-score</h3>
      <MathBlock tex="z = \frac{x - \bar{x}}{\sigma}" />
      <p className="text-muted">
        Mesure l’écart à la moyenne en nombre d’écarts-types. Une note de 18 correspond ici à z ≈{' '}
        <strong>{zExample}</strong>.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">Loi normale (aperçu)</h3>
      <p className="text-muted">
        Beaucoup de phénomènes agrégés suivent approximativement une courbe en cloche. Règle empirique : environ
        68 % des données dans [μ − σ, μ + σ] si la distribution est proche de la normale.
      </p>
      <Callout variant="important" title="Pour aller plus loin">
        Voir le chapitre{' '}
        <Link to="/cours/probabilites/loi-normale" className="font-semibold text-sky-700 underline">
          Loi normale
        </Link>{' '}
        dans le cours Probabilités.
      </Callout>
    </>
  )
}
