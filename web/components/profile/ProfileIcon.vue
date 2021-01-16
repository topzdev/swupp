<template>
  <div @click.stop="gotoProfile" class="profile-icon">
    <div class="profile-icon__photo">
      <profile-photo :url="photo" />
    </div>
    <div class="profile-icon__body">
      <p class="profile-icon__name">
        {{ name }}
      </p>
      <p v-if="caption" class="profile-icon__caption">{{ caption }}</p>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  props: {
    username: String,
    name: String,
    caption: String,
    photo: String,
  },

  computed: {
    to() {
      return;
    },
  },

  methods: {
    gotoProfile() {
      this.$router.push(`/profile/${this.username}`);
    },
  },
};
</script>

<style>
</style>