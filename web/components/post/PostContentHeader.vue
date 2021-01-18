<template>
  <div class="post-content-header">
    <post-content-action :liked="post.liked" :id="post.id" :user="post.user" />
    <h1 class="heading heading--primary">{{ post.title }}</h1>
    <p v-if="preffered" class="paragraph paragraph--primary">
      {{ preffered }}
    </p>
    <badge variant="success" class="d-inline-flex badge--large">{{
      condition
    }}</badge>

    <div class="post-content-offers">
      <p class="post-content-price">{{ price }}</p>
      <button-primary size="sm" label="Make a offer" :icon-left="icons.offer" />
    </div>
  </div>
</template>

<script>
import { CONDITIONS } from "@/constants";
import { mdiFacebookMessenger } from "@mdi/js";
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      icons: {
        offer: mdiFacebookMessenger,
      },
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
};
</script>

<style>
</style>