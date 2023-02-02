<script lang="ts">
export default {
  props: {
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showEnd: true,
    };
  },
  methods: {
    showEndGame() {
      this.showEnd = false;
      this.$emit('update:showEnd', this.showEnd);
    },
  },
};
</script>

<template>
  <div :class="['end', { 'end-true': isEnd }]">
    <div class="end__img end-lose"></div>
    <table class="end__table table">
      <thead>
        <tr>
          <th class="table__header"></th>
          <th class="table__header">Round 1</th>
          <th class="table__header">Round 2</th>
          <th class="table__header">Round 3</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr>
          <th class="table__header">Player 1</th>
          <td class="table__td">0</td>
          <td class="table__td">0</td>
          <td class="table__td">0</td>
        </tr>
        <tr>
          <th class="table__header">Player 2</th>
          <td class="table__td" :style="{ color: 'goldenrod' }">12</td>
          <td class="table__td" :style="{ color: 'goldenrod' }">12</td>
          <td class="table__td">0</td>
        </tr>
      </tbody>
    </table>
    <div class="end__btns">
      <button class="btn-game end__btn">Edit</button>
      <button class="btn-game end__btn" @click="showEndGame">Replay</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.end {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  position: absolute;
  top: 0;
  z-index: 1000;
  background-color: rgba(10, 10, 10, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  &-true {
    opacity: 1;
    visibility: visible;
  }

  &__img {
    position: relative;
    top: 12.6%;
    left: 32.9%;
    width: calc(100% * 656 / 1920);
    height: calc(100% * 416 / 1080);
    background-size: contain;
  }

  &-lose {
    background-image: url('@/assets/images/end_lose.png');
  }

  &-win {
    background-image: url('@/assets/images/end_win.png');
  }

  &__btns {
    display: flex;
    justify-content: space-between;
    width: 30%;
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__btn {
    height: 3vw;
    width: 10vw;
  }

  &__table {
    position: relative;
    top: 55%;
    left: 7.6%;
    width: 74%;
    height: 22%;
    margin-top: -21%;
    table-layout: fixed;
    font-size: 0.9vw;
    text-align: center;
    color: $GRAY_COLOR;
  }
}

.table {
  &__header,
  &__td {
    padding: 1% 1.5%;
    font-weight: 500;
  }

  &__body {
    .table__header {
      font-size: 1.2vw;
      text-align: right;
      color: $GOLDEN_COLOR;
    }

    .table__td {
      font-size: 1.7vw;
    }
  }
}
</style>
