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
  <div class="board__player board__player-1">
    <div class="board__row board__row-select">
      <div class="board__row-score">0</div>
      <div class="board__row-boost">
        <CardComponent />
      </div>
      <div class="board__row-cards"></div>
      <div class="board__row-weather"></div>
    </div>
    <div class="board__row board__row-select">
      <div class="board__row-score">12</div>
      <div class="board__row-boost"></div>
      <div class="board__row-cards">
        <CardComponent class="noclick" />
        <CardComponent class="noclick" />
        <CardComponent class="noclick" />
      </div>
      <div class="board__row-weather fog"></div>
    </div>
    <div class="board__row board__row-select">
      <div class="board__row-score">0</div>
      <div class="board__row-boost"></div>
      <div class="board__row-cards"></div>
      <div class="board__row-weather"></div>
    </div>
  </div>
  <div class="board__player board__player-2">
    <div class="board__row board__row-select">
      <div class="board__row-score">0</div>
      <div class="board__row-boost">
        <CardComponent />
      </div>
      <div class="board__row-cards"></div>
      <div class="board__row-weather"></div>
    </div>
    <div class="board__row board__row-select">
      <div class="board__row-score">0</div>
      <div class="board__row-boost">
        <CardComponent class="noclick" />
      </div>
      <div class="board__row-cards"></div>
      <div class="board__row-weather"></div>
    </div>
    <div class="board__row board__row-select">
      <div class="board__row-score">0</div>
      <div class="board__row-boost"></div>
      <div class="board__row-cards"></div>
      <div class="board__row-weather"></div>
    </div>
  </div>
  <div class="board__hand">
    <div class="board__hand-row">
      <CardComponent v-for="item in 6" :key="item" @click="showCard(item)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.board {
  &__player {
    width: 100%;
    height: 38.5%;

    &-1 {
      margin-top: -1.1%;
    }

    &-2 {
      margin-top: 0.5%;
    }
  }

  &__row {
    display: flex;
    height: 32%;
    position: relative;
    top: 4%;
    z-index: 1;

    &-score {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.1%;
      height: 95%;
      position: absolute;
      top: 5%;
      font-size: 1.5vw;
      color: $BLACK_COLOR_MAIN;
      text-shadow: 0 0 5px $WHITE_COLOR;
    }

    &-boost {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 14.25%;
      height: 100%;
      position: absolute;
      left: 5.1%;
    }

    &-cards {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 79.7%;
      height: 100%;
      position: absolute;
      left: 20%;
    }

    &-weather {
      width: 94.25%;
      height: 100%;
      position: absolute;
      top: 1%;
      left: 5.75%;
      pointer-events: none;
      background-size: cover;
      background-position: bottom;
      background-repeat: no-repeat;
    }

    &-select {
      transition: all 0.2s ease;
      &:hover {
        box-shadow: 0 0 0.5vw $GOLDEN_COLOR;
      }
    }
  }

  &__hand {
    margin-top: 1%;
    width: 100%;
    height: 13%;

    .card:hover {
      border: 0.5px outset $GOLDEN_COLOR;
      border-radius: 0.3vw;
      margin-bottom: 1vw;
      z-index: 1;
    }

    &-row {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 92.5%;
      height: 91%;
      position: relative;
      top: 3%;
      left: 7.1%;
      z-index: 1;
    }
  }
}

.fog {
  background-image: url('@/assets/images/overlay_fog.png');
}
</style>
