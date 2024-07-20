<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="2">
            <!-- <UserCard :isGroomer="false" /> -->
          </el-col>
          <el-col :span="22">
            <div class="new-card-info">
              <h4>Order History</h4>
              <el-table :data="orders.data" style="width: 100%" @row-click="handleRowClick" stripe>
                <el-table-column prop="id" label="Order Number" />
                <el-table-column prop="providerName" label="Groomer" />
                <el-table-column prop="groomerFee" label="PaymentAmout" />
                <el-table-column prop="createTime" label="Date" />
              </el-table>
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils'
const router = useRouter()
const handleRowClick = (row) => {
  console.log(row)
  console.log(row.id)
  router.push({ name: 'user-order-detail', query: { orderId: row.id } })
}

const userId = userAuthStore().userInfo.userId
// console.log(userId)
// const userId = 102
const orders = reactive({
  userId: userId,
  data: []
})
const getOrders = async function () {
  try {
    axios.get(`/api/api/order/getOrders?userId=${userId}&userType=customer`).then((response) => {
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
          order.createTime = formatDate(order.createTime)
          if (order.providerName === null) {
            order.providerName = 'Unknown'
          }
          if (order.groomerFee === null) {
            order.groomerFee = 0
          }
          order.groomerFee = '$' + order.groomerFee.toFixed(2)
        })
      }
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
}
h4 {
  font-size: 20px;
  margin: 20px auto;
  text-align: center;
  color: #000;
  font-weight: bold;
}
.des {
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
