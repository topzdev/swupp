<template>
  <div class="post-content">
    <app-navbar variant="post"></app-navbar>

    <div class="post-content__body">
      <post-content-header :post="post" />
      <post-content-count :count="post.count" />

      <post-content-description :description="post.body" />

      <!-- <post-content-location
        v-if="post.postLocation"
        :location="post.postLocation"
      /> -->

      <post-content-profile :profile="post.user" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    post() {
      return this.$store.state.preview.post;
    },
  },
};
</script>

<style></style>
