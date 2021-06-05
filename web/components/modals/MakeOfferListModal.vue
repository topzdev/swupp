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
            <validation-observer ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submit)">
                <div class="row">
                  <div class="col-12">
                    <h5 class="heading--secondary mb-1">
                      Selected item to swap
                    </h5>
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
                      <input-field
                        v-model="text"
                        textarea
                        name="Message"
                        :rules="rules.text"
                        placeholder="Send Message"
                      />
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
                    @click.native="submit"
                  />
                </div>
              </form>
            </validation-observer>
          </template>
        </card-body>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiCamera, mdiClose } from "@mdi/js";
import { types } from "@/store/types";
import tradeServices from "@/services/trades";
import postsServices from "@/services/posts";
import InputField from "@/components/inputs/InputField";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: { InputField, ValidationProvider, ValidationObserver },
  props: {
    toggleModal: Function,
    postId: [Number, String],
  },
  data() {
    return {
      items: [],
      rules: {
        text: "required",
      },
      loading: false,
      search: "",
      text: "",
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

    async next() {
      if (!this.selected) {
        return (this.alert = {
          message: "Please select a post",
          show: true,
        });
      }

      const response = await tradeServices.isTradeExist({
        postId: this.postId,
        offerId: this.selected.id,
      });

      console.log(response, {
        postId: this.postId,
        offerId: this.selected.id,
      });

      if (response) {
        const self = this;
        this.$store.dispatch(types.actions.SHOW_DIALOG, {
          title: "Offer Already Exist",
          message: "Click Yes to view the offer",
          yesLabel: "Yes",
          noLabel: "Close",
          yesFunction: async () => {
            self.$router.push(`/trade?id=${response.id}`);
          },
        });
      } else {
        this.step = 2;
      }
    },

    selectItem(item) {
      this.selected = item;
    },

    reset() {
      this.text = "";
      this.step = 1;
      this.selected = null;
    },

    async submit() {
      this.loading = true;
      try {
        const response = await tradeServices.createTradeRoom({
          postId: this.postId,
          offerId: this.selected.id,
          message: this.text,
        });
        console.log(response);
        if (response.success) {
          this.$router.push(
            `/trade?id=${response.data.tradeId}&mid=${response.data.messageId}`
          );
          this.reset();
        }
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style lang="scss"></style>
