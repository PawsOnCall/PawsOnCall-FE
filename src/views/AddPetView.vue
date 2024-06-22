<template>
  <div class="dashboard">
    <h1>Add Pet</h1>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row>
          <el-col :span="4"> </el-col>
          <el-col :span="20">
            <el-form :model="form" size="large">
              <el-form-item label="Do you have a pet?">
                <el-radio-group v-model="form.havePet">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div v-if="form.havePet">Tell us about your pet</div>
            <el-form v-if="form.havePet" size="large">
              <el-form-item label="upload your pet photo">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>

              <el-form-item label="What type of pet?">
                <el-radio-group v-model="form2.petType">
                  <el-radio value="dog" size="large">dog</el-radio>
                  <el-radio value="cat" size="large">cat</el-radio>
                </el-radio-group>
              </el-form-item>

              <div style="display: flex">
                <el-form-item label="name" style="width: 200px">
                  <el-input v-model="form2.petName"> </el-input>
                </el-form-item>
                <el-form-item label="weight(lbs)" style="width: 200px; margin-left: 20px">
                  <el-input v-model="form2.weight"> </el-input>
                </el-form-item>
              </div>

              <el-form-item label="sex">
                <el-radio-group v-model="form2.sex">
                  <el-radio value="male" size="large">Male</el-radio>
                  <el-radio value="female" size="large">Female</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="Breed(If your pet is a mixed breed, enter 'Mixed')"
                style="width: 500px"
              >
                <el-input v-model="form2.breed"> </el-input>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div v-if="form.havePet">Additional Details</div>
            <el-form v-if="form.havePet" size="large">
              <el-form-item label="Micorchipped?">
                <el-radio-group v-model="form3.micorchipped">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Spayed/Neutered?">
                <el-radio-group v-model="form3.spayed">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="House Trained?">
                <el-radio-group v-model="form3.houseTrained">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                  <el-radio value="2" size="large">Unsure</el-radio>
                  <el-radio value="3" size="large">Depends</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Kids?">
                <el-radio-group v-model="form3.FriendlyWithKids">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                  <el-radio value="2" size="large">Unsure</el-radio>
                  <el-radio value="3" size="large">Depends</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Dogs?">
                <el-radio-group v-model="form3.FriendlyWithDogs">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                  <el-radio value="2" size="large">Unsure</el-radio>
                  <el-radio value="3" size="large">Depends</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Cats?">
                <el-radio-group v-model="form3.FriendlyWithCats">
                  <el-radio value="1" size="large">Yes</el-radio>
                  <el-radio value="0" size="large">No</el-radio>
                  <el-radio value="2" size="large">Unsure</el-radio>
                  <el-radio value="3" size="large">Depends</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Adoption Date" style="width: 400px">
                <el-date-picker
                  v-model="form3.adoptionDate"
                  type="date"
                  aria-label="Pick a date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="About your pet" style="width: 400px">
                <el-input type="textarea" v-model="form3.aboutPet" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Siderbar.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
interface UploadRawFile extends File {
  uid: number
}
type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
type UploadFiles = UploadFile[]

import { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
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
// do not use same name with ref
const form = reactive({
  havePet: ''
})
const form2 = reactive({
  petType: '',
  petName: '',
  weight: '',
  ageYers: '',
  ageMonths: '',
  sex: '',
  breed: ''
})

const form3 = reactive({
  micorchipped: '',
  spayed: '',
  houseTrained: '',
  FriendlyWithKids: '',
  FriendlyWithDogs: '',
  FriendlyWithCats: '',
  adoptionDate: '',
  aboutPet: ''
})

// const handleUploadSuccess = (res, file) => {
//   this.imageUrl = URL.createObjectURL(file.raw)
// }
// const beforeUpload = (file) => {
//   const isJPG = file.type === 'image/jpeg'
//   const isLt2M = file.size / 1024 / 1024 < 2

//   if (!isJPG) {
//     ElMessage.error('The image must be in JPG format!')
//   }
//   if (!isLt2M) {
//     ElMessage.error('Image size cannot exceed 2MB!')
//   }
//   return isJPG && isLt2M
// }
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dashboard {
  padding: 20px;
  /* background: #f2f2f2; */
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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px solid #dcdfe6;
}
</style>
