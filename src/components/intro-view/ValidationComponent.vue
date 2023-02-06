<script lang="ts">
export default {
  emits: {
    validationFinished(isFinished: boolean): boolean {
      return isFinished;
    },
    startRegistration(isRegistration: boolean): boolean {
      return isRegistration;
    }
  }
}
</script>

<template>
  <form class="validation" v-on:submit.prevent>
    <input class="validation__input" type="text" placeholder="Введите свое имя/никнейм" required>
    <input class="validation__input" type="password"
      placeholder="Введите пароль" autocomplete="current-password" required>
    <button @click="$emit('validationFinished', true)" class="validation__button">
      ВОЙТИ
    </button>
    <div @click="$emit('startRegistration', true)" class="validation__link">Зарегистрироваться</div>
  </form>
</template>

<style lang="scss">
  .validation {
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

  &__link {
    margin-top: -30px;
    color: $WHITE_COLOR;
  }

  &__button {
    width: 300px;
    height: 40px;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $BLACK_COLOR;
    border: 1px solid $WHITE_COLOR;
    background-color: rgba(255, 255, 255, 0.781);
    transition: background-color .2s linear;
    border-radius: 80px;

    &:hover {
      background-color: $WHITE_COLOR;
    }
  }
}
</style>