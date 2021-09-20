<template>
  <component
    :is="!to ? 'button' : 'nuxt-link'"
    :to="to"
    :class="[variantClass, sizeClass, fabClass, activeClass, 'btn btn--icon']"
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
        xl: "btn-icon--xl",
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
    fab: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    fabClass() {
      return this.fab ? "btn-icon--float" : "";
    },
    activeClass() {
      return this.active ? "menu-active" : "";
    },
  },
};
</script>

<style>
</style>