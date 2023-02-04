<script lang="ts">
import { defineComponent } from 'vue';
import CardInfoCopmponent from '@/components/GameView/CardInfoComponent.vue';

enum CardSize {
  large = 15,
  medium = 13,
  small = 11,
}

export default defineComponent({
  data() {
    return {
      cards: [null, null, 1, 2, 3, 4, 5, 6, 7],
      selectedCard: 1,
      cardSizeEnum: CardSize,
    };
  },
  components: {
    CardInfoCopmponent,
  },
  methods: {
    getCardSize(idx: number): CardSize {
      if (this.cards[idx] == this.selectedCard) {
        return CardSize.large;
      }

      if (this.cards[idx - 1] == this.selectedCard) {
        return CardSize.medium;
      }

      if (this.cards[idx + 1] == this.selectedCard) {
        return CardSize.medium;
      }

      return CardSize.small;
    },
  },
  computed: {
    offset(): number {
      const gap = 2;
      const idx = this.cards.indexOf(this.selectedCard) - 2;

      return CardSize.small * idx + gap * idx;
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
        v-for="(card, idx) in cards"
        :key="idx"
      >
        <CardInfoCopmponent :is-selected="card == selectedCard" @click="selectedCard = card" v-if="card" />
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
  }
}

.card-wrapper {
  flex-shrink: 0;
  position: relative;
  transition: margin-left linear 0.2s;
}

.dummy-card {
  height: 500px;
}

:deep(.card-info) {
  transition: transform linear 0.2s;
}
</style>
