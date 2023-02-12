<script lang="ts">
import { defineComponent } from 'vue';
import PlayerComponent, { PlayerType } from '@/components/game-view/PlayerComponent.vue';
import BoardComponent from '@/components/game-view/BoardComponent.vue';
import CardViewComponent from '@/components/game-view/CardViewComponent.vue';
import InformationBar from '@/components/game-view/InformationBar.vue';
import EndComponent from '@/components/game-view/EndComponent.vue';
import MusicComponent from '@/components/game-view/MusicComponent.vue';
import GameExchangePanelComponent from '@/components/game-view/GameExchangePanelComponent.vue';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';
import SliderComponent from '@/components/common/SliderComponent.vue';
import { useGameStore } from '@/stores/GameStore';
import { mapState, mapActions } from 'pinia';
import { cardAnimation, leftPos, topPos } from '@/utilits/cardAnimation';
import type Card from '@/interfaces/card';
import { fractionsDeckImg } from '@/utilits/cardBuildImgs';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';

export default defineComponent({
  data() {
    return {
      isGiveUpAnimation: false,
      isEnd: false,
      timer: 0,
      deckBack: fractionsDeckImg,
      playerType: PlayerType,
      handChangeCount: 0,
      isShowDeck: false,
      isShowEnemyDeck: false,
      isShowWeatherDeck: false,
    };
  },
  methods: {
    onCardSelected(card: Card) {
      if (this.selectedCard.ability === 'medic') {
        if (this.discard[this.whoseDiscard as enemyAlliesType].length !== 0) {
          this.setShowDiscard();
          this.setSelectedCard(card);
          this.removeFromDiscard(card, 'allies');
          this.getDiscard(this.whoseDiscard);
        }

        const isSpy = card.ability !== 'spy';
        const fieldType = card.fieldType.join() as cardLineType;
        this.addToLine(card, fieldType, isSpy, true);
        this.setMedic(false);
      }
    },
    onHandToDiscard(card: Card) {
      this.removeFromHand(card);
      this.addToDiscard(card, 'allies');
      if (this.handChangeCount >= 1) {
        this.setShowHand(false);
        this.handChangeCount = 0;
        this.isShowDeck = true;
      } else {
        this.handChangeCount += 1;
      }
    },
    onWeatherDeck(card: Card) {
      this.addToWeather(card);
      this.removeFromDeck('allies', card);
      this.isShowWeatherDeck = false;
    },
    onDeckToHand(card: Card) {
      this.removeFromDeck('allies', card);
      this.addToHand([card]);
      this.isShowDeck = false;
    },
    showPass() {
      if (this.lives.allies > 0) {
        this.lives.allies -= 1;
      }
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
    },
    updateShowEnd(value: boolean) {
      this.isEnd = value;
    },
    showSunAnimation() {
      const target = this.$refs.sunAnimation as HTMLElement;
      target.style.display = 'block';
      setTimeout(() => {
        target.style.display = 'none';
      }, 2000);
    },
    putWeatherCard() {
      if (this.isShowSelectedCard) {
        cardAnimation(this.$refs.animationWrap as HTMLElement, topPos.weather, leftPos.weather);
        this.removeFromHand(this.selectedCard);
        this.setIsShowSelected(false);
        setTimeout(() => {
          if (this.selectedCard.type === 'leader') {
            this.putLeaderCard();
          } else if (this.selectedCard.ability === 'specScorch') {
            this.putSpecScorch();
          } else {
            this.addToWeather(this.selectedCard);
            if (this.selectedCard.ability === 'clear') {
              this.showSunAnimation();
              this.clearWeathers();
            }
          }
        }, 400);
      }
    },
    putLeaderCard() {
      switch (this.selectedCard.name) {
        case 'Фольтест Предводитель Севера':
          this.showSunAnimation();
          this.clearWeathers();
          break;
        case 'Фольтест Железный Владыка':
          this.putLineScorch('siege', 'enemy');
          break;
        case 'Францеска Финдабаир Королева Дол Блатанны':
          this.putLineScorch('range', 'enemy');
          break;
        case 'Фольтест Завоеватель':
          this.putLineBoost('siege', 'allies');
          break;
        case 'Францеска Финдабаир Прекраснейшая':
          this.putLineBoost('range', 'allies');
          break;
        case 'Эредин Бреакк Глас Командир Дикой Охоты':
          this.putLineBoost('melee', 'allies');
          break;
        case 'Фольтест Король Темерии':
          this.getWeatherFromDeck('fog');
          break;
        case 'Эмгыр вар Эмрейс Йож из Эрленвальда':
          this.getWeatherFromDeck('rain');
          break;
        case 'Францеска Финдабаир Истинная эльфка':
          this.getWeatherFromDeck('frost');
          break;
        case 'Эредин Бреакк Глас Владыка Тир на Лиа':
          this.exchangeLeaderAbility();
          break;
        case 'Эмгыр вар Эмрейс Император Нильфграада':
          this.isShowEnemyDeck = true;
          break;
        case 'Эредин Бреакк Глас Король Aen Elle':
          this.isShowWeatherDeck = true;
          break;
        default:
      }
      this.leader.allies.quantity = 0;
    },
    exchangeLeaderAbility() {
      this.setShowHand(true);
    },
    getWeatherFromDeck(weather: string) {
      let weatherIndex = -1;
      if (
        this.deck.allies.some((card: Card, index) => {
          weatherIndex = index;
          return card.ability === weather;
        }) === false
      ) {
        weatherIndex = -1;
      }
      if (weatherIndex >= 0) {
        this.addToWeather(this.deck.allies[weatherIndex]);
        this.removeFromDeck('allies', this.deck.allies[weatherIndex]);
      }
    },
    setLeader(card: Card) {
      this.setSelectedCard(card);
      this.setIsShowSelected(true);
    },
    ...mapActions(useGameStore, {
      setIsShowSelected: 'setIsShowSelected',
      removeFromHand: 'removeFromHand',
      clearWeathers: 'clearWeathers',
      addToWeather: 'addToWeather',
      setAlliesPower: 'setAlliesPower',
      setEnemyPower: 'setEnemyPower',
      putSpecScorch: 'putSpecScorch',
      setSelectedCard: 'setSelectedCard',
      putLineScorch: 'putLineScorch',
      putLineBoost: 'putLineBoost',
      getDiscard: 'getDiscard',
      setShowDiscard: 'setShowDiscard',
      setWhoseDiscard: 'setWhoseDiscard',
      removeFromDiscard: 'removeFromDiscard',
      addToLine: 'addToLine',
      removeFromDeck: 'removeFromDeck',
      setShowHand: 'setShowHand',
      addToDiscard: 'addToDiscard',
      addToHand: 'addToHand',
      setMedic: 'setMedic',
    }),
    getLastDiscardCard(fieldType: string): Card {
      if (fieldType === 'enemy') {
        const idx = this.discard.enemy.length - 1;
        return this.discard.enemy[idx];
      }
      const idx = this.discard.allies.length - 1;
      return this.discard.allies[idx];
    },
  },
  computed: {
    ...mapState(useGameStore, {
      hand: 'hand',
      board: 'board',
      affectedBoard: 'affectedBoard',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
      enemyPower: 'enemyPower',
      discard: 'discard',
      leader: 'leader',
      deck: 'deck',
      lives: 'lives',
      showDiscard: 'showDiscard',
      whoseDiscard: 'whoseDiscard',
      showHand: 'showHand',
      getEnemyHand: 'getEnemyHand',
      isMedic: 'isMedic',
      getWeatherDeck: 'getWeatherDeck',
    }),
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
    SliderComponent,
  },
});
</script>

<template>
  <GameExchangePanelComponent />
  <main class="page-game">
    <div class="game">
      <div class="game__players">
        <div class="game__leader game__leader-1">
          <div class="game__leader-card card-off">
            <CardInfoComponent :card="leader.enemy" :layoutType="0" class="card" />
          </div>
          <div class="game__leader-icon">
            <div></div>
          </div>
        </div>

        <div class="game__player game__player-1 player">
          <PlayerComponent :player-type="playerType.enemy" />
        </div>
        <div
          class="game__weather"
          :class="[
            selectedCard.fieldType.includes('weather') && isShowSelectedCard ? 'active__weather' : '',
            selectedCard.type === 'leader' && isShowSelectedCard ? 'active__weather' : '',
          ]"
          @click="putWeatherCard"
        >
          <div
            class="card__wrap"
            v-for="(card, index) in board.weather"
            :key="index"
            :style="board.weather.length > 2 ? `margin-left: -0.6vw; left: 0.3vw` : ''"
          >
            <CardInfoComponent :card="card" :layoutType="0" class="card" />
          </div>
        </div>
        <button @click="showPass" class="btn-game game__pass">Спасовать</button>

        <div class="game__player game__player-2 player game__player-active">
          <PlayerComponent :player-type="playerType.ally" :isPass="true" />
        </div>

        <div class="game__leader game__leader-2">
          <div class="game__leader-card" :class="leader.allies.quantity <= 0 ? 'card-off' : ''">
            <CardInfoComponent :card="leader.allies" :layoutType="0" class="card" @click="setLeader(leader.allies)" />
          </div>
          <div class="game__leader-icon game__leader-active">
            <div></div>
          </div>
        </div>
      </div>

      <div class="game__board board">
        <BoardComponent />
      </div>

      <div class="game__decks deck">
        <div class="deck__content">
          <!-- enemy discard last card -->
          <div class="deck__cemetery deck__cemetery-1">
            <div
              v-if="discard['enemy'].length !== 0"
              @click="setShowDiscard(), setWhoseDiscard('enemy')"
              class="card-wrapper"
            >
              <CardInfoComponent :card="getLastDiscardCard('enemy')" :layout-type="0" />
            </div>
          </div>

          <div class="deck__player deck__player-1">
            <img class="deck__background" :src="deckBack[leader.enemy.fractionId!]" draggable="false" />
            <div class="deck__counter">{{ deck.enemy.length }}</div>
          </div>
        </div>
        <!-- allies discard last card -->
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-2">
            <div
              v-if="discard['allies'].length !== 0"
              @click="setShowDiscard(), setWhoseDiscard('allies')"
              class="card-wrapper"
            >
              <CardInfoComponent :card="getLastDiscardCard('allies')" :layout-type="0" />
            </div>
          </div>

          <div class="deck__player deck__player-2">
            <img class="deck__background" :src="deckBack[leader.allies.fractionId!]" draggable="false" />
            <div class="deck__counter">{{ deck.allies.length }}</div>
          </div>
        </div>
      </div>
      <!-- discard slider -->
      <div v-if="showDiscard" class="discard">
        <div v-if="!isMedic" class="discard__close" @click="setShowDiscard()">x</div>

        <SliderComponent @card-selected="onCardSelected" :cards="getDiscard(whoseDiscard)" />
      </div>
      <div v-if="showHand" class="hand">
        <SliderComponent @card-selected="onHandToDiscard" :cards="hand" />
      </div>
      <div v-if="isShowDeck" class="hand">
        <SliderComponent @card-selected="onDeckToHand" :cards="deck.allies" />
      </div>
      <div v-if="isShowWeatherDeck && getWeatherDeck.length > 0" class="hand">
        <SliderComponent @card-selected="onWeatherDeck" :cards="getWeatherDeck" />
      </div>
      <div v-if="isShowEnemyDeck" class="discard">
        <div class="discard__close" @click="isShowEnemyDeck = false">x</div>

        <SliderComponent :cards="getEnemyHand" />
      </div>
    </div>

    <div class="animation__card__wrap" ref="animationWrap">
      <CardInfoComponent :card="selectedCard" :layoutType="0" />
    </div>

    <CardViewComponent :selectedItem="selectedCard" :isShow="isShowSelectedCard" />
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
    <div class="sun__animation__wrap" ref="sunAnimation">
      <img class="sun__animation" src="src/assets/images/sun-animation.png" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.discard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  padding-top: 8vw;
  background-color: rgba(58, 41, 25, 0.699);

  &__close {
    position: absolute;
    color: white;
    font-size: 4vw;
    top: 4vw;
    right: 6vw;

    &:hover {
      opacity: 0.8;
    }
  }
}

.hand {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  padding-top: 8vw;
  background-color: rgba(58, 41, 25, 0.699);
}
.card-wrapper {
  width: 5.4vw;
}
.sun__animation {
  width: 50vw;
}
.sun__animation__wrap {
  opacity: 0.8;
  position: absolute;
  top: -2vw;
  left: -2vw;
  animation: sun 2s infinite;
  display: none;

  @keyframes sun {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.8;
    }
  }
}
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
  position: relative;
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

  &__leader-image {
    width: 100%;
    height: 99%;
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
    z-index: 3;
    animation: pulseField 2s infinite;

    @keyframes pulseField {
      0% {
        background-color: rgba($color: #fe9902, $alpha: 0);
        box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.4);
      }
      50% {
        background-color: rgba($color: #fe9902, $alpha: 0.1);
        box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.4);
      }
      100% {
        background-color: rgba($color: #fe9902, $alpha: 0);
        box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.4);
      }
    }
    &:hover {
      animation: none;
    }
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
  opacity: 0.5;
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

  &__background {
    width: 86%;
    height: auto;
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
