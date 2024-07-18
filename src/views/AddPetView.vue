<template>
  <div class="dashboard">
    <h1>Add Pet</h1>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row>
          <el-col :span="4"> </el-col>
          <el-col :span="20">
            <h4>Tell us about your pet</h4>
            <el-form size="large">
              <el-form-item label="upload your pet photo">
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

              <el-form-item label="What type of pet?">
                <el-radio-group v-model="form.petType">
                  <el-radio value="dog" size="large">dog</el-radio>
                  <el-radio value="cat" size="large">cat</el-radio>
                </el-radio-group>
              </el-form-item>

              <div style="display: flex">
                <el-form-item label="name" style="width: 200px">
                  <el-input v-model="form.petName"> </el-input>
                </el-form-item>
                <el-form-item label="weight(lbs)" style="width: 200px; margin-left: 20px">
                  <el-input v-model="form.weight"> </el-input>
                </el-form-item>
              </div>

              <el-form-item label="sex">
                <el-radio-group v-model="form.sex">
                  <el-radio value="male" size="large">Male</el-radio>
                  <el-radio value="female" size="large">Female</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="Breed(If your pet is a mixed breed, enter 'Mixed')"
                style="width: 500px"
              >
                <el-input v-model="form.breed"> </el-input>
              </el-form-item>

              <el-divider></el-divider>
              <h4>Additional Details</h4>

              <el-form-item label="microChipped?">
                <el-radio-group v-model="form.microChipped">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Spayed/Neutered?">
                <el-radio-group v-model="form.spayed">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="House Trained?">
                <el-radio-group v-model="form.houseTrained">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Kids?">
                <el-radio-group v-model="form.friendlyWithChildren">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Dogs?">
                <el-radio-group v-model="form.friendlyWithDog">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Friendly With Cats?">
                <el-radio-group v-model="form.friendlyWithCat">
                  <el-radio :value="true" size="large">Yes</el-radio>
                  <el-radio :value="false" size="large">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Adoption Date" style="width: 400px">
                <el-date-picker
                  v-model="form.adoptionDate"
                  type="date"
                  aria-label="Pick a date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="About your pet" style="width: 400px">
                <el-input type="textarea" v-model="form.aboutPet" />
              </el-form-item>
              <el-form-item style="width: 800px">
                <el-button
                  style="margin: 20px auto"
                  round
                  type="primary"
                  size="large"
                  @click="savePet"
                  >Save</el-button
                ></el-form-item
              >
            </el-form>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
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
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'
import { ElMessage, UploadUserFile } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { userAuthStore } from '@/stores/userAuthStore'

const route = useRoute()
const petId = route.query.petId

const upload = ref<UploadInstance>()

const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
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
  petType: '',
  petName: '',
  weight: '',
  sex: '',
  breed: '',
  microChipped: false,
  spayed: false,
  houseTrained: false,
  friendlyWithChildren: false,
  friendlyWithDog: false,
  friendlyWithCat: false,
  adoptionDate: '',
  aboutPet: ''
})

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
const userId = userAuthStore().userInfo.userId
console.log(userId)
const savePet = () => {
  console.log(form)
  console.log(fileList.value[0].url)
  axios
    .post(`/api/api/customer/savePet`, {
      id: petId,
      userId: userId,
      type: form.petType,
      name: form.petName,
      weight: form.weight,
      sex: form.sex,
      breed: form.breed,
      microChipped: form.microChipped,
      spayed: form.spayed,
      houseTrained: form.houseTrained,
      friendlyWithChildren: form.friendlyWithChildren,
      friendlyWithDog: form.friendlyWithDog,
      friendlyWithCat: form.friendlyWithCat,
      adoptionDate: form.adoptionDate,
      aboutPet: form.aboutPet,
      photo: fileList.value[0].url
    })
    .then((response) => {
      console.log(response.data)
      ElMessage.success('Pet saved successfully')
      setTimeout(() => {
        router.push({ name: 'user-dashboard' })
      }, 1500)
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  if (petId) {
    axios.get(`/api/api/customer/getPet?id=${petId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message || 'Error fetching pet info'
        })
        return
      }
      const petInfo = response.data.data
      form.petType = petInfo.type
      form.petName = petInfo.name
      form.weight = petInfo.weight
      form.sex = petInfo.sex
      form.breed = petInfo.breed
      form.microChipped = petInfo.microChipped
      form.spayed = petInfo.spayed

      form.houseTrained = petInfo.houseTrained
      form.friendlyWithChildren = petInfo.friendlyWithChildren
      form.friendlyWithDog = petInfo.friendlyWithDog
      form.friendlyWithCat = petInfo.friendlyWithCat
      form.adoptionDate = petInfo.adoptionDate
      form.aboutPet = petInfo.aboutPet
      fileList.value.push({
        name: 'pet-photo',
        url: petInfo.photo
      })
    })
  }
})
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dashboard {
  padding: 20px;
  width: 980px;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
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
