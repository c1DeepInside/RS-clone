<script lang="ts">
import { defineComponent } from 'vue';
import { registration } from '@/api/userAPI';

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
      isLoading: false,
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
      const passwordRegex = /^(?=.*\d).{6,}$/;
      if (!passwordRegex.test(this.inputs.password)) {
        this.errors.hasErrorPassword = true;
      } else {
        this.errors.hasErrorPassword = false;
      }
    },
    async registrationUser() {
      if (this.errors.hasErrorName || this.errors.hasErrorPassword) {
        return;
      }

      this.isLoading = true;

      try {
        await registration(this.inputs.login, this.inputs.password);
        this.$emit('registrationFinished', true);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
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
  <form class="registration" @submit.prevent="registrationUser">
    <div class="registration__inputs">
      <input
        v-model="inputs.login"
        @input="validateName"
        v-bind:class="{ active: inputs.login !== '' && !errors.hasErrorName, error: errors.hasErrorName }"
        class="registration__input"
        type="text"
        placeholder="Введите свое имя/никнейм"
        required
      />

      <p v-if="errors.hasErrorName" class="registration__input-error">Логин должен содержать не менее 4 символов</p>
    </div>
    <div class="registration__inputs">
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

      <p v-if="errors.hasErrorPassword" class="registration__input-error">
        Пароль должен содержать не менее 6 символов и 1 цифры
      </p>
    </div>

    <button class="registration__button" type="submit" :disabled="isLoading">Зарегестрироваться</button>
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
  gap: 2vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 30vw;
  background-color: rgba(0, 0, 0, 0.753);
  &__inputs {
    height: 6vw;
  }
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

    &-error {
      margin-top: 1vw;
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
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $BLACK_COLOR;
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.781);
    border-radius: 80px;
    transition: all 0.2s linear;

    &:hover {
      background-color: white;
    }
    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
