<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type Card from '@/interfaces/card';
import CardInfoCopmponent, { CardLayoutType } from '@/components/common/CardInfoComponent.vue';
import CardDescriptionComponent from '@/components/common/CardDescriptionComponent.vue';
import { mapState, mapActions } from 'pinia';
import { useGameStore } from '@/stores/GameStore';

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
  emits: ['cardSelected'],
  components: {
    CardInfoCopmponent,
    CardDescriptionComponent,
  },
  methods: {
    getCardSize(idx: number): CardSize {
      if (idx === this.selectedCardIdx) {
        return CardSize.large;
      }

      if (idx - 1 === this.selectedCardIdx) {
        return CardSize.medium;
      }

      if (idx + 1 === this.selectedCardIdx) {
        return CardSize.medium;
      }

      return CardSize.small;
    },
    ...mapActions(useGameStore, {
      setShowDiscard: 'setShowDiscard',
      addToLine: 'addToLine',
      setSelectedCard: 'setSelectedCard',
      removeFromDiscard: 'removeFromDiscard',
    }),
    onCardClick(idx: number) {
      if (idx === this.selectedCardIdx) {
        this.$emit('cardSelected', this.cards[this.selectedCardIdx]);
      } else {
        this.selectedCardIdx = idx;
      }
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
    ...mapState(useGameStore, {
      selectedCard: 'selectedCard',
      discard: 'discard',
      showDiscard: 'showDiscard',
      whoseDiscard: 'whoseDiscard',
    }),
  },
});
</script>

<template>
  <div v-if="cards.length > 0" class="choice-panel__cards" :style="{ maxWidth: panelSize }">
    <div class="choice-panel__cards-inner">
      <div
        class="card-wrapper"
        :style="{
          width: getCardSize(idx - 2) + 'vw',
          marginLeft: idx === 0 ? `-${offset}vw` : '0',
        }"
        v-for="(card, idx) in [null, null, ...cards]"
        :key="`${card?.id}-${idx}`"
      >
        <CardInfoCopmponent
          :card="card"
          :layout-type="cardLayoutType.EXTENDED"
          :is-selected="idx - 2 === selectedCardIdx"
          @click="onCardClick(idx - 2)"
          v-if="card"
        />

        <div
          v-else
          class="dummy-card"
          :style="{
            width: getCardSize(idx - 2) + 'vw',
          }"
        ></div>
      </div>
    </div>

    <div class="description-card">
      <CardDescriptionComponent
        v-if="cards[selectedCardIdx]?.ability !== null || cards[selectedCardIdx]?.type !== 'usual'"
        :card="cards[selectedCardIdx]"
      />
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
  &__cards {
    margin: 0 auto;
    margin-top: 5px;
  }
  &__cards-inner {
    display: flex;
    gap: 2vw;
    position: relative;
    overflow: hidden;
    padding-top: 1vw;
  }
}
.card-wrapper {
  flex-shrink: 0;
  position: relative;
  height: 30vw;
  transition: margin-left linear 0.2s;
}
.dummy-card {
  height: 50%;
}
.description-card {
  margin-top: 0.5vw;
  margin-left: 20.5vw;
}
:deep(.card-info) {
  transition: transform linear 0.2s;
}
</style>
