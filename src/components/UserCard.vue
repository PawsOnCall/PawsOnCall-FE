<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="12">
        <img width="60px" :src="`${userInfo.photo}`" class="logo" />
      </el-col>
      <el-col :span="12">
        <h2>{{ userInfo.name }}</h2>
        <el-link @click="OnEditProfile">Edit Profile</el-link>
      </el-col>
    </el-row>
    <div class="wallet-info">
      <template v-if="isGroomer">
        <div>
          <strong>WALLET</strong>
          <span>$0.00</span>
        </div>
        <div>
          <strong>UPCOMING EARNINGS</strong>
          <span>$0.00</span>
        </div>
        <div>
          <el-button type="default" @click="OnReceivePayment"
            >Manage Methods of Receving Payments
          </el-button>
        </div>
        <div>
          <el-button type="default" @click="OnviewEarnings">View Earnings</el-button>
        </div>
      </template>

      <template v-else>
        <div>
          <p class="payment-amount"><strong>PROCESSING PAYMENTS</strong><span>$0.00</span></p>
          <p class="tips">Funds from past bookings begin processing 48 hours after they end.</p>
        </div>
        <div>
          <el-button type="default" @click="modifyPaymentMethod"
            >Add or Modify a Payment Method</el-button
          >
        </div>
        <div>
          <el-button type="default" @click="viewPayments">View Payments</el-button>
        </div>
      </template>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { fa } from 'element-plus/es/locale'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isGroomer: {
    type: Boolean,
    default: false
  },
  userInfo: {
    type: Object,
    default: () => {
      return {
        name: 'Frank',
        photo:
          'https://www.rawpixel.com/image/6196752/png-sticker-journal#eyJrZXlzIjoiY2F0Iiwic29ydGVkS2V5cyI6ImNhdCJ9'
      }
    }
  }
})

// Use useRouter to get the router instance
const router = useRouter()

const modifyPaymentMethod = () => {
  router.push({ name: 'user-payment' })
}

const viewPayments = () => {
  router.push({ name: 'payment-history' })
}

const OnReceivePayment = () => {
  router.push({ name: 'receive-payment' })
}

const OnviewEarnings = () => {
  router.push({ name: 'earning-history' })
}

const OnEditProfile = () => {
  router.push({ name: 'user-profile' })
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
.tips {
  color: #999;
  font-size: 12px;
}
.payment-amount {
  margin-bottom: 10px;
  strong {
    margin-right: 10px;
  }
}
</style>
