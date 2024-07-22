<template>
  <div class="service-page">
    <div class="grooming-container">
      <div class="grooming-section">
        <h2>Dog Grooming</h2>
        <img src="@/assets/dog-grooming.jpg" alt="Dog Grooming" />
        <div class="service-boxes">
          <div class="service-box green">
            <h3>Bath & Nail</h3>
            <p class="price">$50+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
            </ul>
            <p>This service usually takes about 2 hours.</p>
          </div>
          <div class="service-box light-green">
            <h3>Bath & Haircut</h3>
            <p class="price">$80+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
              <li>• Face, foot and pad trim</li>
            </ul>
            <p>This service usually takes about 2.5 hours.</p>
          </div>
          <div class="service-box light-blue">
            <h3>Full Grooming</h3>
            <p class="price">$100+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
              <li>• All over trim with scissor finishing</li>
            </ul>
            <p>This service usually takes about 3 hours.</p>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="grooming-section">
        <h2>Cat Grooming</h2>
        <img src="@/assets/cat-grooming.jpg" alt="Cat Grooming" />
        <div class="service-boxes">
          <div class="service-box green">
            <h3>Bath & Nail</h3>
            <p class="price">$50+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
            </ul>
            <p>This service usually takes about 2 hours.</p>
          </div>
          <div class="service-box light-green">
            <h3>Bath & Haircut</h3>
            <p class="price">$80+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
              <li>• Face, foot and pad trim</li>
            </ul>
            <p>This service usually takes about 2.5 hours.</p>
          </div>
          <div class="service-box light-blue">
            <h3>Full Grooming</h3>
            <p class="price">$100+</p>
            <p>Includes:</p>
            <ul>
              <li>• Bath</li>
              <li>• 15 min brushing</li>
              <li>• Ear cleaning</li>
              <li>• Nail trim</li>
              <li>• All over trim with scissor finishing</li>
            </ul>
            <p>This service usually takes about 3 hours.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceView',
}
</script>

<style scoped>
.service-page {
  font-family: Arial, sans-serif;
  color: #333;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.grooming-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.grooming-section {
  width: 48%;
  text-align: center;
}

.grooming-section img {
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
}

.service-boxes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.service-box {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  width: 30%;
  font-size: 14px;
  box-sizing: border-box;
  text-align: left;
}

.green {
  background-color: #d9e7d9;
}

.light-green {
  background-color: #e0f0e0;
}

.light-blue {
  background-color: #e0f0f5;
}

.service-box h3 {
  margin-top: 0;
  font-weight: bold;
  color: #333;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.service-box ul {
  list-style-type: none;
  padding-left: 0;
  text-align: left;
}

.service-box ul li {
  text-align: left;
  color: #333;
}

.service-box p {
  text-align: left;
  margin: 5px 0 0 0;
  color: #333;
}

.divider {
  width: 2%;
  border-left: 2px dotted #008000;
}
</style>
