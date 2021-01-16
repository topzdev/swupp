<template>
  <div class="card--post">
    <div class="card--post__image">
      <img
        :src="postCoverPhoto"
        :alt="post.title"
        draggable="false"
        loading="lazy"
      />
    </div>

    <div class="card--post__main" @click.stop="view">
      <div class="card--post__header">
        <profile-icon
          v-if="!isProfilePage"
          :username="post.user.username"
          :name="post.user.username"
          :photo="profilePhoto"
        />

        <button
          @click.stop="toggleMenu"
          v-click-outside="hideMenu"
          class="card--post__options"
        >
          <app-icon :path="icons.options"></app-icon>
        </button>

        <card-post-options-menu
          v-if="menu.options"
          :id="post.id"
          :user="post.user"
        />
      </div>
      <div class="card--post__body">
        <ul class="card--post__others">
          <li class="card--post__others-item">
            <app-icon :path="icons.views" type="mdi" />
            <span>{{ post.counts.views }}</span>
          </li>
          <li class="card--post__others-item">
            <app-icon :path="icons.comment" type="mdi" />
            <span>{{ post.counts.comments }}</span>
          </li>
        </ul>
        <h3 class="card--post__title" :title="post.title">
          {{ truncatedTitle }}
        </h3>

        <div class="card--post__prefered" :title="post.prefered">
          {{ truncatedPrefered }}
        </div>

        <div class="card--post__description">
          <div class="card--post__price mr-auto">{{ post.price }}</div>

          <badge variant="success">{{ condition }}</badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiEyeOutline, mdiCommentOutline, mdiDotsVertical } from "@mdi/js";
import { CONDITIONS, CATEGORIES } from "@/constants";
import truncate from "cli-truncate";
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      icons: {
        views: mdiEyeOutline,
        comment: mdiCommentOutline,
        options: mdiDotsVertical,
      },
      menu: {
        options: false,
      },
    };
  },

  methods: {
    view() {
      this.$router.push(`/post/${this.post.id}`);
    },

    toggleMenu() {
      this.menu.options = !this.menu.options;
    },

    hideMenu() {
      this.menu.options = false;
    },
  },

  computed: {
    truncatedTitle() {
      return truncate(this.post.title, 64);
    },

    truncatedPrefered() {
      return truncate(this.post.prefered, 40);
    },

    category() {
      return CATEGORIES.filter((item) => item.id === this.post.categoryId)[0]
        .text;
    },

    condition() {
      return CONDITIONS.filter((item) => item.id === this.post.conditionId)[0]
        .value;
    },

    prefered() {
      return this.post.prefered ? `I prefered - ${this.post.prefered}` : ``;
    },

    isProfilePage() {
      return this.$route.name === "profile-username";
    },

    profilePhoto() {
      const user = this.post.user;
      return user && user.profile && user.profile.profilePhoto.publicId
        ? this.$cloudinary.image.url(user.profile.profilePhoto.publicId, {
            height: 45,
            quality: "auto",
            crop: "scale",
          })
        : null;
    },

    postCoverPhoto() {
      // return this.profile.coverPhoto.url;
      return this.$cloudinary.image.url(this.post.coverPhoto.publicId, {
        height: 400,
        crop: "scale",
        quality: "auto",
        fetch_format: "auto",
      });
    },
  },
};
</script>

<style>
</style>