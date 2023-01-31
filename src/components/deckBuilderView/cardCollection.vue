<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<template>
  <div class="collection">
    <div class="collection__sort">
      <img class="sort__img" src="src/assets/images/sort/board_cards.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/melee_tan.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/ranged_tan.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/siege_tan.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/hero_tan.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/sky_tan.png" alt="сортировка" />
      <img class="sort__img" src="src/assets/images/sort/dummy_tan.png" alt="сортировка" />
    </div>
    <div class="cards"></div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 40%;
  height: 100%;
  &__sort {
    height: 8%;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
  }
}

.sort__img {
  width: 10%;
  transition: 0.1s;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }
}

.cards {
  margin-top: 2%;
  height: 88%;
  border: 1px white solid;
}
</style>
