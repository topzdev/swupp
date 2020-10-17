<template>
  <div class="card--form">
    <!-- <alert type="info"> Product not available </alert> -->
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>
    {{ loading ? "loading..." : "" }}
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="card--form__body mb-3">
          <validation-observer v-if="currentStep === 1">
            <div class="row">
              <div class="col-12">
                <input-group
                  :rules="rules.username"
                  label="Username"
                  id="username"
                  vid="username"
                >
                  <input-field v-model="user.username"></input-field>
                </input-group>
              </div>
              <div class="col-12">
                <input-group
                  vid="password"
                  :rules="rules.password"
                  label="Password"
                  id="password"
                >
                  <input-field
                    type="password"
                    v-model="user.password"
                  ></input-field>
                </input-group>
              </div>

              <div class="col-12">
                <input-group
                  :rules="rules.confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                >
                  <input-field
                    type="password"
                    v-model="user.confirmPassword"
                  ></input-field>
                </input-group>
              </div>
            </div>
          </validation-observer>

          <validation-observer v-if="currentStep === 2">
            <div class="row align-items-start">
              <div class="col-6">
                <input-group
                  :rules="rules.firstname"
                  label="First Name"
                  id="firstname"
                >
                  <input-field v-model="user.firstname"></input-field>
                </input-group>
              </div>
              <div class="col-6">
                <input-group
                  :rules="rules.lastname"
                  label="Last Name"
                  id="lastname"
                >
                  <input-field v-model="user.lastname"></input-field>
                </input-group>
              </div>
              <div class="col-12">
                <input-group
                  :rules="rules.email"
                  label="Email Address"
                  id="email"
                >
                  <input-field v-model="user.email"></input-field>
                </input-group>
              </div>
              <div class="col-5">
                <input-group
                  :rules="rules.bdMonth"
                  id="bd-month"
                  label="Birth Date"
                  :show-err-mes="false"
                >
                  <select-field
                    v-model="bd.bdMonth"
                    placeholder="Select Month"
                    :options="options.months"
                  ></select-field>
                </input-group>
              </div>
              <div class="col-3">
                <input-group
                  :rules="rules.bdMonth"
                  :show-err-mes="false"
                  id="bd-day"
                >
                  <select-field
                    v-model="bd.bdDay"
                    placeholder="Select Day"
                    :options="options.days"
                  ></select-field>
                </input-group>
              </div>
              <div class="col-4">
                <input-group
                  :rules="rules.bdMonth"
                  id="bd-year"
                  :show-err-mes="false"
                >
                  <select-field
                    v-model="bd.bdYear"
                    placeholder="Select Year"
                    :options="options.year"
                  ></select-field>
                </input-group>
              </div>
            </div>
          </validation-observer>
        </div>

        <div class="card--form__action">
          <button-primary
            :label="buttonText"
            :loading="loading"
            type="submit"
          />
        </div>
      </form>
    </validation-observer>

    <p v-if="currentStep === 1" class="card--form__have-account">
      Have an account? <nuxt-link to="/login">Sign in</nuxt-link>
    </p>
    <p v-else-if="currentStep === 2" class="card--form__have-account">
      <button @click="gotoStep(1)">Back</button>
    </p>
  </div>
</template>

<script>
import { debounce } from "debounce";
import { ValidationObserver, extend, validate } from "vee-validate";
import isEmptyFields from "@/utils/isEmptyFields";
import dayjs from "dayjs";
import axios from "axios";

extend("username_exist", {
  validate: async function (value) {
    let exist = await axios.get(
      "http://localhost:5000/api/v1/user/is-exist/" + value
    );
    return !exist.data;
  },

  message: "Username already taken",
});

extend("email_exist", {
  validate: async function (value) {
    let exist = await axios.get(
      "http://localhost:5000/api/v1/user/is-exist/" + value
    );
    return !exist.data;
  },

  message: "Email Address already taken",
});

export default {
  components: {
    ValidationObserver,
  },
  data() {
    return {
      currentStep: 1,
      loading: false,
      rules: {
        username: "required|min:8|max:15|no_white_space|username_exist",
        password: `required|min:8|max:128|no_white_space|alpha_num_special|`,
        confirmPassword: `required|confirm_password:@password`,
        firstname: "required",
        lastname: "required",
        email: "required|email|email_exist",
        bdDay: "required",
        bdMonth: "required",
        bdYear: "required",
      },
      bd: {
        bdYear: "2020",
        bdDay: "1",
        bdMonth: "January",
      },
      user: {
        username: "topzdev" + Math.floor(Math.random() * 90) + 1,
        password: "123456hello@",
        confirmPassword: "123456hello@",
        firstname: "Christian",
        lastname: "Lugod",
        email: `christianlugod${Math.round(Math.random() * 90) + 1}@gmail.com`,
        mobileNumber: "2559069",
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

  watch: {
    // ["user.username"]: async function (newValue) {
    //   if (newValue.length >= 8) {
    //     console.log("Helo");
    //     await this.isExist(newValue, "username");
    //   }
    // },
  },

  methods: {
    async onSubmit() {
      if (this.currentStep === 2) {
        await this.register();
      } else {
        this.gotoStep(this.currentStep + 1);
      }
    },
    gotoStep(step) {
      this.currentStep = step;
    },

    async register() {
      this.loading = true;
      try {
        const { bdMonth, bdDay, bdYear } = this.bd;
        const res = await this.$axios.$post("/api/v1/auth/sign-up", {
          ...this.user,
          birthdate: dayjs(`${bdMonth}/${bdDay}/${bdYear}`).format(
            "YYYY-MM-DD"
          ),
        });

        console.log(res.data.token);

        this.$auth.setUserToken(res.data.token);
        this.$router.push("/profile");
        this.loading = false;
        alert("Success");
      } catch (error) {
        // console.error(error.response.data);
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>