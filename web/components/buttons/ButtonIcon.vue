<template>
  <component :is="!to ? 'button' : 'nuxt-link'" :to="to" class="btn btn--icon">
    <app-icon type="mdi" :path="icon" />
  </component>
</template>

<script>
import buttonMixin from "@/mixins/button";
export default {
  mixins: [buttonMixin],
  props: {
    icon: String,
    to: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>