<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isPlay: false,
      audio: new Audio('src/assets/audios/background-music.mp3'),
    };
  },
  methods: {
    playMusic() {
      this.audio.loop = true;
      this.audio.volume = 0.07;
      if (this.isPlay) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlay = !this.isPlay;
    },
  },
});
</script>

<template>
  <div>
    <button class="btn-game" @click="playMusic">{{ isPlay ? 'Выключить музыку' : 'Включить музыку' }}</button>
  </div>
</template>

<style lang="scss" scoped>
button {
  width: 11vw;
  padding: 0.5vw;
  font-size: 1.1vw;
  color: tan;
}
</style>
