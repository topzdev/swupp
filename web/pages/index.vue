<template>
  <specs />
</template>

<script>
import { types } from "@/store/types";
import specs from "~/components/placeholder/specs.vue";
export default {
  components: { specs },
  data() {
    return {
      page: 2,
      limit: 10,
    };
  },
  async fetch() {
    await this.$store.dispatch("posts/" + types.actions.FETCH_POSTS_COUNT);
    await this.fetchPosts({ page: 1, limit: this.limit });
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
