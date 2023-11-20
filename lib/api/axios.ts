import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL } from '../constants'

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const axiosInstance = axios.create()
const api: HttpClient = axiosInstance
api.defaults.baseURL = BASE_URL

export default api

api.interceptors.response.use(res => res.data)
