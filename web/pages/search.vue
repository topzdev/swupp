<template>
  <auth-layout>
    <div class="container mt-3">
      <div class="row">
        <div v-for="item in posts.items" :key="item.id" class="col-20 mb-3">
          <card-post :post="item" />
        </div>
      </div>

      <div v-if="pageCount" class="row">
        <div class="col-12">
          <paginate
            :page-count="pageCount"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :force-page="page"
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
      limit: 10,
    };
  },
  components: { Paginate },
  async fetch() {
    await this.fetchPosts();
  },
  watch: {
    "$route.query": "$fetch",
  },
  computed: {
    posts() {
      return this.$store.state.posts.search;
    },

    pageCount() {
      if (this.posts.count === null) return null;
      return this.postCount !== 0 ? this.posts.count / this.limit : 0;
    },
  },
  methods: {
    async clickCallback(page) {
      console.log(this.$route.query);
      this.page = page;
      this.$router.push({ ...this.$route.query, query: { page } });
    },

    async fetchPosts() {
      const self = this;
      console.log("Fetching post");
      const { search, condition, category, page } = self.$route.query;
      let body = {
        limit: self.limit,
      };
      if (search) body.search = search;
      if (condition) body.condition = condition;
      if (category) body.category = category;
      if (page) {
        self.page = parseInt(page);
        body.page = page;
      }

      console.log("FETCH POSTS", body);

      await self.$store.dispatch(
        "posts/" + types.actions.FETCH_SEARCH_POSTS,
        body
      );
      // await setTimeout(async () => {}, 250);
    },
  },
};
</script>


