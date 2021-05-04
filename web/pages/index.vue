<template>
  <auth-layout title="Homepage">
    <search-jumbotron />

    <div class="container mt-3">
      <div class="row my-2">
        <div class="col-12">
          <h1 class="heading heading--primary">Recently Added</h1>
        </div>
      </div>
      <div class="row">
        <div v-for="item in posts.items" :key="item.id" class="col-20 mb-3">
          <card-post :post="item" />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <!--  <paginate
            :page-count="pageCount"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :click-handler="clickCallback"
            :container-class="'pagination'"
          >
          </paginate> -->
          <client-only>
            <infinite-loading spinner="spiral" @infinite="infiniteHandler">
              <div slot="spinner">
                <search-progress />
              </div>
              <div slot="no-more">All loaded</div>
              <div slot="no-results">All loaded</div>
            </infinite-loading>
          </client-only>
        </div>
      </div>
    </div>
  </auth-layout>
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
