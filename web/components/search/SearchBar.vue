<template>
  <div class="search-bar">
    <div class="search-bar__body">
      <search-bar-input v-model="search" />
      <search-select
        :options="options.category"
        v-model="category"
        label="Category"
        item-text="text"
        item-value="id"
      />
      <search-select
        :options="options.condition"
        v-model="condition"
        label="Condition"
        item-text="value"
        item-value="id"
      />
    </div>

    <div class="search-bar__action">
      <button class="btn btn--search" @click="onSearch">
        <app-icon type="mdi" :path="icons.search"></app-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { CATEGORIES, CONDITIONS } from "@/constants";
import { mdiMagnify } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        search: mdiMagnify,
      },
      search: "",
      category: "all",
      condition: "all",
      options: {
        category: [{ id: "all", text: "All" }, ...CATEGORIES],
        condition: [{ id: "all", value: "All" }, ...CONDITIONS],
      },
    };
  },

  methods: {
    onSearch() {
      const { search, category, condition } = this;
      let query = {};

      if (category !== "all") query.category = category;
      if (condition !== "all") query.condition = condition;
      if (search !== "") query.search = search;
      this.$router.push({
        path: "search",
        query,
      });
    },
  },
};
</script>

<style>
</style>