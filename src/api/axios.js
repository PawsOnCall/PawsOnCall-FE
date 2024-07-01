// src/axios.js
import axios from 'axios'

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: '/', // 替换为你的 API 基础 URL
  timeout: 1000, // 请求超时
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器，在每次请求前自动添加 Authorization 头
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 假设 token 存储在 localStorage 中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
