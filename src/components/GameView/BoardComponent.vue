<script lang="ts">
import CardComponent from './CardComponent.vue';

export default {
  data() {
    return {
      isShowCard: false,
      selectedItem: -1,
    };
  },
  methods: {
    showCard(index: number) {
      this.selectedItem = index;
      this.$emit('update:selectedItem', this.selectedItem);
    },
  },
  components: {
    CardComponent,
  },
};
</script>

<template>
  <div class="board">
    <div class="field">
      <div class="field__enemy"></div>
      <div class="field__allies"></div>
    </div>
    <div class="board__hand">
      <div class="board__hand-row">
        <CardComponent v-for="item in 6" :key="item" @click="showCard(item)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.board {
  .field {
    height: 42.9vw;
  }

  &__hand {
    margin-top: 2.13%;
    width: 100%;
    height: 13%;

    .card:hover {
      border: 0.5px outset $GOLDEN_COLOR;
      border-radius: 0.3vw;
      z-index: 1;
      transform: translateY(-0.5vw);
    }

    &-row {
      margin-left: 3.3vw;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 93%;
      height: 91%;
      position: relative;
      z-index: 1;

      &:hover {
        box-shadow: 0px 0px 0px 3px rgba($color: #fe9902, $alpha: 0.6);
      }
    }
  }
}

.fog {
  background-image: url('@/assets/images/overlay_fog.png');
}
</style>
