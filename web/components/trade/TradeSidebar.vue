<template>
  <div class="trade-sidebar">
    <h2>Messages</h2>

    <div class="trade-sidebar__list">
      <div class="row">
        <div v-for="chat in recentChats" :key="chat.id" class="col-12">
          <recent-chat-card :chat="chat" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [{}],
    };
  },
  computed: {
    recentChats() {
      return this.$store.state.trade.recentChats;
    },
  },
};
</script>

<style lang="scss"></style>
