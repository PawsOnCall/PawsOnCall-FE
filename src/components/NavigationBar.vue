<template>
  <header id="header">
    <img alt="PawsOnCall logo" class="logo" src="@/assets/logo.jpg" width="90" height="90" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About Us</RouterLink>
        <RouterLink to="/service-and-price">Service and Price</RouterLink>
        <RouterLink to="/become-a-groomer">Become a Groomer</RouterLink>
      </nav>
    </div>
    <div class="sign-wrapper">
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/signin">Sign In</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav {
  background-color: #fff;
  color: white;
  padding: 2rem;
  a {
    margin: 1rem;
  }
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

a {
  /* color: white; */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.sign-wrapper {
  display: flex;
}
</style>
