<script setup lang="ts">
import NavMain from './NavMain.vue';
import NavUser from './NavUser.vue';
import TeamSwitcher from './TeamSwitcher.vue';
import {
  Sidebar,
  type SidebarProps,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import type { AppRouteRecordRaw } from '@/router';
import { GalleryVerticalEnd, AudioWaveform, Command } from 'lucide-vue-next';
import { useThemeStore } from '@/stores/theme';

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
});

const themeStore = useThemeStore();
const isDarkSidebar = computed(() => themeStore.darkSidebar);

const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);

// 检查当前路径是否匹配菜单项或其子项
function isMenuActive(menuItem: any): boolean {
  // 检查当前路径是否与菜单项URL匹配
  if (menuItem.url && menuItem.url !== '#' && currentPath.value.startsWith(menuItem.url)) {
    return true;
  }
  // 检查当前路径是否与子菜单项URL匹配
  if (menuItem.items && menuItem.items.length) {
    return menuItem.items.some(
      (item: any) => item.url && item.url !== '#' && currentPath.value === item.url
    );
  }
  return false;
}

// 将路由转换为菜单项
function convertRoutesToMenuItems(routes: AppRouteRecordRaw[]): any[] {
  return routes
    .filter((route) => !route.meta?.hideInMenu)
    .map((route) => {
      // 构建当前路由的完整路径
      const fullPath = route.path.startsWith('/') ? route.path : `/${route.path}`;

      // 处理子路由
      const childrenItems = route.children
        ? convertRoutesToMenuItems(route.children).map((child) => {
            // 确保子路由路径正确构建
            const childPath = child.url;
            const childFullPath = `${fullPath}/${childPath}`.replace(/\/\//g, '/');

            return {
              ...child,
              url: childFullPath,
            };
          })
        : undefined;

      return {
        title: route.meta?.title || route.name,
        url: fullPath,
        icon: route.meta?.icon,
        isActive: isMenuActive({
          url: fullPath,
          items: childrenItems?.map((item) => ({ url: item.url })) || [],
        }),
        items: childrenItems,
      };
    });
}

// 获取主路由下的子路由作为主导航菜单
const navMain = computed(() => {
  const mainRoute =
    router
      .getRoutes()
      .find((route) => route.path === '/')
      ?.children?.filter((route) => !route.meta?.hideInMenu) || [];
  return convertRoutesToMenuItems(mainRoute);
});

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props" :class="{ 'dark-sidebar': isDarkSidebar }">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
