<script setup lang="ts">
import { useTabStore } from '@/stores/modules/tab';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { computed, onMounted, watch } from 'vue';
import { X, Home } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const tabStore = useTabStore();

// 计算属性：确保仪表盘始终在第一个位置
const tabs = computed(() => {
  const allTabs = tabStore.tabs;
  const dashboardTab = allTabs.find((tab) => tab.path === '/dashboard');
  const otherTabs = allTabs.filter((tab) => tab.path !== '/dashboard');

  return dashboardTab ? [dashboardTab, ...otherTabs] : otherTabs;
});

const activeTab = computed(() => tabStore.activeTab);

// 监听路由变化，自动添加新标签页
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/dashboard') return; // 仪表盘页面不需要添加标签
    const existingTab = tabs.value.find((tab) => tab.path === newPath);
    if (!existingTab) {
      tabStore.addTab({
        path: newPath,
        title: (route.meta.title as string) || '新标签页',
        icon: route.meta.icon as string,
      });
    }
  },
  { immediate: true }
);

// 确保仪表盘标签页始终存在
onMounted(() => {
  const dashboardTab = tabs.value.find((tab) => tab.path === '/dashboard');
  if (!dashboardTab) {
    tabStore.addTab({
      path: '/dashboard',
      title: '仪表盘',
      icon: Home,
    });
  }
});

const handleCloseTab = (path: string) => {
  // 不允许关闭仪表盘标签页
  if (path === '/dashboard') return;
  tabStore.closeTab(path);
};

const handleCloseOtherTabs = (path: string) => {
  // 保留仪表盘标签页
  tabStore.closeOtherTabs(path, ['/dashboard']);
};

const handleCloseLeftTabs = (path: string) => {
  // 保留仪表盘标签页
  tabStore.closeLeftTabs(path, ['/dashboard']);
};

const handleCloseRightTabs = (path: string) => {
  tabStore.closeRightTabs(path);
};

const handleCloseAllTabs = () => {
  // 保留仪表盘标签页
  tabStore.closeAllTabs(['/dashboard']);
};
</script>

<template>
  <div class="border-b bg-background/95 backdrop-blur">
    <ScrollArea class="w-full whitespace-nowrap">
      <div class="flex items-center space-x-1 py-2 px-4">
        <template v-for="tab in tabs" :key="tab.path">
          <ContextMenu>
            <ContextMenuTrigger>
              <router-link :to="tab.path" custom v-slot="{ href, navigate }">
                <div
                  class="group relative flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer gap-2"
                  :class="{
                    'bg-primary text-primary-foreground': activeTab === tab.path,
                  }"
                  :href="href"
                  @click="navigate"
                >
                  <component :is="tab.icon" v-if="tab.icon" class="h-4 w-4" />
                  <span>{{ tab.title }}</span>
                  <button
                    class="ml-1 rounded-sm hover:bg-accent-foreground/20 group-hover:opacity-100"
                    @click.stop="handleCloseTab(tab.path)"
                  >
                    <X class="h-3 w-3" />
                  </button>
                </div>
              </router-link>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem @click="handleCloseTab(tab.path)">关闭标签页</ContextMenuItem>
              <ContextMenuItem @click="handleCloseOtherTabs(tab.path)">
                关闭其他标签页
              </ContextMenuItem>
              <ContextMenuItem @click="handleCloseLeftTabs(tab.path)">
                关闭左侧标签页
              </ContextMenuItem>
              <ContextMenuItem @click="handleCloseRightTabs(tab.path)">
                关闭右侧标签页
              </ContextMenuItem>
              <ContextMenuItem @click="handleCloseAllTabs">关闭所有标签页</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </template>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>
