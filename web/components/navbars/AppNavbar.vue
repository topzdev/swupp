<template>
  <nav class="navbar" :class="isPostVariant ? 'navbar-post' : ''">
    <div class="container">
      <app-logo class="navbar__logo" />

      <div
        v-if="!isPostVariant"
        :class="['navbar__search', backdrop ? 'over-backdrop' : '']"
      >
        <input-search :show-backdrop="showBackdrop" />
      </div>

      <div v-if="backdrop" class="backdrop"></div>

      <div class="navbar__actions">
        <template v-if="loggedIn">
          <profile-icon
            v-if="!isPostVariant"
            :username="user.username"
            :photo="profilePhoto"
            :name="profile.firstname"
            :id="user.id"
          />
          <button-icon
            class="mx-1"
            :icon="icons.message"
            @click.native="gotoTradeChat"
          />

          <button-icon
            :active="menu.navbar"
            @click.native="menu.navbar = !menu.navbar"
            v-click-outside="hideMenu"
            class="menu-icon"
            :icon="icons.menu"
          />

          <navbar-menu v-if="menu.navbar" />
        </template>
        <template v-else>
          <!-- <button-primary
            to="/login"
            label="Login"
            size="lg"
            className="px-1"
            text
          /> -->
          <nuxt-link class="btn btn--link" to="/login">Login</nuxt-link>
          <span class="mx-1">or</span>
          <nuxt-link class="btn btn--link" to="/register">Sign up</nuxt-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mdiBell, mdiMenuDown, mdiFacebookMessenger } from "@mdi/js";
import authMixin from "@/mixins/auth";
export default {
  props: {
    variant: {
      type: String,
      default: "app",
    },
  },
  data() {
    return {
      backdrop: false,
      menu: {
        navbar: false,
      },
      icons: {
        notif: mdiBell,
        menu: mdiMenuDown,
        message: mdiFacebookMessenger,
      },
    };
  },
  computed: {
    isPostVariant() {
      return this.variant === "post";
    },
  },
  methods: {
    hideMenu() {
      this.menu.navbar = false;
    },

    showBackdrop(value) {
      this.backdrop = value;
    },

    gotoTradeChat() {
      this.$router.push("/trade");
    },
  },
  mixins: [authMixin],
};
</script>

<style>
</style>