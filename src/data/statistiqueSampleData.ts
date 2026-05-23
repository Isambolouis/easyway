/** Jeu de données pédagogique — notes d'étudiants */
export const STUDENTS_SAMPLE = [
  { etudiant: 'A', age: 20, note: 14, sexe: 'M' },
  { etudiant: 'B', age: 22, note: 18, sexe: 'F' },
  { etudiant: 'C', age: 19, note: 12, sexe: 'M' },
  { etudiant: 'D', age: 21, note: 16, sexe: 'F' },
  { etudiant: 'E', age: 20, note: 14, sexe: 'M' },
  { etudiant: 'F', age: 23, note: 11, sexe: 'F' },
  { etudiant: 'G', age: 19, note: 17, sexe: 'M' },
  { etudiant: 'H', age: 22, note: 15, sexe: 'F' },
]

export const NOTES_EXTENDED = [10, 12, 12, 14, 14, 14, 15, 16, 16, 17, 18, 11, 13, 14, 16, 18, 9, 15, 17, 12]

export const NOTES_SIMPLE = [10, 12, 14, 16, 18]

/** Série du chapitre 1 — exemple tableau (N = 7) */
export const CH1_SERIES_NOTES = [12, 14, 15, 14, 10, 18, 16]

/** Exercice 2 — chapitre organisation des données */
export const CH1_EX2_NOTES = [8, 10, 10, 12, 14, 14, 14, 16, 18]

export const CLASSES_GROUPED = [
  { classe: '10-14', effectif: 5, centre: 12 },
  { classe: '15-19', effectif: 8, centre: 17 },
  { classe: '20-24', effectif: 2, centre: 22 },
]

export const SEXE_EFFECTIFS = [
  { name: 'M', value: 11 },
  { name: 'F', value: 9 },
]

export const SCATTER_AGE_NOTE = STUDENTS_SAMPLE.map((s) => ({
  age: s.age,
  note: s.note,
  name: s.etudiant,
}))

/** Chapitre 2 — diagramme en bâtons (notes) */
export const CH2_BAR_NOTES = [
  { note: '10', effectif: 2 },
  { note: '12', effectif: 3 },
  { note: '14', effectif: 5 },
  { note: '16', effectif: 1 },
]

/** Chapitre 2 — histogramme (classes à amplitude égale) */
export const CH2_HIST_CLASSES = [
  { classe: '0-10', effectif: 4 },
  { classe: '10-20', effectif: 8 },
  { classe: '20-30', effectif: 6 },
]

/** Chapitre 2 — camembert A/B/C */
export const CH2_PIE_ABC = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
  { name: 'C', value: 30 },
]

/** Chapitre 2 — ogive (fréquences cumulées) */
export const CH2_OGIVE = [
  { label: '10', cumul: 0.1 },
  { label: '12', cumul: 0.3 },
  { label: '14', cumul: 0.6 },
  { label: '16', cumul: 0.9 },
  { label: '18', cumul: 1.0 },
]

/** Chapitre 2 — nuage de points (aperçu corrélation) */
export const CH2_SCATTER_TAILLE_POIDS = [
  { taille: 160, poids: 55 },
  { taille: 165, poids: 60 },
  { taille: 170, poids: 65 },
  { taille: 175, poids: 70 },
  { taille: 180, poids: 75 },
]

/** Exercice 1 ch.2 — bâtons */
export const CH2_EX1_BARS = [
  { valeur: '1', effectif: 2 },
  { valeur: '2', effectif: 5 },
  { valeur: '3', effectif: 3 },
  { valeur: '4', effectif: 6 },
]

/** Exercice 2 ch.2 — histogramme */
export const CH2_EX2_HIST = [
  { classe: '0-5', effectif: 4 },
  { classe: '5-10', effectif: 6 },
  { classe: '10-15', effectif: 10 },
]

/** Exercice 3 ch.2 — camembert */
export const CH2_EX3_PIE = [
  { name: 'A', value: 15 },
  { name: 'B', value: 25 },
  { name: 'C', value: 10 },
]

/** Chapitre 3 — moyenne pondérée (effectifs) */
export const CH3_WEIGHTED_NOTES = [
  { value: 10, effectif: 2 },
  { value: 12, effectif: 1 },
  { value: 14, effectif: 3 },
]

/** Chapitre 3 — médiane série paire */
export const CH3_MEDIAN_EVEN = [10, 12, 14, 16]

/** Chapitre 3 — mode */
export const CH3_MODE_SERIES = [2, 3, 3, 3, 4, 5]

/** Chapitre 3 — comparaison moyenne vs médiane (valeur extrême) */
export const CH3_OUTLIER_SERIES = [10, 12, 14, 16, 100]

/** Exercices ch.3 */
export const CH3_EX1_MEAN = [5, 7, 9, 11, 13]
export const CH3_EX2_WEIGHTED = [
  { value: 2, effectif: 1 },
  { value: 4, effectif: 3 },
  { value: 6, effectif: 2 },
]
export const CH3_EX3_MEDIAN = [3, 8, 12, 15, 20, 25]
export const CH3_EX4_MODE = [1, 2, 2, 3, 3, 3, 4, 5]

/** Chapitre 4 — même moyenne, dispersions différentes */
export const CH4_SERIES_A = [9, 10, 10, 11, 10]
export const CH4_SERIES_B = [0, 10, 20, 10, 10]

/** Chapitre 4 — exemple variance pas à pas */
export const CH4_VARIANCE_EX = [2, 4, 6, 8]

/** Chapitre 4 — salaires (dispersion faible / forte) */
export const CH4_SALARY_LOW = [1000, 1020, 980, 1005]
export const CH4_SALARY_HIGH = [200, 1000, 3000, 500]

/** Exercices ch.4 */
export const CH4_EX1 = [3, 5, 7, 9]
export const CH4_EX3_A = [10, 10, 10, 10]
export const CH4_EX3_B = [5, 10, 15, 20]
export const CH4_EX4_WEIGHTED = [
  { value: 1, effectif: 2 },
  { value: 3, effectif: 3 },
  { value: 5, effectif: 5 },
]

/** Chapitre 5 — quartiles (exemple cours n = 8) */
export const CH5_QUARTILES_EX = [2, 4, 6, 8, 10, 12, 14, 16]

/** Chapitre 5 — exemple complet (n = 10) */
export const CH5_FULL_SERIES = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21]

/** Chapitre 5 — déciles 1…10 */
export const CH5_DECILES_SERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/** Exercices ch.5 */
export const CH5_EX1 = [4, 6, 8, 10, 12, 14, 16, 18]
export const CH5_CLASS_20 = Array.from({ length: 20 }, (_, i) => i + 1)

/** Chapitre 6 — boxplot (5 nombres, sans outlier) */
export const CH6_BOXPLOT_EX = [2, 4, 6, 8, 10, 12, 14, 16]

/** Chapitre 6 — exemple avec outlier */
export const CH6_OUTLIER_EX = [1, 2, 3, 4, 5, 6, 7, 20]

/** Exercices ch.6 */
export const CH6_EX1 = [5, 7, 8, 10, 12, 15, 18, 20]
export const CH6_EX4 = [3, 4, 5, 6, 7, 8, 9, 50]

/** Chapitre 7 — heures d'étude vs note */
export const CH7_STUDY_HOURS = [
  { etudiant: 'A', heures: 1, note: 8 },
  { etudiant: 'B', heures: 2, note: 10 },
  { etudiant: 'C', heures: 3, note: 12 },
  { etudiant: 'D', heures: 4, note: 14 },
  { etudiant: 'E', heures: 5, note: 16 },
]

export const CH7_STUDY_X = CH7_STUDY_HOURS.map((d) => d.heures)
export const CH7_STUDY_Y = CH7_STUDY_HOURS.map((d) => d.note)

/** Chapitre 7 — scatter pour graphique */
export const CH7_STUDY_SCATTER = CH7_STUDY_HOURS.map((d) => ({
  heures: d.heures,
  note: d.note,
  name: d.etudiant,
}))

/** Exercices ch.7 */
export const CH7_EX1_X = [1, 2, 3, 4]
export const CH7_EX1_Y = [2, 4, 6, 8]

export const CH7_STRESS_DATA = [
  { heures: 1, stress: 8 },
  { heures: 2, stress: 7 },
  { heures: 3, stress: 6 },
  { heures: 4, stress: 4 },
  { heures: 5, stress: 3 },
]

/** Chapitre 8 — données brutes puis classes */
export const CH8_RAW_VALUES = [12, 15, 18, 21, 22, 24, 26, 28, 30, 35, 38, 40]

export const CH8_CLASS_DEFS = [
  { lower: 10, upper: 20, label: '10 – 19' },
  { lower: 20, upper: 30, label: '20 – 29' },
  { lower: 30, upper: 40, label: '30 – 39' },
  { lower: 40, upper: 50, label: '40 – 49' },
]

/** Exercice 1 ch.8 */
export const CH8_EX1_RAW = [5, 7, 9, 12, 15, 18, 21, 24, 27, 30]

export const CH8_EX1_CLASS_DEFS = [
  { lower: 0, upper: 10, label: '0 – 10' },
  { lower: 10, upper: 20, label: '10 – 20' },
  { lower: 20, upper: 30, label: '20 – 30' },
]

/** Fréquences cumulées — exemple tableau cours */
export const CH8_FREQ_CUMUL_EX = [
  { classe: '10–20', fi: 0.2, Fi: 0.2 },
  { classe: '20–30', fi: 0.3, Fi: 0.5 },
  { classe: '30–40', fi: 0.5, Fi: 1.0 },
]

/** Chapitre 9 — comparaison dispersion */
export const CH9_CLASS_A = [11, 12, 12, 13, 12]
export const CH9_CLASS_B = [5, 10, 12, 15, 20]

/** Chapitre 9 — tendance croissante */
export const CH9_TREND = [
  { t: 1, v: 5 },
  { t: 2, v: 7 },
  { t: 3, v: 9 },
]

/** Chapitre 10 — clients (data science / EDA) */
export const CH10_CLIENTS = [
  { client: 'A', age: 20, revenu: 300, depenses: 50 },
  { client: 'B', age: 25, revenu: 500, depenses: 100 },
  { client: 'C', age: 30, revenu: 800, depenses: 200 },
  { client: 'D', age: 35, revenu: 1200, depenses: 300 },
]

export const CH10_CLIENT_SCATTER = CH10_CLIENTS.map((c) => ({
  revenu: c.revenu,
  depenses: c.depenses,
  name: c.client,
}))

/** Chapitre 10 — PIB et population (économie) */
export const CH10_GDP = [
  { pays: 'A', pib: 1000, population: 10 },
  { pays: 'B', pib: 2000, population: 20 },
  { pays: 'C', pib: 3000, population: 30 },
].map((r) => ({
  ...r,
  pibParHabitant: r.pib / r.population,
}))

/** PIB/habitant fictifs (M€) — comparaison inégalités pour boxplot */
export const CH10_GDP_PER_CAPITA = [28, 35, 42, 48, 55, 61, 38, 52]

/** Chapitre 10 — ventes magasin (cas pratique) */
export const CH10_STORE_SALES = [
  { jour: 'Lun', ventes: 100 },
  { jour: 'Mar', ventes: 120 },
  { jour: 'Mer', ventes: 150 },
  { jour: 'Jeu', ventes: 130 },
  { jour: 'Ven', ventes: 200 },
]

/** Chapitre 10 — prédiction IA (4 points) */
export const CH10_IA_STUDY = [
  { heures: 1, note: 8 },
  { heures: 2, note: 10 },
  { heures: 3, note: 12 },
  { heures: 4, note: 14 },
]

export const CH10_IA_X = CH10_IA_STUDY.map((d) => d.heures)
export const CH10_IA_Y = CH10_IA_STUDY.map((d) => d.note)

/** Projet — performances d'une classe (dataset complet) */
export const PROJECT_CLASS_STUDENTS = [
  { etudiant: 'A', heures: 1, presence: 60, note: 8 },
  { etudiant: 'B', heures: 2, presence: 70, note: 10 },
  { etudiant: 'C', heures: 3, presence: 80, note: 12 },
  { etudiant: 'D', heures: 4, presence: 90, note: 14 },
  { etudiant: 'E', heures: 5, presence: 95, note: 16 },
  { etudiant: 'F', heures: 6, presence: 85, note: 15 },
  { etudiant: 'G', heures: 2, presence: 65, note: 9 },
  { etudiant: 'H', heures: 4, presence: 88, note: 13 },
  { etudiant: 'I', heures: 3, presence: 75, note: 11 },
  { etudiant: 'J', heures: 5, presence: 92, note: 17 },
]

export const PROJECT_CLASS_NOTES = PROJECT_CLASS_STUDENTS.map((s) => s.note)
export const PROJECT_CLASS_HEURES = PROJECT_CLASS_STUDENTS.map((s) => s.heures)
export const PROJECT_CLASS_PRESENCE = PROJECT_CLASS_STUDENTS.map((s) => s.presence)

export const PROJECT_SCATTER_HEURES = PROJECT_CLASS_STUDENTS.map((s) => ({
  heures: s.heures,
  note: s.note,
  name: s.etudiant,
}))

export const PROJECT_SCATTER_PRESENCE = PROJECT_CLASS_STUDENTS.map((s) => ({
  presence: s.presence,
  note: s.note,
  name: s.etudiant,
}))

/** Seuil élèves à risque (projet) */
export const PROJECT_AT_RISK_THRESHOLD = 10
