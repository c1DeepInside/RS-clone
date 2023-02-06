<script lang="ts">
import type Card from '@/interfaces/card';
import { defineComponent, type PropType } from 'vue';

export enum CardLayoutType {
  SIMPLE,
  AVERAGE,
  EXTENDED,
}

export default defineComponent({
  data() {
    return {
      parentWidth: 0,
      scaleFactor: 1,
      cardLayoutType: CardLayoutType,
    };
  },
  props: {
    isSelected: Boolean,
    layoutType: {
      type: Object as PropType<CardLayoutType>,
    },
    card: Object as PropType<Card>,
  },
  methods: {
    updateScaleFactor() {
      const card = (this.$refs.card as HTMLDivElement) || null;

      if (!card) {
        return;
      }

      this.parentWidth = card.parentElement?.clientWidth || 0;
      this.scaleFactor = this.parentWidth / card.clientWidth;
    },
  },
  updated() {
    // It's safe since width does not mutate so often and it won't trigger an infinity loop
    this.updateScaleFactor();
  },
  mounted() {
    this.updateScaleFactor();
  },
});
</script>

<template>
  <div v-if="layoutType === cardLayoutType.EXTENDED || layoutType === cardLayoutType.AVERAGE" ref="card" class="card-info" :class="{ selected: isSelected }"
    :style="{ transform: `scale(${scaleFactor})` }">
    <img class="card-info__back" :src="card?.image" />
    <img v-if="card?.fractionId !== null" class="card-info__banner"
      src="/src/assets/images/build/card_faction_banner_northern_realms.png" />

    <div v-if="card?.power !== null && card?.type === 'hero'" class="card-info__count-hero">
      <img class="card-info__count-img-hero" src="/src/assets/images/build/power_hero.png">
      <p class="card-info__count-power-hero">{{ card?.power }}</p>
    </div>

    <div v-else-if="card?.power !== null" class="card-info__count">
      <img class="card-info__count-img" src="/src/assets/images/build/power_normal.png">
      <p class="card-info__count-power">{{ card?.power }}</p>
    </div>

    <img v-if="card?.type !== 'special' && card?.type !== 'leader'" class="card-info__equipment"
      src="/src/assets/images/build/card_row_close.png" />
    <img v-if="card?.ability !== null && card?.type !== 'special'" class="card-info__ability"
      src="/src/assets/images/build/card_ability_bond.png" />

    <img v-if="card?.type === 'special'" class="card-info__special"
      src="/src/assets/images/build/card_weather_rain.png">

    <div class="card-info__gradient"></div>

    <div class="card-info__description">
      <h1 v-if="card?.fractionId !== null" class="description-title">{{ card?.name }}</h1>
      <h1 v-else class="description-title-center">{{ card?.name }}</h1>

      <p v-if="layoutType !== cardLayoutType.AVERAGE" class="description-text">{{ card?.description }}</p>
      <div v-else class="card-info__quantity">
        <img class="quantity-img" src="/src/assets/images/build/preview_count.png">
        <span class="quantity-number">{{ card?.quantity }}</span>
      </div>
    </div>
  </div>

  <div v-else ref="card" class="game-card">
    <img class="game-card__back" :src="card?.image" />

    <img v-if="card?.type === 'special'" class="card-info__special"
      src="/src/assets/images/build/card_weather_rain.png">

    <div v-if="card?.power !== null && card?.type === 'hero'" class="game-card__count-hero">
      <img class="game-card__count-img-hero" src="/src/assets/images/build/power_hero.png">
      <p class="game-card__count-power-hero">{{ card?.power }}</p>
    </div>

    <div v-else-if="card?.power !== null" class="game-card__count">
      <img class="game-card__count-img" src="/src/assets/images/build/power_normal.png">
      <p class="game-card__count-power">{{ card?.power }}</p>
    </div>

    <img v-if="card?.type !== 'special'" class="game-card__equipment"
      src="/src/assets/images/build/card_row_close.png" />

    <img v-if="card?.ability !== null && card?.type !== 'special'" class="game-card__ability"
      src="/src/assets/images/build/card_ability_bond.png" />
  </div>
</template>

<style lang="scss" scoped>

.quantity-img {
 width: 15%;
}

.selected {
  border: 3px solid $GOLDEN_COLOR;
  border-radius: 2vw;
  animation: pulse 1s infinite;
}

.card-info {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 18vw;
  transform-origin: 0 0;

  &__back {
    object-fit: contain;
    border-radius: 1.9vw 1.9vw 0 0;
    width: 100%;
  }

  &__gradient {
    width: 100%;
    height: 7px;
    background: linear-gradient(90deg,
        rgba(218, 165, 32, 1) 0%,
        rgba(249, 248, 162, 1) 43%,
        rgba(218, 165, 32, 1) 64%,
        rgba(249, 248, 162, 1) 82%,
        rgba(218, 165, 32, 1) 100%);
  }

  &__quantity {
    display: flex;
    align-items: center;
    padding-left: 7%;
    padding-bottom: 7%;
    font-size: 1.9vw;
    gap: 5px;
    color: rgb(124, 102, 73);
  }

  &__count {
    position: absolute;
    top: 2%;
    left: 2%;
    width: 30%;
    font-size: 1rem;

    &-img {
      width: 100%;
    }

    &-power {
      position: absolute;
      top: 50%;
      left: 49%;
      transform: translate(-50%, -49%);
      font-size: 3vw;
    }
  }
  
  &__count-hero {
    position: absolute;
    top: -2%;
    left: -4%;
    width: 30%;
    font-size: 1rem;
  }

  &__special {
    position: absolute;
    top: 2%;
    left: 2%;
    width: 30%;
  }

  &__ability {
    position: absolute;
    top: 45%;
    left: 2%;
    width: 29%;
  }

  &__ability-description {
    display: none;
  }

  &__equipment {
    position: absolute;
    top: 27%;
    left: 2%;
    width: 29%;
  }

  &__banner {
    position: absolute;
    top: 15%;
    left: 2.5%;
    width: 28%;
    height: 77%;
  }

  &__description {
    background-image: url('/src/assets/images/build/card_description.png');
    background-size: cover;
    height: 17%;
    border-radius: 0 0 1.9vw 1.9vw;
  }
}

.card-info__count-img-hero {
  width: 190%;
}

.card-info__count-power-hero {
  position: absolute;
  top: 18%;
  left: 34%;
  font-weight: 300;
  color: white;
  font-size: 3vw;
}

.description-title {
  text-align: right;
  font-weight: 500;
  font-size: 1.18vw;
  padding-right: 5px;
  margin-top: 6%;
  margin-bottom: 14%;

  &-center {
    text-align: center;
    font-weight: 500;
    font-size: 1.18vw;
    margin-top: 6%;
    margin-bottom: 14%;
  }
}

.description-text {
  padding: 1%;
  font-size: 1vw;
  text-align: center;
}

.game-card__count-img-hero {
  width: 200%;
}

.game-card__count-power-hero {
  position: absolute;
  top: 33%;
  left: 63%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 300;
  font-size: 2.2vw;
}

.game-card {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 7vw;
  transform-origin: 0 0;

  &__back {
    object-fit: contain;
    width: 100%;
  }

  &__count {
    position: absolute;
    top: 2%;
    left: 2%;
    width: 30%;

    &-img {
      width: 100%;
    }

    &-power {
      position: absolute;
      top: 49%;
      left: 49%;
      transform: translate(-49%, -49%);
      font-size: 2.2vw;
    }
  }

  &__count-hero {
    position: absolute;
    top: -3%;
    left: -4%;
    width: 30%;
    font-size: 1rem;
  }

  &__equipment {
    position: absolute;
    bottom: 2%;
    right: 2%;
    width: 29%;
  }

  &__ability {
    position: absolute;
    bottom: 2%;
    right: 40%;
    width: 29%;
  }
}
</style>
