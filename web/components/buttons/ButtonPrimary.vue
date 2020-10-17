<template>
  <button v-bind="$attrs" :type="type" class="btn--primary">
    {{ loading ? "loading..." : label }}
  </button>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    label: String,
    type: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>