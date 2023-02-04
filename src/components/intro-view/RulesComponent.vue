<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: {
    readRules(isReadRules: boolean): boolean {
      return isReadRules;
    },
  },
});
</script>

<template>
  <div class="rules">
    <h1 class="rules__title">ПРАВИЛА</h1>
    <p>Порядок, в котором ходят игроки, определяется броском монеты</p>
    <p>Игра состоит из двух или трёх раундов. Выигрывает тот, кто победил в двух раундах.</p>
    <p>
      В начале игры каждый игрок берёт по 10 случайных карт из своей колоды. После этого любые две карты можно выкинуть
      и заменить на другие.
    </p>
    <p>
      За ход можно выложить на стол одну карту (но это вовсе не обязательно!). У каждой из этих карт есть показатель
      силы, который суммируется.
    </p>
    <p>
      Раунд продолжается до тех пор, пока не будут использованы все карты или до момента, когда один из игроков не будет
      однозначно доминировать над другим
    </p>
    <p>Для лучшего геймплея, можем посоветовать развернуть игру на полный экран, нажав клавишу F11.</p>
    <button @click="$emit('readRules', true)" class="rules__button">СОЗДАТЬ КОЛОДУ</button>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  gap: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: 39rem;
  color: $GOLDEN_COLOR;
  font-size: 21px;
  line-height: 1.2;
  background-color: rgba(0, 0, 0, 0.753);
  padding: 30px 30px;

  &__title {
    font-size: 26px;
    letter-spacing: 3px;
  }

  &__button {
    width: 300px;
    height: 40px;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 10px;
    color: $BLACK_COLOR;
    border: 1px solid $WHITE_COLOR;
    background-color: rgba(255, 255, 255, 0.767);
    border-radius: 80px;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: $WHITE_COLOR;
    }
  }
}
</style>
