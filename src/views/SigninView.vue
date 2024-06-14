<template>
  <div class="signin">
    <h1>Sign In to PawsOnCall</h1>
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px"
      :label-position="'top'"
      :size="'large'"
    >
      <el-form-item label="Email Address:">
        <el-input v-model="form.email" clearable />
      </el-form-item>
      <el-form-item label="Password:">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item center>
        <el-button type="primary" round @click="onSubmit" style="margin-left: 40px"
          >Sign In</el-button
        >
      </el-form-item>
    </el-form>
    <div>OR</div>
    <el-form label-width="auto" style="max-width: 600px; margin-top: 30px" :size="'large'">
      <el-form-item>
        <el-button type="primary" round @click="onSubmitGoogle">Continue with Google</el-button>
      </el-form-item>
    </el-form>
    <div class="tips">
      Don't have an account? <span class="signup-link" @click="onSignup">Sign Up Now</span>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .signin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px auto;
    padding: 20px;
    width: 600px;
    /* border: 1px solid #000; */
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
      margin: 20px;
      font-weight: bold;
    }
    .form-item {
      margin: 10px;
      span {
        display: inline-block;
        width: 100px;
      }
    }

    .tips {
      margin-top: 20px;
    }

    .signup-link {
      color: #206ff2;
      cursor: pointer;
    }
  }
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  console.log('submit!')
}
const onSubmitGoogle = () => {
  console.log('onSubmitGoogle!')
}

const onSignup = () => {
  // redirect to sign up page
  router.push({ name: 'signup' })
}
</script>
