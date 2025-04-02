<script setup lang="ts">
  import { useTabStore } from '@/stores/modules/tab';
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from '@/components/ui/context-menu';
  import { ScrollArea } from '@/components/ui/scroll-area';
  import { computed } from 'vue';
  import { X } from 'lucide-vue-next';

  const tabStore = useTabStore();
  const tabs = computed(() => tabStore.tabs);
  const activeTab = computed(() => tabStore.activeTab);

  const handleCloseTab = (path: string) => {
    tabStore.closeTab(path);
  };

  const handleCloseOtherTabs = (path: string) => {
    tabStore.closeOtherTabs(path);
  };

  const handleCloseLeftTabs = (path: string) => {
    tabStore.closeLeftTabs(path);
  };

  const handleCloseRightTabs = (path: string) => {
    tabStore.closeRightTabs(path);
  };

  const handleCloseAllTabs = () => {
    tabStore.closeAllTabs();
  };
</script>

<template>
  <div class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <ScrollArea class="w-full">
      <div class="flex items-center space-x-1 py-2 px-4">
        <template v-for="tab in tabs" :key="tab.path">
          <ContextMenu>
            <ContextMenuTrigger>
              <router-link :to="tab.path" custom v-slot="{ isActive, href, navigate }">
                <div
                  class="group relative flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer gap-2"
                  :class="{
                    'bg-accent text-accent-foreground': isActive || activeTab === tab.path,
                  }"
                  :href="href"
                  @click="navigate"
                >
                  <i class="i-[mingcute--home-6-line] w-4 h-4" />
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
    </ScrollArea>
  </div>
</template>
