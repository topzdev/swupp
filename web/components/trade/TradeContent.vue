<template>
  <div class="trade-content">
    <trade-header :header="chatHeader" />
    <trade-chat />
    <trade-chat-bottom />
  </div>
</template>

<script>
export default {
  computed: {
    chatHeader() {
      return this.$store.state.trade.current.header;
    },
  },
};
</script>

<style></style>
