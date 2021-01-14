<template>
  <div class="post-content-location">
    <h2 class="heading heading--primary mb-1">
      Around <span class="text--primary">{{ location.city }}</span>
    </h2>

    <div class="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
    },
  },
};
</script>

<style>
</style>