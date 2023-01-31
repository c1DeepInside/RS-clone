<script lang="ts">
import { defineComponent } from "vue";
import PlayerComponent from "@/components/GameView/PlayerComponent.vue";
import CardComponent from "@/components/GameView/CardComponent.vue";

export default defineComponent({
  data() {
    return {};
  },
  methods: {},
  components: {
    PlayerComponent,
    CardComponent,
  },
});
</script>

<template>
  <main class="page-game">
    <div class="click noclick"></div>
    <div class="game">
      <div class="game__players">
        <div class="game__leader game__leader-1">
          <CardComponent />
        </div>
        <div class="game__player game__player-1 player">
          <PlayerComponent
            name="Player 1"
            deckName="Nifgaardian Empire"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
          />
        </div>
        <div class="game__weather"></div>
        <div class="game__player game__player-2 player">
          <PlayerComponent
            name="Player 2"
            deckName="Nifgaardian Empire"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
          />
        </div>
        <div class="game__leader game__leader-2">
          <div class="card"></div>
        </div>
      </div>
      <div class="game__board board"></div>
      <div class="game__decks deck">
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-one">
            <CardComponent v-for="(item, index) in 10" :key="index" />
          </div>
          <div class="deck__player deck__player-one">
            <CardComponent v-for="(item, index) in 10" :key="index" />
            <div class="deck__counter">28</div>
          </div>
        </div>
        <div class="deck__content">
          <div class="deck__cemetery deck__cemetery-two">
            <CardComponent v-for="(item, index) in 10" :key="index" />
          </div>
          <div class="deck__player deck__player-two">
            <CardComponent v-for="(item, index) in 10" :key="index" />
            <div class="deck__counter">28</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page-game {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  background-image: url("@/assets/images/game_board.jpg");
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
    position: relative;
    left: 27.5%;
    width: 31.4%;
    height: 12.5%;
    margin-bottom: -26.25%;

    &-1 {
      top: 7.55%;
    }

    &-2 {
      top: 77.5%;
    }
  }

  &__player {
    position: relative;
    margin-bottom: -27%;
    height: 12.5%;
    width: 88.5%;
    background-color: rgba(20, 20, 20, 0.6);

    &-1 {
      top: 24.25%;
    }

    &-2 {
      top: 61.75%;
    }
  }

  &__weather {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: -27%;
    top: 41.75%;
    left: 27.9%;
    width: 54.9%;
    height: 12.75%;
    z-index: 1;
  }
}

.card {
  margin: 0 2px;
  flex-shrink: 0;
  height: 105px;
  width: 75px;
  background-image: url("@/assets/images/neutral_emiel.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.2s ease;
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
}
</style>
