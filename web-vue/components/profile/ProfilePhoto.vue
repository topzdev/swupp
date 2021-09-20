<template>
  <div class="profile__photo-holder">
    <img :src="src" alt="Profile photo" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
    },
  },

  computed: {
    src() {
      return this.url ? this.url : require("@/assets/img/blank-profile.png");
    },
  },
};
</script>

<style>
</style>