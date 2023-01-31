<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<template>
  <div class="card">
    <img class="card__img" src="src/assets/images/cirilla.png" alt="ciri" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  width: 31.3%;
  height: 18.9vw;
  border-radius: 2vw;
  &__img {
    width: 100%;
    border-radius: 1vw;
    &:hover {
      box-shadow: 0px 0px 0px 3px rgba($color: #fe9902, $alpha: 1);
    }
  }

  &:hover {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 0.5), -17px 0 15px -17px rgba($color: #fe9902, $alpha: 0.5),
        17px 0 17px -17px rgba($color: #fe9902, $alpha: 0.5), 0 0 15px rgba($color: #fe9902, $alpha: 0.5);
    }
    50% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 1), -17px 0 17px -17px rgba($color: #fe9902, $alpha: 1),
        17px 0 17px -17px rgba($color: #fe9902, $alpha: 1), 0 0 15px rgba($color: #fe9902, $alpha: 1);
    }
    100% {
      box-shadow: 0 1px 4px rgba($color: #fe9902, $alpha: 0.5), -17px 0 17px -17px rgba($color: #fe9902, $alpha: 0.5),
        17px 0 17px -17px rgba($color: #fe9902, $alpha: 0.5), 0 0 15px rgba($color: #fe9902, $alpha: 0.5);
    }
  }
}
</style>
