<template>
  <div class="post-content-header">
    <div v-if="post.isTraded" class="post-traded">
      This post is already traded
    </div>

    <post-content-action
      v-if="!post.isTraded"
      :liked="post.liked"
      :id="post.id"
      :user="post.user"
    />
    <h1 class="heading heading--primary">{{ post.title }}</h1>
    <p v-if="preffered" class="paragraph paragraph--primary">
      {{ preffered }}
    </p>
    <badge variant="success" class="d-inline-flex badge--large">{{
      condition
    }}</badge>

    <div class="post-content-offers">
      <p class="post-content-price">{{ price }}</p>
      <button-primary
        v-if="$auth.loggedIn && post.user.id !== user.id"
        size="sm"
        label="Make a offer"
        :icon-left="icons.offer"
        @click.native="toggleOfferModal(true)"
      />
    </div>
    <make-offer-list-modal
      v-if="$auth.loggedIn && post.user.id !== user.id && showOfferModal"
      :postId="post.id"
      :toggle-modal="toggleOfferModal"
    />
  </div>
</template>

<script>
import { CONDITIONS } from "@/constants";
import { mdiFacebookMessenger } from "@mdi/js";
import { types } from "@/store/types";
import authMixin from "@/mixins/auth";
import tradeServices from "@/services/trades";
export default {
  mixins: [authMixin],
  props: {
    post: Object,
  },
  data() {
    return {
      icons: {
        offer: mdiFacebookMessenger,
      },
      showOfferModal: false,
    };
  },
  computed: {
    preffered() {
      if (!this.post.preffered) return;
      return `I preferred "${this.post.preffered}"`;
    },
    price() {
      if (!this.post.price) return;
      return `₱ ${this.post.price}`;
    },
    condition() {
      return CONDITIONS.filter((item) => item.id === this.post.conditionId)[0]
        .value;
    },
  },
  methods: {
    toggleOfferModal(show) {
      this.showOfferModal = show;
    },
  },
};
</script>

<style></style>
