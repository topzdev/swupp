<template>
  <div class="search-bar-input">
    <div class="inp--search">
      <app-icon
        class="search-bar-input__icon"
        type="mdi"
        :path="icons.search"
      />
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="inp inp--search__inp"
        type="text"
      />
      <label v-if="isEmpty" for="" class="inp--search__placeholder"
        ><span class="p-default">Search post like</span>
        <span class="p-dynamic">"Looking for keyboard swap to mouse"</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mdiMagnify } from "@mdi/js";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      icons: {
        search: mdiMagnify,
      },
    };
  },
  computed: {
    isEmpty() {
      return this.value === "";
    },
  },
};
</script>

<style>
</style>