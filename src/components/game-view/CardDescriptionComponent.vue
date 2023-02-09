<script lang="ts">
import type Card from '@/interfaces/card';
import { cardAbilitiesImg } from '@/utilits/cardBuildImgs';
import { descriptionAbilities } from '@/utilits/descriptionCard';
import { leaderDescription } from '@/utilits/leaderDescription';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  data() {
    return {
      description: descriptionAbilities,
      leaderDescription: leaderDescription,
      abilityImg: cardAbilitiesImg,
    };
  },
  components: {},
  props: {
    card: Object as PropType<Card>,
  },
  methods: {
    getTitleCard(): string {
      if (this.card?.type === 'hero' && this.card?.ability === null) return 'Герой';

      if (this.card?.type === 'leader') {
        return this.card.name;
      }

      return this.description[this.card?.ability!].title;
    },
    getDescriptionCard(): string {
      if (this.card?.type === 'hero' && this.card?.ability === null) {
        return 'Не подвергается воздействию каких-либо карт или умений';
      }

      if (this.card?.type === 'leader') {
        return this.leaderDescription[this.card.name];
      }

      return this.description[this.card?.ability!].description;
    },
  },
});
</script>
<template>
  <div class="card-view__information information-card">
    <div
      class="information-card__img"
      :style="{
        backgroundImage: ``,
      }"
    ></div>
    <img v-if="card?.ability !== null" :src="abilityImg[card?.ability!]" class="information-card__ability-image" />
    <h2 class="information-card__title">{{ getTitleCard() }}</h2>
    <p class="information-card__descr">{{ getDescriptionCard() }}</p>
  </div>
</template>
<style lang="scss" scoped>
.information-card {
  height: 7.87vw;
  width: 29.12vw;
  background-color: rgba($color: #101010, $alpha: 1);
  border: 0.1vw solid $GOLDEN_COLOR;
  border-width: 0.1vw 0;
  color: $TAN_COLOR;
  text-align: center;
  pointer-events: none;
  position: relative;

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

  &__ability-image {
    position: absolute;
    top: 1vw;
    left: 1vw;
    width: 2vw;
  }
}
</style>
