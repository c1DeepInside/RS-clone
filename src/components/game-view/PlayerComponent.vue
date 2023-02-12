<script lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { mapState, mapActions } from 'pinia';
import { fractions } from '@/utilits/cardBuildImgs';
import type { IntRange } from '@/utilits/types';
import { defineComponent, type PropType } from 'vue';

export enum PlayerType {
  enemy = 'enemy',
  ally = 'allies',
}

export default defineComponent({
  data() {
    return {
      imageAvatar:
        this.playerType === PlayerType.enemy
          ? 'src/assets/images/player_avatar_enemy.png'
          : 'src/assets/images/player_avatar_geralt.png',
      fractionsEmblemImg: fractions,
    };
  },
  props: {
    playerType: {
      type: String as PropType<PlayerType>,
      default: () => PlayerType.ally,
    },
    isPass: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getFraction() {
      const idx = this.leader[this.playerType].fractionId! as IntRange<0, 4>;
      return fractions[idx];
    },
    getNickName() {
      return this.playerType === 'enemy' ? this.enemyNickName : this.alliesNickName;
    },
    getNumbersCards() {
      return this.playerType === 'enemy' ? this.enemyHand.length : this.hand.length;
    },
    ...mapActions(useGameStore, {
      setAlliesPower: 'setAlliesPower',
      setEnemyPower: 'setEnemyPower',
    }),
  },
  computed: {
    ...mapState(useGameStore, {
      hand: 'hand',
      leader: 'leader',
      enemyNickName: 'enemyNickName',
      alliesNickName: 'alliesNickName',
      lives: 'lives',
      getAlliesPower: 'alliesPower',
      getEnemyPower: 'enemyPower',
      enemyHand: 'enemyHand',
    }),
    alliesPower(): number {
      this.setAlliesPower();
      return this.getAlliesPower;
    },
    enemyPower(): number {
      this.setEnemyPower();
      return this.getEnemyPower;
    },
  },
});
</script>

<template>
  <div
    class="player__img"
    :style="{
      backgroundImage: `url(${imageAvatar})`,
    }"
  >
    <div>
      <div
        :style="{
          backgroundImage: `url(${getFraction().img})`,
        }"
      ></div>
    </div>
  </div>
  <div class="player__name">{{ getNickName() }}</div>
  <div class="player__deck-name">{{ getFraction().name }}</div>
  <div class="player__hand-count">{{ getNumbersCards() }}</div>
  <div v-if="lives[playerType] >= 1" class="player__gem player__gem-1 player__gem-true"></div>
  <div v-else class="player__gem player__gem-1"></div>

  <div v-if="lives[playerType] === 2" class="player__gem player__gem-2 player__gem-true"></div>
  <div v-else class="player__gem player__gem-2"></div>

  <div class="player__score player__score-more">
    <span>{{ playerType === 'enemy' ? Number(enemyPower) : Number(alliesPower) }}</span>
    <div
      v-if="
        (playerType === 'enemy' && Number(enemyPower) > Number(alliesPower)) ||
        (playerType === 'allies' && Number(enemyPower) < Number(alliesPower))
      "
    ></div>
  </div>
  <div :class="['player__passed', { 'player__passed-true': isPass }]">Пас</div>
</template>

<style lang="scss" scoped>
.player {
  &__img {
    position: relative;
    left: 28.4%;
    top: 9.6%;
    width: 21.9%;
    height: 80%;
    margin-bottom: -24%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 100%;

    div {
      position: relative;
      left: -28%;
      top: -23%;
      height: 152%;
      width: 152%;
      background-image: url('@/assets/images/player_avatar_border.png');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      overflow: visible;

      div {
        position: relative;
        width: 30%;
        height: 30%;
        left: 4.5%;
        top: 4.5%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  &__name {
    position: relative;
    left: 53%;
    top: 6%;
    width: 41.5%;
    height: 20%;
    margin-bottom: -6%;
    font-weight: 700;
    font-size: 1.04vw;
    color: $GOLDEN_COLOR;
    overflow: hidden;
    white-space: nowrap;
  }

  &__deck-name {
    position: relative;
    left: 53%;
    top: 25%;
    width: 41.5%;
    height: 20%;
    margin-bottom: -6%;
    font-size: 0.94vw;
    color: $TAN_COLOR;
    overflow: hidden;
  }

  &__hand-count {
    position: relative;
    top: 58.5%;
    left: 53.25%;
    height: 29.5%;
    width: 17%;
    margin-bottom: -9%;
    padding-left: 7%;
    background-image: url('@/assets/images/board_cards.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    font-weight: 700;
    font-size: 1.67vw;
    color: $GOLDEN_COLOR;
  }

  &__gem {
    width: 9%;
    height: 31%;
    margin-bottom: -9.25%;
    background-image: url('@/assets/images/player_gem_off.png');
    background-size: contain;
    background-repeat: no-repeat;

    &-1 {
      position: relative;
      top: 56.25%;
      left: 70.75%;
    }

    &-2 {
      position: relative;
      top: 56%;
      left: 80%;
    }

    &-true {
      background-image: url('@/assets/images/player_gem_on.png');
    }
  }

  &__score {
    position: relative;
    left: 94.5%;
    height: 40%;
    width: 12%;
    top: 31%;
    margin-bottom: -12%;
    font-weight: 500;
    font-size: 1.4vw;
    color: $BLACK_COLOR_MAIN;
    text-shadow: 0 0 5px white;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 26%;
    }

    &-more {
      div {
        position: absolute;
        left: -46%;
        top: -28%;
        width: 195%;
        height: 170%;
        background-image: url('@/assets/images/player_winner.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        animation: pulse 2s infinite;
      }
    }
  }

  &__passed {
    width: 0;
    height: 0;
    position: relative;
    left: 94%;
    top: 87%;
    font-weight: 700;
    font-size: 1.5vw;
    text-shadow: 1px 1px 2px $BLACK_COLOR_MAIN;
    color: $TAN_COLOR;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;

    &-true {
      opacity: 1;
      visibility: visible;
      text-shadow: 0 0 2vw $TAN_COLOR;
      animation: glow 1s ease-in-out infinite alternate;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes glow {
  0% {
    text-shadow: -0.5vw 0 1.5vw $TAN_COLOR;
  }
  50% {
    text-shadow: 0.5vw 0 1.5vw $TAN_COLOR;
  }
  100% {
    text-shadow: 0 0 1.5vw $TAN_COLOR;
  }
}
.game__player-1 {
  .player__score {
    background-image: url('@/assets/images/score_total_op.png');
  }
  .player__img {
    background-size: auto;
  }
}

.game__player-2 {
  .player {
    &__img {
      div {
        div {
          top: 56%;
        }
      }
    }

    &__hand-count {
      top: 18.5%;
    }

    &__gem-1 {
      top: 14.5%;
      left: 70.75%;
    }

    &__gem-2 {
      top: 14.5%;
      left: 80%;
    }

    &__name {
      top: 60%;
    }

    &__deck-name {
      top: 80%;
    }

    &__score {
      background-image: url('@/assets/images/score_total_me.png');
    }
  }
}
</style>
