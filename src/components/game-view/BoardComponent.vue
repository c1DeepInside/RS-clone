<script lang="ts">
import { defineComponent } from 'vue';
import LineComponent from './LineComponent.vue';
import cardInfoComponent from '@/components/common/CardInfoComponent.vue';
import type Card from '@/interfaces/card';
import { mapActions, mapState } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import { cardAnimation, leftPos, topPos, type topPosType } from '@/utilits/cardAnimation';

export default defineComponent({
  data() {
    return {
      attackType: {
        melee: 'melee',
        range: 'range',
        siege: 'siege',
      },
      isEnemy: true,
    };
  },
  methods: {
    showCard(card: Card) {
      this.setSelectedCard(card);
      this.setIsShowSelected(true);
    },
    startAnimate(event: Event) {
      const target = event.currentTarget as HTMLElement;
      target.style.transition = '0.5s';
      target.style.transform = `translate(calc(42vw - ${target.offsetLeft}px + 15vw), -17vw) scale(3)`;
      target.style.opacity = '0';
      const clickField = this.$parent?.$refs.clickField as HTMLElement;
      clickField.addEventListener(
        'click',
        () => {
          target.style.opacity = '1';
          target.style.transform = `translate(0, 0)`;
        },
        { once: true }
      );
    },
    putCard(event: Event) {
      if (this.isShowSelectedCard) {
        const target = event.currentTarget as HTMLElement;
        const targetProp = target.id.split('__');
        const isBoost = this.selectedCard.fieldType.includes('boost');
        const isSpy = this.selectedCard.ability === 'spy';
        cardAnimation(
          this.$parent?.$refs.animationWrap as HTMLElement,
          topPos[`${targetProp[1]}_${targetProp[2]}` as topPosType],
          isBoost ? leftPos.boost : leftPos.cards
        );
        this.removeFromHand(this.selectedCard);
        this.setIsShowSelected(false);
        setTimeout(() => {
          this.addToLine(targetProp[2], !isSpy, !isBoost);
        }, 400);
      }
    },
    isFogRainFrost(weather: string): boolean {
      let isActive = false;
      for (let i = 0; i < this.board.weather.length; i++) {
        isActive = this.board.weather[i].ability === weather;
        if (isActive) {
          break;
        }
      }
      return isActive;
    },
    ...mapActions(useGameStore, {
      setIsShowSelected: 'setIsShowSelected',
      setSelectedCard: 'setSelectedCard',
      removeFromHand: 'removeFromHand',
      addToLine: 'addToLine',
      removeFromLine: 'removeFromLine',
    }),
  },
  components: {
    cardInfoComponent,
    LineComponent,
  },
  computed: {
    isRain(): boolean {
      return this.isFogRainFrost('rain');
    },
    isFog(): boolean {
      return this.isFogRainFrost('fog');
    },
    isFrost(): boolean {
      return this.isFogRainFrost('frost');
    },
    ...mapState(useGameStore, {
      hand: 'hand',
      board: 'board',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
    }),
  },
});
</script>

<template>
  <div class="board">
    <div class="field">
      <div class="field__enemy">
        <LineComponent
          :class="`field__enemy__${attackType.siege}`"
          :id="`field__enemy__${attackType.siege}`"
          :activeLine="selectedCard.fieldType.includes('siege') && selectedCard.ability === 'spy' && isShowSelectedCard"
          :type="isEnemy"
          :attackType="attackType.siege"
          :cards="board.enemy.siege"
          :boosts="board.boostEnemy.siege"
          :isActiveWeather="isRain"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.range}`"
          :id="`field__enemy__${attackType.range}`"
          :activeLine="selectedCard.fieldType.includes('range') && selectedCard.ability === 'spy' && isShowSelectedCard"
          :type="isEnemy"
          :attackType="attackType.range"
          :cards="board.enemy.range"
          :boosts="board.boostEnemy.range"
          :isActiveWeather="isFog"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.melee}`"
          :id="`field__enemy__${attackType.melee}`"
          :activeLine="selectedCard.fieldType.includes('melee') && selectedCard.ability === 'spy' && isShowSelectedCard"
          :type="isEnemy"
          :attackType="attackType.melee"
          :cards="board.enemy.melee"
          :boosts="board.boostEnemy.melee"
          :isActiveWeather="isFrost"
          @click="putCard"
        />
      </div>
      <div class="field__allies">
        <LineComponent
          :class="`field__allies__${attackType.melee}`"
          :id="`field__allies__${attackType.melee}`"
          :activeLine="selectedCard.fieldType.includes('melee') && selectedCard.ability !== 'spy' && isShowSelectedCard"
          :activeBoost="selectedCard.fieldType.includes('boost') && isShowSelectedCard"
          :type="!isEnemy"
          :attackType="attackType.melee"
          :cards="board.allies.melee"
          :boosts="board.boostAllies.melee"
          :isActiveWeather="isFrost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.range}`"
          :id="`field__allies__${attackType.range}`"
          :activeLine="selectedCard.fieldType.includes('range') && selectedCard.ability !== 'spy' && isShowSelectedCard"
          :activeBoost="selectedCard.fieldType.includes('boost') && isShowSelectedCard"
          :type="!isEnemy"
          :attackType="attackType.range"
          :cards="board.allies.range"
          :boosts="board.boostAllies.range"
          :isActiveWeather="isFog"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.siege}`"
          :id="`field__allies__${attackType.siege}`"
          :activeLine="selectedCard.fieldType.includes('siege') && selectedCard.ability !== 'spy' && isShowSelectedCard"
          :activeBoost="selectedCard.fieldType.includes('boost') && isShowSelectedCard"
          :type="!isEnemy"
          :attackType="attackType.siege"
          :cards="board.allies.siege"
          :boosts="board.boostAllies.siege"
          :isActiveWeather="isRain"
          @click="putCard"
        />
      </div>
    </div>
    <div class="board__hand">
      <div class="board__hand-row">
        <div
          class="card__wrap"
          v-for="(item, index) in hand"
          :key="index"
          @click="startAnimate($event)"
          :style="`margin-left: -${hand.length / (8.5 + Math.pow(2.15, -hand.length + 15))}vw; left: ${
            hand.length / (8.5 + Math.pow(2.15, -hand.length + 15)) / 2
          }vw`"
        >
          <cardInfoComponent :card="item" :layoutType="0" class="card" @click="showCard(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card__wrap {
  position: relative;
  height: 100%;
  width: 4.5vw;
}

.board {
  .field {
    position: relative;
    height: 43.5vw;

    &__enemy {
      height: 50%;
      position: relative;
      display: flex;
      flex-direction: column;

      &__siege {
        margin-top: 0.65vw;
      }

      &__range {
        margin-top: 0.5vw;
      }

      &__melee {
        margin-top: 0.72vw;
      }
    }

    &__allies {
      height: 50%;
      position: relative;
      &__siege {
        margin-top: 0.75vw;
      }

      &__range {
        margin-top: 0.48vw;
      }

      &__melee {
        margin-top: 0.63vw;
      }
    }
  }

  &__hand {
    margin-top: 1%;
    width: 100%;
    height: 7.1vw;

    .card:hover {
      border-radius: 0.3vw;
      z-index: 1;
      transform: translateY(-0.5vw);
      animation: pulse 1.5s infinite;
    }

    &-row {
      margin-left: 3.3vw;
      display: flex;
      justify-content: center;
      gap: 0.2vw;
      align-items: center;
      width: 93%;
      height: 91%;
      position: relative;
      z-index: 1;

      &:hover {
        background-color: rgba($color: #fe9902, $alpha: 0.1);
        box-shadow: 0px 0px 0px 0.2vw rgba($color: #fe9902, $alpha: 0.6);
      }
    }
  }
}
</style>
