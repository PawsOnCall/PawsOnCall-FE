<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- <UserCard :isGroomer="true" /> -->
          </el-col>
          <el-col :span="20">
            <div class="new-card-info">
              <h4>Earning history</h4>
              <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
                <el-tab-pane label="Earnings" name="Earnings">
                  <el-table :data="orders.data" style="width: 100%">
                    <el-table-column prop="id" label="Order Number" />
                    <el-table-column prop="consumerName" label="Customer" />
                    <el-table-column prop="groomerFee" label="Earned" />
                    <el-table-column prop="serviceTime" label="Date" />
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="Pending Earnings" name="Pending Earnings"
                  ><el-table :data="orders.data" style="width: 100%">
                    <el-table-column prop="id" label="Order Number" />
                    <el-table-column prop="consumerName" label="Customer" />
                    <el-table-column prop="groomerFee" label="Pending Earned" />
                    <el-table-column prop="serviceTime" label="Date" /> </el-table
                ></el-tab-pane>
                <el-tab-pane label="Withdrawals" name="Withdrawals"
                  ><el-table :data="orders.data" style="width: 100%">
                    <el-table-column prop="id" label="Order Number" />
                    <el-table-column prop="consumerName" label="Customer" />
                    <el-table-column prop="serviceFee" label="Withrawn" />
                    <el-table-column prop="serviceTime" label="Date" /></el-table
                ></el-tab-pane>
              </el-tabs>
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
import UserCard from '@/components/UserCard.vue'
import { ref } from 'vue'
import { reactive } from 'vue'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'

import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils'

const activeName = ref('Earnings')

// const userId = userAuthStore().userInfo.userId
// console.log(userId)
const userId = 103
const orders = reactive({
  userId: userId,
  data: []
})

const getOrders = async function (status) {
  try {
    axios
      .get(`/api/api/order/getOrders?userId=${userId}&userType=groomer&status=${status}`)
      .then((response) => {
        console.log(response.data)
        if (response.data.code !== 200) {
          ElMessage({
            type: 'error',
            message: response.data.message || 'Error fetching data'
          })
        }
        if (response.data.data && response.data.data.data !== null) {
          orders.data = response.data.data
          orders.data.forEach((order) => {
            order.serviceTime = formatDate(order.serviceTime)
            if (order.consumerName === null) {
              order.consumerName = 'Unknown'
            }
            if (order.groomerFee === null) {
              order.groomerFee = 0
            }
            order.groomerFee = '$' + order.groomerFee.toFixed(2)
            if (order.serviceFee === null) {
              order.serviceFee = 0
            }
            order.serviceFee = '$' + order.serviceFee.toFixed(2)
          })
        }
      })
  } catch (error) {
    console.error(error)
  }
}
getOrders('FINISHED')

const handleChange = (name) => {
  console.log(name)
  if (name === 'Earnings') {
    getOrders('FINISHED')
  } else if (name === 'Pending Earnings') {
    getOrders('PENDING')
  } else if (name === 'Withdrawals') {
    getOrders('WITHDRAWN')
  }
}
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
