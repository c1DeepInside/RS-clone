import { createRouter, createWebHistory } from 'vue-router';
import IntroView from '../views/IntroView.vue';
import DeckBuilderView from '../views/DeckBuilderView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntroView,
    },
    {
      path: '/deck',
      name: 'deck',
      component: DeckBuilderView,
    },
  ],
});

export default router;
