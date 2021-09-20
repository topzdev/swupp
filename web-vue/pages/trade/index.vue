<template>
  <auth-layout :title="title">
    <div class="trade-container">
      <trade-sidebar />

      <trade-content />

      <trade-settings />
    </div>
  </auth-layout>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import { types } from "@/store/types";

export default {
  middleware: "auth",
  data() {
    return {
      title: "Trade Messages",
      icons: {
        camera: mdiCamera,
      },
    };
  },

  methods: {
    async fetchRecentChats() {
      console.log("Fetching Chat");
      await this.$store.dispatch(types.actions.FETCH_RECENT_CHATS);
    },

    async fetchCurrentChat() {
      const route = this.$route;
      console.log(route.query.id);
      console.log(this.recentChats);
      if (this.recentChats.length) {
        await this.$store.dispatch(
          types.actions.FETCH_CURRENT_CHAT,
          route.query.id ? parseInt(route.query.id) : this.recentChats[0].id
        );
      }
    },
  },

  computed: {
    recentChats() {
      return this.$store.getters[types.getters.GET_RECENT_CHATS];
    },
  },

  watch: {
    $route: "$fetch",
    // currentTradeId: function () {
    //   this.pusherSubscription();
    // },
  },

  async fetch() {
    await this.fetchRecentChats();
    await this.fetchCurrentChat();
  },
};
</script>

<style></style>
