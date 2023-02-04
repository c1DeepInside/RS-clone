<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isDescription: true,
    };
  },
  props: {
    selectedItem: {
      type: Number,
      default: -1,
    },
  },
});
</script>

<template>
  <div :class="['card-view', { 'card-view-true': selectedItem !== -1 }]">
    <div
      class="card-view__img"
      :style="{
        backgroundImage: `url('/src/assets/images/realms_blue_stripes_info.jpg')`,
      }"
    ></div>
    <div v-if="isDescription" class="card-view__information information-card">
      <div
        class="information-card__img"
        :style="{
          backgroundImage: `url('/src/assets/images/card_ability_bond.png')`,
        }"
      ></div>
      <h2 class="information-card__title">Tight Bond</h2>
      <p class="information-card__descr">
        Place next to a card with the same name to double the strength of both cards.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-view {
  position: absolute;
  top: 0;
  z-index: 90;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;

  &-true {
    visibility: visible;
    opacity: 1;
  }

  &__img {
    position: absolute;
    top: 12vw;
    left: 80vw;
    height: 30.4vw;
    width: 16.1vw;
    border-radius: 1vw;
    background-size: cover;
    background-position: center;
  }
}

.information-card {
  position: absolute;
  top: 43.1vw;
  left: 67.95vw;
  height: 7.87vw;
  width: 29.12vw;
  background-color: rgba($color: #101010, $alpha: 0.9);
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
