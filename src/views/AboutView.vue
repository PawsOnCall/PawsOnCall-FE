<template>
  <div class="about">
    <div class="hero">
      <h1>Welcome to PawsOnCall!</h1>
      <p>Your trusted in-home pet grooming service</p>
    </div>
    <div class="about-content">
      <section class="section-bg-light">
        <h2>Our Mission</h2>
        <p>
          At PawsOnCall, our mission is to bridge the gap in the pet care market by offering convenient, personalized, and stress-free grooming services right at your doorstep. We understand the unique needs of pets, especially those with social anxiety or travel-induced stress, and aim to enhance their well-being through our tailored services.
        </p>
      </section>
      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Specialized In-Home Services:</strong> Unlike traditional pet grooming services that require transportation to and from facilities, our in-home services ensure your pet receives care in a familiar environment, reducing stress and enhancing comfort.</li>
          <li><strong>Trusted Professionals:</strong> We rigorously vet and verify all our service providers to ensure they are highly skilled and trustworthy. Your pet’s safety and your peace of mind are our top priorities.</li>
          <li><strong>User-Friendly Platform:</strong> Our website features an intuitive interface, making it easy for you to schedule appointments, view service details, and manage your bookings with ease.</li>
          <li><strong>Advanced Matching Algorithm:</strong> Using state-of-the-art AI, we match you with the best groomers based on your specific needs and preferences, ensuring a perfect fit for your pet.</li>
          <li><strong>Flexible Scheduling:</strong> We offer flexible scheduling options to accommodate your busy lifestyle, allowing you to book services at your convenience.</li>
        </ul>
      </section>
      <section class="section-bg-light">
        <h2>Our Community</h2>
        <p>
          PawsOnCall is more than just a service provider; we are a community of pet lovers dedicated to enhancing the quality of life for pets and their owners. By choosing us, you join a supportive network that values the well-being of pets and fosters strong relationships within the pet care community.
        </p>
      </section>
      <section>
        <h2>Our Services</h2>
        <p>
          We offer a range of grooming services, including bathing, nail trimming, hair grooming, and more. Each service is tailored to meet the individual needs of your pet, ensuring they look and feel their best.
        </p>
      </section>
      <section class="section-bg-light">
        <h2>Join Us</h2>
        <p>
          Whether you are a pet owner looking for reliable grooming services or a pet care professional seeking flexible job opportunities, PawsOnCall welcomes you. Join us in creating a stress-free, convenient, and loving grooming experience for pets across Vancouver.
        </p>
      </section>
      <div class="images">
        <img src="@/assets/pet1.jpg" alt="Pet grooming 1" />
        <img src="@/assets/pet2.jpg" alt="Pet grooming 2" />
        <img src="@/assets/pet3.jpg" alt="Pet grooming 3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  font-family: Arial, sans-serif;
  color: #34495e;
  padding: 0 5%;
}

.hero {
  background: url('@/assets/hero-background.jpg') center center / cover no-repeat;
  color: #f5f5f5;
  text-align: center;
  padding: 100px 20px;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 1.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.about-content {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.section-bg-light {
  background-color: #f0f0f0; /* 浅灰色背景 */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.about-content section {
  margin-bottom: 20px;
}

.about-content h2 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 0.5em;
}

.about-content p, .about-content ul {
  font-size: 1.1em;
  line-height: 1.6;
  color: #34495e;
}

.about-content ul {
  list-style-type: disc;
  margin-left: 20px;
}

.images {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.images img {
  max-width: 30%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 10%;
  }

  .hero {
    padding: 100px 20px;
  }
}
</style>
