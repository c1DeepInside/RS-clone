<script lang="ts">
import { defineComponent } from 'vue';
import ExchangePanelComponent from '@/components/GameView/ExchangePanelComponent.vue';

export default defineComponent({
  components: {
    ExchangePanelComponent,
  },
});
</script>

<template>
  <div class="choice-panel">
    <div class="choice-panel__title">
      Выберите, какую карту обменять.
      <span class="choice-panel__count-carts">0/2</span>
    </div>
    <ExchangePanelComponent />
  </div>
</template>

<style lang="scss" scoped>
.choice-panel {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 40;
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
    margin: 0 auto;
    margin-top: 5px;
  }
}
</style>
