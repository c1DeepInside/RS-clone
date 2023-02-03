<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      ifModal: false,
    };
  },
  methods: {
    showModal() {
      this.ifModal = !this.ifModal;
    },
  },
});
</script>

<template>
  <div class="leader__img__wrap" @click="showModal">
    <img class="leader__img" src="src/assets/images/leader.png" alt="лидер" draggable="false" />
  </div>
  <div v-if="ifModal" class="modal" @click="showModal"></div>
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
}
.leader__img__wrap {
  box-sizing: border-box;
  width: 45%;
  border-radius: 2vw;
  .leader__img {
    width: 100%;
    border-radius: 1vw;
    &:hover {
      box-shadow: 0px 0px 0px 3px rgba($color: #fe9902, $alpha: 1);
    }
  }

  &:hover {
    animation: pulse 2s infinite;
  }
}
</style>
