<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'Player',
    },
    deckName: {
      type: String,
      default: 'Nifgaardian Empire',
    },
    count: {
      type: String,
      default: '10',
    },
    img: {
      type: String,
      default: '/src/assets/images/deck_shield_realms.png',
    },
    isPass: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="player__img">
    <div>
      <div
        :style="{
          backgroundImage: `url(${img})`,
        }"
      ></div>
    </div>
  </div>
  <template v-if="name === 'Player 1'">
    <div class="player__name">{{ name }}</div>
    <div class="player__deck-name">{{ deckName }}</div>
    <div class="player__hand-count">{{ count }}</div>
    <div class="player__gem player__gem-1 player__gem-true"></div>
    <div class="player__gem player__gem-2"></div>
  </template>
  <template v-else>
    <div class="player__hand-count">{{ count }}</div>
    <div class="player__gem player__gem-1 player__gem-true"></div>
    <div class="player__gem player__gem-2"></div>
    <div class="player__name">{{ name }}</div>
    <div class="player__deck-name">{{ deckName }}</div>
  </template>
  <div class="player__score player__score-more">
    <div>0</div>
  </div>
  <div :class="['player__passed', { 'player__passed-true': isPass }]">Passed</div>
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
    background-image: url('@/assets/images/profile.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 100%;

    div {
      position: relative;
      left: -10%;
      top: -6%;
      height: 118%;
      width: 118%;
      background-image: url('@/assets/images/icon_player_border.png');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      overflow: visible;

      div {
        position: relative;
        width: 43%;
        height: 43%;
        left: -10.5%;
        top: 0.5%;
        background-image: url('@/assets/images/deck_shield_realms.png');
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
    background-image: url('@/assets/images/icon_card_count.png');
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
    background-image: url('@/assets/images/icon_gem_off.png');
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
      background-image: url('@/assets/images/icon_gem_on.png');
    }
  }

  &__score {
    position: relative;
    left: 94.5%;
    height: 40%;
    width: 12%;
    top: 31%;
    margin-bottom: -12%;
    font-weight: 700;
    font-size: 2.29vw;
    color: $BLACK_COLOR_MAIN;
    text-shadow: 0 0 5px $WHITE_COLOR;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &-more {
      div {
        position: relative;
        left: -46%;
        top: -32%;
        width: 195%;
        height: 170%;
        background-image: url('@/assets/images/icon_high_score.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: bottom;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__passed {
    width: 0;
    height: 0;
    position: relative;
    left: 90%;
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
    }
  }
}
.game__player-1 .player__score {
  background-image: url('@/assets/images/score_total_op.png');
}
.game__player-2 {
  .player {
    &__img {
      div {
        div {
          top: 59%;
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