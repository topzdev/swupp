<template>
  <div class="card--post">
    <validation-observer ref="form">
      <dropzone
        name="photos"
        :value="post.photos"
        @input="onChange('photos', $event)"
        :rules="rules.photos"
        id="photos"
        crud="update"
      />
      <div class="card___header mt-2 px-2">
        <h2 class="heading--primary">Update Post</h2>
      </div>
      <form @click.prevent="$event.preventDefault()">
        <div class="row mt-3 px-2">
          <div class="col-12 mb-2">
            <input-field
              :value="post.title"
              :rules="rules.title"
              @input="onChange('title', $event)"
              label="Title"
              id="title"
            ></input-field>
          </div>
          <div class="col-12 mb-1">
            <input-field
              :value="post.price"
              :rules="rules.price"
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
              :rules="rules.body"
              :value="post.body"
              @input="onChange('body', $event)"
              label="Description"
              id="body"
            ></input-field>
          </div>
          <div class="col-12 mb-2">
            <select-field
              :options="options.categories"
              :rules="rules.categoryId"
              :value="post.categoryId"
              @input="onChange('categoryId', $event)"
              label="Category"
              id="category"
              item-value="id"
              item-text="text"
            ></select-field>
          </div>
          <div class="col-12 mb-2">
            <select-field
              :value="post.conditionId"
              :rules="rules.conditionId"
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
              label="Prefered"
            ></input-field>
          </div>
        </div>

        <div class="card__actions px-2">
          <button-primary
            label="Delete"
            size="md"
            class="mr-auto"
            variant="accent"
            @click.native="onRemove"
          />
          <button-primary
            :loading="loading"
            label="Update"
            size="md"
            @click.native="onSubmit"
          />
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { types } from "@/store/types";
import { CATEGORIES, CONDITIONS } from "@/constants";
import { ValidationObserver, extend, validate } from "vee-validate";

export default {
  components: { ValidationObserver },
  data() {
    return {
      loading: false,
      options: {
        categories: CATEGORIES,
        conditions: CONDITIONS,
      },

      rules: {
        title: "required",
        price: "required",
        categoryId: "required",
        conditionId: "required",
        body: "required",
        prefered: "",
      },
    };
  },

  computed: {
    post() {
      return this.$store.state.post.update;
    },
  },
  methods: {
    onChange(key, value) {
      this.$store.commit(types.mutations.CHANGE_POST, {
        crud: "update",
        key,
        value,
      });
    },

    async onRemove(e) {
      e.preventDefault();
      this.loading = true;
      await this.onPostRemove();
      this.loading = false;
    },

    async onSubmit(e) {
      e.preventDefault();
      const length = this.post.photos.filter((item) => item.flag !== "deleted")
        .length;
      if (length <= 2)
        return this.$refs.form.setErrors({
          photos: ["Oh noh!, i need atleast two photos to upload this post."],
        });
      this.loading = true;
      await this.onPostUpdate();
      this.loading = false;
    },
    test() {
      this.$store.dispatch(types.actions.SHOW_SNACKBAR, {
        title: "Post successfully uploaded",
        body: "test test",
        type: "error",
        timeout: 5000,
      });
    },
    ...mapActions({
      onPostUpdate: types.actions.POST_UPDATE,
      onPostRemove: types.actions.POST_REMOVE,
    }),
  },
  mounted() {
    const id = this.$route.params.id;
    if (id === undefined) this.$router.back();

    if (parseInt(id) !== this.post.id) {
      this.$store.dispatch(types.actions.FETCH_POST, this.$route.params.id);
    }
  },
};
</script>

<style>
</style>