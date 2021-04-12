<template>
  <div class="card--form">
    <div class="card--form__header">
      <div class="card--form__logo">
        <app-logo />
      </div>
    </div>
    <app-alert type="error" :alert.sync="alert" class="mb-2"></app-alert>

    <template v-if="confirmed">
      <div style="text-align: center" class="card--form__body mb-2">
        <div style="display: flex; align-items: center" class="row">
          <h2>Congratulation your account has been confirmed</h2>
          <p class="mt-1" style="width: 100%; text-align: center">
            Click the button below to login
          </p>
        </div>
      </div>

      <div class="card--form__action">
        <button-primary
          to="/login"
          label="Go to Login"
          type="button"
          name="login"
          :is-full-width="true"
          size="lg"
        />
      </div>
    </template>

    <template v-else-if="!confirmed"> <loading-icon></loading-icon> </template>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import authServices from "@/services/auth";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async fetch() {
    console.log("Fetching...");
    await this.confirmEmail();
  },
  data() {
    return {
      confirmed: false,
      error: false,
      alert: {
        message: null,
        show: false,
      },
    };
  },
  methods: {
    async confirmEmail() {
      const token = this.$route.params.token;
      const response = await authServices.confirmation(token);

      if (response.error) {
        this.error = true;
        this.alert = {
          message: response.error.message,
          show: true,
        };
        return console.log(response.error);
      }

      this.confirmed = response;
      console.log(token, this.confirmed);
    },
  },
};
</script>

<style>
</style>