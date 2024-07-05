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
              <h5>Your info</h5>
              <el-form
                :model="groomerProfile"
                label-width="auto"
                :label-position="'top'"
                :size="'large'"
                :inline="true"
              >
                <el-form-item label="Frist Name:" style="width: 300px">
                  <el-input v-model="groomerProfile.firstName" clearable />
                </el-form-item>
                <el-form-item label="Last Name:" style="width: 300px">
                  <el-input v-model="groomerProfile.lastName" clearable />
                </el-form-item>
                <el-form-item label="Email:" style="width: 300px">
                  <el-input v-model="groomerProfile.email" clearable />
                </el-form-item>
                <el-form-item label="Telephone:" style="width: 300px">
                  <el-input v-model="groomerProfile.phone" clearable />
                </el-form-item>
              </el-form>
              <el-divider />
              <h5>Your Profile Photo</h5>
              <p>please upload a passport style picture with smile</p>
              <!-- <el-avatar :size="50" :src="circleUrl" /> -->
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :on-change="handleChange"
                v-model:file-list="fileList"
                ref="upload"
              >
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                  <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
                <template #tip>
                  <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                  </div>
                </template>
              </el-upload>
              <el-divider />
              <el-button type="primary" style="width: 300px" @click="saveProfile">Save</el-button>
              <!-- <h5>Delete Account</h5>
              <el-button type="danger" @click="deleteProfile" size="large" style="width: 600px"
                >Delete My Profile</el-button
              > -->
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
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
import { ElMessage, UploadUserFile } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const upload = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const disabled = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1)
}
const handleChange = (file: UploadFile) => {
  if (file.raw) {
    convertBlobToBase64(file.raw).then((base64) => {
      file.url = base64 as string
    })
  }
}
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const userId = userAuthStore().userInfo.userId
const router = useRouter()
const groomerProfile = reactive({
  id: 0,
  userId: userId,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  photo: ''
})
const saveProfile = () => {
  console.log(groomerProfile)
  groomerProfile.photo = fileList.value[0].url
  axios.post('/api/api/groomer/saveProfile', groomerProfile).then((response) => {
    console.log(response)
    if (response.data.code === 200) {
      ElMessage.success('Profile saved successfully')
      setTimeout(() => {
        router.push({ name: 'groomer-dashboard' })
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
        groomerProfile.firstName = response.data.data.firstName
        groomerProfile.lastName = response.data.data.lastName
        groomerProfile.email = response.data.data.email
        groomerProfile.phone = response.data.data.phone
        groomerProfile.photo = response.data.data.photo

        if (response.data.data.photo) {
          fileList.value.push({
            name: 'photo',
            url: response.data.data.photo
          })
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
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
