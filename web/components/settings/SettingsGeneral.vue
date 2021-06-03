<template>
  <div class="settings row">
    <div class="mb-2 col-12">
      <change-account-info />
    </div>
    <div class="mb-2 col-12">
      <change-username />
    </div>
    <div class="mb-2 col-12">
      <change-email />
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  fetchOnServer: false,

  async fetch() {
    console.log("Fetching General Info..");
    await this.$store.dispatch(
      "userSettings/" + types.actions.FETCH_GENERAL_INFO
    );
  },
};
</script>

<style>
</style>