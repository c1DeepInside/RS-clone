<script lang="ts">
import { defineComponent } from 'vue';
import CardInfoCopmponent, { CardLayoutType } from '@/components/common/CardInfoComponent.vue';
import type Card from '@/interfaces/card';
export default defineComponent({
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      cardLayoutType: CardLayoutType,
      cards: [
        {
          name: 'Рубака из Кринфрида',
          type: 'usual',
          image: '/src/assets/images/realms_blue_stripes.jpg',
          description: 'Записались мы на войну, а то с чудищами последнее время нам не шибко везет.',
          fractionId: 1,
          ability: 'bond',
          fieldType: ['melee'],
          power: 5,
          quantity: 3,
        },
        {
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
      ] as Card[],
    };
  },
  components: {
    CardInfoCopmponent,
  },
});
</script>

<template>
  <div class="card">
    <CardInfoCopmponent :card="cards[idx]" :layout-type="cardLayoutType.AVERAGE" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  position: relative;
  width: 31.3%;
  height: 18.9vw;
  border-radius: 2vw;

  &:hover {
    animation: pulse 2s infinite;
  }
}
</style>
