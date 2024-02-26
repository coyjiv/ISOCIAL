import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
  return config
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (401 === error.response.status) {
      const originalRequest = error.config
      if (!originalRequest._retry) {
        originalRequest._retry = true
      }

      if (localStorage.getItem('refresh')) {
        const refresh = localStorage.getItem('refresh')

        try {
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            JSON.stringify({ refresh: refresh }),
            { headers: { 'Content-Type': 'application/json' } }
          )
          if (response.status === 200) {
            localStorage.setItem('access', response.data.access)
            originalRequest.headers.Authorization =
              'Bearer ' + response.data.access
            return axios(originalRequest)
          }
        } catch (exception) {
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          localStorage.removeItem('userId')
          window.location.href = '/login'
        }
      }
      return Promise.reject()
    } else {
      return Promise.reject(error)
    }
  }
)
