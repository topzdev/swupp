<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <app-alert :alert.sync="alert" />
        <h2 class="heading">Change Email Address</h2>
        <p class="paragraph">
          <!-- Changing your email address will affec -->
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
            <div class="col-8">
              <input-field
                v-model="fields.email"
                :rules="rules.email"
                label="Email address"
                id="email"
                name="email"
              ></input-field>
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
                label="Change"
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
        email: "",
      },
      rules: {
        email: "required|email",
      },
    };
  },

  computed: {
    general() {
      return this.$store.state.userSettings.general;
    },
  },

  watch: {
    show() {
      let parse = JSON.parse(JSON.stringify(this.general.email));

      this.fields = {
        email: parse,
      };
    },
  },

  methods: {
    async onSubmit() {
      const self = this;
      this.$store.dispatch(types.actions.SHOW_AUTH_MODAL, {
        show: true,
        submitFunction: async function () {
          self.disabled = true;

          try {
            const response = await userSettingsServices.updateEmail({
              email: self.fields.email,
            });

            self.alert = {
              show: true,
              message: "Email Address Updated",
              type: "success",
              timeout: 3000,
            };

            self.$store.commit(
              "userSettings/" + types.mutations.SET_GENERAL_INFO,
              { ...self.general, email: self.fields.email }
            );
          } catch (error) {
            console.log(error.response.data.error.message);
            if (error.response && error.response.data)
              self.alert = {
                show: true,
                message: error.response.data.error.message,
                type: "error",
              };
          }

          self.show = false;
          self.disabled = false;
        },
      });
    },
  },
};
</script>

<style>
</style>