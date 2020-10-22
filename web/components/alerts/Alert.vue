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
      }),
    },
    type: {
      type: String,
      default: "info",
    },
    message: {
      type: String,
    },
  },

  computed: {
    setAlertClass() {
      return `alert ${this.type ? `alert--${this.type}` : ""} `;
    },
    iconType() {
      return this.icons[this.type];
    },
  },

  methods: {
    close() {
      this.alert.show = false;
    },
  },

  created() {
    console.log(this.alert);
  },
};
</script>

<style>
</style>