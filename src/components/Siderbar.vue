<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="defaultActive"
  >
    <el-menu-item index="1" @click="onDashbord" v-if="!isGroomer">
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
    <el-menu-item index="6" v-if="isGroomer" @click="onReceivePayment">
      <i class="el-icon-switch-button"></i>
      <span slot="title">Payments</span>
    </el-menu-item>
    <el-menu-item index="7" v-if="isGroomer" @click="onEarning">
      <i class="el-icon-switch-button"></i>
      <span slot="title">Earnings</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps, ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { userAuthStore } from '../stores/userAuthStore'
const authStore = userAuthStore()
const route = useRoute()
const currentPath = route.path
const defaultActive = ref('1')
if (currentPath === '/groomer-setting') {
  console.log('setting')
  defaultActive.value = '5'
} else if (currentPath === '/groomer-orders') {
  defaultActive.value = '3'
} else if (currentPath === '/groomer-profile') {
  defaultActive.value = '2'
} else if (currentPath === '/groomer-dashboard') {
  defaultActive.value = '1'
} else if (currentPath === '/user-orders') {
  defaultActive.value = '3'
} else if (currentPath === '/user-profile') {
  defaultActive.value = '2'
} else {
  defaultActive.value = '1'
}

const props = defineProps({
  isGroomer: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const onDashbord = () => {
  if (props.isGroomer) {
    // router.push({ name: 'groomer-dashboard' })
    router.push({ name: 'groomer-profile' })
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

const onSetting = () => {
  router.push({ name: 'groomer-setting' })
}
const onReceivePayment = () => {
  router.push({ name: 'receive-payment' })
}
const onEarning = () => {
  router.push({ name: 'earning-history' })
}
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 400px;
}
</style>
