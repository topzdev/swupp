<template>
  <div class="trade-tag" :class="typeClass">
    <div class="trade-tag__image">
      <img :src="photo.securedUrl" alt="" />
    </div>

    <div class="trade-tag__title">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    type: String,
  },
  computed: {
    typeClass() {
      return this.type === "offer" ? "trade-tag--offer" : "trade-tag--main";
    },
    photo() {
      return this.post.photos[0];
    },
  },
};
</script>

<style>
</style>