<template>
  <div class="forget-page">
    <h1>Forgot your password?</h1>
    <div class="tips">
      To reset your password, type the full email address you used to sign up for PawsOnCall and
      we'll send you an e-mail to walk you through resetting your password.
    </div>
    <el-form :model="form" label-width="auto" style="max-width: 600px" :size="'large'">
      <el-form-item label="Email:">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left: 60px">Sumbit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
.forget-page {
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

  .tips {
    margin-bottom: 20px;
  }

  .el-form-item {
    min-width: 210px;
  }
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  email: ''
})

const onSubmit = () => {
  if (!form.email) {
    ElMessage({
      type: 'error',
      message: `Please enter your email address.`
    })
  } else {
    ElMessage({
      type: 'success',
      message: `An email has been sent to ${form.email}. Please check your inbox.`
    })
  }
}
</script>
