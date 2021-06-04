<template>
  <div class="card--message" :class="myMessageClass">
    <nuxt-link to="/" class="card--message__image">
      <profile-photo :src="photo" />
    </nuxt-link>

    <div class="card--message__content">
      <p class="card--message__name">{{ name }}</p>

      <div class="card--message__main">{{ text }}</div>

      <div class="card--message__date">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import dayjs from "dayjs";
export default {
  mixins: [authMixin],
  props: {
    message: Object,
  },
  computed: {
    myMessageClass() {
      return this.user.id === this.message.user.id ? "my-message" : "";
    },
    name() {
      const { lastname, firstname } = this.message.user.profile;
      return this.user.id === this.message.user.id
        ? "You"
        : `${firstname} ${lastname}`;
    },
    text() {
      return this.message.text;
    },
    date() {
      return dayjs(this.message.createdAt).format("MMMM D, YYYY h:mm a");
    },
    photo() {
      return this.message.user.profile.profilePhoto.securedUrl;
    },
  },
};
</script>

<style>
</style>