<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- <UserCard :isGroomer="false" /> -->
          </el-col>
          <el-col :span="20">
            <div class="new-card-info">
              <h4>Receive Payments</h4>
              <p class="des">
                Get funds directly deposited into your bank account, with no additional fees.
              </p>
              <el-form :inline="true" :size="'large'">
                <el-form-item label="Name on Card" style="width: 600px">
                  <el-input v-model="cardForm.cardName" placeholder="Name on Card"></el-input
                ></el-form-item>
                <el-form-item label="Card Number" style="width: 600px">
                  <el-input v-model="cardForm.cardNumber" placeholder="Card Number"></el-input>
                </el-form-item>
                <el-form-item label="Expiration" style="width: 300px">
                  <el-input v-model="cardForm.expiration" placeholder="MM//YY"></el-input>
                </el-form-item>
                <el-form-item label="CVC" style="width: 270px">
                  <el-input v-model="cardForm.cvc" placeholder="CVC"></el-input>
                </el-form-item>
                <el-form-item label="Address Line 1" style="width: 600px">
                  <el-input v-model="cardForm.addressLine1" placeholder="Address Line 1">
                  </el-input>
                </el-form-item>
                <el-form-item label="Address Line 2" style="width: 600px">
                  <el-input v-model="cardForm.addressLine2" placeholder="Address Line 2">
                  </el-input>
                </el-form-item>
                <el-form-item label="City" style="width: 300px">
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
                <el-form-item label="postCode" style="width: 200px">
                  <el-input v-model="cardForm.postCode" placeholder="postCode"> </el-input>
                </el-form-item>
                <el-form-item style="width: 800px">
                  <el-button
                    style="margin: 20px auto"
                    round
                    type="primary"
                    size="large"
                    @click="savePayment"
                    >Save Card</el-button
                  ></el-form-item
                >
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="false" />
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
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
const router = useRouter()

const userId = userAuthStore().userInfo.userId
console.log(userId)
const cardForm = reactive({
  cardName: '',
  cardNumber: '',
  expiration: '',
  cvc: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postCode: '',
  country: 'Canada',
  province: 'BC',
  userId: userId,
  id: ''
})
const getUserPayment = async function () {
  try {
    const userId = userAuthStore().userInfo.userId
    axios.get(`/api/api/payment/getPayment?userId=${userId}`).then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })
      }
      if (response.data.data === null) {
        return
      }
      cardForm.id = response.data.data.id
      cardForm.cardName = response.data.data.cardName
      cardForm.cardNumber = response.data.data.cardNumber
      cardForm.expiration = response.data.data.expiration

      cardForm.cvc = response.data.data.cvc
      cardForm.addressLine1 = response.data.data.addressLine1
      cardForm.addressLine2 = response.data.data.addressLine2

      cardForm.city = response.data.data.city
      cardForm.postCode = response.data.data.postCode
    })
  } catch (error) {
    console.error(error)
  }
}
getUserPayment()

const savePayment = async function () {
  try {
    axios
      .post(`/api/api/payment/savePayment`, {
        cardName: cardForm.cardName,
        cardNumber: cardForm.cardNumber,
        expiration: cardForm.expiration,
        cvc: cardForm.cvc,
        addressLine1: cardForm.addressLine1,
        addressLine2: cardForm.addressLine2,
        city: cardForm.city,
        postCode: cardForm.postCode,
        country: cardForm.country,
        province: cardForm.province,
        userId: cardForm.userId,
        id: cardForm.id
      })
      .then((response) => {
        console.log(response.data)
        ElMessage.success('Payment saved successfully')
        setTimeout(() => {
          router.push({ name: 'groomer-dashboard' })
        }, 1500)
      })
  } catch (error) {
    console.error(error)
  }
}
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
