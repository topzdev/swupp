<template>
  <div class="card--post">
    <dropzone
      name="photos"
      :value="post.photos"
      @input="onChange('photos', $event)"
    />
    <div class="card___header mt-2 px-2">
      <h2 class="heading--primary">Create Post</h2>
    </div>
    <div class="row mt-3 px-2">
      <div class="col-12 mb-2">
        <input-field
          :value="post.title"
          @input="onChange('title', $event)"
          label="Title"
          id="title"
        ></input-field>
      </div>
      <div class="col-12 mb-1">
        <input-field
          :value="post.price"
          @input="onChange('price', parseInt($event || 0))"
          label="Price"
          id="price"
        ></input-field>
      </div>
      <div class="col-12 mb-2">
        <checkbox-field
          class="mr-auto"
          :value="post.isPriceHidden"
          @input="onChange('isPriceHidden', $event)"
          label="Hide true value only display $$$"
          id="is-price-hidden"
        ></checkbox-field>
      </div>
      <div class="col-12 mb-2">
        <input-field
          :textarea="true"
          :value="post.body"
          @input="onChange('body', $event)"
          label="Description"
          id="body"
        ></input-field>
      </div>
      <div class="col-12 mb-2">
        <select-field
          :options="options.categories"
          :value="post.categoryId"
          @input="onChange('categoryId', $event)"
          label="Category"
          id="category"
          item-value="id"
          item-text="value"
        ></select-field>
      </div>
      <div class="col-12 mb-2">
        <select-field
          :value="post.conditionId"
          :options="options.conditions"
          @input="onChange('conditionId', $event)"
          label="Condtion"
          id="condition"
          item-value="id"
          item-text="value"
        ></select-field>
      </div>
      <div class="col-12 mb-2">
        <input-field
          :value="post.prefered"
          @input="onChange('prefered', $event)"
          id="body"
          label="Prefered"
        ></input-field>
      </div>
    </div>

    <div class="card__actions px-2">
      <checkbox-field
        class="mr-auto"
        :value="post.isDraft"
        @input="onChange('isDraft', $event)"
        label="Save as draft"
        id="is-draft"
      ></checkbox-field>
      <button-primary
        label="Post"
        size="md"
        type="submit"
        @click.native="test"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { types } from "@/store/types";
import { CATEGORIES, CONDITIONS } from "@/constants";

export default {
  data() {
    return {
      options: {
        categories: CATEGORIES,
        conditions: CONDITIONS,
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