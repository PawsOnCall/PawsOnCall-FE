<template>
  <div class="groomer-list">
    <div class="sidebar">
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 400px"
        :label-position="'top'"
        :size="'large'"
      >
        <!-- <el-form-item label="Service Type:">
          <el-select v-model="form.serviceType" clearable>
            <el-option label="Grooming" value="Grooming" />
            <el-option label="Full grooming" value="Grooming,Bathing,Nail Triming" />
            <el-option label="Bath & Nail Triming" value="Bath,Nail Triming" />
            <el-option label="Bath & Grooming" value="Grooming,Bathing" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="Address:">
          <el-input type="text" v-model="form.address" placeholder="enter your address" />
        </el-form-item>
        <el-form-item label="Service Dates:">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            size="large"
          />
        </el-form-item>
        <el-form-item> <el-button type="primary" @click="onFilter">Search</el-button></el-form-item>
      </el-form>
    </div>

    <div class="results" v-loading="loading">
      <div
        v-for="groomer in groomers"
        :key="groomer.userId"
        class="groomer-card"
        @click="viewDetail(groomer.userId)"
      >
        <div class="groomer-header">
          <span
            class="availability-box"
            v-if="groomer.availableDates && groomer.availableDates.length"
            >Confirmed availability: {{ groomer.startDate }} to {{ groomer.endDate }}</span
          >
        </div>
        <div class="groomer-info">
          <img :src="groomer.photo" alt="groomer image" class="groomer-image" />
          <div>
            <h4>{{ groomer.firstName + ' ' + groomer.lastName }}</h4>
            <span v-if="groomer.stargroomer" class="star-groomer">Star groomer</span>
            <p>{{ groomer.headline }}</p>
            <p>
              {{ groomer.locality + ', ' + groomer.areaLevel1 }}
            </p>
          </div>
        </div>
        <div class="groomer-details">
          <span>{{ groomer.totalComments }} reviews</span>
          <span v-if="groomer.groomedCount">{{ groomer.groomedCount }} repeat clients</span>
          <!-- <span class="serviceFee">from {{ groomer.serviceFee }} per night</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '../api/axios'
const router = useRouter()
const form = reactive({
  serviceType: '',
  address: '',
  date: ''
})
const startDate = ref('')
const endDate = ref('')
const loading = ref(true)
const groomers = ref([])

const message = ref('Search Groomer')
localStorage.getItem('searchMessage')
  ? (message.value = localStorage.getItem('searchMessage'))
  : 'Search Groomer'

const onFilter = () => {
  console.log('Filtering...')
  groomers.value = []
  if (form.serviceType) {
    message.value += ` by service type:${form.serviceType}, `
  }
  if (form.address) {
    message.value += ` near to address:${form.address}, `
  }
  if (form.date) {
    startDate.value = form.date[0]
    endDate.value = form.date[1]
    message.value += ` available date:from ${startDate.value} to ${endDate.value} `
  }
  loading.value = true
  // getGroomers()
  getGroomersFromDB()
}

const viewDetail = (userId) => {
  router.push({ name: 'groomer-detail', query: { groomerId: userId } })
}

const formatDateTime = (date) => {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
const getGroomersFromDB = async () => {
  const now = new Date()

  const startDateTime =
    form.date && form.date[0]
      ? form.date[0].toISOString().slice(0, 10) + ' 00:00:00'
      : formatDateTime(now)

  const futureDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
  const endDateTime =
    form.date && form.date[1]
      ? form.date[1].toISOString().slice(0, 10) + ' 23:59:59'
      : formatDateTime(futureDate)

  const serviceType = form.serviceType ? form.serviceType : ''
  const address = form.address ? form.address : ''
  await axios
    .get(
      `/api/api/groomer/page?pageNum=1&pageSize=30&address=${address}&serviceType=${serviceType}&startDate=${startDateTime}&endDate=${endDateTime}`
    )
    .then((response) => {
      if (!response.data.records || response.data.records.length === 0) {
        ElMessage.warning('Sorry, No groomers found')
      } else {
        ElMessage.success('Groomers fetched successfully')
        groomers.value = response.data.records
        groomers.value.forEach((groomer) => {
          if (groomer.availableDates.length > 0) {
            groomer.startDate = formatDisplayDate(
              groomer.availableDates[0].availableDate.slice(0, 10)
            )
            groomer.endDate = formatDisplayDate(
              groomer.availableDates[groomer.availableDates.length - 1].availableDate.slice(0, 10)
            )
          }
        })
      }

      loading.value = false
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('Failed to fetch groomers')
    })
}
const getGroomers = async () => {
  await axios
    // .get('/api/api/groomer/page?pageNum=1&pageSize=50')
    .get(
      `/api/api/groomer/recommend?message=${message.value || 'groomer'}. please return json format data`
    )
    .then((response) => {
      if (!response.data.records || response.data.records.length === 0) {
        // ElMessage.warning('Sorry, No groomers found')
        getGroomersFromDB()
      } else {
        ElMessage.success('Groomers fetched successfully')
        groomers.value = response.data.records
        groomers.value.forEach((groomer) => {
          if (groomer.availableDates.length > 0) {
            groomer.startDate = formatDisplayDate(
              groomer.availableDates[0].availableDate.slice(0, 10)
            )
            groomer.endDate = formatDisplayDate(
              groomer.availableDates[groomer.availableDates.length - 1].availableDate.slice(0, 10)
            )
          }
        })
      }

      loading.value = false
    })
    .catch((err) => {
      console.log(err)
      // ElMessage.error('Failed to fetch groomers')
    })
}

const formatDisplayDate = (date) => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}`
}

onMounted(() => {
  // getGroomers()
  getGroomersFromDB()
})
</script>

<style scoped>
.groomer-list {
  display: flex;
  gap: 20px;

  .sidebar {
    width: 300px;
    border: 1px solid #ddd;
    padding: 20px;
    background-color: #f9f9f9;
  }

  .sidebar h3 {
    margin-top: 0;
  }

  .sidebar input[type='text'],
  .sidebar input[type='date'] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .date-inputs {
    display: flex;
    gap: 10px;
  }

  .results {
    flex: 1;
    padding: 20px;
  }

  .groomer-card {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .groomer-header {
    margin-bottom: 10px;
  }

  .availability-box {
    font-weight: bold;
    color: #555;
  }

  .groomer-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .groomer-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #ddd;
  }

  .star-groomer {
    background-color: #ffd700;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 5px;
  }

  .groomer-details {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .groomer-details span {
    flex: 1 1 auto;
    margin: 5px 0;
  }

  .serviceFee {
    font-weight: bold;
    color: green;
  }
}
</style>
