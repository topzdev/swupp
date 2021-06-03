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
            <h5>Select item to swap</h5>
          </div>
          <div class="make-offer__content">
            <div class="message-offer">
              <div class="message-offer__photo"><profile-photo /></div>
              <div class="message-offer__content">
                <h5>Swapping my GPU</h5>
                <span>swapping my gpu to you</span>
              </div>
            </div>
            <div class="make-offer__message">
              <h5>Message Introduction</h5>
              <input-field />
            </div>
          </div>
          <div class="message-offer__buttons">
            <button>Back</button>
            <button-primary
              label="Send Offer"
              variant="primary"
              size="md"
              @click.native="onSave"
            />
          </div>
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
  methods: {
    close() {
      this.$store.commit("profile/" + types.mutations.SET_PROFILE_MODAL, false);
    }
  }
};
</script>

<style lang="scss"></style>
