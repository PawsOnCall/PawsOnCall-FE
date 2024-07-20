<template>
  <div class="signup">
    <img src="@/assets/bg3.jpg" class="bg" />
    <h1>Register to PawsOnCall</h1>

    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 500px"
      :label-position="'top'"
      :size="'large'"
      :inline="true"
    >
      <el-form-item label="Frist Name:">
        <el-input v-model="form.firstName" clearable />
      </el-form-item>
      <el-form-item label="Last Name:">
        <el-input v-model="form.lastName" clearable />
      </el-form-item>
      <el-form-item label="Email Address:">
        <el-input v-model="form.email" clearable />
      </el-form-item>
      <el-form-item label="Phone Number:">
        <el-input v-model="form.phone" clearable />
      </el-form-item>
      <el-form-item label="Password:">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="ConfirmPassword:">
        <el-input v-model="form.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="City:">
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
      <el-form-item label="Post Code:">
        <el-input v-model="form.postcode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 174px; margin-left: 150px" round @click="onSubmit"
          >Sign In</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tips">Already have a PawsOnCall account? <a @click="onSignin">Sign in now.</a></div>
  </div>
</template>

<style>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0px auto;
  padding: 20px;
  width: 980px;
  position: relative;
  z-index: 0;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  h1 {
    font-size: 28px;
    font-weight: bold;
  }
  .tips {
    margin-top: 12px;
    font-size: 18px;
    position: relative;
    z-index: 20;
  }
  .el-form-item {
    min-width: 210px;
    margin: 16px;
  }
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '../api/axios'
const router = useRouter()
const form = reactive({
  userType: 'customer',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  city: '',
  postcode: ''
})

const onSubmit = () => {
  // console.log('submit!')
  if (
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.city ||
    !form.postcode
  ) {
    ElMessage({
      type: 'error',
      message: 'Please fill in all fields!'
    })
    return
  }
  if (form.password !== form.confirmPassword) {
    ElMessage({
      type: 'error',
      message: 'Passwords do not match!'
    })
    return
  }
  axios
    .post('/api/api/account/register', {
      userType: form.userType,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      city: form.city,
      postcode: form.postcode
    })
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          type: 'success',
          message: `Sign up successful!`
        })
        router.push({ name: 'signin' })
      } else {
        ElMessage({
          type: 'error',
          message: `Sign up failed!`
        })
      }
    })
}

const onSignin = () => {
  // redirect to sign in page
  router.push({ name: 'signin' })
}
</script>
