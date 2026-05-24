export type ImageSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  /** Texte affiché avant la première formule */
  intro?: string
  math?: string
  /** Lecture des symboles (plan cours) */
  reading?: string[]
  /** Formule affichée après les puces (ex. matrice) */
  mathAfter?: string
  callout?: { variant: 'definition' | 'important' | 'resume'; title?: string; body: string }
}

export type ImageChapterContent = {
  partTitle?: string
  lead?: string
  sections: ImageSection[]
}
