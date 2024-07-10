<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="availability-calendar">
          <h2>Your availability for the next 2 weeks</h2>
          <p>
            Want more requests that are right for you?<br />
            Confirm your availability to highlight your profile in search results. Deselect any days
            you’re <strong>not</strong> available.
          </p>
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
                @click="toggleAvailability(index)"
              >
                {{ formatDisplayDate(date) }}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Last updated a day ago</p>
            <button @click="confirmAvailability">Confirm Availability</button>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <Sidebar :isGroomer="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Siderbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { userAuthStore } from '@/stores/userAuthStore'
import { ElMessage } from 'element-plus'
const userId = userAuthStore().userInfo.userId
// console.log(userId)
// const userId = 103
// Days of the week for header row
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

// Function to toggle availability status of a date
const toggleAvailability = (index) => {
  available.value[index] = !available.value[index]
}

// Function to format display date (e.g., "MM/DD")
const formatDisplayDate = (date) => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}`
}

// Function to fetch available dates for the user
const getAvailableDates = async () => {
  try {
    const response = await axios.get(`/api/api/groomer/getAvailableDate?userId=${userId}`)
    if (response.data.code !== 200) {
      ElMessage({
        type: 'error',
        message: response.data.message || 'Error fetching data'
      })
    } else {
      const fetchedDates = response.data.data.map((item) => item.availableDate.split('T')[0])
      console.log(fetchedDates)
      // Set initial availability status to true (selected) for fetched dates
      availabilityDates.forEach((date, index) => {
        available.value[index] = fetchedDates.includes(date)
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error || 'Error fetching available dates:'
    })
  }
}

const confirmAvailability = () => {
  const selectedDates = availabilityDates.filter((date, index) => available.value[index])
  const availabilityArray = selectedDates.map((date) => ({ userId, availableDate: date }))

  axios
    .post(`/api/api/groomer/setAvailableDate`, availabilityArray)
    .then((response) => {
      if (response.data.code === 200) {
        ElMessage({
          type: 'success',
          message: ' Successfully set your available date'
        })
      } else {
        ElMessage({
          type: 'error',
          message: response.data.message || 'Error setting available date'
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  getAvailableDates()
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f2f2f2;
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

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
