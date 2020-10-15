<template>
  <!-- <validate-provider> -->
  <div class="inp-group">
    <label class="inp-group__label" v-if="!!label" :for="id">{{ label }}</label>
    <slot></slot>
    <p v-if="!!tip" class="inp-group__tip">{tip}</p>
  </div>
  <!-- </validate-provider> -->
</template>
<script>
import { ValidationProvider } from "vee-validate";
import InputField from "./InputField";

export default {
  inheritAttrs: false,
  props: {
    value: String,
    label: String,
    placeholder: String,
    id: String,
    type: String,
    tip: String,
    options: Array,
    itemValue: String,
    itemText: String,
    select: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style>
</style>