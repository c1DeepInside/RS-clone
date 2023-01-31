import { createRouter, createWebHistory } from 'vue-router';
import IntroView from '../views/IntroView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntroView,
    },
  ],
});

export default router;
