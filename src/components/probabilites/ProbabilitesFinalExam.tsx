import { Accordion } from '@/components/ui/Accordion'
import { Callout } from '@/components/ui/Callout'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { BayesTheoremWidget } from '@/components/probabilites/BayesTheoremWidget'
import { BayesianFinalExamWidget } from '@/components/probabilites/BayesianPosteriorWidget'
import { BinomialLawWidget } from '@/components/probabilites/DiscreteLawsWidgets'
import { MonteCarloProbabilityWidget } from '@/components/probabilites/MonteCarloWidgets'
import { ZScoreExample130Widget } from '@/components/probabilites/ContinuousRVWidgets'
import { computePosterior, discreteExpectationVariance } from '@/components/probabilites/bayesianInferenceMath'
import { binomialPMF } from '@/components/probabilites/discreteLawsMath'
import type { ReactNode } from 'react'

function ExerciseAnswer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      {children}
    </p>
  )
}

export function ProbabilitesFinalExam() {
  const { ex, variance } = discreteExpectationVariance([0, 1, 2], [0.2, 0.5, 0.3])
  const p4 = binomialPMF(5, 0.8, 4)
  const bayes = computePosterior(0.01, 0.98, 0.05)
  const infer = computePosterior(0.4, 0.9, 0.3)

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-deep">Sujet examen final — Probabilités + IA</h3>
      <p className="text-muted">Niveau licence avancée / data science / machine learning — 7 exercices.</p>

      <DataTable
        headers={['Exercice', 'Points']}
        rows={[
          ['Bayes médical', '4 pts'],
          ['Variables aléatoires', '3 pts'],
          ['Binomiale IA', '3 pts'],
          ['Loi normale', '2 pts'],
          ['Markov', '4 pts'],
          ['Monte Carlo', '2 pts'],
          ['Bayes IA', '4 pts'],
        ]}
      />

      <Accordion title="Exercice 1 — Bayes médical (1 % prévalence)" defaultOpen>
        <ul className="list-disc pl-5 text-sm text-muted">
          <li>P(M)=0,01 · P(T|M)=0,98 · P(T|¬M)=0,05</li>
        </ul>
        <MathBlock tex="P(T)=0{,}98\\times0{,}01+0{,}05\\times0{,}99=0{,}0593" className="!my-2" />
        <MathBlock tex="P(M|T)=\\frac{0{,}0098}{0{,}0593}\\approx 0{,}165" className="!my-2" />
        <BayesTheoremWidget
          title="Ex. 1 — M = malade, T = test positif"
          initialPA={0.01}
          initialPBgivenA={0.98}
          initialPBgivenNotA={0.05}
        />
        <ExerciseAnswer>
          P(T) ≈ {bayes.evidence.toFixed(4)} · P(M|T) ≈ {(bayes.posterior * 100).toFixed(1)} %
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 2 — Variable aléatoire (table de loi)">
        <div className="scroll-x-card my-3 overflow-x-auto">
          <table className="min-w-[240px] border-collapse text-center text-sm">
            <thead>
              <tr className="border-b-2 border-emerald-200">
                <th className="bg-emerald-50 px-4 py-2">x</th>
                <th className="px-4 py-2">0</th>
                <th className="px-4 py-2">1</th>
                <th className="px-4 py-2">2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-emerald-50/50 px-4 py-2 font-medium">P(X=x)</td>
                <td className="px-4 py-2 font-mono">0,2</td>
                <td className="px-4 py-2 font-mono">0,5</td>
                <td className="px-4 py-2 font-mono">0,3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <MathBlock tex="E(X)=1{,}1,\quad E(X^2)=1{,}7,\quad V(X)=0{,}49" className="!my-2" />
        <ExerciseAnswer>
          E(X) = {ex.toFixed(1)} · V(X) = {variance.toFixed(2)}
        </ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 3 — Binomiale (4 succès sur 5, p=0,8)">
        <MathBlock tex="P(X=4)=C_5^4(0{,}8)^4(0{,}2)=0{,}4096" className="!my-2" />
        <BinomialLawWidget initialN={5} initialP={0.8} initialK={4} title="Ex. 3 — B(5, 0,8)" />
        <ExerciseAnswer>P(X=4) = {p4.toFixed(4)}</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 4 — Loi normale, Z-score">
        <MathBlock tex="Z=\\frac{130-100}{15}=2" className="!my-2" />
        <ZScoreExample130Widget />
        <ExerciseAnswer>Z = 2</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 5 — Markov (Soleil → pluie en 2 jours)">
        <p className="text-sm text-muted">Chemins S→S→P et S→P→P.</p>
        <MathBlock tex="P=0{,}8\\times0{,}2+0{,}2\\times0{,}6=0{,}28" className="!my-2" />
        <ExerciseAnswer>P(pluie dans 2 j) = 0,28 (28 %)</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 6 — Monte Carlo">
        <MathBlock tex="P\\approx\\frac{6350}{10000}=0{,}635" className="!my-2" />
        <MonteCarloProbabilityWidget initialN={10000} initialSuccesses={6350} />
        <ExerciseAnswer>P̂ ≈ 0,635</ExerciseAnswer>
      </Accordion>

      <Accordion title="Exercice 7 — Inférence bayésienne">
        <MathBlock tex="P(D)=0{,}54,\quad P(\\theta|D)=\\frac{0{,}36}{0{,}54}=0{,}67" className="!my-2" />
        <BayesianFinalExamWidget />
        <ExerciseAnswer>P(θ|D) ≈ {infer.posterior.toFixed(2)}</ExerciseAnswer>
      </Accordion>

      <Callout variant="resume" title="Résumé final du cours">
        <ul className="list-none space-y-1 text-sm">
          <li>✔ Probabilités classiques, Bayes, variables aléatoires</li>
          <li>✔ Lois binomiale, normale, Poisson</li>
          <li>✔ Markov, processus stochastiques, Monte Carlo</li>
          <li>✔ Inférence bayésienne et applications IA</li>
        </ul>
      </Callout>
    </div>
  )
}
