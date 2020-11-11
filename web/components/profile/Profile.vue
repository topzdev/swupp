<template>
  <div class="profile mb-4">
    <div class="container">
      <div class="profile__cover">
        <img :src="profile.coverPhoto.url" alt="Cover photo" />

        <button-primary label="Change Cover Photo" :icon-left="icons.camera" />
      </div>

      <div class="profile__body">
        <div class="profile__photo">
          <div class="profile__photo-holder">
            <img :src="profile.profilePhoto.url" alt="Profile photo" />
          </div>
          <button-icon :icon="icons.camera" />
        </div>
        <div class="profile__names">
          <h1 class="fullname">
            {{ profile.firstname }} {{ profile.lastname }}
          </h1>
          <p class="username">@{{ profile.username }}</p>
        </div>
      </div>

      <div class="profile__footer">
        <ul class="profile__tab">
          <li class="profile__tab-item">
            <nuxt-link class="profile__tab-link" exact :to="links.profile">
              <span class="profile__tab-label"> Post </span>
              <span class="profile__tab-count">{{ postCount }}</span>
            </nuxt-link>
          </li>
          <li class="profile__tab-item">
            <nuxt-link class="profile__tab-link" exact :to="links.about">
              <span class="profile__tab-label"> About </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import profileMixin from "@/mixins/profile";
export default {
  mixins: [profileMixin],
  data() {
    return {
      icons: {
        camera: mdiCamera,
      },
    };
  },

  computed: {
    profile() {
      return this.$store.state.profile.current;
    },
    postCount() {
      return this.$store.state.profile.posts.count;
    },
  },

  //   middleware: "auth",
};
</script>

<style>
</style>