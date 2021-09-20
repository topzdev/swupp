<template>
  <div class="tab tab--vertical">
    <div class="tab__header">
      <h2>Settings</h2>
    </div>
    <ul class="tab__list">
      <li v-for="item in settings" :key="item.title" class="tab__item">
        <nuxt-link :to="item.to" exact class="tab__link">
          <span class="tab__icon">
            <app-icon :path="item.icon" />
          </span>

          <span class="tab__text"> {{ item.title }} </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mdiAccountCircleOutline, mdiShieldAccountOutline } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        general: mdiAccountCircleOutline,
        password: mdiShieldAccountOutline,
      },
    };
  },

  computed: {
    settings() {
      return [
        {
          icon: this.icons.general,
          title: "General",
          to: "/settings",
        },
        {
          icon: this.icons.password,
          title: "Security & Login",
          to: "/settings?tab=security-and-login",
        },
      ];
    },
  },
};
</script>

<style>
</style>