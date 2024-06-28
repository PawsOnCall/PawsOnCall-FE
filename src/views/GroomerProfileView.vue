<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8"> </el-col>
          <el-col :span="16">
            <div class="basic-info">
              <h5>Your info</h5>
              <el-form :model="form" label-width="auto" :label-position="'top'" :size="'large'">
                <el-form-item label="Frist Name:">
                  <el-input v-model="form.firstName" clearable />
                </el-form-item>
                <el-form-item label="Last Name:">
                  <el-input v-model="form.lastName" clearable />
                </el-form-item>
                <el-form-item label="Email:">
                  <el-input v-model="form.email" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 700px">Save</el-button>
                </el-form-item>
              </el-form>
              <el-divider />
              <h5>Your Profile Photo</h5>
              <p>please upload a passport style picture with smile</p>
              <!-- <el-avatar :size="50" :src="circleUrl" /> -->
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-button type="primary" size="large">Add Photo</el-button>
              </el-upload>
              <el-divider />
              <h5>Delete Account</h5>
              <el-button type="danger" @click="deleteProfile" size="large" style="width: 600px"
                >Delete My Profile</el-button
              >
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
import UserCard from '@/components/UserCard.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
imageUrl.value = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const router = useRouter()
const form = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

const addPhoto = () => {
  // todo: add photo
  ElMessage({
    message: 'Photo added',
    type: 'success'
  })
}

const deleteProfile = () => {
  ElMessageBox.confirm('Are you sure to delete your profile?')
    .then(() => {
      // todo: delete profile
    })
    .catch(() => {
      // catch error
    })
}
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
