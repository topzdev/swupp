<template>
  <div>
    <app-connection />
    <header>
      <!-- <client-only> -->
      <app-navbar />
      <!-- </client-only> -->
    </header>

    <main>
      <slot></slot>
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