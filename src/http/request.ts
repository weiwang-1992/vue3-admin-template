import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 15000
})

//请求拦截
service.interceptors.request.use(config => {
  return config
},error => {
  return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use(response => {
  return response.data
},error => {})
export default service