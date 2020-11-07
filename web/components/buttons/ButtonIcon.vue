<template>
  <component :is="!to ? 'button' : 'nuxt-link'" :to="to" class="btn btn--icon">
    <app-icon type="mdi" :path="icon" />
  </component>
</template>

<script>
export default {
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