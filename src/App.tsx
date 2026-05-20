import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HubPage } from '@/pages/HubPage'
import { CourseHomePage } from '@/pages/CourseHomePage'
import { LessonPage } from '@/pages/LessonPage'

function LegacyChapterRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/cours/deep-learning/${slug ?? 'introduction'}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HubPage />} />
          <Route path="/cours/:courseId" element={<CourseHomePage />} />
          <Route path="/cours/:courseId/:slug" element={<LessonPage />} />
          <Route path="/chapitre/:slug" element={<LegacyChapterRedirect />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
