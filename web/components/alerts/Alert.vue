<template>
  <div :class="setAlertClass">
    <div class="alert__icon">
      <alert-icon />
    </div>

    <div class="alert__message">
      <slot></slot>
    </div>

    <button class="alert__exit"><app-icon type="mdi" path="" /></button>
  </div>
</template>

<script>
import { mdiInformation } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        info: mdiInformation,
        InfoIcon,
        CrossIcon,
      },
    };
  },
  props: {
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
  },
};
</script>

<style>
</style>