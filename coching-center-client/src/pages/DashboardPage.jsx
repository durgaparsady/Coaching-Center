import { useMemo } from 'react'
import { useAppSelector } from '../app/hooks'

function DashboardPage() {
  const courses = useAppSelector((state) => state.courses.items)
  const students = useAppSelector((state) => state.students.items)

  const averageFee = useMemo(() => {
    if (!courses.length) {
      return 0
    }

    const total = courses.reduce((sum, item) => sum + Number(item.fees), 0)
    return Math.round(total / courses.length)
  }, [courses])

  return (
    <section>
      <h2>Overview</h2>
      <div className="card-grid">
        <article className="stat-card">
          <span>Total Courses</span>
          <strong>{courses.length}</strong>
        </article>
        <article className="stat-card">
          <span>Total Students Test</span>
          <strong>{students.length}</strong>
        </article>
        <article className="stat-card">
          <span>Average Fees</span>
          <strong>INR {averageFee}</strong>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
