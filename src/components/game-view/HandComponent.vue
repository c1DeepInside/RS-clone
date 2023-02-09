<template>
  <div
    :class="['click', { noclick: isShowSelectedCard === false }]"
    @click="setIsShowSelected(false)"
    ref="clickField"
  ></div>
  <div class="board__hand">
    <div class="board__hand-row">
      <div
        class="card__wrap"
        v-for="(item, index) in hand"
        :key="index"
        @click="startAnimate($event)"
        :style="cardMargin"
      >
        <CardInfoComponent :card="item" :layoutType="0" class="card" @click="showCard(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import type Card from '@/interfaces/card';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';

export default defineComponent({
  data() {
    return {};
  },
  methods: {
    showCard(card: Card) {
      this.setSelectedCard(card);
      setTimeout(() => {
        this.setIsShowSelected(true);
      }, 240);
    },
    startAnimate(event: Event) {
      const target = event.currentTarget as HTMLElement;
      target.style.transition = '0.5s';
      target.style.transform = `translate(calc(42vw - ${target.offsetLeft}px + 15vw), -17vw) scale(3)`;
      target.style.opacity = '0';
      const clickField = this.$refs.clickField as HTMLElement;
      clickField.addEventListener(
        'click',
        () => {
          target.style.opacity = '1';
          target.style.transform = `translate(0, 0)`;
        },
        { once: true }
      );
    },
    ...mapActions(useGameStore, {
      setIsShowSelected: 'setIsShowSelected',
      setSelectedCard: 'setSelectedCard',
      removeFromHand: 'removeFromHand',
      addToLine: 'addToLine',
      removeFromLine: 'removeFromLine',
    }),
  },
  computed: {
    ...mapState(useGameStore, {
      hand: 'hand',
      board: 'board',
      selectedCard: 'selectedCard',
      isShowSelectedCard: 'isShowSelected',
    }),
    cardMargin(): string {
      return `margin-left: -${this.hand.length / (8.5 + Math.pow(2.15, -this.hand.length + 15))}vw; left: ${
        this.hand.length / (8.5 + Math.pow(2.15, -this.hand.length + 15)) / 2
      }vw`;
    },
  },
  components: {
    CardInfoComponent,
  },
});
</script>
<style lang="scss" scoped>
.click {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.card__wrap {
  position: relative;
  height: 100%;
  width: 4.5vw;
}
.board__hand {
  margin-top: 1%;
  width: 100%;
  height: 7.1vw;

  .card:hover {
    border-radius: 0.3vw;
    z-index: 1;
    transform: translateY(-0.5vw);
    animation: pulse 1.5s infinite;
  }

  &-row {
    margin-left: 3.3vw;
    display: flex;
    justify-content: center;
    gap: 0.2vw;
    align-items: center;
    width: 93%;
    height: 91%;
    position: relative;
    z-index: 1;

    &:hover {
      background-color: rgba($color: #fe9902, $alpha: 0.1);
      box-shadow: 0px 0px 0px 0.2vw rgba($color: #fe9902, $alpha: 0.6);
    }
  }
}
</style>
