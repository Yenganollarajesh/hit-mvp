import { createRouter, createWebHashHistory } from 'vue-router';
import HomeWrapper from '../views/HomeWrapper.vue';
import LoginWrapper from '../views/LoginWrapper.vue';
import DiscoverUserRoles from '../views/DiscoverUserRoles.vue';
import Aside from '../views/aside.vue';
import DiscoverFeatures from '../views/DiscoverFeatures.vue';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeWrapper,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginWrapper,
    },
    {
      path: '/user',
      name: 'user',
      component: DiscoverUserRoles,
    },
    {
      path: '/aside',
      name: 'aside',
      component: Aside,
    },
    {
      path: '/discoverFeatures',
      name: 'discoverFeatures',
      component: DiscoverFeatures,
    },
  ],
});

export default router;
