<script setup>
import { RouterView } from 'vue-router'
import { userAuthStore } from './stores/userAuthStore'

import NavigationBar from './components/NavigationBar.vue'
// Access the login state from the Pinia store
// const authStore = userAuthStore()
</script>

<template>
  <NavigationBar />

  <RouterView />
</template>

<style scoped></style>
