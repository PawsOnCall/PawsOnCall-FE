<template>
  <div class="container">
    <div class="profile-section">
      <div class="profile-header">
        <img :src="groomer.profileImage" alt="groomer image" />
        <div class="profile-info">
          <h2>{{ groomer.name }}</h2>
          <span class="star-groomer" v-if="groomer.stargroomer">Star groomer</span>
          <span>{{ groomer.location }}</span>
          <div class="rating">
            <span v-for="star in 3" :key="star">⭐</span>
          </div>
        </div>
      </div>
    </div>

    <div class="details-section">
      <div class="details-left">
        <div class="services">
          <h3>Services</h3>
          <p v-for="service in services" :key="service.name">
            {{ service.name }}: ${{ service.price }}/time
          </p>
        </div>
        <div class="availability">
          <h3>Availability</h3>
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
                :class="{ available: isAvailable(index), disabled: !date }"
              >
                {{ formatDisplayDate(date) }}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Calendar last updated 8 hours ago</p>
            <p>{{ groomer.name }} can host up to 2 pets per night</p>
            <p>Boarding Cancellation Policy: Three Day</p>
          </div>
        </div>
      </div>
      <div class="details-right">
        <div class="reviews">
          <h3>Reviews</h3>
          <div class="review" v-for="(review, index) in reviews" :key="review.author">
            <div class="review-author">
              <img :src="review.photo" class="review-photo" />
              <strong>{{ review.author }}</strong>
              <span> -{{ review.date }}</span>
            </div>
            <p>{{ review.content }}</p>

            <el-divider v-if="index != reviews.length - 1"></el-divider>
          </div>
          <!-- <a href="#">Read more reviews</a> -->
        </div>
        <el-button class="confirm-button" size="large" @click="confirmGroomer"
          >Confirm groomer</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { userAuthStore } from '@/stores/userAuthStore'
import { ElMessage } from 'element-plus'
const groomer = ref({
  profileImage: 'https://via.placeholder.com/100',
  name: 'Christopher & Khanh D.',
  stargroomer: true,
  location: 'Vancouver, BC, V6B 1J2',
  galleryImages: [
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100'
  ],
  galleryCount: 74
})

const services = ref([
  { name: 'Bath & Nail', price: 50 },
  { name: 'Bath & Haircut', price: 80 },
  { name: 'Full Grooming', price: 100 }
])

const reviews = ref([])
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

// Function to check if a date is available
const isAvailable = (index) => {
  return available.value[index]
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
    console.log(response.data)
    if (response.data.code !== 200) {
      ElMessage({
        type: 'error',
        message: `Error fetching groomer info`
      })
      return
    }
    const groomerInfo = response.data.data
    groomer.value.name = groomerInfo.firstName + ' ' + groomerInfo.lastName
    groomer.value.profileImage = groomerInfo.photo
    groomer.value.location =
      groomerInfo.streetNumber +
      ', ' +
      groomerInfo.street +
      ', ' +
      groomerInfo.locality +
      ', ' +
      groomerInfo.postCode

    reviews.value = groomerInfo.reviews.map((review) => {
      return {
        author: review.consumerName || 'Anonymous',
        date: review.reviewDate || new Date().toLocaleDateString(),
        content: review.reviewContent || `Great service!\nWould recommend!`,
        photo: review.photo || 'https://via.placeholder.com/100'
      }
    })

    const fetchedDates = response.data.data.availableDates.map(
      (item) => item.availableDate.split('T')[0]
    )
    console.log(fetchedDates)
    // Set initial availability status to true (selected) for fetched dates
    availabilityDates.forEach((date, index) => {
      available.value[index] = fetchedDates.includes(date)
    })
  })
}
onMounted(() => {
  getGroomerDetail()
})

const confirmGroomer = () => {
  const userId = userAuthStore().userInfo.userId
  const currentRoute = router.currentRoute.value.fullPath
  if (!userId) {
    router.push(`/signin?redirect=${currentRoute}`)
    return
  }
  const groomerId = router.currentRoute.value.query.groomerId
  console.log(groomerId)
  // router.push('/confirm-groomer', { query: { groomerId: groomerId } })
  router.push({ name: 'confirm-groomer', query: { groomerId: groomerId } })
}
</script>

<style>
.container {
  margin: 24px;
  padding: 24px;
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

.star-groomer {
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
/* .review strong {
  display: inline-block;
} */
.review-photo {
  /* display: inline-block; */
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

.availability-row .calendar-cell.disabled {
  background-color: transparent;
  cursor: default;
}

.availability-row .calendar-cell.available {
  background-color: #007bff;
  color: #fff;
}
</style>
