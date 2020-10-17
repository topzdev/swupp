<template>
  <div class="inp--primary">
    <div v-if="!!leftIcon" class="inp-field__left-icon"></div>
    <input
      v-if="textarea"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-else
      :name="name"
      :id="id"
      :placeholder="placeholder"
      cols="30"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"
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
    type: String,
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