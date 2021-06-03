<template>
  <div class="message-header row">
    <div class="message-header__photo"><profile-photo /></div>
    <div class="column">
      <div class="message-header__content">
        <p><span>Jm Figueroa</span> want to swap</p>
      </div>
      <div class="message-header__trade row">
        <img src="../../assets/img/sample/iphone.jpg" />
        <span>Iphone X with 100% battery...</span>
        <img class="arrow" src="../../assets/img/sample/arrow.png" />
        <div class="message-swap row">
          <img class="swap-image" src="../../assets/img/sample/gpu.jpg" />
          <span>Selling GPU</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePassword from "./modules/ChangePassword.vue";
export default {
  components: { ChangePassword }
};
</script>

<style></style>
