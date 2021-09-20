<template>
  <div class="message-offer">
    <div class="message-offer__photo">
      <img :src="image" :alt="title" />
    </div>
    <div class="message-offer__content">
      <h5>{{ title }}</h5>
      <span>{{ body }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    body: String,
    image: String,
  },
};
</script>

<style>
</style>