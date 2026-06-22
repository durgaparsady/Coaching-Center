import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import { fetchCourses } from '../features/courses/courseSlice'
import { fetchStudents } from '../features/students/studentSlice'

function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.auth.username)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchStudents())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="shell">
      <header className="topbar">
        <h1>Coching Center Admin</h1>
        <div className="topbar-right">
          <span>{username}</span>
          <button type="button" className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="content">
        <aside className="sidebar">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/courses">Courses</NavLink>
          <NavLink to="/admin/students">Students</NavLink>
        </aside>

        <main className="main-panel">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
