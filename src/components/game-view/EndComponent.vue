<script lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { mapWritableState, mapState, mapActions } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
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
    changeDeck() {
      this.isShowSearch = false;
      this.disconnect();
    },
    ...mapActions(useGameStore, {
      disconnect: 'disconnect',
    }),
  },
  computed: {
    endGameClass(): string {
      if (this.lives.allies > this.lives.enemy) {
        return 'end-win';
      }

      if (this.lives.allies < this.lives.enemy) {
        return 'end-lose';
      }

      return 'end-draw';
    },
    ...mapState(useGameStore, {
      lives: 'lives',
      stats: 'stats',
      enemyNickName: 'enemyNickName',
      alliesNickName: 'alliesNickName',
    }),
    ...mapWritableState(useGameStore, {
      isShowSearch: 'isShowSearch',
    }),
  },
});
</script>

<template>
  <div :class="['end', { 'end-true': isEnd }]">
    <div class="end__img" :class="endGameClass"></div>
    <table class="end__table table">
      <thead>
        <tr>
          <th class="table__header"></th>
          <th class="table__header">Раунд 1</th>
          <th class="table__header">Раунд 2</th>
          <th class="table__header">Раунд 3</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr>
          <th class="table__header">{{ enemyNickName }}</th>
          <td class="table__td" :style="{
            color: stats.enemy[idx] > stats.allies[idx] ? 'goldenrod' : ''
          }" v-for="(i, idx) in stats.enemy">{{ i }}</td>
        </tr>
        <tr>
          <th class="table__header">{{ alliesNickName }}</th>
          <td class="table__td" :style="{
            color: stats.allies[idx] > stats.enemy[idx] ? 'goldenrod' : ''
          }" v-for="(i, idx) in stats.allies">{{ i }}</td>
        </tr>
        <tr>
          <th class="table__header">{{ alliesNickName }}</th>
          <td class="table__td" :style="{
            color: stats.allies[idx] > stats.enemy[idx] ? 'goldenrod' : ''
          }" v-for="(i, idx) in stats.allies">{{ i }}</td>
        </tr>
      </tbody>
    </table>
    <div class="end__btns">
      <button class="btn-game end__btn" @click="changeDeck">Изменить</button>
      <button class="btn-game end__btn" @click="changeDeck">Повторить</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.end {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  position: absolute;
  top: 0;
  z-index: 1000;
  background-color: rgba($color: #101010, $alpha: 0.9);
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

  &-draw {
    background-image: url('@/assets/images/end_draw.png');
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
