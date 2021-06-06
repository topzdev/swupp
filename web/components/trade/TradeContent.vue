<template>
  <div class="trade-content">
    <trade-header v-if="chatHeader" :header="chatHeader" />
    <trade-chat v-if="chatHeader" />
    <trade-chat-bottom v-if="chatHeader" />
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  computed: {
    chatHeader() {
      return this.$store.state.trade.current.header;
    },
  },

  methods: {},
};
</script>

<style></style>
