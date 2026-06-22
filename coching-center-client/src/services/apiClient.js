import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7168/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
