<script lang="ts">
import { defineComponent } from 'vue';
import CardInfoCopmponent from '@/components/GameView/CardInfoComponent.vue';
import CardSize from '@/components/GameView/CardInfoComponent.vue';
export default defineComponent({
  data() {
    return {
      cards: [1, 1, 1, 1, 1],
      params: [CardSize.small, CardSize.middle, CardSize.large, CardSize.middle, CardSize.small],
    };
  },
  components: {
    CardInfoCopmponent,
  },
  offsetCard() {},
});
</script>

<template>
  <div class="choice-panel">
    <div class="choice-panel__title">
      Выберите, какую карту обменять.
      <span class="choice-panel__count-carts">0/2</span>
    </div>

    <div class="choice-panel__cards">
      <CardInfoCopmponent v-for="index in cards" :card-size="params[index]" :key="index" />
    </div>
  </div>
</template>

<style lang="scss">
.choice-panel {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 20;
  background-color: rgba(58, 41, 25, 0.486);

  &__title {
    margin-top: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 70px;
    font-size: 26px;
    letter-spacing: -1px;
    background-color: $BLACK_COLOR_MAIN;
    color: $TAN_COLOR;
  }

  &__cards {
    display: flex;
    gap: 2vw;
    justify-content: center;
    margin-top: 5px;
  }
}
</style>
