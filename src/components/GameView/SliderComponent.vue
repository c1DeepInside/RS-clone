<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type Card from '@/interfaces/card';
import CardInfoCopmponent, { CardLayoutType } from '@/components/GameView/CardInfoComponent.vue';

enum CardSize {
  large = 15,
  medium = 13,
  small = 11,
}

export default defineComponent({
  data() {
    return {
      selectedCardIdx: 0,
      cardSizeEnum: CardSize,
      cardLayoutType: CardLayoutType,
    };
  },
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      default: () => [],
    },
  },
  components: {
    CardInfoCopmponent,
  },
  methods: {
    getCardSize(idx: number): CardSize {
      const cards = [null, null, ...this.cards];
      const selectedCard = this.cards[this.selectedCardIdx];

      if (cards[idx]?.id === selectedCard?.id) {
        return CardSize.large;
      }

      if (cards[idx - 1]?.id === selectedCard?.id) {
        return CardSize.medium;
      }

      if (cards[idx + 1]?.id === selectedCard?.id) {
        return CardSize.medium;
      }

      return CardSize.small;
    },
  },
  computed: {
    offset(): number {
      const gap = 2;

      return CardSize.small * this.selectedCardIdx + gap * this.selectedCardIdx;
    },
    panelSize(): string {
      const gap = 2;
      const cardsNum = 5;

      const l = CardSize.large;
      const m = CardSize.medium;
      const s = CardSize.small;

      return `${l + m * 2 + s * 2 + (gap * cardsNum - 1)}vw`;
    },
  },
});
</script>

<template>
  <div class="choice-panel__cards" :style="{ maxWidth: panelSize }">
    <div class="choice-panel__cards-inner">
      <div
        class="card-wrapper"
        :style="{
          width: getCardSize(idx) + 'vw',
          marginLeft: idx === 0 ? `-${offset}vw` : '0',
        }"
        v-for="(card, idx) in [null, null, ...cards]"
        :key="idx"
      >
        <CardInfoCopmponent
          :card="card"
          :layout-type="cardLayoutType.EXTENDED"
          :is-selected="idx - 2 === selectedCardIdx"
          @click="selectedCardIdx = idx - 2"
          v-if="card"
        />

        <div
          v-else
          class="dummy-card"
          :style="{
            width: getCardSize(idx) + 'vw',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    margin: 0 auto;
    margin-top: 5px;
  }

  &__cards-inner {
    display: flex;
    gap: 2vw;
    overflow: hidden;
    padding-top: 10px;
  }
}

.card-wrapper {
  flex-shrink: 0;
  position: relative;
  transition: margin-left linear 0.2s;
}

.dummy-card {
  height: 400px;
}

:deep(.card-info) {
  transition: transform linear 0.2s;
}
</style>
