<template>
  <div class="card--form">
    <!-- <alert type="info"> Product not available </alert> -->
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="card--form__body mb-2">
          <validation-observer v-if="currentStep === 1">
            <div class="row">
              <div class="col-12 mb-2">
                <input-field
                  v-model="user.username"
                  :rules="rules.username"
                  label="Username"
                  id="username"
                />
              </div>
              <div class="col-12 mb-2">
                <password-field
                  type="password"
                  v-model="user.password"
                  :rules="passwordRules"
                  label="Password"
                  id="password"
                />
              </div>

              <div class="col-12 mb-2">
                <password-field
                  type="password"
                  v-model="user.confirmPassword"
                  :rules="rules.confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                />
              </div>
            </div>
          </validation-observer>

          <validation-observer v-if="currentStep === 2">
            <div class="row align-items-start">
              <div class="col-6 mb-2">
                <input-field
                  v-model="user.firstname"
                  :rules="rules.firstname"
                  label="First Name"
                  id="firstname"
                ></input-field>
              </div>
              <div class="col-6 mb-2">
                <input-field
                  v-model="user.lastname"
                  :rules="rules.lastname"
                  label="Last Name"
                  id="lastname"
                ></input-field>
              </div>
              <div class="col-12 mb-2">
                <input-field
                  v-model="user.email"
                  :rules="rules.email"
                  label="Email Address"
                  id="email"
                ></input-field>
              </div>
              <div class="col-5 mb-2">
                <select-field
                  v-model="bd.bdMonth"
                  placeholder="Select Month"
                  :options="options.months"
                  :rules="rules.bdMonth"
                  id="bd-month"
                  label="Birth Date"
                  :show-err-mes="false"
                ></select-field>
              </div>
              <div class="col-3 mb-2">
                <select-field
                  :rules="rules.bdMonth"
                  v-model="bd.bdDay"
                  id="bd-day"
                  placeholder="Select Day"
                  :options="options.days"
                  :show-err-mes="false"
                ></select-field>
              </div>
              <div class="col-4 mb-2">
                <select-field
                  v-model="bd.bdYear"
                  placeholder="Select Year"
                  :options="options.years"
                  :rules="rules.bdMonth"
                  id="bd-year"
                  :show-err-mes="false"
                ></select-field>
              </div>
            </div>
          </validation-observer>
        </div>

        <div v-if="currentStep === 2" class="row">
          <validation-observer>
            <div class="col-12 mb-2">
              <checkbox-field
                type="checkbox"
                id="agree"
                v-model="agree"
                name="agreement"
              >
                I agree to the
                <a target="_blank" href="/terms-and-agreement">Terms</a> and
                <a target="_blank" href="/privacy-policy">Privacy Policy</a>
              </checkbox-field>
            </div>
          </validation-observer>
        </div>

        <div class="card--form__action">
          <button-primary
            :label="buttonText"
            :loading="loading"
            :is-full-width="true"
            size="lg"
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
import dayjs from "dayjs";
import { debounce } from "debounce";
import isEmptyFields from "@/utils/isEmptyFields";
import { ValidationObserver, extend, validate } from "vee-validate";
import { CURRENT_DATE, DAYS, MONTHS, YEARS } from "@/constants";

const usernameOrEmailExist = async (value) => {
  return (
    await fetch("http://localhost:5000/api/v1/user/is-exist/" + value)
  ).json();
};

extend("username_exist", {
  validate: async function (value) {
    return !(await usernameOrEmailExist(value));
  },
  message: "Username already taken",
});

extend("email_exist", {
  validate: async function (value) {
    return !(await usernameOrEmailExist(value));
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
        password: `required|min:8|max:128|no_white_space|alpha_num_special`,
        confirmPassword: `required|confirm_password:@password`,
        firstname: "required",
        lastname: "required",
        email: "required|email|email_exist",
        bdDay: "required",
        bdMonth: "required",
        bdYear: "required",
        agree: "required",
      },
      bd: {
        bdYear: CURRENT_DATE.year,
        bdDay: CURRENT_DATE.day,
        bdMonth: CURRENT_DATE.month,
      },
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        email: "",
        mobileNumber: "",
      },
      options: {
        months: MONTHS,
        days: DAYS,
        years: YEARS,
      },
      agree: false,
    };
  },
  computed: {
    buttonText() {
      return this.currentStep === 1 ? "Next" : "Sign Up";
    },
    passwordRules() {
      const rules = this.rules.password;
      if (this.user.username) return rules + "|includes:@username";
      return rules;
    },
  },

  methods: {
    async onSubmit() {
      if (this.currentStep === 2) {
        if (this.agree) {
          await this.register();
        } else {
          this.$refs.form.setErrors({
            agree: "error",
          });
        }
      } else {
        this.gotoStep(this.currentStep + 1);
      }
    },
    gotoStep(step) {
      if (step === 3) return;
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

        this.$auth.setUserToken(res.data.token);
        this.$router.push("/profile");
        this.loading = false;
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