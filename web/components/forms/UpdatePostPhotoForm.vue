<template>
  <div>
    <div class="card__header">
      <button-icon
        :icon="icons.back"
        @click.native="$router.back()"
        class="mr-2"
      />
      <h2 class="heading--primary mr-auto">Uploaded Photos</h2>
      <button-primary label="Upload more photo" />
    </div>
    <div class="row no-gutter">
      <div v-for="(item, idx) in post.photos" :key="idx" class="col-12 mb-3">
        <card-uploaded
          :value="post.photos"
          @input="onChange('photos', $event)"
          :item="item"
          :index="idx"
        />
      </div>
    </div>
    <div class="card__actions mt-1">
      <button-primary
        class="ml-auto"
        label="Done"
        size="md"
        type="submit"
        @click.native="goBack"
        variant="primary"
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

  mounted() {
    const id = this.$route.params.id;
    if (id === undefined) this.$router.push("/");

    if (parseInt(id) !== this.post.id) {
      this.$store.dispatch(types.actions.FETCH_POST, this.$route.params.id);
    }
  },

  computed: {
    post() {
      return this.$store.state.post.update;
    },
  },
  methods: {
    goBack() {
      this.$router.push(`/update/${this.post.id}`);
    },
    onChange(key, value) {
      this.$store.commit(types.mutations.CHANGE_POST, {
        key,
        value,
        crud: "update",
      });
    },
  },
};
</script>

<style>
</style>