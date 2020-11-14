<template>
  <div class="container mt-3 pb-5">
    <div class="row">
      <div v-for="item in posts" :key="item.id" class="col-3">
        <card-post :post="item" />
      </div>
    </div>

    <button-icon to="/new" size="xl" variant="primary" fab :icon="icons.plus" />
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import { types } from "@/store/types";
export default {
  data() {
    return {
      icons: {
        plus: mdiPlus,
      },
    };
  },
  computed: {
    posts() {
      return this.$store.state.profile.posts.items;
    },
  },
  async fetch() {
    const params = this.$route.params;
    await this.$store.dispatch("profile/" + types.actions.FETCH_PROFILE_POSTS, {
      username: params.username,
    });
  },
};
</script>

<style>
</style>