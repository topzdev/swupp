<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <h2 class="heading">Deactivate Account</h2>
        <p class="paragraph">
          Temporarily disable your account to avoid this app for length of time.
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
          <password-field
            v-model="account.password"
            label="Password"
            id="password"
            name="password"
          ></password-field>
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
            label="Deactivate"
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
        password: "",
      },
    };
  },

  methods: {
    deactivate() {
      // your code here
    },
  },
};
</script>

<style>
</style>