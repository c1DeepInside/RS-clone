<script lang="ts">
export default {};
</script>

<template>
  <!-- "information-true появится сообщение" -->
  <div class="information">
    <div class="information__content information__content-yourPassed"></div>
  </div>
</template>

<style scoped lang="scss">
.information {
  display: none;
  width: 100%;
  height: 14%;
  position: absolute;
  top: 43%;
  background-color: rgba(10, 10, 10, 0.9);
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
      top: 28.1%;
      font-size: 1.5vw;
      color: $GOLDEN_COLOR;
      font-weight: 700;
    }

    &-loseRound {
      background-image: url('@/assets/images/notif_lose_round.png');
      &::after {
        content: 'You have lost the round';
      }
    }

    &-winRound {
      background-image: url('@/assets/images/notif_win_round.png');
      &::after {
        content: 'You have won the round';
      }
    }

    &-yourStart {
      background-image: url('@/assets/images/notif_me_coin.png');
      &::after {
        content: 'You will make the first move';
      }
    }

    &-opponentStart {
      background-image: url('@/assets/images/notif_op_coin.png');
      &::after {
        content: 'The opponent will make the first move';
      }
    }

    &-roundStart {
      background-image: url('@/assets/images/notif_round_start.png');
      &::after {
        content: 'Round start';
      }
    }

    &-yourMove {
      background-image: url('@/assets/images/notif_me_turn.png');
      &::after {
        content: 'Your move';
      }
    }

    &-opponentMove {
      background-image: url('@/assets/images/notif_op_turn.png');
      &::after {
        content: "Opponent's move";
      }
    }

    &-yourPassed {
      background-image: url('@/assets/images/notif_round_passed.png');
      &::after {
        content: 'You made a pass';
      }
    }
    &-opponentPassed {
      background-image: url('@/assets/images/notif_round_passed.png');
      &::after {
        content: 'The opponent made a pass';
      }
    }
  }
}
</style>
