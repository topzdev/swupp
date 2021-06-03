<template>
  <auth-layout :show-navbar="false" :title="title">
    <app-loading v-if="loading" />
    <div v-else class="post-preview">
      <post-photos v-if="post"></post-photos>
      <post-content v-if="post"></post-content>
    </div>
  </auth-layout>
</template>

<script>
import { types } from "@/store/types";
export default {
  data() {
    return {
      loading: false,
    };
  },
  async fetch() {
    this.loading = true;
    await this.$store.dispatch("preview/" + types.actions.CLEAR_PREVIEW_POST);
    const id = this.$route.params.id;

    if (id) {
      await this.$store.dispatch(
        "preview/" + types.actions.FETCH_PREVIEW_POST,
        id
      );
    }
    this.loading = false;
  },

  watch: {
    $route: "$fetch",
  },
  computed: {
    post() {
      return this.$store.state.preview.post;
    },
    title() {
      return this.post ? this.post.title : "Preview";
    },
  },
};
</script>

<style></style>
