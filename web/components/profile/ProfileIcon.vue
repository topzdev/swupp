<template>
  <nuxt-link :to="to" class="profile-icon">
    <div class="profile-icon__photo">
      <profile-photo :url="profilePhoto" />
    </div>
    <div class="profile-icon__body">
      <p class="profile-icon__name">
        {{ name }}
      </p>
      <p v-if="caption" class="profile-icon__caption">{{ caption }}</p>
    </div>
  </nuxt-link>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  props: {
    to: String,
    name: String,
    caption: String,
    photo: String,
  },
};
</script>

<style>
</style>