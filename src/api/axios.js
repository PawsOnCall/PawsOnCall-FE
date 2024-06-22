import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: false // 如果需要携带跨域凭证（如cookie），则设置为true
})

export default axiosInstance
