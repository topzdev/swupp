<template>
  <nav class="navbar">
    <div class="container">
      <nuxt-link to="/" class="navbar__logo">
        <app-logo />
      </nuxt-link>

      <div class="navbar__search">
        <input-search />
      </div>

      <div class="navbar__actions">
        <button-icon :icon="icons.notif" />

        <nuxt-link to="/profile" class="navbar__profile">
          <p class="navbar__profile-name">Christian</p>

          <div class="navbar__profile-photo">
            <img
              src="@/assets/img/sample-1.jpg"
              alt="Christian Lugod Profile"
            />
          </div>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mdiBell } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        notif: mdiBell,
      },
    };
  },
};
</script>

<style>
</style>