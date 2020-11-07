<template>
  <div>
    <Nuxt />
    <snackbar />
  </div>
</template>

<script>
import Snackbar from "@/components/snackbars/Snackbar";
export default {
  components: {
    Snackbar,
  },
};
</script>
