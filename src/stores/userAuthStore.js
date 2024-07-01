import { defineStore } from 'pinia'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    userInfo: {}
  }),
  actions: {
    login(user) {
      this.isLogin = true
      this.userInfo = user
    },
    logout() {
      this.isLogin = false
      this.userInfo = {}
    }
  }
})
