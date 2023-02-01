<script lang="ts">
import { defineComponent } from 'vue';
import cardFromCollection from '@/components/deckBuilderView/cardFromCollection.vue';
interface Filter {
  id: number;
  name: string;
  img: string;
  imgWhite: string;
}

export default defineComponent({
  data() {
    return {
      filters: [
        {
          id: 1,
          name: 'all',
          img: 'src/assets/images/filter/board_cards.png',
          imgWhite: 'src/assets/images/filter/board_cards_white.png',
        },
        {
          id: 2,
          name: 'melee',
          img: 'src/assets/images/filter/melee_tan.png',
          imgWhite: 'src/assets/images/filter/melee_white.png',
        },
        {
          id: 3,
          name: 'ranged',
          img: 'src/assets/images/filter/ranged_tan.png',
          imgWhite: 'src/assets/images/filter/ranged_white.png',
        },
        {
          id: 4,
          name: 'siege',
          img: 'src/assets/images/filter/siege_tan.png',
          imgWhite: 'src/assets/images/filter/siege_white.png',
        },
        {
          id: 5,
          name: 'hero',
          img: 'src/assets/images/filter/hero_tan.png',
          imgWhite: 'src/assets/images/filter/hero_white.png',
        },
        {
          id: 6,
          name: 'weather',
          img: 'src/assets/images/filter/sky_tan.png',
          imgWhite: 'src/assets/images/filter/sky_white.png',
        },
        {
          id: 7,
          name: 'special',
          img: 'src/assets/images/filter/dummy_tan.png',
          imgWhite: 'src/assets/images/filter/dummy_white.png',
        },
      ] as Filter[],
      currFilter: 'all',
    };
  },
  components: {
    cardFromCollection,
  },
});
</script>

<template>
  <div class="collection">
    <div class="collection__filter">
      <img
        class="filter__img"
        v-for:="filter in filters"
        :src="currFilter === filter.name ? filter.imgWhite : filter.img"
        @click="currFilter = filter.name"
        alt="сортировка"
      />
    </div>
    <div class="cards">
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
      <cardFromCollection></cardFromCollection>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 40%;
  height: 100%;
  &__filter {
    height: 8%;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px rgba($color: #4d392c, $alpha: 0.5) solid;
  }
}

.filter__img {
  width: 10%;
  transition: 0.1s;
  object-fit: contain;

  &:hover {
    transform: scale(1.1);
  }
}

.cards {
  margin-top: 1%;
  height: 89%;
  display: flex;
  flex-wrap: wrap;
  gap: 2% 3%;
  padding: 3%;
  padding-top: 2%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.4vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: #4d392c, $alpha: 0.2);
    border: 1px rgba($color: #4d392c, $alpha: 0.6) solid;
    border-radius: 20px;
  }
}
</style>
