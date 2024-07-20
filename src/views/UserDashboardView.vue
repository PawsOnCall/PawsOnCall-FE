<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard :user-info="{ name: userDashboard.name, photo: userDashboard.photo }" />
          </el-col>
          <el-col :span="16">
            <div class="pets-section">
              <h2>Your Pets</h2>
              <template v-if="userDashboard.pets && userDashboard.pets.length > 0">
                <div class="petcard" v-for="(pet, i) in userDashboard.pets" :key="i">
                  <div class="pet-name">Pet Name:{{ pet.name }}</div>
                  <img class="pet-photo" :src="pet.photo" />
                  <el-button type="primary" size="large" @click="onEditPet(pet)"
                    >Edit pet info</el-button
                  >
                </div>
              </template>

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
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'

const router = useRouter()

const onAddPet = () => {
  //  redirect to add pet page
  router.push({ name: 'add-pet' })
}
const onEditPet = (pet) => {
  //  redirect to add pet page
  console.log(pet)
  router.push({
    name: 'add-pet',
    query: { petId: pet.id }
  })
}

const userId = userAuthStore().userInfo.userId
console.log(userId)

const userDashboard = reactive({
  userId: userId,
  pets: [],
  balance: 0,
  firstName: '',
  lastName: '',
  name: '',
  photo: ''
})
const getUserDashboard = async function () {
  try {
    const userId = userAuthStore().userInfo.userId
    axios.get(`/api/api/customer/dashboard?userId=${userId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message || 'Error fetching data'
        })
      }
      if (response.data.data && response.data.data.data !== null) {
        userDashboard.pets = response.data.data.pets
        userDashboard.balance = response.data.data.balance
        userDashboard.firstName = response.data.data.firstName
        userDashboard.photo = response.data.data.photo
        userDashboard.lastName = response.data.data.lastName
        userDashboard.name = response.data.data.firstName + ' ' + response.data.data.lastName
        localStorage.setItem('userProfile', JSON.stringify(userDashboard))
      }
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUserDashboard()
})
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

.petcard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  padding: 12px;

  .pet-photo {
    display: block;
    width: 400px;
    margin-bottom: 24px;
  }
}
</style>
