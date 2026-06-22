import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchCourses } from '../features/courses/courseSlice'
import { createStudent, deleteStudent, fetchStudents, updateStudent } from '../features/students/studentSlice'

const initialForm = {
  fullName: '',
  email: '',
  phoneNumber: '',
  courseId: '',
}

function StudentsPage() {
  const dispatch = useAppDispatch()
  const { items: courses } = useAppSelector((state) => state.courses)
  const { items: students, status, error } = useAppSelector((state) => state.students)

  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchStudents())
  }, [dispatch])

  const canSubmit = useMemo(() => Boolean(form.courseId), [form.courseId])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      courseId: Number(form.courseId),
    }

    if (editingId) {
      await dispatch(updateStudent({ id: editingId, payload }))
    } else {
      await dispatch(createStudent(payload))
    }

    setForm(initialForm)
    setEditingId(null)
  }

  const editRow = (item) => {
    setEditingId(item.id)
    setForm({
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      courseId: String(item.courseId),
    })
  }

  return (
    <section>
      <h2>Students</h2>
      <form className="grid-form student-form" onSubmit={handleSubmit}>
        <input
          placeholder="Full name"
          value={form.fullName}
          onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          placeholder="Phone number"
          value={form.phoneNumber}
          onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })}
          required
        />
        <select
          value={form.courseId}
          onChange={(event) => setForm({ ...form, courseId: event.target.value })}
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <button className="btn-primary" type="submit" disabled={!canSubmit}>
          {editingId ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.courseName}</td>
              <td>
                <div className="inline-actions">
                  <button type="button" className="btn-secondary" onClick={() => editRow(student)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => dispatch(deleteStudent(student.id))}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {status === 'loading' && <p>Loading students...</p>}
    </section>
  )
}

export default StudentsPage
