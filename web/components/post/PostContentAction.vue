<template>
  <div class="post-content-action">
    <button-icon
      :class="['action', likeClass]"
      :icon="likeIcon"
      @click.native="onLikePost"
    />
    <button-icon
      :class="['action', saveClass]"
      :icon="saveIcon"
      @click.native="onSavePost"
    />
    <button-icon
      v-click-outside="hideMenu"
      @click.native="onOptionToggle"
      :class="'action'"
      :icon="icons.options"
    />
    <card-post-options-menu v-if="options" :id="id" :user="user" />
  </div>
</template>

<script>
import {
  mdiHeartOutline,
  mdiHeart,
  mdiBookmarkOutline,
  mdiBookmarkCheck,
  mdiDotsVertical,
} from "@mdi/js";
export default {
  props: {
    id: [Number, String],
    user: [Object],
  },
  data() {
    return {
      liked: true,
      saved: true,
      icons: {
        options: mdiDotsVertical,
      },
      options: false,
    };
  },

  computed: {
    likeIcon() {
      return this.liked ? mdiHeart : mdiHeartOutline;
    },
    saveIcon() {
      return this.saved ? mdiBookmarkCheck : mdiBookmarkOutline;
    },
    likeClass() {
      return this.liked ? "liked" : "";
    },
    saveClass() {
      return this.saved ? "saved" : "";
    },
  },

  methods: {
    onLikePost() {
      if (!this.$auth.loggedIn)
        this.$router.push({
          path: "/login",
          query: { next: this.$route.fullPath },
        });
      this.liked = !this.liked;
    },
    onSavePost() {
      if (!this.$auth.loggedIn)
        this.$router.push({
          path: "/login",
          query: { next: this.$route.fullPath },
        });
      this.saved = !this.saved;
    },
    onOptionToggle() {
      this.options = !this.options;
    },
    hideMenu() {
      this.options = false;
    },
  },
};
</script>

<style>
</style>