<template>
  <div class="card--message" :class="myMessageClass">
    <nuxt-link to="/" class="card--message__image">
      <profile-photo :url="photo" />
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
    members() {
      return this.$store.state.trade.current.members;
    },
    owner() {
      return this.$store.state.trade.current.members[this.message.userId];
    },
    myMessageClass() {
      return this.user.id === this.message.userId ? "my-message" : "";
    },
    name() {
      const { lastname, firstname } = this.owner.profile;
      return this.user.id === this.message.userId
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
      return this.owner.profile.profilePhoto.securedUrl;
    },
  },
};
</script>

<style>
</style>