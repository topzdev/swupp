<template>
  <div class="container">
    <h1>Hello, {{ $auth.user.username }}</h1>

    <button-primary
      class=""
      label="Logout"
      @click.native="$auth.logout()"
    ></button-primary>
  </div>
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