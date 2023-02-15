<script lang="ts">
import { defineComponent } from 'vue';
import { login } from '@/api/userAPI';

export default defineComponent({
  data() {
    return {
      inputs: {
        login: '',
        password: '',
      },
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = '';
      this.isLoading = true;
      try {
        await login(this.inputs.login, this.inputs.password);
        this.$emit('validationFinished', true);
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Неправильный логин или пароль';
      } finally {
        this.isLoading = false;
      }
    },
  },
  emits: {
    validationFinished(isFinished: boolean): boolean {
      return isFinished;
    },
    startRegistration(isRegistration: boolean): boolean {
      return isRegistration;
    },
  },
});
</script>

<template>
  <form class="validation" @submit.prevent="loginUser">
    <input
      v-model="inputs.login"
      class="validation__input"
      :class="{ error: errorMessage !== '' }"
      type="text"
      placeholder="Введите свое имя/никнейм"
      required
    />
    <input
      v-model="inputs.password"
      class="validation__input"
      :class="{ error: errorMessage !== '' }"
      type="password"
      placeholder="Введите пароль"
      autocomplete="current-password"
      required
    />
    <div>
      <p v-if="errorMessage" class="validation__error">{{ errorMessage }}</p>
    </div>

    <button class="validation__button" type="submit" :disabled="isLoading">
      {{ isLoading ? 'Загрузка...' : 'Войти' }}
    </button>
    <div @click="$emit('startRegistration', true)" class="validation__link">Зарегистрироваться</div>
  </form>
</template>

<style lang="scss" scoped>
.validation {
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
      margin-top: 10px;
      color: white;
      width: 16vw;
    }
  }

  div {
    height: 1vw;
  }

  &__error {
    color: white;
    line-height: 1.2;
    width: 16vw;
    font-size: 0.9vw;
    text-align: center;
  }

  &__link {
    color: white;
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
    transition: all 0.2s linear;
    border-radius: 1vw;

    &:hover {
      background-color: white;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}

.error {
  box-shadow: 0px 0px 30px red;
}
</style>
