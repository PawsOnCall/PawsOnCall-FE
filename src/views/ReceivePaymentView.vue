<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="8">
            <UserCard :isGroomer="true" />
          </el-col>
          <el-col :span="16">
            <div class="new-card-info">
              <h4>Receive Payments</h4>
              <p class="des">
                Get funds directly deposited into your bank account, with no additional fees.
              </p>
              <el-form :inline="true" :size="'large'">
                <el-form-item label="Name on Card" style="width: 600px">
                  <el-input v-model="cardForm.name" placeholder="Name on Card"></el-input
                ></el-form-item>
                <el-form-item label="Card Number" style="width: 600px">
                  <el-input v-model="cardForm.cardNumber" placeholder="Card Number"></el-input>
                </el-form-item>
                <el-form-item label="Expiration" style="width: 300px">
                  <el-input v-model="cardForm.expiration" placeholder="MM//YY"></el-input>
                </el-form-item>
                <el-form-item label="CVV" style="width: 270px">
                  <el-input v-model="cardForm.cvv" placeholder="CVV"></el-input>
                </el-form-item>
                <el-form-item label="Address Line 1" style="width: 600px">
                  <el-input v-model="cardForm.address1" placeholder="Address Line 1"> </el-input>
                </el-form-item>
                <el-form-item label="Address Line 2" style="width: 600px">
                  <el-input v-model="cardForm.address2" placeholder="Address Line 2"> </el-input>
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
                  <el-button style="margin: 20px auto" round type="primary" size="large" @click=""
                    >Save Card</el-button
                  ></el-form-item
                >
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
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

const router = useRouter()

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
.dashboard {
  padding: 20px;
  background: #f2f2f2;
}
.new-card-info {
  padding: 20px 20px 20px 50px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}
h4 {
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  font-size: 13px;
  margin-bottom: 24px;
}
</style>
