<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import CardInfoComponent, { CardLayoutType } from '@/components/common/CardInfoComponent.vue';
import SliderComponent from '@/components/common/SliderComponent.vue';
import type Card from '@/interfaces/card';

export default defineComponent({
  data() {
    return {
      ifModal: false,
      cardLayoutType: CardLayoutType,
    };
  },
  emits: {
    selectedLeader: null,
  },
  methods: {
    showModal() {
      document.body.style.overflow = 'hidden';
      this.ifModal = true;
    },
    closeModal(event: Event) {
      if (event.target === event.currentTarget) {
        document.body.style.overflow = '';
        this.ifModal = false;
      }
    },
    changeLeader(data: Card) {
      document.body.style.overflow = '';
      this.ifModal = false;
      this.$emit('selectedLeader', data);
    },
  },
  components: {
    CardInfoComponent,
    SliderComponent,
  },
  props: {
    leader: {
      type: Object as PropType<Card>,
    },
    leadersCards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="leader__img__wrap" v-if="leader" @click="showModal">
    <CardInfoComponent :card="leader" :layout-type="cardLayoutType.EXTENDED" />
  </div>
  <div v-if="ifModal" class="modal" @click="closeModal">
    <div class="modal__content">
      <SliderComponent @cardSelected="changeLeader" :cards="leadersCards" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2;
  background-color: rgba($color: #000000, $alpha: 0.9);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__content {
    margin-top: 8%;
  }
}
.leader__img__wrap {
  width: 7.5vw;
  height: 14.25vw;
  border-radius: 1vw;

  &:hover {
    animation: pulse 2s infinite;
  }
}
</style>
