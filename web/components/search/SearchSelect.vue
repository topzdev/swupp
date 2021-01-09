<template>
  <div
    :class="['search-select', show ? 'show' : '']"
    @click="show = !show"
    v-click-outside="hide"
  >
    <div class="search-select__body">
      <div class="search-select__value">{{ displayText }}</div>

      <div class="search-select__label">{{ label }}</div>

      <div class="search-select__arrow">
        <app-icon :path="icons.arrow"></app-icon>
      </div>
    </div>

    <ul class="search-select__list">
      <li
        v-for="item in options"
        :key="item.id"
        @click="selected(selectValue(item))"
        :class="selectValue(item) === value ? 'active' : ''"
      >
        {{ selectText(item) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";

export default {
  props: {
    value: [String, Number],
    itemValue: String,
    itemText: String,
    options: Array,
    label: String,
  },
  data() {
    return {
      show: false,
      icons: {
        arrow: mdiMenuDown,
      },
    };
  },

  computed: {
    displayText() {
      if (this.options.length)
        return this.options.filter(
          (item) => item[this.itemValue] === this.value
        )[0][this.itemText];
    },
  },

  methods: {
    selected($value) {
      console.log($value);
      this.$emit("input", $value);
    },

    selectValue(item) {
      return this.itemValue ? item[this.itemValue] : item;
    },
    selectText(item) {
      return this.itemText ? item[this.itemText] : item;
    },

    hide() {
      this.show = false;
    },
  },
};
</script>

<style>
</style>