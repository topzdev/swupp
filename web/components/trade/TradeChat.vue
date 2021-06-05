<template>
  <div class="trade-chat" ref="chatContainer" @scroll="handleScroll">
    <div class="trade-chat__row" v-for="message in messages" :key="message.id">
      <chat-message-card :message="message" />
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
import debounce from "debounce";
export default {
  computed: {
    messages() {
      return this.$store.getters[types.getters.GET_CURRENT_MESSAGE];
    },
  },

  methods: {
    scrollToTop() {
      const chatContainer = this.$refs.chatContainer;
      if (chatContainer) {
        chatContainer.scrollTop = 0;
      }
    },
    scrollToEnd() {
      const chatContainer = this.$refs.chatContainer;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        // console.log(this.$refs.chatContainer.scrollHeight);
      }
    },
    handleScroll: debounce(function (el) {
      if (el.target.scrollTop <= 10) {
        this.$store.dispatch(types.actions.FETCH_MORE_MESSAGES);
      }
    }, 500),
  },

  updated() {
    this.scrollToEnd();
  },
};
</script>

<style>
</style>