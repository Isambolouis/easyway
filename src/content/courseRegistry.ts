/** Réexport pour compatibilité résolveur Vite (évite 404 sur courseRegistry.ts) */
export {
  getChaptersForCourse,
  getChapter,
  getLessonView,
  getCourseFromPath,
} from './courseRegistry.tsx'
