<template>
  <div class="profile mb-4">
    <div class="container">
      <div class="profile__cover">
        <img
          v-if="profile.coverPhoto.url"
          :src="profile.coverPhoto.url"
          alt="Cover photo"
        />

        <button-primary
          v-if="user"
          label="Change Cover Photo"
          :icon-left="icons.camera"
          @click.native="open('change-photo')"
        />
      </div>

      <div class="profile__body">
        <div class="profile__photo">
          <profile-photo :url="profile.profilePhoto.url" />
          <button-icon
            v-if="user"
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

  async fetch() {
    const params = this.$route.params;
    await this.$store.dispatch("profile/" + types.actions.FETCH_PROFILE, {
      username: params.username,
    });
  },

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
    username() {
      if (this.profile.username) `@${this.profile.username}`;
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