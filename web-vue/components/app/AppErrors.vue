<template></template>

<script>
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  props: {
    error: String,
  },
};
</script>

<style>
</style>