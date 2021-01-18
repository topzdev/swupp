<template>
  <div class="profile mb-4">
    <div class="container">
      <div class="profile__cover">
        <img v-if="coverPhoto" :src="coverPhoto" alt="Cover photo" />

        <button-primary
          v-if="isMyProfile"
          label="Change Cover Photo"
          :icon-left="icons.camera"
          @click.native="open('change-photo')"
        />
      </div>

      <div class="profile__body">
        <div class="profile__photo">
          <profile-photo :url="profilePhoto" />
          <button-icon
            v-if="isMyProfile"
            class="profile__photo-btn"
            :icon="icons.camera"
            @click.native="open('change-photo')"
          />
        </div>
        <div class="profile__names">
          <h1 class="fullname">
            {{ profile.firstname }} {{ profile.lastname }}
          </h1>
          <p class="username">{{ username }}</p>
        </div>
      </div>

      <div class="profile__footer">
        <ul class="profile__tab">
          <li class="profile__tab-item">
            <nuxt-link class="profile__tab-link" exact :to="links.profile">
              <span class="profile__tab-label"> Post </span>
              <span class="profile__tab-count">{{ profile.postCount }}</span>
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

    <change-profile-photos-modal />
  </div>
</template>

<script>
import { mdiCamera } from "@mdi/js";
import profileMixin from "@/mixins/profile";
import { types } from "@/store/types";
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
    isMyProfile() {
      if (!this.user) return false;
      return this.profile.username === this.user.username;
    },
    username() {
      if (this.profile.username) return `@${this.profile.username}`;
    },
    profilePhoto() {
      return this.$cloudinary.image.url(this.profile.profilePhoto.publicId, {
        crop: "scale",
        width: 300,
      });
    },
    coverPhoto() {
      // return this.profile.coverPhoto.url;
      return this.$cloudinary.image.url(this.profile.coverPhoto.publicId, {
        height: 500,
      });
    },
  },

  methods: {
    open(type) {
      if (type === "change-photo") {
        this.$store.commit(
          "profile/" + types.mutations.SET_PROFILE_MODAL,
          true
        );
      }
    },
  },

  //   middleware: "auth",
};
</script>

<style>
</style>