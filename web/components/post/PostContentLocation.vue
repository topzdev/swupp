<template>
  <div class="post-content-location">
    <h2 class="heading heading--primary mb-1">
      Around <span class="text--primary">Metro Manila</span>
    </h2>

    <div class="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      default: {
        lat: "",
        long: "",
      },
    },
  },
};
</script>

<style>
</style>