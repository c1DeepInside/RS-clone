<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      enemyWrap: 'src/assets/images/score_total_op.png',
      alliesWrap: 'src/assets/images/score_total_me.png',
    };
  },
  props: {
    type: Boolean,
    attackType: String,
  },
  components: {},
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
    <div :class="`boost__wrap_${attackType}_${type}`" class="boost__wrap wrap_animation"></div>
    <div :class="`cards__wrap_${attackType}_${type}`" class="cards__wrap wrap_animation"></div>
  </div>
</template>

<style lang="scss" scoped>
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
    background-position-y: 50%;
  }
  100% {
    background-position-x: 0%;
    background-position-y: 0%;
  }
}

@keyframes fogAnimation2 {
  0% {
    background-position-x: 100%;
    background-position-y: 0%;
  }
  50% {
    background-position-x: 0%;
    background-position-y: 50%;
  }
  100% {
    background-position-x: 100%;
    background-position-y: 0%;
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
