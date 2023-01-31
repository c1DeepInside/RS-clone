<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<template lang="">
  <div class="card">
    <img class="card__img" src="src/assets/images/cirilla.png" alt="ciri" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  width: 31.3%;
  position: relative;
  z-index: 2;
  &__img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 17px;

    &:hover {
      box-shadow: 0px 0px 0px 3px rgba($color: #fe9902, $alpha: 0.6);
    }
  }

  &:hover {
    border-radius: 17px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 0.5), -23px 0 20px -23px rgba($color: #fe9902, $alpha: 0.5),
        23px 0 20px -23px rgba($color: #fe9902, $alpha: 0.5), 0 0 40px rgba($color: #fe9902, $alpha: 0.5) inset;
    }
    50% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 1), -23px 0 20px -23px rgba($color: #fe9902, $alpha: 1),
        23px 0 20px -23px rgba($color: #fe9902, $alpha: 1), 0 0 40px rgba($color: #fe9902, $alpha: 1) inset;
    }
    100% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 0.5), -23px 0 20px -23px rgba($color: #fe9902, $alpha: 0.5),
        23px 0 20px -23px rgba($color: #fe9902, $alpha: 0.5), 0 0 40px rgba($color: #fe9902, $alpha: 0.5) inset;
    }
  }
}
</style>
