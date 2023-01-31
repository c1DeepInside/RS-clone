<script lang="ts">
import { defineComponent } from 'vue';

import RegistrationComponent from '@/components/intro-view/RegistrationComponent.vue';
import FooterComponent from '@/components/intro-view/FooterComponent.vue';
import RulesComponent from '@/components/intro-view/RulesComponent.vue';

export default defineComponent({
  data() {
    return {
      showForm: false,
      showRules: false,
    }
  },
  methods: {

  },
  components: {
    RegistrationComponent,
    FooterComponent,
    RulesComponent
  }
});
</script>

<template>
  <video autoplay muted loop id="backgroundVideo">
    <source src="@/assets/video/GWENT-TheWitcher.mp4" type="video/mp4">
  </video>

  <div class="displayed">
    <button v-if="!showForm" @click="showForm = true" class="border-button">PLAY</button>

    <RegistrationComponent v-if="showForm && !showRules" @registration-finished="showRules = true" />
    <FooterComponent />

    <RulesComponent v-if="showRules" />
  </div>
</template>

<style lang="scss" scoped>

#backgroundVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

.displayed {
  position: relative;
  z-index: 100;
}

.border-button {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-decoration: none;
  display: inline-block;
  padding: 20px 30px;
  margin: 10px 20px;
  color: white;
  border: 1px solid rgba(150, 150, 150, 0.411);
  background: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 3px;
  transition: background .2s linear;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    box-sizing: border-box;
  }

  &:before {
    bottom: 0;
    left: 0;
    border-left: 1px solid white;
    border-top: 1px solid white;
    transition: 0s ease opacity .8s, .2s ease width .4s, .2s ease height .6s;
  }

  &:after {
    top: 0;
    right: 0;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    transition: 0s ease opacity .4s, .2s ease width, .2s ease height .2s;
  }

  &:hover:before,
  &:hover:after {
    height: 100%;
    width: 100%;
    opacity: 1;
  }

  &:hover:before {
    transition: 0s ease opacity 0s, .2s ease height, .2s ease width .2s;
  }

  &:hover:after {
    transition: 0s ease opacity .4s, .2s ease height .4s, .2s ease width .6s;
  }

  &:hover {
    background: rgba(26, 24, 24, 0.562);
  }
}
</style>