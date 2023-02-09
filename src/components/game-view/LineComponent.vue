<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type Card from '@/interfaces/card';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';

export default defineComponent({
  data() {
    return {
      enemyWrap: 'src/assets/images/score_total_op.png',
      alliesWrap: 'src/assets/images/score_total_me.png',
    };
  },
  props: {
    isActiveWeather: {
      type: Boolean,
      default: false,
    },
    type: Boolean,
    attackType: String,
    activeBoost: Boolean,
    activeLine: Boolean,
    cards: {
      type: Array as PropType<Card[]>,
      default: () => {
        return [];
      },
    },
    boosts: {
      type: Array as PropType<Card[]>,
      default: () => {
        return [];
      },
    },
  },
  components: {
    CardInfoComponent,
  },
  computed: {
    showDamage(): number {
      return this.cards.reduce((prev, next) => {
        return prev + next.power!;
      }, 0);
    },
  },
});
</script>

<template>
  <div class="line">
    <div class="power__wrap">
      <img class="power__img" src="@/assets/images/power_wrap.png" alt="wrap" />
      <div class="power__dmg__wrap">
        <img class="power__dmg" :src="type ? enemyWrap : alliesWrap" alt="wrap" />
        <p class="power__dmg__number">{{ Number(showDamage) }}</p>
      </div>
    </div>
    <div
      :class="[
        activeBoost && boosts.length < 1 ? 'active' : '',
        `boost__wrap__${attackType}__${type ? 'enemy' : 'allies'}`,
      ]"
      class="boosts__wrap wrap_animation"
    >
      <div class="boost__wrap" v-for="(card, index) in boosts" :key="index">
        <CardInfoComponent :card="card" :layoutType="0" class="card" />
      </div>
    </div>
    <div
      :class="[activeLine ? 'active' : '', `cards__wrap__${attackType}__${type ? 'enemy' : 'allies'}`]"
      class="cards__wrap wrap_animation"
    >
      <div
        class="card__wrap"
        v-for="(card, index) in cards"
        :key="index"
        :style="
          cards.length > 8
            ? `margin-left: -${cards.length / (7.2 + Math.pow(2.6, -cards.length + 12.6))}vw; left: ${
                cards.length / (7.2 + Math.pow(2.6, -cards.length + 12.6)) / 2
              }vw`
            : ''
        "
      >
        <CardInfoComponent :card="card" :layoutType="0" class="card" />
      </div>
    </div>
    <div v-if="attackType === 'siege' && isActiveWeather" class="weather__wrap">
      <img class="weather_rain" src="@/assets/images/rain1.gif" alt="rain" />
      <img class="weather_rain second_rain" src="@/assets/images/rain1.gif" alt="rain" />
    </div>
    <div v-if="attackType === 'range' && isActiveWeather" class="weather__wrap">
      <div class="weather_fog first_fog"></div>
      <div class="weather_fog second_fog"></div>
    </div>
    <div v-if="attackType === 'melee' && isActiveWeather" class="weather__wrap">
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
  z-index: 2;
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
