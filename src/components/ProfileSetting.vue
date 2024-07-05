<template>
  <div class="profile-setting">
    <h2>My Groomer Profile</h2>
    <ul>
      <li class="active"><a @click="updateAddress">My address</a></li>
      <li><a @click="updateService">Service</a></li>
      <li><a @click="updatePreferences">Pet preferences</a></li>
      <li><a @click="updateDescription">Description</a></li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import { useRouter } from 'vue-router'
import { userAuthStore } from '../stores/userAuthStore'
const authStore = userAuthStore()

const router = useRouter()

const updateAddress = () => {
  router.push({ name: 'groomer-address' })
}
const updateService = () => {
  router.push({ name: 'groomer-service' })
}

const updatePreferences = () => {
  router.push({ name: 'groomer-pet-preferences' })
}
const updateDescription = () => {
  router.push({ name: 'groomer-description' })
}
</script>

<style scoped>
.profile-setting {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;

  h2 {
    margin-bottom: 20px;
    font-size: 18px;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;

    a {
      display: block;
      padding: 16px;
      color: #333;
      text-decoration: none;
      &:hover {
        color: #000;
        background: #f2f2f2;
      }
    }
    &.active {
      color: #000;
      background: #f2f2f2;
    }
  }
}
</style>
