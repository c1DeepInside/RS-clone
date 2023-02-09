<script lang="ts">
import { defineComponent } from 'vue';
import LineComponent from './LineComponent.vue';
import HandComponent from './HandComponent.vue';
import { mapActions, mapState } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import { cardAnimation, leftPos, topPos, type topPosType } from '@/utilits/cardAnimation';
import type { cardLineType } from '@/utilits/lineTypes';

export default defineComponent({
  data() {
    return {
      attackType: {
        melee: 'melee',
        range: 'range',
        siege: 'siege',
      } as Record<cardLineType, string>,
      isEnemy: true,
    };
  },
  methods: {
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
          this.addToLine(this.selectedCard, targetProp[2] as cardLineType, !isSpy, !isBoost);
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
    LineComponent,
    HandComponent,
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
          :boosts="board.enemyBoost.siege"
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
          :boosts="board.enemyBoost.range"
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
          :boosts="board.enemyBoost.melee"
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
          :boosts="board.alliesBoost.melee"
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
          :boosts="board.alliesBoost.range"
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
          :boosts="board.alliesBoost.siege"
          :isActiveWeather="isRain"
          @click="putCard"
        />
      </div>
    </div>
    <HandComponent />
  </div>
</template>

<style lang="scss" scoped>
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
}
</style>
