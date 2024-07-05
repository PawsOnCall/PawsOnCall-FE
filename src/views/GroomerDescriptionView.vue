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
              <h5>Headline</h5>
              <div class="tips">
                Write an eye-catching headline. Make it short, descriptive, and genuine.
              </div>
              <el-form
                :model="groomerProfile"
                label-width="auto"
                :label-position="'top'"
                :size="'large'"
              >
                <el-form-item>
                  <el-input v-model="groomerProfile.headline" placeholder="Headline"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <h5>Certification</h5>
                <div class="tips">Anything related to grooming industry</div>
                <el-form-item>
                  <el-input
                    v-model="groomerProfile.certification"
                    placeholder="certification"
                  ></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <h5>Description</h5>
                <div class="tips">
                  Write at least 150 words: about yourself and your motivation to be a groomer. Pet
                  owners want to read about you before they contact you, so share all about your
                  passion for pet groomer and your services. Avoid spelling and grammatical errors.
                  Mentioning contact details, such as phone numbers, email addresses, social media
                  accounts and other external links is not allowed. What is your motivation to be a
                  pet groomer? Do you have previous experience?
                </div>
                <el-form-item>
                  <el-input
                    v-model="groomerProfile.description"
                    placeholder="description"
                    type="textarea"
                    :rows="5"
                  ></el-input>
                </el-form-item>
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
  headline: '',
  description: '',
  certification: ''
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
        groomerProfile.headline = response.data.data.headline
        groomerProfile.description = response.data.data.description
        groomerProfile.certification = response.data.data.certification
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
  font-size: 16px;
  font-weight: bold;
}

.tips {
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
