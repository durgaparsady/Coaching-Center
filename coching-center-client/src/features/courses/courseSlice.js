import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../services/apiClient'

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  const response = await apiClient.get('/courses')
  return response.data
})

export const createCourse = createAsyncThunk('courses/create', async (payload, { dispatch }) => {
  await apiClient.post('/courses', payload)
  dispatch(fetchCourses())
})

export const updateCourse = createAsyncThunk('courses/update', async ({ id, payload }, { dispatch }) => {
  await apiClient.put(`/courses/${id}`, payload)
  dispatch(fetchCourses())
})

export const deleteCourse = createAsyncThunk('courses/delete', async (id, { dispatch }) => {
  await apiClient.delete(`/courses/${id}`)
  dispatch(fetchCourses())
})

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Courses could not be loaded.'
      })
      .addCase(createCourse.rejected, (state) => {
        state.error = 'Course create failed.'
      })
      .addCase(updateCourse.rejected, (state) => {
        state.error = 'Course update failed.'
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.error = 'Course delete failed.'
      })
  },
})

export default courseSlice.reducer
