<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import LeaderOfFraction from '@/components/deck-builder-view/LeaderOfFraction.vue';
import type Card from '@/interfaces/card';
import { useGameStore } from '@/stores/GameStore';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  data() {
    return {
      error: false,
      currentLeader: this.leadersCards[0] as Card,
    };
  },
  methods: {
    changeSelectedLeader(data: Card) {
      this.currentLeader = data;
    },
    startGame() {
      const checkCards = this.deckInformation.find((item) => item.error === true);

      if (!checkCards) {
        this.setFraction(this.currentFraction);
        this.setSelectedLeader(this.currentLeader);
        this.setHand(this.selectedCards);
      }
    },
    ...mapActions(useGameStore, {
      setHand: 'setHand',
      setSelectedLeader: 'setSelectedLeader',
      setFraction: 'setFraction',
    }),
  },
  computed: {
    deckInformation() {
      return [
        {
          text: 'Карты в колоде',
          img: 'src/assets/images/filter/board_cards.png',
          count: this.selectedCards.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0),
        },
        {
          text: 'Карты отрядов',
          img: 'src/assets/images/filter/melee_tan.png',
          maxCount: 22,
          count: this.selectedCards.reduce((acc, item) => {
            return item.type === 'usual' || item.type === 'hero' ? acc + item.quantity : acc;
          }, 0),
          error:
            this.selectedCards.reduce((acc, item) => {
              return item.type === 'usual' || item.type === 'hero' ? acc + item.quantity : acc;
            }, 0) < 22
              ? true
              : false,
        },
        {
          text: 'Специальные карты',
          img: 'src/assets/images/filter/sky_tan.png',
          maxCount: 10,
          count: this.selectedCards.reduce((acc, item) => {
            return item.type === 'special' ? acc + item.quantity : acc;
          }, 0),
          error:
            this.selectedCards.reduce((acc, item) => {
              return item.type === 'special' ? acc + item.quantity : acc;
            }, 0) > 10
              ? true
              : false,
        },
        {
          text: 'Общая сила карт отрядов',
          img: 'src/assets/images/filter/melee_ranged.png',
          count: this.selectedCards.reduce((acc, item) => {
            return item.power ? acc + item.power * item.quantity : acc;
          }, 0),
        },
        {
          text: 'Герои',
          img: 'src/assets/images/filter/hero_tan.png',
          count: this.selectedCards.reduce((acc, item) => {
            return item.type === 'hero' ? acc + item.quantity : acc;
          }, 0),
        },
      ];
    },
    filterLeaders() {
      return this.leadersCards.filter((item) => item.type === 'leader' && item.fractionId === this.currentFraction);
    },
    ...mapState(useGameStore, {
      hand: 'hand',
      selectLeader: 'selectLeader',
      fraction: 'fraction',
    }),
  },
  components: {
    LeaderOfFraction,
  },
  props: {
    currentFraction: {
      type: Number,
      required: true,
    },
    leadersCards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    selectedCards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="info">
    <div class="leader">
      <p class="leader__text">Лидер</p>
      <LeaderOfFraction @selectedLeader="changeSelectedLeader" :leadersCards="filterLeaders" />
    </div>
    <div class="deck__info">
      <div v-for:="deckInfo in deckInformation">
        <p class="deck__text">{{ deckInfo.text }}</p>
        <div class="deck__numbers">
          <img class="deck__img" :src="deckInfo.img" draggable="false" />
          <p :class="{ error: deckInfo.error }">
            {{ deckInfo.maxCount ? `${deckInfo.count}/${deckInfo.maxCount}` : deckInfo.count }}
          </p>
        </div>
      </div>
    </div>
    <button class="start__game" @click="startGame">Начать игру</button>
  </div>
</template>

<style lang="scss" scoped>
.info {
  width: 20%;
  height: 100%;
  color: #9b763a;
  display: flex;
  flex-direction: column;
}

.leader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25%;
  gap: 1vw;
  height: 37%;

  &__text {
    font-size: 1.2vw;
  }
}

.deck {
  &__info {
    margin-top: 1vw;
    font-size: 1.1vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.1vw;
  }

  &__img {
    width: 2vw;
    height: 2.5vw;
    object-fit: contain;
  }

  &__numbers {
    display: flex;
    gap: 0.5vw;
    justify-content: center;
    align-items: center;

    .error {
      color: red;
    }
  }

  &__text {
    color: #b8b8b8;
  }
}

.start__game {
  color: #fefefe;
  background-color: rgba($color: #000000, $alpha: 0.2);
  font-size: 1.2vw;
  border: 0.1vw black solid;
  border-radius: 0.2vw;
  margin-top: 1.5vw;
  align-self: center;

  &:hover {
    color: #fe9902;
    animation: pulse 2s infinite;
  }
}
</style>
