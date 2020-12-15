<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <app-alert :alert.sync="alert" />
        <h2 class="heading">Change Password</h2>
        <p class="paragraph">
          It's a good idea to use a strong password that you're not using
          elsewhere
        </p>
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
              <password-field
                v-model="fields.currentPassword"
                :rules="rules.currentPassword"
                label="Current Password"
                id="currentPassword"
                name="Current Password"
              ></password-field>
            </div>
            <div class="col-8 mb-2">
              <password-field
                v-model="fields.newPassword"
                :rules="rules.newPassword"
                label="New Password"
                id="newPassword"
                name="New Password"
              ></password-field>
            </div>
            <div class="col-8 mb-2">
              <password-field
                v-model="fields.confirmPassword"
                :rules="rules.confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                name="Confirm Password"
              ></password-field>
            </div>

            <div class="col-8 mt-2 d-flex">
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
                label="Update"
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
      fields: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        newPassword: `required|min:8|max:128|no_white_space|alpha_num_special|not_equal_password:@currentPassword`,
        confirmPassword: `required|confirm_password:@newPassword`,
        currentPassword: `required`,
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
            const response = await userSettingsServices.updatePassword(
              self.fields
            );

            self.alert = {
              show: true,
              message: "Password Updated",
              type: "success",
              timeout: 3000,
            };

            self.$store.dispatch(types.actions.SHOW_DIALOG, {
              title: "Security Message",
              message:
                "Since you changed your password do you want to sign out to verify your changes?",
              yesLabel: "Logout",
              yesFunction: async () => {
                self.$auth.logout();
              },
            });
            self.show = false;
          } catch (error) {
            console.log(error);
            if (error.response.data)
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