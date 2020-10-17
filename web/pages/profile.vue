<template>
  <div>Hello, User!</div>
</template>

<script>
export default {
  middleware: "auth",
  created() {
    console.log(this.$auth.user);
  },
};
</script>

<style>
</style>