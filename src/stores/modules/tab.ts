import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export interface TabItem {
  title: string;
  path: string;
  name: string;
  cached?: boolean;
  icon?: any; // 添加图标字段
}

export const useTabStore = defineStore('tab', () => {
  const router = useRouter();
  const tabs = ref<TabItem[]>([]);
  const activeTab = ref<string>('');

  // 添加标签页
  function addTab(tab: TabItem) {
    const existTab = tabs.value.find((t) => t.path === tab.path);
    if (!existTab) {
      // 如果是首页标签（路径为'/'或''），则插入到数组最前面
      if (tab.path === '/' || tab.path === '') {
        tabs.value.unshift(tab);
      } else {
        tabs.value.push(tab);
      }
      // 对标签进行排序，确保首页始终在第一位
      sortTabs();
    }
    activeTab.value = tab.path;
  }

  // 确保首页标签始终排在第一位
  function sortTabs() {
    tabs.value.sort((a, b) => {
      // 首页标签（路径为'/'或''）始终排在最前面
      if (a.path === '/' || a.path === '') return -1;
      if (b.path === '/' || b.path === '') return 1;
      return 0;
    });
  }

  // 关闭标签页
  function closeTab(path: string) {
    const index = tabs.value.findIndex((tab) => tab.path === path);
    if (index !== -1) {
      tabs.value.splice(index, 1);
      if (activeTab.value === path) {
        // 如果关闭的是当前标签，则切换到最后一个标签
        const lastTab = tabs.value[tabs.value.length - 1];
        if (lastTab) {
          activeTab.value = lastTab.path;
          router.push(lastTab.path);
        }
      }
    }
  }

  // 关闭其他标签页
  function closeOtherTabs(path: string) {
    const currentTab = tabs.value.find((tab) => tab.path === path);
    if (currentTab) {
      tabs.value = [currentTab];
      activeTab.value = currentTab.path;
    }
  }

  // 关闭左侧标签页
  function closeLeftTabs(path: string) {
    const index = tabs.value.findIndex((tab) => tab.path === path);
    if (index > 0) {
      tabs.value = tabs.value.slice(index);
      if (activeTab.value !== path) {
        activeTab.value = path;
        router.push(path);
      }
    }
  }

  // 关闭右侧标签页
  function closeRightTabs(path: string) {
    const index = tabs.value.findIndex((tab) => tab.path === path);
    if (index !== -1 && index < tabs.value.length - 1) {
      tabs.value = tabs.value.slice(0, index + 1);
      if (!tabs.value.find((tab) => tab.path === activeTab.value)) {
        activeTab.value = path;
        router.push(path);
      }
    }
  }

  // 关闭所有标签页
  function closeAllTabs() {
    tabs.value = [];
    router.push('/');
  }

  return {
    tabs,
    activeTab,
    addTab,
    closeTab,
    closeOtherTabs,
    closeLeftTabs,
    closeRightTabs,
    closeAllTabs,
    sortTabs,
  };
});
