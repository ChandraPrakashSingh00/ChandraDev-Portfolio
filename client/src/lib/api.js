import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function sendContactMessage(payload) {
  const { data } = await api.post('/contact', payload)
  return data
}

export async function fetchProjects() {
  const { data } = await api.get('/projects')
  return data
}

export default api
