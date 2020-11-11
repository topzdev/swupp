<template>
  <div class="container mt-3 pb-5">
    <div class="row">
      <div v-for="item in posts" :key="item.id" class="col-3">
        <card-post :post="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.profile.posts.items;
    },
  },
};
</script>

<style>
</style>