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
    <div
      :class="[activeBoost ? 'active' : '', `boost__wrap__${attackType}__${type ? 'enemy' : 'allies'}`]"
      class="boosts__wrap wrap_animation"
    >
      <div class="boost__wrap" v-for="(card, index) in boosts" :key="index">
        <cardInfoComponent :card="card" :layoutType="0" class="card" />
      </div>
    </div>
    <div
      :class="[activeLine ? 'active' : '', `cards__wrap__${attackType}__${type ? 'enemy' : 'allies'}`]"
      class="cards__wrap wrap_animation"
    >
      <div class="card__wrap" v-for="(card, index) in cards" :key="index">
        <CardInfoComponent :card="card" :layoutType="0" class="card" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card__wrap {
  height: 100%;
  width: 4.5vw;
}
.boost__wrap {
  height: 100%;
  width: 4.3vw;
}
.active {
  z-index: 2;
}
.line {
  height: 6.4vw;
  width: 100%;
  display: flex;
  align-items: flex-end;

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
