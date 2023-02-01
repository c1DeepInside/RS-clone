<script lang="ts">
import { defineComponent } from 'vue';
import leaderOfFraction from '@/components/deckBuilderView/leaderOfFraction.vue';

export default defineComponent({
  data() {
    return {};
  },
  components: {
    leaderOfFraction,
  },
});
</script>

<template>
  <div class="info">
    <div class="leader">
      <p class="leader__text">Лидер</p>
      <leaderOfFraction></leaderOfFraction>
    </div>
    <div class="deck__info">
      <div class="deck__carts">
        <p class="deck__text">Карты в колоде</p>
        <div class="deck__numbers">
          <img class="deck__img" src="src/assets/images/filter/board_cards.png" alt="карты" />
          <p>35</p>
        </div>
      </div>
      <div class="deck__squad">
        <p class="deck__text">Карты отрядов</p>
        <div class="deck__numbers">
          <img class="deck__img" src="src/assets/images/filter/melee_tan.png" alt="меч" />
          <p>25</p>
        </div>
      </div>
      <div class="deck__special">
        <p class="deck__text">Специальные карты</p>
        <div class="deck__numbers">
          <img class="deck__img" src="src/assets/images/filter/sky_tan.png" alt="солнце" />
          <p>10/10</p>
        </div>
      </div>
      <div class="deck__power">
        <p class="deck__text">Общая сила карт отрядов</p>
        <div class="deck__numbers">
          <img class="deck__img" src="src/assets/images/filter/melee_ranged.png" alt="" />
          <p>160</p>
        </div>
      </div>
      <div class="deck__heroes">
        <p class="deck__text">Герои</p>
        <div class="deck__numbers">
          <img class="deck__img" src="src/assets/images/filter/hero_tan.png" alt="" />
          <p>8</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  width: 20%;
  height: 100%;
  color: #9b763a;
}

.leader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25%;
  gap: 1vw;

  &__img {
    width: 50%;
  }

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
    gap: 0.5vw;
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
</style>
