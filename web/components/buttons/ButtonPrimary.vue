<template>
  <button class="btn--primary">
    {{ label }}
  </button>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    label: String,
  },
};
</script>

<style>
</style>