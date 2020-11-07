<template>
  <div class="card--post">
    <div class="row">
      <div class="card__header">
        <button-icon :icon="icons.back" to="/new" class="mr-2" />
        <h2 class="heading--primary mr-auto">Uploaded Photos</h2>
        <button-primary label="Upload more photo" />
      </div>

      <div class="row">
        <div v-for="(item,idx) in post.photos" :key="idx" class="col-12">
          <div class="card--uploaded">
            <div class="card--uploaded__photo">
              <app-image :url="item.photo">
              <img :src="item.photo" alt="">
            </div>
          </div>
        </div>
      </div>
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
    test() {
      console.log("Test");
      this.$store.dispatch(types.actions.SHOW_SNACKBAR, {
        show: true,
        title: "Post successfully uploaded",
        body: "test test",
        type: "success",
        timeout: 5000,
      });
    },
    ...mapActions({
      onPost: types.actions.POST_CREATE,
    }),
  },
};
</script>

<style>
</style>