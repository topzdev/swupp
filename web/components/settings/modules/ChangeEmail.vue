<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <h2 class="heading">Change Email Address</h2>
        <p class="paragraph">
          <!-- Changing your email address will affec -->
        </p>
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
        <div class="col-8 mb-2">
          <input-field
            v-model="account.email"
            label="New email address"
            id="email"
            name="email"
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
            disabled
            label="Change"
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
export default {
  data() {
    return {
      show: false,
      account: {
        email: "",
      },
    };
  },

  methods: {
    changeEmail() {
      // your code here
    },
  },
};
</script>

<style>
</style>