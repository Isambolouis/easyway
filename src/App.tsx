import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HubPage } from '@/pages/HubPage'
import { CourseHomePage } from '@/pages/CourseHomePage'
import { LessonPage } from '@/pages/LessonPage'
import { QuizPage } from '@/pages/QuizPage'
import { ComputerVisionHubPage } from '@/pages/ComputerVisionHubPage'
import { SubCourseHomePage } from '@/pages/SubCourseHomePage'
import { SubCourseLessonPage } from '@/pages/SubCourseLessonPage'

function LegacyChapterRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/cours/deep-learning/${slug ?? 'introduction'}`} replace />
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <AppShell>
        <Routes>
          <Route path="/" element={<HubPage />} />
          <Route path="/quiz/:categoryId" element={<QuizPage />} />
          <Route path="/cours/computer-vision" element={<ComputerVisionHubPage />} />
          <Route path="/cours/computer-vision/:subCourseId" element={<SubCourseHomePage />} />
          <Route path="/cours/computer-vision/:subCourseId/:slug" element={<SubCourseLessonPage />} />
          <Route path="/cours/:courseId" element={<CourseHomePage />} />
          <Route path="/cours/:courseId/:slug" element={<LessonPage />} />
          <Route path="/chapitre/:slug" element={<LegacyChapterRedirect />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
