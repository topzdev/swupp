<template>
  <div class="container mt-3 pb-5">
    <app-errors v-if="postCount === 0 && $auth.loggedIn" error="me-no-post" />
    <app-errors v-else-if="postCount === 0" error="user-no-post" />
    <template v-else>
      <div class="row">
        <div v-for="item in posts.items" :key="item.id" class="col-20 mb-2">
          <card-post :post="item" />
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
    </template>
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import { types } from "@/store/types";
import profileMixin from "@/mixins/profile";
export default {
  mixins: [profileMixin],
  data() {
    return {
      icons: {
        plus: mdiPlus,
      },
    };
  },

  computed: {
    postCount() {
      return parseInt(this.$store.state.profile.current.postCount);
    },
  },
  async fetch() {
    const username = this.$route.params.username;

    if (!username);
    await this.fetchPost(username);
  },

  watch: {
    $route: "$fetch",
  },
};
</script>

<style>
</style>