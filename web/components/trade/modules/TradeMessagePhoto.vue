<template>
  <div class="card--offers__photo">
    <div class="offer">
      <img :src="offerPhoto.securedUrl" alt="Offer Item Photo" />
    </div>
    <div class="post">
      <img :src="postPhoto.securedUrl" alt="Post to be offer photo" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    offerPhoto: Object,
    postPhoto: Object,
  },
};
</script>

<style>
</style>