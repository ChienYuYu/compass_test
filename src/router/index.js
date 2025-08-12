import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sp1',
      name: 'sp1',
      component: () => import('../views/SP1/index.vue'),
    },
    {
      path: '/sp2',
      name: 'sp2',
      component: () => import('../views/SP2/index.vue'),
    },
    {
      path: '/sp3',
      name: 'sp3',
      component: () => import('../views/SP3/index.vue'),
    },
    {
      path: '/sp4',
      name: 'sp4',
      component: () => import('../views/SP4/index.vue'),
    },
    {
      path: '/sp5',
      name: 'sp5',
      component: () => import('../views/SP5/index.vue'),
    },
    
  ],
})

export default router
