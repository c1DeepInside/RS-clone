<script lang="ts">
import { defineComponent } from 'vue';
import fractionChoose from '@/components/deckBuilderView/fractionChoose.vue';

export default defineComponent({
  data() {
    return {
      
    }
  },
  components: {
    fractionChoose,
  }
});
</script>

<template>
  <main class="main">
    <video autoplay muted loop class="background">
      <source src="@/assets/videos/backFog.mp4" type="video/mp4" />
    </video>
    <div class="UI">
      <div class="fraction">
        <div class="collection__cart">
          <p class="collection__text">Коллекция карт</p>
        </div>
        <fractionChoose></fractionChoose>
        <div class="collection__deck">
          <p class="collection__text">Карты колоды</p>
        </div>
      </div>

      <div class="builder">
        <div class="collection"></div>
        <div class="info"></div>
        <div class="deck"></div>
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
  border: white 1px solid;
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
  height: 100%;

  .collection {
    width: 40%;
    height: 100%;
  }

  .info {
    width: 20%;
    height: 100%;
  }

  .deck {
    width: 40%;
    height: 100%;
  }
}

.collection__text {
  color: white;
}
</style>
