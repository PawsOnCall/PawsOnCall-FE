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
      <el-form-item label="Email:">
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

    <div class="agree">
      By signing in, I agree to PawsOnCall's Terms of Service and Privacy Policy, confirm that I am
      18 years of age or older, and consent to receiving email communication.
    </div>
    <div class="forgot"><a @click="onForgetPwd">Forgot your password?</a></div>
    <div class="tips">Don't have an PawsOnCall account? <a @click="onSignup">Sign Up Now</a></div>
  </div>
</template>

<style>
.signin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
  padding: 20px;
  width: 600px;
  background: #f2f2f2;

  h1 {
    font-size: 18px;
    margin: 20px;
    font-weight: bold;
  }

  .agree {
    font-size: 12px;
  }
  .tips {
    margin-top: 20px;
  }
  .el-form-item {
    min-width: 210px;
    margin: 20px;
  }
}
</style>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { googleAuthCodeLogin } from 'vue3-google-login'
import { decodeCredential } from 'vue3-google-login'
const router = useRouter()
// do not use same name with ref
const form = reactive({
  email: '',
  password: ''
})
const onSubmit = async () => {
  console.log('submit!')
  if (!form.email) {
    ElMessage({
      type: 'error',
      message: `Please enter your email address.`
    })
  } else if (!form.password) {
    ElMessage({
      type: 'error',
      message: `Please enter your password.`
    })
  } else {
    // ElMessage({
    //   type: 'success',
    //   message: `Sign in successfully!`
    // })

    axios('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
  }
}
const onSubmitGoogle = () => {
  googleAuthCodeLogin().then(async (response) => {
    console.log('Handle the response', response)
    // TODO: need to sent the response to backend to verify the token
    try {
      const response = await axios
        .post('/api/login/oauth2/code/google', {
          code: response.code
        })
        .then((response) => {
          console.log(response)
          // redirect to private page:
          router.push({ name: 'user-dashboard' })
        })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })
  console.log('onSubmitGoogle!')
}

const onForgetPwd = () => {
  // redirect to sign up page
  router.push({ name: 'forgot-password' })
}

const onSignup = () => {
  // redirect to sign up page
  router.push({ name: 'signup' })
}
</script>
