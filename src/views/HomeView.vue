<template>
  <div class="home">
    <!-- welcome -->
    <section class="hero">
      <div class="hero-left"></div>
      <div class="hero-content">
        <h1>Welcome to PawsOnCall!</h1>
        <p>Your trusted in-home pet grooming service</p>
        <p></p>
        <button>Get Started</button>
      </div>
      <div class="hero-right"></div>
    </section>

    <!-- our service -->
    <section class="services">
      <h2>Our Services</h2>
      <div class="service-cards">
        <div class="service-card">
          <img src="@/assets/service1.jpg" alt="Service 1">
          <h3>Grooming</h3>
          <p>Professional grooming services to keep your pet looking great.</p>
        </div>
        <div class="service-card">
          <img src="@/assets/service2.jpg" alt="Service 2">
          <h3>Bathing</h3>
          <p>Expert bathing services to ensure your pet stays clean and healthy.</p>
        </div>
        <div class="service-card">
          <img src="@/assets/service3.jpg" alt="Service 3">
          <h3>Nail Trimming</h3>
          <p>Keep your pet's nails trimmed and healthy with our services.</p>
        </div>
      </div>
    </section>

    <!-- customer evaluation -->
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

    <!-- contact us -->
    <section class="contact">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  background-color: #f5f5f5; 
}

/* welcome */
.hero {
  display: flex;
  height: 300px;
  position: relative;
  text-align: center;
  align-items: center;
}

.hero-left, .hero-right {
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
  margin-top: 1cm
}

/* our service */
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

/* customer evaluation */
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

/* contact us */
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
