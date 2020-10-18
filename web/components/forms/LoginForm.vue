<template>
  <div class="card--form">
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="card--form__body mb-3">
          <div class="row">
            <div class="col-12 mb-2">
              <input-field
                v-model="credential.usernameOrEmail"
                :rules="rules.usernameOrEmail"
                label="Username"
                id="username"
              ></input-field>
            </div>
            <div class="col-12 mb-2">
              <input-field
                type="password"
                v-model="credential.password"
                :rules="rules.password"
                label="Password"
                id="password"
              ></input-field>
            </div>
            <div class="col-12">
              <checkbox-field
                v-model="credential.rememberMe"
                label="Remember me"
                id="rememberMe"
              ></checkbox-field>
            </div>
          </div>
        </div>

        <div class="card--form__action">
          <button-primary label="Login" type="submit" />
        </div>
      </form>
    </validation-observer>

    <p class="card--form__have-account">
      Don't have an account?
      <nuxt-link class="btn--links" to="/register">Sign Up</nuxt-link>
    </p>

    <div class="card--form__forgot">
      <nuxt-link class="btn--links" to="/forgot-password"
        >Forgot Password</nuxt-link
      >
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
        usernameOrEmail: "topzdev@31",
        password: "123456789",
        rememberMe: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: this.credential,
        });
        this.$router.push("/profile");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
</style>