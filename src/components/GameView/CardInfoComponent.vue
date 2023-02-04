<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  data() { 
    return {
      parentWidth: 0,
      scaleFactor: 1,
    }
  },
  props: {
    isSelected: Boolean,
  },
  methods: {
    updateScaleFactor() {
      const card = this.$refs.card as HTMLDivElement || null;

      if (!card) {
        return;
      }

      this.parentWidth = card.parentElement?.clientWidth || 0;
      this.scaleFactor = this.parentWidth / card.clientWidth;
    }
  },
  updated() {
    // It's safe since width does not mutate so often and it won't trigger an infinity loop
    this.updateScaleFactor();
  },
  mounted() {
    this.updateScaleFactor();
  }
});
</script>

<template>
  <div ref="card" class="card-info" :class="{ selected: isSelected }" :style="{ transform: `scale(${scaleFactor})` }">
    <img class="card-info__back" src="/src/assets/images/realms_blue_stripes.jpg" alt="" />
    <img class="card-info__banner" src="/src/assets/images/build/card_faction_banner_northern_realms.png" alt="" />

    <div class="card-info__count">
      <img class="card-info__count-img" src="/src/assets/images/power_normal.png" alt="" />
      <p class="card-info__count-power">5</p>
    </div>

    <img class="card-info__type" src="/src/assets/images/card_row_close.png" alt="" />
    <div class="card-info__gradient"></div>
    <div class="card-info__description">
      <h1 class="description-title">Рубака из Кринфрида</h1>
      <p class="description-text">Записались мы на войну, а то с чудищами последнее время нам не шибко везет.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected {
  border: 3px solid $GOLDEN_COLOR;
  border-radius: 2vw;
  animation: pulse .7s infinite;
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
    background: linear-gradient(90deg, rgba(218,165,32,1) 0%, rgba(249,248,162,1) 43%, rgba(218,165,32,1) 64%, rgba(249,248,162,1) 82%, rgba(218,165,32,1) 100%);
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

  &__type {
    position: absolute;
    top: 30%;
    left: 2%;
    width: 29%;
  }

  &__banner {
    position: absolute;
    top: 15%;
    left: 2.5%;
    width: 28%;
    height: 25.9vw;
  }

  &__description {
    background-image: url('/src/assets/images/build/card_description.png');
    background-size: cover;
    height: 17%;
    border-radius: 0 0 1.9vw 1.9vw;
  }
}

.description-title {
  text-align: right;
  font-weight: 500;
  font-size: 1.18vw;
  padding-right: 5px;
  margin-top: 6%;
  margin-bottom: 14%;
}

.description-text {
  padding: 1%;
  font-size: 1vw;
  text-align: center;
}
</style>
