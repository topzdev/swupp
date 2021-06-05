<template>
  <div class="trade-header">
    <div class="trade-header__photo">
      <trade-chat-photo :offerPhoto="offerPhoto" :postPhoto="postPhoto" />
    </div>
    <div class="trade-header__content">
      <div class="trade-header__title">
        <p>
          <span>{{ mainChatTitle }}</span> want to swap
        </p>
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
    <div v-if="!isTraded" class="trade-header__action ml-auto">
      <button-primary
        size="sm"
        label="Accept the offer"
        :icon-left="icons.handshake"
      />
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import { types } from "@/store/types";
import { mdiSwapHorizontal, mdiHandshakeOutline } from "@mdi/js";
export default {
  mixins: [authMixin],
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
    isTraded() {
      return this.$store.getters[types.getters.IS_TRADED];
    },
    offerCreatorFullName() {
      const { firstname, lastname } = this.header.offerCreator.profile;
      return `${firstname} ${lastname}`;
    },
    mainChatTitle() {
      return this.user.id === this.header.offerCreator.id
        ? "You"
        : this.offerCreatorFullName;
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
