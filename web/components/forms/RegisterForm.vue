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
          <input-group label="Username" id="username">
            <input-field v-model="user.username"></input-field>
          </input-group>
        </div>
        <div class="col-12">
          <input-group label="Password" id="password">
            <input-field v-model="user.password"></input-field>
          </input-group>
        </div>

        <div class="col-12">
          <input-group label="Confirm Password" id="confirmPassword">
            <input-field v-model="user.passwordConfirm"></input-field>
          </input-group>
        </div>
      </div>

      <div class="row align-items-end" v-else>
        <div class="col-6">
          <input-group label="First Name" id="firstname">
            <input-field v-model="user.firstname"></input-field>
          </input-group>
        </div>
        <div class="col-6">
          <input-group label="Last Name" id="lastname">
            <input-field v-model="user.lastname"></input-field>
          </input-group>
        </div>
        <div class="col-12">
          <input-group label="Email Address" id="email">
            <input-field v-model="user.email"></input-field>
          </input-group>
        </div>
        <div class="col-5">
          <input-group id="bd-month" label="Birth Date">
            <select-field
              v-model="bd.bdMonth"
              placeholder="Select Month"
              :options="options.months"
            ></select-field>
          </input-group>
        </div>
        <div class="col-3">
          <input-group id="bd-day">
            <select-field
              v-model="bd.bdDay"
              placeholder="Select Day"
              :options="options.days"
            ></select-field>
          </input-group>
        </div>
        <div class="col-4">
          <input-group id="bd-year">
            <select-field
              v-model="bd.bdYear"
              placeholder="Select Year"
              :options="options.year"
            ></select-field>
          </input-group>
        </div>
      </div>
    </div>

    <div class="card--form__action">
      <button-primary
        @click.native="onNext"
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
import isEmptyFields from "@/utils/isEmptyFields";
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
      options: {
        months: ["January", "February", "March"],
        days: [1, 2, 3, 4, 5, 6, 7],
        year: [2020, 2019, 2018, 2017, 2016],
      },
      agree: false,
    };
  },
  computed: {
    buttonText() {
      return !this.isNext ? "Next" : "Sign Me Up!";
    },
  },

  methods: {
    onNext() {
      const {
        username,
        password,
        passwordConfirm,
        firstname,
        lastname,
        emailAddress,
        mobileNumber,
        birthDate,
      } = this.user;

      if (isEmptyFields([username, password, passwordConfirm])) return;

      this.isNext = true;

      if (!isEmptyFields([firstname, lastname, emailAddress, mobileNumber])) {
        alert("Done!");
      }
    },
  },
};
</script>

<style>
</style>