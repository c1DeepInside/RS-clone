<script lang="ts">
import { defineComponent } from 'vue';
import FractionChoose, { type Filters } from '@/components/deck-builder-view/FractionChoose.vue';
import CardCollection from '@/components/deck-builder-view/CardsCollection.vue';
import InfoCollection from '@/components/deck-builder-view/InfoCollection.vue';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      collectionFilter: 'all' as Filters,
      deckFilter: 'all' as Filters,
      currentFraction: 0,
      collectionCards: [
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
          name: 'Фольтест',
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
          name: 'Предводитель',
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
          name: 'Темерии',
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
        {
          name: 'Цирилла 2',
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
          name: 'Король Темерии',
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
          name: 'Предводитель Севера',
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
          name: 'Фольтест Севера',
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
          name: 'Севера',
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
      deckCards: [] as Card[],
    };
  },
  components: {
    FractionChoose,
    CardCollection,
    InfoCollection,
  },
  methods: {
    changeFilterCollection(data: Filters) {
      this.collectionFilter = data;
    },
    changeFilterDeck(data: Filters) {
      this.deckFilter = data;
    },
    changeFraction(data: number) {
      this.currentFraction = data;
    },
    changeCollectionCards(data: Card) {
      const index = this.collectionCards.indexOf(data);
      if (this.collectionCards[index].quantity === 1) {
        const existingCardIndex = this.deckCards.findIndex((item) => item.name === data.name);
        if (existingCardIndex !== -1) {
          this.deckCards[existingCardIndex].quantity++;
        } else {
          this.deckCards.push(data);
        }
        this.collectionCards.splice(index, 1);
      } else {
        this.collectionCards[index].quantity--;
        const existingCardIndex = this.deckCards.findIndex((item) => item.name === data.name);
        if (existingCardIndex !== -1) {
          this.deckCards[existingCardIndex].quantity++;
        } else {
          const cardCopy = { ...data };
          cardCopy.quantity = 1;
          this.deckCards.push(cardCopy);
        }
      }
    },
    changeDeckCards(data: Card) {
      const index = this.deckCards.indexOf(data);
      if (this.deckCards[index].quantity === 1) {
        const existingCardIndex = this.collectionCards.findIndex((item) => item.name === data.name);
        if (existingCardIndex !== -1) {
          this.collectionCards[existingCardIndex].quantity++;
        } else {
          this.collectionCards.push(data);
        }
        this.deckCards.splice(index, 1);
      } else {
        this.deckCards[index].quantity--;
        const existingCardIndex = this.collectionCards.findIndex((item) => item.name === data.name);
        if (existingCardIndex !== -1) {
          this.collectionCards[existingCardIndex].quantity++;
        } else {
          const cardCopy = { ...data };
          cardCopy.quantity = 1;
          this.collectionCards.push(cardCopy);
        }
      }
    },
  },
});
</script>

<template>
  <video autoplay muted loop class="background">
    <source src="@/assets/videos/backFog.mp4" type="video/mp4" />
  </video>
  <main class="main">
    <div class="UI">
      <div class="fraction">
        <FractionChoose
          @currentFraction="changeFraction"
          :collectionFilter="collectionFilter"
          :deckFilter="deckFilter"
        />
      </div>
      <div class="builder">
        <CardCollection
          @filterChanged="changeFilterCollection"
          @selectedCard="changeCollectionCards"
          :currentFraction="currentFraction"
          :gwentCards="collectionCards"
        />
        <InfoCollection :currentFraction="currentFraction" :selectedCards="deckCards" />
        <CardCollection
          @filterChanged="changeFilterDeck"
          @selectedCard="changeDeckCards"
          :currentFraction="currentFraction"
          :gwentCards="deckCards"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
$DECK_COLOR: #4d392c;

html {
  &::-webkit-scrollbar {
    display: none;
  }
  font-weight: 300;

  background-color: #171617;
}

.main {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.7);
  width: 100vw;
  height: calc(100vw * 9 / 16);
}

.background {
  z-index: 0;
  width: 100vw;
  height: calc(100vw * 9 / 16);
  position: absolute;
}

.UI {
  width: 85%;
  height: 90%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.fraction {
  display: flex;
  justify-content: space-between;
  height: 20%;

  &__choose {
    flex-grow: 1;
  }
}

.builder {
  display: flex;
  height: 90%;
}
</style>
