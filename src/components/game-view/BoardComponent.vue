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
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
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
          id: 5,
          name: 'Следопыт из Дол Блатанны',
          type: 'usual',
          image: '/src/assets/images/scoiatael_dol_infantry_1.jpg',
          description: 'Нюх у них как у гончих. Глаза, как у орла. А сердце изо льдаю',
          fractionId: 1,
          ability: 'agile',
          fieldType: ['melee', 'range'],
          power: 6,
          quantity: 3,
        },
      ] as Card[],
    };
  },
  methods: {
    showCard(card: Card) {
      setTimeout(() => {
        this.$emit('update:selectedItem', card, true);
      }, 240);
    },
    startAnimate(event: Event) {
      const target = event.currentTarget as HTMLElement;
      target.style.transform = `translate(calc(42vw - ${target.offsetLeft}px + 15vw), -17vw) scale(3)`;
      target.style.opacity = '0';
      const clickField = this.$parent?.$refs.clickField as HTMLDivElement;
      clickField.addEventListener(
        'click',
        () => {
          target.style.opacity = '1';
          target.style.transform = `translate(0, 0)`;
        },
        { once: true }
      );
    },
  },
  components: {
    cardInfoComponent,
    LineComponent,
  },
});
</script>

<template>
  <div class="board">
    <div class="field">
      <div class="field__enemy">
        <LineComponent :class="`field__enemy__${attackType.siege}`" :type="isEnemy" :attackType="attackType.siege" />
        <LineComponent :class="`field__enemy__${attackType.range}`" :type="isEnemy" :attackType="attackType.range" />
        <LineComponent :class="`field__enemy__${attackType.melee}`" :type="isEnemy" :attackType="attackType.melee" />
      </div>
      <div class="field__allies">
        <LineComponent :class="`field__enemy__${attackType.siege}`" :type="!isEnemy" :attackType="attackType.melee" />
        <LineComponent :class="`field__enemy__${attackType.range}`" :type="!isEnemy" :attackType="attackType.range" />
        <LineComponent :class="`field__enemy__${attackType.melee}`" :type="!isEnemy" :attackType="attackType.siege" />
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
    z-index: 2;

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
        margin-top: 0.8vw;
      }

      &__range {
        margin-top: 0.5vw;
      }

      &__melee {
        margin-top: 0.65vw;
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
