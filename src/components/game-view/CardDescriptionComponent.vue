<script lang="ts">
import type Card from '@/interfaces/card';
import { descriptionAbilities } from '@/utilits/descriptionCard';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  data() {
    return {
      description: descriptionAbilities,
    };
  },
  components: {},
  props: {
    card: Object as PropType<Card>,
  },
  methods: {
    getTitleCard(): string {
      if (this.card?.type === 'hero' && this.card?.ability === null) return 'Герой';
      return this.description[this.card?.ability!].title;
      //TODO: add description leaders
    },
    getDescriptionCard(): string {
      if (this.card?.type === 'hero' && this.card?.ability === null) {
        return 'Не подвергается воздействию каких-либо карт или умений';
      }
      return this.description[this.card?.ability!].description;
      //TODO: add description leaders
    },
  },
});
</script>
<template>
  <div class="card-view__information information-card">
    <div
      class="information-card__img"
      :style="{
        backgroundImage: `url('/src/assets/images/card_ability_bond.png')`,
      }"
    ></div>
    <h2 class="information-card__title">{{ getTitleCard() }}</h2>
    <p class="information-card__descr">{{ getDescriptionCard() }}</p>
  </div>
</template>
<style lang="scss" scoped>
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
