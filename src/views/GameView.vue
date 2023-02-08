<script lang="ts">
import { defineComponent } from 'vue';
import PlayerComponent from '@/components/game-view/PlayerComponent.vue';
import BoardComponent from '@/components/game-view/BoardComponent.vue';
import CardViewComponent from '@/components/game-view/CardViewComponent.vue';
import InformationBar from '@/components/game-view/InformationBar.vue';
import EndComponent from '@/components/game-view/EndComponent.vue';
import MusicComponent from '@/components/game-view/MusicComponent.vue';
import GameExchangePanelComponent from '@/components/game-view/GameExchangePanelComponent.vue';
import type Card from '@/interfaces/card';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';

export default defineComponent({
  data() {
    return {
      isPass: false,
      isGiveUpAnimation: false,
      isEnd: false,
      isFieldBlock: false,
      selectedCard: {
        name: 'Геральт из Ривии',
        type: 'hero',
        image: 'src/assets/images/neu_geralt.png',
        description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      } as Card,
      timer: 0,
      isShowCardView: false,
      weatherCards: [] as Card[],
      cards: [
        {
          id: 1,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 2,
          name: 'Цирилла',
          type: 'hero',
          image: 'src/assets/images/neutral_ciri.jpg',
          description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 3,
          name: 'Осадная башня',
          type: 'usual',
          image: 'src/assets/images/nor_siege_tower.png',
          description: 'Башня на колесах... Чего только люди не удумают!',
          fractionId: 0,
          ability: null,
          fieldType: ['siege'],
          power: 6,
          quantity: 1,
        },
        {
          id: 4,
          name: 'Ясное небо',
          type: 'special',
          image: 'src/assets/images/spc_rain.png',
          description: 'Дромил, солнце-то светит! Значит, и надежда есть...',
          fractionId: null,
          ability: 'clear',
          fieldType: ['weather'],
          power: null,
          quantity: 3,
        },
        {
          id: 5,
          name: 'Таинственный эльф',
          type: 'hero',
          image: 'src/assets/images/neu_avallach.png',
          description: 'Предсказывать не сложно. Искусство в том, чтобы предсказывать точно.',
          fractionId: null,
          ability: 'spy',
          fieldType: ['melee'],
          power: '0',
          quantity: 1,
        },
        {
          id: 6,
          name: 'Лекарь Бурой Хоругви',
          type: 'usual',
          image: 'src/assets/images/nor_banner_nurse.png',
          description: 'Шейте красно с красным, желтое с желтым, белое с белым...',
          fractionId: 0,
          ability: 'medic',
          fieldType: ['siege'],
          power: 5,
          quantity: 1,
        },
        {
          id: 7,
          name: 'Командирский рог',
          type: 'special',
          image: 'src/assets/images/spc_horn.png',
          description: 'Плюс один к морали, минус три к слуху.',
          fractionId: null,
          ability: 'horn',
          fieldType: ['boost'],
          power: null,
          quantity: 3,
        },
        {
          id: 8,
          name: 'Детмольд',
          type: 'usual',
          image: 'src/assets/images/nor_dethmold.png',
          description: 'Такими чарами выиграывают войны! Тысячи жертв в одну минуту!',
          fractionId: 0,
          ability: null,
          fieldType: ['range'],
          power: 6,
          quantity: 1,
        },
        {
          id: 9,
          name: 'Талер',
          type: 'usual',
          image: 'src/assets/images/nor_thaler.png',
          description: 'Я вам всем галаза на жопу натяну!',
          fractionId: 0,
          ability: 'spy',
          fieldType: ['siege'],
          power: 1,
          quantity: 1,
        },
        {
          id: 10,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 11,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 12,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 13,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 14,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 15,
          name: 'Командирский рог',
          type: 'special',
          image: 'src/assets/images/spc_horn.png',
          description: 'Плюс один к морали, минус три к слуху.',
          fractionId: null,
          ability: 'horn',
          fieldType: ['boost'],
          power: null,
          quantity: 3,
        },
      ] as Card[],
    };
  },
  methods: {
    showPass() {
      this.isPass = !this.isPass;
    },
    showEndGame() {
      this.isGiveUpAnimation = true;
      this.timer = setTimeout(() => {
        this.isEnd = !this.isEnd;
        this.isGiveUpAnimation = false;
      }, 4000);
    },
    dontShowEndGame() {
      this.isGiveUpAnimation = false;
      clearTimeout(this.timer);
      console.log(this.timer);
    },
    closeSelectedItem(value: Card, show: boolean) {
      this.isFieldBlock = show;
      this.isShowCardView = show;
      const index = this.cards.indexOf(value);
      this.cards.splice(index, 1);
      console.log(this.cards);
      console.log(index);
    },
    updateSelectedItem(value: Card, show: boolean) {
      this.isFieldBlock = show;
      setTimeout(() => {
        this.selectedCard = value;
        this.isShowCardView = show;
      }, 240);
    },
    updateShowEnd(value: boolean) {
      this.isEnd = value;
    },
    updateWeatherCards(card: Card) {
      this.weatherCards.push(card);
    },
    putWeatherCard() {
      if (this.isShowCardView) {
        this.isFieldBlock = false;
        this.isShowCardView = false;
        this.cards = this.cards.filter((card) => card !== this.selectedCard);
        this.cardAnimation(24, 12.5);
        setTimeout(() => {
          this.weatherCards.push(this.selectedCard);
        }, 400);
      }
    },
    cardAnimation(top: number, left: number) {
      const element = this.$refs.animationWrap as HTMLElement;
      element.style.transition = '0.5s';
      element.style.opacity = '0.8';
      element.style.top = `${top}vw`;
      element.style.left = `${left}vw`;
      element.style.scale = '1';
      setTimeout(() => {
        element.style.transition = '0s';
        element.style.opacity = '0';
        element.style.top = '24vw';
        element.style.left = '85vw';
        element.style.scale = '3';
      }, 400);
    },
  },
  components: {
    GameExchangePanelComponent,
    PlayerComponent,
    BoardComponent,
    CardViewComponent,
    EndComponent,
    InformationBar,
    MusicComponent,
    CardInfoComponent,
  },
});
</script>

<template>
  <GameExchangePanelComponent />
  <main class="page-game">
    <div
      :class="['click', { noclick: isFieldBlock === false }]"
      @click="(isShowCardView = false), (isFieldBlock = false)"
      ref="clickField"
    ></div>
    <div class="game">
      <div class="game__players">
        <div class="game__leader game__leader-1">
          <div class="game__leader-card card-off"></div>
          <div class="game__leader-icon">
            <div></div>
          </div>
        </div>

        <div class="game__player game__player-1 player">
          <PlayerComponent
            name="Player 1"
            deckName="Нильфгаард"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
          />
        </div>
        <div
          class="game__weather"
          :class="selectedCard.fieldType.includes('weather') ? 'active__weather' : ''"
          @click="putWeatherCard"
        >
          <div class="card__wrap" v-for="(card, index) in weatherCards" :key="index">
            <CardInfoComponent :card="card" :layoutType="0" class="card" />
          </div>
        </div>
        <button @click="showPass" class="btn-game game__pass">Спасовать</button>

        <div class="game__player game__player-2 player game__player-active">
          <PlayerComponent
            name="Player 2"
            deckName="Королевства Севера"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
            :isPass="isPass"
          />
        </div>

        <div class="game__leader game__leader-2">
          <div class="game__leader-card"></div>
          <div class="game__leader-icon game__leader-active">
            <div></div>
          </div>
        </div>

      </div>

      <div class="game__board board">
        <BoardComponent
          @update:selectedItem="updateSelectedItem"
          @close:selectedItem="closeSelectedItem"
          :isShowCardView="isShowCardView"
          :cards="cards"
        />
      </div>
      
      <div class="game__decks deck">
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-1">
            
          </div>
          <div class="deck__player deck__player-1">
            <div class="deck__counter">28</div>
          </div>
        </div>
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-2">

          </div>
          <div class="deck__player deck__player-2">
            <div class="deck__counter">28</div>
          </div>
        </div>
      </div>
    </div>
    <div class="animation__card__wrap" ref="animationWrap">
      <CardInfoComponent :card="selectedCard" :layoutType="0" />
    </div>
    <CardViewComponent :selectedItem="selectedCard" :isShow="isShowCardView" />
    <InformationBar />
    <EndComponent :isEnd="isEnd" @update:showEnd="updateShowEnd" />
    <MusicComponent class="music" />
    <button
      @mousedown="showEndGame"
      @mouseup="dontShowEndGame"
      @mouseout="dontShowEndGame"
      :class="['btn-game game__give-up', { 'give-animation': isGiveUpAnimation }]"
    >
      Сдаться
    </button>
  </main>
</template>

<style lang="scss" scoped>
.music {
  position: absolute;
  right: 15vw;
  bottom: 1.6vw;
}

.game__give-up {
  position: absolute;
  right: 5.5vw;
  bottom: 1.6vw;
  width: 8vw;
  padding: 0.5vw;
  font-size: 1.1vw;
  color: tan;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2%;
    background-color: $GOLDEN_COLOR;
    transform: scaleX(0);
    transform-origin: 0% 0%;
    transition: transform 4s ease-in-out;
  }
}

.give-animation::after {
  transform: scaleX(1);
  transform-origin: 0% 50%;
  height: 2%;
}

.animation__card__wrap {
  position: absolute;
  top: 20vw;
  left: 85vw;
  width: 4.5vw;
  height: 6.5vw;
  scale: 3;
  opacity: 0;
}
.card__wrap {
  height: 100%;
  width: 5vw;
}
.page-game {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  background-image: url('@/assets/images/board.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
}

.click {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.game {
  display: flex;
  flex-direction: row;
  height: 100%;

  &__players {
    width: 26.5%;
  }

  &__board {
    width: 53%;
  }

  &__decks {
    width: 20.5%;
  }

  &__leader {
    width: 31.4%;
    height: 12.5%;
    margin-left: 27.5%;

    &-1 {
      margin-top: 15.55%;
    }

    &-2 {
      margin-top: 6.5%;
    }

    &-card {
      position: relative;
      height: 100%;
      width: 63%;
      margin-bottom: -80%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba($color: #fe9902, $alpha: 0.1);
        box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
      }

      .card {
        position: absolute;
        height: 98%;
        width: 95%;

        &:hover {
          border: 0.5px outset $GOLDEN_COLOR;
          border-radius: 0.3vw;
          z-index: 1;
          transform: translateY(-0.5vw);
        }
      }
    }

    &-icon {
      position: relative;
      top: 33%;
      left: 75%;
      height: 28%;
      width: 24%;
    }

    &-active {
      div {
        width: 100%;
        height: 100%;
        position: relative;
        background-image: url('@/assets/images/icon_leader_active.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }

  &__player {
    height: 12.5%;
    width: 88.5%;
    background-color: rgba($color: #101010, $alpha: 0.8);

    &-1 {
      margin-top: 10%;
    }

    &-2 {
      margin-top: 7%;
    }

    &-active {
      box-shadow: -3vw 0px 1vw 0.1vw $GOLDEN_COLOR;
    }
  }

  .active__weather {
    z-index: 2;
  }

  &__weather {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 9.75%;
    margin-left: 27.9%;
    width: 54.9%;
    height: 12.75%;
    gap: 0.2vw;

    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
    }

    .card {
      border-radius: 0.2vw;

      &:hover {
        border: 0.5px outset $GOLDEN_COLOR;
        border-radius: 0.2vw;
        z-index: 1;
        transform: translateY(-0.5vw);
      }
    }
  }

  &__pass {
    position: relative;
    top: 2%;
    left: 41%;
    width: 27%;
    height: 4%;
  }
}

.card-off {
  pointer-events: none;
  opacity: 0.2;
}

.deck {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 76.06%;
    height: 13.5%;
    margin-left: 4%;

    &:first-child {
      margin-top: 18%;
    }

    &:last-child {
      margin-bottom: 27%;
    }
  }

  &__cemetery,
  &__player {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 38.6%;
    height: 100%;
    overflow: visible;
    z-index: 1;
  }

  &__cemetery {
    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
    }

    .card {
      border-radius: 0.2vw;
    }
  }

  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba($color: #101010, $alpha: 0.9);
    width: 3vw;
    left: 1.5vw;
    bottom: 0;
    height: 2vw;
    z-index: 1;
    font-size: 1.3vw;
    color: $TAN_COLOR;
  }

  .card {
    position: relative;
    pointer-events: none;
  }
}
</style>
