import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import coursesReducer from '../features/courses/courseSlice'
import studentsReducer from '../features/students/studentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    students: studentsReducer,
  },
})
