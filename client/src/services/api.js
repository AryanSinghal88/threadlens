import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
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
  api.post('/analysis', { youtubeUrl })
export const getAnalyses = () => api.get('/analysis')
export const getAnalysis = (id) => api.get(`/analysis/${id}`)
export const deleteAnalysis = (id) => api.delete(`/analysis/${id}`)