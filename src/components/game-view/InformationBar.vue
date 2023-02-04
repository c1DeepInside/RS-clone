<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <!-- "information-true появится сообщение" -->
  <div class="information information-true">
    <div class="information__content information__content-enemyMove"></div>
  </div>
</template>

<style scoped lang="scss">
.information {
  width: 100%;
  height: 14%;
  position: absolute;
  top: 43%;
  background-color: rgba($color: #101010, $alpha: 0.9);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease;

  &-true {
    opacity: 1;
    visibility: visible;
  }

  &__content {
    width: 17.1%;
    height: 207.25%;
    position: absolute;
    top: -56.6%;
    left: 22.55%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    &::after {
      display: flex;
      align-items: center;
      width: 205%;
      height: 47.25%;
      position: absolute;
      left: 100.5%;
      top: 21.1%;
      font-size: 1.5vw;
      color: $GOLDEN_COLOR;
      font-weight: 700;
    }

    &-roundStart {
      background-image: url('@/assets/images/board_round_start.png');
      &::after {
        content: 'Начало раунда';
      }
    }

    &-loseRound {
      background-image: url('@/assets/images/notif_lose_round.png');
      &::after {
        content: 'You have lost the round';
      }
    }

    &-enemyStart {
      background-image: url('@/assets/images/board_coin_enemy.png');
      &::after {
        content: 'Противник ходит первым';
      }
    }

    &-enemyMove {
      background-image: url('@/assets/images/notif_op_turn.png');
      &::after {
        content: 'Ход противника';
      }
    }

    &-enemyWinRound {
      background-image: url('@/assets/images/notif_op_coin.png');
      &::after {
        content: 'Противник выиграл раунд';
      }
    }

    &-enemyPassed {
      background-image: url('@/assets/images/notif_round_passed.png');
      &::after {
        content: 'Противник спасовал';
      }
    }

    &-alliesStart {
      background-image: url('@/assets/images/board_coin_allies.png');
      &::after {
        content: 'Вы делаете первый ход';
      }
    }

    &-alliesMove {
      background-image: url('@/assets/images/notif_me_turn.png');
      &::after {
        content: 'Ваш ход!';
      }
    }

    &-alliesWinRound {
      background-image: url('@/assets/images/win_round.png');
      &::after {
        content: 'Вы выиграли раунд!';
      }
    }

    &-alliesPassed {
      background-image: url('@/assets/images/notif_round_passed.png');
      &::after {
        content: 'You made a pass';
      }
    }
  }
}
</style>
