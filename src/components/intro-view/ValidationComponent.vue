<script lang="ts">
export default {
  emits: {
    validationFinished(isFinished: boolean): boolean {
      return isFinished;
    },
    startRegistration(isRegistration: boolean): boolean {
      return isRegistration;
    },
  },
};
</script>

<template>
  <form class="validation" v-on:submit.prevent>
    <input class="validation__input" type="text" placeholder="Введите свое имя/никнейм" required />
    <input
      class="validation__input"
      type="password"
      placeholder="Введите пароль"
      autocomplete="current-password"
      required
    />
    <button @click="$emit('validationFinished', true)" class="validation__button">ВОЙТИ</button>
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
      margin-top: 10px;
      color: white;
      width: 16vw;
    }
  }

  &__link {
    margin-top: -3vw;
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
    transition: background-color 0.2s linear;
    border-radius: 1vw;

    &:hover {
      background-color: white;
    }
  }
}
</style>
