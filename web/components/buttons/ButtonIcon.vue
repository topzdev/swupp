<template>
  <component
    :is="!to ? 'button' : 'nuxt-link'"
    :to="to"
    class="btn btn--icon"
    :class="[variantClass, sizeClass]"
  >
    <app-icon type="mdi" :path="icon" />
  </component>
</template>

<script>
import buttonMixin from "@/mixins/button";
export default {
  mixins: [buttonMixin],
  data() {
    return {
      sizes: {
        sm: "btn-icon--small",
        md: "btn-icon--medium",
        lg: "btn-icon--large",
      },
    };
  },
  props: {
    variant: {
      type: String,
      default: "light",
    },
    icon: String,
    size: {
      default: "lg",
    },
    to: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>