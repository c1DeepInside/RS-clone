<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      login: '',
      password: '',
      isActiveName: false,
      hasErrorName: false,
      isActivePassword: false,
      hasErrorPassword: false,
      hasNumber: false,
    }
  },
  methods: {
    validationName() {
      if (this.login.length >= 4) {
        this.hasErrorName = false;
        this.isActiveName = true;
      } else if (this.login.length === 0) {
        this.isActiveName = false;
        this.hasErrorName = false;
      } else {
        this.isActiveName = false;
        this.hasErrorName = true;
      }
    },
    validationPasswors() {
      this.hasNumber = false;

      for (let i = 0; i < this.password.length; i++) {
        let elem = this.password[i];

        if (!isNaN(+elem)) {
          this.hasNumber = true;
        }
      }

      if (this.password.length >= 6 && this.hasNumber) {
        this.isActivePassword = true;
        this.hasErrorPassword = false;
      } else if (this.password.length === 0) {
        this.isActivePassword = false;
        this.hasErrorPassword = false;
      } else {
        this.isActivePassword = false;
        this.hasErrorPassword = true;
      }
    }
  },
  emits: {
    registrationFinished(isFinished: boolean): boolean {
      return isFinished;
    }
  }
});
</script>

<template>
  <form class="registration" v-on:submit.prevent>
    <input v-model="login" @input="validationName" v-bind:class="{ active: isActiveName, error: hasErrorName }"
      class="registration__input" type="text" placeholder="Введите свое имя/никнейм" required>
    <input v-model="password" @input="validationPasswors"
      v-bind:class="{ active: isActivePassword, error: hasErrorPassword }" 
      class="registration__input" type="password"
      placeholder="Введите пароль" autocomplete="current-password" required>
    <p v-if="hasErrorPassword" class="registration__input-password">
      Пароль должен содержать 6 символов и минимум 1 цифру
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
  gap: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36rem;
  height: 36rem;
  background-color: rgba(0, 0, 0, 0.753);

  &__input {
    width: 300px;
    height: 40px;
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
    padding-left: 10px;

    &:focus {
      outline: none;
    }

    &-password {
      display: fixed;
      top: 300px;
      position: fixed;
      margin-top: 10px;
      color: $WHITE_COLOR;
      width: 300px;
    }
  }

  &__button {
    width: 300px;
    height: 40px;
    font-size: 1rem;
    margin-top: 50px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $BLACK_COLOR;
    border: 1px solid $WHITE_COLOR;
    background-color: $WHITE_COLOR;
    transition: background-color .2s linear;

    &:hover {
      background-color: $WHITE_COLOR;
    }
  }
}
</style>