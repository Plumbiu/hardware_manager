import axios from 'axios'
import { apiBaseURL } from './useEnv'

const request = axios.create({
  baseURL: apiBaseURL
})

request.interceptors.request.use(request => {
  const hardware_jwt_token = window.localStorage.getItem('hardware_jwt_token')
  if (hardware_jwt_token) {
    // 此处有坑，下方记录
    request.headers['Authorization'] = `Bearer ${hardware_jwt_token}`
  }
  return request
})

request.interceptors.response.use(
  response => {
    if (response.data.token) {
      window.localStorage.setItem('hardware_jwt_token', response.data.token)
    }
    return response
  },
  error => {
    const errRes = error.response
    if (errRes.status === 401) {
      window.localStorage.removeItem('hardware_jwt_token')
    }
    return Promise.reject(error.message)   // 返回接口返回的错误信息
  }
)
export default request