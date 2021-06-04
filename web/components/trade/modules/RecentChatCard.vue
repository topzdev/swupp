<template>
  <div class="card--offers">
    <trade-message-photo :offerPhoto="offerPhoto" :postPhoto="postPhoto" />
    <div class="card--offers__content">
      <p class="card--offers__title">
        <span class="name">{{ offerCreatorName }}</span>
        <span>-</span>
        <span class="title">{{ mainChatTitle }}</span>
      </p>
      <p class="card--offers__last-offers">
        <span class="sender">{{ lastMessage.sender }}: </span>
        <span class="message">{{ lastMessage.message }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  props: {
    chat: Object,
  },

  computed: {
    offerCreatorName() {
      return this.chat.offerCreator.profile.firstname;
    },
    mainChatTitle() {
      return this.chat.mainPost.title;
    },
    lastMessage() {
      const { user, text } = this.chat.tradeMessages[0];
      console.log(this.user.id, user.id);
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
};
</script>

<style>
</style>