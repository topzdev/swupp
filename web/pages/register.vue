<template>
  <div>
    <div class="abstract-bg abstract-bg--1"></div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="register__intro">
            <h1>Sign Up to Swupp</h1>
            <p>Easy barter, Easy life</p>
          </div>
        </div>
        <div class="col-6">
          <div class="register__form">
            <register-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/RegisterForm";
export default {
  middleware: "auth",
  auth: "guest",
  components: { RegisterForm },
};
</script>

<style>
</style>