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
              <h5>Pet Preferences</h5>
              <el-form
                :model="groomerProfile"
                label-width="auto"
                :label-position="'top'"
                :size="'large'"
              >
                <el-form-item label="Accepted dog ages:">
                  <el-checkbox-group v-model="groomerProfile.acceptedDogAge">
                    <el-checkbox value="Puppies(< 1 year)" name="type"
                      >Puppies(&lt 1 year)
                    </el-checkbox>
                    <el-checkbox value="Young(1-3 years)" name="type">Young(1-3 years)</el-checkbox>
                    <el-checkbox value="Adult(3-8 years)" name="type">Adult(3-8 years)</el-checkbox>
                    <el-checkbox value="Senior(8+ years)" name="type">Senior(8+ years)</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Accepted dog sizes:">
                  <el-checkbox-group v-model="groomerProfile.acceptedDogSize">
                    <el-checkbox value="Small(0-7kg)" name="type">Small(0-7kg) </el-checkbox>
                    <el-checkbox value="Medium(8-18kg)" name="type">Medium(8-18kg)</el-checkbox>
                    <el-checkbox value="Large(18-45kg)" name="type">Large(18-45kg)</el-checkbox>
                    <el-checkbox value="Giant(45kg+)" name="type">Giant(45kg+)</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Other pet types:">
                  <el-checkbox-group v-model="groomerProfile.otherPetTypes">
                    <el-checkbox value="Cats" name="type">Cats </el-checkbox>
                  </el-checkbox-group>
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
  acceptedDogAge: [],
  acceptedDogSize: [],
  otherPetTypes: []
})
const saveProfile = () => {
  console.log(groomerProfile)
  const acceptedDogAge = groomerProfile.acceptedDogAge.join(',')
  const acceptedDogSize = groomerProfile.acceptedDogSize.join(',')
  const otherPetTypes = groomerProfile.otherPetTypes.join(',')
  axios
    .post('/api/api/groomer/saveProfile', {
      id: groomerProfile.id,
      userId: groomerProfile.userId,
      acceptedDogAge: acceptedDogAge,
      acceptedDogSize: acceptedDogSize,
      otherPetTypes: otherPetTypes
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
        if (response.data.data.otherPetTypes) {
          groomerProfile.otherPetTypes = response.data.data.otherPetTypes.split(',')
        } else {
          groomerProfile.otherPetTypes = []
        }
        if (response.data.data.acceptedDogAge) {
          groomerProfile.acceptedDogAge = response.data.data.acceptedDogAge.split(',')
        } else {
          groomerProfile.acceptedDogAge = []
        }
        if (response.data.data.acceptedDogSize) {
          groomerProfile.acceptedDogSize = response.data.data.acceptedDogSize.split(',')
        } else {
          groomerProfile.acceptedDogSize = []
        }
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
