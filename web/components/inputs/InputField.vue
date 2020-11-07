<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
  >
    <div
      v-bind="$attrs"
      class="inp inp--primary"
      :class="{ 'is-error': !!errors[0] }"
    >
      <div>
        <label v-if="!!label" :for="id" class="inp__label">{{ label }}</label>
        <slot></slot>
      </div>

      <div class="inp__field">
        <div v-if="!!leftIcon" class="inp__left-icon"></div>
        <input
          v-if="!textarea"
          :type="type"
          :name="name"
          :id="id"
          class="inp"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
        <textarea
          v-else
          :name="name"
          :id="id"
          class="inp"
          :placeholder="placeholder"
          cols="5"
          rows="5"
          :value="value"
          @input="$emit('input', $event.target.value)"
        ></textarea>
        <div v-if="!!rightIcon" class="inp__left-icon"></div>
      </div>

      <div v-if="!!tip" class="inp__tip">{{ tip }}</div>

      <p v-if="showErrMes && !!errors[0]" class="inp__error">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  inheritAttrs: false,
  components: { ValidationProvider },

  props: {
    value: [String, Number],
    name: String,
    textarea: {
      type: Boolean,
      default: false,
    },
    label: String,
    type: String,
    id: String,
    tip: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    leftIcon: String,
    rightIcon: String,
    showErrMes: {
      type: Boolean,
      default: true,
    },
    rules: String,
    name: String,
    mode: {
      type: String,
      default: "eager",
    },
  },
};
</script>

<style>
</style>