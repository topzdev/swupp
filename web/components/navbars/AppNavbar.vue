<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__logo">
        <app-logo />
      </div>

      <div class="navbar__search">
        <input-search />
      </div>

      <div class="navbar__actions">
        <button-icon :icon="icons.notif" />

        <div class="navbar__profile">
          <p class="navbar__profile-name">Christian</p>

          <div class="navbar__profile-photo">
            <img
              src="@/assets/img/sample-1.jpg"
              alt="Christian Lugod Profile"
            />
          </div>
        </div>
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