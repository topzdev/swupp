<template>
  <div v-if="show" class="make-offer">
    <div class="dialog">
      <card :loading="loading" rounded>
        <card-header class="mb-1">
          <h2 class="mr-auto">Make a offer</h2>
          <button-icon :icon="icons.close" @click.native="close" />
        </card-header>
        <card-body> </card-body>
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
    },
  },
};
</script>

<style lang="scss"></style>
