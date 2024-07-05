<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8"> </el-col>
          <el-col :span="16">
            <h2>Let's get start with the basic</h2>
            <h3>Add your address</h3>
            <el-form size="large" :label-position="'right'">
              <el-form-item label="Address Line 1" style="width: 400px">
                <el-input v-model="userProfile.addressLine1" placeholder="Address Line 1">
                </el-input>
              </el-form-item>
              <el-form-item label="Address Line 2" style="width: 400px">
                <el-input v-model="userProfile.addressLine2" placeholder="Address Line 2">
                </el-input>
              </el-form-item>
              <el-form-item label="City" style="width: 200px">
                <el-select v-model="userProfile.city">
                  <el-option label="Vancouver" value="Vancouver"></el-option>
                  <el-option label="Richmond" value="Richmond"></el-option>
                  <el-option label="Burnaby" value="Burnaby"></el-option>
                  <el-option label="North Vancouver" value="North Vancouver"></el-option>
                  <el-option label="West Vancouver" value="West Vancouver"></el-option>
                  <el-option label="Coquitlam" value="Coquitlam"></el-option>
                  <el-option label="Delta" value="Delta"></el-option>
                  <el-option label="New Westminster" value="New Westminster"></el-option>
                  <el-option label="Langley" value="Langley"></el-option>
                  <el-option label="Surrey" value="Surrey"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Zip" style="width: 200px">
                <el-input v-model="userProfile.postCode" placeholder="zip"> </el-input>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <h3>Profile Photo</h3>
            <p>
              This is the first photo sitters will see. We recommend using a well-lit, clear photo
              of your face(without sunglasses).
            </p>
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
            <el-divider></el-divider>
            <h3>Your email address</h3>
            <el-form size="large">
              <el-form-item label="Email" style="width: 400px">
                <el-input v-model="userProfile.email" placeholder="mobile phone"> </el-input>
              </el-form-item>
            </el-form>

            <el-divider></el-divider>
            <h3>Add your phone number</h3>
            <p>Your phone number</p>
            <p>
              PawsOnCall requires a verified phone number to keep your account safe and for
              important updates. We'll send a code via text message.
            </p>
            <el-form size="large">
              <el-form-item label="Mobile Phone Number" style="width: 400px">
                <el-input v-model="userProfile.phone" placeholder="mobile phone"> </el-input>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <h3>Add Emergency Contact</h3>
            <p>Who can we contact, other than you, in case of an emergency?</p>
            <el-form size="large">
              <el-form-item label="Emergency contact name" style="width: 600px">
                <el-input v-model="userProfile.emeContactName" placeholder="Emergency contact name">
                </el-input>
              </el-form-item>
              <el-form-item label="Emergency contact phone number" style="width: 600px">
                <el-input
                  v-model="userProfile.emeContactPhone"
                  placeholder="Emergency contact phone number"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  @click="saveProfile"
                  style="width: 200px; margin: 20px auto"
                  >Save</el-button
                ></el-form-item
              ></el-form
            >
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Siderbar.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
import { ref } from 'vue'
import { ElMessage, UploadUserFile } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const upload = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const router = useRouter()
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
console.log(userId)

const userProfile = reactive({
  userId: userId,
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
  emeContactPhone: ''
})

const saveProfile = () => {
  console.log(userProfile)
  userProfile.photo = fileList.value[0].url
  axios.post('/api/api/customer/saveProfile', userProfile).then((response) => {
    console.log(response)
    if (response.data.code === 200) {
      ElMessage.success('Profile saved successfully')
      setTimeout(() => {
        router.push({ name: 'user-dashboard' })
      }, 1500)
    } else {
      ElMessage.error('Error saving profile')
    }
  })
}

const getUserProfile = async function () {
  try {
    axios.get(`/api/api/customer/getProfile?userId=${userId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })
      }
      if (response.data.data && response.data.data.data !== null) {
        userProfile.email = response.data.data.email
        userProfile.addressLine1 = response.data.data.addressLine1
        userProfile.addressLine2 = response.data.data.addressLine2
        userProfile.city = response.data.data.city
        // userProfile.country = response.data.data.country

        userProfile.phone = response.data.data.phone
        userProfile.postCode = response.data.data.postCode
        // userProfile.province = response.data.data.province
        userProfile.emeContactName = response.data.data.emeContactName
        userProfile.emeContactPhone = response.data.data.emeContactPhone
        userProfile.userId = response.data.data.userId
        userProfile.photo = response.data.data.photo

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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dashboard {
  padding: 20px;
  p {
    margin: 12px 0;
  }
  h3 {
    margin-bottom: 12px;
  }
}
h2 {
  font-size: 24px;
  margin: 20px auto;
  text-align: center;
}
h4 {
  margin: 12px 0;
}

.btn-add-birthday {
  margin: 20px;
}
.btn-save {
  text-align: center;
  margin: 20px auto;
}
.btn-add-new-card {
  margin-bottom: 20px;
}
</style>
<style>
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
