<script lang="ts">
interface Fraction {
  id: number;
  name: string;
  description: string;
  emblem: string;
}
const FRACTIONS_LENGTH = 4;

import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      prevFraction: 'Чудовища',
      nextFraction: 'Нильфгаард',
      currFraction: {
        id: 0,
        name: 'Королевства Севера',
        description: 'Королевства Севера берут карту из своей колоды после каждого выигранного раунда.',
        emblem: 'src/assets/images/faction-emblems/northern_emblem.png',
      },
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
    };
  },
  methods: {
    decrementId() {
      let currId = this.currFraction.id === 0 ? FRACTIONS_LENGTH : this.currFraction.id;
      currId = (currId - 1) % FRACTIONS_LENGTH;
      this.currFraction = this.fractions[currId];

      this.changePrevNext(currId);
    },
    incrementId() {
      let currId = (this.currFraction.id + 1) % FRACTIONS_LENGTH;
      this.currFraction = this.fractions[currId];

      this.changePrevNext(currId);
    },
    changePrevNext(currId: number) {
      this.nextFraction = this.fractions[(currId + 1) % FRACTIONS_LENGTH].name;
      currId = currId === 0 ? FRACTIONS_LENGTH : currId;
      this.prevFraction = this.fractions[(currId - 1) % FRACTIONS_LENGTH].name;
    }
  },
});
</script>

<template>
  <div class="collection collection__cart">
    <p class="collection__text">Коллекция карт</p>
    <p class="collection__sort">Все карты</p>
  </div>
  <div class="fraction__moves">
    <div class="fraction__choose">
      <div class="prev">{{ prevFraction }}</div>
      <div class="arrow_btn" @click="decrementId()">ᐊ</div>
      <div class="fraction__current">
        <img class="fraction__emblem" :src="currFraction.emblem" alt="Герб фракции" />
        <div class="fraction__current__name">
          <div class="current">{{ currFraction.name }}</div>
          <div class="fraction__indicator">
            <span :class="currFraction.id === 0 ? 'curr__dot' : ''">◆</span>
            <span :class="currFraction.id === 1 ? 'curr__dot' : ''">◆</span>
            <span :class="currFraction.id === 2 ? 'curr__dot' : ''">◆</span>
            <span :class="currFraction.id === 3 ? 'curr__dot' : ''">◆</span>
          </div>
        </div>
      </div>
      <div class="arrow_btn" @click="incrementId()">ᐅ</div>
      <div class="next">{{ nextFraction }}</div>
    </div>
    <div class="fraction__description">
      {{ currFraction.description }}
    </div>
  </div>
  <div class="collection collection__deck">
    <p class="collection__text">Карты колоды</p>
    <p class="collection__sort">Все карты</p>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: end;

  &__deck {
    align-items: flex-end;
  }

  &__sort {
    text-transform: uppercase;
    color: #fefefe;
    font-size: 1.5vw;
  }

  &__text {
    color: #b8b8b8;
    font-size: 1.5vw;
  }
}
.fraction__moves {
  width: 70%;
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
  width: 50%;
}
.fraction__current__name {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  align-self: end;
}
.fraction__emblem {
  width: 13%;
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
  color: #a17f40
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
