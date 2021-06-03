<template>
  <div class="paper">
    <message-header />
    <message-general />
  </div>
</template>

<script>
export default {
  computed: {
    tabName() {
      const tab = this.$route.query.tab;
      return tab === undefined ? "" : tab;
    }
  }
};
</script>

<style></style>
