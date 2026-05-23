import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { Link } from 'react-router-dom'
import { ClassProjectAtRisk } from '@/components/statistique/ClassProjectAtRisk'
import { CorrelationSummary } from '@/components/statistique/CorrelationSummary'
import { CentralTendencyChart } from '@/components/statistique/CentralTendencyChart'
import { DeviationTable } from '@/components/statistique/DeviationTable'
import { ProjectDeliverablesChecklist } from '@/components/statistique/ProjectDeliverablesChecklist'
import { StatistiqueProjetClasseExercises } from '@/components/statistique/StatistiqueProjetClasseExercises'
import { StatsBoxPlot, StatsScatterChart } from '@/components/statistique/StatsCharts'
import { StatsSummary } from '@/components/statistique/StatsSummary'
import {
  bivariateStats,
  boxplotStats,
  deviationTable,
  linearRegression,
  mean,
  median,
  mode,
  stdPop,
  variancePop,
} from '@/components/statistique/statsMath'
import {
  PROJECT_CLASS_HEURES,
  PROJECT_CLASS_NOTES,
  PROJECT_CLASS_PRESENCE,
  PROJECT_CLASS_STUDENTS,
  PROJECT_SCATTER_HEURES,
  PROJECT_SCATTER_PRESENCE,
} from '@/data/statistiqueSampleData'

const notes = PROJECT_CLASS_NOTES
const m = mean(notes)
const med = median(notes)
const mod = mode(notes)
const sigma = stdPop(notes)
const sigma2 = variancePop(notes)
const devRows = deviationTable(notes)
const box = boxplotStats(notes)
const studyStats = bivariateStats(PROJECT_CLASS_HEURES, PROJECT_CLASS_NOTES)
const presenceStats = bivariateStats(PROJECT_CLASS_PRESENCE, PROJECT_CLASS_NOTES)
const reg = linearRegression(PROJECT_CLASS_HEURES, PROJECT_CLASS_NOTES)
const notesSum = notes.reduce((a, b) => a + b, 0)
const sortedNotes = [...notes].sort((a, b) => a - b)

export function StatistiqueProjetClasseView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Projet réel — Analyse des performances d&apos;une classe</strong> : applique
          tout le cours comme un <strong>analyste data science</strong> — EDA, indicateurs, corrélations et décisions.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectifs du projet">
        Comprendre le niveau général, détecter les élèves en difficulté et étudier les facteurs de réussite (étude,
        présence).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Dataset — données brutes</h3>
      <div className="scroll-x-card my-4 overflow-x-auto rounded-xl border border-sky-200 text-sm">
        <table className="w-full min-w-[420px]">
          <thead>
            <tr className="bg-sky-50 text-left text-xs font-bold uppercase text-sky-900">
              <th className="px-4 py-2">Étudiant</th>
              <th className="px-4 py-2">Heures d&apos;étude</th>
              <th className="px-4 py-2">Présence (%)</th>
              <th className="px-4 py-2">Note (/20)</th>
            </tr>
          </thead>
          <tbody>
            {PROJECT_CLASS_STUDENTS.map((s) => (
              <tr key={s.etudiant} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{s.etudiant}</td>
                <td className="px-4 py-2">{s.heures}</td>
                <td className="px-4 py-2">{s.presence}</td>
                <td className="px-4 py-2">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">N = {PROJECT_CLASS_STUDENTS.length} observations · 3 variables quantitatives + identifiant.</p>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Analyse univariée — les notes</h3>

      <h4 className="mt-6 text-lg font-semibold text-deep">2.1 Moyenne</h4>
      <MathBlock tex={`\\bar{x} = \\frac{${notes.join('+')}}{10} = \\frac{${notesSum}}{10} = ${m}`} />
      <Callout variant="resume" title="Interprétation">
        La classe affiche un niveau moyen de <strong>{m}/20</strong> — résultat correct sur cet échantillon.
      </Callout>

      <h4 className="mt-6 text-lg font-semibold text-deep">2.2 Médiane</h4>
      <p className="text-sm text-muted">Série triée : {sortedNotes.join(', ')}</p>
      <MathBlock tex={`M_e = \\frac{${sortedNotes[4]} + ${sortedNotes[5]}}{2} = ${med}`} />
      <Callout variant="definition" title="Lecture">
        Médiane = moyenne ({med}) → distribution <strong>équilibrée</strong>, peu d&apos;asymétrie marquée sur les notes.
      </Callout>

      <h4 className="mt-6 text-lg font-semibold text-deep">2.3 Mode</h4>
      <p className="text-muted">
        {mod === null ? (
          <>
            <strong>Aucun mode</strong> — chaque note apparaît au plus une fois (valeurs quasi uniques).
          </>
        ) : (
          <>Mode = {mod}</>
        )}
      </p>

      <h4 className="mt-6 text-lg font-semibold text-deep">2.4 Dispersion</h4>
      <div className="my-4 grid gap-3 sm:grid-cols-3">
        <StatsSummary label="σ²" value={sigma2.toFixed(2)} />
        <StatsSummary label="σ" value={sigma.toFixed(2)} />
        <StatsSummary label="Étendue" value={`${box.dataMin} – ${box.dataMax}`} />
      </div>
      <DeviationTable rows={devRows} mean={m} caption="Écarts à la moyenne — calcul de σ²" />
      <Callout variant="resume" title="Interprétation qualitative">
        σ ≈ {sigma.toFixed(1)} : notes <strong>modérément dispersées</strong> — ni classe parfaitement homogène, ni très
        hétérogène.
      </Callout>
      <CentralTendencyChart
        values={notes}
        title="Distribution des notes"
        subtitle={`x̄ = ${m} · Me = ${med}`}
      />
      <StatsBoxPlot stats={box} title="Boxplot des notes" subtitle="Quartiles et étendue visuelle" />

      <h3 className="mt-10 text-xl font-bold text-deep">3. Analyse bivariée — heures d&apos;étude vs note</h3>
      <StatsScatterChart
        data={PROJECT_SCATTER_HEURES}
        xKey="heures"
        yKey="note"
        title="Heures d'étude vs note"
        subtitle="Relation positive nette"
      />
      <CorrelationSummary {...studyStats} />
      <Callout variant="resume" title="Conclusion statistique">
        <strong>{studyStats.r > 0 ? 'Corrélation positive forte' : 'Corrélation'}</strong> (r = {studyStats.r.toFixed(2)}
        ) : plus d&apos;heures d&apos;étude est associé à une meilleure note.
      </Callout>
      <MathBlock
        tex={`\\text{Note} \\approx ${reg.slope.toFixed(2)} \\times \\text{Heures} + ${reg.intercept.toFixed(2)}`}
      />
      <Callout variant="definition" title="Interprétation IA / ML">
        Modèle linéaire simple (régression) : pente ≈ {reg.slope.toFixed(2)}, ordonnée à l&apos;origine ≈{' '}
        {reg.intercept.toFixed(2)}. Forme pédagogique proche de{' '}
        <strong>Note ≈ 2 × Heures + 6</strong> sur les premiers profils réguliers — base pour prédire une note à partir
        des heures.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4. Analyse — présence vs note</h3>
      <StatsScatterChart
        data={PROJECT_SCATTER_PRESENCE}
        xKey="presence"
        yKey="note"
        title="Présence (%) vs note"
        subtitle="Faible présence → notes plus basses en général"
      />
      <CorrelationSummary {...presenceStats} />
      <Callout variant="resume" title="Conclusion">
        Présence = <strong>facteur de réussite</strong> (r = {presenceStats.r.toFixed(2)}) : assiduité et résultats
        évoluent dans le même sens.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5. Analyse globale — profil de la classe</h3>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 text-sm text-muted">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Niveau central</strong> correct (x̄ = {m})
          </li>
          <li>
            <strong>Facteurs explicatifs</strong> : temps d&apos;étude et présence fortement liés aux notes
          </li>
          <li>
            <strong>Progression</strong> quasi linéaire heures → notes sur l&apos;échantillon
          </li>
        </ul>
      </div>
      <Callout variant="important" title="Interprétation pédagogique">
        La performance semble dépendre du <strong>temps d&apos;étude</strong>, de la <strong>présence</strong> et de la{' '}
        <strong>régularité</strong> — pas de la seule « talent ».
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">6. Détection d&apos;élèves à risque</h3>
      <p className="text-muted">
        Critère retenu : <strong>note &lt; 10/20</strong> (seuil de difficulté classique).
      </p>
      <ClassProjectAtRisk students={PROJECT_CLASS_STUDENTS} />

      <h3 className="mt-10 text-xl font-bold text-deep">7. Conclusion du projet</h3>
      <p className="text-muted">Tu as réalisé un travail de data science complet sur un dataset réel :</p>
      <ProjectDeliverablesChecklist />

      <Callout variant="important" title="Niveau suivant">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Machine learning</strong> — régression linéaire pour prédire les notes automatiquement
          </li>
          <li>
            Cours{' '}
            <Link to="/cours/probabilites" className="font-semibold text-sky-700 underline">
              Probabilités
            </Link>{' '}
            — statistique <strong>inférentielle</strong> (échantillons, intervalles)
          </li>
          <li>
            <strong>Projet Python</strong> — pandas + matplotlib sur ce même dataset (à venir)
          </li>
        </ul>
      </Callout>

      <StatistiqueProjetClasseExercises />
    </>
  )
}
