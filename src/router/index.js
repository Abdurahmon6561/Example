import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Layoutt from '@/pages/Layoutt.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Orders from '@/pages/Order.vue';
import Clients from '@/pages/Clients.vue';
import Settings from '@/pages/Settings.vue';
import Colect from '@/pages/Colect.vue';
import Catalog from '@/pages/Catalog.vue';

const routes = [
  { path: '/', component: Login },
  {
    path: '/',
    component: Layoutt,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'orders', component: Orders },
      { path: 'catalog', component: Catalog },
      { path: 'clients', component: Clients },
      { path: 'settings', component: Settings },
      { path: 'colect', component: Colect },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
