<template>
  <nav class="navbar">
    <div class="container">
      <app-logo class="navbar__logo" />

      <div class="navbar__search">
        <input-search />
      </div>

      <div class="navbar__actions">
        <template v-if="loggedIn">
          <button-icon :icon="icons.notif" />

          <nuxt-link :to="profileLink" class="navbar__profile">
            <p class="navbar__profile-name">{{ this.profile.firstname }}</p>

            <div class="navbar__profile-photo">
              <profile-photo :url="profilePhoto" />
            </div>
          </nuxt-link>
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
import { mdiBell } from "@mdi/js";
import authMixin from "@/mixins/auth";
export default {
  data() {
    return {
      icons: {
        notif: mdiBell,
      },
    };
  },
  mixins: [authMixin],
};
</script>

<style>
</style>