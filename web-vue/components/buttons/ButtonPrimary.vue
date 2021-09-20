<template>
  <component
    :is="to ? 'nuxt-link' : 'button'"
    v-bind="$attrs"
    :type="type"
    class="btn--primary"
    :to="to"
    :name="name"
    :disabled="disabled"
    :class="[
      sizeClass,
      fullWidth,
      variantClass,
      textClass,
      disabledClass,
      className,
    ]"
  >
    <span v-if="iconLeft" class="btn--primary__icon btn--primary__icon-left">
      <app-icon :path="iconLeft" type="mdi" />
    </span>
    <span class="btn--primary__label">
      {{ loading ? "loading..." : label }}
    </span>
    <span v-if="iconRight" class="btn--primary__icon btn--primary__icon-right">
      <app-icon :path="iconRight" type="mdi" />
    </span>
  </component>
</template>

<script>
import buttonMixin from "@/mixins/button";
export default {
  mixins: [buttonMixin],
  inheritAttrs: false,
  props: {
    className: String,
    to: {
      type: String,
      default: "",
    },
    name: String,
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