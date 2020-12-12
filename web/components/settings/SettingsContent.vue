<template>
  <div class="paper">
    <settings-security v-if="tabName === 'security-and-login'" />
    <settings-general v-else />
  </div>
</template>

<script>
export default {
  computed: {
    tabName() {
      const tab = this.$route.query.tab;
      return tab === undefined ? "" : tab;
    },
  },
};
</script>

<style>
</style>