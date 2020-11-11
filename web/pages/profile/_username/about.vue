<template>
  <auth-layout title="Christian Lugod">
    <profile />
    <profile-about />
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
export default {
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
