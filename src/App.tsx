import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AskPage } from './pages/AskPage'
import { CasesPage } from './pages/CasesPage'
import { HomePage } from './pages/HomePage'
import { ReportPage } from './pages/ReportPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ask" element={<AskPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
