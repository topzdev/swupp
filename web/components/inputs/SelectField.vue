<template>
  <div class="inp--primary">
    <select
      :value="value"
      @input="$emit('input', $event.target.value)"
      :id="id"
    >
      <option
        v-for="item in options"
        :key="item.id"
        :value="itemValue ? item[itemValue] : item"
      >
        {{ itemValue ? item[itemText] : item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: Array,
    itemValue: String,
    itemText: String,
    name: String,
    id: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    leftIcon: String,
    rightIcon: String,
  },
  methods: {
    optionValue() {
      return;
    },
  },
};
</script>

<style>
</style>