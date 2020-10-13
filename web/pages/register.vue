<template>
  <div>
    <div class="bg--abstract-1"></div>
    <div class="container">
      <div class="row">
        <div class="col-s6"></div>
        <div class="col s6 register__form">
          <register-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/RegisterForm";
export default {
  components: { RegisterForm },
};
</script>

<style>
</style>