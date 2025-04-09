<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import AppTab from './modules/app-tab/index.vue';
import AppMain from './modules/app-main/index.vue';
import AppBreadcrumb from './modules/app-breadcrumb/index.vue';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSettings from '@/layouts/modules/theme-settings.vue';
import ThemeToggle from '@/layouts/ThemeToggle.vue';
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const showTabs = computed(() => themeStore.pageFeatures.showTabs);
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="overflow-x-hidden">
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
      <div class="flex flex-1 flex-col gap-4 pt-0">
        <AppMain />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
/* 紧凑模式 */
.compact-mode .h-16 {
  height: 3rem;
}

.compact-mode .h-10 {
  height: 2rem;
}

.compact-mode .p-6 {
  padding: 1rem;
}

.compact-mode .gap-4 {
  gap: 0.5rem;
}

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
</style>
