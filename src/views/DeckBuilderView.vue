<script setup lang="ts"></script>

<template>
  <main class="main">
    <video autoplay muted loop class="background">
      <source src="@/assets/videos/backFog.mp4" type="video/mp4" />
    </video>
  </main>
</template>

<style lang="scss">
$DECK_COLOR: #4e382d;

html {
  &::-webkit-scrollbar {
    display: none;
  }
}

.main {
  background-color: black;
  width: 100vw;
  height: calc(100vw * 9 / 16);
  overflow: hidden;
}

.background {
  width: 100vw;
  height: calc(100vw * 9 / 16);
  position: absolute;
  opacity: 0.3;
}
</style>
