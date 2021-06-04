<template>
  <auth-layout :title="title">
    <div class="trade-container">
      <trade-sidebar />

      <trade-content />

      <trade-settings />
    </div>
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
export default {
  data() {
    return {
      title: "Trade Messages",
      icons: {
        camera: mdiCamera,
      },
    };
  },
};
</script>

<style></style>
