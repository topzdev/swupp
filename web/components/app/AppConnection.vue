<template>
  <span>
    <div class="app-connection color--accent" v-if="$nuxt.isOffline">
      You are not connected to your internet connection
    </div>
    <div class="app-connection color--success" v-if="online">
      You are now connected to your internet connection
    </div>
  </span>
</template>

<script>
export default {
  data() {
    return {
      online: false,
    };
  },

  watch: {
    "$nuxt.isOnline"(value) {
      const self = this;
      console.log(value);
      this.online = value;

      setTimeout(() => {
        self.online = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
</style>