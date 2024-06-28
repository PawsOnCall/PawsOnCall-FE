<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard />
          </el-col>
          <el-col :span="16">
            <div class="refer">
              <h2>Refer a friend, Get $20</h2>
              <p>
                For every friend that books their first grooming, we will give you a $20 credit
                towards your next booking.
              </p>
              <el-button type="default">Invite a friend</el-button>
            </div>
            <div class="pets-section">
              <h2>Your Pets</h2>
              <p>Add your pets or edit their info</p>
              <el-card class="add-pet-card">
                <div class="add-pet" @click="onAddPet">
                  <i class="el-icon-plus"></i>
                  <p>+Add pet</p>
                </div>
              </el-card>
            </div></el-col
          >
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar />
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
const router = useRouter()

const onAddPet = () => {
  //  redirect to add pet page
  router.push({ name: 'add-pet' })
}

const getUser = async function () {
  try {
    // the first /api is the proxy in vue.config.js
    fetch('/api/api/logged-user').then((response) => {
      console.log(response.data)
    })
  } catch (error) {
    console.error(error)
  }
}
getUser()
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
