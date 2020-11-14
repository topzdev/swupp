<template>
  <div>
    <Nuxt keep-alive />
    <app-dialog />
    <app-snackbar />
  </div>
</template>

<script>
import AppSnackbar from "@/components/snackbars/Snackbar";
import AppDialog from "@/components/dialogs/Dialog";
import Vue from "vue";
import authMixin from "@/mixins/auth";
Vue.mixin(authMixin);

export default {
  components: {
    AppSnackbar,
    AppDialog,
  },
};
</script>
