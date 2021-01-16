<template>
  <div class="post-content-description">
    <p class="overline">Description</p>
    <p class="text--main-light">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
  },
};
</script>

<style>
</style>