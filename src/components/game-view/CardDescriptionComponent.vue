<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<template>
  <div class="card-view__information information-card">
    <div
      class="information-card__img"
      :style="{
        backgroundImage: `url('/src/assets/images/card_ability_bond.png')`,
      }"
    ></div>
    <h2 class="information-card__title">Прочная связь</h2>
    <p class="information-card__descr">Выложите рядом с картой с тем же названием, чтобы удвоить силу обеих карт.</p>
  </div>
</template>
<style lang="scss">
.information-card {
  position: absolute;
  top: 43.1vw;
  left: 67.95vw;
  height: 7.87vw;
  width: 29.12vw;
  background-color: rgba($color: #101010, $alpha: 1);
  border: 0.1vw solid $GOLDEN_COLOR;
  border-width: 0.1vw 0;
  color: $TAN_COLOR;
  text-align: center;
  pointer-events: none;

  &__img {
    position: relative;
    top: 1vw;
    left: 0.9vw;
    width: 1.95vw;
    height: 1.95vw;
    background-size: cover;
    background-position: center;
  }

  &__title {
    height: 16%;
    width: 70%;
    position: relative;
    top: -0.5vw;
    left: 5vw;
    font-weight: 700;
    font-size: 1.2vw;
  }

  &__descr {
    width: 90%;
    height: 50%;
    position: relative;
    top: 0.5vw;
    left: 2vw;
    font-size: 1vw;
  }
}
</style>
