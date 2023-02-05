<script lang="ts">
import { defineComponent } from 'vue';
import CardDescriptionComponent from './CardDescriptionComponent.vue';

export default defineComponent({
  data() {
    return {
      isDescription: true,
    };
  },
  props: {
    selectedItem: {
      type: Number,
      default: -1,
    },
  },
  components: {
    CardDescriptionComponent,
  },
});
</script>

<template>
  <div :class="['card-view', { 'card-view-true': selectedItem !== -1 }]">
    <div
      class="card-view__img"
      :style="{
        backgroundImage: `url('/src/assets/images/card_blue_stripes.png')`,
      }"
    ></div>
    <CardDescriptionComponent v-if="isDescription" />
  </div>
</template>

<style lang="scss" scoped>
.card-view {
  position: absolute;
  top: 0;
  z-index: 90;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;

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
