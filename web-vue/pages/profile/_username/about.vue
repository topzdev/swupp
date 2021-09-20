<template>
  <auth-layout :title="title">
    <app-loading v-if="loading" />
    <div v-else>
      <app-errors v-if="!profile" error="no-user-found" />

      <template v-else>
        <profile v-if="profile" />
        <profile-about v-if="about" />
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

    console.log("Fetching profile");
    await this.fetchProfile(username);

    console.log("Fetching about profile");
    await this.fetchAbout(username);
    this.loading = false;
  },

  watch: {
    "$route.params": "$fetch"
  },

  data() {
    return {
      icons: {
        camera: mdiCamera
      }
    };
  }
};
</script>

<style></style>
