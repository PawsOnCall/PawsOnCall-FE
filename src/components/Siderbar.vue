<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router="true"
    default-active="1"
  >
    <el-menu-item index="1" @click="onDashbord">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="2" @click="onProfile">
      <i class="el-icon-user"></i>
      <span slot="title">Profile</span>
    </el-menu-item>
    <el-menu-item index="3" @click="onOrders">
      <i class="el-icon-message"></i>
      <span slot="title">Orders</span>
    </el-menu-item>
    <el-menu-item index="5" v-if="isGroomer" @click="onSetting">
      <i class="el-icon-picture"></i>
      <span slot="title">Setting</span>
    </el-menu-item>
    <el-menu-item index="6" @click="onLogOut">
      <i class="el-icon-switch-button"></i>
      <span slot="title">Log Out</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { userAuthStore } from '../stores/userAuthStore'
const authStore = userAuthStore()
const route = useRoute()
const currentPath = route.path
console.log(currentPath)

const props = defineProps({
  isGroomer: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const onDashbord = () => {
  if (props.isGroomer) {
    router.push({ name: 'groomer-dashboard' })
  } else {
    router.push({ name: 'user-dashboard' })
  }
}
const onProfile = () => {
  if (props.isGroomer) {
    router.push({ name: 'groomer-profile' })
  } else {
    router.push({ name: 'user-profile' })
  }
}
const onOrders = () => {
  if (props.isGroomer) {
    router.push({ name: 'groomer-orders' })
  } else {
    router.push({ name: 'user-orders' })
  }
}

const onLogOut = () => {
  authStore.logout()
  router.push({ name: 'home' })
}

const onSetting = () => {
  router.push({ name: 'groomer-setting' })
}
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 400px;
}
</style>
