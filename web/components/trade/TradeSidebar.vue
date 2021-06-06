<template>
  <div class="trade-sidebar">
    <h2>Messages</h2>

    <div v-if="recentChats.length" class="trade-sidebar__list">
      <div class="row">
        <div v-for="chat in recentChats" :key="chat.id" class="col-12">
          <recent-chat-card :chat="chat" />
        </div>
      </div>
    </div>

    <div class="mt-2" v-else>No Trade Offers Available</div>
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
