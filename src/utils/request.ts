import axios from 'axios'
import { apiBaseURL } from './useEnv'

const request = axios.create({
  baseURL: apiBaseURL
})

export default request