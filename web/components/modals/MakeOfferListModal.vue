<template>
  <div class="backdrop">
    <div class="dialog">
      <card :loading="loading" rounded>
        <card-header class="mb-1">
          <h2 class="mr-auto">Make a offer</h2>
          <button-icon :icon="icons.close" @click.native="close" />
        </card-header>
        <card-body>
          <template v-if="step === 1">
            <app-alert type="info" :alert.sync="alert" class="mb-2"></app-alert>
            <div class="make-offer__header mb-2">
              <h5>Select the item you want to swap</h5>
              <button-primary
                label="Create Listing"
                variant="primary"
                size="md"
                to="/new"
              />
            </div>
            <search-bar-input v-model="search" />
            <div class="make-offer__content">
              <div class="row">
                <div
                  class="col-12"
                  v-for="item in items"
                  :key="item.id"
                  @click="selectItem(item)"
                >
                  <message-offer-item
                    :class="
                      selected && selected.id === item.id
                        ? 'offer-selected'
                        : ''
                    "
                    :title="item.title"
                    :body="item.body"
                    :image="item.photos[0].securedUrl"
                  />
                </div>
              </div>
            </div>
            <div class="card__action">
              <button-primary
                label="Next"
                class="ml-auto"
                variant="primary"
                size="md"
                @click.native="next"
              />
            </div>
          </template>

          <template v-if="step === 2">
            <div class="row">
              <div class="col-12">
                <h5 class="heading--secondary mb-1">Selected item to swap</h5>
                <message-offer-item
                  :title="selected.title"
                  :body="selected.body"
                  :image="selected.photos[0].securedUrl"
                />
              </div>
              <div class="col-12"></div>
            </div>
            <div class="make-offer__header"></div>
            <div class="make-offer__content">
              <div class="row">
                <div class="col-12">
                  <h5 class="heading--secondary mt-2 mb-1">
                    Message Introduction
                  </h5>
                  <input-field textarea placeholder="Send Message" />
                </div>
              </div>
            </div>
            <div class="card__action">
              <button @click="back">Back</button>
              <button-primary
                class="ml-auto"
                label="Send Offer"
                variant="primary"
                size="md"
                @click.native="onSave"
              /></div
          ></template>
        </card-body>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiCamera, mdiClose } from "@mdi/js";
import { types } from "@/store/types";
import postsServices from "@/services/posts";
import InputField from "@/components/inputs/InputField";
export default {
  components: { InputField },
  props: {
    toggleModal: Function,
  },
  data() {
    return {
      items: [],
      loading: false,
      search: "",
      selected: null,
      step: 1,
      icons: {
        close: mdiClose,
        camera: mdiCamera,
      },
      alert: {
        message: "",
        show: false,
      },
    };
  },
  watch: {
    search() {
      this.fetchItems();
    },
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      console.log(this.search);
      const response = await postsServices.getCurrentUserPosts({
        search: this.search,
      });
      const items = response.posts;
      console.log(items);

      this.items = items;

      this.loading = false;
    },

    close() {
      this.toggleModal(false);
    },

    back() {
      this.step = 1;
    },

    next() {
      if (!this.selected) {
        return (this.alert = {
          message: "Please select a post",
          show: true,
        });
      }
      this.step = 2;
    },

    selectItem(item) {
      this.selected = item;
    },

    submit() {},
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style lang="scss"></style>
