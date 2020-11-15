<template>
  <nuxt-link to="/">
    <img v-bind="$attrs" :src="srcBySize" alt="swupp logo" :draggable="false" />
  </nuxt-link>
</template>
<script>
const sizes = {
  sm: require("@/assets/img/logo_x80.webp"),
  lg: require("@/assets/img/logo_x500.webp"),
};

export default {
  inheritAttrs: false,
  props: {
    size: {
      default: "sm",
    },
  },

  computed: {
    srcBySize() {
      return sizes[this.size];
    },
  },
};
</script>

<style>
</style>