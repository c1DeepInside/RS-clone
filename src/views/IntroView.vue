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
      token: '',
      username: '',
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
    startPlay() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$router.push('/deck');
      }
      this.showFormValidation = true;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      location.reload();
    },
  },
  components: {
    RegistrationComponent,
    FooterComponent,
    RulesComponent,
    ValidationComponent,
  },
  created() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
      this.token = token;
    }
    if (username) {
      this.username = username;
    }
  },
});
</script>

<template>
  <video autoplay muted loop id="backgroundVideo">
    <source src="@/assets/video/GWENT-TheWitcher.mp4" type="video/mp4" />
  </video>

  <div class="displayed">
    <button v-if="!showFormValidation && !showFormRegistration" @click="startPlay" class="border-button">PLAY</button>
    <ValidationComponent
      v-if="showFormValidation && !showRules"
      @validation-finished="showRules = true"
      @start-registration="startedRegistration"
    />
    <RegistrationComponent v-if="showFormRegistration && !showRules" @registration-finished="finishedRegistration" />
    <FooterComponent />

    <RulesComponent v-if="showRules" />
    <div v-if="token" class="displayed__exit" @click="logout">
      <span>{{ username }}</span>
      <svg
        fill="#e0e4e4"
        height="800px"
        width="800px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512.021 512.021"
        xml:space="preserve"
        stroke="#e0e4e4"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

        <g id="SVGRepo_iconCarrier">
          <g transform="translate(-1 -1)">
            <g>
              <g>
                <path
                  d="M508.184,249.202c0.203-0.247,0.379-0.507,0.568-0.76c0.227-0.304,0.463-0.601,0.674-0.917 c0.203-0.303,0.379-0.618,0.565-0.93c0.171-0.286,0.35-0.565,0.508-0.86c0.17-0.318,0.314-0.645,0.467-0.969 c0.145-0.307,0.298-0.609,0.428-0.923c0.13-0.315,0.235-0.636,0.35-0.956c0.121-0.337,0.25-0.67,0.355-1.015 c0.097-0.32,0.168-0.645,0.249-0.968c0.089-0.351,0.187-0.698,0.258-1.056c0.074-0.375,0.118-0.753,0.172-1.13 c0.044-0.311,0.104-0.618,0.135-0.933c0.138-1.4,0.138-2.811,0-4.211c-0.031-0.315-0.09-0.621-0.135-0.932 c-0.054-0.378-0.098-0.756-0.173-1.13c-0.071-0.358-0.169-0.704-0.258-1.055c-0.081-0.324-0.152-0.649-0.249-0.969 c-0.104-0.344-0.233-0.677-0.354-1.013c-0.115-0.32-0.22-0.642-0.35-0.957c-0.13-0.314-0.283-0.616-0.428-0.922 c-0.153-0.325-0.297-0.652-0.467-0.97c-0.157-0.294-0.337-0.573-0.507-0.859c-0.186-0.312-0.362-0.627-0.565-0.931 c-0.211-0.315-0.446-0.612-0.673-0.915c-0.19-0.254-0.367-0.515-0.57-0.762c-0.443-0.539-0.909-1.058-1.402-1.551 c-0.004-0.004-0.007-0.008-0.011-0.012l-64-64c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17 l27.582,27.582H321.019c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333h119.163l-27.582,27.582 c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l64-64c0.004-0.004,0.007-0.008,0.011-0.012 C507.275,250.26,507.741,249.742,508.184,249.202z"
                />
                <path
                  d="M363.686,299.672c-11.782,0-21.333,9.551-21.333,21.333v106.667h-85.333V86.347v-0.008 c0-9.421-6.18-17.727-15.203-20.434l-74.11-22.233h174.647v106.667c0,11.782,9.551,21.333,21.333,21.333 s21.333-9.551,21.333-21.333v-128c0-11.782-9.551-21.333-21.333-21.333H22.353c-0.002,0-0.004,0-0.006,0 c-0.631-0.001-1.256,0.029-1.876,0.083C10.685,1.827,4.306,8.264,1.988,15.949c-0.149,0.478-0.279,0.966-0.395,1.46 c-0.012,0.053-0.022,0.107-0.034,0.161c-0.115,0.508-0.211,1.024-0.29,1.547c-0.011,0.074-0.023,0.147-0.034,0.221 c-0.067,0.477-0.12,0.96-0.155,1.449c-0.062,0.788-0.081,1.578-0.061,2.368v425.859c0,10.169,7.178,18.925,17.15,20.919 L231.502,512.6c13.201,2.64,25.517-7.457,25.517-20.919v-21.342h106.667c11.782,0,21.333-9.551,21.333-21.333v-128 C385.019,309.223,375.468,299.672,363.686,299.672z M214.353,465.658L43.686,431.525V51.02l170.667,51.2v346.785V465.658z"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
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

  &__exit {
    position: absolute;
    top: 1vw;
    right: 1vw;
    display: flex;
    align-items: center;
    gap: 0.5vw;
    opacity: 0.7;
    font-size: 1.6vw;
    font-weight: 300;
    text-transform: uppercase;
    color: #e0e4e4;
    transition: opacity 0.2s linear;

    svg {
      width: 1.6vw;
      height: 1.6vw;
    }

    &:hover {
      opacity: 1;
    }
  }
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
