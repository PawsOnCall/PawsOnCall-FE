<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8"> </el-col>
          <el-col :span="16">
            <h2>Let's get start with the basic</h2>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="Basic Info" name="first">
                <h3>Add your address</h3>
                <el-form size="large" :label-position="'right'">
                  <el-form-item label="Address Line 1" style="width: 400px">
                    <el-input v-model="form.address1" placeholder="Address Line 1"> </el-input>
                  </el-form-item>
                  <el-form-item label="Address Line 2" style="width: 400px">
                    <el-input v-model="form.address2" placeholder="Address Line 2"> </el-input>
                  </el-form-item>
                  <el-form-item label="City" style="width: 200px">
                    <el-select v-model="form.city">
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
                    <el-input v-model="form.zip" placeholder="zip"> </el-input>
                  </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <h3>Profile Photo</h3>
                <p>
                  This is the first photo sitters will see. We recommend using a well-lit, clear
                  photo of your face(without sunglasses).
                </p>
                <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <el-divider></el-divider>
                <h3>Your email address</h3>
                <p>Email: abc1234@gmail.com</p>
                <!-- <a @click="changeEmail">change Email</a> -->
                <!-- <el-divider></el-divider>
                <h3>Age Verification</h3>
                <p>
                  We use this to conduct background checks when signing up to be a sitter. You must
                  be 18 or older to use PawsOnCall. We won't share or display this on your profile.
                </p>
                <div class="btn-add-birthday">
                  <el-button type="default" size="large" @click="">Add Birthday</el-button>
                </div>
                <div class="btn-save">
                  <el-button type="primary" size="large" @click="">Save & Continue</el-button>
                </div> -->
              </el-tab-pane>
              <el-tab-pane label="Phone Numbers" name="second">
                <h3>Add your phone number</h3>
                <p>Your phone number</p>
                <p>
                  PawsOnCall requires a verified phone number to keep your account safe and for
                  important updates. We'll send a code via text message.
                </p>
                <el-form size="large">
                  <el-form-item label="Mobile Phone Number" style="width: 400px">
                    <el-input v-model="form2.phone" placeholder="mobile phone"> </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="large" @click="savePhone"
                      >Save</el-button
                    ></el-form-item
                  >
                </el-form>

                <el-divider></el-divider>
                <h3>Add Emergency Contact</h3>
                <p>Who can we contact, other than you, in case of an emergency?</p>
                <el-form size="large">
                  <el-form-item label="Emergency contact name" style="width: 600px">
                    <el-input v-model="form3.emergencyName" placeholder="Emergency contact name">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Emergency contact phone number" style="width: 600px">
                    <el-input
                      v-model="form3.emergencyPhone"
                      placeholder="Emergency contact phone number"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="large" @click="saveEmergency"
                      >Save</el-button
                    ></el-form-item
                  ></el-form
                >
              </el-tab-pane>
              <el-tab-pane label="Payment Methods" name="third">
                <h3>Payment Methods</h3>
                <p>
                  Select your default payment methods on PawsOnCall. PawsOnCall accepts all major
                  credit and debit cards.
                </p>
                <el-button class="btn-add-new-card" type="primary" size="large" @click="addNewCard"
                  >+Add new card</el-button
                >
                <div v-if="newPayment" class="new-card-info">
                  <h4>Credit and Debit Cards</h4>
                  <el-form :inline="true" :size="'large'">
                    <el-form-item label="Name on Card" style="width: 800px">
                      <el-input v-model="cardForm.name" placeholder="Name on Card"></el-input
                    ></el-form-item>
                    <el-form-item label="Card Number" style="width: 800px">
                      <el-input v-model="cardForm.cardNumber" placeholder="Card Number"></el-input>
                    </el-form-item>
                    <el-form-item label="Expiration" style="width: 300px">
                      <el-input v-model="cardForm.expiration" placeholder="MM//YY"></el-input>
                    </el-form-item>
                    <el-form-item label="CVV" style="width: 300px">
                      <el-input v-model="cardForm.cvv" placeholder="CVV"></el-input>
                    </el-form-item>
                    <el-form-item label="Address Line 1" style="width: 800px">
                      <el-input v-model="cardForm.address1" placeholder="Address Line 1">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Address Line 2" style="width: 800px">
                      <el-input v-model="cardForm.address2" placeholder="Address Line 2">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="City" style="width: 200px">
                      <el-select v-model="cardForm.city">
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
                      <el-input v-model="cardForm.zip" placeholder="zip"> </el-input>
                    </el-form-item>
                    <el-form-item style="width: 800px">
                      <el-button
                        style="margin: 20px auto"
                        round
                        type="primary"
                        size="large"
                        @click=""
                        >Save Card</el-button
                      ></el-form-item
                    >
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
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
import UserCard from '@/components/UserCard.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const activeName = ref('first')
const router = useRouter()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const form = reactive({
  address1: '',
  address2: '',
  city: '',
  zip: ''
})

const imageUrl = ref('')

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
const changeEmail = () => {
  // Todo: redirect to change email page
}

const form2 = reactive({
  phone: ''
})
const savePhone = () => {
  // todo: save mobile phone
}
const form3 = reactive({
  emergencyName: '',
  emergencyPhone: ''
})
const saveEmergency = () => {
  // todo: save emergency contact
}

let newPayment = ref(false)
const addNewCard = () => {
  newPayment.value = true
}
const cardForm = reactive({
  name: '',
  cardNumber: '',
  expiration: '',
  cvv: '',
  address1: '',
  address2: '',
  city: '',
  zip: ''
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
  p {
    margin: 20px 0;
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
