<script setup lang="ts">
import { useTabStore } from '@/stores/modules/tab';
import { useThemeStore } from '@/stores/theme';
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
const themeStore = useThemeStore();

// 获取标签栏风格
const tabsStyle = computed(() => themeStore.pageFeatures.tabsStyle);

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

// 确保仪表盘标签页始终存在，并在页面刷新后设置正确的活动标签
onMounted(() => {
  const dashboardTab = tabs.value.find((tab) => tab.path === '/dashboard');
  if (!dashboardTab) {
    tabStore.addTab({
      path: '/dashboard',
      title: '仪表盘',
      icon: Home,
    });
  }

  // 页面刷新后，根据当前路由路径设置活动标签
  const currentPath = route.path;
  if (currentPath && tabs.value.some((tab) => tab.path === currentPath)) {
    tabStore.activeTab = currentPath;
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
      <div
        class="flex items-center space-x-1 py-2 px-4"
        :class="{ 'chrome-tabs': tabsStyle === 'chrome' }"
      >
        <template v-for="(tab, index) in tabs" :key="tab.path">
          <ContextMenu>
            <ContextMenuTrigger>
              <router-link :to="tab.path" custom v-slot="{ href, navigate }">
                <div
                  class="tab-item group relative flex items-center px-2 py-1.5 text-sm font-medium transition-colors cursor-pointer gap-2"
                  :class="{
                    'chrome-tab': tabsStyle === 'chrome',
                    'tab-active': activeTab === tab.path,
                    'card-tab': tabsStyle !== 'chrome',
                    'is-one': index === 0,
                  }"
                  :href="href"
                  @click="navigate"
                >
                  <component :is="tab.icon" v-if="tab.icon" class="h-4 w-4" />
                  <div class="max-w-240px ellipsis-text mx-1">{{ tab.title }}</div>
                  <button
                    class="ml-1 rounded-sm opacity-70 hover:opacity-100 hover:bg-accent-foreground/20"
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
      <ScrollBar orientation="horizontal" class="mt-1" />
    </ScrollArea>
  </div>
</template>

<style>
/* 通用标签页样式 */
.tab-item {
  position: relative;
  height: 2rem;
  overflow: hidden;
}

/* 谷歌风格标签页 */
.chrome-tabs {
  height: var(--tab-height);
  padding: 0.25rem 0.5rem;
  background-color: hsl(var(--background));
}

.chrome-tab {
  padding: 0px 28px;
  margin: 0 -15px;
  cursor: pointer;
  transition: 0.2s;
  -webkit-mask-box-image: url("data:image/svg+xml,%3Csvg width='62' height='29' viewBox='0 0 62 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M27 0c-6.627 0-12 5.373-12 12v6c0 8.284-6.716 15-15 15h67c-8.284 0-15-6.716-15-15v-6c0-6.627-5.373-12-12-12H27z' fill='%23F8EAE7'/%3E%3C/svg%3E")
    12 27 15;
}

/* 谷歌风格标签页分割线 */
.chrome-tab::after {
  content: '';
  display: block;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  width: 2px;
  background-color: hsl(var(--primary) / 0.7);
  pointer-events: none;
  z-index: 99;
  transition: all 0.5s;
}

/* 隐藏第一个chrome-tab的分割线 */
.chrome-tab.is-one::after,
.chrome-tab.tab-active::after {
  display: none;
}

/* 高亮、hover标签的父级下一个相邻的span */
span:has(> .tab-active) + span > .chrome-tab::after,
.chrome-tab:not(.tab-active):hover::after,
span:has(> .chrome-tab:not(.tab-active):hover) + span > .chrome-tab::after {
  display: none;
}

/* 移除高亮标签页的hover效果 */
.chrome-tab.tab-active {
  /* 降低背景色透明度，使用主题色但透明度降低 */
  background-color: hsl(var(--primary) / 0.2);
  /* 使用主题色作为文本颜色 */
  color: hsl(var(--primary));
  z-index: 99;
}

/* 卡片风格标签页 */
.card-tab {
  border-radius: 0.25rem;
  transition:
    background-color 0.2s,
    color 0.2s;
}

/* 卡片风格标签页高亮状态 */
.card-tab.tab-active {
  /* 降低背景色透明度，使用主题色但透明度降低 */
  background-color: hsl(var(--primary) / 0.2);
  /* 使用主题色作为文本颜色 */
  color: hsl(var(--primary));
}

/* 非高亮卡片的hover效果 */
.card-tab:not(.tab-active):hover,
.chrome-tab:not(.tab-active):hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
</style>
