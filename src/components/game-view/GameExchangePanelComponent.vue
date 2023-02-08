<script lang="ts">
import { defineComponent } from 'vue';
import SliderComponent from '@/components/common/SliderComponent.vue';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      show: true,
      cards: [
        {
          id: 1,
          name: 'Рубака из Кринфрида',
          type: 'usual',
          image: '/src/assets/images/realms_blue_stripes.jpg',
          description: 'Записались мы на войну, а то с чудищами последнее время нам не шибко везет.',
          fractionId: 0,
          ability: 'bond',
          fieldType: ['melee', 'range'],
          power: 5,
          quantity: 3,
        },
        {
          id: 2,
          name: 'Ливень',
          type: 'special',
          image: '/src/assets/images/weather_rain.jpg',
          description: 'В этом краю даже дождь смердит мочой.',
          fractionId: null,
          ability: 'rain',
          fieldType: ['weather'],
          power: null,
          quantity: 2,
        },
        {
          id: 3,
          name: 'Цирилла',
          type: 'hero',
          image: '/src/assets/images/neutral_ciri.jpg',
          description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 4,
          name: 'Фольтест Король Темерии',
          type: 'leader',
          image: '/src/assets/images/realms_foltest_silver.jpg',
          description: 'Родственная любовь? Что может быть прекраснее, чем сестра на коленях брата?',
          fractionId: null,
          ability: null,
          fieldType: ['leader'],
          power: null,
          quantity: 1,
        },
        {
          id: 5,
          name: 'Фольтест Предводитель Севера',
          type: 'leader',
          image: '/src/assets/images/realms_foltest_gold.jpg',
          description: 'Проклятая политика... Я доверяю только своему оружию.',
          fractionId: null,
          ability: null,
          fieldType: ['leader'],
          power: null,
          quantity: 1,
        },
        {
          id: 6,
          name: 'Следопыт из Дол Блатанны',
          type: 'usual',
          image: '/src/assets/images/scoiatael_dol_infantry_1.jpg',
          description: 'Нюх у них как у гончих. Глаза, как у орла. А сердце изо льдаю',
          fractionId: 1,
          ability: 'agile',
          fieldType: ['melee', 'range'],
          power: 6,
          quantity: 3,
        },
      ] as Card[],
    };
  },
  components: {
    SliderComponent,
  },
});
</script>

<template>
  <div v-if="show" class="choice-panel">
    <div @click="show = !show" class="choice-panel__title">
      Выберите, какую карту обменять.
      <span class="choice-panel__count-carts">0/2</span>
    </div>
    <SliderComponent :cards="cards" />
  </div>
</template>

<style lang="scss" scoped>
.choice-panel {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 40;
  background-color: rgba(58, 41, 25, 0.486);

  &__title {
    margin-top: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 70px;
    font-size: 26px;
    letter-spacing: -1px;
    background-color: $BLACK_COLOR_MAIN;
    color: $TAN_COLOR;
  }

  &__cards {
    margin: 0 auto;
    margin-top: 5px;
  }
}
</style>
