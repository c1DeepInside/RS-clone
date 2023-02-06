<script lang="ts">
import { defineComponent } from 'vue';
import LineComponent from './LineComponent.vue';
import cardInfoComponent from '@/components/common/CardInfoComponent.vue';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      isShowCard: false,
      isEnemy: true,
      card: {
        name: 'Геральт из Ривии',
        type: 'hero',
        image: 'src/assets/images/neutral_ciri.jpg',
        description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      } as Card,
    };
  },
  methods: {
    showCard(card: Card) {
      this.$emit('update:selectedItem', card);
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
        <LineComponent class="field__enemy__siege" :type="isEnemy" />
        <LineComponent class="field__enemy__range" :type="isEnemy" />
        <LineComponent class="field__enemy__melee" :type="isEnemy" />
      </div>
      <div class="field__allies">
        <LineComponent class="field__allies__melee" :type="!isEnemy" />
        <LineComponent class="field__allies__range" :type="!isEnemy" />
        <LineComponent class="field__allies__siege" :type="!isEnemy" />
      </div>
    </div>
    <div class="board__hand">
      <div class="board__hand-row">
        <div class="card__wrap">
          <cardInfoComponent :card="card" :layoutType="0" class="card" />
        </div>
        <div class="card__wrap">
          <cardInfoComponent :card="card" :layoutType="0" class="card hide" @click="showCard(card)" />
        </div>
        <div class="card__wrap">
          <cardInfoComponent :card="card" :layoutType="0" class="card" />
        </div>
        <div class="card__wrap">
          <cardInfoComponent :card="card" :layoutType="0" class="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hide {
  position: absolute;
  top: 0;
  left: 0;

  @keyframes cardToSelect {
  }
}
.card__wrap {
  position: relative;
  height: 100%;
  width: 4.5vw;
}
.board {
  .field {
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
        margin-top: 0.6vw;
      }

      &__range {
        margin-top: 0.5vw;
      }

      &__melee {
        margin-top: 0.75vw;
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
