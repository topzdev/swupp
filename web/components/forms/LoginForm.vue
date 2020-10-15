<template>
  <div class="card--form">
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>

    <div class="card--form__body mb-3">
      <div class="row">
        <div class="col-12">
          <input-group
            label="Username"
            id="username"
            v-model="usernameOrEmail"
          />
        </div>
        <div class="col-12">
          <input-group label="Password" id="password" v-model="password" />
        </div>
      </div>
    </div>

    <div class="card--form__action">
      <button-primary label="Login" type="button" />
    </div>

    <p class="card--form__have-account">
      Don't have an account? <nuxt-link to="/register">Sign Up</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return { usernameOrEmail: "", password: "" };
  },
};
</script>

<style>
</style>