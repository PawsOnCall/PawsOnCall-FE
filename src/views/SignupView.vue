<template>
  <div class="signup">
    <h1>Sign Up to PawsOnCall</h1>

    <el-form label-width="auto" style="max-width: 500px; margin-top: 30px" :size="'large'">
      <el-form-item>
        <el-button type="primary" round @click="onSubmitGoogle">Continue with Google</el-button>
      </el-form-item>
    </el-form>
    <div>OR</div>
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 500px; padding-left: 60px; padding-top: 30px"
      :label-position="'top'"
      :size="'large'"
      :inline="true"
    >
      <el-form-item label="First Name:">
        <el-input v-model="form.firstname" clearable />
      </el-form-item>
      <el-form-item label="Last Name:">
        <el-input v-model="form.lastname" clearable></el-input>
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
      <el-form-item label="Confirm Password:">
        <el-input v-model="form.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="Post Code:">
        <el-input v-model="form.postCode"></el-input>
      </el-form-item>
      <el-form-item style="width: 174px"></el-form-item>
      <el-form-item style="width: 500px">
        <el-button type="primary" round @click="onSubmit" style="margin: 10px 144px"
          >Sign Up</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tips">
      By signing in or signing up, I agree to PawsOnCall's
      <a @click="onPolicy">Terms of Service and Privacy Policy</a>, confirm that I am 18 years of
      age or older, and consent to receiving email communication.
    </div>
    <div class="forgetPwd"><a @click="onForget">Forgot your password?</a></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 50px auto;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 600px;
    background: #f2f2f2;
    .button-google {
      margin: 12px;
      padding: 12px 24px;
      background: #206ff2;
      border-color: #0e61eb;
      color: #fff;
      border-radius: 99999px;
    }
    h1 {
      font-size: 18px;
      margin-top: 20px;
      font-weight: bold;
    }
    .form-item {
      margin: 10px;
      span {
        display: inline-block;
        width: 150px;
      }
    }
    .tips {
      padding: 20px;
    }
    .forgetPwd {
      font-size: 18px;
    }
  }
}
</style>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  postCode: ''
})

const onSubmit = () => {
  console.log('submit!')
}
const onSubmitGoogle = () => {
  console.log('onSubmitGoogle!')
}
const onPolicy = () => {
  router.push({ name: 'policy' })
}
const onForget = () => {
  router.push({ name: 'forgot-password' })
}
</script>
