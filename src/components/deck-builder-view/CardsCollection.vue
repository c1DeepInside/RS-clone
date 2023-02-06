<script lang="ts">
import { defineComponent } from 'vue';
import CardFromCollection from '@/components/deck-builder-view/CardFromCollection.vue';
import CardInfoCopmponent, { CardLayoutType } from '@/components/common/CardInfoComponent.vue';
import type Card from '@/interfaces/card';
interface Filter {
  id: number;
  name: string;
  img: string;
  imgWhite: string;
}

export default defineComponent({
  data() {
    return {
      filters: [
        {
          id: 1,
          name: 'all',
          img: 'src/assets/images/filter/board_cards.png',
          imgWhite: 'src/assets/images/filter/board_cards_white.png',
        },
        {
          id: 2,
          name: 'melee',
          img: 'src/assets/images/filter/melee_tan.png',
          imgWhite: 'src/assets/images/filter/melee_white.png',
        },
        {
          id: 3,
          name: 'range',
          img: 'src/assets/images/filter/ranged_tan.png',
          imgWhite: 'src/assets/images/filter/ranged_white.png',
        },
        {
          id: 4,
          name: 'siege',
          img: 'src/assets/images/filter/siege_tan.png',
          imgWhite: 'src/assets/images/filter/siege_white.png',
        },
        {
          id: 5,
          name: 'hero',
          img: 'src/assets/images/filter/hero_tan.png',
          imgWhite: 'src/assets/images/filter/hero_white.png',
        },
        {
          id: 6,
          name: 'weather',
          img: 'src/assets/images/filter/sky_tan.png',
          imgWhite: 'src/assets/images/filter/sky_white.png',
        },
        {
          id: 7,
          name: 'special',
          img: 'src/assets/images/filter/dummy_tan.png',
          imgWhite: 'src/assets/images/filter/dummy_white.png',
        },
      ] as Filter[],
      currFilter: 'all',

      cardLayoutType: CardLayoutType,
      cards: [
        {
          id: 0,
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
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
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
          id: 5,
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
          id: 6,
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
          id: 7,
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
          id: 8,
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
          id: 9,
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
          id: 10,
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
          id: 11,
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
          id: 12,
          name: 'Фольтест Предводитель Севера',
          type: 'usual',
          image: '/src/assets/images/realms_foltest_gold.jpg',
          description: 'Проклятая политика... Я доверяю только своему оружию.',
          fractionId: null,
          ability: null,
          fieldType: ['melee', 'range'],
          power: null,
          quantity: 1,
        },
      ] as Card[],
    };
  },
  components: {
    CardInfoCopmponent,
  },
  methods: {
    changeFilter(filter: Filter): void {
      this.currFilter = filter.name;
      this.$emit('filterChanged', this.currFilter);
    },
  },
  computed: {
    filteredCards() {
      if (this.currFilter === 'all') {
        return this.cards;
      } else if (this.currFilter === 'hero' || this.currFilter === 'special') {
        return this.cards.filter((card) => card.type === this.currFilter);
      }
      return this.cards.filter((card) => card.fieldType.some((type) => type === this.currFilter));
    },
  },
});
</script>

<template>
  <div class="collection">
    <div class="collection__filter">
      <img
        class="filter__img"
        v-for:="filter in filters"
        :src="currFilter === filter.name ? filter.imgWhite : filter.img"
        @click="changeFilter(filter)"
        alt="сортировка"
        draggable="false"
      />
    </div>
    <div class="cards">
      <div class="card" v-for="item in filteredCards" :key="item.id">
        <CardInfoCopmponent :card="cards[item.id]" :layout-type="cardLayoutType.AVERAGE" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 40%;
  height: 100%;
  &__filter {
    height: 8%;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px rgba($color: #4d392c, $alpha: 0.5) solid;
  }
}

.filter__img {
  width: 10%;
  transition: 0.1s;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }
}

.cards {
  margin-top: 1%;
  height: 89%;
  display: flex;
  flex-wrap: wrap;
  gap: 2% 3%;
  padding: 3%;
  padding-top: 2%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.4vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: #4d392c, $alpha: 0.2);
    border: 1px rgba($color: #4d392c, $alpha: 0.6) solid;
    border-radius: 20px;
  }
}

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
