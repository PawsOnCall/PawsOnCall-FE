<template>
  <div class="signin">
    <img src="@/assets/bg2.jpg" class="bg" />
    <h1>Sign In to PawsOnCall</h1>
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 980px"
      :label-position="'top'"
      :size="'large'"
    >
      <el-form-item label="Email:">
        <el-input v-model="form.username" clearable />
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

    <!-- <div class="forgot"><a @click="onForgetPwd">Forgot your password?</a></div> -->
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
  width: 980px;
  position: relative;
  /* height: 600px; */
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.5;
  }

  h1 {
    font-size: 28px;
    margin: 20px;
    font-weight: bold;
  }
  .tips {
    margin-top: 20px;
    font-size: 18px;
    position: relative;
    z-index: 20;
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
import { userAuthStore } from '../stores/userAuthStore'
import axios from '../api/axios'

const authStore = userAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  console.log('submit!')
  if (!form.username) {
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
    await axios
      .post('/api/login', {
        username: form.username,
        password: form.password
      })
      .then((response) => {
        if (response.data.code == 200) {
          const token = response.data.token
          localStorage.setItem('token', token)

          // get user info
          axios
            .get(`/api/api/account/getUserInfo?email=${form.username}`)
            .then((response) => {
              authStore.login(response.data.data)

              const redirect = router.currentRoute.value.query.redirect
              const groomerId = redirect ? redirect.split('=')[1] : null

              if (redirect) {
                router.push({ path: redirect, query: { groomerId } })
              } else {
                if (response.data.data.userType === 'customer') {
                  router.push({ name: 'user-dashboard' })
                } else {
                  router.push({ name: 'groomer-dashboard' })
                }
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error)
            })
        } else {
          ElMessage({
            type: 'error',
            message: `Invalid email or password.`
          })
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        ElMessage({
          type: 'error',
          message: `Invalid email or password.`
        })
      })
  }
}
const onSubmitGoogle = () => {
  googleAuthCodeLogin().then(async (response) => {
    console.log('Handle the response', response)
    // TODO: need to sent the response to backend to verify the token
    try {
      fetch('/api/login/oauth2/code/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: response.code
        })
      }).then((response) => {
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

const onSignup = () => {
  // redirect to sign up page
  router.push({ name: 'signup' })
}
</script>
