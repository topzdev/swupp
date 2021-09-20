<template>
  <auth-layout :title="title">
    <div v-if="loading">
      <app-loading />
    </div>
    <div v-else>
      <app-errors v-if="!profile" error="no-user-found" />

      <template v-else>
        <profile v-if="profile" />
        <profile-post />
      </template>
    </div>
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import profileMixin from "@/mixins/profile";
export default {
  mixins: [profileMixin],

  async fetch() {
    const username = this.$route.params.username;
    if (!username) return;

    this.loading = true;
    await this.fetchProfile(username);
    this.loading = false;
  },

  watch: {
    "$route.params": "$fetch",
  },

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
