<template>
  <div class="card--post">
    <div class="card__header">
      <button-icon :icon="icons.back" to="/new" class="mr-2" />
      <h2 class="heading--primary mr-auto">Uploaded Photos</h2>
      <button-primary label="Upload more photo" />
    </div>
    <div class="row no-gutter">
      <div v-for="(item, idx) in post.photos" :key="idx" class="col-12 mb-3">
        <card-uploaded
          :value="post.photos"
          @input="onChange('photo', $event)"
          :item="item"
          :index="idx"
        />
      </div>
    </div>
    <div class="card__actions">
      <button-primary
        label="Back"
        size="md"
        type="submit"
        to="/new"
        variant="default"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { types } from "@/store/types";
import { CATEGORIES, CONDITIONS } from "@/constants";
import { mdiArrowLeft } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        back: mdiArrowLeft,
      },
    };
  },

  computed: {
    post() {
      return this.$store.state.post.current;
    },
  },
  methods: {
    onChange(key, value) {
      console.log(value);
      this.$store.commit(types.mutations.SET_POST_CURRENT, {
        key,
        value,
      });
    },
  },
};
</script>

<style>
</style>