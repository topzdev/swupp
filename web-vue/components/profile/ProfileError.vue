<template>
  <div class="container">
    <h1>User not found</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "User not found",
    },
  },
};
</script>

<style>
</style>