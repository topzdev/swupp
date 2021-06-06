<template>
  <div class="card--chat" :class="activeClass" @click="changeCurrentChat">
    <trade-chat-photo :offerPhoto="offerPhoto" :postPhoto="postPhoto" />
    <div class="card--chat__content">
      <p class="card--chat__title">
        <span class="name">{{ offerCreatorName }}</span>
        <span>-</span>
        <span class="title">{{ mainChatTitle }}</span>
      </p>
      <p class="card--chat__last-chat">
        <span class="sender" v-if="lastMessage"
          >{{ lastMessage.sender }}:
        </span>
        <span class="message" v-if="lastMessage"
          >{{ lastMessage.message }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import { types } from "@/store/types";
export default {
  mixins: [authMixin],
  props: {
    chat: Object,
  },

  computed: {
    current() {
      return this.$store.state.trade.current;
    },
    activeClass() {
      if (this.current.header) {
        return this.chat.id === this.current.header.id ? "active-chat" : "";
      }
      return "";
    },
    offerCreatorName() {
      return this.chat.offerCreator.profile.firstname;
    },
    mainChatTitle() {
      return this.chat.mainPost.title;
    },
    lastMessage() {
      const { user, text } = this.chat.tradeMessages[0];
      return {
        sender: user.id === this.user.id ? "You" : user.profile.firstname,
        message: text,
      };
    },
    offerPhoto() {
      return this.chat.offerPost.photos[0];
    },
    postPhoto() {
      return this.chat.mainPost.photos[0];
    },
  },

  methods: {
    async changeCurrentChat() {
      await this.$store.dispatch(
        types.actions.FETCH_CURRENT_CHAT,
        this.chat.id
      );
    },
  },
};
</script>

<style>
</style>