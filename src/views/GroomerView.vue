<template>
  <div class="groomer">
    <div class="step1" v-if="!info.hasBasicInfo">
      <h2>Let's get you started</h2>
      <div class="subheading">Personal Information</div>
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
        <el-form-item label="Mailing Address:">
          <el-input v-model="form.mailing" clearable />
        </el-form-item>
        <el-form-item label="Select Grooming Experience:">
          <el-select v-model="form.experience">
            <el-option label="Beginner" value="1"></el-option>
            <el-option label="1-5 year" value="2"></el-option>
            <el-option label="5+ years" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Mobile Phone Number:">
          <el-input v-model="form.phone" clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 250px" round @click="onContinue"
            >continue</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="step2" v-if="info.hasBasicInfo && !info.hasProfessionalInfo">
      <h2>Tell us more about you</h2>
      <div class="subheading">Professional Background</div>
      <el-form :model="form2" size="large">
        <el-form-item label="Are you a pet groomer or bather?">
          <el-radio-group v-model="form2.role" class="ml-4">
            <el-radio value="Groomer" size="large">Groomer</el-radio>
            <el-radio value="Bather" size="large">Bather</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="How many pets have you professionally groomed over the past 2 years?">
          <el-input-number v-model="form2.num" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item
          label=" What type of pet do you groom/bathe?(Select one or more that applies)"
        >
          <el-checkbox-group v-model="form.petType">
            <el-checkbox value="Dog" name="type"> Dog </el-checkbox>
            <el-checkbox value="Cat" name="type"> Cat </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="Have you got any groomming certification?(Anything related to the grooming industry)"
        >
          <el-radio-group v-model="form2.hasCertificate" class="ml-4">
            <el-radio :value="true" size="large">Yes</el-radio>
            <el-radio :value="false" size="large">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form2.hasCertificate" label="Which Certification do you have?">
          <el-input v-model="form2.certiName" placeholder="Certificate or school name"></el-input>
        </el-form-item>
        <el-form-item label="What would your weekly availability be?">
          <el-select v-model="form2.availability">
            <el-option label="Daily (Monday to Sunday)" value="1"></el-option>
            <el-option label="Weekdays (Monday to Friday)" value="2"></el-option>
            <el-option label="Weekends(Saturday to Sunday)" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 250px" round @click="onContinue2"
            >continue</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="step3" v-if="info.hasProfessionalInfo && !info.hasProfessionalBackground">
      <h2>Tell us more about your work</h2>
      <div class="subheading">Professional Background</div>
      <el-form :model="form3" size="large">
        <el-form-item label="Tell us more about yourself and why you are loving grooming?">
          <el-input v-model="form3.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Upload photos of your recent grooming work">
          <el-input v-model="form3.photo" type="file" />
        </el-form-item>
        <el-form-item label="Facebook Account">
          <el-input v-model="form3.facebook" />
        </el-form-item>
        <el-form-item label="Instagram Account">
          <el-input v-model="form3.instagram" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 250px" round @click="onContinue3"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
// do not use same name with ref
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mailing: '',
  experience: '',
  phone: ''
})
var info = reactive({
  hasBasicInfo: false,
  hasProfessionalInfo: false,
  hasProfessionalBackground: false
})

const onContinue = () => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.mailing ||
    !form.experience ||
    !form.phone
  ) {
    ElMessage({
      type: 'error',
      message: `Please fill in all the fields.`
    })
  } else {
    ElMessage({
      type: 'success',
      message: `Personal Information has been saved.`
    })
    // redirect to groomer page
    // router.push('/groomerAccount')
    info.hasBasicInfo = true
  }
}
const form2 = reactive({
  role: '',
  num: 0,
  petType: [],
  hasCertificate: '',
  certiName: '',
  availability: ''
})

const onContinue2 = () => {
  if (!form2.role || !form2.petType || !form2.availability) {
    ElMessage({
      type: 'error',
      message: `Please fill in all the fields.`
    })
  } else {
    ElMessage({
      type: 'success',
      message: `Professional Background has been saved.`
    })
    info.hasProfessionalInfo = true
  }
}
const form3 = reactive({
  desc: '',
  photo: '',
  facebook: '',
  instagram: ''
})

const onContinue3 = () => {
  if (!form3.desc) {
    ElMessage({
      type: 'error',
      message: `Please tell us more about yourself and why you are loving grooming`
    })
  } else {
    ElMessage({
      type: 'success',
      message: `Professional Background has been saved.`
    })
    info.hasProfessionalBackground = true
  }
}
</script>
