import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { StudentDataTable } from '@/components/statistique/StudentDataTable'
import { StatistiqueOrganisationView } from '@/chapters/statistiqueDescriptive/statistiqueCh1Organisation'
import { StatistiqueGraphiquesView } from '@/chapters/statistiqueDescriptive/statistiqueCh2Graphiques'

export { StatistiqueOrganisationView, StatistiqueGraphiquesView }

export function StatistiqueIntroView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Bienvenue dans le cours de <strong className="text-deep">statistique descriptive</strong> : apprendre à
          résumer, organiser et visualiser des données avant toute modélisation probabiliste ou inférentielle.
        </p>
      </FadeIn>

      <h3 className="mt-10 text-xl font-bold text-deep">Définition</h3>
      <p className="text-muted">
        La <strong>statistique descriptive</strong> regroupe les méthodes qui permettent de{' '}
        <strong>décrire et synthétiser</strong> un jeu de données (tableaux, graphiques, indicateurs numériques)
        sans tirer de conclusion sur une population plus large que l’échantillon observé.
      </p>

      <Callout variant="important" title="Descriptive vs inférentielle">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Descriptive</strong> : « Que disent ces 20 notes ? » (moyenne, dispersion, graphiques).
          </li>
          <li>
            <strong>Inférentielle</strong> : « Que peut-on dire de toute la promotion à partir de 20 notes ? »
            (intervalles de confiance, tests d’hypothèses).
          </li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Types de données</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
          <p className="font-semibold text-deep">Qualitatives</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            <li><strong>Nominales</strong> : sexe (M/F), couleur — pas d’ordre naturel.</li>
            <li><strong>Ordinales</strong> : niveau (faible / moyen / fort) — ordre, pas d’échelle fixe.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
          <p className="font-semibold text-deep">Quantitatives</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            <li><strong>Discrètes</strong> : nombre d’enfants, note entière sur 20.</li>
            <li><strong>Continues</strong> : taille, température, revenu exact.</li>
          </ul>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">Population et échantillon</h3>
      <p className="text-muted">
        La <strong>population</strong> est l’ensemble de tous les individus ou unités d’intérêt. Un{' '}
        <strong>échantillon</strong> est un sous-ensemble observé, souvent pour des raisons de coût ou de temps.
      </p>

      <h4 className="mt-6 font-semibold text-sky-800">Dataset exemple — étudiants</h4>
      <StudentDataTable />
      <p className="text-sm text-muted">
        Âge et note sont <strong>quantitatives</strong> ; le sexe est <strong>qualitative nominale</strong>.
      </p>
    </>
  )
}

