<script lang="ts">
import { defineComponent } from 'vue';
import CardComponent from './CardComponent.vue';

export default defineComponent({
  data() {
    return {
      enemyWrap: 'src/assets/images/score_total_op.png',
      alliesWrap: 'src/assets/images/score_total_me.png',
    };
  },
  props: {
    type: Boolean,
    lineType: String,
  },
  components: {
    CardComponent,
  },
});
</script>

<template>
  <div class="line">
    <div class="power__wrap">
      <img class="power__img" src="@/assets/images/power_wrap.png" alt="wrap" />
      <div class="power__dmg__wrap">
        <img class="power__dmg" :src="type ? enemyWrap : alliesWrap" alt="wrap" />
        <p class="power__dmg__number">7</p>
      </div>
    </div>
    <div class="boost__wrap wrap_animation"><CardComponent /></div>
    <div class="cards__wrap wrap_animation">
      <CardComponent />
      <CardComponent />
    </div>
    <div v-if="lineType === 'siege'" class="weather__wrap">
      <img class="weather weather_rain" src="@/assets/images/rain1.gif" alt="rain" />
      <img class="weather weather_rain second_rain" src="@/assets/images/rain1.gif" alt="rain" />
    </div>
    <div v-if="lineType === 'range'" class="weather__wrap"></div>
    <div v-if="lineType === 'melee'" class="weather__wrap">
      <img class="weather weather_frost" src="@/assets/images/frost.png" alt="frost" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  &__wrap {
    top: 0.1vw;
    position: absolute;
    height: 100%;
    width: 93.3%;
    left: 3.15vw;
    overflow: hidden;
    pointer-events: none;
    z-index: 5;
  }

  &_rain {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: rotateX(180deg);
    opacity: 0.7;
  }

  &_frost {
    position: absolute;
    opacity: 0.8;
    width: 100%;
    top: -0.7vw;
  }
}
.second_rain {
  left: 3vw;
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

  .boost__wrap {
    margin-left: 0.4%;
    height: 95%;
    width: 12.3%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .cards__wrap {
    margin-left: 0.9%;
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
