<script lang="ts">
export default {
  props: {
    img: {
      type: String,
      default: '/src/assets/images/realms_blue_stripes.jpg',
    },
    isHero: {
      type: Boolean,
      default: false,
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <div
    class="card"
    :style="{
      backgroundImage: `url(${img})`,
    }"
  >
    <div
      class="card__count"
      :style="{
        backgroundImage: `url('/src/assets/images/power_normal.png')`,
      }"
    >
      <div>4</div>
    </div>
    <template v-if="!isHero && !isSpecial">
      <div
        class="card__ability"
        :style="{
          backgroundImage: `url('/src/assets/images/card_ability_bond.png')`,
        }"
      ></div>
      <div
        class="card__type"
        :style="{
          backgroundImage: `url('/src/assets/images/card_row_close.png')`,
        }"
      ></div>
    </template>
    <template v-else-if="isHero">
      <div
        class="card__type"
        :style="{
          backgroundImage: `url('/src/assets/images/card_row_close.png')`,
        }"
      ></div
    ></template>
  </div>
</template>

<style scoped lang="scss">
.card {
  margin: 0 0.1vw;
  height: 6.35vw;
  width: 4.45vw;
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.1s ease;

  &__count {
    position: relative;
    top: -4%;
    left: -4%;
    width: 70%;
    height: 50%;
    margin-bottom: -71%;
    background-size: contain;
    background-position: 0 0;
    background-repeat: no-repeat;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 9%;
      left: 7%;
      width: 50%;
      height: 50%;
      font-weight: 700;
      font-size: 1vw;
      color: $BLACK_COLOR_MAIN;
      text-shadow: 0 0 0.1vw $WHITE_COLOR;
    }
  }

  &__type {
    position: relative;
    top: 75%;
    left: 65%;
    width: 33%;
    height: 22%;
    margin-bottom: -32%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__ability {
    position: relative;
    top: 75%;
    left: 31%;
    width: 33%;
    height: 22%;
    margin-bottom: -32%;
    font-size: 1vw;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
