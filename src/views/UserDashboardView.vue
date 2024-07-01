<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard :user-info="{ name: userDashboard.name, photo: userDashboard.photo }" />
          </el-col>
          <el-col :span="16">
            <!-- <div class="refer">
              <h2>Refer a friend, Get $20</h2>
              <p>
                For every friend that books their first grooming, we will give you a $20 credit
                towards your next booking.
              </p>
              <el-button type="default">Invite a friend</el-button>
            </div> -->
            <div class="pets-section">
              <h2>Your Pets</h2>
              <template v-if="userDashboard.pets.length > 1">
                <div class="petcard" v-for="(pet, i) in userDashboard.pets" :key="i">
                  <div class="pet-name">Pet Name:{{ pet.name }}</div>
                  <img class="pet-photo" :src="pet.photo" />
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'

const router = useRouter()

const onAddPet = () => {
  //  redirect to add pet page
  router.push({ name: 'add-pet' })
}

const userId = userAuthStore().userInfo.userId
console.log(userId)

const userProfile = reactive({
  name: 'Frank',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  photo: '',
  phone: '',
  postCode: '',
  province: '',
  emeContactName: '',
  emeContactPhone: '',
  userId: ''
})
const userDashboard = reactive({
  userId: '',
  pets: [],
  balance: 0,
  firstName: '',
  lastName: '',
  name: '',
  photo: ''
})
const getUserDashboard = async function () {
  try {
    axios.get(`/api/api/customer/dashboard?userId=${102}`).then((response) => {
      // TODO: userId
      // const userId = userAuthStore().userInfo.userId
      // axios.get(`/api/api/customer/dashboard?userId=${userId}`).then((response) => {
      console.log(response.data)

      userDashboard.pets = response.data.data.pets
      userDashboard.balance = response.data.data.balance
      userDashboard.firstName = response.data.data.firstName
      userDashboard.photo = response.data.data.photo

      userDashboard.lastName = response.data.data.lastName

      userDashboard.name = response.data.data.firstName + ' ' + response.data.data.lastName

      localStorage.setItem('userDashboard', JSON.stringify(userDashboard))
    })
  } catch (error) {
    console.error(error)
  }
}
getUserDashboard()
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
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
</style>
