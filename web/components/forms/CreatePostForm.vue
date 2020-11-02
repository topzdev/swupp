<template>
  <div class="card--post">
    <h1>Post G!!!</h1>
    <div>
      <label for="">Title</label>
      <input
        type="text"
        placeholder="title"
        name="title"
        :value="post.title"
        @input="onChange('title', $event.target.value)"
      />
    </div>

    <div>
      <label for="">Price</label>
      <input
        type="number"
        placeholder="price"
        name="price"
        :value="post.price"
        @input="onChange('price', $event.target.value)"
      />
    </div>
    <dropzone
      name="photos"
      :value="post.photos"
      @input="onChange('photos', $event)"
    />

    <button @click="onPost">Post</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { types } from "@/store/types";

export default {
  computed: {
    post() {
      return this.$store.state.post.current;
    },
  },
  methods: {
    onChange(key, value) {
      this.$store.commit(types.mutations.POST_UPDATE_CURRENT, {
        key,
        value,
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