<template>
  <div class="trade-content">
    <template v-if="chatHeader">
      <trade-header :header="chatHeader" />
      <trade-chat />
      <trade-chat-bottom />
    </template>
    <template v-if="!recentChats.length">
      <div
        class="error errors--no-post d-flex align-center"
        style="height: 100%"
      >
        <img
          src="@/assets/img/no-trade-message.jpg"
          alt="create your own post "
          draggable="false"
        />
        <h2 class="heading heading--primary text--primary">
          Seems you dont have trade offers
        </h2>
        <!-- <p></p> -->
      </div>
    </template>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  computed: {
    chatHeader() {
      return this.$store.state.trade.current.header;
    },
    recentChats() {
      return this.$store.state.trade.recentChats;
    },
  },

  methods: {},
};
</script>

<style></style>
