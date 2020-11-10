<template>
  <span class="badge" :class="[variantClass]">
    <slot></slot>
  </span>
</template>

<script>
import badgeMixin from "@/mixins/badge";
export default {
  mixins: [badgeMixin],
};
</script>

<style>
</style>