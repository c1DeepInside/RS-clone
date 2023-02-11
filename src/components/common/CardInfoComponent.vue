<script lang="ts">
import type Card from '@/interfaces/card';
import { cardAbilitiesImg, cardFractionsImg, cardEquipmendImg } from '@/utilits/cardBuildImgs';
import { defineComponent, type PropType } from 'vue';

export enum CardLayoutType {
  SIMPLE, //card for game
  AVERAGE, //card for collecting a deck
  EXTENDED, //info card
}

export default defineComponent({
  data() {
    return {
      parentWidth: 0,
      scaleFactor: 1,
      cardLayoutType: CardLayoutType,
      abilitiesImg: cardAbilitiesImg,
      equipmendImg: cardEquipmendImg,
      fraction: cardFractionsImg,
    };
  },
  props: {
    isSelected: Boolean,
    layoutType: {
      type: Number as PropType<CardLayoutType>,
    },
    card: Object as PropType<Card>,
    ifBuff: {
      type: Boolean,
      default: false,
    },
    ifDebuff: {
      type: Boolean,
      default: false,
    },
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
    getEquipmendImage(card?: Card): string {
      if (!card) {
        return '';
      }

      if (card.fieldType.length === 1) {
        const key = card.fieldType[0];

        if (!(key in cardEquipmendImg)) {
          return '';
        }

        // @ts-ignore
        return cardEquipmendImg[key];
      }

      if (card.fieldType.length == 2) {
        if (card.fieldType.includes('melee') && card.fieldType.includes('range')) {
          return cardEquipmendImg['melee_range'];
        }
      }

      return '';
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
  <div
    v-if="layoutType === cardLayoutType.EXTENDED || layoutType === cardLayoutType.AVERAGE"
    ref="card"
    class="card-info"
    :class="{ selected: isSelected }"
    :style="{ transform: `scale(${scaleFactor})` }"
  >
    <img draggable="false" class="card-info__back" :src="card?.image" />
    <img
      draggable="false"
      v-if="card?.fractionId !== null && card?.type !== 'leader'"
      class="card-info__banner"
      :src="fraction[card?.fractionId!]"
    />

    <div v-if="card?.power !== null && card?.type === 'hero'" class="card-info__count-hero">
      <img draggable="false" class="card-info__count-img-hero" src="/src/assets/images/build/power_hero.png" />
      <p class="card-info__count-power-hero">{{ card?.power }}</p>
    </div>

    <div v-else-if="card?.power !== null" class="card-info__count">
      <img draggable="false" class="card-info__count-img" src="/src/assets/images/build/power_normal.png" />
      <p class="card-info__count-power">{{ card?.power }}</p>
    </div>

    <img
      draggable="false"
      v-if="card?.type !== 'special' && card?.type !== 'leader'"
      class="card-info__equipment"
      :src="getEquipmendImage(card)"
    />
    <img
      draggable="false"
      v-if="card?.ability !== null && card?.type !== 'special'"
      class="card-info__ability"
      :src="abilitiesImg[card?.ability!]"
    />

    <img
      draggable="false"
      v-if="card?.type === 'special'"
      class="card-info__special"
      :src="abilitiesImg[card?.ability!]"
    />

    <div class="card-info__gradient"></div>

    <div class="card-info__description">
      <h3 v-if="card?.fractionId !== null && card?.type !== 'leader'" class="description-title">{{ card?.name }}</h3>
      <h3 v-else class="description-title-center">{{ card?.name }}</h3>

      <p v-if="layoutType !== cardLayoutType.AVERAGE" class="description-text">{{ card?.description }}</p>
      <div v-else class="card-info__quantity">
        <img draggable="false" class="quantity-img" src="/src/assets/images/build/preview_count.png" />
        <span class="quantity-number">{{ card?.quantity }}</span>
      </div>
    </div>
  </div>

  <div v-else ref="card" class="game-card">
    <img draggable="false" class="game-card__back" :src="card?.image" />

    <img
      draggable="false"
      v-if="card?.type === 'special'"
      class="card-info__special"
      :src="abilitiesImg[card?.ability!]"
    />

    <div v-if="card?.power !== null && card?.type === 'hero'" class="game-card__count-hero">
      <img draggable="false" class="game-card__count-img-hero" src="/src/assets/images/build/power_hero.png" />
      <p class="game-card__count-power-hero">{{ card?.power }}</p>
    </div>

    <div v-else-if="card?.power !== null" class="game-card__count">
      <img draggable="false" class="game-card__count-img" src="/src/assets/images/build/power_normal.png" />
      <p class="game-card__count-power" :class="[ifBuff ? 'card-buff' : '', ifDebuff ? 'card-debuff' : '']">
        {{ card?.power }}
      </p>
    </div>

    <img
      draggable="false"
      v-if="card?.type !== 'special'"
      class="game-card__equipment"
      :src="getEquipmendImage(card)"
    />

    <img
      draggable="false"
      v-if="card?.ability !== null && card?.type !== 'special'"
      class="game-card__ability"
      :src="abilitiesImg[card?.ability!]"
    />
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
    background: linear-gradient(
      90deg,
      rgba(218, 165, 32, 1) 0%,
      rgba(249, 248, 162, 1) 43%,
      rgba(218, 165, 32, 1) 64%,
      rgba(249, 248, 162, 1) 82%,
      rgba(218, 165, 32, 1) 100%
    );
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
    color: black;
    height: 17%;
    border-radius: 0 0 1.9vw 1.9vw;
  }
}
.description-title {
  text-align: center;
  font-weight: 500;
  font-size: 1.18vw;
  padding-left: 25%;
  margin-top: 4%;
  height: 3.3vw;

  &-center {
    text-align: center;
    font-weight: 500;
    font-size: 1.18vw;
    margin-top: 4%;
    height: 3.3vw;
  }
}
.description-text {
  height: 4vw;
  display: flex;
  align-items: flex-end;
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
  font-size: 1vw;
}
.game-card {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 3vw;
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
      top: 47%;
      left: 47%;
      font-weight: 400;
      transform: translate(-49%, -49%);
      font-size: 1vw;
    }
    .card-buff {
      color: green;
    }

    .card-debuff {
      color: red;
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
