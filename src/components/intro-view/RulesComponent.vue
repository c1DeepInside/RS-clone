<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    createDeck() {
      this.$router.push('/deck');
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
      однозначно доминировать над другим.
    </p>
    <button @click="createDeck" class="rules__button">СОЗДАТЬ КОЛОДУ</button>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  gap: 1vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: 30vw;
  color: $GOLDEN_COLOR;
  font-size: 1vw;
  line-height: 1.2;
  background-color: rgba(0, 0, 0, 0.753);
  padding: 1vw 1vw;

  &__title {
    font-size: 2vw;
    letter-spacing: 3px;
    text-align: center;
  }

  &__button {
    width: 16vw;
    height: 2.4vw;
    font-size: 1vw;
    margin: 0 auto;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 1vw;
    color: $BLACK_COLOR;
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.767);
    border-radius: 1vw;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: white;
    }
  }
}
</style>
