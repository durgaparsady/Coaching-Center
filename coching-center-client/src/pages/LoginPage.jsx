import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginAdmin } from '../features/auth/authSlice'

function LoginPage() {
  const [form, setForm] = useState({ username: 'admin', password: 'Admin@123' })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token, status, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard')
    }
  }, [token, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(loginAdmin(form))
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p>Manage courses and students from one panel.</p>

        <form onSubmit={handleSubmit} className="grid-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
