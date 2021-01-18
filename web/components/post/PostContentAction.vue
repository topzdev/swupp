<template>
  <div class="post-content-action">
    <button-icon
      :class="['action', likeClass]"
      :icon="likeIcon"
      @click.native="onLikePost"
    />
    <!-- <button-icon
      :class="['action', saveClass]"
      :icon="saveIcon"
      @click.native="onSavePost"
    /> -->
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
import postServices from "@/services/post";
import { types } from "@/store/types";
export default {
  props: {
    id: [Number, String],
    user: [Object],
    liked: Object,
  },
  data() {
    return {
      toggle: {
        liked: false,
        saved: false,
      },
      icons: {
        options: mdiDotsVertical,
      },
      options: false,
    };
  },

  watch: {
    liked(newValue) {
      this.setLike(newValue);
    },
  },

  computed: {
    likeIcon() {
      return this.toggle.liked ? mdiHeart : mdiHeartOutline;
    },
    saveIcon() {
      return this.toggle.saved ? mdiBookmarkCheck : mdiBookmarkOutline;
    },
    likeClass() {
      return this.toggle.liked ? "liked" : "";
    },
    saveClass() {
      return this.toggle.saved ? "saved" : "";
    },
  },

  methods: {
    async onLikePost() {
      if (!this.$auth.loggedIn) {
        return this.$router.push({
          path: "/login",
          query: { next: this.$route.fullPath },
        });
        this.liked = !this.liked;
      }

      const response = await postServices.likePost(this.id);
      console.log(response);
      this.toggle.liked = response ? true : false;

      await this.$store.dispatch(
        "preview/" + types.actions.TOGGLE_LIKES,
        response
      );
    },
    onSavePost() {
      if (!this.$auth.loggedIn)
        this.$router.push({
          path: "/login",
          query: { next: this.$route.fullPath },
        });
      this.toggle.saved = !this.saved;
    },
    onOptionToggle() {
      this.options = !this.options;
    },
    hideMenu() {
      this.options = false;
    },
    setLike(value) {
      if (value !== null) this.toggle.liked = true;
    },
  },

  created() {
    this.setLike(this.liked);
  },
};
</script>

<style>
</style>