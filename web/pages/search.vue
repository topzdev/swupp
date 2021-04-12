<template>
  <auth-layout>
    <app-loading v-if="loading" />
    <div v-else class="container mt-3">
      <div class="row mb-2">
        <div class="col-6" v-if="searched">
          <h1 class="heading heading--primary">
            Searched <span class="text--primary">"{{ searched }}"</span>
          </h1>
        </div>

        <div class="col-auto ml-auto">
          <search-select
            :options="options.limit"
            v-model="limit"
            label="Page limit"
          />
        </div>
      </div>
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

      <!-- <button-icon
        v-if="loggedIn"
        to="/new"
        size="xl"
        variant="primary"
        fab
        :icon="icons.plus"
      /> -->
    </div>
  </auth-layout>
</template>

<script>
import { types } from "@/store/types";
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import { LIMIT } from "~/constants";
import { mdiPlus } from "@mdi/js";
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  data() {
    return {
      page: 1,
      limit: 10,
      loading: false,
      icons: {
        plus: mdiPlus,
      },
      options: {
        limit: LIMIT,
      },
    };
  },
  components: { Paginate },
  async fetch() {
    await this.fetchPosts();
  },
  watch: {
    "$route.query": "$fetch",
    limit: async function (newValue) {
      await this.fetchPosts();
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts.search;
    },

    pageCount() {
      if (this.posts.count === null) return null;
      return this.postCount !== 0 ? this.posts.count / this.limit : 0;
    },

    searched() {
      return this.$route.query.search;
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

      this.loading = true;

      await self.$store.dispatch(
        "posts/" + types.actions.FETCH_SEARCH_POSTS,
        body
      );

      this.loading = false;
      // await setTimeout(async () => {}, 250);
    },
  },
};
</script>


