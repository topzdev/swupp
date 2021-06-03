<template>
  <div class="settings row">
    <div class="mb-2 col-12">
      <change-password />
    </div>
    <div class="mb-2 col-12">
      <deactivate-account />
    </div>
  </div>
</template>

<script>
import ChangePassword from "./modules/ChangePassword.vue";
export default {
  components: { ChangePassword },
};
</script>

<style>
</style>