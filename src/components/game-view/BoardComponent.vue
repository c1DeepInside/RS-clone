<script lang="ts">
import { defineComponent } from 'vue';
import LineComponent from './LineComponent.vue';
import CardInfoComponent from '@/components/common/CardInfoComponent.vue';

export default defineComponent({
  data() {
    return {
      isShowCard: false,
      selectedItem: -1,
      isEnemy: true,
    };
  },
  methods: {
    showCard(index: number) {
      this.selectedItem = index;
      this.$emit('update:selectedItem', this.selectedItem);
    },
  },
  components: {
    CardInfoComponent,
    LineComponent,
  },
});
</script>

<template>
  <div class="board">
    <div class="field">
      <div class="field__enemy">
        <LineComponent class="field__enemy__siege" :type="isEnemy" />
        <LineComponent class="field__enemy__range" :type="isEnemy" />
        <LineComponent class="field__enemy__melee" :type="isEnemy" />
      </div>
      <div class="field__allies">
        <LineComponent class="field__allies__melee" :type="!isEnemy" />
        <LineComponent class="field__allies__range" :type="!isEnemy" />
        <LineComponent class="field__allies__siege" :type="!isEnemy" />
      </div>
    </div>
    <div class="board__hand">
      <div class="board__hand-row">
        <CardInfoComponent v-for="item in 6" :key="item" @click="showCard(item)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  .field {
    height: 43.5vw;

    &__enemy {
      height: 50%;
      position: relative;
      display: flex;
      flex-direction: column;

      &__siege {
        margin-top: 0.65vw;
      }

      &__range {
        margin-top: 0.4vw;
      }

      &__melee {
        margin-top: 0.75vw;
      }
    }

    &__allies {
      height: 50%;
      position: relative;

      &__siege {
        margin-top: 0.6vw;
      }

      &__range {
        margin-top: 0.5vw;
      }

      &__melee {
        margin-top: 0.75vw;
      }
    }
  }

  &__hand {
    margin-top: 1%;
    width: 100%;
    height: 13%;

    .card:hover {
      border: 0.5px outset $GOLDEN_COLOR;
      border-radius: 0.3vw;
      z-index: 1;
      transform: translateY(-0.5vw);
    }

    &-row {
      margin-left: 3.3vw;
      display: flex;
      justify-content: center;
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
}

.fog {
  background-image: url('@/assets/images/overlay_fog.png');
}
</style>
