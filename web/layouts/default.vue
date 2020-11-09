<template>
  <div>
    <Nuxt />
    <app-dialog />
    <app-snackbar />
  </div>
</template>

<script>
import AppSnackbar from "@/components/snackbars/Snackbar";
import AppDialog from "@/components/dialogs/Dialog";
export default {
  components: {
    AppSnackbar,
    AppDialog,
  },
};
</script>
