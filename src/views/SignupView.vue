<template>
  <div class="signup">
    <h1>Sign Up to PawsOnCall</h1>
    <button class="button-google">Continue with Google</button>
    <div>-or-</div>
    <div class="form-email">
      <div class="form-item">
        <span>Email:</span>
        <input type="email" name="email" id="email" />
      </div>
      <div class="form-item">
        <span>Password:</span>
        <input type="password" name="password" id="password" />
      </div>
      <div class="form-item">
        <span>Confirm Password:</span>
        <input type="password" name="password" id="confirmPassword" />
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .signup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px 100px;
    .button-google {
      margin: 12px;
      padding: 12px 24px;
      background: #206ff2;
      border-color: #0e61eb;
      color: #fff;
      border-radius: 99999px;
    }
    h1 {
      font-size: 18px;
      margin-top: 20px;
      font-weight: bold;
    }
    .form-item {
      margin: 10px;
      span {
        display: inline-block;
        width: 150px;
      }
    }
  }
}
</style>
