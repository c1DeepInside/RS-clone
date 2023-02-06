<script lang="ts">
interface Fraction {
  id: number;
  name: string;
  description: string;
  emblem: string;
}

export type Filters = 'all' | 'melee' | 'range' | 'siege' | 'hero' | 'weather' | 'special';

import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  data() {
    return {
      currentId: 0,
      fractions: [
        {
          id: 0,
          name: 'Королевства Севера',
          description: 'Королевства Севера берут карту из своей колоды после каждого выигранного раунда.',
          emblem: 'src/assets/images/faction-emblems/northern_emblem.png',
        },
        {
          id: 1,
          name: 'Нильфгаард',
          description: 'Нильфгаард побеждает в случае ничьей.',
          emblem: 'src/assets/images/faction-emblems/nilfgaard_emblem.png',
        },
        {
          id: 2,
          name: "Скоя'таэли",
          description: "Скоя'таэли в начале битвы решают, кто ходит первым.",
          emblem: 'src/assets/images/faction-emblems/scoiatael_emblem.png',
        },
        {
          id: 3,
          name: 'Чудовища',
          description: 'Чудовища после каждого раунда сохраняют на столе одну случайную карту.',
          emblem: 'src/assets/images/faction-emblems/monsters_emblem.png',
        },
      ] as Fraction[],
      filters: {
        all: 'Все карты',
        melee: 'Рукопашные отряды',
        range: 'Дальнобойные отряды',
        siege: 'Осадные отряды',
        hero: 'Герои',
        weather: 'Погодные карты',
        special: 'Специальные карты',
      } as Record<Filters, string>,
    };
  },
  methods: {
    decrementIdx() {
      this.currentId = (this.currentId - 1 + this.fractions.length) % this.fractions.length;
    },
    incrementIdx() {
      this.currentId = (this.currentId + 1) % this.fractions.length;
    },
  },
  computed: {
    prevFraction(): Fraction {
      return this.fractions[(this.currentId - 1 + this.fractions.length) % this.fractions.length];
    },
    nextFraction(): Fraction {
      return this.fractions[(this.currentId + 1) % this.fractions.length];
    },
    currFraction(): Fraction {
      return this.fractions[this.currentId];
    },
  },
  props: {
    collectionFilter: {
      type: String as PropType<Filters>,
      default: () => {
        return 'all';
      },
    },
    deckFilter: {
      type: String as PropType<Filters>,
      default: () => {
        return 'all';
      },
    },
  },
});
</script>

<template>
  <div class="collection collection__cart">
    <p class="collection__text">Коллекция карт</p>
    <p class="collection__filter">{{ filters[collectionFilter] }}</p>
  </div>
  <div class="fraction__moves">
    <div class="fraction__choose">
      <div class="prev">{{ prevFraction.name }}</div>
      <div class="arrow_btn" @click="decrementIdx()">ᐊ</div>
      <div class="fraction__current">
        <img class="fraction__emblem" :src="currFraction.emblem" alt="Герб фракции" draggable="false" />
        <div class="fraction__current__name">
          <div class="current">{{ currFraction.name }}</div>
          <div class="fraction__indicator">
            <span v-for="item in fractions" :key="item.id" :class="currFraction.id === item.id ? 'curr__dot' : ''"
              >◆</span
            >
          </div>
        </div>
      </div>
      <div class="arrow_btn" @click="incrementIdx()">ᐅ</div>
      <div class="next">{{ nextFraction.name }}</div>
    </div>
    <div class="fraction__description">
      {{ currFraction.description }}
    </div>
  </div>
  <div class="collection collection__deck">
    <p class="collection__text">Карты колоды</p>
    <p class="collection__filter deck__filter">{{ filters[deckFilter] }}</p>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 0.2vw;

  &__deck {
    align-items: flex-end;
  }

  &__filter {
    text-transform: uppercase;
    color: #fefefe;
    font-size: 1.3vw;
  }

  &__text {
    color: #b8b8b8;
    font-size: 1.5vw;
  }

  .deck__filter {
    text-align: end;
  }
}
.fraction__moves {
  width: 68%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: white;
}

.fraction__indicator {
  color: #212321;
  font-size: 1.1vw;
}

.fraction__choose {
  gap: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fraction__current {
  display: flex;
  justify-content: center;
  width: 40%;
}
.fraction__current__name {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  align-self: end;
}
.fraction__emblem {
  width: 15%;
  object-fit: contain;
}
.fraction__description {
  height: 30%;
  width: 100%;
  font-size: 1.2vw;
  color: #867762;
  text-align: center;
}

.arrow_btn {
  font-size: 2.1vw;
  color: #685942;

  &:hover {
    color: #937c59;
  }
}

.curr__dot {
  color: #a17f40;
}

.current {
  font-size: 1.6vw;
}

.prev {
  text-align: end;
}

.next,
.prev {
  width: 20%;
  color: #685942;
  font-size: 1.1vw;
}
</style>
