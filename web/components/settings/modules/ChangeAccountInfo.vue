<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <app-alert :alert.sync="alert" />
        <h2 class="heading">Change Account Information</h2>
        <p class="paragraph">Update your exisisting account Information.</p>
      </div>

      <div class="content__action">
        <button-primary
          v-if="!show"
          size="sm"
          label="Edit"
          @click.native="show = true"
        />
      </div>
    </div>

    <div v-if="show" class="content__main">
      <div class="row">
        <div class="col-8">
          <input-field
            :value="account.firstname"
            label="First Name"
            id="firstname"
            name="firstname"
          ></input-field>
        </div>
        <div class="col-8 mt-2">
          <input-field
            :value="account.lastname"
            label="Last Name"
            id="firstname"
            name="firstname"
          ></input-field>
        </div>
        <div class="col-8 mt-2 d-flex">
          <button-primary
            class="btn--flat"
            color="light-gray"
            label="Close"
            @click.native="show = false"
            name="login"
            size="md"
          />
          <button-primary
            class="ml-auto"
            label="Update"
            type="submit"
            name="login"
            size="md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
export default {
  data() {
    return {
      show: false,
      alert: {},
    };
  },

  computed: {
    account() {
      return this.$store.state.userSettings.general.profile;
    },
  },

  methods: {
    onChange(key, value) {
      this.$store.commit(
        "userSettings/" + types.mutations.SET_GENERAL_INFO,
        {}
      );
    },
  },
};
</script>

<style>
</style>