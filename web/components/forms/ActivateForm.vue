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
          <div class="row align-center mb-3">
            <h1 class="heading heading--primary mb-1">Activate Account</h1>
            <p class="paragraph paragraph--primary">
              Welcome back! Your account is temporary disabled. If you want to
              activate your account click the "Activate" button below
            </p>
          </div>
        </div>

        <div class="card--form__action">
          <button-primary
            label="Activate"
            type="submit"
            name="login"
            :disabled="disabled"
            :is-full-width="true"
            size="lg"
          />
        </div>
      </form>
    </validation-observer>

    <p class="card--form__have-account">
      Don't want to activate?
      <button class="btn--links" to="/register" @click="logout()">
        Logout
      </button>
    </p>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import userSettingsServices from "@/services/userSettings";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      disabled: false,
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
    async logout() {
      await this.$auth.logout();
    },
    async onSubmit() {
      const self = this;
      try {
        const response = await userSettingsServices.activate();
        console.log(response);
        if (response.data.activated) {
          await this.$auth.fetchUser();
          if (this.$auth.loggedIn) {
            this.$router.push("/profile/" + this.$auth.user.username);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data)
          self.alert = {
            show: true,
            message: error.response.data.error.message,
            type: "error",
          };
      }
      self.disabled = false;
    },
  },
};
</script>

<style>
</style>