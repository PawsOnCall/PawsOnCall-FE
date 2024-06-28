<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="12">
        <img width="60px" src="@/assets/logo.jpg" class="logo" />
      </el-col>
      <el-col :span="12">
        <h2>Jack</h2>
        <el-link>Edit Profile</el-link>
      </el-col>
    </el-row>
    <div class="wallet-info">
      <div>
        <strong>WALLET</strong>
        <p>$0.00</p>
      </div>
      <div v-if="isGroomer">
        <strong>UPCOMING EARNINGS</strong>
        <p>$0.00</p>
      </div>
      <div v-if="!isGroomer">
        <strong>PROCESSING PAYMENTS</strong>
        <p>$0.00</p>
        <p>Funds from past bookings begin processing 48 hours after they end.</p>
      </div>
      <template v-if="!isGroomer">
        <div>
          <el-button type="default" @click="modifyPaymentMethod"
            >Add or Modify a Payment Method</el-button
          >
        </div>
        <div>
          <el-button type="default" @click="viewPayments">View Payments</el-button>
        </div>
      </template>
      <template v-else>
        <div>
          <el-button type="default" @click="OnReceivePayment"
            >Manage Methods of Receving Payments
          </el-button>
        </div>
        <div>
          <el-button type="default" @click="OnviewEarnings">View Earnings</el-button>
        </div>
      </template>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isGroomer: {
    type: Boolean,
    default: false
  }
})

// Use useRouter to get the router instance
const router = useRouter()

// Define methods as functions
const managePayoutMethods = () => {
  // Implement method
}

const modifyPaymentMethod = () => {
  // Implement method
}

const viewPayments = () => {
  // Implement method
}

const OnReceivePayment = () => {
  router.push({ name: 'receive-payment' })
}

const OnviewEarnings = () => {
  router.push({ name: 'earning-history' })
}
</script>

<style scoped>
.logo {
  width: 100px;
}
.wallet-info {
  margin-top: 20px;
}
.wallet-info > div {
  margin-bottom: 20px;
}
</style>
