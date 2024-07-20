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
              <h4>Order Detail</h4>
              <div class="des">Order Number: {{ order?.id }}</div>
              <div class="des">Create Time: {{ formatDate(order?.createTime) }}</div>
              <div class="des">
                Sevrice Time:
                <span>{{ formatDate(order?.dropOffTimeStart) }}</span>
                <span> ~ </span>
                <span>{{ formatDate(order?.dropOffTimeEnd) }}</span>
              </div>
              <div class="des">Payment Amout: ${{ order?.groomerFee || '0.00' }}</div>
              <div class="des" v-if="order.groomerFee === 50">Service Type:Bath & Nail</div>
              <div class="des" v-else-if="order.groomerFee === 80">Service Type:Bath & Haircut</div>
              <div class="des" v-else-if="order.groomerFee === 100">Service Type:Full Grooming</div>
              <el-divider></el-divider>
              <div class="customer-detail">
                <p>Groomer Info</p>
                <p><img :src="order.groomerPhoto" alt="" style="width: 400px" /></p>
                <p>Groomer Name: {{ order.groomerName }}</p>
                <p>Groomer Address: {{ order.groomerAddress }}</p>
                <p>Groomer Phone: {{ order.groomerPhone }}</p>
                <p>Groomer Email: {{ order.groomerEmail }}</p>
              </div>
              <el-divider></el-divider>
              <div class="review">
                <p>Please Lighting the stars, from 5 to 1</p>
                <el-rate v-model="rating" show-text size="large" :disabled="isReviewed"></el-rate>
                <el-divider></el-divider>
                <p>Write your review</p>
                <el-input
                  v-model="reviewContent"
                  type="textarea"
                  :rows="4"
                  size="large"
                  placeholder="Please enter your review"
                  :disabled="isReviewed"
                />
                <el-divider></el-divider>
                <el-button type="primary" size="large" @click="evaluateOrder" v-if="!isReviewed"
                  >Sumbit Review</el-button
                >
              </div>
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
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { formatDate } from '@/utils'
import { userAuthStore } from '@/stores/userAuthStore'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const order = reactive<any>({})
const rating = ref(0)
const reviewContent = ref('')
const userId = userAuthStore().userInfo.userId
// console.log(userId)
// const userId = 102
const isReviewed = ref(false)
const getOrders = async function () {
  try {
    axios.get(`/api/api/order/getOrders?userId=${userId}&userType=customer`).then((response) => {
      console.log(response.data)
      const orderList = response.data.data
      console.log(orderList)
      console.log(route.query.orderId)
      const foundOrder = orderList.find((order: any) => order.id === Number(route.query.orderId))
      if (foundOrder) {
        Object.assign(order, foundOrder)
        const groomerId = foundOrder.providerUserId
        // const groomerId = 103
        // api/customer/getProfile?userId=groomerUserId
        axios.get(`/api/api/groomer/customerView?userId=${groomerId}`).then((response) => {
          console.log(response.data)
          if (response.data.code !== 200) {
            ElMessage({
              type: 'error',
              message: `Error fetching groomer info`
            })
            return
          }
          const groomerInfo = response.data.data
          order.groomerName = groomerInfo.firstName + ' ' + groomerInfo.lastName
          order.groomerPhoto = groomerInfo.photo
          order.groomerEmail = groomerInfo.email
          order.groomerPhone = groomerInfo.phone
          order.groomerPhoto = groomerInfo.photo

          order.groomerAddress =
            groomerInfo.streetNumber +
            ', ' +
            groomerInfo.street +
            ', ' +
            groomerInfo.locality +
            ', ' +
            groomerInfo.postCode

          const review = groomerInfo.reviews.find((item) => item.consumerUserId === userId)
          console.log(review)

          if (review) {
            reviewContent.value = review.reviewContent
            rating.value = review.reviewStars
            if (review.reviewStars && review.reviewContent) {
              isReviewed.value = true
            }
          }
        })
      } else {
        console.error('Order not found')
      }
      console.log(order)
    })
  } catch (error) {
    console.error(error)
  }
}

const evaluateOrder = async function () {
  try {
    axios
      .post(`/api/api/order/evaluateOrder`, {
        orderId: order.id,
        reviewStars: rating.value,
        reviewContent: reviewContent.value
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.code !== 200) {
          ElMessage({
            type: 'error',
            message: response.data.message || 'Error evaluating order'
          })
        } else {
          ElMessage({
            type: 'success',
            message: 'Order evaluated successfully'
          })
          router.push({ name: 'user-dashboard' })
        }
      })
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getOrders()
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
  font-size: 14px;
}
h4 {
  font-size: 18px;
  margin: 20px auto;
  text-align: center;
}
.des {
  margin-bottom: 12px;
}
.customer-detail {
  p {
    margin-bottom: 12px;
  }
  img {
    display: block;
    width: 100px;
  }
}
.review {
  margin-top: 20px;
  p {
    margin-bottom: 12px;
  }
}
</style>
