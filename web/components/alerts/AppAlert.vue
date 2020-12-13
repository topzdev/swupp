<template>
  <div :class="setAlertClass" v-if="alert.show">
    <div class="alert__icon">
      <app-icon type="mdi" :path="iconType" />
    </div>

    <div class="alert__message">
      <slot>{{ alert.message }}</slot>
    </div>

    <button @click="close" class="alert__exit">
      <app-icon type="mdi" :path="icons.close" />
    </button>
  </div>
</template>

<script>
import {
  mdiInformation,
  mdiAlert,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiClose,
} from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        info: mdiInformation,
        error: mdiAlertCircle,
        warning: mdiAlert,
        success: mdiCheckCircle,
        close: mdiClose,
      },
    };
  },
  props: {
    alert: {
      type: Object,
      default: () => ({
        message: null,
        show: false,
        type: "info",
      }),
    },
    type: {
      type: String,
    },
    message: {
      type: String,
    },
  },

  computed: {
    alertType() {
      return this.type || this.alert.type;
    },
    setAlertClass() {
      return `alert ${this.alertType ? `alert--${this.alertType}` : ""} `;
    },

    iconType() {
      return this.icons[this.alertType];
    },
  },

  methods: {
    close() {
      this.alert.show = false;
    },
  },
};
</script>

<style>
</style>