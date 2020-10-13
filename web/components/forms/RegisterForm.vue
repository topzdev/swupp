<template>
  <form>
    <div class="card--form">
      <div class="card--form__header">
        <div class="card--form__logo">
          <img src="~/assets/img/logo.png" alt="swupp logo" />
        </div>
      </div>

      <div class="card--form__body">
        <input-group label="Username" id="username" v-model="username" />
        <input-group label="Password" id="password" v-model="password" />
        <input-group
          label="Confirm Password"
          id="confirmPassword"
          v-model="passwordConfirm"
        />
      </div>

      <div class="card--form__action">
        <button-primary label="Next" />
      </div>

      <p class="card--form__have-account">
        have an account? <a href="">Sign in</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
    };
  },
};
</script>

<style>
</style>