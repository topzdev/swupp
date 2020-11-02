<template>
  <button class="btn btn--icon">
    <app-icon type="mdi" :path="icon" />
  </button>
</template>

<script>
export default {
  props: {
    icon: String,
  },
};
</script>

<style>
</style>