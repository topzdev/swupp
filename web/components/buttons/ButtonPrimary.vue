<template>
  <div>
    <component
      :is="!to ? 'button' : 'nuxt-link'"
      v-bind="$attrs"
      :type="type"
      class="btn--primary"
      :to="to"
      :class="[sizeClass, fullWidth]"
    >
      {{ loading ? "loading..." : label }}
    </component>
  </div>
</template>

<script>
const sizes = {
  sm: "btn--small",
  md: "btn--medium",
  lg: "btn--large",
};

export default {
  inheritAttrs: true,
  props: {
    to: {
      type: String,
      default: "",
    },
    label: String,
    type: String,
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "sm",
    },

    isFullWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    sizeClass() {
      return sizes[this.size];
    },

    fullWidth() {
      return this.isFullWidth ? "btn--full-width" : "";
    },
  },
};
</script>

<style>
</style>