<script lang="ts">
import { defineComponent } from 'vue';

import RegistrationComponent from '@/components/intro-view/RegistrationComponent.vue';
import FooterComponent from '@/components/intro-view/FooterComponent.vue';
import RulesComponent from '@/components/intro-view/RulesComponent.vue';
import ValidationComponent from '@/components/intro-view/ValidationComponent.vue';

export default defineComponent({
  data() {
    return {
      showFormValidation: false,
      showFormRegistration: false,
      showRules: false,
    };
  },
  methods: {
    startedRegistration() {
      this.showFormRegistration = true;
      this.showFormValidation = false;
    },
    finishedRegistration() {
      this.showFormValidation = true;
      this.showFormRegistration = false;
    },
  },
  components: {
    RegistrationComponent,
    FooterComponent,
    RulesComponent,
    ValidationComponent,
  },
});
</script>

<template>
  <video autoplay muted loop id="backgroundVideo">
    <source src="@/assets/video/GWENT-TheWitcher.mp4" type="video/mp4" />
  </video>

  <div class="displayed">
    <button
      v-if="!showFormValidation && !showFormRegistration"
      @click="showFormValidation = true"
      class="border-button"
    >
      PLAY
    </button>
    <ValidationComponent
      v-if="showFormValidation && !showRules"
      @validation-finished="showRules = true"
      @start-registration="startedRegistration"
    />
    <RegistrationComponent v-if="showFormRegistration && !showRules" @registration-finished="finishedRegistration" />
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
  width: 24vw;
  text-decoration: none;
  display: inline-block;
  padding: 1.4vw 1.4vw;
  color: white;
  border: 1px solid rgba(150, 150, 150, 0.411);
  background: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2vw;
  letter-spacing: 3px;
  transition: background 0.2s linear;

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
    transition: 0s ease opacity 0.8s, 0.2s ease width 0.4s, 0.2s ease height 0.6s;
  }

  &:after {
    top: 0;
    right: 0;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    transition: 0s ease opacity 0.4s, 0.2s ease width, 0.2s ease height 0.2s;
  }

  &:hover:before,
  &:hover:after {
    height: 100%;
    width: 100%;
    opacity: 1;
  }

  &:hover:before {
    transition: 0s ease opacity 0s, 0.2s ease height, 0.2s ease width 0.2s;
  }

  &:hover:after {
    transition: 0s ease opacity 0.4s, 0.2s ease height 0.4s, 0.2s ease width 0.6s;
  }

  &:hover {
    background: rgba(26, 24, 24, 0.562);
  }
}
</style>
