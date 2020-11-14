<template>
  <auth-layout :title="title">
    <profile />
    <profile-post />
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import profileMixin from "@/mixins/profile";
import { types } from "@/store/types";
export default {
  mixins: [profileMixin],
  data() {
    return {
      icons: {
        camera: mdiCamera,
      },
    };
  },
  //   middleware: "auth",
};
</script>

<style>
</style>
