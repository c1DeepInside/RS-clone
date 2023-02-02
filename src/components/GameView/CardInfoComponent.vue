<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export enum CardSize {
  large = 'large',
  middle = 'middle',
  small = 'small',
}

export default defineComponent({
  data() {},
  props: {
    cardSize: Object as PropType<CardSize>,
  },
});
</script>

<template>
  <div class="card-info" :class="cardSize">
    <img class="card-info__back" src="/src/assets/images/realms_blue_stripes.jpg" alt="" />
    <img class="card-info__banner" src="/src/assets/images/build/card_faction_banner_northern_realms.png" alt="" />

    <div class="card-info__count">
      <img class="card-info__count-img" src="/src/assets/images/power_normal.png" alt="" />
      <p class="card-info__count-power">5</p>
    </div>

    <img class="card-info__type" src="/src/assets/images/card_row_close.png" alt="" />

    <div class="card-info__description">
      <h1 class="description-title">Рубайлы из Кринфрида</h1>
      <p class="description-text">Записались м ына войну, а то с чудищами последнее время нам не шибко везет.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.large {
  border: 2px solid $GOLDEN_COLOR;
}

.middle {
  width: 17vw;
}

.small {
  width: 16vw;
}

.card-info {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 19vw;

  &__back {
    object-fit: contain;
    border-radius: 20px 20px 0 0;
    width: 100%;
  }

  &__count {
    position: absolute;
    top: 0;

    &-img {
      width: 9vw;
    }

    &-power {
      position: absolute;
      top: 1.7vw;
      left: 2.15vw;
      font-size: 2.5vw;
    }
  }

  &__type {
    position: absolute;
    top: 6vw;
    left: 0.5vw;
    width: 4.5vw;
  }

  &__banner {
    position: absolute;
    top: 4.5vw;
    left: 0.5vw;
    width: 4.7vw;
    height: 28vw;
  }

  &__description {
    background-image: url('/src/assets/images/build/card_description.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 15vw;
  }
}

.description-title {
  text-align: right;
  font-weight: 500;
  font-size: 1.1vw;
  padding: 1vw 1vw 1vw 0;
}

.description-text {
  padding: 0.5vw;
  font-size: 1vw;
  text-align: center;
}
</style>
