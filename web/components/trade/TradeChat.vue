<template>
  <div class="trade-chat">
    <div class="trade-chat__row" v-for="message in messages" :key="message.id">
      <chat-message-card :message="message" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      return this.$store.state.trade.current.messages;
    },
  },
};
</script>

<style>
</style>