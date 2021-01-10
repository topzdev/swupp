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
  </div>
</template>

<script>
import {
  mdiHeartOutline,
  mdiHeart,
  mdiBookmarkOutline,
  mdiBookmarkCheck,
} from "@mdi/js";
export default {
  data() {
    return { liked: true, saved: true };
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
      this.liked = !this.liked;
    },
    onSavePost() {
      this.saved = !this.saved;
    },
  },
};
</script>

<style>
</style>