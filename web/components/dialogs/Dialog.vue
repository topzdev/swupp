<template>
  <div v-if="show" class="backdrop">
    <div class="dialog">
      <card rounded elevate>
        <card-header>
          <h2 class="mr-auto">{{ title }}</h2>
          <button-icon :icon="icons.close" @click.native="hide" />
        </card-header>
        <card-body>
          <div class="dialog__body">{{ message }}</div>
        </card-body>
        <card-header class="mt-2">
          <button-primary
            :label="noLabel"
            class="ml-auto mr-1"
            variant="primary"
            size="md"
            @click.native="noFunc"
            text
          />
          <button-primary
            size="md"
            :label="yesLabel"
            @click.native="yesFunc"
            variant="primary"
          />
        </card-header>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiClose } from "@mdi/js";
import { types } from "@/store/types";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      icons: {
        close: mdiClose,
      },
    };
  },
  computed: {
    show() {
      return this.dialog.show;
    },
    dialog() {
      return this.$store.state.frontend.dialog;
    },
    title() {
      return this.dialog.title || "Message Dialog";
    },
    message() {
      return this.dialog.message || "This is dialog message.";
    },
    yesLabel() {
      return this.dialog.yesLabel || "Confirm";
    },
    noLabel() {
      return this.dialog.noLabel || "Cancel";
    },
    okayLabel() {
      return this.dialog.okayLabel || "Okay";
    },
  },
  methods: {
    ...mapActions({
      hideDialog: types.actions.HIDE_DIALOG,
    }),
    async hide() {
      this.hideDialog();
    },
    async noFunc() {
      if (this.dialog.noFunction) await this.dialog.noFunction();
      this.hideDialog();
    },
    async yesFunc() {
      if (this.dialog.yesFunction) await this.dialog.yesFunction();
      this.hideDialog();
    },
  },
};
</script>

<style>
</style>