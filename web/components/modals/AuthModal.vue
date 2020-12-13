<template>
  <div v-if="modal.show" class="backdrop">
    <div class="dialog">
      <card :loading="loading" rounded>
        <card-header>
          <h2 class="mr-auto">Please Re-enter your password</h2>

          <button-icon :icon="icons.close" @click.native="close" />
        </card-header>
        <card-body>
          <div class="row">
            <div class="col-12">
              <app-alert :alert.sync="alert" />
            </div>
            <div class="col-12">
              <p class="paragraph--primary">
                For your security, you must re-enter your password to continue
              </p>
            </div>

            <div class="col-12 mt-2">
              <password-field
                v-model="password"
                label="Password"
                id="password"
                name="password"
              ></password-field>
            </div>
          </div>
        </card-body>
        <card-header class="mt-2">
          <button-primary
            label="Submit"
            class="ml-auto mr-1"
            variant="primary"
            size="md"
            @click.native="onSubmit"
          />
        </card-header>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiCamera, mdiClose } from "@mdi/js";
import parseBlobToData from "~/utils/parseBlobToData";
import { types } from "@/store/types";
import authServices from "@/services/auth";
export default {
  data() {
    return {
      loading: false,
      icons: {
        close: mdiClose,
      },
      password: "123456789",

      alert: {
        show: false,
        message: "Hello World!",
        type: "error",
      },
    };
  },
  computed: {
    modal() {
      return this.$store.state.frontend.modals.auth;
    },
  },

  methods: {
    async onSubmit() {
      const verify = await authServices.transactVerify({
        password: this.password,
      });

      if (verify) {
        this.alert = {
          show: false,
        };
        if (this.modal.submitFunction !== undefined) {
          await this.modal.submitFunction();
          this.close();
          this.password = "";
        }
      } else {
        this.alert = {
          show: true,
          message: "Please enter a valid password",
          type: "error",
        };
      }
    },
    close() {
      this.$store.dispatch(types.actions.SHOW_AUTH_MODAL, {
        show: false,
      });
    },
  },
};
</script>

<style lang="scss">
</style>