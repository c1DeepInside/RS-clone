<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <footer class="footer">
    <div class="logo__wrap">
      <a href="https://rs.school/js/"> <img class="rs-school" src="@/assets/icons/rs-school.svg" alt="" /></a>
      <p class="logo__year">2023</p>
    </div>

    <div class="footer__github-link">
      <svg
        class="footer-github"
        fill="none"
        height="24"
        stroke="rgb(224, 228, 228)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        />
      </svg>
      <a class="link" href="https://github.com/Parazakatafanny">parazakatafanny</a>
    </div>

    <div class="footer__github-link">
      <svg
        class="footer-github"
        fill="none"
        height="24"
        stroke="rgb(224, 228, 228)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        />
      </svg>
      <a class="link" href="https://github.com/c1deepinside">c1deepinside</a>
    </div>

    <div class="footer__github-link">
      <svg
        class="footer-github"
        fill="none"
        height="24"
        stroke="rgb(224, 228, 228)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        />
      </svg>
      <a class="link" href="https://github.com/soblvsk">soblvsk</a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.logo__wrap {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
  .logo__year {
    color: rgb(224, 228, 228);
    font-size: 1.3vw;
  }
}

.link {
  text-decoration: none;
  color: rgb(224, 228, 228);
  text-transform: uppercase;
}

.footer {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 4vw;
  background: rgba(0, 0, 0, 0.377);

  &-github {
    width: 3.5vw;
  }

  &__github-link {
    display: flex;
    gap: 0.1vw;
    align-items: center;
    opacity: 0.7;
    font-size: 1.2vw;
    transition: opacity 0.2s linear;

    &:hover {
      opacity: 1;
    }
  }
}

.rs-school {
  height: 3vw;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
}
</style>
