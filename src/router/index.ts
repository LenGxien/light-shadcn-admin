import { createRouter, createWebHistory } from 'vue-router';
import { useTabStore } from '@/stores/modules/tab';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
        },
        {
          name: '403',
          path: '/403',
          component: () => import('@/views/demo/_builtin/403/index.vue'),
          meta: {
            title: '403',
            hideInMenu: true,
          },
        },
        {
          name: '404',
          path: '/404',
          component: () => import('@/views/demo/_builtin/404/index.vue'),
          meta: {
            title: '404',
            hideInMenu: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const tabStore = useTabStore();
    tabStore.addTab({
      title: (to.meta.title as string) || (to.name as string),
      path: to.path,
      name: to.name as string,
    });
  }
});

export default router;
