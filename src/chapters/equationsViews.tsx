import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { Accordion } from '@/components/ui/Accordion'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import type { ReactNode } from 'react'

function EquationExample({ steps, result }: { steps: string[]; result: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm leading-relaxed">
      {steps.map((line) => (
        <p key={line} className={line.startsWith('→') ? 'text-muted' : ''}>
          {line}
        </p>
      ))}
      <p className="mt-2 font-bold text-green-800">{result}</p>
    </div>
  )
}

export const equationsViews: Record<string, () => ReactNode> = {
  'qu-est-ce-une-equation': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une <strong className="text-deep">équation</strong> est une phrase mathématique qui affirme que{' '}
          <strong>deux expressions sont égales</strong>. C’est la base de tout le reste — y compris l’algèbre
          linéaire.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Définition">
        <p>Le signe <strong>=</strong> sépare deux expressions :</p>
        <p className="mt-2 text-center text-lg font-semibold text-deep">gauche = droite</p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemples</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Sans inconnue', ex: '3 + 5 = 8', note: 'Égalité toujours vraie' },
          { label: 'Avec inconnue', ex: 'x + 2 = 7', note: 'On cherche x' },
          { label: 'Linéaire', ex: '2x − 4 = 10', note: 'Forme courante' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-center">
            <p className="text-xs font-bold uppercase text-amber-800">{item.label}</p>
            <p className="mt-2 font-mono text-lg font-semibold text-deep">{item.ex}</p>
            <p className="mt-1 text-xs text-muted">{item.note}</p>
          </div>
        ))}
      </div>

      <Callout variant="important" title="À retenir">
        Toute équation pose une question du type : « Pour quelle(s) valeur(s), l’égalité est-elle vraie ? »
      </Callout>

      <QuizCard
        question="Laquelle est une équation avec inconnue ?"
        options={[
          { id: 'a', label: 'x + 2 = 7', correct: true },
          { id: 'b', label: '3 + 5 = 8', correct: false },
          { id: 'c', label: '2 < 5', correct: false },
        ]}
        explanation="x + 2 = 7 contient l’inconnue x. Les autres sont une égalité fixe ou une inégalité."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>inconnue, solution et égalité</strong>.
      </Callout>
    </>
  ),

  'inconnue-solution-egalite': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Trois mots à maîtriser avant de résoudre : <strong className="text-deep">inconnue</strong>,{' '}
          <strong className="text-deep">solution</strong> et <strong className="text-deep">égalité</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Inconnue</h3>
      <Callout variant="definition" title="Inconnue">
        <p>La valeur que tu cherches — souvent notée <strong>x</strong>, mais aussi y, z, t, n…</p>
        <p className="mt-2 font-mono text-deep">x + 3 = 9 → l’inconnue est x</p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Solution</h3>
      <Callout variant="definition" title="Solution">
        <p>La valeur qui rend l’équation <strong>vraie</strong>.</p>
        <p className="mt-2 font-mono text-deep">x + 3 = 9 → x = 6 car 6 + 3 = 9 ✓</p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Égalité</h3>
      <Callout variant="important" title="Règle d’or">
        Si tu fais la <strong>même opération</strong> des deux côtés du =, l’égalité reste vraie.
      </Callout>
      <ul className="list-disc space-y-2 pl-5 text-muted">
        <li>Ajouter ou soustraire le même nombre</li>
        <li>Multiplier ou diviser par le même nombre (≠ 0)</li>
      </ul>

      <Accordion title="Exemple — isoler x" defaultOpen={false}>
        <pre className="font-mono text-sm text-ink">
          {`x + 5 = 12
→ soustraire 5 des deux côtés
x = 7`}
        </pre>
      </Accordion>

      <QuizCard
        question="x + 3 = 9. Quelle est la solution ?"
        options={[
          { id: 'a', label: 'x = 6', correct: true },
          { id: 'b', label: 'x = 12', correct: false },
          { id: 'c', label: 'x = 3', correct: false },
        ]}
        explanation="6 + 3 = 9. La solution vérifie l’égalité."
      />

      <Callout variant="resume">
        Passe aux <strong>propriétés fondamentales</strong> pour isoler l’inconnue systématiquement.
      </Callout>
    </>
  ),

  'proprietes-fondamentales': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Pour résoudre une équation, tu dois <strong className="text-deep">isoler l’inconnue</strong>. Voici les
          trois familles de règles indispensables.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1. Ajouter ou soustraire</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm">
        <p>x + 4 = 10</p>
        <p className="text-muted">→ soustraire 4 des deux côtés</p>
        <p className="font-bold text-green-800">x = 6</p>
      </div>

      <h3 className="mt-8 text-xl font-bold text-deep">2. Multiplier ou diviser (≠ 0)</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm">
        <p>3x = 12</p>
        <p className="text-muted">→ diviser par 3 des deux côtés</p>
        <p className="font-bold text-green-800">x = 4</p>
      </div>

      <h3 className="mt-8 text-xl font-bold text-deep">3. Distributivité</h3>
      <Callout variant="definition" title="Distributivité">
        <p className="font-mono">a(b + c) = ab + ac</p>
      </Callout>
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 font-mono text-sm">
        <p>2(x + 3) = 14</p>
        <p>→ 2x + 6 = 14</p>
        <p>→ 2x = 8</p>
        <p className="font-bold text-green-800">→ x = 4</p>
      </div>

      <Callout variant="resume" title="Ce que tu maîtrises (Partie I)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Définition d’une équation</li>
          <li>Inconnue et solution</li>
          <li>Propriétés pour transformer l’égalité sans la casser</li>
        </ul>
      </Callout>

      <QuizCard
        question="2(x + 3) = 14. Quelle est la valeur de x ?"
        options={[
          { id: 'a', label: 'x = 4', correct: true },
          { id: 'b', label: 'x = 7', correct: false },
          { id: 'c', label: 'x = 11', correct: false },
        ]}
        explanation="2x + 6 = 14 → 2x = 8 → x = 4."
      />

      <Callout variant="important">
        Passe à la <strong>Partie II — Équations du premier degré</strong> (leçon 4).
      </Callout>
    </>
  ),

  'premier-degre': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une <strong className="text-deep">équation du premier degré</strong> : l’inconnue est à la puissance 1
          (on écrit souvent juste <strong>x</strong>). Forme la plus courante en algèbre et en systèmes linéaires.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Forme générale">
        <MathBlock tex="ax + b = c \quad (a \neq 0)" className="!my-2" />
        <p className="text-sm text-muted">Objectif : <strong>isoler x</strong>.</p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Méthode en 2 étapes</h3>
      <ol className="list-decimal space-y-2 pl-5 text-muted">
        <li>
          <strong>Enlever b</strong> — opération inverse (addition / soustraction) des deux côtés
        </li>
        <li>
          <strong>Enlever le coefficient a</strong> — diviser par <em>a</em> des deux côtés
        </li>
      </ol>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemples</h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 1 — x + 7 = 12</p>
          <EquationExample steps={['x + 7 = 12', '→ soustraire 7', 'x = 12 − 7']} result="x = 5" />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 2 — 3x = 15</p>
          <EquationExample steps={['3x = 15', '→ diviser par 3', 'x = 15 ÷ 3']} result="x = 5" />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 3 — 4x − 6 = 10</p>
          <EquationExample
            steps={['4x − 6 = 10', '→ +6 : 4x = 16', '→ ÷4']}
            result="x = 4"
          />
        </div>
      </div>

      <QuizCard
        question="4x − 6 = 10. Quelle est la solution ?"
        options={[
          { id: 'a', label: 'x = 4', correct: true },
          { id: 'b', label: 'x = 10', correct: false },
          { id: 'c', label: 'x = 1', correct: false },
        ]}
        explanation="4x = 16 puis x = 4."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>équations avec fractions</strong>.
      </Callout>
    </>
  ),

  'equations-fractions': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les fractions apparaissent souvent — y compris dans les <strong>systèmes d’équations</strong>. La règle
          d’or&nbsp;: <strong>éliminer les dénominateurs</strong>.
        </p>
      </FadeIn>

      <Callout variant="important" title="Règle d’or">
        Multiplier <strong>toute l’équation</strong> par le même nombre (souvent le PPCM des dénominateurs).
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemples</h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 1 — x/3 = 5</p>
          <EquationExample steps={['x/3 = 5', '→ ×3 des deux côtés']} result="x = 15" />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 2 — (2x)/5 − 1 = 3</p>
          <EquationExample
            steps={['(2x)/5 − 1 = 3', '→ +1 : (2x)/5 = 4', '→ ×5 : 2x = 20', '→ ÷2']}
            result="x = 10"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 3 — x/4 + x/6 = 5</p>
          <EquationExample
            steps={[
              'PPCM(4, 6) = 12',
              '→ ×12 : 3x + 2x = 60',
              '→ 5x = 60',
              '→ ÷5',
            ]}
            result="x = 12"
          />
        </div>
      </div>

      <Accordion title="❓ D’où viennent les coefficients 3 et 2 ?" defaultOpen={false}>
        <p className="mb-4 text-sm text-muted">
          Question fréquente sur l’exemple 3 : pourquoi{' '}
          <span className="font-mono">x/4 + x/6 = 5</span> devient{' '}
          <span className="font-mono">3x + 2x = 60</span> ?
        </p>

        <h4 className="font-semibold text-deep">Étape 1 — Pourquoi ×12 ?</h4>
        <p className="mt-1 text-sm text-muted">
          Dénominateurs 4 et 6 → PPCM(4, 6) = <strong>12</strong> (multiple commun le plus petit).
        </p>
        <MathBlock tex="12 \times \left(\frac{x}{4} + \frac{x}{6}\right) = 12 \times 5" className="!my-2" />

        <h4 className="mt-4 font-semibold text-deep">Étape 2 — Distribuer le 12</h4>
        <MathBlock tex="\frac{12x}{4} + \frac{12x}{6} = 60" className="!my-2" />

        <h4 className="mt-4 font-semibold text-deep">Étape 3 — Simplifier chaque fraction</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-sm">
            <p className="font-mono">12x/4 = (12÷4)x = 3x</p>
            <p className="mt-1 text-amber-900">
              ➡️ Le <strong>3</strong> vient de <strong>12 ÷ 4</strong>
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-sm">
            <p className="font-mono">12x/6 = (12÷6)x = 2x</p>
            <p className="mt-1 text-amber-900">
              ➡️ Le <strong>2</strong> vient de <strong>12 ÷ 6</strong>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium text-green-800">
          Donc : 3x + 2x = 60 — les coefficients viennent uniquement de PPCM ÷ dénominateur.
        </p>

        <Callout variant="definition" title="Règle générale" className="mt-4">
          <p className="text-sm">
            Pour <span className="font-mono">x/a + x/b</span> avec PPCM = <strong>P</strong>&nbsp;:
          </p>
          <MathBlock
            tex="\frac{Px}{a}=\frac{P}{a}\,x \qquad \frac{Px}{b}=\frac{P}{b}\,x"
            className="!my-2"
          />
        </Callout>
      </Accordion>

      <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
        <p className="font-semibold text-deep">Petit exercice — coefficients seulement</p>
        <p className="mt-2 font-mono text-deep">x/5 + x/10 = 7</p>
        <p className="mt-2 text-sm text-muted">
          1️⃣ PPCM de 5 et 10 = ? &nbsp;·&nbsp; 2️⃣ Coefficient devant x pour chaque terme ?
        </p>
        <Accordion title="Voir la correction" defaultOpen={false}>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>
              <strong>PPCM(5, 10) = 10</strong>
            </li>
            <li>
              10x/5 = <strong>2x</strong> (car 10÷5 = 2)
            </li>
            <li>
              10x/10 = <strong>1x</strong> (car 10÷10 = 1)
            </li>
            <li>
              Équation après multiplication&nbsp;: <span className="font-mono">2x + x = 70</span>
            </li>
          </ul>
        </Accordion>
      </div>

      <QuizCard
        question="x/5 + x/10 = 7. Après multiplication par le PPCM, quels sont les coefficients de x ?"
        options={[
          { id: 'a', label: '2x et 1x (PPCM = 10)', correct: true },
          { id: 'b', label: '5x et 10x', correct: false },
          { id: 'c', label: '1x et 2x (inversés)', correct: false },
        ]}
        explanation="PPCM = 10. 10÷5 = 2 et 10÷10 = 1 → 2x + x = 70."
      />

      <QuizCard
        question="x/3 = 5. Quelle est la solution ?"
        options={[
          { id: 'a', label: 'x = 15', correct: true },
          { id: 'b', label: 'x = 5/3', correct: false },
          { id: 'c', label: 'x = 3', correct: false },
        ]}
        explanation="Multiplier par 3 : x = 15."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>parenthèses et distributivité</strong>.
      </Callout>
    </>
  ),

  'parentheses-distributivite': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Beaucoup d’erreurs viennent des <strong className="text-deep">parenthèses</strong>. Applique la
          distributivité avant d’isoler <strong>x</strong>.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Distributivité">
        <MathBlock tex="a(b + c) = ab + ac" className="!my-2" />
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemples</h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 1 — 2(x + 3) = 14</p>
          <EquationExample
            steps={['2(x + 3) = 14', '→ 2x + 6 = 14', '→ −6 : 2x = 8', '→ ÷2']}
            result="x = 4"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 2 — 5(3 − x) = 10</p>
          <EquationExample
            steps={['5(3 − x) = 10', '→ 15 − 5x = 10', '→ −15 : −5x = −5', '→ ÷(−5)']}
            result="x = 1"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple 3 — 3(x − 2) − 4(2x + 1) = 5</p>
          <EquationExample
            steps={[
              '3x − 6 − 8x − 4 = 5',
              '→ −5x − 10 = 5',
              '→ +10 : −5x = 15',
              '→ ÷(−5)',
            ]}
            result="x = −3"
          />
        </div>
      </div>

      <Callout variant="resume" title="Bilan Partie II">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Équations <strong>ax + b = c</strong></li>
          <li>Équations avec <strong>fractions</strong></li>
          <li>Équations avec <strong>parenthèses</strong></li>
        </ul>
      </Callout>

      <QuizCard
        question="5(3 − x) = 10. Quelle est la solution ?"
        options={[
          { id: 'a', label: 'x = 1', correct: true },
          { id: 'b', label: 'x = −1', correct: false },
          { id: 'c', label: 'x = 3', correct: false },
        ]}
        explanation="15 − 5x = 10 → −5x = −5 → x = 1."
      />

      <Callout variant="important">
        Passe à la <strong>Partie III — Équations du second degré</strong> (leçon 7).
      </Callout>
    </>
  ),

  'second-degre': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Étape majeure&nbsp;: l’inconnue apparaît au <strong className="text-deep">carré</strong> (x²). Très
          utilisé en physique, informatique et comme base avant l’algèbre linéaire avancée.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Forme générale">
        <MathBlock tex="ax^2 + bx + c = 0 \quad (a \neq 0)" className="!my-2" />
        <p className="text-sm text-muted">Exemples : x² − 5x + 6 = 0 · 2x² + 3x − 2 = 0 · −x² + 4 = 0</p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Pourquoi « = 0 » ?</h3>
      <p>Toute la théorie repose sur cette forme. Sinon, on <strong>transforme</strong> l’équation.</p>
      <EquationExample steps={['x² + 2x = 3', '→ x² + 2x − 3 = 0']} result="Forme standard" />

      <h3 className="mt-10 text-xl font-bold text-deep">Trois méthodes principales</h3>
      <ol className="list-decimal space-y-1 pl-5 text-muted">
        <li><strong>Factorisation</strong></li>
        <li><strong>Discriminant Δ</strong> (universelle)</li>
        <li><strong>Cas particuliers</strong> (b = 0 ou c = 0)</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Méthode 1 — Factorisation</h3>
      <Callout variant="important" title="Principe">
        <p className="font-mono">ab = 0 ⇒ a = 0 ou b = 0</p>
      </Callout>

      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple — x² − 5x + 6 = 0</p>
          <p className="mb-2 text-sm text-muted">Chercher deux nombres : somme = −5, produit = 6 → <strong>−2 et −3</strong></p>
          <EquationExample
            steps={['(x − 2)(x − 3) = 0']}
            result="x = 2 ou x = 3"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple — 2x² + 4x = 0</p>
          <EquationExample steps={['2x(x + 2) = 0']} result="x = 0 ou x = −2" />
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">Cas particuliers</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-violet-700">b = 0</p>
          <p className="mt-2 font-mono text-sm">x² − 9 = 0</p>
          <p className="mt-1 font-mono text-sm text-muted">x² = 9</p>
          <p className="mt-1 font-bold text-green-800">x = ±3</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-violet-700">c = 0</p>
          <p className="mt-2 font-mono text-sm">x² + 5x = 0</p>
          <p className="mt-1 font-mono text-sm text-muted">x(x + 5) = 0</p>
          <p className="mt-1 font-bold text-green-800">x = 0 ou x = −5</p>
        </div>
      </div>

      <QuizCard
        question="x² − 5x + 6 = 0. Quelles sont les solutions ?"
        options={[
          { id: 'a', label: 'x = 2 et x = 3', correct: true },
          { id: 'b', label: 'x = −2 et x = −3', correct: false },
          { id: 'c', label: 'x = 5 et x = 6', correct: false },
        ]}
        explanation="(x − 2)(x − 3) = 0."
      />

      <Callout variant="resume">
        Leçon suivante : le <strong>discriminant Δ</strong> (méthode universelle).
      </Callout>
    </>
  ),

  discriminant: () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Quand la factorisation est difficile, le <strong className="text-deep">discriminant Δ</strong> fonctionne{' '}
          <strong>toujours</strong>.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Formule de Δ">
        <p className="text-sm">Pour ax² + bx + c = 0 :</p>
        <MathBlock tex="\Delta = b^2 - 4ac" className="!my-2" />
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Interprétation de Δ</h3>
      <DataTable
        headers={['Δ', 'Solutions réelles']}
        rows={[
          ['Δ > 0', '2 solutions distinctes'],
          ['Δ = 0', '1 solution (double racine)'],
          ['Δ < 0', 'Aucune solution réelle'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">Formule des solutions</h3>
      <MathBlock tex="x = \frac{-b \pm \sqrt{\Delta}}{2a}" />

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple complet</h3>
      <p className="text-sm text-muted">x² − 3x − 4 = 0 → a = 1, b = −3, c = −4</p>
      <EquationExample
        steps={[
          'Δ = (−3)² − 4(1)(−4) = 9 + 16 = 25',
          'x = (−(−3) ± √25) / 2 = (3 ± 5) / 2',
        ]}
        result="x = 4 ou x = −1"
      />

      <QuizCard
        question="x² − 3x − 4 = 0. Que vaut Δ ?"
        options={[
          { id: 'a', label: 'Δ = 25', correct: true },
          { id: 'b', label: 'Δ = 9', correct: false },
          { id: 'c', label: 'Δ = −7', correct: false },
        ]}
        explanation="Δ = 9 − 4(1)(−4) = 9 + 16 = 25."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>paraboles</strong> et sens géométrique.
      </Callout>
    </>
  ),

  'factorisation-paraboles': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une équation du second degré correspond graphiquement à une <strong className="text-deep">parabole</strong>.
          Le nombre de solutions se lit sur l’axe des x.
        </p>
      </FadeIn>

      <DataTable
        headers={['Solutions', 'Graphique (parabole vs axe x)']}
        rows={[
          ['2 solutions (Δ > 0)', 'La courbe coupe l’axe en 2 points'],
          ['1 solution (Δ = 0)', 'La courbe touche l’axe (sommet sur l’axe)'],
          ['0 solution réelle (Δ < 0)', 'La courbe ne coupe pas l’axe x'],
        ]}
      />

      <Callout variant="resume" title="Bilan Partie III">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Forme <strong>ax² + bx + c = 0</strong></li>
          <li>Résolution par <strong>factorisation</strong></li>
          <li>Méthode universelle avec <strong>Δ</strong></li>
          <li>Lien avec la <strong>parabole</strong></li>
        </ul>
      </Callout>

      <QuizCard
        question="Δ < 0 pour une équation du 2nd degré. Combien de solutions réelles ?"
        options={[
          { id: 'a', label: 'Aucune', correct: true },
          { id: 'b', label: 'Une', correct: false },
          { id: 'c', label: 'Deux', correct: false },
        ]}
        explanation="Δ < 0 ⇒ pas de racine réelle (la parabole ne coupe pas l’axe x)."
      />

      <Callout variant="important">
        Passe à la <strong>Partie IV — Systèmes d’équations</strong> (leçon 10).
      </Callout>
    </>
  ),

  'systemes-deux-equations': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          C’est ici que l’<strong className="text-deep">algèbre linéaire commence vraiment</strong> : plusieurs
          équations, les mêmes inconnues, à satisfaire <strong>en même temps</strong>.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Définition">
        <MathBlock
          tex="\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}"
          className="!my-2"
        />
        <p className="text-sm text-muted">
          On cherche les valeurs de <strong>x</strong> et <strong>y</strong> qui vérifient les deux équations à la fois.
        </p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Intuition géométrique</h3>
      <p>Chaque équation linéaire à 2 inconnues = une <strong>droite</strong> dans le plan.</p>
      <DataTable
        headers={['Configuration', 'Solutions du système']}
        rows={[
          ['Droites sécantes', '1 solution — point d’intersection'],
          ['Droites parallèles distinctes', '0 solution'],
          ['Droites confondues', 'Infinité de solutions'],
        ]}
      />

      <QuizCard
        question="Résoudre un système 2×2, c’est chercher…"
        options={[
          { id: 'a', label: 'Le point où les deux droites se coupent', correct: true },
          { id: 'b', label: 'La somme de toutes les inconnues', correct: false },
          { id: 'c', label: 'Une seule équation au hasard', correct: false },
        ]}
        explanation="Chaque équation = une droite ; le système = leur intersection."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>substitution et combinaison linéaire</strong>.
      </Callout>
    </>
  ),

  'methodes-systemes': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Trois façons de résoudre un système 2×2 — les deux premières sont essentielles avant les matrices.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Méthode 1 — Substitution</h3>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">
        <li>Isoler une inconnue dans une équation</li>
        <li>La remplacer dans l’autre</li>
      </ol>
      <EquationExample
        steps={[
          'x + y = 5  et  x − y = 1',
          'x = 1 + y',
          '(1 + y) + y = 5 → 2y = 4 → y = 2',
          'x = 1 + 2',
        ]}
        result="(x, y) = (3, 2)"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">Méthode 2 — Combinaison linéaire</h3>
      <Callout variant="important" title="But unique">
        Faire <strong>disparaître une inconnue</strong> en additionnant ou soustrayant les équations.
      </Callout>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple — soustraction (y opposés)</p>
          <EquationExample
            steps={[
              'x + y = 5  et  x − y = 1',
              '(x+y) − (x−y) = 4 → 2y = 4 → y = 2',
              'puis x + 2 = 5 → x = 3',
            ]}
            result="(3, 2)"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-800">Exemple — addition (2x+y et 3x−y)</p>
          <EquationExample
            steps={[
              '2x + y = 7  et  3x − y = 8',
              'Addition : 5x = 15 → x = 3',
              '2(3) + y = 7 → y = 1',
            ]}
            result="(3, 1)"
          />
        </div>
      </div>

      <Accordion title="❓ Addition ou soustraction ? Comment trouver x puis y ?" defaultOpen={false}>
        <h4 className="font-semibold text-deep">Règle — choisir l’opération</h4>
        <DataTable
          headers={['Coefficients de l’inconnue à éliminer', 'Action']}
          rows={[
            ['+y et −y (opposés)', 'Addition (y disparaît)'],
            ['+y et +y (identiques)', 'Soustraction'],
            ['−y et −y', 'Soustraction'],
            ['Coefficients différents', 'Multiplier une équation d’abord'],
          ]}
        />
        <Callout variant="definition" title="Méthode à retenir" className="mt-4">
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            <li>Éliminer une inconnue (addition ou soustraction)</li>
            <li>Trouver <strong>une</strong> inconnue</li>
            <li><strong>Remplacer</strong> dans une équation de départ pour l’autre — ce n’est pas magique, c’est la substitution finale</li>
          </ol>
        </Callout>
        <p className="mt-3 text-sm text-muted">
          Ex. 3x + 2y = 10 et 5x − 2y = 6 → coefficients de y opposés → <strong>addition</strong> → 8x = 16.
        </p>
      </Accordion>

      <h3 className="mt-10 text-xl font-bold text-deep">Méthode 3 — Avant-goût matriciel</h3>
      <MathBlock
        tex="\begin{pmatrix}2&1\\3&-1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}7\\8\end{pmatrix}"
        className="!my-2"
      />
      <p className="text-sm text-muted">
        Écriture <strong>Ax = b</strong> — cœur de l’algèbre linéaire (inverse, rang, systèmes n×n).
      </p>

      <QuizCard
        question="2x + y = 7 et 3x − y = 8. Quelle opération élimine y en premier ?"
        options={[
          { id: 'a', label: 'Addition des deux équations', correct: true },
          { id: 'b', label: 'Soustraction', correct: false },
          { id: 'c', label: 'Multiplier par 0', correct: false },
        ]}
        explanation="+y et −y sont opposés → addition fait disparaître y."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>types de systèmes</strong> et bilan Partie IV.
      </Callout>
    </>
  ),

  'systemes-geometrie': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Un même formalisme, trois situations possibles — exactement comme deux droites dans le plan.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Types de systèmes</h3>
      <div className="space-y-4">
        <Callout variant="definition" title="Compatible déterminé">
          <p className="text-sm">✔ <strong>Une seule solution</strong> — droites sécantes.</p>
          <p className="mt-1 font-mono text-xs">Ex. x + y = 5 et x − y = 1</p>
        </Callout>
        <Callout variant="important" title="Incompatible">
          <p className="text-sm">❌ <strong>Aucune solution</strong> — droites parallèles distinctes.</p>
          <MathBlock tex="\begin{cases} x + y = 2 \\ x + y = 5 \end{cases}" className="!my-1" />
        </Callout>
        <Callout variant="definition" title="Compatible indéterminé">
          <p className="text-sm">♾️ <strong>Infinité de solutions</strong> — mêmes droite.</p>
          <MathBlock tex="\begin{cases} x + y = 2 \\ 2x + 2y = 4 \end{cases}" className="!my-1" />
        </Callout>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
        <p className="font-semibold text-deep">Exercice rapide</p>
        <MathBlock tex="\begin{cases} 3x + 2y = 10 \\ 5x - 2y = 6 \end{cases}" className="!my-2" />
        <p className="text-sm text-muted">1️⃣ Addition ou soustraction ? 2️⃣ Quelle inconnue est éliminée ?</p>
        <Accordion title="Correction" defaultOpen={false}>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>
              <strong>Addition</strong> (+2y et −2y)
            </li>
            <li>
              On élimine <strong>y</strong> → 8x = 16 → x = 2, puis y = 2
            </li>
          </ul>
        </Accordion>
      </div>

      <Callout variant="resume" title="Bilan Partie IV">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Définition d’un système d’équations</li>
          <li>Substitution et combinaison linéaire</li>
          <li>Lien avec <strong>matrices</strong> et algèbre linéaire</li>
          <li>Interprétation du nombre de solutions</li>
        </ul>
      </Callout>

      <QuizCard
        question="x + y = 2 et x + y = 5. Le système est…"
        options={[
          { id: 'a', label: 'Incompatible (aucune solution)', correct: true },
          { id: 'b', label: 'Une solution unique', correct: false },
          { id: 'c', label: 'Infinité de solutions', correct: false },
        ]}
        explanation="Mêmes coefficients mais seconds membres différents → parallèles distinctes."
      />

      <Callout variant="important">
        Suite du parcours&nbsp;: cours <strong>Algèbre linéaire</strong> dans la bibliothèque, ou Partie V (équations
        avancées) à venir.
      </Callout>
    </>
  ),
}

export function EquationsComingSoon({ title }: { title: string }) {
  return (
    <Callout variant="important" title="Leçon à venir">
      <p>
        <strong>{title}</strong> sera ajoutée lors de la prochaine importation. Consulte le plan du cours.
      </p>
    </Callout>
  )
}
