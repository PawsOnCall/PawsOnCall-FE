<template>
  <header id="header">
    <img alt="PawsOnCall logo" class="logo" src="@/assets/logo.jpg" width="90" height="90" />
    <div class="wrapper">
      <img src="@/assets/bg4.jpg" class="bg4" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About Us</RouterLink>
        <RouterLink to="/service-and-price">Service and Price</RouterLink>
        <RouterLink to="/become-a-groomer">Become a Groomer</RouterLink>
      </nav>
    </div>
    <div v-if="!isLogin" class="sign-wrapper">
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/signin">Sign In</RouterLink>
    </div>
    <div class="sign-wrapper" v-else>
      <RouterLink v-if="isGroomer" to="/groomer-dashboard">{{ userInfo.firstName }}</RouterLink>
      <RouterLink v-else to="/user-dashboard">{{ userInfo.firstName }}</RouterLink>
      <a class="logout" @click="Logout">Logout</a>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { userAuthStore } from '@/stores/userAuthStore'
import { onMounted, ref } from 'vue'
const isLogin = ref(false)
const userInfo = ref(null)
const isGroomer = ref(false)

const Logout = () => {
  userAuthStore().logout()
  isLogin.value = false
  userInfo.value = null
  isGroomer.value = false
}
onMounted(() => {
  isLogin.value = userAuthStore().isLogin
  userInfo.value = userAuthStore().userInfo
  isGroomer.value = userInfo.value.userType === 'groomer' ? true : false
})
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  position: relative;
}
.bg4 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.5;
}
nav {
  padding: 2rem;

  a {
    margin: 1rem;
  }
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

a {
  text-decoration: none;
  color: #000 !important;
  font-weight: bold !important;
  font-size: 18px !important;
}

a:hover {
  text-decoration: underline;
}
.sign-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>
