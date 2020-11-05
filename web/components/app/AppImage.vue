<template>
  <div class="app-image">
    <img :src="src" :alt="alt" class="app-image__blur" />
    <img :src="src" :alt="alt" class="app-image__main" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      required: true,
      type: String,
    },
    alt: {
      type: String,
      default: "Image",
    },
  },
};
</script>

<style>
</style>