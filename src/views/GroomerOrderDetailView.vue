<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- <UserCard :isGroomer="false" /> -->
          </el-col>
          <el-col :span="20">
            <div class="new-card-info">
              <h4>Order Detail</h4>

              <div class="des">Order Number: {{ order?.id }}</div>
              <div class="des">Create Time: {{ formatDate(order?.createTime) }}</div>
              <div class="des">Service Date: {{ getDateFromServiceTime(order.serviceTime) }}</div>
              <div class="des">
                Arrive Between: <span>{{ getTimeFromDropOffStart(order?.dropOffTimeStart) }}</span>
                <span> ~ </span>
                <span>{{ getTimeFromDropOffStart(order?.dropOffTimeEnd) }}</span>
              </div>
              <div class="des">Earning Amout: ${{ order?.groomerFee || '0.00' }}</div>
              <div class="des" v-if="order.groomerFee === 50">Service Type:Bath & Nail</div>
              <div class="des" v-else-if="order.groomerFee === 80">Service Type:Bath & Haircut</div>
              <div class="des" v-else-if="order.groomerFee === 100">Service Type:Full Grooming</div>
              <div class="des" v-if="order.snapshot">Pet Name: {{ order.snapshot }}</div>
              <el-divider></el-divider>
              <div class="customer-detail">
                <p>Customer Info</p>
                <p><img :src="order.consumerPhoto" alt="" style="width: 400px" /></p>
                <p>Customer Name: {{ order.consumerName }}</p>
                <p>Customer Address: {{ order.consumerAddress }}</p>
                <p>Customer Phone: {{ order.consumerPhone }}</p>
                <p>Customer Email: {{ order.consumerEmail }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Siderbar.vue'
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { formatDate, getDateFromServiceTime, getTimeFromDropOffStart } from '@/utils'
import { userAuthStore } from '@/stores/userAuthStore'
const router = useRouter()
const route = useRoute()
const order = reactive<any>({})
const userId = userAuthStore().userInfo.userId
// console.log(userId)
// const userId = 103
const getOrders = async function () {
  try {
    axios.get(`/api/api/order/getOrders?userId=${userId}&userType=groomer`).then((response) => {
      console.log(response.data)
      const orderList = response.data.data
      console.log(orderList)
      console.log(route.query.orderId)
      const foundOrder = orderList.find((order: any) => order.id === Number(route.query.orderId))
      if (foundOrder) {
        Object.assign(order, foundOrder)
        const consumerUserId = foundOrder.consumerUserId
        // api/customer/getProfile?userId=consumerUserId
        axios.get(`/api/api/customer/getProfile?userId=${consumerUserId}`).then((response) => {
          console.log(response.data)
          if (response.data.code !== 200) {
            console.error('Error fetching consumer info')
            return
          }
          const consumerInfo = response.data.data
          order.consumerName = consumerInfo.firstName + ' ' + consumerInfo.lastName
          order.consumerPhoto = consumerInfo.photo
          order.consumerEmail = consumerInfo.email
          order.consumerPhone = consumerInfo.phone
          order.consumerPhoto = consumerInfo.photo
          if (consumerInfo.addressLine2) {
            order.consumerAddress =
              consumerInfo.addressLine2 +
              ', ' +
              consumerInfo.addressLine1 +
              ', ' +
              consumerInfo.city +
              ', ' +
              consumerInfo.postCode
          } else {
            order.consumerAddress =
              consumerInfo.addressLine1 + ', ' + consumerInfo.city + ', ' + consumerInfo.postCode
          }
        })
      } else {
        console.error('Order not found')
      }
      console.log(order)
    })
  } catch (error) {
    console.error(error)
  }
}
getOrders()
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
  font-size: 14px;
}
h4 {
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  margin-bottom: 12px;
}
.customer-detail {
  p {
    margin-bottom: 12px;
  }
  img {
    display: block;
    width: 100px;
  }
}
</style>
