<template>
  <auth-layout :title="title">
    <div class="mt-2 message_container ">
      <div class="row">
        <div class="col-4">
          <message-sidebar />
        </div>

        <div class="col-8">
          <message-content />
        </div>
      </div>
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
      username: params.username
    });
  },

  data() {
    return {
      icons: {
        camera: mdiCamera
      }
    };
  },

  computed: {
    userNotFound() {
      return this.$store.state.profile.current.username === "";
    }
  }
  //   middleware: "auth",
};
</script>

<style></style>
