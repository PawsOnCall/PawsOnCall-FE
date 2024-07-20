<template>
  <div class="confirm-groomer">
    <div class="profile-section">
      <div class="profile-header">
        <img :src="sitter.profileImage" alt="sitter image" />
        <div class="profile-info">
          <h2>{{ sitter.name }}</h2>
          <span class="star-sitter" v-if="sitter.starSitter">Star Sitter</span>
          <span>{{ sitter.location }}</span>
          <div class="rating">
            <span v-for="star in starLevelNum" :key="star">⭐</span>
          </div>
        </div>
      </div>
    </div>

    <div class="details-section">
      <div class="availability">
        <h3>Choose a date</h3>
        <div class="calendar">
          <div class="calendar-row header-row">
            <div class="calendar-cell" v-for="(day, index) in daysOfWeek" :key="index">
              {{ day }}
            </div>
          </div>
          <div class="calendar-row availability-row">
            <div
              class="calendar-cell"
              v-for="(date, index) in availabilityDates"
              :key="index"
              :class="{
                available: isAvailable(index),
                disabled: !date,
                selected: isSelected(date)
              }"
              @click="selectDate(date, index)"
            >
              {{ formatDisplayDate(date) }}
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <p>Select your preferred times</p>
        <div class="drop-off">
          <p>Arrive Between</p>
          <el-time-picker
            type="datetime"
            v-model="form.dropOffTimeStart"
            placeholder="start time"
            style="width: 160px"
            size="large"
          />
          <span> --</span>
          <el-time-picker
            type="datetime"
            v-model="form.dropOffTimeEnd"
            placeholder="end time"
            style="width: 160px"
            size="large"
          />
        </div>
        <el-divider></el-divider>
        <p>Select your preferred service</p>
        <div class="service">
          <el-select
            v-model="form.serviceFee"
            placeholder="Select service"
            style="width: 320px"
            clearable
            size="large"
          >
            <el-option label="Bath & Nail" value="50"></el-option>
            <el-option label="Bath & Haircut" value="80"></el-option>
            <el-option label="Full Grooming" value="100"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-button type="primary" size="large" style="margin-left: 160px" @click="onReserve"
      >Reserve</el-button
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { userAuthStore } from '@/stores/userAuthStore'
import { ElMessage } from 'element-plus'
const starLevelNum = ref(0)
const sitter = ref({
  profileImage: 'https://via.placeholder.com/100',
  name: 'Christopher & Khanh D.',
  starSitter: true,
  location: 'Vancouver, BC, V6B 1J2'
})

const form = ref({
  dropOffTimeStart: '',
  dropOffTimeEnd: '',
  serviceFee: ''
})

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Function to generate next 14 days
const generateNextTwoWeeks = () => {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const nextDate = new Date(today)
    nextDate.setDate(today.getDate() + i)
    const formattedDate = nextDate.toISOString().split('T')[0] // "YYYY-MM-DD"
    dates.push(formattedDate)
  }
  return dates
}

// Array to hold availability dates for the next two weeks
const availabilityDates = generateNextTwoWeeks()

// Reactive state to store availability status of each date
const available = ref(Array(availabilityDates.length).fill(false))
const selectedDate = ref('')

// Function to check if a date is available
const isAvailable = (index) => {
  return available.value[index]
}

// Function to check if a date is selected
const isSelected = (date) => {
  return date === selectedDate.value
}

// Function to select a date
const selectDate = (date, index) => {
  console.log(date, index)
  if (isAvailable(index)) {
    selectedDate.value = date
  }
}

// Function to format display date (e.g., "MM/DD")
const formatDisplayDate = (date) => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}`
}

function getGroomerDetail() {
  const groomerId = router.currentRoute.value.query.groomerId
  console.log(groomerId)
  axios.get(`/api/api/groomer/customerView?userId=${groomerId}`).then((response) => {
    // console.log(response.data)
    if (response.data.code !== 200) {
      if (response.data.msg === 'customer has no payment method') {
        ElMessage({
          type: 'error',
          message: `You have no payment method, please add one first`
        })
      } else {
        ElMessage({
          type: 'error',
          message: `Error fetching groomer info`
        })
        return
      }
    }
    const groomerInfo = response.data.data
    starLevelNum.value = Math.ceil(groomerInfo.star)
    console.log(starLevelNum.value)
    sitter.value.name = groomerInfo.firstName + ' ' + groomerInfo.lastName
    sitter.value.profileImage = groomerInfo.photo
    sitter.value.location =
      groomerInfo.streetNumber +
      ', ' +
      groomerInfo.street +
      ', ' +
      groomerInfo.locality +
      ', ' +
      groomerInfo.postCode

    const fetchedDates = response.data.data.availableDates.map(
      (item) => item.availableDate.split('T')[0]
    )
    // const fetchedDates = ['2024-07-08', '2024-07-10', '2024-07-11']
    console.log(fetchedDates)
    // Set initial availability status to true (selected) for fetched dates
    availabilityDates.forEach((date, index) => {
      available.value[index] = fetchedDates.includes(date)
    })
  })
}

const onReserve = () => {
  const authStore = userAuthStore()
  const userInfo = authStore.userInfo

  console.log('Reserve')
  console.log(selectedDate.value)
  console.log(form.value)
  if (!selectedDate.value) {
    ElMessage({
      type: 'error',
      message: `Please select a date`
    })
    return
  }
  if (!form.value.dropOffTimeStart || !form.value.dropOffTimeEnd) {
    ElMessage({
      type: 'error',
      message: `Please Select your preferred times`
    })
    return
  }
  if (!form.value.serviceFee) {
    ElMessage({
      type: 'error',
      message: `Please select a service type`
    })
    return
  }
  const consumerName = JSON.parse(localStorage.getItem('userProfile')).name
  axios
    .post('/api/api/order/createOrder', {
      consumerUserId: userInfo.userId,
      consumerName: consumerName,
      providerUserId: parseInt(router.currentRoute.value.query.groomerId),
      providerName: sitter.value.name,
      date: selectedDate.value,
      dropOffTimeStart: form.value.dropOffTimeStart,
      dropOffTimeEnd: form.value.dropOffTimeEnd,
      serviceFee: form.value.serviceFee
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.code !== 200) {
        if (response.data.msg === 'customer has no payment method') {
          ElMessage({
            type: 'error',
            message: `You have no payment method, please add one first`
          })
        } else {
          ElMessage({
            type: 'error',
            message: response.data.msg || `Error creating order`
          })
        }
      } else {
        ElMessage({
          type: 'success',
          message: `Order created successfully`
        })
        setTimeout(() => {
          router.push({ name: 'user-orders' })
        }, 2000)
      }
    })
}
onMounted(() => {
  getGroomerDetail()
})
</script>

<style>
.confirm-groomer {
  padding: 24px;
  width: 600px;
  margin: 24px auto;
}

.profile-section {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.profile-header img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 12px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.star-sitter {
  background-color: #ffd700;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
}

.rating {
  display: flex;
  gap: 2px;
}

.profile-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.profile-gallery img {
  width: 100px;
  height: 100px;
}

.details-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.services,
.availability,
.reviews {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-bottom: 24px;
}

.services h3,
.availability h3,
.reviews h3 {
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
}

.services p,
.availability p,
.reviews p {
  margin: 12px 0;
}

.confirm-button {
  grid-column: 1 / -1;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.review {
  margin-bottom: 24px;
}

.review p {
  margin: 12px 0;
}
.review-author {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.review-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.availability-calendar {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

.calendar {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 10px;
}

.calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-cell {
  text-align: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
}

.header-row .calendar-cell {
  font-weight: bold;
}

.availability-row .calendar-cell {
  background-color: #f2f2f2;
  cursor: not-allowed;
}

.availability-row .calendar-cell.available {
  background-color: #007bff;
  color: #fff;
  cursor: default;
}
.availability-row .calendar-cell.selected {
  background-color: #ffd700;
  color: #fff;
  cursor: default;
  position: relative;
}
.availability-row .calendar-cell.selected::after {
  content: '✔';
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
  color: red;
}
</style>
