<template>
  <div :class="setAlertClass">
    <div class="alert__icon">
      <alert-icon />
    </div>

    <div class="alert__message">
      <slot></slot>
    </div>

    <button class="alert__exit"><cross-icon /></button>
  </div>
</template>

<script>
import AlertIcon from "@/assets/icons/alert-circle-outline.svg";
import InfoIcon from "@/assets/icons/information-outline.svg";
import CrossIcon from "@/assets/icons/close.svg";

export default {
  components: {
    AlertIcon,
    InfoIcon,
    CrossIcon,
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