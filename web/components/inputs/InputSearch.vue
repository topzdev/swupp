<template>
  <div class="inp--search">
    <input v-model="value" class="inp inp--search__inp" type="text" />
    <label v-if="isEmpty" for="" class="inp--search__placeholder"
      ><span class="p-default">Search post like</span>
      <span class="p-dynamic">"Looking for keyboard swap to mouse"</span>
    </label>
    <button class="inp--search__btn">
      <app-icon type="mdi" :path="icons.search" />
    </button>
  </div>
</template>

<script>
import { mdiMagnify } from "@mdi/js";
export default {
  //   props: {
  //     value: String,
  //   },
  data() {
    return {
      value: "",
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