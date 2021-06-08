<template>
  <component
    :is="config.link ? 'nuxt-link' : 'div'"
    :to="config.link"
    v-if="config.show"
    class="snackbar"
    :class="[showClass, typeClass]"
  >
    <component :is="'div'" v-if="config.image" class="snackbar__icon">
      <img :src="config.image" alt="Post" />
    </component>
    <div class="snackbar__body">
      <h1 class="snackbar__title">{{ config.title }}</h1>

      <p class="snackbar__description">
        {{ config.body }}
      </p>
    </div>

    <div class="snackbar__action">
      <button-icon
        v-if="config.showClose"
        :icon="icons.close"
        @click.native="hide"
      />
    </div>
  </component>
</template>

<script>
import { mdiClose } from "@mdi/js";
import { types } from "@/store/types";

const barTypes = {
  success: "snackbar--success",
  error: "snackbar--error",
  warning: "snackbar--warning",
};

export default {
  data() {
    return {
      icons: {
        close: mdiClose,
      },
    };
  },

  computed: {
    config() {
      return this.$store.state.frontend.snackbars;
    },

    showClass() {
      return this.config.show ? "snackbar--show" : null;
    },

    typeClass() {
      return barTypes[this.config.type];
    },
  },

  methods: {
    hide() {
      return this.$store.dispatch(types.actions.HIDE_SNACKBAR);
    },
  },
};
</script>

<style>
</style>