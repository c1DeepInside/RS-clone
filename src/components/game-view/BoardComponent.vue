<script lang="ts">
import { defineComponent } from 'vue';
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
      cards: [
        {
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          name: 'Цирилла',
          type: 'hero',
          image: 'src/assets/images/neutral_ciri.jpg',
          description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          name: 'Осадная башня',
          type: 'usual',
          image: 'src/assets/images/nor_siege_tower.png',
          description: 'Башня на колесах... Чего только люди не удумают!',
          fractionId: 0,
          ability: null,
          fieldType: ['siege'],
          power: 6,
          quantity: 1,
        },
        {
          name: 'Ясное небо',
          type: 'special',
          image: 'src/assets/images/spc_rain.png',
          description: 'Дромил, солнце-то светит! Значит, и надежда есть...',
          fractionId: null,
          ability: 'clear',
          fieldType: ['weather'],
          power: null,
          quantity: 3,
        },
        {
          name: 'Таинственный эльф',
          type: 'hero',
          image: 'src/assets/images/neu_avallach.png',
          description: 'Предсказывать не сложно. Искусство в том, чтобы предсказывать точно.',
          fractionId: null,
          ability: 'spy',
          fieldType: ['melee'],
          power: '0',
          quantity: 1,
        },
        {
          name: 'Лекарь Бурой Хоругви',
          type: 'usual',
          image: 'src/assets/images/nor_banner_nurse.png',
          description: 'Шейте красно с красным, желтое с желтым, белое с белым...',
          fractionId: 0,
          ability: 'medic',
          fieldType: ['siege'],
          power: 5,
          quantity: 1,
        },
        {
          name: 'Командирский рог',
          type: 'special',
          image: 'src/assets/images/spc_horn.png',
          description: 'Плюс один к морали, минус три к слуху.',
          fractionId: null,
          ability: 'horn',
          fieldType: ['boost'],
          power: null,
          quantity: 3,
        },
        {
          name: 'Детмольд',
          type: 'usual',
          image: 'src/assets/images/nor_dethmold.png',
          description: 'Такими чарами выиграывают войны! Тысячи жертв в одну минуту!',
          fractionId: 0,
          ability: null,
          fieldType: ['range'],
          power: 6,
          quantity: 1,
        },
      ] as Card[],
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
        if (target.classList.contains('cards__wrap__siege__enemy')) {
          this.enemySiegeField.push(this.currentCard);
        }
        if (target.classList.contains('cards__wrap__range__enemy')) {
          this.enemyRangeField.push(this.currentCard);
        }
        if (target.classList.contains('cards__wrap__melee__enemy')) {
          this.enemyMeleeField.push(this.currentCard);
        }
        if (target.classList.contains('cards__wrap__melee__allies')) {
          this.alliesMeleeField.push(this.currentCard);
        }
        if (target.classList.contains('cards__wrap__range__allies')) {
          this.alliesRangeField.push(this.currentCard);
        }
        if (target.classList.contains('cards__wrap__siege__allies')) {
          this.alliesSiegeField.push(this.currentCard);
        }
        if (target.classList.contains('boost__wrap__melee__allies')) {
          this.alliesMeleeBoost.push(this.currentCard);
        }
        if (target.classList.contains('boost__wrap__range__allies')) {
          this.alliesRangeBoost.push(this.currentCard);
        }
        if (target.classList.contains('boost__wrap__siege__allies')) {
          this.alliesSiegeBoost.push(this.currentCard);
        }
        this.$emit('update:selectedItem', this.currentCard, false);
      }
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
  },
});
</script>

<template>
  <div class="board">
    <div class="field">
      <div class="field__enemy">
        <LineComponent
          :class="`field__enemy__${attackType.siege}`"
          :activeLine="currentCard.fieldType.includes('siege') && currentCard.ability === 'spy'"
          :type="isEnemy"
          :attackType="attackType.siege"
          :cards="enemySiegeField"
          :boosts="enemySiegeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.range}`"
          :activeLine="currentCard.fieldType.includes('range') && currentCard.ability === 'spy'"
          :type="isEnemy"
          :attackType="attackType.range"
          :cards="enemyRangeField"
          :boosts="enemyRangeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__enemy__${attackType.melee}`"
          :activeLine="currentCard.fieldType.includes('melee') && currentCard.ability === 'spy'"
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
          :activeLine="currentCard.fieldType.includes('melee') && currentCard.ability !== 'spy'"
          :activeBoost="currentCard.fieldType.includes('boost')"
          :type="!isEnemy"
          :attackType="attackType.melee"
          :cards="alliesMeleeField"
          :boosts="alliesMeleeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.range}`"
          :activeLine="currentCard.fieldType.includes('range') && currentCard.ability !== 'spy'"
          :activeBoost="currentCard.fieldType.includes('boost')"
          :type="!isEnemy"
          :attackType="attackType.range"
          :cards="alliesRangeField"
          :boosts="alliesRangeBoost"
          @click="putCard"
        />
        <LineComponent
          :class="`field__allies__${attackType.siege}`"
          :activeLine="currentCard.fieldType.includes('siege') && currentCard.ability !== 'spy'"
          :activeBoost="currentCard.fieldType.includes('boost')"
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
        <div class="card__wrap" v-for="(card, index) in cards" :key="index" @click="startAnimate($event)">
          <cardInfoComponent :card="card" :layoutType="0" class="card" @click="showCard(card)" />
        </div>
        <div class="card__wrap hide" @click="startAnimate($event)">
          <cardInfoComponent :card="cards[0]" :layoutType="0" class="card" @click="showCard(cards[0])" />
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
  transition: 0.5s;
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
        margin-top: 0.4vw;
      }

      &__melee {
        margin-top: 0.75vw;
      }
    }

    &__allies {
      height: 50%;
      position: relative;
      &__siege {
        margin-top: 0.7vw;
      }

      &__range {
        margin-top: 0.5vw;
      }

      &__melee {
        margin-top: 0.55vw;
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
