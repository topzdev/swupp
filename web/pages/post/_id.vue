<template>
  <div class="post-preview">
    <post-photos v-if="post"></post-photos>
    <post-content v-if="post"></post-content>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  async fetch() {
    await this.$store.dispatch("preview/" + types.actions.CLEAR_PREVIEW_POST);
    const id = this.$route.params.id;
    await this.$store.dispatch(
      "preview/" + types.actions.FETCH_PREVIEW_POST,
      id
    );
  },
  computed: {
    post() {
      return this.$store.state.preview.post;
    },
  },
};
</script>

<style>
</style>