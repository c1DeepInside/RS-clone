<script lang="ts">
import { defineComponent } from 'vue';
import CardDescriptionComponent from '../common/CardDescriptionComponent.vue';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';
import { mapState } from 'pinia';
import { useGameStore } from '@/stores/GameStore';

export default defineComponent({
  data() {
    return {};
  },
  computed: {
    ...mapState(useGameStore, {
      hand: 'hand',
      board: 'board',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
    }),
  },
  components: {
    CardInfoComponent,
    CardDescriptionComponent,
  },
});
</script>

<template>
  <div :class="['card-view', { 'card-view-true': isShowSelectedCard }]">
    <div class="card__wrap">
      <CardInfoComponent :card="selectedCard" :layoutType="2" />
    </div>

    <div class="description-card">
      <CardDescriptionComponent
        v-if="selectedCard?.ability !== null || selectedCard?.type !== 'usual'"
        :card="selectedCard"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description-card {
  position: absolute;
  top: 43.1vw;
  left: 67.95vw;
}
.card-view {
  .card__wrap {
    position: absolute;
    top: 12vw;
    left: 80vw;
    width: 16.1vw;
  }

  position: absolute;
  top: 0;
  z-index: 90;
  visibility: hidden;
  opacity: 0;

  &-true {
    visibility: visible;
    opacity: 1;
  }

  &__img {
    position: absolute;
    top: 12vw;
    left: 80vw;
    height: 30.4vw;
    width: 16.1vw;
    border-radius: 1vw;
    background-size: cover;
    background-position: center;
  }
}
</style>
