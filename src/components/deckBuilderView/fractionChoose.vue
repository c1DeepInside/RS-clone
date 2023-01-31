<template>
  <div class="collection collection__cart">
    <p class="collection__text">Коллекция карт</p>
    <p class="collection__sort">Все карты</p>
  </div>
  <div class="fraction__moves">
    <div class="fraction__choose">
      <div class="prev">{{ prevFraction }}</div>
      <div class="arrow_btn">ᐊ</div>
      <div class="fraction__current">
        <img class="fraction__emblem" :src="fractionEmblem" alt="Герб фракции" />
        <div class="fraction__current__name">
          <div class="current">{{ currFraction }}</div>
          <div class="fraction__indicator">
            <span style="color: #a17f40">◆</span>
            <span>◆</span>
            <span>◆</span>
            <span>◆</span>
          </div>
        </div>
      </div>
      <div class="arrow_btn">ᐅ</div>
      <div class="next">{{ nextFraction }}</div>
    </div>
    <div class="fraction__description">
      {{ fractionDescription }}
    </div>
  </div>
  <div class="collection collection__deck">
    <p class="collection__text">Карты колоды</p>
    <p class="collection__sort">Все карты</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      prevFraction: 'Чудовища',
      nextFraction: 'Королевства Севера',
      currFraction: 'Королевства Севера',
      fractionEmblem: 'src/assets/images/faction-emblems/monsters_emblem.png',
      fractionDescription: 'Королевства Севера берут карту из своей колоды после каждого выигранного раунда',
      fractions: ['Королевства Севера', 'Нильфгаард', "Скоя'таэлиэ", 'Чудовища'] as string[],
    };
  },
});
</script>

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
  font-size: 1.35vw;
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
