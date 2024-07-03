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
              <h4>Payments History</h4>
              <el-table :data="orders.data" border style="width: 100%">
                <el-table-column prop="serviceTime" label="Date" width="260" />
                <el-table-column prop="id" label="Order Number" width="180" />
                <el-table-column prop="providerName" label="Groomer" />
                <el-table-column prop="serviceFee" label="PaymentAmout" />
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
const router = useRouter()

const orders = reactive({
  userId: '',
  data: []
})

const getOrders = async function () {
  try {
    axios.get(`/api/api/order/getOrders?userId=${102}&userType=customer`).then((response) => {
      console.log(response.data)
      orders.data = response.data.data
      // TODO: userId
      // const userId = userAuthStore().userInfo.userId
      // axios.get(`/api/api/order/getOrders?userId=${userId}`).then((response) => {
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
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
