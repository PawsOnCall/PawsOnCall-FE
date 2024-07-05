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
              <h5>Services</h5>
              <el-form
                :model="groomerProfile"
                label-width="auto"
                :label-position="'top'"
                :size="'large'"
              >
                <el-form-item label="Services:">
                  <el-checkbox-group v-model="groomerProfile.serviceType">
                    <el-checkbox value="Grooming" name="type">Grooming </el-checkbox>
                    <el-checkbox value="Bathing" name="type">Bathing</el-checkbox>
                    <el-checkbox value="Nail Triming" name="type">Nail Triming</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Cancellation Policy:" style="width: 300px">
                  <el-select v-model="groomerProfile.serviceCanceledPolicy">
                    <el-option label="Moderate" value="moderate"></el-option>
                    <el-option label="Flexible" value="flexible"></el-option>
                  </el-select>
                </el-form-item>
                <div class="tips">
                  <p><strong>Flexible:</strong></p>
                  <p>Full refund if cancelled within 24 hours of booking</p>
                  <p>No refund if cancelled after 24 hours of booking</p>
                  <p><strong>Moderate:</strong></p>
                  <p>Full refund if cancelled within 48 hours of booking</p>
                  <p>No refund if cancelled after 48 hours of booking</p>
                </div>
                <el-button type="primary" style="width: 300px" @click="saveProfile">Save</el-button>
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
  serviceType: [],
  serviceCanceledPolicy: ''
})
const saveProfile = () => {
  console.log(groomerProfile)
  const serviceType = groomerProfile.serviceType.join(',')
  axios
    .post('/api/api/groomer/saveProfile', {
      id: groomerProfile.id,
      serviceType: serviceType,
      userId: groomerProfile.userId,
      serviceCanceledPolicy: groomerProfile.serviceCanceledPolicy
    })
    .then((response) => {
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
        if (response.data.data.serviceType) {
          groomerProfile.serviceType = response.data.data.serviceType.split(',')
        } else {
          groomerProfile.serviceType = []
        }
        groomerProfile.serviceCanceledPolicy = response.data.data.serviceCanceledPolicy
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
.tips {
  margin-top: 20px;
  p {
    strong {
      font-size: 16px;
      font-style: bold;
      font-style: italic;
    }
    font-size: 14px;
    margin-bottom: 12px;
  }
}
</style>
