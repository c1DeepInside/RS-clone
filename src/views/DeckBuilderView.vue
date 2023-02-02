<script lang="ts">
import { defineComponent } from 'vue';
import FractionChoose from '@/components/deck-builder-view/FractionChoose.vue';
import CardCollection from '@/components/deck-builder-view/CardsCollection.vue';
import InfoCollection from '@/components/deck-builder-view/InfoCollection.vue';

export default defineComponent({
  data() {
    return {};
  },
  components: {
    FractionChoose,
    CardCollection,
    InfoCollection,
  },
});
</script>

<template>
  <main class="main">
    <video autoplay muted loop class="background">
      <source src="@/assets/videos/backFog.mp4" type="video/mp4" />
    </video>
    <div class="UI">
      <div class="fraction">
        <FractionChoose></FractionChoose>
      </div>
      <div class="builder">
        <CardCollection></CardCollection>
        <InfoCollection></InfoCollection>
        <CardCollection></CardCollection>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
$DECK_COLOR: #4d392c;

html {
  &::-webkit-scrollbar {
    display: none;
  }
  font-weight: 300;

  background-color: #171617;
}

.main {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 100vw;
  height: calc(100vw * 9 / 16);
}

.background {
  z-index: 1;
  width: 100vw;
  height: calc(100vw * 9 / 16);
  position: absolute;
  opacity: 0.3;
}

.UI {
  width: 85%;
  height: 90%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.fraction {
  display: flex;
  justify-content: space-between;
  height: 20%;

  &__choose {
    flex-grow: 1;
  }
}

.builder {
  display: flex;
  height: 90%;
}
</style>
