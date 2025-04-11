<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import AppTab from './modules/app-tab/index.vue';
import AppMain from './modules/app-main/index.vue';
import AppBreadcrumb from './modules/app-breadcrumb/index.vue';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ThemeSettings from '@/layouts/modules/theme-settings.vue';
import ThemeToggle from '@/layouts/ThemeToggle.vue';
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const showTabs = computed(() => themeStore.pageFeatures.showTabs);
const scrollMode = computed(() => themeStore.pageFeatures.scrollMode);

const isMainScroll = computed(() => scrollMode.value === 'mainScroll');

const mainStyle = computed(() => {
  return {
    height: isMainScroll.value
      ? 'calc(100vh - var(--header-height) - var(--tab-height) - 20px)'
      : 'auto',
    overflowY: isMainScroll.value ? 'hidden' : 'auto',
  };
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="overflow-x-hidden" :class="{ 'overflow-y-hidden': isMainScroll }">
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <AppBreadcrumb />
        </div>
        <div class="flex-1" />
        <div class="flex items-center space-x-2 px-4">
          <ThemeToggle />
          <ThemeSettings />
        </div>
      </header>
      <AppTab v-if="showTabs" />
      <ScrollArea class="app-main" :style="mainStyle">
        <AppMain />
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
/* 主题颜色 */
[data-theme='blue'] {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

/* 灰色模式 */
.gray-mode {
  filter: grayscale(1);
}

/* 色弱模式 */
.color-weak {
  filter: grayscale(0.9) opacity(0.95);
}

/* 标签页高度变量 */
:root {
  --header-height: 4rem;
  --tab-height: 2.5rem;
}

/* 解决scroll-area自带的div没填充高度 */
.app-main > div > div {
  height: 100%;
}
</style>
