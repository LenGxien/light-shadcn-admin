<script setup lang="ts">
  import NavMain from './NavMain.vue';
  import NavProjects from './NavProjects.vue';
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
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
  } from 'lucide-vue-next';

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
  });

  const route = useRoute();
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
    navMain: computed(() => [
      {
        title: 'Playground',
        url: '/',
        icon: SquareTerminal,
        isActive: isMenuActive({
          url: '/',
          items: [{ url: '/' }, { url: '#' }, { url: '#' }],
        }),
        items: [
          {
            title: 'Dashboard',
            url: '/',
          },
          {
            title: 'Starred',
            url: '#',
          },
          {
            title: 'Settings',
            url: '#',
          },
        ],
      },
      {
        title: '异常页',
        url: '#',
        icon: Bot,
        isActive: isMenuActive({
          url: '#',
          items: [{ url: '/403' }, { url: '/404' }, { url: '/500' }],
        }),
        items: [
          {
            title: '403',
            url: '/403',
          },
          {
            title: '404',
            url: '/404',
          },
          {
            title: '500',
            url: '/500',
          },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        isActive: isMenuActive({
          url: '#',
          items: [{ url: '#' }, { url: '#' }, { url: '#' }, { url: '#' }],
        }),
        items: [
          {
            title: 'Introduction',
            url: '#',
          },
          {
            title: 'Get Started',
            url: '#',
          },
          {
            title: 'Tutorials',
            url: '#',
          },
          {
            title: 'Changelog',
            url: '#',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        isActive: isMenuActive({
          url: '#',
          items: [{ url: '#' }, { url: '#' }, { url: '#' }, { url: '#' }],
        }),
        items: [
          {
            title: 'General',
            url: '#',
          },
          {
            title: 'Team',
            url: '#',
          },
          {
            title: 'Billing',
            url: '#',
          },
          {
            title: 'Limits',
            url: '#',
          },
        ],
      },
    ]),
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain.value" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
