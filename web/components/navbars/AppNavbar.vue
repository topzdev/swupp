<template>
  <nav class="navbar">
    <div class="container">
      <app-logo class="navbar__logo" />

      <div class="navbar__search">
        <input-search />
      </div>

      <div class="navbar__actions">
        <template v-if="loggedIn">
          <profile-icon
            :to="profileLink"
            :photo="profilePhoto"
            :name="profile.firstname"
          />
          <button-icon class="mx-1" :icon="icons.notif" />

          <button-icon
            :active="menu.navbar"
            @click.native="menu.navbar = !menu.navbar"
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
import { mdiBell, mdiMenuDown } from "@mdi/js";
import authMixin from "@/mixins/auth";
export default {
  data() {
    return {
      menu: {
        navbar: false,
      },
      icons: {
        notif: mdiBell,
        menu: mdiMenuDown,
      },
    };
  },
  mixins: [authMixin],
};
</script>

<style>
</style>