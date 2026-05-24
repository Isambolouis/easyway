import type { ReactNode } from 'react'
import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { MathBlock } from '@/components/ui/MathBlock'
import { MathInline } from '@/components/ui/MathBlock'
import {
  CnnFeatureMapsLab,
  ConvolutionManualLab,
  ImageCh1ConvolutionQuiz,
  MedianVsMeanLab,
  PaddingStrideLab,
  SobelKernelsLab,
  SpatialFiltersLab,
} from '@/components/image/interactive/ImageCh1ConvolutionLabs'
import {
  AffineTransformLab,
  ArithmeticPixelLab,
  BinaryLogicLab,
  HistogramEqualizationLab,
  ImageCh1PixelOpsQuiz,
  ImageDiffBlendLab,
  LogGammaLab,
  NegativeThresholdLab,
  NormalizeQuantizeLab,
  RoiMaskLab,
} from '@/components/image/interactive/ImageCh1PixelOpsLabs'
import {
  DiscreteGridLab,
  GradientMagnitudeLab,
  ImageCh1MathQuiz,
  NyquistAliasingLab,
  PixelDistanceLab,
  PixelNeighborhoodLab,
  Signal1Dvs2DLab,
  SpatialCorrelationLab,
  SpatialFrequencyLab,
  TensorStructureLab,
} from '@/components/image/interactive/ImageCh1MathLabs'
import {
  AcquisitionPipelineLab,
  AdcQuantizationLab,
  BayerDemosaicLab,
  CameraPipelineLab,
  CcdCmosLab,
  DynamicRangeLab,
  ExposureSaturationLab,
  ExposureTriangleLab,
  ImageCh1AcquisitionQuiz,
  MotionBlurLab,
  PinholeProjectionLab,
  RawVsJpegLab,
  ReflectanceModelLab,
  SnrLab,
  WhiteBalanceLab,
} from '@/components/image/interactive/ImageCh1AcquisitionLabs'
import {
  AlphaChannelLab,
  BitDepthLab,
  ColorDistanceLab,
  HsvColorLab,
  ImageCh1ColorQuiz,
  ImageNoiseLab,
  LuminanceFromRgbLab,
  MemoryChannelOrderLab,
  RgbAdditiveLab,
  RgbCubeLab,
  RgbPrimariesTableLab,
  YcbcrLab,
} from '@/components/image/interactive/ImageCh1ColorLabs'
import {
  GrayscalePixelLab,
  ImageCh1Quiz,
  ImageTypeLab,
  LightPipelineLab,
  MemorySizeLab,
  PixelGridMatrixLab,
  PixelZoomLab,
  SamplingQuantizationLab,
  VisionHumanVsMachineLab,
  WavelengthSpectrumLab,
} from '@/components/image/interactive/ImageCh1Labs'
import { decimalToBinary8 } from '@/components/image/interactive/imagePixelUtils'

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold text-deep">{title}</h2>
      <div className="mt-4 space-y-4 text-muted">{children}</div>
    </section>
  )
}

export function ImageCh1NaturePixelView() {
  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            Partie I — Fondements atomiques
          </span>
          <br />
          Du phénomène physique de la lumière à la matrice <MathInline tex="I(x,y)" /> : ce chapitre pose les briques
          de toute la vision par ordinateur.
        </p>
      </FadeIn>

      <Section id="s-1-1" title="1.1 — Qu’est-ce qu’une image ?">
        <p>
          Une image est une <strong className="text-deep">représentation visuelle</strong> d’un objet, d’une scène ou
          d’une information. En photo, tes yeux voient des couleurs et ton cerveau reconnaît des formes — pour un
          ordinateur, ce n’est qu’un <strong className="text-deep">ensemble de nombres</strong>.
        </p>
        <Callout variant="definition">
          Toute la vision par ordinateur repose sur une idée simple : une image = une structure mathématique
          manipulable.
        </Callout>
        <VisionHumanVsMachineLab />
      </Section>

      <Section id="s-1-2" title="1.2 — Origine physique d’une image">
        <p>Une image naît grâce à la <strong className="text-deep">lumière</strong>. Le processus réel :</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Une source lumineuse émet de la lumière ;</li>
          <li>La lumière frappe un objet ;</li>
          <li>L’objet réfléchit une partie de cette lumière ;</li>
          <li>Un capteur (œil ou caméra) reçoit cette lumière ;</li>
          <li>Le signal lumineux est converti en information numérique.</li>
        </ol>
        <LightPipelineLab />
      </Section>

      <Section id="s-1-3" title="1.3 — Image et lumière">
        <p>
          La lumière est une <strong className="text-deep">onde électromagnétique</strong>. Sa longueur d’onde détermine
          la couleur perçue. Une caméra capte l’intensité, la couleur et la position spatiale.
        </p>
        <WavelengthSpectrumLab />
      </Section>

      <Section id="s-1-4" title="1.4 — Vision humaine vs vision machine">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-4 dark:border-[var(--color-border)] dark:bg-cyan-950/20">
            <p className="font-semibold text-deep">Vision humaine</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
              <li>Interprète et complète l’information ;</li>
              <li>Reconnaît intuitivement les objets.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white p-4 dark:border-[var(--color-border)] dark:bg-[var(--color-card)]">
            <p className="font-semibold text-deep">Vision machine</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
              <li>Ne « voit » pas : elle calcule ;</li>
              <li>Manipule des matrices numériques.</li>
            </ul>
          </div>
        </div>
        <Callout variant="important">Une image numérique est un tableau de valeurs.</Callout>
      </Section>

      <Section id="s-1-5" title="1.5 — Définition mathématique d’une image">
        <p>Mathématiquement, une image est une fonction :</p>
        <MathBlock tex="I(x,y)" />
        <p className="text-sm">
          On lit « I de x y » où <MathInline tex="x" /> = position horizontale, <MathInline tex="y" /> = verticale,{' '}
          <MathInline tex="I" /> = intensité au point <MathInline tex="(x,y)" />.
        </p>
      </Section>

      <Section id="s-1-6" title="1.6 — Interprétation géométrique">
        <p>
          Imagine une <strong className="text-deep">grille</strong> : chaque case a une position et une valeur. Exemple :
          (0,0)→12, (0,1)→200, (1,0)→56…
        </p>
        <PixelGridMatrixLab />
      </Section>

      <Section id="s-1-7" title="1.7 — Le pixel : l’atome fondamental">
        <p>
          <em>Pixel</em> = <strong className="text-deep">Picture Element</strong> — la plus petite unité d’une image
          numérique, un point contenant une information visuelle.
        </p>
      </Section>

      <Section id="s-1-8" title="1.8 — Structure d’un pixel (niveaux de gris)">
        <MathBlock tex="0 \le I(x,y) \le 255" />
        <p className="text-sm">0 → noir · 255 → blanc · entre les deux → nuances de gris.</p>
        <GrayscalePixelLab />
      </Section>

      <Section id="s-1-9" title="1.9 — Pourquoi 255 ?">
        <p>Codage fréquent sur <strong className="text-deep">8 bits</strong> par canal.</p>
        <MathBlock tex="2^8 = 256 \quad\Rightarrow\quad \text{valeurs de } 0 \text{ à } 255" />
      </Section>

      <Section id="s-1-10" title="1.10 — Représentation binaire d’un pixel">
        <p>
          Exemple : 145 en décimal = <code className="rounded bg-slate-100 px-1 dark:bg-[var(--color-elevated)]">{decimalToBinary8(145)}</code> en
          binaire (8 bits).
        </p>
        <GrayscalePixelLab />
      </Section>

      <Section id="s-1-11" title="1.11 — Image binaire">
        <p>
          Seulement <MathInline tex="0" /> ou <MathInline tex="1" /> — noir/blanc, absence/présence. Utilisée en
          segmentation, OCR, détection de formes.
        </p>
      </Section>

      <Section id="s-1-12" title="1.12 — Image en niveaux de gris">
        <p>
          Chaque pixel : <MathInline tex="I(x,y) \in [0,255]" />. Plus simple, moins de mémoire, base du traitement
          d’image.
        </p>
      </Section>

      <Section id="s-1-13" title="1.13 — Image couleur RGB">
        <p>Trois canaux Rouge, Vert, Bleu. Chaque pixel est un vecteur :</p>
        <MathBlock tex="P = (R, G, B)" />
        <p className="text-sm">
          Exemple <MathInline tex="P=(255,0,0)" /> → rouge pur.
        </p>
      </Section>

      <Section id="s-1-14" title="1.14 — Structure tensorielle RGB">
        <MathBlock tex="H \times W \times 3" />
        <p className="text-sm">H = hauteur, W = largeur, 3 = canaux couleur.</p>
        <ImageTypeLab />
      </Section>

      <Section id="s-1-15" title="1.15 — Taille mémoire d’une image">
        <MathBlock tex="T = H \times W \times C \times B" />
        <p className="text-sm">C = canaux, B = octets par canal.</p>
        <MemorySizeLab />
      </Section>

      <Section id="s-1-16" title="1.16 — Résolution spatiale">
        <p>
          La résolution indique combien de pixels composent l’image — ex. <strong className="text-deep">1024 × 768</strong>{' '}
          (1024 colonnes, 768 lignes). Plus de pixels → plus de détails et plus de mémoire.
        </p>
      </Section>

      <Section id="s-1-17" title="1.17 — Zoom numérique et perte d’information">
        <p>
          En agrandissant, les pixels deviennent visibles ; l’ordinateur invente des valeurs intermédiaires → flou et
          artefacts.
        </p>
        <PixelZoomLab />
      </Section>

      <Section id="s-1-18" title="1.18 — Discrétisation">
        <p>Le monde réel est <strong className="text-deep">continu</strong> ; l’image numérique est <strong className="text-deep">discrète</strong>.</p>
        <MathBlock tex="\text{Monde continu} \rightarrow \text{Échantillonnage} \rightarrow \text{Pixels}" />
        <Callout variant="definition" title="Discrétisation spatiale">
          Passage du signal continu aux valeurs sur une grille finie de pixels.
        </Callout>
      </Section>

      <Section id="s-1-19" title="1.19 — Échantillonnage spatial">
        <p>Choisir certains points et ignorer les autres. Plus l’échantillonnage est dense, meilleure est l’image.</p>
      </Section>

      <Section id="s-1-20" title="1.20 — Quantification">
        <p>Limiter le nombre de niveaux possibles : 8 bits → 256 niveaux ; 16 bits → 65 536 niveaux.</p>
        <SamplingQuantizationLab />
      </Section>

      <Section id="s-1-21" title="1.21 — Résumé scientifique">
        <p>Une image numérique est :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>une fonction mathématique <MathInline tex="I(x,y)" /> ;</li>
          <li>une matrice de valeurs ;</li>
          <li>une structure discrète (pixels) ;</li>
          <li>une représentation numérique de la lumière.</li>
        </ul>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">Fonction discrète, matrice, coordonnées, vecteurs, tenseurs</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Informatique</p>
            <p className="mt-1 text-muted">Binaire, bits, mémoire, codage</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Physique</p>
            <p className="mt-1 text-muted">Lumière, intensité, longueur d’onde</p>
          </div>
        </div>
        <ImageCh1Quiz />
      </Section>

      <Section id="s-1-22" title="1.22 — Structure détaillée du pixel et des couleurs">
        <p>
          Nous entrons plus profondément dans la <strong className="text-deep">structure réelle du pixel</strong>, les
          systèmes de couleurs, la mémoire interne et la perception humaine — la base atomique de la vision numérique.
        </p>
      </Section>

      <Section id="s-1-23" title="1.23 — Le pixel couleur">
        <p>Un pixel couleur contient plusieurs composantes. En RGB :</p>
        <MathBlock tex="P = (R, G, B)" />
        <p className="text-sm">R, G, B = intensités du rouge, du vert et du bleu (0–255).</p>
        <RgbAdditiveLab />
      </Section>

      <Section id="s-1-24" title="1.24 — Pourquoi Rouge, Vert, Bleu ?">
        <p>
          L’œil possède trois types de cônes sensibles aux longueurs d’onde rouges, vertes et bleues. Les écrans{' '}
          <strong className="text-deep">imitent cette biologie</strong> par un mélange additif de lumière.
        </p>
      </Section>

      <Section id="s-1-25" title="1.25 — Mélange additif des couleurs">
        <p>Le RGB est additif : la couleur affichée résulte de la superposition des trois lumières.</p>
        <Callout variant="definition">
          Couleur finale ≈ combinaison des contributions R, G et B (écran émissif).
        </Callout>
      </Section>

      <Section id="s-1-26" title="1.26 — Couleurs fondamentales RGB">
        <RgbPrimariesTableLab />
      </Section>

      <Section id="s-1-27" title="1.27 — Cube RGB">
        <p>L’espace RGB est un cube 3D : axes rouge, vert, bleu. Chaque pixel est un point dans cet espace.</p>
        <RgbCubeLab />
      </Section>

      <Section id="s-1-28" title="1.28 — Espace vectoriel des couleurs">
        <MathBlock tex="\vec{p} = \begin{bmatrix} R \\ G \\ B \end{bmatrix}" />
        <p className="text-sm">
          Vision par ordinateur, deep learning, compression et segmentation manipulent ces vecteurs couleur.
        </p>
      </Section>

      <Section id="s-1-29" title="1.29 — Distance entre couleurs">
        <p>Deux couleurs se comparent par la distance euclidienne dans l’espace RGB :</p>
        <ColorDistanceLab />
      </Section>

      <Section id="s-1-30" title="1.30 — Profondeur de couleur">
        <p>La profondeur indique combien de bits représentent un pixel. Cas classique : 24 bits (8+8+8).</p>
        <MathBlock tex="2^{24} = 16\,777\,216 \approx 16{,}7 \text{ millions de couleurs}" />
        <BitDepthLab />
      </Section>

      <Section id="s-1-31" title="1.31 — Canal Alpha (transparence)">
        <MathBlock tex="P = (R, G, B, A)" />
        <p className="text-sm">A = 0 transparent · A = 255 opaque (PNG, interfaces, overlays).</p>
        <AlphaChannelLab />
      </Section>

      <Section id="s-1-32" title="1.32 — Structure mémoire réelle">
        <p>Une image est une suite d’octets en mémoire — ex. deux pixels RGB :</p>
        <pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 text-sm text-cyan-200">255 0 0  0 255 0</pre>
        <MemoryChannelOrderLab />
      </Section>

      <Section id="s-1-33" title="1.33 — Ordre des canaux (RGB vs BGR)">
        <p>
          Attention : <strong className="text-deep">OpenCV utilise BGR</strong>. Le triplet (255,0,0) peut signifier rouge
          en RGB ou bleu en BGR.
        </p>
      </Section>

      <Section id="s-1-34" title="1.34 — Niveaux de gris et luminance">
        <p>Le gris peut être dérivé du RGB par la luminance perçue :</p>
        <LuminanceFromRgbLab />
      </Section>

      <Section id="s-1-35" title="1.35 — Importance de la formule de luminance">
        <p>
          La majorité des algorithmes classiques travaillent en niveaux de gris : moins de calculs, détection de contours,
          OCR, segmentation, reconnaissance faciale.
        </p>
      </Section>

      <Section id="s-1-36" title="1.36 — Espace HSV">
        <p>HSV : H = teinte, S = saturation, V = value (luminosité). Plus intuitif que RGB pour certaines tâches.</p>
      </Section>

      <Section id="s-1-37" title="1.37 — Intuition du HSV">
        <p>HSV sépare la couleur de la luminosité — utile en segmentation, suivi d’objets et détection de couleurs.</p>
        <HsvColorLab />
      </Section>

      <Section id="s-1-38" title="1.38 — Hue (teinte)">
        <p>La teinte est un angle de 0° à 360° sur le cercle chromatique.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-muted">
                <th className="py-2">Angle</th>
                <th className="py-2">Couleur</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['0°', 'Rouge'],
                ['120°', 'Vert'],
                ['240°', 'Bleu'],
              ].map(([a, c]) => (
                <tr key={a} className="border-b border-cyan-50 dark:border-[var(--color-border)]">
                  <td className="py-2 font-mono">{a}</td>
                  <td className="py-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="s-1-39" title="1.39 — Saturation">
        <p>La saturation mesure la pureté de la couleur : faible → grisâtre, forte → couleur vive.</p>
      </Section>

      <Section id="s-1-40" title="1.40 — Value (luminosité)">
        <p>Value = intensité lumineuse globale du pixel (clair / foncé).</p>
      </Section>

      <Section id="s-1-41" title="1.41 — Espace YCbCr">
        <p>Très utilisé en vidéo, JPEG et télévision : Y (luminance), Cb et Cr (chrominances).</p>
        <YcbcrLab />
      </Section>

      <Section id="s-1-42" title="1.42 — Luminance vs chrominance">
        <p>
          L’œil perçoit mieux la lumière que la couleur fine : on peut{' '}
          <strong className="text-deep">compresser Cb/Cr plus fortement</strong> — principe du JPEG.
        </p>
      </Section>

      <Section id="s-1-43" title="1.43 — Bruit numérique">
        <p>Le bruit est une perturbation aléatoire des pixels. Types courants : gaussien, sel-poivre, impulsionnel.</p>
        <ImageNoiseLab />
      </Section>

      <Section id="s-1-44" title="1.44 — Modèle mathématique du bruit">
        <MathBlock tex="g(x,y) = f(x,y) + n(x,y)" />
        <p className="text-sm">
          <MathInline tex="f" /> image réelle · <MathInline tex="n" /> bruit · <MathInline tex="g" /> image observée.
        </p>
      </Section>

      <Section id="s-1-45" title="1.45 — Signal et information">
        <p>
          Une image mélange signal utile et bruit. Le traitement d’image vise souvent à supprimer le bruit tout en
          préservant l’information visuelle.
        </p>
      </Section>

      <Section id="s-1-46" title="1.46 — Information visuelle">
        <MathBlock tex="\text{Image} \rightarrow \text{Information}" />
        <p className="text-sm">
          Objectif de la vision : détecter une voiture, reconnaître un visage, lire un texte, repérer une anomalie
          médicale…
        </p>
      </Section>

      <Section id="s-1-47" title="1.47 — Résumé scientifique">
        <p>Un pixel couleur est un vecteur et une unité d’information ; une image couleur est un tenseur et un signal
          multidimensionnel.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">Espace vectoriel, distance, transformations, tenseur</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Physique</p>
            <p className="mt-1 text-muted">Luminance, chrominance, perception</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Informatique</p>
            <p className="mt-1 text-muted">Bits, octets, mémoire, encodage couleur</p>
          </div>
        </div>
        <ImageCh1ColorQuiz />
      </Section>

      <Section id="s-1-48" title="1.48 — Acquisition d’image et fonctionnement des caméras">
        <p>
          Comment une image numérique est créée physiquement. La qualité des données dépend du système d’acquisition —
          une mauvaise acquisition génère bruit, flou et erreurs en vision et en IA.
        </p>
      </Section>

      <Section id="s-1-49" title="1.49 — Pipeline complet de formation d’image">
        <MathBlock tex="\text{Lumière} \rightarrow \text{Objet} \rightarrow \text{Lentille} \rightarrow \text{Capteur} \rightarrow \text{Signal} \rightarrow \text{Numérisation} \rightarrow \text{Image}" />
        <AcquisitionPipelineLab />
      </Section>

      <Section id="s-1-50" title="1.50 — La lumière comme source d’information">
        <p>
          Une caméra ne « voit » pas les objets : elle mesure la lumière réfléchie (intensité, couleur). Sans lumière,
          aucune image.
        </p>
      </Section>

      <Section id="s-1-51" title="1.51 — Modèle physique simplifié">
        <ReflectanceModelLab />
      </Section>

      <Section id="s-1-52" title="1.52 — Réflectance">
        <p>Capacité d’un objet à réfléchir la lumière — voir le tableau interactif ci-dessus (section 1.51).</p>
      </Section>

      <Section id="s-1-53" title="1.53 — La lentille (objectif)">
        <p>La lentille concentre la lumière sur le capteur : focaliser, agrandir, projeter l’image.</p>
      </Section>

      <Section id="s-1-54" title="1.54 — Distance focale">
        <p>
          Notée <MathInline tex="f" />, elle influence le zoom, l’angle de vue et la perspective.
        </p>
      </Section>

      <Section id="s-1-55" title="1.55 — Modèle pinhole camera">
        <p>Modèle fondamental en vision artificielle : la caméra sténopé (trou percé).</p>
      </Section>

      <Section id="s-1-56" title="1.56 — Projection perspective">
        <PinholeProjectionLab />
      </Section>

      <Section id="s-1-57" title="1.57 — Interprétation physique">
        <p>
          Objets lointains (Z grand) → petite projection ; objets proches → grande projection. Base de la vision 3D, de
          la reconstruction et de la stéréovision.
        </p>
      </Section>

      <Section id="s-1-58" title="1.58 — Le capteur d’image">
        <p>Transforme la lumière en signal électrique : chaque photosite mesure l’énergie lumineuse reçue.</p>
      </Section>

      <Section id="s-1-59" title="1.59 — Photosites">
        <p>Millions de photosites : captent les photons et produisent une charge électrique.</p>
      </Section>

      <Section id="s-1-60" title="1.60 — CCD vs CMOS">
        <CcdCmosLab />
      </Section>

      <Section id="s-1-61" title="1.61 — Conversion photon → électron">
        <MathBlock tex="\text{Photons} \rightarrow \text{Électrons}" />
        <p className="text-sm">Plus de photons → signal plus fort.</p>
      </Section>

      <Section id="s-1-62" title="1.62 — Conversion analogique-numérique">
        <MathBlock tex="\text{Analogique} \rightarrow \text{ADC} \rightarrow \text{Numérique}" />
        <p className="text-sm">ADC = Analog-to-Digital Converter.</p>
      </Section>

      <Section id="s-1-63" title="1.63 — Quantification réelle">
        <AdcQuantizationLab />
      </Section>

      <Section id="s-1-64" title="1.64 — Dynamique d’image">
        <p>Écart entre zones sombres et lumineuses de la scène.</p>
      </Section>

      <Section id="s-1-65" title="1.65 — Dynamic Range">
        <DynamicRangeLab />
      </Section>

      <Section id="s-1-66" title="1.66 — Exposition">
        <p>Quantité de lumière reçue — réglée par ouverture, vitesse et ISO.</p>
        <ExposureTriangleLab />
      </Section>

      <Section id="s-1-67" title="1.67 — Ouverture du diaphragme">
        <p>
          Notée f/N. Ex. f/1.8 → beaucoup de lumière ; f/16 → peu de lumière (voir triangle d’exposition).
        </p>
      </Section>

      <Section id="s-1-68" title="1.68 — Temps d’exposition">
        <p>Temps long → image lumineuse, risque de flou. Temps court → image sombre, mouvement figé.</p>
        <MotionBlurLab />
      </Section>

      <Section id="s-1-69" title="1.69 — ISO">
        <p>Amplification électronique : ISO élevé → plus lumineux mais plus de bruit ; ISO faible → meilleure qualité.</p>
      </Section>

      <Section id="s-1-70" title="1.70 — Flou de mouvement">
        <p>Objet en mouvement pendant l’exposition → trajectoire étirée sur le capteur (démo ci-dessus).</p>
      </Section>

      <Section id="s-1-71" title="1.71 — Profondeur de champ">
        <p>Zone nette de l’image — dépend de l’ouverture, de la focale et de la distance au sujet.</p>
      </Section>

      <Section id="s-1-72" title="1.72 — Bruit du capteur">
        <p>Bruit même sans lumière : agitation thermique, électronique, amplification.</p>
      </Section>

      <Section id="s-1-73" title="1.73 — Bruit thermique">
        <p>Augmente avec la température du capteur et le temps d’exposition.</p>
      </Section>

      <Section id="s-1-74" title="1.74 — Rapport signal/bruit">
        <SnrLab />
      </Section>

      <Section id="s-1-75" title="1.75 — Saturation du capteur">
        <MathBlock tex="I(x,y) \rightarrow I_{\max}" />
        <p className="text-sm">Trop de lumière → pixels saturés, zones brûlées, perte d’information.</p>
        <ExposureSaturationLab />
      </Section>

      <Section id="s-1-76" title="1.76 — Sous-exposition">
        <p>Lumière insuffisante → perte de détails et bruit dominant (histogramme à gauche).</p>
      </Section>

      <Section id="s-1-77" title="1.77 — Balance des blancs">
        <WhiteBalanceLab />
      </Section>

      <Section id="s-1-78" title="1.78 — Dématriçage (Demosaicing)">
        <p>Le capteur utilise souvent une matrice de Bayer : un canal par photosite, RGB reconstruit ensuite.</p>
        <BayerDemosaicLab />
      </Section>

      <Section id="s-1-79" title="1.79 — Matrice de Bayer">
        <p>Structure 2×2 avec deux verts — l’œil est très sensible au vert.</p>
      </Section>

      <Section id="s-1-80" title="1.80 — Pipeline interne d’une caméra">
        <CameraPipelineLab />
      </Section>

      <Section id="s-1-81" title="1.81 — RAW vs JPEG">
        <RawVsJpegLab />
      </Section>

      <Section id="s-1-82" title="1.82 — Importance en vision par ordinateur">
        <p>
          Comprendre l’acquisition permet de mieux nettoyer les images, interpréter les défauts et concevoir des systèmes
          IA robustes.
        </p>
      </Section>

      <Section id="s-1-83" title="1.83 — Résumé scientifique">
        <MathBlock tex="\text{Lumière} \rightarrow \text{Signal} \rightarrow \text{Mathématiques}" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Physique</p>
            <p className="mt-1 text-muted">Photon, réflectance, lentille, exposition</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">Projection, dynamique, SNR</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Informatique</p>
            <p className="mt-1 text-muted">ADC, Bayer, pipeline, RAW/JPEG</p>
          </div>
        </div>
        <ImageCh1AcquisitionQuiz />
      </Section>

      <Section id="s-1-84" title="1.84 — Structure mathématique profonde des images">
        <p>
          L’image comme objet mathématique : signal 2D, fonction discrète, matrice, espace mathématique — cœur du
          traitement d’image, OpenCV, CNN et vision par ordinateur.
        </p>
      </Section>

      <Section id="s-1-85" title="1.85 — Une image est un signal">
        <p>Un signal transporte de l’information : audio, ECG, onde radio, <strong className="text-deep">image</strong>.</p>
      </Section>

      <Section id="s-1-86" title="1.86 — Signal 1D vs 2D">
        <p>Audio : <MathInline tex="s(t)" /> (temps). Image : <MathInline tex="f(x,y)" /> (deux variables spatiales).</p>
        <Signal1Dvs2DLab />
      </Section>

      <Section id="s-1-87" title="1.87 — Domaine spatial">
        <p>Position des pixels : coordonnées <MathInline tex="x" /> et <MathInline tex="y" />.</p>
      </Section>

      <Section id="s-1-88" title="1.88 — Domaine d’intensité">
        <MathBlock tex="f : \mathbb{R}^2 \rightarrow \mathbb{R}" />
        <p className="text-sm">
          <MathInline tex="\mathbb{R}^2" /> = positions · <MathInline tex="\mathbb{R}" /> = intensité lumineuse.
        </p>
      </Section>

      <Section id="s-1-89" title="1.89 — Image continue vs discrète">
        <p>Monde physique continu <MathInline tex="f(x,y)" /> → image numérique discrète <MathInline tex="f[m,n]" />.</p>
      </Section>

      <Section id="s-1-90" title="1.90 — Notation discrète">
        <p>
          <MathInline tex="f[m,n]" /> = valeur du pixel à la ligne <MathInline tex="m" />, colonne <MathInline tex="n" />.
        </p>
        <DiscreteGridLab />
      </Section>

      <Section id="s-1-91" title="1.91 — Grille spatiale">
        <MathBlock tex="m=0,1,\ldots,M-1 \quad n=0,1,\ldots,N-1" />
      </Section>

      <Section id="s-1-92" title="1.92 — Taille d’image">
        <p>
          <MathInline tex="M" /> lignes, <MathInline tex="N" /> colonnes → dimension <MathInline tex="M \times N" />.
        </p>
      </Section>

      <Section id="s-1-93" title="1.93 — Représentation matricielle">
        <p>La matrice regroupe toutes les valeurs <MathInline tex="f[m,n]" /> (voir grille interactive §1.90).</p>
      </Section>

      <Section id="s-1-94" title="1.94 — Image couleur comme tenseur">
        <MathBlock tex="f[m,n,c]" />
        <p className="text-sm">c = canal couleur (R, G, B).</p>
      </Section>

      <Section id="s-1-95" title="1.95 — Introduction aux tenseurs">
        <TensorStructureLab />
      </Section>

      <Section id="s-1-96" title="1.96 — Vidéo comme tenseur">
        <MathBlock tex="f(x,y,t,c)" />
        <p className="text-sm">Quatrième dimension : le temps.</p>
      </Section>

      <Section id="s-1-97" title="1.97 — Théorie de l’échantillonnage">
        <p>Image numérique = signal continu échantillonné à intervalles réguliers.</p>
      </Section>

      <Section id="s-1-98" title="1.98 — Échantillonnage spatial">
        <p>On prélève certains points de l’espace — voir Nyquist ci-dessous.</p>
      </Section>

      <Section id="s-1-99" title="1.99 — Fréquence d’échantillonnage">
        <p>Plus de points → meilleure précision spatiale.</p>
      </Section>

      <Section id="s-1-100" title="1.100 — Théorème de Nyquist-Shannon">
        <MathBlock tex="f_s \geq 2 f_{\max}" />
        <NyquistAliasingLab />
      </Section>

      <Section id="s-1-101" title="1.101 — Interprétation en image">
        <p>Il faut assez de pixels pour capturer les détails — sinon perte, artefacts, aliasing.</p>
      </Section>

      <Section id="s-1-102" title="1.102 — Aliasing">
        <p>Échantillonnage insuffisant → motifs faux, escaliers, textures déformées.</p>
      </Section>

      <Section id="s-1-103" title="1.103 — Exemple intuitif">
        <p>Une roue filmée peut sembler tourner à l’envers — aliasing <em>temporel</em> (même principe que spatial).</p>
      </Section>

      <Section id="s-1-104" title="1.104 — Fréquences spatiales">
        <SpatialFrequencyLab />
      </Section>

      <Section id="s-1-105" title="1.105 — Importance des fréquences">
        <p>Filtres, CNN, compression, détection de contours — tout repose sur les fréquences spatiales.</p>
      </Section>

      <Section id="s-1-106" title="1.106 — Gradient d’image">
        <MathBlock tex="\frac{\partial f}{\partial x}, \quad \frac{\partial f}{\partial y}" />
        <p className="text-sm">Le gradient mesure la variation locale des intensités.</p>
      </Section>

      <Section id="s-1-107" title="1.107 — Interprétation du gradient">
        <p>Gradient fort → changement brutal, contour probable. Gradient faible → zone uniforme.</p>
        <GradientMagnitudeLab />
      </Section>

      <Section id="s-1-108" title="1.108 — Magnitude du gradient">
        <p>Voir démo §1.107 — force du contour via <MathInline tex="|\nabla f|" />.</p>
      </Section>

      <Section id="s-1-109" title="1.109 — Direction du gradient">
        <MathBlock tex="\theta=\tan^{-1}\left(\dfrac{\partial f/\partial y}{\partial f/\partial x}\right)" />
        <p className="text-sm">Direction d’augmentation maximale de l’intensité.</p>
      </Section>

      <Section id="s-1-110" title="1.110 — Continuité et discontinuité">
        <p>Zones lisses = continues ; contours = discontinuités — souvent ce que la vision cherche.</p>
      </Section>

      <Section id="s-1-111" title="1.111 — Voisinage des pixels">
        <PixelNeighborhoodLab />
      </Section>

      <Section id="s-1-112" title="1.112 — Importance du voisinage">
        <p>Segmentation, contours, morphologie mathématique, remplissage de régions.</p>
      </Section>

      <Section id="s-1-113" title="1.113 — Distance entre pixels">
        <PixelDistanceLab />
      </Section>

      <Section id="s-1-114" title="1.114 — Distances alternatives">
        <p>Manhattan et Chessboard — voir onglets de la démo §1.113.</p>
      </Section>

      <Section id="s-1-115" title="1.115 — Topologie des images">
        <p>Structure spatiale, connectivité et géométrie — base de l’analyse de formes.</p>
      </Section>

      <Section id="s-1-116" title="1.116 — Information locale et globale">
        <p>
          <strong>Locale</strong> : petit voisinage (contour). <strong>Globale</strong> : toute l’image (reconnaissance de
          scène).
        </p>
      </Section>

      <Section id="s-1-117" title="1.117 — Redondance spatiale">
        <p>Pixels voisins souvent similaires → compression, filtrage, IA.</p>
        <SpatialCorrelationLab />
      </Section>

      <Section id="s-1-118" title="1.118 — Corrélation spatiale">
        <MathBlock tex="f(x,y) \approx f(x+1,y)" />
      </Section>

      <Section id="s-1-119" title="1.119 — Résumé scientifique">
        <p>Signal 2D, fonction discrète, matrice, tenseur, structure fréquentielle et topologique.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">Signaux 2D, échantillonnage, gradients, distances</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Vision</p>
            <p className="mt-1 text-muted">Contours, fréquences, voisinage, corrélation</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">IA</p>
            <p className="mt-1 text-muted">Tenseurs, représentations multidimensionnelles</p>
          </div>
        </div>
        <ImageCh1MathQuiz />
      </Section>

      <Section id="s-1-120" title="1.120 — Opérations fondamentales sur les pixels">
        <p>
          Début du traitement d’image réel : modifier les valeurs des pixels pour transformer l’information visuelle.
        </p>
      </Section>

      <Section id="s-1-121" title="1.121 — Transformation ponctuelle">
        <MathBlock tex="g(x,y)=T(f(x,y))" />
        <p className="text-sm">Chaque pixel est transformé indépendamment — f entrée, g sortie, T l’opérateur.</p>
      </Section>

      <Section id="s-1-122" title="1.122 — Principe fondamental">
        <p>Ancienne valeur → nouvelle valeur, pixel par pixel.</p>
      </Section>

      <Section id="s-1-123" title="1.123 — Opérations arithmétiques">
        <ArithmeticPixelLab />
      </Section>

      <Section id="s-1-124" title="1.124 — Exemple numérique">
        <p>
          Si <MathInline tex="f=100" /> et <MathInline tex="c=50" />, alors <MathInline tex="g=150" /> (avec saturation à 255 si dépassement).
        </p>
      </Section>

      <Section id="s-1-125" title="1.125 — Saturation numérique">
        <MathBlock tex="0 \le g(x,y) \le 255" />
        <p className="text-sm">Ex. 300 → 255 après addition.</p>
      </Section>

      <Section id="s-1-126" title="1.126 — Soustraction">
        <p><MathInline tex="g=f-c" /> — assombrit l’image (voir démo §1.123).</p>
      </Section>

      <Section id="s-1-127" title="1.127 — Multiplication">
        <p><MathInline tex="g=\alpha f" /> — α &gt; 1 augmente le contraste ; 0 &lt; α &lt; 1 le réduit.</p>
      </Section>

      <Section id="s-1-128" title="1.128 — Contraste d’image">
        <p>Différence entre zones sombres et claires — contraste élevé = détails visibles.</p>
      </Section>

      <Section id="s-1-129" title="1.129 — Transformation affine">
        <AffineTransformLab />
      </Section>

      <Section id="s-1-130" title="1.130 — Négatif d’image">
        <MathBlock tex="g(x,y)=255-f(x,y)" />
        <p className="text-sm">Imagerie médicale, analyse scientifique — voir démo seuillage/négatif.</p>
      </Section>

      <Section id="s-1-131" title="1.131 — Seuillage (Thresholding)">
        <MathBlock tex="g=\begin{cases}255 & f\geq T\\0 & f<T\end{cases}" />
        <NegativeThresholdLab />
      </Section>

      <Section id="s-1-132" title="1.132 — Importance du seuillage">
        <p>Segmentation, OCR, détection d’objets, vision industrielle.</p>
      </Section>

      <Section id="s-1-133" title="1.133 — Exemple intuitif">
        <p>A=200, B=50, T=100 → A blanc, B noir (tableau dans la démo §1.131).</p>
      </Section>

      <Section id="s-1-134" title="1.134 — Seuillage multiple">
        <p>Plusieurs seuils T₁, T₂, T₃ pour séparer plusieurs classes ou régions.</p>
      </Section>

      <Section id="s-1-135" title="1.135 — Transformation logarithmique">
        <MathBlock tex="g(x,y)=c\log(1+f(x,y))" />
        <LogGammaLab />
      </Section>

      <Section id="s-1-136" title="1.136 — Transformation gamma">
        <MathBlock tex="g(x,y)=c\,f(x,y)^\gamma" />
        <p className="text-sm">γ &lt; 1 éclaircit · γ &gt; 1 assombrit.</p>
      </Section>

      <Section id="s-1-137" title="1.137 — Correction gamma">
        <p>Les écrans ne sont pas linéaires — la correction gamma adapte l’image à la perception humaine.</p>
      </Section>

      <Section id="s-1-138" title="1.138 — Normalisation">
        <MathBlock tex="g=\dfrac{f-f_{\min}}{f_{\max}-f_{\min}}" />
        <NormalizeQuantizeLab />
      </Section>

      <Section id="s-1-139" title="1.139 — Pourquoi normaliser ?">
        <p>Deep learning, stabilité numérique, entrées des réseaux neuronaux.</p>
      </Section>

      <Section id="s-1-140" title="1.140 — Quantification">
        <p>Réduire le nombre de niveaux (ex. 256 → 4) — perte de précision, stylisation, compression.</p>
      </Section>

      <Section id="s-1-141" title="1.141 — Binarisation adaptative">
        <p>Seuil local <MathInline tex="T=T(x,y)" /> quand l’éclairage varie sur la scène.</p>
      </Section>

      <Section id="s-1-142" title="1.142 — Histogramme d’image">
        <MathBlock tex="h(r_k)=n_k" />
        <HistogramEqualizationLab />
      </Section>

      <Section id="s-1-143" title="1.143 — Interprétation de l’histogramme">
        <p>Histogramme concentré → faible contraste · histogramme étalé → contraste élevé.</p>
      </Section>

      <Section id="s-1-144" title="1.144 — Égalisation d’histogramme">
        <p>Redistribuer les intensités pour mieux utiliser la plage [0, 255] — bouton dans la démo §1.142.</p>
      </Section>

      <Section id="s-1-145" title="1.145 — Opérations logiques">
        <BinaryLogicLab />
      </Section>

      <Section id="s-1-146" title="1.146 — Masques binaires">
        <p>1 = conserver, 0 = ignorer — contrôle d’une image par une autre.</p>
      </Section>

      <Section id="s-1-147" title="1.147 — Région d’intérêt (ROI)">
        <RoiMaskLab />
      </Section>

      <Section id="s-1-148" title="1.148 — Différence entre deux images">
        <MathBlock tex="d(x,y)=|f(x,y)-g(x,y)|" />
        <p className="text-sm">Détection de mouvement, vidéosurveillance — voir démo §1.149.</p>
      </Section>

      <Section id="s-1-149" title="1.149 — Fusion d’images">
        <MathBlock tex="h=\alpha f+(1-\alpha)g" />
        <ImageDiffBlendLab />
      </Section>

      <Section id="s-1-150" title="1.150 — Résumé scientifique">
        <p>Transformations ponctuelles, histogrammes, masques et fusion — bases du traitement d’image moderne.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">T ponctuel, log, gamma, histogrammes</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Vision</p>
            <p className="mt-1 text-muted">Seuillage, ROI, masques, mouvement</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">IA</p>
            <p className="mt-1 text-muted">Normalisation, prétraitement tenseurs</p>
          </div>
        </div>
        <ImageCh1PixelOpsQuiz />
      </Section>

      <Section id="s-1-151" title="1.151 — Convolution et filtres spatiaux">
        <p>
          La <strong className="text-deep">convolution</strong> est au cœur du traitement d’image, des filtres, des CNN
          et de la détection de contours.
        </p>
      </Section>

      <Section id="s-1-152" title="1.152 — Idée intuitive d’un filtre">
        <p>Un filtre observe un pixel et ses voisins — le résultat dépend du <strong className="text-deep">voisinage spatial</strong>.</p>
      </Section>

      <Section id="s-1-153" title="1.153 — Fenêtre locale (noyau)">
        <p>Petite matrice : noyau, kernel ou masque de convolution (ex. 3×3).</p>
      </Section>

      <Section id="s-1-154" title="1.154 — Principe de convolution">
        <p>Le noyau glisse sur l’image : à chaque position, multiplications puis somme.</p>
      </Section>

      <Section id="s-1-155" title="1.155 — Définition mathématique">
        <MathBlock tex="g(x,y)=\sum_{i=-k}^{k}\sum_{j=-k}^{k}h(i,j)\,f(x-i,y-j)" />
      </Section>

      <Section id="s-1-156" title="1.156 — Interprétation physique">
        <p>Extraire des structures, lisser, accentuer ou détecter des contours.</p>
      </Section>

      <Section id="s-1-157" title="1.157 — Exemple concret">
        <ConvolutionManualLab />
      </Section>

      <Section id="s-1-158" title="1.158 — Filtre moyenneur">
        <p>Moyenne locale → flou et réduction du bruit (démo filtres §1.160).</p>
      </Section>

      <Section id="s-1-159" title="1.159 — Pourquoi le flou réduit le bruit ?">
        <p>La moyenne stabilise les variations aléatoires du bruit.</p>
      </Section>

      <Section id="s-1-160" title="1.160 — Filtre gaussien">
        <MathBlock tex="G(x,y)=\dfrac{1}{2\pi\sigma^2}e^{-\frac{x^2+y^2}{2\sigma^2}}" />
        <SpatialFiltersLab />
      </Section>

      <Section id="s-1-161" title="1.161 — Importance du gaussien">
        <p>Réduit le bruit en conservant mieux les structures — standard avant contours et CNN.</p>
      </Section>

      <Section id="s-1-162" title="1.162 — Hautes et basses fréquences">
        <p>Basses fréquences = zones lisses · hautes fréquences = contours, détails, textures.</p>
      </Section>

      <Section id="s-1-163" title="1.163 — Effet du flou">
        <p>Le flou supprime les hautes fréquences et conserve les basses.</p>
      </Section>

      <Section id="s-1-164" title="1.164 — Détection de contours">
        <p>Contours = changements brusques d’intensité → dérivée élevée.</p>
      </Section>

      <Section id="s-1-165" title="1.165 — Dérivée discrète">
        <MathBlock tex="\frac{\partial f}{\partial x}\approx f(x+1,y)-f(x,y)" />
      </Section>

      <Section id="s-1-166" title="1.166 — Filtre de Sobel">
        <SobelKernelsLab />
      </Section>

      <Section id="s-1-167" title="1.167 — Magnitude du contour">
        <MathBlock tex="|G|=\sqrt{G_x^2+G_y^2}" />
      </Section>

      <Section id="s-1-168" title="1.168 — Direction du contour">
        <MathBlock tex="\theta=\tan^{-1}\left(\dfrac{G_y}{G_x}\right)" />
      </Section>

      <Section id="s-1-169" title="1.169 — Filtre Laplacien">
        <MathBlock tex="\nabla^2 f=\frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}" />
        <p className="text-sm">Dérivée seconde — contours fins (onglet laplacian dans la démo filtres).</p>
      </Section>

      <Section id="s-1-170" title="1.170 — Laplacien discret">
        <p>Noyau 3×3 : centre +4, voisins −1 (voir filtre Laplacien).</p>
      </Section>

      <Section id="s-1-171" title="1.171 — Sharpening (accentuation)">
        <p>Image accentuée ≈ originale + contours (onglet sharpen).</p>
      </Section>

      <Section id="s-1-172" title="1.172 — Filtre médian">
        <MedianVsMeanLab />
      </Section>

      <Section id="s-1-173" title="1.173 — Moyenne vs médiane">
        <p>Moyenne sensible aux extrêmes · médiane robuste au sel-poivre (démo median + bruit).</p>
      </Section>

      <Section id="s-1-174" title="1.174 — Taille du noyau">
        <p>3×3, 5×5, 7×7 — plus le noyau est grand, plus le flou est fort.</p>
      </Section>

      <Section id="s-1-175" title="1.175 — Padding">
        <p>Gestion des bords : zéros, réplication ou réflexion.</p>
      </Section>

      <Section id="s-1-176" title="1.176 — Stride">
        <PaddingStrideLab />
      </Section>

      <Section id="s-1-177" title="1.177 — Convolution et CNN">
        <p>Les CNN utilisent des convolutions avec des <strong className="text-deep">noyaux appris</strong> par entraînement.</p>
      </Section>

      <Section id="s-1-178" title="1.178 — Feature maps">
        <CnnFeatureMapsLab />
      </Section>

      <Section id="s-1-179" title="1.179 — Convolution multidimensionnelle">
        <p>RGB : tenseur H×W×C — noyaux multi-canaux (ex. 3×3×3).</p>
      </Section>

      <Section id="s-1-180" title="1.180 — Résumé scientifique">
        <p>Convolution = opération locale, combinaison pondérée, extracteur spatial — base des filtres et des CNN.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Mathématiques</p>
            <p className="mt-1 text-muted">Convolution, gradient, Laplacien, Gaussienne</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">Vision</p>
            <p className="mt-1 text-muted">Flou, contours, débruitage, features</p>
          </div>
          <div className="rounded-xl border border-cyan-100 p-3 text-sm dark:border-[var(--color-border)]">
            <p className="font-bold text-deep">IA</p>
            <p className="mt-1 text-muted">CNN, feature maps, kernels appris</p>
          </div>
        </div>
        <ImageCh1ConvolutionQuiz />
      </Section>

      <Callout variant="resume" title="Prochaine section (1.181)">
        Morphologie mathématique : dilatation, érosion, ouverture, fermeture et analyse de formes.
      </Callout>
    </>
  )
}
