<template>
  <div>
    <div class="abstract-bg abstract-bg--2"></div>
    <div class="container">
      <div class="login">
        <confirmation-form />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
};
</script>

<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>