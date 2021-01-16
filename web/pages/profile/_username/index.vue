<template>
  <auth-layout :title="title">
    <div v-if="!$fetch.pending">
      <app-errors v-if="serNotFound" error="no-user-found" />
      <template v-else>
        <profile />
        <profile-post />
      </template>
    </div>
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import profileMixin from "@/mixins/profile";
import { types } from "@/store/types";
export default {
  mixins: [profileMixin],

  async fetch() {
    const params = this.$route.params;
    await this.$store.dispatch("profile/" + types.actions.FETCH_PROFILE, {
      username: params.username,
    });
  },

  data() {
    return {
      icons: {
        camera: mdiCamera,
      },
    };
  },

  computed: {
    userNotFound() {
      return this.$store.state.profile.current.username === "";
    },
  },
  //   middleware: "auth",
};
</script>

<style>
</style>
