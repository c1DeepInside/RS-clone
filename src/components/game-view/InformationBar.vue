<script lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
  computed: {
    ...mapState(useGameStore, {
      infoBarMessage: 'infoBarMessage',
    }),
  },
});
</script>

<template>
  <div class="information information-true">
    <div :class="`information__content information__content-${infoBarMessage}`"></div>
  </div>
</template>

<style scoped lang="scss">
.information {
  width: 100%;
  height: 8vw;
  position: absolute;
  top: 22vw;
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
      background-image: url('@/assets/images/board_lose_round.png');

      &::after {
        content: 'Противник выиграл раунд';
      }
    }

    &-drawRound {
      background-image: url('@/assets/images/board_draw_round.png');

      &::after {
        content: 'Раунд завершился вничью';
      }
    }

    &-north {
      background-image: url('@/assets/images/board_north.png');

      &::after {
        content: 'Из-за умения фракции королевств Севера - Север берет дополнительную карту.';
      }
    }

    &-monsters {
      background-image: url('@/assets/images/board_monsters.png');

      &::after {
        content: 'Срабатывает способность фракции монстров - одна случайно выбранная карта подразделения монстра остается на доске.';
      }
    }

    &-scoiatael {
      background-image: url('@/assets/images/board_scoiatael.png');

      &::after {
        content: "Противник воспользовался свойством фракции скоя'таэлей, чтобы пойти первым.";
      }
    }

    &-enemyStart {
      background-image: url('@/assets/images/board_coin_enemy.png');

      &::after {
        content: 'Противник ходит первым';
      }
    }

    &-enemyMove {
      background-image: url('@/assets/images/board_turn_enemy.png');

      &::after {
        content: 'Ход противника';
      }
    }

    &-enemyWinRound {
      background-image: url('@/assets/images/board_turn_enemy.png');

      &::after {
        content: 'Противник выиграл раунд';
      }
    }

    &-enemyPassed {
      background-image: url('@/assets/images/board_round_passed.png');

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
      background-image: url('@/assets/images/board_turn_allies.png');

      &::after {
        content: 'Ваш ход!';
      }
    }

    &-alliesWinRound {
      background-image: url('@/assets/images/board_win_round.png');

      &::after {
        content: 'Вы выиграли раунд!';
      }
    }

    &-nilfgard {
      background-image: url('@/assets/images/notif_skellige.png');

      &::after {
        content: 'Из-за умений фракции, Нильфгаард выходит из ничьей победителем';
      }
    }

    &-alliesPassed {
      background-image: url('@/assets/images/board_round_passed.png');

      &::after {
        content: 'Вы спасовали';
      }
    }
  }
}
</style>
