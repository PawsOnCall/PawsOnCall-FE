<template>
  <div class="home">
    <!-- 欢迎部分 -->
    <section class="hero">
      <div class="hero-left"></div>
      <div class="hero-content">
        <h1>Welcome to PawsOnCall!</h1>
        <p>Your trusted in-home pet grooming service</p>
        <div
          style="
            border: 1px solid #000;
            font-size: 14px;
            margin: 16px auto;
            padding: 16px;
            background: #000;
            color: #fff;
            border-radius: 24px;
          "
        >
          <h3 style="margin-bottom: 12px">Ask PawsOnCall</h3>
          <p style="font-size: 14px; color: #fff">
            Sample：I need a groomer to come to my home to groom my dog or cat. I prefer the
            appointment to be on Saturday afternoon 5pm. I need an experienced and well-reviewed
            groomer, and the price should be around $100.
          </p>
        </div>
        <div>
          <el-input
            type="textarea"
            rows="4"
            size="large"
            v-model="message"
            placeholder="enter what service you need here"
          ></el-input>
          <el-button @click="SearchGroomers">search</el-button>
        </div>
      </div>
      <div class="hero-right"></div>
    </section>

    <!-- 我们的服务 -->
    <section class="services">
      <h2>Our Services</h2>
      <div class="service-cards">
        <div class="service-card">
          <img src="@/assets/service1.jpg" alt="Service 1" />
          <h3>Grooming</h3>
          <p>Professional grooming services to keep your pet looking great.</p>
        </div>
        <div class="service-card">
          <img src="@/assets/service2.jpg" alt="Service 2" />
          <h3>Bathing</h3>
          <p>Expert bathing services to ensure your pet stays clean and healthy.</p>
        </div>
        <div class="service-card">
          <img src="@/assets/service3.jpg" alt="Service 3" />
          <h3>Nail Trimming</h3>
          <p>Keep your pet's nails trimmed and healthy with our services.</p>
        </div>
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="testimonials">
      <h2>What Our Clients Say</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <p>"PawsOnCall is amazing! They took great care of my dog right at home."</p>
          <span>- John Doe</span>
        </div>
        <div class="testimonial-card">
          <p>"The groomers are professional and friendly. Highly recommend PawsOnCall!"</p>
          <span>- Jane Smith</span>
        </div>
        <div class="testimonial-card">
          <p>"Convenient and stress-free grooming service. My cat loves it!"</p>
          <span>- Emily Johnson</span>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact">
      <h2>Contact Us</h2>
      <el-form>
        <el-form-item v-model="form">
          <el-input
            type="text"
            placeholder="Your Name"
            v-model="form.name"
            size="large"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="email"
            placeholder="Your Email"
            v-model="form.email"
            size="large"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            rows="4"
            placeholder="Your Message"
            v-model="form.message"
            size="large"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SendMessage" size="large">Send Message</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ElForm, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const message = ref('')
const form = reactive({
  name: '',
  email: '',
  message: ''
})
const SearchGroomers = () => {
  console.log('SearchGroomers')
  if (message.value === '') {
    ElMessage.error('Please enter a message')
    return
  }
  localStorage.setItem('searchMessage', message.value)
  setTimeout(() => {
    router.push({ name: 'groomer-list' })
  }, 1000)
}

const SendMessage = () => {
  console.log('SendMessage')
  if (form.name === '' || form.email === '' || form.message === '') {
    ElMessage.error('Please fill in all fields')
    return
  }
  ElMessage.success('Message sent successfully!')
}
</script>

<style scoped>
.home {
  background-color: #f5f5f5;
}

.hero {
  display: flex;
  /* height: 300px; */
  position: relative;
  text-align: center;
  align-items: center;
}

.hero-left,
.hero-right {
  flex: 1;
  background: url('@/assets/hero-background.jpg') center center / cover no-repeat;
}

.hero-content {
  flex: 2;
  background-color: #f5f5f5;
  padding: 50px 20px;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
  color: #2c3e50;
}

.hero p {
  font-size: 1.5em;
  color: #2c3e50;
}

.hero button {
  background-color: #e67e22;
  color: #fff;
  border: none;
  padding: 1em 2em;
  font-size: 1em;
  cursor: pointer;
  margin-top: 1cm;
}

.services {
  text-align: center;
  padding: 50px 20px;
}

.service-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.service-card {
  background-color: #eafaf1;
  border: 2px solid #eafaf1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 30%;
}

.service-card img {
  max-width: 100%;
  border-radius: 10px;
}

.service-card h3 {
  margin-top: 1em;
  color: #2c3e50;
}

.service-card p {
  color: #7f8c8d;
}

.testimonials {
  background-color: #f5f5f5;
  text-align: center;
  padding: 50px 20px;
}

.testimonial-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.testimonial-card {
  background-color: #eafaf1;
  border: 2px solid #eafaf1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 30%;
}

.testimonial-card p {
  color: #34495e;
  font-style: italic;
}

.testimonial-card span {
  display: block;
  margin-top: 1em;
  color: #7f8c8d;
}

.contact {
  text-align: center;
  padding: 50px 20px;
}

.contact form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact input,
.contact textarea {
  margin-bottom: 1em;
  padding: 1em;
  width: 80%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact button {
  background-color: #e67e22;
  color: #fff;
  border: none;
  padding: 1em 2em;
  font-size: 1em;
  cursor: pointer;
}
</style>
