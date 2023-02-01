<script lang="ts">
import { defineComponent } from 'vue';
import PlayerComponent from '@/components/GameView/PlayerComponent.vue';
import CardComponent from '@/components/GameView/CardComponent.vue';
import BoardComponent from '@/components/GameView/BoardComponent.vue';
import EndComponent from '@/components/GameView/EndComponent.vue';

export default defineComponent({
  data() {
    return {};
  },
  methods: {},
  components: {
    PlayerComponent,
    CardComponent,
    BoardComponent,
    EndComponent,
  },
});
</script>

<template>
  <main class="page-game">
    <div class="click noclick"></div>
    <div class="game">
      <div class="game__players">
        <div class="game__leader game__leader-1">
          <div class="game__leader-card">
            <CardComponent />
          </div>
          <div class="game__leader-icon">
            <div></div>
          </div>
        </div>
        <div class="game__player game__player-1 player">
          <PlayerComponent
            name="Player 1"
            deckName="Nifgaardian Empire"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
          />
        </div>
        <div class="game__weather">
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <div class="game__player game__player-2 player game__player-active">
          <PlayerComponent
            name="Player 2"
            deckName="Nifgaardian Empire"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
          />
        </div>
        <div class="game__leader game__leader-2">
          <div class="game__leader-card">
            <CardComponent />
          </div>
          <div class="game__leader-icon game__leader-active">
            <div></div>
          </div>
        </div>
        <button class="btn-game game__pass">Fold</button>
      </div>
      <div class="game__board board">
        <BoardComponent />
      </div>
      <div class="game__decks deck">
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-1">
            <CardComponent />
          </div>
          <div class="deck__player deck__player-1">
            <CardComponent />
            <div class="deck__counter">28</div>
          </div>
        </div>
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-2">
            <CardComponent />
          </div>
          <div class="deck__player deck__player-2">
            <CardComponent />
            <div class="deck__counter">28</div>
          </div>
        </div>
      </div>
    </div>
    <EndComponent />
  </main>
</template>

<style scoped lang="scss">
.page-game {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  background-image: url('@/assets/images/game_board.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.click {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.game {
  display: flex;
  flex-direction: row;
  height: 100%;

  &__players {
    width: 26.5%;
  }

  &__board {
    width: 53%;
  }

  &__decks {
    width: 20.5%;
  }

  &__leader {
    width: 31.4%;
    height: 12.5%;
    margin-left: 27.5%;

    &-1 {
      margin-top: 15.55%;
    }

    &-2 {
      margin-top: 6.5%;
    }

    &-card {
      position: relative;
      height: 100%;
      width: 63%;
      margin-bottom: -80%;
      display: flex;
      align-items: center;
      justify-content: center;

      .card {
        pointer-events: none;
        position: absolute;
        height: 98%;
        width: 95%;
      }
    }

    &-icon {
      position: relative;
      top: 33%;
      left: 75%;
      height: 28%;
      width: 24%;
    }

    &-active {
      div {
        width: 100%;
        height: 100%;
        position: relative;
        background-image: url('@/assets/images/icon_leader_active.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }

  &__player {
    height: 12.5%;
    width: 88.5%;
    background-color: rgba(20, 20, 20, 0.6);

    &-1 {
      margin-top: 10%;
    }

    &-2 {
      margin-top: 15.5%;
    }

    &-active {
      box-shadow: -3vw 0px 1vw 0.1vw $GOLDEN_COLOR;
    }
  }

  &__weather {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 9.75%;
    margin-left: 27.9%;
    width: 54.9%;
    height: 12.75%;
    z-index: 1;
  }

  &__pass {
    position: relative;
    top: -9%;
    left: 63%;
    width: 23%;
    height: 5%;
  }
}

.deck {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 76.06%;
    height: 13.5%;
    margin-left: 4%;

    &:first-child {
      margin-top: 18%;
    }

    &:last-child {
      margin-bottom: 27%;
    }
  }

  &__cemetery,
  &__player {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 38.6%;
    height: 100%;
    overflow: visible;
    z-index: 1;
  }

  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(20, 20, 20, 0.8);
    width: 3vw;
    left: 1.5vw;
    height: 2vw;
    z-index: 1;
    font-size: 1.3vw;
    color: $TAN_COLOR;
  }

  .card {
    position: relative;
    pointer-events: none;
  }
}
</style>
