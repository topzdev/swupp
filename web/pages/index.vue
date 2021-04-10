<template>
  <div class="container">
    <template v-if="$auth.loggedIn">
      <h1 class="heading--primary">Hello User!</h1>
      <button class="btn" @click="$auth.logout()">Logout</button>
    </template>
    <template v-else>
      <h1 class="heading--primary">Welcome to Swupp!</h1>
      <nuxt-link class="mr-1" to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </template>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  data() {
    return {
      page: 2,
      limit: 10,
    };
  },
  async fetch() {
    // await this.$store.dispatch("posts/" + types.actions.FETCH_POSTS_COUNT);
    // await this.fetchPosts({ page: 1, limit: this.limit });
  },

  computed: {
    posts() {
      return this.$store.state.posts.homepage;
    },

    postCount() {
      return this.$store.state.posts.postCount;
    },

    pageCount() {
      return this.postCount !== 0 ? this.postCount / this.limit : 0;
    },
  },
  methods: {
    async fetchPosts({ page, limit }) {
      await this.$store.dispatch("posts/" + types.actions.FETCH_HOME_POSTS, {
        page: page,
        limit: limit,
      });
    },
    async infiniteHandler($state) {
      const self = this;

      setTimeout(async () => {
        if (self.posts.last) $state.complete();
        await self.fetchPosts({ page: self.page, limit: self.limit });
        self.page += 1;
        $state.loaded();
      }, 500);
    },
  },
};
</script>


