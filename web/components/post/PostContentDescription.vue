<template>
  <div class="post-content-description">
    <p class="overline">Description</p>
    <p class="text--main-light">
      {{ description }}
    </p>
    <template v-if="category">
      <p class="overline mt-2">Category</p>
      <p class="text--main-light" style="text-transform: capitalize">
        {{ category }}
      </p>
    </template>
  </div>
</template>

<script>
import { CATEGORIES, CONDITIONS } from "@/constants";

export default {
  props: {
    description: String,
    conditionId: String,
    categoryId: String,
  },
  computed: {
    category() {
      if (!this.categoryId) return;
      return this.options.category.filter(
        (item) => item.id === this.categoryId
      )[0].text;
    },
    condition() {
      if (!this.conditionId) return;
      return this.options.condition.filter(
        (item) => item.id === this.conditionId
      )[0].value;
    },
  },
  data() {
    return {
      options: {
        category: [{ id: "all", text: "All" }, ...CATEGORIES],
        condition: [{ id: "all", value: "All" }, ...CONDITIONS],
      },
    };
  },
};
</script>

<style>
</style>