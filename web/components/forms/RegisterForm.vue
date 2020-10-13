<template>
  <div class="card--form">
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>

    <div class="card--form__body mb-3">
      <div class="row" v-if="!isNext">
        <div class="col-12">
          <input-group label="Username" id="username" v-model="user.username" />
        </div>
        <div class="col-12">
          <input-group label="Password" id="password" v-model="user.password" />
        </div>

        <div class="col-12">
          <input-group
            label="Confirm Password"
            id="confirmPassword"
            v-model="user.passwordConfirm"
          />
        </div>
      </div>

      <div class="row align-items-end" v-else>
        <div class="col-6">
          <input-group
            label="First Name"
            id="firstname"
            v-model="user.firstname"
          />
        </div>
        <div class="col-6">
          <input-group
            label="Last Name"
            id="lastname"
            v-model="user.lastname"
          />
        </div>
        <div class="col-12">
          <input-group label="Email Address" id="email" v-model="user.email" />
        </div>
        <div class="col-4">
          <input-group
            id="bd-month"
            label="Birth Date"
            placeholder="Select Month"
            v-model="bd.bdMonth"
          />
        </div>
        <div class="col-4">
          <input-group
            id="bd-day"
            placeholder="Select Day"
            v-model="bd.bdDay"
          />
        </div>
        <div class="col-4">
          <input-group
            id="bd-year"
            placeholder="Select Year"
            v-model="bd.bdYear"
          />
        </div>
      </div>
    </div>

    <div class="card--form__action">
      <button-primary
        @click.native="isNext = true"
        :label="buttonText"
        type="button"
      />
    </div>

    <p v-if="!isNext" class="card--form__have-account">
      Have an account? <nuxt-link to="/login">Sign in</nuxt-link>
    </p>
    <p v-else class="card--form__have-account">
      <button @click="isNext = false">Back</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNext: false,
      bd: {
        bdYear: "",
        bdDay: "",
        bdMonth: "",
      },
      user: {
        username: "",
        password: "",
        passwordConfirm: "",
        firstname: "",
        lastname: "",
        emailAddress: "",
        mobileNumber: "",
        birthDate: "",
      },
      agree: false,
    };
  },
  computed: {
    buttonText() {
      return !this.isNext ? "Next" : "Sign Me Up!";
    },
  },
};
</script>

<style>
</style>