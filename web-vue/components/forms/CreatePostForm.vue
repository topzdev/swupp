<template>
  <div class="">
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <dropzone
        name="photos"
        :value="post.photos"
        @input="onChange('photos', $event)"
        :rules="rules.photos"
        id="photos"
        crud="create"
      />
      <div class="card___header mt-2 px-2">
        <h2 class="heading--primary">Create Post</h2>
      </div>
      <form @submit.prevent="handleSubmit(onSubmit)">
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
              @input="onChange('price', parseFloat($event || 0))"
              label="Price"
              id="price"
              type="number"
            ></input-field>
          </div>
          <!-- <div class="col-12 mb-2">
            <checkbox-field
              class="mr-auto"
              :value="post.isPriceHidden"
              @input="onChange('isPriceHidden', $event)"
              label="Hide numeral value  "
              id="is-price-hidden"
            ></checkbox-field>
          </div> -->
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
              label="Preferred Item"
            ></input-field>
          </div>
          <div class="col-12 mb-2">
            <client-only>
              <input-location
                :value="post.postLocation.name"
                :left-icon="icons.marker"
                :location="post.postLocation"
                :rules="rules.postLocation"
                id="location"
                name="location"
                @input="onChange('postLocation', $event)"
                label="Location"
                placeholder="Enter your location"
              ></input-location>
            </client-only>
          </div>
        </div>

        <div class="card__actions px-2">
          <!-- <checkbox-field
            class="mr-auto"
            :value="post.isDraft"
            @input="onChange('isDraft', $event)"
            label="Save as draft"
            id="is-draft"
          ></checkbox-field> -->
          <button-primary
            :loading="loading"
            label="Post"
            class="ml-auto"
            size="md"
            type="submit"
            :disabled="loading"
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
import { mdiMapMarker } from "@mdi/js";

export default {
  components: { ValidationObserver },
  data() {
    return {
      options: {
        categories: CATEGORIES,
        conditions: CONDITIONS,
      },
      icons: {
        marker: mdiMapMarker,
      },
      loading: false,
      rules: {
        title: "required",
        price: "required",
        categoryId: "required",
        conditionId: "required",
        body: "required",
        prefered: "",
        // postLocation: "required",
      },
    };
  },

  computed: {
    post() {
      return this.$store.state.post.create;
    },
  },
  methods: {
    onChange(key, value) {
      this.$store.commit(types.mutations.CHANGE_POST, {
        key,
        value,
        crud: "create",
      });
    },

    processLocationChanged(place) {
      console.log(place);
    },

    async fetchPost(username) {
      await this.$store.dispatch(
        "profile/" + types.actions.FETCH_PROFILE_POSTS,
        { username }
      );
    },

    async onSubmit() {
      if (!this.post.postLocation.name) {
        this.$router.push(this.$route.path + "#location");
        return this.$refs.form.setErrors({
          location: ["Please select your location"],
        });
      }
      if (this.post.photos.length < 2) {
        this.$router.push(this.$route.path + "#photos");
        return this.$refs.form.setErrors({
          photos: ["Oh noh!, i need atleast two photos to upload this post."],
        });
      }
      this.loading = true;
      await this.onPost();
      this.fetchPost(this.$auth.user.username);
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
      onPost: types.actions.POST_CREATE,
    }),
  },
};
</script>

<style>
</style>