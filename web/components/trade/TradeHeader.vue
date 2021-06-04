<template>
  <div class="trade-header">
    <div class="trade-header__photo">
      <trade-message-photo :offerPhoto="offerPhoto" :postPhoto="postPhoto" />
    </div>
    <div class="trade-header__content">
      <div class="trade-header__title">
        <p><span>Jm Figueroa</span> want to swap</p>
      </div>
      <div class="trade-header__trade">
        <trade-tag-item :post="offerPost" type="offer" />

        <app-icon
          class="trade-header__icon"
          type="mdi"
          :path="icons.exchange"
        />

        <trade-tag-item :post="mainPost" type="post" />
      </div>
    </div>
    <div class="trade-header__action ml-auto">
      <button-primary
        size="sm"
        label="Accept the offer"
        :icon-left="icons.handshake"
      />
    </div>
  </div>
</template>

<script>
import { mdiSwapHorizontal, mdiHandshakeOutline } from "@mdi/js";
export default {
  props: {
    header: Object,
  },
  data() {
    return {
      icons: {
        handshake: mdiHandshakeOutline,
        exchange: mdiSwapHorizontal,
      },
    };
  },
  computed: {
    offerCreatorName() {
      return this.header.offerCreator.profile.firstname;
    },
    mainChatTitle() {
      return this.header.mainPost.title;
    },
    lastMessage() {
      const { user, text } = this.header.tradeMessages[0];
      return {
        sender: user.id === this.user.id ? "You" : user.profile.firstname,
        message: text,
      };
    },
    offerPhoto() {
      return this.header.offerPost.photos[0];
    },
    postPhoto() {
      return this.header.mainPost.photos[0];
    },
    offerPost() {
      return this.header.offerPost;
    },
    mainPost() {
      return this.header.mainPost;
    },
  },
};
</script>

<style></style>
