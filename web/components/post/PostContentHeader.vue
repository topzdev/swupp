<template>
  <div class="post-content-header">
    <post-content-action />
    <h1 class="heading heading--primary">{{ post.title }}</h1>
    <p v-if="preffered" class="paragraph paragraph--primary">
      {{ preffered }}
    </p>

    <div class="post-content-offers">
      <p class="post-content-price">{{ price }}</p>
      <button-primary size="sm" label="Make a offer" :icon-left="icons.offer" />
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style>
</style>