/** Plan complet — structure fidèle au syllabus (puces et formules conservées). */

export type ImagePlanSection = {
  id: string
  title: string
  intro?: string
  bullets?: string[]
  math?: string
  mathAfter?: string
  reading?: string[]
}

export type ImagePlanChapter = {
  number: number
  title: string
  slug: string
  sections: ImagePlanSection[]
}

export type ImagePlanPart = {
  id: number
  title: string
  chapters: ImagePlanChapter[]
}

export const imageCoursePlanParts: ImagePlanPart[] = [
  {
    id: 1,
    title: 'PARTIE I — Fondements atomiques de l’image numérique',
    chapters: [
      {
        number: 1,
        title: 'Nature physique et mathématique d’une image',
        slug: 'nature-image-pixel',
        sections: [
          {
            id: '1.1',
            title: '1.1 Qu’est-ce qu’une image ?',
            bullets: [
              'Définition physique',
              'Lumière et formation d’image',
              'Vision humaine vs vision machine',
              'Image analogique et numérique',
            ],
          },
          {
            id: '1.2',
            title: '1.2 Structure atomique d’une image : le pixel',
            bullets: [
              'Définition d’un pixel',
              'Coordonnées spatiales',
              'Intensité lumineuse',
              'Codage binaire',
            ],
          },
          {
            id: '1.3',
            title: '1.3 Représentation matricielle d’une image',
            intro: 'Une image est une fonction mathématique :',
            math: String.raw`I(x,y)`,
            reading: [
              '(x) : position horizontale',
              '(y) : position verticale',
              '(I) : intensité du pixel',
            ],
            bullets: ['Image matricielle :'],
            mathAfter: String.raw`I = \begin{bmatrix} 12 & 45 & 78 \\ 34 & 90 & 255 \\ 67 & 120 & 210 \end{bmatrix}`,
          },
          {
            id: '1.4',
            title: '1.4 Types d’images',
            bullets: [
              'Image binaire',
              'Niveaux de gris',
              'RGB',
              'RGBA',
              'Multispectrale',
              'Hyperspectrale',
            ],
          },
          {
            id: '1.5',
            title: '1.5 Résolution et dimensions',
            bullets: ['Largeur × hauteur', 'DPI/PPI', 'Taille mémoire', 'Profondeur de bits'],
          },
          {
            id: '1.6',
            title: '1.6 Compression d’image',
            bullets: ['PNG', 'JPEG', 'WebP', 'Compression avec perte et sans perte'],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'PARTIE II — Mathématiques fondamentales des images',
    chapters: [
      {
        number: 2,
        title: 'Algèbre linéaire pour les images',
        slug: 'algebre-lineaire-images',
        sections: [
          { id: '2.1', title: '2.1 Matrices et tenseurs' },
          {
            id: '2.2',
            title: '2.2 Opérations matricielles',
            bullets: ['Addition', 'Multiplication', 'Transposition'],
          },
          {
            id: '2.3',
            title: '2.3 Vecteurs couleur',
            intro: 'Pixel RGB :',
            math: String.raw`\vec{p} = (R,G,B)`,
          },
          {
            id: '2.4',
            title: '2.4 Normes et distances',
            bullets: ['Distance euclidienne', 'Similarité entre pixels'],
          },
          { id: '2.5', title: '2.5 Espaces vectoriels des images' },
        ],
      },
      {
        number: 3,
        title: 'Statistiques appliquées aux images',
        slug: 'statistiques-images',
        sections: [
          {
            id: '3.1',
            title: '3.1 Histogrammes',
            intro: 'Fonction histogramme :',
            math: String.raw`h(r_k)=n_k`,
            reading: ['(r_k) : niveau de gris', '(n_k) : nombre de pixels'],
          },
          {
            id: '3.2',
            title: '3.2 Moyenne d’intensité',
            math: String.raw`\mu = \frac{1}{MN}\sum_{x=0}^{M-1}\sum_{y=0}^{N-1} I(x,y)`,
          },
          {
            id: '3.3',
            title: '3.3 Variance et contraste',
            math: String.raw`\sigma^2 = \frac{1}{MN}\sum (I(x,y)-\mu)^2`,
          },
          { id: '3.4', title: '3.4 Distribution des pixels' },
          { id: '3.5', title: '3.5 Entropie d’image' },
          { id: '3.6', title: '3.6 Bruit statistique' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'PARTIE III — Manipulation fondamentale des images',
    chapters: [
      {
        number: 4,
        title: 'Manipulations pixel par pixel',
        slug: 'manipulation-pixel',
        sections: [
          { id: '4.1', title: '4.1 Inversion' },
          { id: '4.2', title: '4.2 Luminosité' },
          { id: '4.3', title: '4.3 Contraste' },
          {
            id: '4.4',
            title: '4.4 Seuillage',
            intro: 'Transformation :',
            math: String.raw`g(x,y)=T(f(x,y))`,
          },
          { id: '4.5', title: '4.5 Quantification' },
          { id: '4.6', title: '4.6 Normalisation' },
          { id: '4.7', title: '4.7 Gamma correction' },
        ],
      },
      {
        number: 5,
        title: 'Transformations géométriques',
        slug: 'transformations-geometriques',
        sections: [
          { id: '5.1', title: '5.1 Translation' },
          { id: '5.2', title: '5.2 Rotation' },
          { id: '5.3', title: '5.3 Mise à l’échelle' },
          { id: '5.4', title: '5.4 Symétrie' },
          {
            id: '5.5',
            title: '5.5 Cisaillement',
            intro: 'Rotation 2D :',
            math: String.raw`\begin{bmatrix}x'\\y'\end{bmatrix}=\begin{bmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}`,
          },
          {
            id: '5.6',
            title: '5.6 Interpolation',
            bullets: ['Nearest neighbor', 'Bilinéaire', 'Bicubique'],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'PARTIE IV — Filtrage et amélioration d’images',
    chapters: [
      {
        number: 6,
        title: 'Filtres spatiaux',
        slug: 'filtres-spatiaux',
        sections: [
          {
            id: '6.1',
            title: '6.1 Convolution',
            math: String.raw`g(x,y)=\sum_{i=-k}^{k}\sum_{j=-k}^{k} h(i,j)f(x-i,y-j)`,
          },
          { id: '6.2', title: '6.2 Noyaux de convolution' },
          { id: '6.3', title: '6.3 Flou gaussien' },
          {
            id: '6.4',
            title: '6.4 Détection de contours',
            bullets: ['Sobel', 'Prewitt', 'Laplacien'],
          },
          { id: '6.5', title: '6.5 Sharpening' },
          {
            id: '6.6',
            title: '6.6 Réduction de bruit',
            bullets: ['Médian', 'Bilatéral', 'Wiener'],
          },
        ],
      },
      {
        number: 7,
        title: 'Domaine fréquentiel',
        slug: 'domaine-frequentiel',
        sections: [
          { id: '7.1', title: '7.1 Théorie des fréquences' },
          {
            id: '7.2',
            title: '7.2 Transformée de Fourier',
            math: String.raw`F(u,v)=\sum_x\sum_y f(x,y)e^{-j2\pi(ux/M+vy/N)}`,
          },
          { id: '7.3', title: '7.3 Spectre fréquentiel' },
          {
            id: '7.4',
            title: '7.4 Filtres fréquentiels',
            bullets: ['Passe-bas', 'Passe-haut'],
          },
          { id: '7.5', title: '7.5 Compression fréquentielle' },
          { id: '7.6', title: '7.6 JPEG et DCT' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'PARTIE V — Segmentation et extraction d’informations',
    chapters: [
      {
        number: 8,
        title: 'Segmentation d’image',
        slug: 'segmentation-image',
        sections: [
          { id: '8.1', title: '8.1 Seuillage global' },
          { id: '8.2', title: '8.2 Méthode d’Otsu' },
          { id: '8.3', title: '8.3 Croissance de région' },
          { id: '8.4', title: '8.4 Watershed' },
          { id: '8.5', title: '8.5 K-means sur images' },
          { id: '8.6', title: '8.6 Segmentation par contours' },
        ],
      },
      {
        number: 9,
        title: 'Détection de caractéristiques',
        slug: 'detection-caracteristiques',
        sections: [
          {
            id: '9.1',
            title: '9.1 Coins et points d’intérêt',
            bullets: ['Harris', 'Shi-Tomasi'],
          },
          {
            id: '9.2',
            title: '9.2 Descripteurs',
            bullets: ['SIFT', 'SURF', 'ORB'],
          },
          {
            id: '9.3',
            title: '9.3 Détection de contours avancée',
            bullets: ['Canny'],
          },
          { id: '9.4', title: '9.4 Texture' },
          { id: '9.5', title: '9.5 Moments d’image' },
          { id: '9.6', title: '9.6 Formes géométriques' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'PARTIE VI — Compréhension d’image',
    chapters: [
      {
        number: 10,
        title: 'Analyse et reconnaissance d’objets',
        slug: 'reconnaissance-objets',
        sections: [
          { id: '10.1', title: '10.1 Classification d’images' },
          { id: '10.2', title: '10.2 Détection d’objets' },
          { id: '10.3', title: '10.3 Localisation' },
          { id: '10.4', title: '10.4 Tracking vidéo' },
          { id: '10.5', title: '10.5 Reconnaissance faciale' },
          { id: '10.6', title: '10.6 OCR (lecture de texte)' },
        ],
      },
      {
        number: 11,
        title: 'Vision 3D',
        slug: 'vision-3d',
        sections: [
          { id: '11.1', title: '11.1 Géométrie projective' },
          {
            id: '11.2',
            title: '11.2 Caméra pinhole',
            math: String.raw`x = \frac{fX}{Z},\quad y = \frac{fY}{Z}`,
          },
          { id: '11.3', title: '11.3 Calibration caméra' },
          { id: '11.4', title: '11.4 Stéréovision' },
          { id: '11.5', title: '11.5 Reconstruction 3D' },
          { id: '11.6', title: '11.6 Depth maps' },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'PARTIE VII — Intelligence artificielle et Deep Learning',
    chapters: [
      {
        number: 12,
        title: 'Introduction au Deep Learning visuel',
        slug: 'deep-learning-visuel-intro',
        sections: [
          { id: '12.1', title: '12.1 Neurones artificiels' },
          { id: '12.2', title: '12.2 Réseaux de neurones' },
          { id: '12.3', title: '12.3 Descente de gradient' },
          { id: '12.4', title: '12.4 Fonction de coût' },
        ],
      },
      {
        number: 13,
        title: 'Réseaux convolutifs (CNN)',
        slug: 'reseaux-convolutifs-cnn',
        sections: [
          { id: '13.1', title: '13.1 Convolution profonde' },
          { id: '13.2', title: '13.2 Pooling' },
          { id: '13.3', title: '13.3 Feature maps' },
          {
            id: '13.4',
            title: '13.4 Architecture CNN',
            bullets: ['LeNet', 'AlexNet', 'VGG', 'ResNet'],
          },
          { id: '13.5', title: '13.5 Backpropagation' },
        ],
      },
      {
        number: 14,
        title: 'Segmentation et détection avancées',
        slug: 'segmentation-detection-avancees',
        sections: [
          { id: '14.1', title: '14.1 U-Net' },
          { id: '14.2', title: '14.2 YOLO' },
          { id: '14.3', title: '14.3 Faster R-CNN' },
          { id: '14.4', title: '14.4 Mask R-CNN' },
          { id: '14.5', title: '14.5 Vision Transformers (ViT)' },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'PARTIE VIII — Traitement avancé et recherche',
    chapters: [
      {
        number: 15,
        title: 'Génération et restauration d’images',
        slug: 'generation-restauration',
        sections: [
          { id: '15.1', title: '15.1 Super-résolution' },
          { id: '15.2', title: '15.2 Inpainting' },
          { id: '15.3', title: '15.3 Débruitage IA' },
          { id: '15.4', title: '15.4 GANs' },
          { id: '15.5', title: '15.5 Diffusion Models' },
        ],
      },
      {
        number: 16,
        title: 'Applications modernes',
        slug: 'applications-modernes',
        sections: [
          { id: '16.1', title: '16.1 Médecine' },
          { id: '16.2', title: '16.2 Satellites' },
          { id: '16.3', title: '16.3 Biométrie' },
          { id: '16.4', title: '16.4 Véhicules autonomes' },
          { id: '16.5', title: '16.5 Robotique' },
          { id: '16.6', title: '16.6 Réalité augmentée' },
          { id: '16.7', title: '16.7 Sécurité informatique' },
          { id: '16.8', title: '16.8 Industrie' },
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'PARTIE IX — Implémentation pratique',
    chapters: [
      {
        number: 17,
        title: 'OpenCV complet',
        slug: 'opencv-complet',
        sections: [
          { id: '17.1', title: '17.1 Lecture et affichage' },
          { id: '17.2', title: '17.2 Manipulation pixel' },
          { id: '17.3', title: '17.3 Filtres' },
          { id: '17.4', title: '17.4 Détection de contours' },
          { id: '17.5', title: '17.5 Vision temps réel' },
          { id: '17.6', title: '17.6 Webcam' },
          { id: '17.7', title: '17.7 Détection IA avec OpenCV' },
        ],
      },
      {
        number: 18,
        title: 'Projet final de vision par ordinateur',
        slug: 'projet-final-vision',
        sections: [
          {
            id: '18.p',
            title: 'Projets possibles',
            bullets: [
              'Détecteur de visages',
              'OCR intelligent',
              'Système de surveillance',
              'Détection d’objets',
              'Classification médicale',
              'Analyse satellite',
              'Reconnaissance des émotions',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'PARTIE X — Fondements théoriques avancés',
    chapters: [
      {
        number: 19,
        title: 'Théorie mathématique avancée',
        slug: 'theorie-mathematique-avancee',
        sections: [
          { id: '19.1', title: '19.1 Théorie de l’information' },
          { id: '19.2', title: '19.2 Entropie de Shannon' },
          { id: '19.3', title: '19.3 Optimisation' },
          { id: '19.4', title: '19.4 Géométrie différentielle' },
          { id: '19.5', title: '19.5 Analyse variationnelle' },
          { id: '19.6', title: '19.6 Probabilités bayésiennes' },
        ],
      },
    ],
  },
]

export const imageMasteryOutcomes = [
  'lire une image comme une structure mathématique',
  'comprendre chaque pixel scientifiquement',
  'transformer les images',
  'filtrer et améliorer des images',
  'extraire des caractéristiques',
  'construire des systèmes de vision',
  'utiliser OpenCV',
  'développer des modèles IA de vision par ordinateur',
  'comprendre les CNN modernes',
  'créer des projets complets de computer vision',
]

export const imageAcademicScope = [
  'traitement d’image',
  'vision par ordinateur',
  'vision artificielle',
  'deep learning visuel',
  'analyse d’images scientifiques',
  'bases de l’imagerie IA moderne',
]
