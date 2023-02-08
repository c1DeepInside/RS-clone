<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import LineComponent from './LineComponent.vue';
import cardInfoComponent from '@/components/common/CardInfoComponent.vue';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      attackType: {
        melee: 'melee',
        range: 'range',
        siege: 'siege',
      },
      isEnemy: true,
      currentCard: {
        name: 'Геральт из Ривии',
        type: 'hero',
        image: 'src/assets/images/neu_geralt.png',
        description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      } as Card,
      enemySiegeField: [] as Card[],
      enemyRangeField: [] as Card[],
      enemyMeleeField: [] as Card[],
      alliesMeleeField: [] as Card[],
      alliesRangeField: [] as Card[],
      alliesSiegeField: [] as Card[],
      enemySiegeBoost: [] as Card[],
      enemyRangeBoost: [] as Card[],
      enemyMeleeBoost: [] as Card[],
      alliesMeleeBoost: [] as Card[],
      alliesRangeBoost: [] as Card[],
      alliesSiegeBoost: [] as Card[],
    };
  },
  methods: {
    showCard(card: Card) {
      this.currentCard = card;
      this.$emit('update:selectedItem', card, true);
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
      if (this.isShowCardView) {
        const target = event.target as HTMLElement;
        if (this.currentCard.fieldType.includes('siege') && this.currentCard.ability === 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(0.6, 55.5);
          setTimeout(() => {
            this.enemySiegeField.push(this.currentCard);
          }, 400);
        }
        if (this.currentCard.fieldType.includes('range') && this.currentCard.ability === 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(7.5, 55.5);
          setTimeout(() => {
            this.enemyRangeField.push(this.currentCard);
          }, 400);
        }
        if (this.currentCard.fieldType.includes('melee') && this.currentCard.ability === 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(14.6, 55.5);
          setTimeout(() => {
            this.enemyMeleeField.push(this.currentCard);
          }, 400);
        }
        if (this.currentCard.fieldType.includes('melee') && this.currentCard.ability !== 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(22.4, 55.5);
          setTimeout(() => {
            this.alliesMeleeField.push(this.currentCard);
          }, 400);
        }
        if (this.currentCard.fieldType.includes('range') && this.currentCard.ability !== 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(29.3, 55.5);
          setTimeout(() => {
            this.alliesRangeField.push(this.currentCard);
          }, 400);
        }
        if (this.currentCard.fieldType.includes('siege') && this.currentCard.ability !== 'spy') {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(36.5, 55.5);
          setTimeout(() => {
            this.alliesSiegeField.push(this.currentCard);
          }, 400);
        }
        if (target.classList.contains('boost__wrap__melee__allies')) {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(22.4, 31);
          setTimeout(() => {
            this.alliesMeleeBoost.push(this.currentCard);
          }, 400);
        }
        if (target.classList.contains('boost__wrap__range__allies')) {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(29.3, 31);
          setTimeout(() => {
            this.alliesRangeBoost.push(this.currentCard);
          }, 400);
        }
        if (target.classList.contains('boost__wrap__siege__allies')) {
          this.$emit('close:selectedItem', this.currentCard, false);
          this.cardAnimation(36.5, 31);
          setTimeout(() => {
            this.alliesSiegeBoost.push(this.currentCard);
          }, 400);
        }
      }
    },
    cardAnimation(top: number, left: number) {
      const element = this.$parent?.$refs.animationWrap as HTMLElement;
      element.style.transition = '0.5s';
      element.style.opacity = '0.8';
      element.style.top = `${top}vw`;
      element.style.left = `${left}vw`;
      element.style.scale = '1';
      setTimeout(() => {
        element.style.transition = '0s';
        element.style.opacity = '0';
        element.style.top = '24vw';
        element.style.left = '85vw';
        element.style.scale = '3';
      }, 400);
    },
  },
  components: {
    cardInfoComponent,
    LineComponent,
  },
  props: {
    isShowCardView: {
      type: Boolean,
      default: false,
    },
    cards: {
      type: Array as PropType<Card[]>,
      default: () => {
        return [];
      },
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
          :activeLine="currentCard.fieldType.includes('siege') && currentCard.ability === 'spy' && isShowCardView"
          :type="isEnemy"
          :attackType="attackType.siege"
          :cards="enemySiegeField"
          :boosts="enemySiegeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.range}`"
          :activeLine="currentCard.fieldType.includes('range') && currentCard.ability === 'spy' && isShowCardView"
          :type="isEnemy"
          :attackType="attackType.range"
          :cards="enemyRangeField"
          :boosts="enemyRangeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.melee}`"
          :activeLine="currentCard.fieldType.includes('melee') && currentCard.ability === 'spy' && isShowCardView"
          :type="isEnemy"
          :attackType="attackType.melee"
          :cards="enemyMeleeField"
          :boosts="enemyMeleeBoost"
          @click="putCard"
        />
      </div>
      <div class="field__allies">
        <LineComponent
          :class="`field__allies__${attackType.melee}`"
          :activeLine="currentCard.fieldType.includes('melee') && currentCard.ability !== 'spy' && isShowCardView"
          :activeBoost="currentCard.fieldType.includes('boost') && isShowCardView"
          :type="!isEnemy"
          :attackType="attackType.melee"
          :cards="alliesMeleeField"
          :boosts="alliesMeleeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.range}`"
          :activeLine="currentCard.fieldType.includes('range') && currentCard.ability !== 'spy' && isShowCardView"
          :activeBoost="currentCard.fieldType.includes('boost') && isShowCardView"
          :type="!isEnemy"
          :attackType="attackType.range"
          :cards="alliesRangeField"
          :boosts="alliesRangeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.siege}`"
          :activeLine="currentCard.fieldType.includes('siege') && currentCard.ability !== 'spy' && isShowCardView"
          :activeBoost="currentCard.fieldType.includes('boost') && isShowCardView"
          :type="!isEnemy"
          :attackType="attackType.siege"
          :cards="alliesSiegeField"
          :boosts="alliesSiegeBoost"
          @click="putCard"
        />
      </div>
    </div>
    <div class="board__hand">
      <div class="board__hand-row">
        <div
          class="card__wrap"
          v-for="(item, index) in cards"
          :key="index"
          @click="startAnimate($event)"
          :style="`margin-left: -${cards.length / (8.5 + Math.pow(2.15, -cards.length + 15))}vw; left: ${
            cards.length / (8.5 + Math.pow(2.15, -cards.length + 15)) / 2
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
