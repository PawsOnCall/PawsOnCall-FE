import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vue3GoogleLogin from 'vue3-google-login'

import axios from './api/axios'
import { createPiniaSessionStoragePlugin } from './plugins/piniaSessionStorage'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPiniaSessionStoragePlugin('authStore'))
app.use(pinia)
app.use(router)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(vue3GoogleLogin, {
  clientId: '389046495788-7rfjccnr2gapol41r40690sbt5og28j9.apps.googleusercontent.com'
})
app.config.globalProperties.$axios = axios
app.mount('#app')
