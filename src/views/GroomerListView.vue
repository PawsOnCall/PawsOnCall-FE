<template>
  <div class="container">
    <div class="sidebar">
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 400px"
        :label-position="'top'"
        :size="'large'"
      >
        <el-form-item label="Service Type:">
          <el-select v-model="form.serviceType">
            <el-option label="Full grooming" value="Full grooming" />
            <el-option label="Bath & Haircut" value="Bath & Haircut" />
            <el-option label="Bath & Nail" value="Bath & Nail" />
          </el-select>
        </el-form-item>
        <el-form-item label="Address:">
          <el-input type="text" v-model="form.address" />
        </el-form-item>
        <el-form-item label="Dates:">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            size="large"
          />
        </el-form-item>
        <!-- <el-form-item label="Your Pet:">
          <el-checkbox-group v-model="form.pet">
            <el-checkbox value="Jack" name="type">Jack </el-checkbox>
            <el-checkbox value="Rose" name="type">Rose</el-checkbox>
            <el-checkbox value="Lily" name="type">Lily</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item> <el-button type="primary" @click="onFilter">Filter</el-button></el-form-item>
      </el-form>
    </div>

    <div class="results">
      <div
        v-for="groomer in groomers"
        :key="groomer.userId"
        class="groomer-card"
        @click="viewDetail(groomer.userId)"
      >
        <div class="groomer-header">
          <span class="availability">Confirmed availability: {{ startDate }} – {{ endDate }}</span>
        </div>
        <div class="groomer-info">
          <img :src="groomer.photo" alt="groomer image" class="groomer-image" />
          <div>
            <h4>{{ groomer.firstName + ' ' + groomer.lastName }}</h4>
            <span v-if="groomer.stargroomer" class="star-groomer">Star groomer</span>
            <p>{{ groomer.headline }}</p>
            <p>
              {{ groomer.areaLevel2 + ', ' + groomer.areaLevel1 }}
            </p>
          </div>
        </div>
        <div class="groomer-details">
          <span>{{ groomer.reviews }} reviews</span>
          <span>{{ groomer.groomedCount }} repeat clients</span>
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
  city: '',
  postcode: ''
})
const serviceType = ref('Full grooming')
const address = ref('1529 West Pender Street, Vancouver, BC')
const startDate = ref('2024-06-13')
const endDate = ref('2024-06-15')
const selectedPets = ref(['HuiminLi'])

const groomers = ref([
  {
    id: 1,
    name: 'Christopher & Khanh D.',
    stargroomer: true,
    description: 'At home 24/7 loving your pets!',
    location: 'Vancouver, BC, V6B',
    reviews: 80,
    groomedCount: 16,
    serviceFee: '$50',
    photo: 'https://via.placeholder.com/150' // Placeholder image
  },
  {
    id: 2,
    name: 'Sue P.',
    stargroomer: true,
    description: 'Will love your dog like my own.',
    location: 'Vancouver, BC, V6S',
    reviews: 18,
    groomedCount: 5,
    serviceFee: '$118',
    photo: 'https://via.placeholder.com/150' // Placeholder image
  },
  {
    id: 3,
    name: 'Charly K.',
    stargroomer: false,
    description: 'Animal Welfare Professional',
    location: 'Vancouver, BC, V5T',
    reviews: 24,
    groomedCount: 8,
    serviceFee: '$75',
    photo: 'https://via.placeholder.com/150' // Placeholder image
  }
])
const onFilter = () => {
  console.log('Filtering...')
}

const viewDetail = (userId) => {
  router.push({ name: 'groomer-detail', query: { groomerId: userId } })
}
// TODO: GET groomers from API
const getGroomers = async () => {
  await axios
    .get('/api/api/groomer/page?pageNum=1&pageSize=50')
    .then((response) => {
      console.log(response.data)
      console.log(response.data.records)
      groomers.value = response.data.records
    })
    .catch((err) => {
      ElMessage.error('Failed to fetch groomers')
    })
}

onMounted(() => {
  getGroomers()
})
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

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

.availability {
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
</style>
