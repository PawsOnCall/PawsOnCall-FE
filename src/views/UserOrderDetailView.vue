<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="4">
            <UserCard :isGroomer="false" />
          </el-col>
          <el-col :span="20">
            <div class="new-card-info">
              <h4>Order Detail</h4>
              <div class="des">ServiceTime: {{ formatDate(order?.serviceTime) }}</div>
              <div class="des">OrderNumber: {{ order?.id }}</div>
              <div class="des">PaymentAmout: {{ order?.groomerFee || 0.0 }}</div>
              <div class="groomer-detail">
                <div class="groomer-photo"></div>
                <div class="groomer-name"></div>
                <div class="groomer-city">Vancouver, BC, Canada</div>
                <div class="groomer-stars">
                  <!-- <el-rate v-model="order?.data?.reviewStars" allow-half /> -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="false" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Siderbar.vue'
import UserCard from '@/components/UserCard.vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

import { userAuthStore } from '@/stores/userAuthStore'
const router = useRouter()
const route = useRoute()
const order = reactive<any>({})

const getOrders = async function () {
  try {
    axios.get(`/api/api/order/getOrders?userId=${102}&userType=customer`).then((response) => {
      console.log(response.data)
      const orderList = response.data.data
      console.log(orderList)
      console.log(route.query.orderId)
      const foundOrder = orderList.find((order: any) => order.id === Number(route.query.orderId))
      if (foundOrder) {
        Object.assign(order, foundOrder)
      } else {
        console.error('Order not found')
      }
      console.log(order)
      // fetchOrderDetails(route.params.orderId)
      // TODO: userId
      // const userId = userAuthStore().userInfo.userId
      // axios.get(`/api/api/order/getOrders?userId=${userId}`).then((response) => {
    })
  } catch (error) {
    console.error(error)
  }
}
getOrders()

const formatDate = (isoString) => {
  // const isoString = '2023-06-14T23:00:00.000-07:00';
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // 月份是从0开始的，所以要加1
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  console.log(formattedDate)
  return formattedDate
}
const isoString = '2023-06-14T23:00:00.000-07:00'
const date = new Date(isoString)

const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2) // 月份是从0开始的，所以要加1
const day = ('0' + date.getDate()).slice(-2)
const hours = ('0' + date.getHours()).slice(-2)
const minutes = ('0' + date.getMinutes()).slice(-2)
const seconds = ('0' + date.getSeconds()).slice(-2)

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
console.log(formattedDate)
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f2f2f2;
}
.new-card-info {
  padding: 20px 20px 20px 50px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}
h4 {
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
