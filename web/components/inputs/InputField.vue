<template>
  <div class="inp">
    <div v-if="!!leftIcon" class="inp-field__left-icon"></div>
    <input
      v-if="textarea"
      type="text"
      :value="value"
      v-bind="$attrs"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-else
      :name="name"
      :value="value"
      :id="id"
      v-bind="$attrs"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      cols="30"
      rows="10"
    ></textarea>
    <div v-if="!!rightIcon" class="inp-field__left-icon"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
    name: String,
    textarea: {
      type: Boolean,
      default: true,
    },
    id: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    leftIcon: String,
    rightIcon: String,
  },

  methods: {},
};
</script>

<style>
</style>