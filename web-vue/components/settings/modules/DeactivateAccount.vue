<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <h2 class="heading">Deactivate Account</h2>
        <p class="paragraph">Temporarily disable your account</p>
      </div>

      <div class="content__action">
        <button-primary
          v-if="!show"
          size="sm"
          label="Edit"
          @click.native="show = true"
        />
      </div>
    </div>

    <div v-if="show" class="content__main">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="row">
            <div class="col-8 mb-2">
              <p class="paragraph">
                Disabling this account will hide your account and posts to the
                other user.
                <br />
                <br />

                You can reactivate your account by signing in and click the
                "Activate" button.
              </p>
            </div>

            <div class="col-8 d-flex">
              <button-primary
                class="btn--flat"
                color="light-gray"
                label="Close"
                @click.native="show = false"
                name="login"
                size="md"
              />
              <button-primary
                class="ml-auto"
                :disabled="disabled"
                label="Deactivate"
                type="submit"
                name="login"
                size="md"
              />
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import userSettingsServices from "@/services/userSettings";
export default {
  middleware: ["activated"],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      show: false,
      disabled: false,
      alert: {
        show: false,
        message: "",
      },
    };
  },

  methods: {
    async onSubmit() {
      const self = this;
      this.$store.dispatch(types.actions.SHOW_AUTH_MODAL, {
        show: true,
        submitFunction: async function () {
          self.disabled = true;

          try {
            const response = await userSettingsServices.deactivate();

            self.$store.dispatch(types.actions.SHOW_DIALOG, {
              title: "Account Deactivated",
              message:
                "Your account succesfully disabled. You will redirected to login page...",
              showClose: false,
              timeout: 5000,
            });

            setTimeout(function () {
              self.$auth.logout();
            }, 5000);
            self.show = false;
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
      });
    },
  },
};
</script>

<style>
</style>