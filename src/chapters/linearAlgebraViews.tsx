import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { Accordion } from '@/components/ui/Accordion'
import { QuizCard } from '@/components/ui/QuizCard'
import { Vector2DPlayground } from '@/components/algebra/Vector2DPlayground'
import { AlgebraCoursePlan } from '@/components/algebra/AlgebraCoursePlan'
import { AlgebraExercises } from '@/components/algebra/AlgebraExercises'
import { Exercise1Correction } from '@/components/algebra/Exercise1Correction'
import { LinearCombinationPlayground } from '@/components/algebra/LinearCombinationPlayground'
import { Lesson2Exercises } from '@/components/algebra/Lesson2Exercises'
import { Lesson3Exercises } from '@/components/algebra/Lesson3Exercises'
import { Lesson4Exercises } from '@/components/algebra/Lesson4Exercises'
import { Lesson5Exercises } from '@/components/algebra/Lesson5Exercises'
import { Lesson6DeterminantExercises } from '@/components/algebra/Lesson6DeterminantExercises'
import { Lesson7SystemesExercises } from '@/components/algebra/Lesson7SystemesExercises'
import { Lesson8DotProductExercises } from '@/components/algebra/Lesson8DotProductExercises'
import { DotProductPlayground } from '@/components/algebra/DotProductPlayground'
import { ProjectionPlayground } from '@/components/algebra/ProjectionPlayground'
import { Lesson9ProjectionExercises } from '@/components/algebra/Lesson9ProjectionExercises'
import { MatrixOperationBlock } from '@/components/algebra/MatrixOperationBlock'
import { DataTable } from '@/components/ui/DataTable'
import type { ReactNode } from 'react'

export const linearAlgebraViews: Record<string, () => ReactNode> = {
  'introduction-vecteurs': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Un <strong className="text-deep">vecteur</strong> possède une <em>direction</em>, un <em>sens</em> et une{' '}
          <em>longueur (norme)</em>. C’est la brique de base de l’algèbre linéaire en vision par ordinateur et en deep
          learning.
        </p>
      </FadeIn>

      <Callout variant="definition" title="Définition intuitive">
        <p>En 2D, un vecteur est une flèche ou une liste de nombres.</p>
        <MathBlock tex="\vec{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}" />
        <p>
          En Python (NumPy)&nbsp;: <code className="rounded bg-slate-100 px-1">np.array([3, 4])</code>.
        </p>
      </Callout>

      <h3 className="mt-8 text-xl font-bold text-deep">Interprétation géométrique</h3>
      <p>
        Le vecteur <strong>(3, 4)</strong> signifie 3 unités sur l’axe <em>x</em> et 4 sur l’axe <em>y</em>. Sa norme
        suit le théorème de Pythagore&nbsp;:
      </p>
      <MathBlock tex="\|\vec{v}\| = \sqrt{3^2 + 4^2} = 5" />

      <Vector2DPlayground />

      <h3 className="mt-8 text-xl font-bold text-deep">Opérations sur les vecteurs</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Addition', tex: '\\begin{pmatrix}1\\\\2\\end{pmatrix}+\\begin{pmatrix}3\\\\4\\end{pmatrix}=\\begin{pmatrix}4\\\\6\\end{pmatrix}' },
          { title: 'Soustraction', tex: '\\begin{pmatrix}3\\\\4\\end{pmatrix}-\\begin{pmatrix}1\\\\2\\end{pmatrix}=\\begin{pmatrix}2\\\\2\\end{pmatrix}' },
          { title: 'Scalaire', tex: '2\\begin{pmatrix}3\\\\4\\end{pmatrix}=\\begin{pmatrix}6\\\\8\\end{pmatrix}' },
        ].map((op) => (
          <div key={op.title} className="scroll-x-card rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="mb-2 text-sm font-bold text-violet-700">{op.title}</p>
            <MathBlock tex={op.tex} className="!my-0 !border-0 !bg-transparent !p-0" />
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-xl font-bold text-deep">Produit scalaire</h3>
      <p>Mesure l’<strong>alignement</strong> de deux vecteurs&nbsp;:</p>
      <MathBlock tex="\vec{a}\cdot\vec{b} = a_x b_x + a_y b_y" />
      <MathBlock tex="\cos(\theta) = \frac{\vec{a}\cdot\vec{b}}{\|\vec{a}\|\,\|\vec{b}\|}" />

      <Callout variant="important" title="Vision par ordinateur">
        Les <em>vecteurs de caractéristiques</em> (features) représentent une image. Deux images similaires → vecteurs
        proches → petit angle → grand produit scalaire (après normalisation).
      </Callout>

      <Accordion title="Exemple NumPy (produit scalaire & angle)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

a = np.array([2, 1])
b = np.array([3, 4])
dot = np.dot(a, b)
angle = np.degrees(np.arccos(dot / (np.linalg.norm(a) * np.linalg.norm(b))))`}
        </pre>
      </Accordion>

      <QuizCard
        question="Pour v⃗ = (3, 4), quelle est la norme ‖v⃗‖ ?"
        options={[
          { id: 'a', label: '5', correct: true },
          { id: 'b', label: '7', correct: false },
          { id: 'c', label: '25', correct: false },
        ]}
        explanation="‖v⃗‖ = √(3² + 4²) = √25 = 5 (triplet pythagoricien 3-4-5)."
      />

      <AlgebraExercises />
      <Exercise1Correction />

      <Callout variant="resume">
        Passe à la <strong>leçon 2</strong> pour les espaces vectoriels et les combinaisons linéaires.
      </Callout>
    </>
  ),

  'espace-vectoriel': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          C’est ici que la <strong className="text-deep">logique profonde</strong> derrière les vecteurs se révèle — base
          de l’algèbre linéaire et de nombreux algorithmes d’IA.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1. Qu’est-ce qu’un espace vectoriel ?</h3>
      <Callout variant="definition" title="Définition">
        <p>
          Ensemble où l’on peut <strong>additionner</strong> des vecteurs, les <strong>multiplier</strong> par un scalaire,
          et rester dans le même ensemble.
        </p>
        <p className="mt-2 italic text-muted">
          Un monde où les vecteurs vivent, se déplacent, et conservent leur nature de vecteurs.
        </p>
      </Callout>

      <h4 className="mt-6 font-semibold text-deep">Exemple — ℝ²</h4>
      <MathBlock tex="\mathbb{R}^2 = \left\{ \begin{pmatrix} x \\ y \end{pmatrix} \;\middle|\; x, y \in \mathbb{R} \right\}" />
      <MathBlock tex="(2,3)+(1,5)=(3,8)\in\mathbb{R}^2,\quad 2\times(2,3)=(4,6)\in\mathbb{R}^2" />

      <h4 className="mt-6 font-semibold text-deep">Exemple — ℝ³</h4>
      <p>Positions 3D, caméras, voxels en vision par ordinateur.</p>
      <MathBlock tex="\mathbb{R}^3 = \{ (x,y,z) \mid x,y,z \in \mathbb{R} \}" />

      <Callout variant="important" title="Contre-exemple ❌">
        <strong>E = {'{'}(x,y) ∈ ℝ² | x, y &gt; 0{'}'}</strong> n’est pas un espace vectoriel : un scalaire négatif peut
        faire sortir de E.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Combinaison linéaire</h3>
      <Callout variant="definition" title="Combinaison linéaire">
        <p>Multiplier des vecteurs par des scalaires, puis les additionner.</p>
        <MathBlock tex="\vec{v} = \alpha_1 \vec{u}_1 + \alpha_2 \vec{u}_2 + \cdots + \alpha_n \vec{u}_n" />
      </Callout>

      <h4 className="mt-4 font-semibold text-violet-700">Exemple — u⃗₁=(1,0), u⃗₂=(0,1)</h4>
      <MathBlock tex="3\vec{u}_1+2\vec{u}_2=3(1,0)+2(0,1)=(3,2)" />

      <LinearCombinationPlayground
        title="Démo — base canonique"
        initialAlpha1={3}
        initialAlpha2={2}
        hint="Un vecteur → droite par l’origine. Deux vecteurs non alignés → tout le plan ℝ²."
      />

      <h4 className="mt-8 font-semibold text-violet-700">Exercice — u⃗₁=(1,2), u⃗₂=(3,1)</h4>
      <LinearCombinationPlayground
        u1={[1, 2]}
        u2={[3, 1]}
        initialAlpha1={2}
        initialAlpha2={-1}
        title="Démo — 2u⃗₁ − u⃗₂ = (−1, 3)"
        hint="Modifie α₁, α₂ pour explorer le plan engendré par u⃗₁ et u⃗₂."
      />

      <Accordion title="Interprétation géométrique" defaultOpen={false}>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li><strong>Un vecteur</strong> → combinaisons = droite par l’origine.</li>
          <li><strong>Deux vecteurs non alignés</strong> → combinaisons = tout le plan.</li>
        </ul>
      </Accordion>

      <h3 className="mt-10 text-xl font-bold text-deep">3. Vision par ordinateur</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { t: 'PCA', d: 'Image = combinaison de vecteurs de base.' },
          { t: 'RVB', d: 'Couleur = combinaison linéaire R, V, B.' },
          { t: 'Filtres', d: 'Pixel = combinaison des voisins.' },
        ].map((item) => (
          <div key={item.t} className="scroll-x-card rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-sm">
            <p className="font-bold text-violet-800">{item.t}</p>
            <p className="mt-1 text-muted">{item.d}</p>
          </div>
        ))}
      </div>

      <QuizCard
        question="E = {(x,y) | x>0, y>0} est-il un espace vectoriel ?"
        options={[
          { id: 'a', label: 'Non', correct: true },
          { id: 'b', label: 'Oui', correct: false },
          { id: 'c', label: 'Oui, c’est ℝ²', correct: false },
        ]}
        explanation="(1,1) × (−1) = (−1,−1) ∉ E."
      />

      <Lesson2Exercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 3 — Base et dimension</strong> pour formaliser indépendance et dimension.
      </Callout>
    </>
  ),

  'base-dimension': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Comment quelques vecteurs bien choisis peuvent <strong className="text-deep">engendrer</strong> tout un
          espace&nbsp;? C’est le rôle des <strong>bases</strong> et de la <strong>dimension</strong>.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1. Motivation intuitive</h3>
      <p>
        Pour décrire n’importe quel point du plan ℝ², deux vecteurs non alignés suffisent — pas une infinité de
        directions. Ces vecteurs forment une <strong>base</strong> du plan.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Définition — Base d’un espace vectoriel</h3>
      <Callout variant="definition" title="Base">
        <p>Un ensemble de vecteurs est une <strong>base</strong> si&nbsp;:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>ils sont <strong>linéairement indépendants</strong>&nbsp;;</li>
          <li>ils <strong>engendrent tout l’espace</strong> (span = espace entier).</li>
        </ol>
        <p className="mt-3 italic text-muted">
          Ensemble <em>minimal</em> pour fabriquer tous les autres vecteurs par combinaison linéaire.
        </p>
      </Callout>

      <h4 className="mt-6 font-semibold text-violet-700">Exemple 1 — Base canonique de ℝ²</h4>
      <MathBlock tex="\vec{e}_1 = (1, 0), \quad \vec{e}_2 = (0, 1)" />
      <MathBlock tex="\vec{v} = (x, y) = x\vec{e}_1 + y\vec{e}_2" />
      <LinearCombinationPlayground
        title="Démo — base canonique (e⃗₁, e⃗₂)"
        initialAlpha1={2}
        initialAlpha2={-1}
        hint="Tout (x, y) est une combinaison de e⃗₁ et e⃗₂."
      />

      <h4 className="mt-8 font-semibold text-violet-700">Exemple 2 — Base canonique de ℝ³</h4>
      <MathBlock tex="\vec{e}_1=(1,0,0),\;\vec{e}_2=(0,1,0),\;\vec{e}_3=(0,0,1)" />
      <MathBlock tex="(x,y,z)=x\vec{e}_1+y\vec{e}_2+z\vec{e}_3" />

      <h3 className="mt-10 text-xl font-bold text-deep">3. Indépendance linéaire</h3>
      <Callout variant="definition" title="Indépendance">
        <p>
          Des vecteurs sont <strong>linéairement indépendants</strong> si la seule combinaison qui donne le vecteur nul
          est celle où tous les coefficients sont nuls&nbsp;:
        </p>
        <MathBlock tex="\alpha_1\vec{v}_1+\cdots+\alpha_n\vec{v}_n=\vec{0}\;\Rightarrow\;\alpha_1=\cdots=\alpha_n=0" />
        <p className="mt-2 text-sm text-muted">
          Sinon ils sont <strong>dépendants</strong> : l’un s’exprime comme combinaison des autres.
        </p>
      </Callout>

      <h4 className="mt-6 font-semibold text-violet-700">Exemple 3 — u⃗₁=(1,2), u⃗₂=(3,1) dans ℝ²</h4>
      <p>On cherche α, β tels que α(1,2) + β(3,1) = (0,0)&nbsp;:</p>
      <MathBlock tex="\begin{cases}\alpha+3\beta=0\\2\alpha+\beta=0\end{cases}" />
      <p className="text-sm text-muted">
        De la 1ʳᵉ&nbsp;: α = −3β. Dans la 2ᵉ&nbsp;: −6β + β = 0 ⇒ β = 0, donc α = 0.
      </p>
      <p className="mt-2 font-medium text-green-800">
        ✅ u⃗₁ et u⃗₂ sont indépendants — ils forment une base de ℝ² (comme en leçon 2).
      </p>
      <LinearCombinationPlayground
        u1={[1, 2]}
        u2={[3, 1]}
        initialAlpha1={1}
        initialAlpha2={0}
        title="Démo — base alternative de ℝ²"
        hint="Deux vecteurs non colinéaires → le span remplit tout le plan."
      />

      <h4 className="mt-8 font-semibold text-violet-700">Contre-exemple — vecteurs dépendants</h4>
      <MathBlock tex="\vec{u}_1=(1,1),\quad\vec{u}_2=(2,2)=2\vec{u}_1" />
      <LinearCombinationPlayground
        u1={[1, 1]}
        u2={[2, 2]}
        initialAlpha1={1}
        initialAlpha2={-0.5}
        title="Démo — vecteurs colinéaires (pas une base de ℝ²)"
        hint="Les combinaisons ne remplissent qu’une droite — dimension 1."
      />

      <h3 className="mt-10 text-xl font-bold text-deep">4. Dimension</h3>
      <p>
        La <strong>dimension</strong> d’un espace vectoriel est le <strong>nombre de vecteurs dans une base</strong>{' '}
        (toutes les bases ont le même cardinal).
      </p>
      <DataTable
        headers={['Espace', 'Base canonique', 'Dimension']}
        rows={[
          ['ℝ¹', '(1)', '1'],
          ['ℝ²', '(1,0), (0,1)', '2'],
          ['ℝ³', '(1,0,0), (0,1,0), (0,0,1)', '3'],
        ]}
      />
      <Callout variant="important" title="Intuition">
        La dimension = nombre de <strong>degrés de liberté</strong> : une droite (1), un plan (2), l’espace 3D (3).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5. Vision par ordinateur</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            t: 'PCA',
            d: 'Chercher une base compacte pour représenter des images avec moins de dimensions.',
          },
          {
            t: 'Descripteurs (SIFT, HOG…)',
            d: 'Vecteurs de grande dimension projetés dans des bases orthogonales pour simplifier l’analyse.',
          },
        ].map((item) => (
          <div key={item.t} className="scroll-x-card rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-sm">
            <p className="font-bold text-violet-800">{item.t}</p>
            <p className="mt-1 text-muted">{item.d}</p>
          </div>
        ))}
      </div>

      <QuizCard
        question="u⃗₁=(1,1) et u⃗₂=(2,2) forment-ils une base de ℝ² ?"
        options={[
          { id: 'a', label: 'Non — ils sont colinéaires', correct: true },
          { id: 'b', label: 'Oui', correct: false },
          { id: 'c', label: 'Oui, car ils sont dans ℝ²', correct: false },
        ]}
        explanation="u⃗₂ = 2u⃗₁ : le span est une droite (dim. 1), pas tout ℝ²."
      />

      <Lesson3Exercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 4 — Introduction aux matrices</strong>.
      </Callout>
    </>
  ),

  'matrices-definition': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Une <strong className="text-deep">matrice</strong> est un tableau rectangulaire de nombres — fondement de la
          vision par ordinateur, du machine learning et des réseaux de neurones.
        </p>
      </FadeIn>

      <h3 className="mt-8 text-xl font-bold text-deep">1. Définition</h3>
      <MathBlock tex="A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}" />
      <p>
        Ici, <strong>A</strong> est une matrice <strong>2×3</strong> (2 lignes, 3 colonnes).
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Notation générale</h3>
      <MathBlock tex="A = [a_{ij}] \quad \text{où } i = \text{ligne},\; j = \text{colonne}" />
      <MathBlock tex="A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}" />

      <h3 className="mt-10 text-xl font-bold text-deep">3. Types de matrices</h3>
      <DataTable
        headers={['Type', 'Définition', 'Exemple (idée)']}
        rows={[
          ['Carrée', 'même nombre de lignes et colonnes', '2×2'],
          ['Colonne', '1 seule colonne', '3×1'],
          ['Ligne', '1 seule ligne', '1×3'],
          ['Nulle', 'tous les éléments = 0', '0 partout'],
          ['Identité I', '1 sur la diagonale', 'diag(1,1)'],
          ['Diagonale', '≠ 0 seulement sur la diagonale', 'diag(4,7)'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">4. Opérations sur les matrices</h3>

      <h4 className="mt-6 font-semibold text-violet-700">a) Addition</h4>
      <p>Deux matrices s’additionnent <strong>si elles ont la même dimension</strong> (élément par élément).</p>
      <MathBlock tex="A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\; B=\begin{bmatrix}5&6\\7&8\end{bmatrix}" />
      <MathBlock tex="A+B=\begin{bmatrix}6&8\\10&12\end{bmatrix}" />

      <h4 className="mt-8 font-semibold text-violet-700">b) Multiplication par un scalaire</h4>
      <MathBlock tex="2A=\begin{bmatrix}2&4\\6&8\end{bmatrix}" />

      <h4 className="mt-8 font-semibold text-violet-700">c) Multiplication de matrices</h4>
      <Callout variant="important" title="Condition de compatibilité">
        Le <strong>nombre de colonnes</strong> de la première = le <strong>nombre de lignes</strong> de la deuxième.
      </Callout>
      <MathBlock tex="A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\; B=\begin{bmatrix}2&0\\1&2\end{bmatrix}" />
      <MathBlock tex="A\times B=\begin{bmatrix}4&4\\10&8\end{bmatrix}" />
      <p className="text-sm text-muted">
        Ex.&nbsp;: (AB)₁₁ = 1×2 + 2×1 = 4 ; (AB)₁₂ = 1×0 + 2×2 = 4.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">5. Interprétation géométrique</h3>
      <p>Une matrice peut <strong>transformer</strong> un vecteur colonne&nbsp;:</p>
      <MathBlock tex="A=\begin{bmatrix}2&0\\0&3\end{bmatrix},\quad v=\begin{bmatrix}1\\1\end{bmatrix},\quad Av=\begin{bmatrix}2\\3\end{bmatrix}" />
      <Callout variant="definition" title="Lecture géométrique">
        Ici, <em>x</em> est multiplié par 2 et <em>y</em> par 3 — la matrice <strong>étire</strong> le vecteur. En vision,
        ce type d’opération sert au redimensionnement, à la rotation ou à la translation (via matrices homogènes).
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Exemples concrets</h3>
      <DataTable
        headers={['Domaine', 'Utilisation']}
        rows={[
          ['Vision par ordinateur', 'Transformations d’image (rotation, zoom, translation)'],
          ['Réseaux de neurones', 'Poids = matrices ; propagation entre couches'],
          ['Analyse de données', 'Dataset : lignes = exemples, colonnes = variables'],
          ['Graphes', 'Matrice d’adjacence des connexions'],
        ]}
      />

      <QuizCard
        question="Peut-on calculer A×B si A est 2×3 et B est 2×2 ?"
        options={[
          { id: 'a', label: 'Non — 3 ≠ 2 (colonnes de A ≠ lignes de B)', correct: true },
          { id: 'b', label: 'Oui, toujours', correct: false },
          { id: 'c', label: 'Oui si A est carrée', correct: false },
        ]}
        explanation="Pour A(m×n) et B(p×q), il faut n = p."
      />

      <Lesson4Exercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 5 — Opérations fondamentales</strong> (transposée, inverse, déterminant…).
      </Callout>
    </>
  ),

  'operations-matrices': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Au-delà de l’addition et du produit, les matrices possèdent des opérations clés en{' '}
          <strong className="text-deep">vision</strong>, <strong className="text-deep">ML</strong> et{' '}
          <strong className="text-deep">IA</strong>. Chaque notion ci-dessous inclut un exemple numérique et du code
          Python.
        </p>
      </FadeIn>

      <MatrixOperationBlock
        step="1 — Transposée"
        title="La transposée Aᵀ"
        definition="Échanger les lignes et les colonnes de A."
        tex={[
          'A=\\begin{bmatrix}1&2&3\\\\4&5&6\\end{bmatrix}\\quad\\Rightarrow\\quad A^T=\\begin{bmatrix}1&4\\\\2&5\\\\3&6\\end{bmatrix}',
        ]}
        python={`import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])
print("A^T =\\n", A.T)`}
        utility="Produits scalaires, régressions linéaires, couches de réseaux (dimensions compatibles)."
      />

      <MatrixOperationBlock
        step="2 — Inverse"
        title="La matrice inverse A⁻¹"
        definition="Pour A carrée inversible : A × A⁻¹ = A⁻¹ × A = I (matrice identité)."
        tex={[
          'I=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}',
          'A=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix},\\quad A^{-1}=\\frac{1}{-2}\\begin{bmatrix}4&-2\\\\-3&1\\end{bmatrix}=\\begin{bmatrix}-2&1\\\\1.5&-0.5\\end{bmatrix}',
        ]}
        python={`A = np.array([[1, 2],
              [3, 4]])
A_inv = np.linalg.inv(A)
print("Inverse de A =\\n", A_inv)`}
        warning="Le déterminant doit être ≠ 0, sinon A n’est pas inversible."
        utility="Résoudre des systèmes Ax = b."
      />

      <MatrixOperationBlock
        step="3 — Déterminant"
        title="Le déterminant det(A)"
        definition="Scalaire associé à une matrice carrée. En 2×2 : det(A) = a₁₁a₂₂ − a₁₂a₂₁."
        tex={[
          'A=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}\\Rightarrow\\det(A)=1\\times4-2\\times3=-2',
        ]}
        python={`det = np.linalg.det(A)
print("Déterminant =", det)`}
        utility="det = 0 → non inversible ; en vision, mesure si une transformation conserve ou déforme les surfaces."
      />

      <MatrixOperationBlock
        step="4 — Rang"
        title="Le rang"
        definition="Nombre de lignes (ou colonnes) linéairement indépendantes."
        tex={['A=\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}\\Rightarrow\\text{rang}=1\\text{ (ligne 2 = 2× ligne 1)}']}
        python={`A = np.array([[1, 2],
              [2, 4]])
print("Rang =", np.linalg.matrix_rank(A))`}
        utility="Indépendance des features, dimension effective d’un dataset."
      />

      <MatrixOperationBlock
        step="5 — Trace"
        title="La trace Tr(A)"
        definition="Somme des éléments de la diagonale principale (matrice carrée)."
        tex={['A=\\begin{bmatrix}2&1\\\\4&3\\end{bmatrix}\\Rightarrow\\mathrm{Tr}(A)=2+3=5']}
        python={`A = np.array([[2, 1],
              [4, 3]])
print("Trace =", np.trace(A))`}
        utility="Variance totale, matrices de covariance en statistiques et IA."
      />

      <MatrixOperationBlock
        step="6 — Puissance"
        title="Puissance Aⁿ"
        definition="Répéter la multiplication matricielle : A² = A × A, etc."
        tex={['A=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix},\\quad A^2=A\\times A']}
        python={`A = np.array([[1, 2],
              [3, 4]])
print("A² =\\n", np.linalg.matrix_power(A, 2))`}
        utility="Itérer une transformation géométrique ou un processus dynamique."
      />

      <h3 className="mt-12 text-xl font-bold text-deep">Résumé global</h3>
      <DataTable
        headers={['Opération', 'Symbole', 'Python', 'Utilité']}
        rows={[
          ['Transposée', 'Aᵀ', 'A.T', 'Lignes ↔ colonnes'],
          ['Inverse', 'A⁻¹', 'np.linalg.inv(A)', 'Résoudre Ax = b'],
          ['Déterminant', 'det(A)', 'np.linalg.det(A)', 'Inversibilité'],
          ['Rang', '—', 'np.linalg.matrix_rank(A)', 'Indépendance'],
          ['Trace', 'Tr(A)', 'np.trace(A)', 'Somme diagonale'],
          ['Puissance', 'Aⁿ', 'np.linalg.matrix_power(A, n)', 'Répéter une transformation'],
        ]}
      />

      <QuizCard
        question="det(A) = 0 pour A carrée 2×2. Que peut-on affirmer ?"
        options={[
          { id: 'a', label: 'A n’est pas inversible', correct: true },
          { id: 'b', label: 'A⁻¹ existe toujours', correct: false },
          { id: 'c', label: 'Le rang est forcément 2', correct: false },
        ]}
        explanation="Déterminant nul ⟺ matrice singulière ⟺ pas d’inverse."
      />

      <Lesson5Exercises />

      <Callout variant="resume">
        Approfondis avec la <strong>leçon 6 — Le déterminant et ses applications</strong> (vision, Sarrus, signe).
      </Callout>
    </>
  ),

  'determinant-applications': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong className="text-deep">déterminant</strong> est un scalaire attaché à une matrice carrée — outil clé
          pour l’inversibilité, les aires/volumes et les <strong>transformations en vision</strong>.
        </p>
      </FadeIn>

      <Callout variant="important" title="À quoi sert le déterminant ?">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Vérifier si une matrice est <strong>inversible</strong></li>
          <li>Calculer des <strong>aires</strong> (2D) et <strong>volumes</strong> (3D)</li>
          <li>Détecter la <strong>dépendance linéaire</strong> des vecteurs colonnes</li>
          <li>Mesurer zoom, rotation, cisaillement en <strong>vision par ordinateur</strong></li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Déterminant 2×2</h3>
      <MathBlock tex="A=\begin{bmatrix}a&b\\c&d\end{bmatrix}\quad\Rightarrow\quad\det(A)=ad-bc" />
      <h4 className="mt-4 font-semibold text-violet-700">Exemple</h4>
      <MathBlock tex="A=\begin{bmatrix}3&2\\1&4\end{bmatrix},\quad\det(A)=3\times4-2\times1=10" />
      <p className="text-green-800">
        ✅ det(A) = 10 ≠ 0 → <strong>A est inversible</strong>.
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Déterminant 3×3 (règle de Sarrus)</h3>
      <MathBlock tex="B=\begin{bmatrix}a&b&c\\d&e&f\\g&h&i\end{bmatrix}" />
      <MathBlock tex="\det(B)=aei+bfg+cdh-ceg-bdi-afh" />
      <h4 className="mt-4 font-semibold text-violet-700">Exemple</h4>
      <MathBlock tex="B=\begin{bmatrix}1&2&3\\0&4&5\\1&0&6\end{bmatrix}" />
      <MathBlock tex="\det(B)=(24+10+0)-(12+0+0)=22" />
      <p className="text-green-800">
        ✅ det(B) = 22 ≠ 0 → <strong>B est inversible</strong>.
      </p>

      <Accordion title="Code Python — déterminant" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[3, 2], [1, 4]])
B = np.array([[1, 2, 3], [0, 4, 5], [1, 0, 6]])

print("det(A) =", np.linalg.det(A))   # 10.0
print("det(B) =", np.linalg.det(B))   # 22.0`}
        </pre>
      </Accordion>

      <h3 className="mt-10 text-xl font-bold text-deep">3. Interprétation géométrique</h3>
      <p>
        |det(A)| mesure l’<strong>aire</strong> (2D) ou le <strong>volume</strong> (3D) du parallélogramme /
        parallélépipède formé par les <strong>vecteurs colonnes</strong>.
      </p>
      <Callout variant="definition" title="det = 0">
        Vecteurs alignés (2D) ou coplanaires (3D) → <strong>pas d’inverse</strong>, information perdue.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">4. Vision par ordinateur</h3>
      <p>
        Dans une transformation affine ou homographique d’image, le déterminant mesure comment l’espace est{' '}
        <strong>étiré ou contracté</strong>&nbsp;:
      </p>
      <DataTable
        headers={['|det|', 'Effet']}
        rows={[
          ['|det| > 1', 'Agrandissement'],
          ['|det| < 1', 'Réduction'],
          ['det = 0', 'Aplatissement — perte d’information'],
        ]}
      />
      <p className="text-sm text-muted">
        En <em>image registration</em>, on exige souvent det ≠ 0 pour que la transformation soit inversible.
      </p>

      <QuizCard
        question="det(A) = −3 pour une transformation 2D. Que peut-on dire ?"
        options={[
          { id: 'a', label: 'A est inversible et inverse l’orientation', correct: true },
          { id: 'b', label: 'A n’est pas inversible', correct: false },
          { id: 'c', label: 'L’aire devient exactement 0', correct: false },
        ]}
        explanation="det ≠ 0 → inversible. Signe négatif → réflexion (orientation inversée), |det| = 3 → aire multipliée par 3."
      />

      <Lesson6DeterminantExercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 7 — Systèmes linéaires</strong> (Ax = b, applications vision).
      </Callout>
    </>
  ),

  'systemes-lineaires': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          En vision par ordinateur, on résout des <strong className="text-deep">systèmes linéaires</strong> en permanence
          : homographies, recalage d’images, triangulation 3D, moindres carrés, flot optique…
        </p>
      </FadeIn>

      <Callout variant="important" title="Où ça sert ?">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Estimation d’homographies et transformations affines</li>
          <li>Recalage d’images (image registration)</li>
          <li>Triangulation 3D en optique</li>
          <li>Moindres carrés et filtres convolutionnels</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Qu’est-ce qu’un système linéaire ?</h3>
      <MathBlock tex="\begin{cases}a_1 x + b_1 y = c_1\\ a_2 x + b_2 y = c_2\end{cases}" />
      <p>Forme matricielle générale&nbsp;:</p>
      <MathBlock tex="A\vec{x}=\vec{b}" />
      <p className="text-sm text-muted">
        <strong>A</strong> = coefficients · <strong>x⃗</strong> = inconnues · <strong>b⃗</strong> = second membre
      </p>

      <h3 className="mt-10 text-xl font-bold text-deep">2. Résolution avec l’inverse</h3>
      <p>Si A est inversible (det(A) ≠ 0)&nbsp;:</p>
      <MathBlock tex="\vec{x}=A^{-1}\vec{b}" />

      <h4 className="mt-6 font-semibold text-violet-700">Exemple guidé</h4>
      <MathBlock tex="\begin{cases}2x+y=5\\ x-y=1\end{cases}\quad\Rightarrow\quad A=\begin{bmatrix}2&1\\1&-1\end{bmatrix},\;\vec{b}=\begin{bmatrix}5\\1\end{bmatrix}" />
      <MathBlock tex="\det(A)=2(-1)-1(1)=-3\neq0" />
      <MathBlock tex="A^{-1}=\frac{1}{-3}\begin{bmatrix}-1&-1\\-1&2\end{bmatrix}" />
      <MathBlock tex="\vec{x}=\frac{1}{-3}\begin{bmatrix}-6\\-3\end{bmatrix}=\begin{bmatrix}2\\1\end{bmatrix}" />
      <p className="font-medium text-green-800">✅ Solution : x = 2, y = 1</p>

      <Accordion title="Python — np.linalg.solve" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[2, 1], [1, -1]])
b = np.array([5, 1])
x = np.linalg.solve(A, b)
print(x)  # [2. 1.]`}
        </pre>
      </Accordion>

      <h3 className="mt-10 text-xl font-bold text-deep">3. Interprétation géométrique</h3>
      <p>Chaque équation = une <strong>droite</strong> du plan. Le système cherche leur intersection.</p>
      <DataTable
        headers={['Configuration', 'Solutions']}
        rows={[
          ['Droites sécantes', 'Solution unique (un point)'],
          ['Droites parallèles distinctes', 'Aucune solution'],
          ['Droites confondues', 'Infinité de solutions'],
        ]}
      />

      <h3 className="mt-10 text-xl font-bold text-deep">4. Cas particuliers</h3>
      <Callout variant="definition" title="Cas 1 — Aucune solution">
        <MathBlock tex="\begin{cases}x+y=1\\2x+2y=5\end{cases}" className="!my-1" />
        <p className="text-sm">La 2ᵉ devrait être le double de la 1ʳᵉ, mais 5 ≠ 2 → droites parallèles.</p>
      </Callout>
      <Callout variant="definition" title="Cas 2 — Infinité de solutions">
        <MathBlock tex="\begin{cases}x+y=1\\2x+2y=2\end{cases}" className="!my-1" />
        <p className="text-sm">La 2ᵉ est exactement 2× la 1ʳᵉ → mêmes droites.</p>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">5. Applications vision</h3>
      <DataTable
        headers={['Domaine', 'Problème']}
        rows={[
          ['Transformation affine', 'Trouver les paramètres via Ax = b'],
          ['Optique 3D', 'Triangulation — plusieurs équations linéaires'],
          ['Flot optique', 'Système local sur les dérivées des pixels voisins'],
        ]}
      />

      <QuizCard
        question="x + y = 1 et 2x + 2y = 5. Quel cas ?"
        options={[
          { id: 'a', label: 'Aucune solution', correct: true },
          { id: 'b', label: 'Solution unique', correct: false },
          { id: 'c', label: 'Infinité de solutions', correct: false },
        ]}
        explanation="Coefficients proportionnels (1,1) et (2,2) mais seconds membres incohérents (1 vs 5) → parallèles."
      />

      <Lesson7SystemesExercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 8 — Méthode de Gauss</strong> (résolution systématique des systèmes).
      </Callout>
    </>
  ),

  'methode-gauss': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          La <strong className="text-deep">méthode de Gauss</strong> (élimination de Gauss) résout{' '}
          <strong>n’importe quel système linéaire</strong> — 2, 3, 10 inconnues — sans deviner. C’est une{' '}
          <strong>combinaison linéaire organisée</strong>.
        </p>
      </FadeIn>

      <Callout variant="important" title="Objectif">
        Transformer le système en forme <strong>équivalent</strong> mais plus simple (triangulaire, puis
        échelonnée) — <strong>les solutions ne changent jamais</strong>.
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Matrice augmentée</h3>
      <MathBlock tex="\begin{cases}x+y=5\\2x-y=1\end{cases}" />
      <MathBlock
        tex="\left(\begin{array}{cc|c}1&1&5\\2&-1&1\end{array}\right)"
        className="!my-2"
      />

      <h3 className="mt-10 text-xl font-bold text-deep">Opérations élémentaires sur les lignes</h3>
      <ol className="list-decimal space-y-1 pl-5 text-muted">
        <li>Échanger deux lignes</li>
        <li>Multiplier une ligne par un nombre ≠ 0</li>
        <li>Ajouter à une ligne un multiple d’une autre</li>
      </ol>

      <h3 className="mt-10 text-xl font-bold text-deep">Exemple complet pas à pas</h3>

      <div className="space-y-4">
        <div className="scroll-x-card rounded-xl border border-violet-200 bg-violet-50/40 p-4">
          <p className="text-sm font-bold text-violet-800">Étape 1 — Éliminer x dans L₂</p>
          <p className="mt-1 font-mono text-sm">L₂ ← L₂ − 2L₁</p>
          <p className="mt-1 text-sm text-muted">(2, −1, 1) − 2(1, 1, 5) = (0, −3, −9)</p>
          <MathBlock tex="\left(\begin{array}{cc|c}1&1&5\\0&-3&-9\end{array}\right)" className="!my-1" />
        </div>
        <div className="scroll-x-card rounded-xl border border-violet-200 bg-violet-50/40 p-4">
          <p className="text-sm font-bold text-violet-800">Étape 2 — Simplifier L₂</p>
          <p className="mt-1 font-mono text-sm">L₂ ← −(1/3)L₂</p>
          <MathBlock tex="\left(\begin{array}{cc|c}1&1&5\\0&1&3\end{array}\right)" className="!my-1" />
        </div>
        <div className="scroll-x-card rounded-xl border border-violet-200 bg-violet-50/40 p-4">
          <p className="text-sm font-bold text-violet-800">Étape 3 — Éliminer y dans L₁</p>
          <p className="mt-1 font-mono text-sm">L₁ ← L₁ − L₂</p>
          <MathBlock tex="\left(\begin{array}{cc|c}1&0&2\\0&1&3\end{array}\right)" className="!my-1" />
        </div>
      </div>

      <Callout variant="definition" title="Lecture des solutions">
        <MathBlock tex="\begin{cases}x=2\\y=3\end{cases}" className="!my-1" />
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Cas particuliers (lignes spéciales)</h3>
      <DataTable
        headers={['Ligne augmentée', 'Signification']}
        rows={[
          ['(0  0 | 5)', 'Incompatible — aucune solution'],
          ['(0  0 | 0)', 'Indéterminé — infinité de solutions'],
        ]}
      />

      <h3 className="mt-8 text-xl font-bold text-deep">Lien avec le rang</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
        <li>Nombre de lignes non nulles après Gauss = <strong>rang</strong></li>
        <li>rang = nombre d’équations indépendantes</li>
        <li>rang = nombre d’inconnues → souvent solution unique (système carré)</li>
      </ul>

      <Accordion title="NumPy — np.linalg.solve (équivalent)" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {`import numpy as np

A = np.array([[1, 1], [2, -1]])
b = np.array([5, 1])
x = np.linalg.solve(A, b)
print(x)  # [2. 3.]`}
        </pre>
      </Accordion>

      <QuizCard
        question="L₂ ← L₂ − 2L₁ sur le système x+y=5, 2x−y=1. Que devient le coefficient sous le 1 de L₂ ?"
        options={[
          { id: 'a', label: '0', correct: true },
          { id: 'b', label: '2', correct: false },
          { id: 'c', label: '−1', correct: false },
        ]}
        explanation="On élimine x : 2 − 2×1 = 0 en première colonne de L₂."
      />

      <Callout variant="resume" title="Bilan">
        Matrice augmentée, opérations sur les lignes, forme échelonnée, lecture des solutions, rang.
      </Callout>

      <Callout variant="important">
        Leçon suivante&nbsp;: <strong>produit scalaire et orthogonalité</strong> (leçon 9).
      </Callout>
    </>
  ),

  'produit-scalaire-vectoriel': () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          Le <strong className="text-deep">produit scalaire</strong> est partout en vision, deep learning et géométrie
          : similarité, angles, PCA, cosine similarity, matching de points…
        </p>
      </FadeIn>

      <Callout variant="important" title="Applications clés">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Similarité entre descripteurs (SIFT, ORB, features CNN)</li>
          <li>Angles entre gradients (détection de contours)</li>
          <li>PCA, SVM, normalisation, triangulation 3D</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Définition</h3>
      <MathBlock tex="u=(x_1,y_1),\quad v=(x_2,y_2)\quad\Rightarrow\quad u\cdot v=x_1x_2+y_1y_2" />

      <h3 className="mt-10 text-xl font-bold text-deep">2. Formule géométrique</h3>
      <MathBlock tex="u\cdot v=|u|\,|v|\cos(\theta)" />

      <h3 className="mt-8 text-xl font-bold text-deep">3. Interprétation</h3>
      <DataTable
        headers={['Condition', 'Signification']}
        rows={[
          ['u·v > 0', 'Angle < 90° — même sens global'],
          ['u·v < 0', 'Angle > 90° — directions opposées'],
          ['u·v = 0', 'Angle = 90° — vecteurs orthogonaux'],
        ]}
      />

      <DotProductPlayground />

      <h3 className="mt-10 text-xl font-bold text-deep">4. Exemples</h3>
      <div className="space-y-4">
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-violet-700">Ex. 1 — produit positif</p>
          <MathBlock tex="u=(2,1),\;v=(3,4)\Rightarrow u\cdot v=10>0" className="!my-2" />
          <p className="text-sm text-muted">Même direction globale.</p>
        </div>
        <div className="scroll-x-card rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-violet-700">Ex. 2 — produit négatif</p>
          <MathBlock tex="u=(1,2),\;v=(-3,-1)\Rightarrow u\cdot v=-5" className="!my-2" />
          <p className="text-sm text-muted">Directions opposées.</p>
        </div>
        <div className="scroll-x-card rounded-xl border border-green-200 bg-green-50/50 p-4">
          <p className="font-semibold text-green-800">Ex. 3 — orthogonalité</p>
          <MathBlock tex="u=(2,3),\;v=(3,-2)\Rightarrow u\cdot v=0" className="!my-2" />
          <p className="text-sm text-muted">Vecteurs perpendiculaires.</p>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold text-deep">5. Norme</h3>
      <MathBlock tex="|u|=\sqrt{x^2+y^2},\quad u=(3,4)\Rightarrow|u|=5" />

      <h3 className="mt-10 text-xl font-bold text-deep">6. Angle entre vecteurs</h3>
      <MathBlock tex="\cos(\theta)=\frac{u\cdot v}{|u||v|}" />
      <MathBlock tex="u=(1,0),\;v=\left(\frac{\sqrt{2}}{2},\frac{\sqrt{2}}{2}\right)\Rightarrow\theta=45°" />

      <h3 className="mt-10 text-xl font-bold text-deep">7. Vision par ordinateur</h3>
      <DataTable
        headers={['Concept', 'Formule / usage']}
        rows={[
          ['Cosine similarity', 'cos(u,v) = (u·v) / (|u||v|)'],
          ['Contours', 'Gradients ⊥ aux lignes d’intensité'],
          ['PCA', 'Basé sur variances = produits scalaires'],
          ['Hough, triangulation', 'Angles entre vecteurs'],
        ]}
      />

      <QuizCard
        question="u = (2, 3) et v = (3, −2). Que vaut u·v ?"
        options={[
          { id: 'a', label: '0 — orthogonaux', correct: true },
          { id: 'b', label: '12', correct: false },
          { id: 'c', label: '−12', correct: false },
        ]}
        explanation="2×3 + 3×(−2) = 6 − 6 = 0."
      />

      <Lesson8DotProductExercises />

      <Callout variant="resume">
        Passe à la <strong>leçon 10 — Projection orthogonale</strong>.
      </Callout>
    </>
  ),

  projections: () => (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          La <strong className="text-deep">projection orthogonale</strong> projette un vecteur sur un autre ou sur un
          sous-espace — fondamentale en PCA, régression linéaire, reconstruction 3D et vision.
        </p>
      </FadeIn>

      <Callout variant="important" title="Applications">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Réduction de dimensions (PCA)</li>
          <li>Régression linéaire et moindres carrés</li>
          <li>Projection caméra / rendu 3D</li>
          <li>Distances perpendiculaires (contours, alignements)</li>
        </ul>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">1. Projection sur un vecteur</h3>
      <MathBlock tex="\mathrm{proj}_v(u)=\frac{u\cdot v}{v\cdot v}\,v" />
      <p className="text-sm text-muted">Résultat : vecteur <strong>parallèle à v</strong> (« ombre » de u sur v).</p>

      <h4 className="mt-6 font-semibold text-violet-700">Exemple 1</h4>
      <MathBlock tex="u=(3,4),\;v=(1,0)\Rightarrow u\cdot v=3,\;v\cdot v=1" />
      <MathBlock tex="\mathrm{proj}_v(u)=3(1,0)=(3,0)" />
      <p className="text-sm text-green-800">Projection sur l’axe x — l’« ombre » de u sur l’horizontale.</p>

      <ProjectionPlayground />

      <h3 className="mt-10 text-xl font-bold text-deep">2. Projection sur un sous-espace</h3>
      <MathBlock tex="\mathrm{proj}_V(u)=Pu,\quad P=V(V^TV)^{-1}V^T" />
      <p className="text-sm text-muted">
        <strong>V</strong> = matrice dont les colonnes sont une base de V. <strong>P</strong> = matrice de projection.
      </p>

      <h4 className="mt-6 font-semibold text-violet-700">Exemple 2 — droite engendrée par v = (2, 1)</h4>
      <MathBlock tex="u=(3,4),\;u\cdot v=10,\;v\cdot v=5" />
      <MathBlock tex="\mathrm{proj}_v(u)=\frac{10}{5}(2,1)=(4,2)" />

      <h3 className="mt-10 text-xl font-bold text-deep">3. Vision par ordinateur</h3>
      <DataTable
        headers={['Domaine', 'Usage']}
        rows={[
          ['PCA', 'Projeter sur les composantes principales'],
          ['Caméra 3D', 'Projeter les points sur le plan image'],
          ['Triangulation', 'Reconstruction de profondeur'],
          ['Contours', 'Distance perpendiculaire à une droite'],
        ]}
      />

      <QuizCard
        question="proj_{(1,0)}(3, 4) vaut ?"
        options={[
          { id: 'a', label: '(3, 0)', correct: true },
          { id: 'b', label: '(0, 4)', correct: false },
          { id: 'c', label: '(3, 4)', correct: false },
        ]}
        explanation="(u·v)/(v·v) = 3/1 = 3, donc 3×(1,0) = (3,0)."
      />

      <Lesson9ProjectionExercises />

      <Callout variant="resume">
        Essaie l’exercice, puis on pourra aborder l’<strong>inverse pour systèmes 3×3+</strong> ou la suite du parcours.
      </Callout>
    </>
  ),

  _plan: () => <AlgebraCoursePlan />,
}

/** Vue « bientôt disponible » pour les leçons non encore rédigées */
export function ComingSoonLesson({ title }: { title: string }) {
  return (
    <Callout variant="important" title="Leçon à venir">
      <p>
        <strong>{title}</strong> sera ajoutée lors de la prochaine importation de contenu. Consulte le plan du cours sur la
        page d’accueil du module.
      </p>
    </Callout>
  )
}
