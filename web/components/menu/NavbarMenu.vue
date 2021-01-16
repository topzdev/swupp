<template>
  <div class="menu">
    <profile-icon
      class="menu__profile"
      :username="user.username"
      :photo="profilePhoto"
      :name="myFullname"
      caption="Visit your profile"
    />

    <div class="separator"></div>

    <ul class="menu__list">
      <li class="menu__item">
        <nuxt-link class="menu__link" to="/settings">
          <span class="menu__link-icon">
            <app-icon :path="icons.settings" />
          </span>
          <span class="menu__link-text"> Account Settings </span>
        </nuxt-link>
      </li>
      <li class="menu__item">
        <button class="btn menu__link">
          <span class="menu__link-icon">
            <app-icon :path="icons.themes" />
          </span>
          <span class="menu__link-text"> Dark Mode </span>
        </button>
      </li>
      <li class="menu__item">
        <button class="btn menu__link" @click="$auth.logout()">
          <span class="menu__link-icon">
            <app-icon :path="icons.logout" />
          </span>
          <span class="menu__link-text"> Log Out </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import { mdiCog, mdiLogoutVariant, mdiBrightness4 } from "@mdi/js";
import ButtonIcon from "../buttons/ButtonIcon.vue";
export default {
  components: { ButtonIcon },
  mixins: [authMixin],

  data() {
    return {
      icons: {
        settings: mdiCog,
        logout: mdiLogoutVariant,
        themes: mdiBrightness4,
      },
    };
  },

  computed: {},
};
</script>

<style>
</style>