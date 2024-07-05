<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <ProfileSetting></ProfileSetting>
          </el-col>
          <el-col :span="16">
            <div class="basic-info">
              <h5>Address</h5>
              <el-form
                :model="groomerProfile"
                label-width="auto"
                :label-position="'top'"
                :size="'large'"
                :inline="true"
              >
                <el-form-item label="County:" style="width: 300px">
                  <el-input v-model="groomerProfile.country" clearable />
                </el-form-item>
                <el-form-item label="Street:" style="width: 300px">
                  <el-input v-model="groomerProfile.street" clearable />
                </el-form-item>
                <el-form-item label="Street Number:" style="width: 300px">
                  <el-input v-model="groomerProfile.streetNumber" clearable />
                </el-form-item>
                <el-form-item label="Locality:" style="width: 300px">
                  <el-input v-model="groomerProfile.locality" clearable />
                </el-form-item>
                <el-form-item label="Postal Code:" style="width: 300px">
                  <el-input v-model="groomerProfile.postCode" clearable />
                </el-form-item>
                <el-form-item label="Administratvie area level 1:" style="width: 300px">
                  <el-input v-model="groomerProfile.areaLevel1" clearable />
                </el-form-item>
                <el-form-item label="Administratvie area level 2:" style="width: 300px">
                  <el-input v-model="groomerProfile.areaLevel2" clearable />
                </el-form-item>
                <el-button type="primary" style="width: 300px" @click="saveProfile"
                  >Change Address</el-button
                >
              </el-form>
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
import ProfileSetting from '@/components/ProfileSetting.vue'
import { reactive } from 'vue'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userId = userAuthStore().userInfo.userId
const router = useRouter()
const groomerProfile = reactive({
  id: 0,
  userId: userId,
  country: '',
  street: '',
  streetNumber: '',
  locality: '',
  postCode: '',
  areaLevel1: '',
  areaLevel2: ''
})
const saveProfile = () => {
  console.log(groomerProfile)
  axios.post('/api/api/groomer/saveProfile', groomerProfile).then((response) => {
    console.log(response)
    if (response.data.code === 200) {
      ElMessage.success('Profile saved successfully')
      setTimeout(() => {
        router.push({ name: 'groomer-profile' })
      }, 1500)
    } else {
      ElMessage.error('Error saving profile')
    }
  })
}
const getUserProfile = async function () {
  try {
    axios.get(`/api/api/groomer/getProfile?userId=${userId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })
      }
      if (response.data.data && response.data.data.data !== null) {
        groomerProfile.id = response.data.data.id
        groomerProfile.country = response.data.data.country
        groomerProfile.street = response.data.data.street
        groomerProfile.streetNumber = response.data.data.streetNumber
        groomerProfile.locality = response.data.data.locality
        groomerProfile.postCode = response.data.data.postCode
        groomerProfile.areaLevel1 = response.data.data.areaLevel1
        groomerProfile.areaLevel2 = response.data.data.areaLevel2
      }
    })
  } catch (error) {
    console.error(error)
  }
}
getUserProfile()
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f2f2f2;
}
.basic-info {
  background: #fff;
  padding: 20px;
}
h5 {
  font-size: 15px;
  margin-bottom: 24px;
}
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
