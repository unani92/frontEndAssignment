import axios from 'axios'
import { BASE_URL } from '../constants'

const api = axios
api.defaults.baseURL = BASE_URL

export default api
