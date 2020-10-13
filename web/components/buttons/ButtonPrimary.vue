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
  },
};
</script>

<style>
</style>