import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import CoursesPage from '../pages/CoursesPage'
import StudentsPage from '../pages/StudentsPage'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
