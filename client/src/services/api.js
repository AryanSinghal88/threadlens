import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api',
})

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export const registerUser = (data) => api.post('/auth/register', data)
export const loginUser = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')

export const createAnalysis = (youtubeUrl) =>
  api.post('/analyses', { youtubeUrl })
export const getAnalyses = () => api.get('/analyses')
export const getAnalysis = (id) => api.get(`/analyses/${id}`)
export const deleteAnalysis = (id) => api.delete(`/analyses/${id}`)