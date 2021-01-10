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

    <nuxt-link to="/post/1" class="card--post__main">
      <div class="card--post__header">
        <badge variant="primary">Open for trade</badge>
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
    </nuxt-link>
  </div>
</template>

<script>
import { mdiEyeOutline, mdiCommentOutline } from "@mdi/js";
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
      },
    };
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