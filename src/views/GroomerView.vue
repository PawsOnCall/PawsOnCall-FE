<template>
  <div class="groomer">
    <img src="@/assets/bg1.jpg" class="bg" />
    <img src="@/assets/bg2.jpg" class="bg2" />
    <template v-if="!info.hasProfessionalBackground">
      <div class="step1">
        <h2>Let's get you started</h2>
        <div class="subheading">Personal Information</div>
        <el-form
          :model="form"
          label-width="auto"
          :label-position="'top'"
          :size="'large'"
          :inline="true"
          style="width: 800px"
        >
          <el-form-item label="Frist Name:">
            <el-input v-model="form.firstName" clearable />
          </el-form-item>
          <el-form-item label="Last Name:">
            <el-input v-model="form.lastName" clearable />
          </el-form-item>
          <el-form-item label="Email:">
            <el-input v-model="form.email" clearable />
          </el-form-item>
          <el-form-item label="Password:">
            <el-input v-model="form.password" type="password" show-password />
          </el-form-item>
          <el-form-item label="Mailing Address:">
            <el-input v-model="form.mailing" clearable />
          </el-form-item>
          <el-form-item label="Select Grooming Experience:">
            <el-select v-model="form.groomingExperience">
              <el-option label="Beginner" value="1"></el-option>
              <el-option label="1-5 year" value="2"></el-option>
              <el-option label="5+ years" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Mobile Phone Number:">
            <el-input v-model="form.phone" clearable />
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="step2">
        <h2>Tell us more about you</h2>
        <div class="subheading">Professional Background</div>
        <el-form :model="form" size="large" style="width: 800px">
          <el-form-item label="Are you a pet groomer or bather?">
            <el-radio-group v-model="form.role" class="ml-4">
              <el-radio value="Groomer" size="large">Groomer</el-radio>
              <el-radio value="Bather" size="large">Bather</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="How many pets have you professionally groomed over the past 2 years?"
          >
            <el-input-number v-model="form.groomedCount" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item
            label=" What type of pet do you groom/bathe?(Select one or more that applies)"
          >
            <el-checkbox-group v-model="form.petType">
              <el-checkbox value="Dog" name="type"> Dog </el-checkbox>
              <el-checkbox value="Cat" name="type"> Cat </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Have you got any groomming certification?">
            <el-radio-group v-model="form.hasCertification" class="ml-4">
              <el-radio :value="true" size="large">Yes</el-radio>
              <el-radio :value="false" size="large">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.hasCertification" label="Which Certification do you have?">
            <el-input
              v-model="form.certification"
              placeholder="Certificate or school name"
            ></el-input>
          </el-form-item>
          <el-form-item label="What would your weekly availability be?">
            <el-select v-model="form.availabilityType">
              <el-option label="Daily (Monday to Sunday)" value="Daily"></el-option>
              <el-option label="Weekdays (Monday to Friday)" value="Weekdays"></el-option>
              <el-option label="Weekends(Saturday to Sunday)" value="Weekends"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="step3">
        <h2>Tell us more about your work</h2>
        <el-form :model="form" size="large" :inline="true" style="width: 800px">
          <el-form-item label="Facebook Account">
            <el-input v-model="form.facebook" clearable />
          </el-form-item>
          <el-form-item label="Instagram Account">
            <el-input v-model="form.instagram" clearable />
          </el-form-item>
          <el-form-item label="Tell us more about yourself and why you are loving grooming?">
            <el-input
              v-model="form.selfIntroduction"
              type="textarea"
              :rows="4"
              clearable
              style="width: 300px"
            />
          </el-form-item>
          <el-form-item label="Upload photos of your recent grooming work">
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
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 600px" round @click="submitForm"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
    </template>
    <div class="step-done" v-if="info.hasProfessionalBackground">
      <div class="heading">You are all set!</div>
      <div class="subheading">You application was successfully submitted</div>
      <p>Thank you for your interest on join PawsOnCall, we will get in touch shortly.</p>
    </div>
  </div>
</template>

<style>
.groomer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px auto;
  max-width: 980px;
  font-weight: bold;
  color: #000;
  position: relative;
  z-index: 12;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    opacity: 0.5;
  }
  .bg2 {
    position: absolute;
    top: 730px;
    left: 0;
    z-index: -1;
    width: 100%;
    opacity: 0.5;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 16px;
    margin-top: 20px;
  }
  .subheading {
    margin: 10px auto;
  }
  .el-form-item {
    min-width: 250px;
  }
  .step-done {
    width: 500px;
    margin: 60px auto;
    .heading {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .subheading {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage, UploadUserFile } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { userAuthStore } from '@/stores/userAuthStore'
const upload = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

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

const router = useRouter()
// do not use same name with ref
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ``,
  mailing: '',
  groomingExperience: '',
  phone: '',
  role: '',
  groomedCount: 0,
  petType: [],
  hasCertification: '',
  certification: '',
  availabilityType: '',
  selfIntroduction: '',
  photo: '',
  facebook: '',
  instagram: ''
})
var info = reactive({
  // hasBasicInfo: false,
  // hasProfessionalInfo: false,
  hasProfessionalBackground: false
})

const submitForm = () => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.password ||
    !form.mailing ||
    !form.groomingExperience ||
    !form.phone
  ) {
    ElMessage({
      type: 'error',
      message: `Please fill in all the fields about your Personal Information`
    })
  }
  if (!form.role || !form.petType.length || !form.availabilityType) {
    ElMessage({
      type: 'error',
      message: `Please fill in all the fields about your Professional Background.`
    })
  }
  if (!form.selfIntroduction) {
    ElMessage({
      type: 'error',
      message: `Please tell us more about yourself and why you are loving grooming`
    })
  }
  // submit form

  axios
    .post('/api/api/groomer/register', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      mailing: form.mailing,
      groomingExperience: form.groomingExperience,
      phone: form.phone,
      role: form.role,
      groomedCount: form.groomedCount,
      petType: form.petType.join(',') || '',
      hasCertification: form.hasCertification,
      certification: form.certification,
      availabilityType: form.availabilityType,
      selfIntroduction: form.selfIntroduction,
      photo: form.photo,
      facebook: form.facebook,
      instagram: form.instagram
    })
    .then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        info.hasProfessionalBackground = true
      } else {
        ElMessage({
          type: 'error',
          message: res.data.message || 'Failed to save the grommer info, please check'
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
