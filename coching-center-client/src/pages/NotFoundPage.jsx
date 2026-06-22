import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/admin/dashboard" className="btn-primary">
        Go to Dashboard
      </Link>
    </section>
  )
}

export default NotFoundPage
