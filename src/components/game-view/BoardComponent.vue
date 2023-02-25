<script lang="ts">
import { defineComponent } from 'vue';
import LineComponent from './LineComponent.vue';
import HandComponent from './HandComponent.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import { cardAnimation, leftPos, topPos, type topPosType } from '@/utilits/cardAnimation';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';

export default defineComponent({
  data() {
    return {
      attackType: {
        melee: 'melee',
        range: 'range',
        siege: 'siege',
      } as Record<cardLineType, string>,
      enemyAllies: {
        enemy: 'enemy',
        allies: 'allies',
      } as Record<enemyAlliesType, string>,
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
      if (this.isShowSelectedCard && this.selectedCard.ability !== 'decoy') {
        this.setMedic(true);
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
          this.finishTurn();
          if (this.selectedCard.ability === 'scorch') {
            this.putLineScorch(targetProp[2] as cardLineType, 'enemy');
          }
          this.musterAbility(this.selectedCard, targetProp[2] as cardLineType, !isSpy, !isBoost);
        }, 400);
      }
    },
    ...mapActions(useGameStore, {
      setIsShowSelected: 'setIsShowSelected',
      removeFromHand: 'removeFromHand',
      addToLine: 'addToLine',
      putLineScorch: 'putLineScorch',
      musterAbility: 'musterAbility',
      setMedic: 'setMedic',
      finishTurn: 'finishTurn',
    }),
  },
  components: {
    LineComponent,
    HandComponent,
  },
  computed: {
    ...mapState(useGameStore, {
      board: 'board',
      client: 'client',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
    }),
    ...mapWritableState(useGameStore, {
      serverUpdates: 'serverUpdates',
    }),
  },
  watch: {
    board: {
      handler() {
        if (!this.serverUpdates.board) {
          this.client?.sendBoardChange();
        }

        this.serverUpdates.board = false;
      },
      deep: true,
    },
    deck: {
      handler() {
        if (!this.serverUpdates.deck) {
          this.client?.sendDeckChange();
        }

        this.serverUpdates.deck = false;
      },
      deep: true,
    },
    discard: {
      handler() {
        if (!this.serverUpdates.discard) {
          this.client?.sendDiscardChange();
        }

        this.serverUpdates.discard = false;
      },
      deep: true,
    },
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
          :type="(enemyAllies.enemy as enemyAlliesType)"
          :attackType="(attackType.siege as cardLineType)"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.range}`"
          :id="`field__enemy__${attackType.range}`"
          :type="(enemyAllies.enemy as enemyAlliesType)"
          :attackType="(attackType.range as cardLineType)"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.melee}`"
          :id="`field__enemy__${attackType.melee}`"
          :type="(enemyAllies.enemy as enemyAlliesType)"
          :attackType="(attackType.melee as cardLineType)"
          @click="putCard"
        />
      </div>
      <div class="field__allies">
        <LineComponent
          :class="`field__allies__${attackType.melee}`"
          :id="`field__allies__${attackType.melee}`"
          :type="(enemyAllies.allies as enemyAlliesType)"
          :attackType="(attackType.melee as cardLineType)"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.range}`"
          :id="`field__allies__${attackType.range}`"
          :type="(enemyAllies.allies as enemyAlliesType)"
          :attackType="(attackType.range as cardLineType)"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.siege}`"
          :id="`field__allies__${attackType.siege}`"
          :type="(enemyAllies.allies as enemyAlliesType)"
          :attackType="(attackType.siege as cardLineType)"
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
