<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import LeaderOfFraction from '@/components/deck-builder-view/LeaderOfFraction.vue';
import type Card from '@/interfaces/card';
import { useGameStore } from '@/stores/GameStore';
import { mapActions, mapState } from 'pinia';
import router from '@/router';
import { getRandom } from '@/utilits/getRandom';

import { v4 as uuidv4 } from 'uuid';
import type { IntRange } from '@/utilits/types';
import type { UserCard } from '@/interfaces/cardAPI';
import { updateUserCards } from '@/api/deckAPI';

export default defineComponent({
  data() {
    return {
      error: false,
      currentLeader: {} as Card,
      currentLeaderNorth: {} as Card,
      currentLeaderNilfgaard: {} as Card,
      currentLeaderScoiatel: {} as Card,
      currentLeaderMonsters: {} as Card,
      isShowSearch: false,
      isGameFind: false,
    };
  },
  methods: {
    changeFractionLeader(data: Card) {
      switch (this.currentFraction) {
        case 1:
          this.currentLeader = data;
          this.currentLeaderNorth = data;
          break;
        case 2:
          this.currentLeader = data;
          this.currentLeaderNilfgaard = data;
          break;
        case 3:
          this.currentLeader = data;
          this.currentLeaderScoiatel = data;
          break;
        case 4:
          this.currentLeader = data;
          this.currentLeaderMonsters = data;
          break;
      }
    },
    changeCurrentLeader() {
      switch (this.currentFraction) {
        case 1:
          this.currentLeader = this.currentLeaderNorth;
          break;
        case 2:
          this.currentLeader = this.currentLeaderNilfgaard;
          break;
        case 3:
          this.currentLeader = this.currentLeaderScoiatel;
          break;
        case 4:
          this.currentLeader = this.currentLeaderMonsters;
          break;
      }
    },
    listenSocket() {
      this.webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === 'game_found') {
          this.isGameFind = true;
          this.sendConnectInfo(data.session_info.user.username);
        }
        if (data.deck) {
          this.setConnectInfo(data);
          this.setFromPageToPage(true);
          router.push('/game');
        }
      };
    },
    async startGame() {
      this.changeCurrentLeader();
      if (Object.keys(this.currentLeader).length === 0) {
        this.currentLeader = this.leadersCards.find(
          (item) => item.type === 'leader' && item.fractionId === this.currentFraction
        ) as Card;
        this.changeFractionLeader(this.currentLeader);
      }
      const checkCards = this.deckInformation.find((item) => item.error === true);
      if (!checkCards) {
        this.setFraction(this.currentFraction as IntRange<1, 4>);
        this.setSelectedLeader(this.currentLeader);
        this.parseDeck(this.selectedCards);
        await updateUserCards(this.cardsForAPI, '7b605cfdafb649794fe9d95f5e1827f490e7ac50');
        this.setWebSocket('7b605cfdafb649794fe9d95f5e1827f490e7ac50');
        this.listenSocket();
        this.isShowSearch = true;
      }
    },
    parseDeck(cards: Card[]): Card[] {
      let finCards: Card[] = [];
      cards.forEach((card) => {
        for (let i = 0; i < card.quantity; i++) {
          const newCard = JSON.parse(JSON.stringify(card));
          newCard.quantity = 1;
          newCard.uuid = uuidv4();
          finCards.push(newCard);
        }
      });
      const indexes = getRandom(finCards.length);
      let sortCards: Card[] = [];
      indexes.forEach((index) => {
        sortCards.push(finCards[index]);
      });
      if (this.currentLeader.name === 'Францеска Финдабаир Маргаритка из Долин') {
        this.currentLeader.quantity = 0;
        this.setHand(sortCards.slice(0, 11));
        this.setDeck(sortCards.slice(11));
      } else {
        this.setHand(sortCards.slice(0, 10));
        this.setDeck(sortCards.slice(10));
      }
      return sortCards;
    },
    ...mapActions(useGameStore, {
      setDeck: 'setDeck',
      setSelectedLeader: 'setSelectedLeader',
      setFraction: 'setFraction',
      setHand: 'setHand',
      setDiscard: 'setDiscard',
      setWebSocket: 'setWebSocket',
      sendConnectInfo: 'sendConnectInfo',
      setConnectInfo: 'setConnectInfo',
      setFromPageToPage: 'setFromPageToPage',
    }),
  },
  computed: {
    ...mapState(useGameStore, {
      webSocket: 'webSocket',
    }),
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
    fractionLeader() {
      this.changeCurrentLeader();
      if (Object.keys(this.currentLeader).length === 0) {
        return this.leadersCards.find((item) => item.type === 'leader' && item.fractionId === this.currentFraction);
      }
      return this.currentLeader;
    },
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
    cardsForAPI: {
      type: Array as PropType<UserCard[]>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="info">
    <div class="leader">
      <p class="leader__text">Лидер</p>
      <LeaderOfFraction @selectedLeader="changeFractionLeader" :leader="fractionLeader" :leadersCards="filterLeaders" />
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
  <div v-if="isShowSearch" class="search__game">
    <div v-if="!isGameFind" class="spinner__wrap">
      <div class="spinner"></div>
      <p class="search__text">Поиск игры...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search__game {
  background-color: rgba($color: #000000, $alpha: 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;

  .spinner__wrap {
    position: absolute;
    top: 25vw;
    left: 43.2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
  }
  .search__text {
    color: white;
    font-size: 2vw;
    font-weight: 500;
  }
  .spinner {
    height: 5vw;
    width: 5vw;
    border: 0.7vw white solid;
    border-top: 0.7vw black solid;
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
}
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
