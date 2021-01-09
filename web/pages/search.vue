<template>
  <auth-layout>
    <div class="container mt-3">
      <div class="row">
        <div v-for="item in posts" :key="item.id" class="col-20 mb-3">
          <card-post :post="item" />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <paginate
            :page-count="pageCount"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :click-handler="clickCallback"
            :container-class="'pagination'"
          >
          </paginate>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import { types } from "@/store/types";
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
export default {
  data() {
    return {
      page: 1,
      limit: 8,
    };
  },
  components: { Paginate },
  async fetch() {
    await this.$store.dispatch("posts/" + types.actions.FETCH_POSTS_COUNT);
    await this.fetchPosts({ page: 1, limit: this.limit });
  },
  watch: {
    "$route.query.page": "$fetch",
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
    async clickCallback(page) {
      this.$router.push({ query: { page } });
      this.page = page;
      await this.fetchPosts();
    },

    async fetchPosts() {
      await this.$store.dispatch("posts/" + types.actions.FETCH_HOME_POSTS, {
        page: this.page,
        limit: this.limit,
      });
    },
  },
};
</script>


