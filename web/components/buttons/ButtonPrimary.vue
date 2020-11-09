<template>
  <div>
    <component
      :is="to ? 'nuxt-link' : 'button'"
      v-bind="$attrs"
      :type="type"
      class="btn--primary"
      :to="to"
      :disabled="disabled"
      :class="[sizeClass, fullWidth, variantClass, textClass]"
    >
      {{ loading ? "loading..." : label }}
    </component>
  </div>
</template>

<script>
import buttonMixin from "@/mixins/button";
export default {
  mixins: [buttonMixin],
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
  },
};
</script>

<style>
</style>