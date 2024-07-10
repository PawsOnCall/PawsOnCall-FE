<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard
              :isGroomer="true"
              :user-info="{ name: groomerDashboard.name, photo: groomerDashboard.photo }"
            />
          </el-col>
          <el-col :span="16"> </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Siderbar.vue'
import UserCard from '@/components/UserCard.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
const router = useRouter()
const userId = userAuthStore().userInfo.userId
console.log(userId)
const groomerDashboard = reactive({
  userId: userId,
  pets: [],
  balance: 0,
  firstName: '',
  lastName: '',
  name: '',
  photo: '',
  upcomingEarning: 0
})
const getGroomerDashboard = async function () {
  try {
    const userId = userAuthStore().userInfo.userId
    axios.get(`/api/api/groomer/dashboard?userId=${userId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message || 'Error fetching data'
        })
      }
      if (response.data.data && response.data.data.data !== null) {
        groomerDashboard.balance = response.data.data.balance
        groomerDashboard.firstName = response.data.data.firstName
        groomerDashboard.photo = response.data.data.photo
        groomerDashboard.upcomingEarning = response.data.data.upcomingEarning
        groomerDashboard.lastName = response.data.data.lastName
        groomerDashboard.name = response.data.data.firstName + ' ' + response.data.data.lastName
        localStorage.setItem('groomerDashboard', JSON.stringify(groomerDashboard))
      }
    })
  } catch (error) {
    console.error(error)
  }
}
getGroomerDashboard()
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f2f2f2;
}
.user-card {
  margin-bottom: 20px;
}

.refer {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}
.pets-section {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}
.add-pet-card {
  text-align: center;
  border: 2px dashed #dcdfe6;
  padding: 20px;
}
.add-pet {
  cursor: pointer;
}
.add-pet i {
  font-size: 40px;
}
</style>
