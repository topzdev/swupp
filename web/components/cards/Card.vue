<template>
  <div class="card" :class="[roundedClass, elevateClass]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    rounded: Boolean,
    elevate: Boolean,
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