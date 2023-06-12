import axios from 'axios'
import { apiBaseURL } from './useEnv'

const request = axios.create({
  baseURL: apiBaseURL
})

request.interceptors.request.use(request => {
  const hardware_jwt_token = localStorage.getItem('hardware_jwt_token')
  if (hardware_jwt_token) 
    request.headers['Authorization'] = `Bearer ${hardware_jwt_token}`
  return request
})

request.interceptors.response.use(
  response => {
    if (response.data.token)
      localStorage.setItem('hardware_jwt_token', response.data.token.replace('Bearer ', ''))
    return response
  }
)
export default request