<template>
  <div>
    <header>
      <app-navbar />
    </header>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import AppNavbar from "@/components/navbars/AppNavbar";
export default {
  props: {
    title: {
      type: String,
      default: "Swupp",
    },
    description: String,
  },
  head() {
    return {
      title: this.title,
      titleTemplate: "%s - Swupp",
    };
  },
  components: {
    AppNavbar,
  },
};
</script>

<style>
</style>