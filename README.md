# Introduction au Deep Learning — application React

Cours web interactif (React 19 + TypeScript + Vite + Tailwind CSS 4).

## Stack

- **Vite** — build & dev server
- **React + TypeScript** — UI modulaire
- **Tailwind CSS v4** — design system
- **React Router** — navigation par chapitre
- **Framer Motion** — animations au scroll
- **Lucide React** — icônes
- **KaTeX / react-katex** — équations mathématiques
- **clsx + tailwind-merge** — classes utilitaires

## Démarrage

```bash
cd intro-deep-learning-app
npm install
npm run dev
```

Ouvrir l’URL affichée (souvent `http://localhost:5173`).

## Export PDF

Bouton **PDF** dans l’en-tête ou `Ctrl+P` → **Enregistrer au format PDF** → activer **Graphiques d’arrière-plan**.

## Structure du code

```
src/
  components/     # UI, layout, interactifs
  chapters/       # Contenu par chapitre (chapterViews.tsx)
  content/        # Métadonnées & sommaire
  pages/          # Home + Chapter
```

## Ajouter du contenu (chats ChatGPT)

1. Coller le texte dans `src/chapters/chapterViews.tsx` (ou créer un fichier par chapitre).
2. Enregistrer le slug dans `src/content/chapters.ts` si nouveau chapitre.
3. Utiliser `<Callout>`, `<Accordion>`, `<NeuronDemo>`, `<QuizCard>`, etc.

## Build production

```bash
npm run build
npm run preview
```
