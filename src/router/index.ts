import { createRouter, createWebHistory } from 'vue-router';
import { useTabStore } from '@/stores/modules/tab';
import {
  Home,
  Table,
  FormInput,
  CreditCard,
  AlertTriangle,
  FileWarning,
  ServerOff,
  Star,
  Settings,
  FileText,
  Rocket,
  Bookmark,
  FileCode,
  Users,
  CreditCard as CreditCard2,
  Gauge,
  SquareTerminal,
  Frame,
  Bot,
  BookOpen,
  Settings2,
} from 'lucide-vue-next';
import type { Component } from 'vue';

export interface RouteMetaType {
  title: string;
  icon?: Component;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  hideInTab?: boolean;
}

export interface AppRouteRecordRaw {
  path: string;
  name?: string;
  meta?: RouteMetaType;
  component?: any;
  redirect?: string;
  children?: AppRouteRecordRaw[];
}

// 通用的占位页面组件
const ComingSoon = () => import('@/views/_builtin/coming-soon/index.vue');

const routes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
      hideInTab: true,
    },
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'playground',
        redirect: '/dashboard',
        meta: {
          title: 'Playground',
          icon: SquareTerminal,
        },
        children: [
          {
            path: '',
            name: 'dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
              title: '仪表盘',
              icon: Home,
            },
          },
          {
            path: 'starred',
            name: 'starred',
            component: ComingSoon,
            meta: {
              title: 'Starred',
              icon: Star,
            },
          },
          {
            path: 'settings',
            name: 'playground-settings',
            component: ComingSoon,
            meta: {
              title: 'Settings',
              icon: Settings,
            },
          },
        ],
      },
      {
        path: 'demo',
        name: 'components-demo',
        redirect: '/demo/table',
        meta: {
          title: '组件示例',
          icon: Frame,
        },
        children: [
          {
            path: 'table',
            name: 'table-demo',
            component: () => import('@/views/demo/TableDemo.vue'),
            meta: {
              title: '表格示例',
              icon: Table,
            },
          },
          {
            path: 'form',
            name: 'form-demo',
            component: () => import('@/views/demo/FormDemo.vue'),
            meta: {
              title: '表单示例',
              icon: FormInput,
            },
          },
          {
            path: 'card',
            name: 'card-demo',
            component: () => import('@/views/demo/CardDemo.vue'),
            meta: {
              title: '卡片示例',
              icon: CreditCard,
            },
          },
        ],
      },
      {
        path: 'error',
        name: 'error-pages',
        redirect: '/error/403',
        meta: {
          title: '异常页',
          icon: Bot,
        },
        children: [
          {
            path: '403',
            name: '403',
            component: () => import('@/views/_builtin/403/index.vue'),
            meta: {
              title: '403',
              icon: AlertTriangle,
            },
          },
          {
            path: '404',
            name: '404',
            component: () => import('@/views/_builtin/404/index.vue'),
            meta: {
              title: '404',
              icon: FileWarning,
            },
          },
          {
            path: '500',
            name: '500',
            component: () => import('@/views/_builtin/500/index.vue'),
            meta: {
              title: '500',
              icon: ServerOff,
            },
          },
        ],
      },
      {
        path: 'docs',
        name: 'documentation',
        redirect: '/docs/introduction',
        meta: {
          title: 'Documentation',
          icon: BookOpen,
        },
        children: [
          {
            path: 'introduction',
            name: 'docs-introduction',
            component: ComingSoon,
            meta: {
              title: 'Introduction',
              icon: FileText,
            },
          },
          {
            path: 'getting-started',
            name: 'docs-getting-started',
            component: ComingSoon,
            meta: {
              title: 'Get Started',
              icon: Rocket,
            },
          },
          {
            path: 'tutorials',
            name: 'docs-tutorials',
            component: ComingSoon,
            meta: {
              title: 'Tutorials',
              icon: Bookmark,
            },
          },
          {
            path: 'changelog',
            name: 'docs-changelog',
            component: ComingSoon,
            meta: {
              title: 'Changelog',
              icon: FileCode,
            },
          },
        ],
      },
      {
        path: 'settings',
        name: 'settings',
        redirect: '/settings/general',
        meta: {
          title: 'Settings',
          icon: Settings2,
        },
        children: [
          {
            path: 'general',
            name: 'settings-general',
            component: ComingSoon,
            meta: {
              title: 'General',
              icon: Settings,
            },
          },
          {
            path: 'team',
            name: 'settings-team',
            component: ComingSoon,
            meta: {
              title: 'Team',
              icon: Users,
            },
          },
          {
            path: 'billing',
            name: 'settings-billing',
            component: ComingSoon,
            meta: {
              title: 'Billing',
              icon: CreditCard2,
            },
          },
          {
            path: 'limits',
            name: 'settings-limits',
            component: ComingSoon,
            meta: {
              title: 'Limits',
              icon: Gauge,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const tabStore = useTabStore();
    // 只添加叶子节点路由到标签页
    if (!to.meta.hideInTab && !to.redirect && to.matched.length > 0) {
      tabStore.addTab({
        title: (to.meta.title as string) || (to.name as string),
        path: to.path,
        name: to.name as string,
        icon: to.meta.icon as Component,
      });
    }
  }
});

export default router;
