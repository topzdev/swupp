<template>
  <auth-layout>
    <div class="container">
      <div class="row">
        <div v-for="item in posts" :key="item.id" class="col-3 mb-3">
          <card-post :post="item" />
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import { types } from "@/store/types";
export default {
  async fetch() {
    await this.$store.dispatch("posts/" + types.actions.FETCH_HOME_POSTS);
  },
  computed: {
    posts() {
      return this.$store.state.posts.homepage.items;
    },
  },
};
</script>


