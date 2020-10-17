<template>
  <validation-provider
    :mode="mode"
    :name="label"
    :rules="rules"
    :vid="vid"
    v-slot="{ errors }"
  >
    <div :class="`inp-group ${!!errors[0] ? 'is-error' : ''}`">
      <label class="inp-group__label" :for="id">{{
        label ? label : "&nbsp;"
      }}</label>

      <slot :class="`is-${invalid}`"></slot>
      <p v-if="!!tip" class="inp-group__tip">{tip}</p>
      <p v-if="showErrMes && !!errors[0]" class="inp-group__error">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>
<script>
import InputField from "./InputField";
import { ValidationProvider } from "vee-validate";

export default {
  inheritAttrs: false,

  components: {
    ValidationProvider,
  },
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
    rules: String,
    mode: {
      type: String,
      default: "eager",
    },
    showErrMes: {
      type: Boolean,
      default: true,
    },
    select: {
      type: Boolean,
      default: false,
    },
    vid: {
      type: String,
    },
  },
};
</script>

<style>
</style>