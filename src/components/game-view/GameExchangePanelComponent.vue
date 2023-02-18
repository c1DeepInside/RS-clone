<script lang="ts">
import { defineComponent } from 'vue';
import SliderComponent from '@/components/common/SliderComponent.vue';
import type Card from '@/interfaces/card';
import { useGameStore } from '@/stores/GameStore';
import { mapState, mapActions, mapWritableState } from 'pinia';

export default defineComponent({
  data() {
    return {
      show: true,
      changeCount: 0,
    };
  },
  components: {
    SliderComponent,
  },
  methods: {
    ...mapActions(useGameStore, {
      removeFromHand: 'removeFromHand',
      exchangeCard: 'exchangeCard',
    }),
    onChange(card: Card) {
      this.exchangeCard(card);
      this.changeCount += 1;
      if (this.changeCount === 2) {
        this.show = false;
        this.isShowExchangePanel = false;
      }
    },
  },
  computed: {
    ...mapState(useGameStore, {
      hand: 'hand',
      board: 'board',
    }),
    ...mapWritableState(useGameStore, {
      isShowExchangePanel: 'isShowExchangePanel',
      isShowQuestion: 'isShowQuestion',
    }),
  },
});
</script>

<template>
  <div v-if="show" class="choice-panel">
    <div class="close" @click="show = false, isShowExchangePanel = false;">x</div>
    <div class="choice-panel__title">
      Выберите, какую карту обменять.
      <span class="choice-panel__count-carts">{{ changeCount }}/2</span>
    </div>
    <SliderComponent @card-selected="onChange" :cards="hand" />
  </div>
</template>

<style lang="scss" scoped>
.choice-panel {
  position: absolute;
  height: 117vh;
  width: 100%;
  z-index: 120;
  background-color: rgba(58, 41, 25, 0.486);

  &__title {
    margin-top: 7vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 5vw;
    font-size: 1.8vw;
    letter-spacing: -1px;
    background-color: $BLACK_COLOR_MAIN;
    color: $TAN_COLOR;
  }

  &__cards {
    margin: 0 auto;
    margin-top: 5px;
  }
  .close {
    position: absolute;
    color: white;
    font-size: 4vw;
    top: 7.2vw;
    right: 6vw;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
