<script lang="ts">
import { defineComponent } from 'vue';
import LeaderOfFraction from '@/components/deck-builder-view/LeaderOfFraction.vue';

export default defineComponent({
  data() {
    return {
      deckInfos: [
        {
          text: 'Карты в колоде',
          img: 'src/assets/images/filter/board_cards.png',
          maxCount: '',
          count: 28,
        },
        {
          text: 'Карты отрядов',
          img: 'src/assets/images/filter/melee_tan.png',
          maxCount: '/22',
          count: 14,
        },
        {
          text: 'Специальные карты',
          img: 'src/assets/images/filter/sky_tan.png',
          maxCount: '/10',
          count: 8,
        },
        {
          text: 'Общая сила карт отрядов',
          img: 'src/assets/images/filter/melee_ranged.png',
          maxCount: '',
          count: 160,
        },
        {
          text: 'Герои',
          img: 'src/assets/images/filter/hero_tan.png',
          maxCount: '',
          count: 8,
        },
      ],
    };
  },
  components: {
    LeaderOfFraction,
  },
});
</script>

<template>
  <div class="info">
    <div class="leader">
      <p class="leader__text">Лидер</p>
      <LeaderOfFraction></LeaderOfFraction>
    </div>
    <div class="deck__info">
      <div v-for:="deckInfo in deckInfos">
        <p class="deck__text">{{ deckInfo.text }}</p>
        <div class="deck__numbers">
          <img class="deck__img" :src="deckInfo.img" draggable="false" />
          <p>{{ deckInfo.count }}{{ deckInfo.maxCount }}</p>
        </div>
      </div>
    </div>
    <button class="start__game">Начать игру</button>
  </div>
</template>

<style lang="scss" scoped>
.info {
  width: 20%;
  height: 100%;
  color: #9b763a;
  display: flex;
  flex-direction: column;
}

.leader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25%;
  gap: 1vw;

  &__text {
    font-size: 1.2vw;
  }
}

.deck {
  &__info {
    margin-top: 1vw;
    font-size: 1.1vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.1vw;
  }

  &__img {
    width: 2vw;
    height: 2.5vw;
    object-fit: contain;
  }

  &__numbers {
    display: flex;
    gap: 0.5vw;
    justify-content: center;
    align-items: center;
  }

  &__text {
    color: #b8b8b8;
  }
}

.start__game {
  color: #fefefe;
  background-color: rgba($color: #000000, $alpha: 0.2);
  font-size: 1.2vw;
  border: 0.1vw black solid;
  border-radius: 0.2vw;
  margin-top: 1.5vw;
  align-self: center;

  &:hover {
    color: #fe9902;
    animation: pulse 2s infinite;
  }
}
</style>
