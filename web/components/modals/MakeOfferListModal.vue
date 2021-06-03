<template>
  <div v-if="show" class="make-offer">
    <div class="dialog">
      <card :loading="loading" rounded>
        <card-header class="mb-1">
          <h2 class="mr-auto">Make a offer</h2>
          <button-icon :icon="icons.close" @click.native="close" />
        </card-header>
        <card-body>
          <div class="make-offer__header">
            <h5>Select the item you want to swap</h5>
            <button-primary
              label="Create Listing"
              variant="primary"
              size="md"
            />
          </div>
          <search-bar-input />
          <div class="make-offer__content">
            <div class="message-offer">
              <div class="message-offer__photo"><profile-photo /></div>
              <div class="message-offer__content">
                <h5>Swapping my GPU</h5>
                <span>swapping my gpu to you</span>
              </div>
            </div>
            <div class="message-offer">
              <div class="message-offer__photo"><profile-photo /></div>
              <div class="message-offer__content">
                <h5>Swapping my GPU</h5>
                <span>swapping my gpu to you</span>
              </div>
            </div>
            <div class="message-offer">
              <div class="message-offer__photo"><profile-photo /></div>
              <div class="message-offer__content">
                <h5>Swapping my GPU</h5>
                <span>swapping my gpu to you</span>
              </div>
            </div>
          </div>
          <div class="message-offer__next">
            <button-primary label="Next" variant="primary" size="md" />
          </div>
          <send-offer-modal />
        </card-body>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiCamera, mdiClose } from "@mdi/js";
import parseBlobToData from "~/utils/parseBlobToData";
import { types } from "@/store/types";
export default {
  data() {
    return {
      loading: false,
      icons: {
        close: mdiClose,
        camera: mdiCamera
      }
    };
  },
  computed: {
    show() {
      return this.$store.state.profile.modals.changePhotos;
    }
  },

  methods: {
    close() {
      this.$store.commit("profile/" + types.mutations.SET_PROFILE_MODAL, false);
    }
  }
};
</script>

<style lang="scss"></style>
