<template>
  <header id="header" :class="{ sticky: isSticky }">
    <img alt="PawsOnCall logo" class="logo" src="@/assets/logo.jpg" width="120" height="120" />
    <div class="wrapper">
      <img src="@/assets/bg4.jpg" class="bg4" />
      <nav>
        <RouterLink to="/" active-class="active">Home</RouterLink>
        <RouterLink to="/about" active-class="active">About Us</RouterLink>
        <RouterLink to="/service-and-price" active-class="active">Service</RouterLink>
        <RouterLink to="/groomer-list" active-class="active">Top Groomers</RouterLink>
        <RouterLink v-if="!isGroomer" to="/become-a-groomer" active-class="active"
          >Become a Groomer</RouterLink
        >
      </nav>
    </div>
    <div v-if="!isLogin" class="sign-wrapper">
      <RouterLink to="/signup" active-class="active">Register</RouterLink>
      <RouterLink to="/signin" active-class="active">Sign In</RouterLink>
    </div>
    <div v-else class="sign-wrapper">
      <RouterLink v-if="isGroomer" to="/groomer-profile"
        >Hello, {{ userInfo.firstName }}</RouterLink
      >
      <RouterLink v-else to="/user-dashboard"> Hello, {{ userInfo.firstName }}</RouterLink>
      <a class="logout" @click="Logout">Logout</a>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { userAuthStore } from '@/stores/userAuthStore'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = userAuthStore()
const isLogin = computed(() => authStore.isLogin)
const userInfo = computed(() => authStore.userInfo)
const isGroomer = computed(() => userInfo.value?.userType === 'groomer')

const router = useRouter()
const Logout = () => {
  userAuthStore().logout()
  isLogin.value = false
  userInfo.value = {}
  isGroomer.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('userProfile')
  localStorage.removeItem('groomerDashboard')
  localStorage.removeItem('searchMessage')
  router.push({ name: 'home' })
}

const isSticky = ref(false)

const handleScroll = () => {
  isSticky.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  transition: all 0.3s;
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
}

nav a {
  margin: 1rem;
  text-decoration: none;
  color: #000 !important;
  font-weight: bold !important;
  font-size: 18px !important;
}

nav a:hover {
  text-decoration: underline;
}
nav a.active {
  text-decoration: underline;
  color: #007bff; /* Change the color to indicate the active link */
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.sign-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
.sign-wrapper a {
  text-decoration: none;
  color: #000 !important;
  font-weight: bold !important;
  font-size: 18px !important;
}

.sign-wrapper a:hover {
  text-decoration: underline;
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
