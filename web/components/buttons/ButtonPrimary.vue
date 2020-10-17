<template>
  <button v-bind="$attrs" :type="type" class="btn--primary">
    {{ label }}
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
      default: true,
    },
  },
};
</script>

<style>
</style>