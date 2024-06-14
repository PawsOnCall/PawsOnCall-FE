<template>
  <div class="forget-page">
    <h1>Forgot your password?</h1>
    <div class="tips">
      To reset your password, type the full email address you used to sign up for PawsOnCall and
      we'll send you an e-mail to walk you through resetting your password.
    </div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Email:">
        <el-input v-model="form.email" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left: 40px">Sumbit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .forget-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px auto;
    padding: 20px;
    width: 600px;
    /* border: 1px solid #000; */
    background: #f2f2f2;

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
  }
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  email: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
