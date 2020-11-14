<template>
  <auth-layout :title="title">
    <profile />
    <profile-about />
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import { types } from "@/store/types";
import profileMixin from "@/mixins/profile";
export default {
  mixins: [profileMixin],
  data() {
    return {
      icons: {
        camera: mdiCamera,
      },
    };
  },
};
</script>

<style>
</style>
