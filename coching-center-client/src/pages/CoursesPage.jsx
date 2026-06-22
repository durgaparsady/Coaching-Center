import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createCourse, deleteCourse, fetchCourses, updateCourse } from '../features/courses/courseSlice'

const initialForm = { name: '', description: '', fees: '' }

function CoursesPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.courses)
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      name: form.name,
      description: form.description,
      fees: Number(form.fees),
    }

    if (editingId) {
      await dispatch(updateCourse({ id: editingId, payload }))
    } else {
      await dispatch(createCourse(payload))
    }

    setForm(initialForm)
    setEditingId(null)
  }

  const editRow = (item) => {
    setEditingId(item.id)
    setForm({ name: item.name, description: item.description, fees: item.fees })
  }

  return (
    <section>
      <h2>Courses</h2>
      <form className="grid-form course-form" onSubmit={handleSubmit}>
        <input
          placeholder="Course name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Fees"
          value={form.fees}
          onChange={(event) => setForm({ ...form, fees: event.target.value })}
          required
        />
        <button className="btn-primary" type="submit">
          {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.fees}</td>
              <td>
                <div className="inline-actions">
                  <button type="button" className="btn-secondary" onClick={() => editRow(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => dispatch(deleteCourse(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {status === 'loading' && <p>Loading courses...</p>}
    </section>
  )
}

export default CoursesPage
