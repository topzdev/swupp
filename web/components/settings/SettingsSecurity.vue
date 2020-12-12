<template>
  <div class="settings row">
    <div class="col-12 mb-2">
      <change-password />
    </div>
    <div class="col-12 mb-2">
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