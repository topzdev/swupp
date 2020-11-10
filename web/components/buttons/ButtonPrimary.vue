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
      <span v-if="iconLeft" class="btn--primary__icon btn--primary__icon-left">
        <app-icon :path="iconLeft" type="mdi" />
      </span>
      <span class="btn--primary__label">
        {{ loading ? "loading..." : label }}
      </span>
      <span v-if="iconRight" class="btn--primary__icon btn--primary__icon-left">
        <app-icon :path="iconRight" type="mdi" />
      </span>
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