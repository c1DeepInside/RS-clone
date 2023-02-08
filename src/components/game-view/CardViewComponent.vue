<script lang="ts">
import type Card from '@/interfaces/card';
import { defineComponent, type PropType } from 'vue';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';
import CardDescriptionComponent from '@/components/game-view/CardDescriptionComponent.vue';

export default defineComponent({
  data() {
    return {
      isDescription: true,
    };
  },
  props: {
    selectedItem: Object as PropType<Card>,
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CardInfoComponent,
    CardDescriptionComponent,
  },
});
</script>

<template>
  <div :class="['card-view', { 'card-view-true': isShow }]">
    <div class="card__wrap">
      <CardInfoComponent :card="selectedItem" :layoutType="2" />
    </div>

    <div class="description-card">
      <CardDescriptionComponent
        v-if="(isDescription && selectedItem?.ability !== null) || selectedItem?.type === 'hero'"
        :card="selectedItem"
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
