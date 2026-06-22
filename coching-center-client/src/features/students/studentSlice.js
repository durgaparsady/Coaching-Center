import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../services/apiClient'

export const fetchStudents = createAsyncThunk('students/fetchAll', async () => {
  const response = await apiClient.get('/students')
  return response.data
})

export const createStudent = createAsyncThunk('students/create', async (payload, { dispatch }) => {
  await apiClient.post('/students', payload)
  dispatch(fetchStudents())
})

export const updateStudent = createAsyncThunk('students/update', async ({ id, payload }, { dispatch }) => {
  await apiClient.put(`/students/${id}`, payload)
  dispatch(fetchStudents())
})

export const deleteStudent = createAsyncThunk('students/delete', async (id, { dispatch }) => {
  await apiClient.delete(`/students/${id}`)
  dispatch(fetchStudents())
})

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Students could not be loaded.'
      })
      .addCase(createStudent.rejected, (state) => {
        state.error = 'Student create failed.'
      })
      .addCase(updateStudent.rejected, (state) => {
        state.error = 'Student update failed.'
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.error = 'Student delete failed.'
      })
  },
})

export default studentSlice.reducer
