<template>
  <!--  -->
  <div class="card--form">
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>
    <app-alert type="error" :alert.sync="alert" class="mb-2"></app-alert>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="card--form__body mb-2">
          <div class="row">
            <div class="col-12 mb-2">
              <input-field
                v-model="credential.usernameOrEmail"
                :rules="rules.usernameOrEmail"
                label="Username"
                id="username"
                name="email"
              ></input-field>
            </div>
            <div class="col-12 mb-1">
              <password-field
                :show-toggle="true"
                v-model="credential.password"
                :rules="rules.password"
                label="Password"
                id="password"
                name="password"
              ></password-field>
            </div>
            <!-- <div class="col-12">
              <checkbox-field
                v-model="credential.rememberMe"
                label="Remember me"
                id="rememberMe"
              ></checkbox-field>
            </div> -->
          </div>
        </div>

        <div class="card--form__action">
          <button-primary
            label="Login"
            type="submit"
            name="login"
            :is-full-width="true"
            size="lg"
          />
        </div>
      </form>
    </validation-observer>

    <p class="card--form__have-account">
      Don't have an account?
      <nuxt-link class="btn--links" to="/register">Sign Up</nuxt-link>
    </p>

    <div class="card--form__forgot">
      <!-- <nuxt-link class="btn--links" to="/forgot-password"
        >Forgot Password</nuxt-link
      > -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      rules: {
        usernameOrEmail: "required",
        password: "required",
      },
      credential: {
        usernameOrEmail: "", //topzdev123
        password: "", //123456789
        // rememberMe: false,
      },
      alert: {
        message: null,
        show: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await this.$auth.login({
          data: this.credential,
        });

        console.log(this.$auth.user);

        if (this.$auth.loggedIn) {
          // this.$router.push("/profile/" + this.$auth.user.username);
        }
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
          const data = error.response.data;
          this.alert = {
            message: data.error.message,
            show: true,
          };
        }
      } finally {
        this.credential = {
          usernameOrEmail: "",
          password: "",
        };
      }
    },
  },
};
</script>

<style>
</style>