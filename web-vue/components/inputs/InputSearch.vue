<template>
  <div
    :class="['inp--search', show ? 'over-backdrop' : '']"
    v-click-outside="hide"
  >
    <input v-model="search" class="inp inp--search__inp" type="text" />
    <label v-if="isEmpty" for="" class="inp--search__placeholder"
      ><span class="p-default">Search post like</span>
      <span class="p-dynamic">"Looking for keyboard swap to mouse"</span>
    </label>
    <button class="inp--search__btn">
      <app-icon type="mdi" :path="icons.search" />
    </button>

    <div v-if="show" class="inp--search__advance">
      <div class="inp--search__advance-body">
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

        <button class="btn btn--search" @click="onSearch">
          <app-icon type="mdi" :path="icons.search"></app-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORIES, CONDITIONS } from "@/constants";
import { mdiMagnify } from "@mdi/js";
export default {
  props: {
    showBackdrop: Function,
  },
  data() {
    return {
      icons: {
        search: mdiMagnify,
      },
      show: false,
      search: "",
      category: "all",
      condition: "all",

      options: {
        category: [{ id: "all", text: "All" }, ...CATEGORIES],
        condition: [{ id: "all", value: "All" }, ...CONDITIONS],
      },
    };
  },
  computed: {
    isEmpty() {
      return this.search === "";
    },
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
    hide() {
      this.showBackdrop(false);
      this.show = false;
    },
  },

  watch: {
    search: function (value) {
      if (value.length >= 1) {
        this.showBackdrop(true);
        this.show = true;
      } else {
        this.showBackdrop(false);
        this.show = false;
      }
    },
  },
};
</script>

<style>
</style>