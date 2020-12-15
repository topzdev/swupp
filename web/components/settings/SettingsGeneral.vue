<template>
  <div class="settings row">
    <div class="col-12 mb-2">
      <change-account-info />
    </div>
    <div class="col-12 mb-2">
      <change-username />
    </div>
    <div class="col-12 mb-2">
      <change-email />
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  async created() {
    await this.$store.dispatch(
      "userSettings/" + types.actions.FETCH_GENERAL_INFO
    );
  },
};
</script>

<style>
</style>