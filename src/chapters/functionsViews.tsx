import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { QuizCard } from '@/components/ui/QuizCard'
import { Accordion } from '@/components/ui/Accordion'
import { MathBlock } from '@/components/ui/MathBlock'
import { DataTable } from '@/components/ui/DataTable'
import { FunctionGraphCanvas } from '@/components/functions/FunctionGraphCanvas'
import { graphPresets } from '@/components/functions/functionGraphPresets'
import type { ReactNode } from 'react'

export function FunctionsComingSoon({ title }: { title: string }) {
  return (
    <Callout variant="important">
      <p>
        <strong>{title}</strong> — cette leçon arrive bientôt dans la Partie V du cours.
      </p>
    </Callout>
  )
}

function FnExample({ lines, result }: { lines: string[]; result?: string }) {
  return (
    <div className="scroll-x-card rounded-xl border border-rose-200 bg-rose-50/50 p-4 font-mono text-sm leading-relaxed">
      {lines.map((line) => (
        <p key={line} className={line.startsWith('→') ? 'text-muted' : ''}>
          {line}
        </p>
      ))}
      {result && <p className="mt-2 font-bold text-green-800">{result}</p>}
    </div>
  )
}

export const functionsViews: Record<string, () => ReactNode> = {
  'introduction-fonctions': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une <strong className="text-deep">fonction</strong> est une règle qui transforme une valeur en une autre.
          C’est l’un des concepts les plus importants en mathématiques — physique, informatique, IA, économie,
          statistiques, graphisme…
        </p>
      </FadeIn>

      <Callout variant="definition" title="La « machine »">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>On entre une valeur</li>
          <li>La machine fait un calcul</li>
          <li>Elle donne un résultat</li>
        </ul>
      </Callout>

      <MathBlock tex="f(x)=x+2" />
      <p className="text-muted">On prend <strong>x</strong>, on ajoute 2.</p>
      <FunctionGraphCanvas preset={graphPresets['x-plus-2']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Exemples</h3>
      <FnExample lines={['x = 3', 'f(3) = 3 + 2 = 5']} />
      <FnExample lines={['x = 10', 'f(10) = 10 + 2 = 12']} />

      <QuizCard
        question="f(x)=x+2. Que vaut f(5) ?"
        options={[
          { id: 'a', label: '7', correct: true },
          { id: 'b', label: '5', correct: false },
          { id: 'c', label: '10', correct: false },
        ]}
        explanation="5 + 2 = 7."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>vocabulaire</strong> (variable, image, notation).
      </Callout>
    </>
  ),

  'vocabulaire-fonctions': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Trois notions à connaître avant d’aller plus loin : <strong>variable</strong>, <strong>image</strong> et{' '}
          <strong>notation</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Variable</h3>
      <Callout variant="definition" title="Variable">
        La lettre <strong>x</strong> représente une valeur qui peut changer.
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Image et antécédent</h3>
      <MathBlock tex="f(x)=x+2 \quad,\quad f(5)=7" />
      <DataTable
        headers={['Terme', 'Exemple']}
        rows={[
          ['Antécédent', '5 (valeur entrée)'],
          ['Image', '7 (résultat f(5))'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Notation</h3>
      <MathBlock tex="f : x \mapsto x+2" />
      <p className="text-muted">« La fonction f transforme x en x + 2 ».</p>

      <QuizCard
        question="f(x)=3x. f(4)=12. Quelle est l’image de 4 ?"
        options={[
          { id: 'a', label: '12', correct: true },
          { id: 'b', label: '4', correct: false },
          { id: 'c', label: '3', correct: false },
        ]}
        explanation="L’image est le résultat : f(4)=12."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>domaine de définition</strong>.
      </Callout>
    </>
  ),

  'domaine-definition': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong className="text-deep">domaine de définition</strong> est l’ensemble des valeurs qu’on peut donner à{' '}
          <strong>x</strong> sans que le calcul « casse ».
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple 1 — tous les réels</h3>
      <MathBlock tex="f(x)=x+3" />
      <MathBlock tex="D_f=\mathbb{R}" />

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple 2 — division interdite</h3>
      <MathBlock tex="f(x)=\frac{1}{x}" />
      <p className="text-muted">On ne peut pas diviser par zéro → <strong>x ≠ 0</strong>.</p>
      <MathBlock tex="D_f=\mathbb{R}\setminus\{0\}" />

      <Callout variant="important" title="À retenir">
        Regarde toujours : dénominateur nul ? racine d’un négatif ? logarithme d’un nombre ≤ 0 ?
      </Callout>

      <QuizCard
        question="f(x)=1/(x−5). Quelle valeur de x est interdite ?"
        options={[
          { id: 'a', label: 'x = 5', correct: true },
          { id: 'b', label: 'x = 0', correct: false },
          { id: 'c', label: 'Aucune', correct: false },
        ]}
        explanation="x − 5 = 0 ⇒ x = 5."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>représentation graphique</strong> et fonctions affines.
      </Callout>
    </>
  ),

  'representation-graphique-affine': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une fonction se <strong>représente dans un repère</strong> : chaque x produit une ordonnée{' '}
          <strong>y = f(x)</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=x+1</h3>
      <DataTable
        headers={['x', 'f(x)']}
        rows={[
          ['0', '1'],
          ['1', '2'],
          ['2', '3'],
        ]}
      />
      <p className="text-sm text-muted">Points : (0,1), (1,2), (2,3) → une droite.</p>
      <FunctionGraphCanvas preset={graphPresets['x-plus-1']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction affine</h3>
      <MathBlock tex="f(x)=ax+b" />
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li><strong>a</strong> = pente (coefficient directeur)</li>
        <li><strong>b</strong> = ordonnée à l’origine</li>
      </ul>

      <h4 className="mt-6 font-semibold text-rose-800">Exemple — f(x)=2x+1</h4>
      <MathBlock tex="y=2x+1" />
      <p className="text-sm text-muted">Pente 2 : la droite monte rapidement.</p>
      <FunctionGraphCanvas preset={graphPresets['2x-plus-1']} />

      <QuizCard
        question="f(x)=−x+4. Quelle est l’ordonnée à l’origine ?"
        options={[
          { id: 'a', label: '4', correct: true },
          { id: 'b', label: '−1', correct: false },
          { id: 'c', label: '0', correct: false },
        ]}
        explanation="Dans ax+b, b = 4 est l’ordonnée à l’origine (f(0)=4)."
      />

      <Callout variant="resume">
        Partie II : <strong>fonctions constante et linéaire</strong>.
      </Callout>
    </>
  ),

  'constante-lineaire': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Deux cas très simples mais omniprésents en modélisation.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction constante</h3>
      <MathBlock tex="f(x)=5" />
      <p className="text-muted">Quel que soit x, le résultat est 5 → droite horizontale y = 5.</p>
      <FunctionGraphCanvas preset={graphPresets.constant5} />

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction linéaire</h3>
      <MathBlock tex="f(x)=ax" />
      <MathBlock tex="f(x)=3x \quad\Rightarrow\quad y=3x" />
      <FunctionGraphCanvas preset={graphPresets['3x']} showOriginMarker />
      <Callout variant="important">
        La droite passe toujours par l’origine <strong>(0, 0)</strong> (pas de terme b).
      </Callout>

      <DataTable
        headers={['Type', 'Forme', 'Graphique']}
        rows={[
          ['Constante', 'f(x)=k', 'Droite horizontale'],
          ['Linéaire', 'f(x)=ax', 'Droite par (0,0)'],
          ['Affine', 'f(x)=ax+b', 'Droite quelconque'],
        ]}
      />

      <Callout variant="resume">
        Leçon suivante : <strong>fonction quadratique</strong> (paraboles).
      </Callout>
    </>
  ),

  'quadratique': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une <strong>fonction quadratique</strong> contient x². Le graphique est une <strong>parabole</strong>.
        </p>
      </FadeIn>

      <MathBlock tex="f(x)=ax^2+bx+c" />
      <MathBlock tex="f(x)=x^2 \quad\Rightarrow\quad y=x^2" />
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />

      <h3 className="mt-8 text-xl font-bold text-deep">Observations</h3>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Si |x| devient grand → f(x) devient très grand</li>
        <li>f(−2) = (−2)² = 4 (carré toujours ≥ 0)</li>
      </ul>

      <QuizCard
        question="f(x)=x². Que vaut f(−3) ?"
        options={[
          { id: 'a', label: '9', correct: true },
          { id: 'b', label: '−9', correct: false },
          { id: 'c', label: '−3', correct: false },
        ]}
        explanation="(−3)² = 9."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>racine carrée et valeur absolue</strong>.
      </Callout>
    </>
  ),

  'racine-valeur-absolue': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Deux fonctions avec des <strong>restrictions de domaine</strong> ou une forme en « V ».</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Racine carrée</h3>
      <MathBlock tex="f(x)=\sqrt{x}" />
      <p className="text-muted">Pas de racine réelle d’un nombre négatif → <strong>x ≥ 0</strong>.</p>
      <FunctionGraphCanvas preset={graphPresets.sqrt} />

      <h3 className="mt-8 text-xl font-bold text-deep">Valeur absolue</h3>
      <MathBlock tex="f(x)=|x|" />
      <p className="text-muted">Distance à zéro : |3| = 3 et |−3| = 3.</p>
      <FunctionGraphCanvas preset={graphPresets.abs} showOriginMarker />
      <FnExample lines={['|3| = 3', '|−3| = 3']} />

      <QuizCard
        question="f(x)=√x. x = −4 est-il dans le domaine ?"
        options={[
          { id: 'a', label: 'Non', correct: true },
          { id: 'b', label: 'Oui', correct: false },
          { id: 'c', label: 'Oui, f(−4)=−2', correct: false },
        ]}
        explanation="En ℝ, √x n’est pas défini pour x < 0."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>fonction inverse</strong> 1/x.
      </Callout>
    </>
  ),

  'inverse': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          La <strong>fonction inverse</strong> modélise des relations « inversement proportionnelles ».
        </p>
      </FadeIn>

      <MathBlock tex="f(x)=\frac{1}{x}" />
      <FunctionGraphCanvas preset={graphPresets.inverse} />
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li><strong>x = 0</strong> interdit</li>
        <li>Deux branches (hyperbole), asymptotes aux axes</li>
      </ul>

      <Callout variant="important" title="Lien avec leçon 3">
        Domaine : D_f = ℝ \ {'{'}0{'}'} — même idée que 1/x mais décalage possible avec 1/(x−a).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>exponentielle et logarithme</strong>.
      </Callout>
    </>
  ),

  'exponentielle-logarithme': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Très utilisées en <strong>IA</strong>, physique, finance, croissance de population…
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exponentielle</h3>
      <MathBlock tex="f(x)=e^x" />
      <FunctionGraphCanvas preset={graphPresets.exp} />
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Croissance très rapide quand x augmente</li>
        <li>Toujours strictement positive</li>
      </ul>

      <h3 className="mt-8 text-xl font-bold text-deep">Logarithme népérien</h3>
      <MathBlock tex="f(x)=\ln(x)" />
      <FunctionGraphCanvas preset={graphPresets.ln} />
      <p className="text-muted">Inverse de l’exponentielle sur x &gt; 0 : si e^y = x alors y = ln(x).</p>
      <Callout variant="definition">Condition : <strong>x &gt; 0</strong></Callout>

      <QuizCard
        question="ln(x) est défini pour x = 0 ?"
        options={[
          { id: 'a', label: 'Non', correct: true },
          { id: 'b', label: 'Oui, ln(0)=0', correct: false },
          { id: 'c', label: 'Oui, ln(0)=1', correct: false },
        ]}
        explanation="Le logarithme népérien n’est défini que pour x > 0."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>sinus et cosinus</strong>.
      </Callout>
    </>
  ),

  'trigonometrie': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Indispensables pour les <strong>ondes</strong>, <strong>rotations</strong>, physique, jeux vidéo et
          animations.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Sinus</h3>
      <MathBlock tex="f(x)=\sin(x)" />
      <p className="text-sm text-muted">Courbe oscillante, période 2π.</p>
      <FunctionGraphCanvas preset={graphPresets.sin} />

      <h3 className="mt-8 text-xl font-bold text-deep">Cosinus</h3>
      <MathBlock tex="f(x)=\cos(x)" />
      <p className="text-sm text-muted">Même famille ; décalé par rapport au sinus.</p>
      <FunctionGraphCanvas preset={graphPresets.cos} />

      <DataTable
        headers={['Usage', 'Exemple']}
        rows={[
          ['Onde sonore / signal', 'sin(ωt)'],
          ['Rotation 2D', 'x = cos θ, y = sin θ'],
          ['Animation cyclique', 'Bouger un objet en cercle'],
        ]}
      />

      <Callout variant="resume">
        Partie III : <strong>croissance et décroissance</strong>.
      </Callout>
    </>
  ),

  'croissance-decroissance': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Sur un intervalle, une fonction peut <strong>monter</strong> (croître) ou <strong>descendre</strong>{' '}
          (décroître).
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=x²</h3>
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Pour x &lt; 0 : f décroît (en allant vers 0, x² diminue)</li>
        <li>Pour x &gt; 0 : f croît</li>
      </ul>

      <Callout variant="important">
        La monotonie dépend de l’<strong>intervalle</strong> choisi — une même fonction peut croître puis décroître.
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>maximum et minimum</strong>.
      </Callout>
    </>
  ),

  'extrema': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Un <strong>maximum</strong> est un point « le plus haut » (localement ou globalement) ; un{' '}
          <strong>minimum</strong> est le plus bas.
        </p>
      </FadeIn>

      <MathBlock tex="f(x)=x^2" />
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />
      <p className="text-muted">
        Minimum global en <strong>x = 0</strong>, valeur <strong>f(0) = 0</strong> — sommet de la parabole vers le
        bas… ici le « creux » au plus bas.
      </p>

      <Callout variant="definition" title="Vocabulaire">
        On parle d’<strong>extremum</strong> pour désigner un max ou un min.
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>résolution graphique</strong> f(x)=0.
      </Callout>
    </>
  ),

  'resolution-graphique': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Résoudre <strong>f(x) = 0</strong>, c’est chercher où la courbe <strong>coupe l’axe des x</strong>{' '}
          (ordonnée nulle).
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple</h3>
      <MathBlock tex="x^2-4=0" />
      <FunctionGraphCanvas preset={graphPresets['x-squared-minus-4']} />
      <FnExample lines={['x² = 4', 'x = −2  ou  x = 2']} result="Deux intersections avec l’axe des x." />

      <QuizCard
        question="Graphiquement, les solutions de f(x)=0 sont…"
        options={[
          { id: 'a', label: 'Les abscisses où la courbe coupe l’axe Ox', correct: true },
          { id: 'b', label: 'Les ordonnées maximales', correct: false },
          { id: 'c', label: 'Toujours x=0', correct: false },
        ]}
        explanation="f(x)=0 ⇔ y=0 ⇔ point sur l’axe horizontal."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>composition</strong> de fonctions.
      </Callout>
    </>
  ),

  'composition-fonctions': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          On peut <strong>enchaîner</strong> deux fonctions : la sortie de g devient l’entrée de f.
        </p>
      </FadeIn>

      <MathBlock tex="f(x)=x+1 \quad,\quad g(x)=2x" />
      <MathBlock tex="(f\circ g)(x)=f(g(x))" />

      <FnExample
        lines={['1. g(x) = 2x', '2. f(g(x)) = f(2x) = 2x + 1']}
        result="(f∘g)(x) = 2x + 1"
      />
      <FunctionGraphCanvas preset={graphPresets['2x-plus-1']} />

      <Callout variant="important">
        L’ordre compte : en général <strong>f∘g ≠ g∘f</strong>.
      </Callout>

      <QuizCard
        question="f(x)=x², g(x)=x+1. f(g(2)) = ?"
        options={[
          { id: 'a', label: '9', correct: true },
          { id: 'b', label: '5', correct: false },
          { id: 'c', label: '4', correct: false },
        ]}
        explanation="g(2)=3, f(3)=9."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>fonctions paires et impaires</strong>.
      </Callout>
    </>
  ),

  'paires-impaires': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Certaines fonctions ont une <strong>symétrie</strong> par rapport à l’origine ou à l’axe des y.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction paire</h3>
      <MathBlock tex="f(-x)=f(x)" />
      <p className="text-muted">Exemple : f(x) = x²</p>
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction impaire</h3>
      <MathBlock tex="f(-x)=-f(x)" />
      <p className="text-muted">Exemple : f(x) = x³</p>
      <FunctionGraphCanvas preset={graphPresets['x-cubed']} showOriginMarker />

      <QuizCard
        question="f(x)=x³ est…"
        options={[
          { id: 'a', label: 'Impaire', correct: true },
          { id: 'b', label: 'Paire', correct: false },
          { id: 'c', label: 'Ni l’un ni l’autre', correct: false },
        ]}
        explanation="(−x)³ = −x³ donc f(−x)=−f(x)."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>applications concrètes</strong>.
      </Callout>
    </>
  ),

  'applications': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Les fonctions modélisent presque tout ce qui évolue, se transforme ou se compare.</p>
      </FadeIn>

      <DataTable
        headers={['Domaine', 'Exemples de fonctions']}
        rows={[
          ['Informatique & jeux', 'Trajectoires, animations, moteurs physiques'],
          ['Data science', 'Régression linéaire, fonctions de coût, réseaux de neurones'],
          ['IA / deep learning', 'ReLU, sigmoïde, softmax — activations'],
          ['Vision & graphisme', 'Transformations, courbes de Bézier, interpolation'],
        ]}
      />

      <Callout variant="important" title="Pont avec les autres cours">
        Les <strong>équations</strong> cherchent les x où f(x)=g(x) ; l’<strong>algèbre linéaire</strong> généralise
        en plusieurs dimensions ; le <strong>deep learning</strong> empile des fonctions non linéaires (composition).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>exercices du parcours initial</strong>, puis la <strong>Partie V — étude complète</strong>.
      </Callout>
    </>
  ),

  'exercices-bilan': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Entraînement progressif — corrigés dans les accordéons.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 1</h3>
      <p>f(x)=2x+3. Calculer f(0), f(2), f(−1).</p>
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['f(0)=3', 'f(2)=7', 'f(−1)=1']} />
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 2</h3>
      <p>Domaine de f(x)=1/(x−5) ?</p>
      <Accordion title="Correction" defaultOpen={false}>
        <p className="text-sm text-muted">x − 5 ≠ 0 ⇒ <strong>x ≠ 5</strong>. D_f = ℝ \ {'{'}5{'}'}.</p>
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 3</h3>
      <MathBlock tex="x^2-9=0" />
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['x²=9', 'x=3 ou x=−3']} />
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 4</h3>
      <p>f(x)=x³ — paire ou impaire ?</p>
      <Accordion title="Correction" defaultOpen={false}>
        <p className="text-sm text-muted">
          f(−x)=(−x)³=−x³=−f(x) → <strong>impaire</strong>.
        </p>
      </Accordion>

      <Callout variant="resume" title="Résumé global">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Domaine, image, graphique</li>
          <li>Types : affine, quadratique, √, |x|, 1/x, e^x, ln, sin/cos</li>
          <li>Croissance, extrema, f(x)=0, composition, parité</li>
        </ul>
      </Callout>

      <Callout variant="important">
        <strong>Partie V</strong> : étude complète pas à pas (méthode, signe, paraboles, exemple guidé).
      </Callout>
    </>
  ),

  'etude-complete-methode': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          L’<strong className="text-deep">étude complète</strong> d’une fonction vise à comprendre tout son comportement —
          pas seulement calculer une valeur isolée.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Les 6 étapes">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>Trouver le <strong>domaine</strong></li>
          <li>Calculer des <strong>images</strong> (valeurs numériques)</li>
          <li>Étudier le <strong>signe</strong> de f(x)</li>
          <li>Étudier les <strong>variations</strong> (croissance / décroissance)</li>
          <li>Trouver <strong>maximums et minimums</strong></li>
          <li><strong>Tracer le graphique</strong></li>
        </ol>
      </Callout>

      <p className="text-muted">
        Les leçons 19 à 28 détaillent chaque étape, avec un <strong>exemple complet</strong> en leçon 25.
      </p>

      <Callout variant="resume">
        Commence par la <strong>leçon 19 — Domaine (approfondi)</strong>.
      </Callout>
    </>
  ),

  'domaine-approfondi': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le domaine est l’ensemble des valeurs <strong>autorisées</strong> pour x. Deux pièges classiques en ℝ.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">a) Division — dénominateur ≠ 0</h3>
      <MathBlock tex="f(x)=\frac{2}{x-3}" />
      <p className="text-muted">Condition : x − 3 ≠ 0 ⇒ <strong>x ≠ 3</strong></p>
      <MathBlock tex="D_f=\mathbb{R}\setminus\{3\}" />
      <FunctionGraphCanvas preset={graphPresets['rational-2-over-x-3']} />

      <h3 className="mt-8 text-xl font-bold text-deep">b) Racine carrée — radicande ≥ 0</h3>
      <MathBlock tex="f(x)=\sqrt{x-5}" />
      <p className="text-muted">x − 5 ≥ 0 ⇒ <strong>x ≥ 5</strong></p>
      <FunctionGraphCanvas preset={graphPresets['sqrt-x-minus-5']} />

      <QuizCard
        question="f(x)=√(x+1). Quelle condition sur x ?"
        options={[
          { id: 'a', label: 'x ≥ −1', correct: true },
          { id: 'b', label: 'x ≥ 0', correct: false },
          { id: 'c', label: 'x ≥ 1', correct: false },
        ]}
        explanation="x + 1 ≥ 0 ⇔ x ≥ −1."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>images et tableau de valeurs</strong>.
      </Callout>
    </>
  ),

  'images-tableau-valeurs': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Calculer une <strong>image</strong>, c’est remplacer x par un nombre dans la formule.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=x²−3x+2</h3>
      <FnExample lines={['f(0) = 0 − 0 + 2 = 2', 'f(2) = 4 − 6 + 2 = 0', 'f(−1) = 1 + 3 + 2 = 6']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Tableau de valeurs — f(x)=x²</h3>
      <DataTable
        headers={['x', 'f(x)']}
        rows={[
          ['−2', '4'],
          ['−1', '1'],
          ['0', '0'],
          ['1', '1'],
          ['2', '4'],
        ]}
      />
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />

      <Callout variant="important">
        Un tableau aide à <strong>visualiser</strong> la courbe avant de tracer le graphique complet.
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>zéros de la fonction</strong>.
      </Callout>
    </>
  ),

  'zeros-fonction': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les <strong>zéros</strong> (ou racines) sont les x tels que <strong>f(x) = 0</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=x²−4</h3>
      <MathBlock tex="x^2-4=0 \Rightarrow (x-2)(x+2)=0" />
      <FnExample lines={['x = 2  ou  x = −2']} result="Deux zéros." />
      <FunctionGraphCanvas preset={graphPresets['x-squared-minus-4']} />

      <Callout variant="definition" title="Interprétation graphique">
        Les zéros sont les <strong>abscisses</strong> où la courbe coupe l’axe des x (y = 0).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>signe et tableau de signe</strong>.
      </Callout>
    </>
  ),

  'signe-tableau': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          On cherche où f est <strong>positive</strong>, <strong>négative</strong> ou <strong>nulle</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=x−3</h3>
      <p className="text-muted">Zéro : x − 3 = 0 ⇒ <strong>x = 3</strong></p>
      <ul className="list-disc space-y-1 pl-5 text-muted">
        <li>Si x &lt; 3 → f(x) &lt; 0 (négatif)</li>
        <li>Si x &gt; 3 → f(x) &gt; 0 (positif)</li>
      </ul>
      <FunctionGraphCanvas preset={graphPresets['x-minus-3']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Tableau de signe</h3>
      <DataTable
        headers={['x', ']−∞, 3[', '3', ']3, +∞[']}
        rows={[['x − 3', '−', '0', '+']]}
      />

      <QuizCard
        question="f(x)=x−7. Où f est-elle positive ?"
        options={[
          { id: 'a', label: 'x > 7', correct: true },
          { id: 'b', label: 'x < 7', correct: false },
          { id: 'c', label: 'partout', correct: false },
        ]}
        explanation="x − 7 > 0 ⇔ x > 7."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>fonctions croissantes et décroissantes</strong>.
      </Callout>
    </>
  ),

  'variations-monotonie': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une fonction est <strong>croissante</strong> si elle monte quand x augmente, <strong>décroissante</strong> si
          elle descend.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">f(x)=x — croissante</h3>
      <FunctionGraphCanvas preset={graphPresets.x} />
      <p className="text-sm text-muted">Quand x augmente, f(x) augmente aussi (droite de pente positive).</p>

      <h3 className="mt-8 text-xl font-bold text-deep">f(x)=−x — décroissante</h3>
      <FunctionGraphCanvas preset={graphPresets['neg-x']} />
      <p className="text-sm text-muted">Quand x augmente, f(x) diminue.</p>

      <Callout variant="important">
        Pour x², la fonction décroît sur ]−∞, 0[ puis croît sur ]0, +∞[ — la monotonie dépend de l’intervalle.
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>paraboles, sommet et axe de symétrie</strong>.
      </Callout>
    </>
  ),

  'paraboles-sommet': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les fonctions <strong>du second degré</strong> f(x)=ax²+bx+c ont une forme de parabole.
        </p>
      </FadeIn>

      <MathBlock tex="f(x)=ax^2+bx+c" />
      <FunctionGraphCanvas preset={graphPresets['ax2-bx-c']} showOriginMarker />

      <DataTable
        headers={['Cas', 'Forme']}
        rows={[
          ['a > 0', 'Parabole ouverte vers le haut (minimum)'],
          ['a < 0', 'Parabole ouverte vers le bas (maximum)'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Sommet — f(x)=x²</h3>
      <p className="text-muted">Point le plus bas : <strong>(0, 0)</strong></p>
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />

      <h3 className="mt-8 text-xl font-bold text-deep">Axe de symétrie</h3>
      <MathBlock tex="x_s=\frac{-b}{2a}" />

      <Callout variant="resume">
        Leçon suivante : <strong>exemple d’étude complète</strong> (x²−4x+3).
      </Callout>
    </>
  ),

  'etude-complete-exemple': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Étude guidée de <strong>f(x) = x² − 4x + 3</strong> — toutes les étapes réunies.
        </p>
      </FadeIn>

      <h3 className="mt-6 text-lg font-bold text-deep">1. Domaine</h3>
      <p className="text-muted">Polynôme → <strong>D_f = ℝ</strong></p>

      <h3 className="mt-6 text-lg font-bold text-deep">2. Images</h3>
      <FnExample lines={['f(0) = 3', 'f(1) = 1 − 4 + 3 = 0', 'f(3) = 9 − 12 + 3 = 0']} />

      <h3 className="mt-6 text-lg font-bold text-deep">3. Racines</h3>
      <MathBlock tex="x^2-4x+3=0 \Rightarrow (x-1)(x-3)=0" />
      <p className="text-muted">Zéros : <strong>x = 1</strong> et <strong>x = 3</strong></p>

      <h3 className="mt-6 text-lg font-bold text-deep">4. Sommet</h3>
      <MathBlock tex="x_s=\frac{-(-4)}{2(1)}=2 \quad,\quad f(2)=4-8+3=-1" />
      <p className="text-muted">Sommet : <strong>(2, −1)</strong> — minimum car a = 1 &gt; 0</p>

      <FunctionGraphCanvas preset={graphPresets['x-squared-minus-4x-plus-3']} />

      <Callout variant="resume" title="Synthèse graphique">
        Parabole coupant l’axe en 1 et 3, minimum en (2, −1).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>composée et réciproque</strong>.
      </Callout>
    </>
  ),

  'composee-reciproque': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Deux opérations avancées : enchaîner des fonctions ou les « inverser ».</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction composée</h3>
      <MathBlock tex="f(x)=x+1 \quad,\quad g(x)=x^2 \quad\Rightarrow\quad (f\circ g)(x)=g(x)^2+1=x^2+1" />
      <FnExample lines={['g(x) = x²', 'f(g(x)) = x² + 1']} />
      <FunctionGraphCanvas preset={graphPresets['x-squared-plus-1']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Fonction réciproque</h3>
      <MathBlock tex="f(x)=x+3 \quad\Rightarrow\quad f^{-1}(x)=x-3" />
      <Callout variant="important">
        f⁻¹ « annule » f : appliquer f puis f⁻¹ (ou l’inverse) redonne x (sur le bon domaine).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>applications en informatique</strong>.
      </Callout>
    </>
  ),

  'applications-informatique': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Les fonctions sont le langage des programmes qui modélisent le réel.</p>
      </FadeIn>

      <DataTable
        headers={['Domaine', 'Rôle des fonctions']}
        rows={[
          ['IA / deep learning', 'Sigmoid, ReLU, tanh — activations des neurones'],
          ['Jeux vidéo', 'Trajectoires, collisions, animations'],
          ['Graphiques', 'Courbes, interpolations, rendu 2D/3D'],
        ]}
      />

      <Callout variant="important" title="Lien avec ce cours">
        Tu connais déjà affines, quadratiques, exp, ln, sin — ce sont les briques des modèles plus complexes.
      </Callout>

      <Callout variant="resume">
        Dernière leçon de la Partie V : <strong>exercices et bilan final</strong>.
      </Callout>
    </>
  ),

  'exercices-etude-bilan': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Exercices d’entraînement — corrigés dans les accordéons.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 1</h3>
      <p>f(x)=2x²−8. Calculer f(0) et résoudre f(x)=0.</p>
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['f(0) = −8', '2x² − 8 = 0 ⇒ x² = 4 ⇒ x = ±2']} />
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 2</h3>
      <p>Domaine de f(x)=√(x+1) ?</p>
      <Accordion title="Correction" defaultOpen={false}>
        <p className="text-sm text-muted">x + 1 ≥ 0 ⇒ <strong>x ≥ −1</strong></p>
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 3</h3>
      <p>Signe de f(x)=x−7 ?</p>
      <Accordion title="Correction" defaultOpen={false}>
        <p className="text-sm text-muted">Négatif si x &lt; 7, nul en 7, positif si x &gt; 7.</p>
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 4</h3>
      <p>f(x)=2x+1, g(x)=x². Calculer (f∘g)(x).</p>
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['(f∘g)(x) = f(x²) = 2x² + 1']} />
      </Accordion>

      <Callout variant="resume" title="À retenir absolument">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Domaine, image, graphique, signe, variations</li>
          <li>Familles clés : affine, quadratique, racine, inverse, exp, ln, trig</li>
        </ul>
      </Callout>

      <Callout variant="important">
        <strong>Partie VI</strong> : limites, continuité et introduction aux dérivées.
      </Callout>
    </>
  ),

  'introduction-limites': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Les <strong className="text-deep">limites</strong> décrivent le comportement de f(x) quand x devient très grand,
          très petit, ou se rapproche d’une valeur — base des dérivées, de l’analyse, de la physique et de l’IA.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Idée intuitive — f(x)=x+1</h3>
      <FnExample lines={['x = 100  →  f(100) = 101', 'x = 1000 →  f(1000) = 1001']} />
      <p className="text-muted">Quand x grandit sans fin, f(x) aussi :</p>
      <MathBlock tex="\lim_{x\to+\infty}(x+1)=+\infty" />
      <FunctionGraphCanvas preset={graphPresets['x-plus-1']} />

      <h3 className="mt-8 text-xl font-bold text-deep">Notation</h3>
      <MathBlock tex="\lim_{x\to a}f(x)" />
      <p className="text-muted">Comportement de f(x) lorsque x se rapproche de <strong>a</strong> (sans forcément valoir a).</p>

      <h3 className="mt-8 text-xl font-bold text-deep">Limite finie simple</h3>
      <MathBlock tex="\lim_{x\to3}(x+2)=3+2=5" />
      <FunctionGraphCanvas preset={graphPresets['x-plus-2']} />

      <Callout variant="definition" title="Interprétation graphique">
        Quand x → 3, les images se rapprochent de <strong>5</strong> — la limite parle du voisinage du point.
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>limites à gauche et à droite</strong>.
      </Callout>
    </>
  ),

  'limites-gauche-droite': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          On peut approcher <strong>a</strong> par la gauche (x → a⁻) ou par la droite (x → a⁺).
        </p>
      </FadeIn>

      <MathBlock tex="\lim_{x\to a^-}f(x) \quad\text{et}\quad \lim_{x\to a^+}f(x)" />

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple — f(x)=1/x près de 0</h3>
      <FunctionGraphCanvas preset={graphPresets.inverse} />

      <DataTable
        headers={['Approche', 'x', 'f(x)', 'Limite']}
        rows={[
          ['Droite (0⁺)', '0,1 → 0,01', '10 → 100', '+∞'],
          ['Gauche (0⁻)', '−0,1 → −0,01', '−10 → −100', '−∞'],
        ]}
      />

      <MathBlock tex="\lim_{x\to0^+}\frac{1}{x}=+\infty \quad,\quad \lim_{x\to0^-}\frac{1}{x}=-\infty" />

      <Callout variant="important" title="Limite en 0 n’existe pas">
        Les limites à gauche et à droite doivent être <strong>égales</strong> pour que la limite en 0 de 1/x existe. Ici : −∞ ≠ +∞.
      </Callout>

      <QuizCard
        question="Pour que la limite de f(x) en a existe, il faut…"
        options={[
          { id: 'a', label: 'Limite à gauche = limite à droite', correct: true },
          { id: 'b', label: 'f(a) = 0', correct: false },
          { id: 'c', label: 'f est paire', correct: false },
        ]}
        explanation="C’est la condition fondamentale sur les limites unilatérales."
      />

      <Callout variant="resume">
        Leçon suivante : <strong>limites à l’infini et asymptotes</strong>.
      </Callout>
    </>
  ),

  'limites-infinies-asymptotes': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          On étudie aussi le comportement de f(x) quand x → +∞ ou x → −∞, ainsi que les <strong>asymptotes</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">f(x)=x²</h3>
      <MathBlock tex="\lim_{x\to+\infty}x^2=+\infty \quad,\quad \lim_{x\to-\infty}x^2=+\infty" />
      <p className="text-sm text-muted">Ex. x = −100 → x² = 10 000.</p>
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />

      <h3 className="mt-8 text-xl font-bold text-deep">f(x)=1/x — limites à l’infini</h3>
      <MathBlock tex="\lim_{x\to+\infty}\frac{1}{x}=0 \quad,\quad \lim_{x\to-\infty}\frac{1}{x}=0" />
      <FunctionGraphCanvas preset={graphPresets.inverse} />

      <DataTable
        headers={['Type', 'Exemple 1/x', 'Équation']}
        rows={[
          ['Asymptote verticale', 'Cassure en x = 0', 'x = 0'],
          ['Asymptote horizontale', 'Courbe → 0 quand |x| → ∞', 'y = 0'],
        ]}
      />

      <Callout variant="definition" title="Asymptote">
        Droite que la courbe <strong>approche</strong> sans nécessairement la couper (sauf cas particuliers).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>formes indéterminées et continuité</strong>.
      </Callout>
    </>
  ),

  'formes-indeterminees-continuite': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Parfois le remplacement direct donne une <strong>forme indéterminée</strong> — il faut transformer l’expression.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exemple 0/0</h3>
      <MathBlock tex="\lim_{x\to2}\frac{x^2-4}{x-2}" />
      <p className="text-muted">En x=2 : 0/0. Factorisation :</p>
      <MathBlock tex="\frac{(x-2)(x+2)}{x-2}=x+2 \quad (x\neq2)" />
      <MathBlock tex="\lim_{x\to2}(x+2)=4" />
      <FunctionGraphCanvas preset={graphPresets['rational-x2-4-over-x-2']} />
      <p className="text-xs text-muted">Trou en x=2 : la limite existe (4) mais f(2) n’est pas définie sur la fraction brute.</p>

      <h3 className="mt-8 text-xl font-bold text-deep">Continuité</h3>
      <Callout variant="definition" title="Intuition">
        Courbe traçable <strong>sans lever le stylo</strong> — pas de « saut ».
      </Callout>

      <DataTable
        headers={['Fonction', 'En x=0']}
        rows={[
          ['x²', 'Continue partout'],
          ['1/x', 'Non définie en 0 — discontinuité'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Condition en a</h3>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">
        <li>f(a) existe</li>
        <li>la limite de f en a existe</li>
        <li>cette limite vaut f(a)</li>
      </ol>

      <h4 className="mt-4 font-semibold text-rose-800">Exemple — f(x)=x+1 en 2</h4>
      <FnExample lines={['f(2) = 3', 'lim_{x→2}(x+1) = 3']} result="Continue en 2." />

      <Callout variant="resume">
        Leçon suivante : <strong>introduction aux dérivées</strong>.
      </Callout>
    </>
  ),

  'introduction-derivees': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          La <strong>dérivée</strong> mesure la <strong>vitesse de variation</strong> — pente, tangente, optimisation, IA.
        </p>
      </FadeIn>

      <Callout variant="important" title="Applications">
        Vitesse d’un véhicule, apprentissage des réseaux de neurones (gradient), physique, recherche de max/min.
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Idée sur f(x)=x²</h3>
      <FunctionGraphCanvas preset={graphPresets['x-squared']} showOriginMarker />
      <p className="text-muted">La pente change : faible près de 0, forte loin de 0. La dérivée quantifie cela.</p>

      <Callout variant="definition" title="Tangente">
        Droite qui <strong>touche</strong> la courbe localement — sa pente est f′(x).
      </Callout>

      <MathBlock tex="f(x)=x^2 \Rightarrow f'(x)=2x" />
      <FnExample lines={["f'(3) = 6 → pente 6 en x = 3"]} />

      <h3 className="mt-8 text-xl font-bold text-deep">Dérivées à connaître</h3>
      <DataTable
        headers={['f(x)', "f'(x)"]}
        rows={[
          ['c (constante)', '0'],
          ['x', '1'],
          ['x²', '2x'],
          ['x³', '3x²'],
          ['x^n', 'nx^{n-1}'],
        ]}
      />

      <MathBlock tex="\frac{d}{dx}(x^n)=nx^{n-1}" />
      <p className="text-muted">Ex. f(x)=x⁵ → f′(x)=5x⁴</p>

      <Callout variant="important">
        Les dérivées servent à trouver extrema, optimiser des modèles et entraîner les réseaux (descente de gradient).
      </Callout>

      <Callout variant="resume">
        Leçon suivante : <strong>exercices limites & dérivées</strong>.
      </Callout>
    </>
  ),

  'exercices-limites-derivees': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">Exercices — corrigés dans les accordéons.</p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 1</h3>
      <MathBlock tex="\lim_{x\to3}(x^2+1)" />
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['= 9 + 1 = 10']} />
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 2</h3>
      <MathBlock tex="\lim_{x\to0}\frac{1}{x}" />
      <Accordion title="Correction" defaultOpen={false}>
        <p className="text-sm text-muted">
          Limite à gauche = −∞, à droite = +∞ → la limite <strong>n’existe pas</strong>.
        </p>
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 3</h3>
      <p>Dériver f(x)=x⁴</p>
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={["f'(x) = 4x³"]} />
      </Accordion>

      <h3 className="mt-8 text-xl font-bold text-deep">Exercice 4</h3>
      <p>Asymptotes de f(x)=1/x ?</p>
      <Accordion title="Correction" defaultOpen={false}>
        <FnExample lines={['Verticale : x = 0', 'Horizontale : y = 0']} />
      </Accordion>

      <Callout variant="resume" title="Bilan">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Limites</strong> — comportement local et à l’infini</li>
          <li><strong>Asymptotes</strong> — directions de la courbe</li>
          <li><strong>Dérivées</strong> — taux de variation, pente, optimisation</li>
        </ul>
      </Callout>

      <Callout variant="important">
        <strong>Partie VII (bientôt)</strong> : dérivées avancées, intégrales, optimisation, équations différentielles & IA.
      </Callout>
    </>
  ),
}
