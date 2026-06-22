import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../services/apiClient'

const token = localStorage.getItem('adminToken')
const username = localStorage.getItem('adminUsername')

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (payload) => {
  const response = await apiClient.post('/auth/login', payload)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    username,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.username = null
      state.error = null
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUsername')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.username = action.payload.username
        localStorage.setItem('adminToken', action.payload.token)
        localStorage.setItem('adminUsername', action.payload.username)
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Login failed. Check admin credentials.'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
