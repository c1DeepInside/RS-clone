<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      inputs: {
        login: '',
        password: '',
      },
      errors: {
        hasErrorName: false,
        hasErrorPassword: false,
      },
    };
  },
  methods: {
    validateName() {
      if (this.inputs.login.length >= 4) {
        this.errors.hasErrorName = false;
      } else {
        this.errors.hasErrorName = true;
      }
    },
    validatePassword() {
      this.errors.hasErrorPassword = true;

      for (let i = 0; i < this.inputs.password.length; i++) {
        if (!isNaN(+this.inputs.password[i])) {
          this.errors.hasErrorPassword = false;
          break;
        }
      }

      this.errors.hasErrorPassword = this.inputs.password.length >= 6 ? this.errors.hasErrorPassword : true;
    },
  },
  emits: {
    registrationFinished(isFinished: boolean): boolean {
      return isFinished;
    },
  },
});
</script>

<template>
  <form class="registration" v-on:submit.prevent>
    <input
      v-model="inputs.login"
      @input="validateName"
      v-bind:class="{ active: inputs.login !== '' && !errors.hasErrorName, error: errors.hasErrorName }"
      class="registration__input"
      type="text"
      placeholder="Введите свое имя/никнейм"
      required
    />

    <input
      v-model="inputs.password"
      @input="validatePassword"
      v-bind:class="{ active: inputs.password !== '' && !errors.hasErrorPassword, error: errors.hasErrorPassword }"
      class="registration__input"
      type="password"
      placeholder="Введите пароль"
      autocomplete="current-password"
      required
    />

    <p v-if="errors.hasErrorPassword" class="registration__input-password">
      Пароль должен содержать не менее 6 символов и 1 цифры
    </p>
    <button @click="$emit('registrationFinished', true)" class="registration__button">Зарегестрироваться</button>
  </form>
</template>

<style lang="scss" scoped>
.active {
  box-shadow: 0px 0px 30px green;
}

.error {
  box-shadow: 0px 0px 30px red;
}

.registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  gap: 4vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 30vw;
  background-color: rgba(0, 0, 0, 0.753);

  &__input {
    width: 16vw;
    height: 2.4vw;
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
    padding-left: 0.5vw;
    font-size: 0.9vw;

    &:focus {
      outline: none;
    }

    &-password {
      display: fixed;
      top: 16vw;
      position: fixed;
      color: white;
      line-height: 1.2;
      width: 16vw;
      font-size: 0.9vw;
      text-align: center;
    }
  }

  &__button {
    width: 16vw;
    height: 2.4vw;
    font-size: 1vw;
    margin-top: 2vw;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $BLACK_COLOR;
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.781);
    border-radius: 80px;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: white;
    }
  }
}
</style>
