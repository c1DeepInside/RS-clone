<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';
import { mapActions, mapState } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      linePowerWraps: {
        enemy: 'src/assets/images/score_total_op.png',
        allies: 'src/assets/images/score_total_me.png',
      } as Record<enemyAlliesType, string>,
      weathers: {
        siege: 'rain',
        range: 'fog',
        melee: 'frost',
      } as Record<cardLineType, string>,
    };
  },
  props: {
    type: {
      type: String as PropType<enemyAlliesType>,
      default: () => {
        return '';
      },
    },
    attackType: {
      type: String as PropType<cardLineType>,
      default: () => {
        return '';
      },
    },
  },
  methods: {
    ...mapActions(useGameStore, {
      setPower: 'setPower',
      setAffectedBoard: 'setAffectedBoard',
    }),
  },
  components: {
    CardInfoComponent,
  },
  computed: {
    ...mapState(useGameStore, {
      board: 'board',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
      affectedBoard: 'affectedBoard',
    }),
    ifFogRainFrost(): boolean {
      let isActive = false;
      for (let i = 0; i < this.board.weather.length; i++) {
        isActive = this.board.weather[i].ability === this.weathers[this.attackType];
        if (isActive) {
          break;
        }
      }
      return isActive;
    },
    cards(): Card[] {
      let line = JSON.parse(JSON.stringify(this.board[this.type][this.attackType]));
      line = line.map((card: Card) => {
        if (this.ifFogRainFrost && card.type !== 'hero') {
          card.power = 1;
        }
        if (card.ability === 'bond') {
          let bondCardsCount = 0;
          line.forEach((bondCard: Card) => {
            if (bondCard.id === card.id) {
              bondCardsCount++;
            }
          });
          card.power! *= bondCardsCount;
        }
        if (this.moraleCount > 0 && card.type !== 'hero') {
          card.power =
            card.ability === 'morale' ? card.power! + (1 * this.moraleCount - 1) : card.power! + 1 * this.moraleCount;
        }
        if (this.ifBoost && card.type !== 'hero') {
          card.power! *= 2;
        }
        return card;
      });
      this.setAffectedBoard(line, this.attackType, this.type);
      return line;
    },
    moraleCount(): number {
      return this.board[this.type][this.attackType].reduce((prev, next): number => {
        if (next.ability === 'morale') {
          return prev + 1;
        }
        return prev;
      }, 0);
    },
    ifBoost(): boolean {
      const isBoostCard = this.board[this.type][this.attackType].some((card) => {
        return card.ability === 'horn';
      });
      return isBoostCard || this.board[`${this.type}Boost`][this.attackType].length > 0;
    },
    linePower(): number {
      const power = this.cards.reduce((prev, next) => {
        return prev + next.power!;
      }, 0);
      this.setPower(power, this.attackType, this.type);
      return power;
    },
    activeLine(): boolean {
      let ifSpy = this.selectedCard.ability === 'spy';
      if (this.type === 'enemy') {
        ifSpy = this.selectedCard.ability !== 'spy';
      }
      return this.selectedCard.fieldType.includes(this.attackType) && !ifSpy && this.isShowSelectedCard;
    },
    activeBoost(): boolean {
      return this.selectedCard.fieldType.includes('boost') && this.isShowSelectedCard && this.type === 'allies';
    },
    cardMargin(): string {
      return this.board[this.type][this.attackType].length > 8
        ? `margin-left: -${
            this.board[this.type][this.attackType].length /
            (7.2 + Math.pow(2.6, -this.board[this.type][this.attackType].length + 12.6))
          }vw; left: ${
            this.board[this.type][this.attackType].length /
            (7.2 + Math.pow(2.6, -this.board[this.type][this.attackType].length + 12.6)) /
            2
          }vw`
        : '';
    },
  },
});
</script>

<template>
  <div class="line">
    <div class="power__wrap">
      <img class="power__img" src="@/assets/images/power_wrap.png" alt="wrap" />
      <div class="power__dmg__wrap">
        <img class="power__dmg" :src="linePowerWraps[type]" alt="wrap" />
        <p class="power__dmg__number">{{ Number(linePower) }}</p>
      </div>
    </div>

    <div
      :class="[
        activeBoost && board[`${type}Boost`][attackType].length < 1 ? 'active' : '',
        `boost__wrap__${attackType}__${type ? 'enemy' : 'allies'}`,
      ]"
      class="boosts__wrap wrap_animation"
    >
      <div class="boost__wrap" v-for="(card, index) in board[`${type}Boost`][attackType]" :key="index">
        <CardInfoComponent :card="card" :layoutType="0" class="card" />
      </div>
    </div>

    <div
      :class="[activeLine ? 'active' : '', `cards__wrap__${attackType}__${type ? 'enemy' : 'allies'}`]"
      class="cards__wrap wrap_animation"
    >
      <div class="card__wrap" v-for="(card, index) in cards" :key="index" :style="cardMargin">
        <CardInfoComponent
          :card="card"
          :layoutType="0"
          class="card"
          :ifBuff="card.power! > board[type][attackType][index].power!"
          :ifDebuff="card.power! < board[type][attackType][index].power!"
        />
      </div>
    </div>

    <div v-if="attackType === 'siege' && ifFogRainFrost" class="weather__wrap">
      <img class="weather_rain" src="@/assets/images/rain1.gif" alt="rain" />
      <img class="weather_rain second_rain" src="@/assets/images/rain1.gif" alt="rain" />
    </div>
    <div v-if="attackType === 'range' && ifFogRainFrost" class="weather__wrap">
      <div class="weather_fog first_fog"></div>
      <div class="weather_fog second_fog"></div>
    </div>
    <div v-if="attackType === 'melee' && ifFogRainFrost" class="weather__wrap">
      <img class="weather_frost" src="@/assets/images/frost.png" alt="frost" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card__wrap {
  height: 100%;
  position: relative;
  width: 4.5vw;
}
.boost__wrap {
  height: 100%;
  width: 4.3vw;
}
.active {
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
.weather {
  &__wrap {
    top: -0.5vw;
    position: absolute;
    height: 7vw;
    width: 93.5%;
    left: 3.15vw;
    overflow: hidden;
    pointer-events: none;
    z-index: 5;
  }

  &_fog {
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: repeat;
    background-size: cover;
  }

  &_rain {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: rotateX(180deg);
    opacity: 0.7;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%);
  }

  &_frost {
    position: absolute;
    opacity: 0.65;
    width: 100%;
    top: -0.2vw;
    background: linear-gradient(0deg, rgba(158, 224, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
  }
}

.second_rain {
  left: 3vw;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%);
}

.second_fog {
  background: url('src/assets/images/fog.png');
  opacity: 0.25;
  animation: fogAnimation 80s linear 0s infinite;
}

.first_fog {
  background: url('src/assets/images/fog.png');
  animation: fogAnimation2 80s linear 0s infinite;
  opacity: 0.25;
}

@keyframes fogAnimation {
  0% {
    background-position-x: 0%;
    background-position-y: 0%;
  }
  50% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 0%;
  }
}

@keyframes fogAnimation2 {
  0% {
    background-position-x: 100%;
  }
  50% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: 100%;
  }
}

.line {
  height: 6.4vw;
  width: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;

  .power {
    &__wrap {
      position: relative;
      height: 95%;
      width: 6%;
    }

    &__img {
      left: -0.4vw;
      top: -0.5vw;
      position: absolute;
      height: 6.9vw;
      object-fit: contain;
    }

    &__dmg__wrap {
      left: 0.25vw;
      top: 1.83vw;
      height: 2.55vw;
      width: 2.55vw;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__dmg {
      position: absolute;
      height: 2.55vw;
      z-index: 0;
    }

    &__dmg__number {
      position: relative;
      font-weight: 500;
      margin-top: 0.1vw;
      font-size: 1.3vw;
      z-index: 1;
      text-shadow: 0.1vw 0.1vw 0.3vw white, -0.1vw -0.1vw 0.3vw white, 0.1vw -0.1vw 0.3vw white,
        -0.1vw 0.1vw 0.3vw white;
    }
  }

  .boosts__wrap {
    margin-left: 0.4%;
    height: 95%;
    width: 12.3%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .cards__wrap {
    margin-left: 0.9%;
    gap: 0.2vw;
    height: 100%;
    width: 79.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card:hover {
    border: 0.5px outset $GOLDEN_COLOR;
    border-radius: 0.2vw;
    z-index: 1;
    transform: translateY(-0.5vw);
  }
  .wrap_animation {
    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
    }
  }
}
</style>
