<script lang="ts">
import type Card from '@/interfaces/card';
import { defineComponent, type PropType } from 'vue';
import cardInfoComponent from '@/components/common/CardInfoComponent.vue';

export default defineComponent({
  data() {
    return {
      isDescription: true,
    };
  },
  props: {
    selectedItem: {
      type: Object as PropType<Card>,
      default: () => {
        return {
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        };
      },
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    cardInfoComponent,
  },
});
</script>

<template>
  <div :class="['card-view', { 'card-view-true': isShow }]">
    <div class="card__wrap">
      <cardInfoComponent :card="selectedItem" :layoutType="2" />
    </div>
    <div v-if="isDescription" class="card-view__information information-card">
      <div
        class="information-card__img"
        :style="{
          backgroundImage: `url('')`,
        }"
      ></div>
      <h2 class="information-card__title">Прочная связь</h2>
      <p class="information-card__descr">Выложите рядом с картой с тем же названием, чтобы удвоить силу обеих карт.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-view {
  .card__wrap {
    position: absolute;
    top: 12vw;
    left: 80vw;
    width: 16.1vw;
  }
  position: absolute;
  top: 0;
  z-index: 90;
  visibility: hidden;
  opacity: 0;

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
</style>
