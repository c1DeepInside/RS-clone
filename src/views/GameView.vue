<script lang="ts">
import { defineComponent } from 'vue';
import PlayerComponent from '@/components/game-view/PlayerComponent.vue';
import CardComponent from '@/components/game-view/CardComponent.vue';
import BoardComponent from '@/components/game-view/BoardComponent.vue';
import CardViewComponent from '@/components/game-view/CardViewComponent.vue';
import InformationBar from '@/components/game-view/InformationBar.vue';
import EndComponent from '@/components/game-view/EndComponent.vue';

export default defineComponent({
  data() {
    return {
      isPass: false,
      isEnd: false,
      selectedItem: -1,
    };
  },
  methods: {
    showPass() {
      this.isPass = !this.isPass;
    },
    showEndGame() {
      this.isEnd = !this.isEnd;
    },
    updateSelectedItem(value: number) {
      this.selectedItem = value;
    },
    updateShowEnd(value: boolean) {
      this.isEnd = value;
    },
  },
  components: {
    PlayerComponent,
    CardComponent,
    BoardComponent,
    CardViewComponent,
    EndComponent,
    InformationBar,
  },
});
</script>

<template>
  <main class="page-game">
    <div :class="['click', { noclick: selectedItem === -1 }]" @click="selectedItem = -1"></div>
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
        <button @click="showPass" class="btn-game game__pass">Fold</button>
        <div class="game__player game__player-2 player game__player-active">
          <PlayerComponent
            name="Player 2"
            deckName="Nifgaardian Empire"
            count="10"
            img="/src/assets/images/deck_shield_realms.png"
            :isPass="isPass"
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
        <button @click="showEndGame" class="btn-game game__give-up">Give Up</button>
      </div>
      <div class="game__board board">
        <BoardComponent @update:selectedItem="updateSelectedItem" />
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
    <CardViewComponent :selectedItem="selectedItem" />
    <InformationBar />
    <EndComponent :isEnd="isEnd" @update:showEnd="updateShowEnd" />
  </main>
</template>

<style lang="scss" scoped>
.page-game {
  width: 100%;
  height: calc(100vw * 1080 / 1920);
  background-image: url('@/assets/images/board.png');
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
    background-color: rgba($color: #101010, $alpha: 0.8);

    &-1 {
      margin-top: 10%;
    }

    &-2 {
      margin-top: 7%;
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

    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
    }

    .card {
      border-radius: 0.2vw;

      &:hover {
        border: 0.5px outset $GOLDEN_COLOR;
        border-radius: 0.2vw;
        z-index: 1;
        transform: translateY(-0.5vw);
      }
    }
  }

  &__pass {
    position: relative;
    top: 2%;
    left: 44%;
    width: 23%;
    height: 4%;
  }

  &__give-up {
    position: relative;
    top: -8%;
    left: 63%;
    width: 23%;
    height: 4%;
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

  &__cemetery {
    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.15vw rgba($color: #fe9902, $alpha: 0.6);
    }

    .card {
      border-radius: 0.2vw;
    }
  }

  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba($color: #101010, $alpha: 0.8);
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
