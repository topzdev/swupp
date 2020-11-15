<template>
  <div class="card" :class="[roundedClass, elevateClass]">
    <progress-linear v-if="loading" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    rounded: Boolean,
    elevate: Boolean,
    loading: Boolean,
  },

  computed: {
    elevateClass() {
      return this.elevate ? "card--elevate" : "";
    },
    roundedClass() {
      return this.rounded ? "card--rounded" : "";
    },
  },
};
</script>

<style>
</style>