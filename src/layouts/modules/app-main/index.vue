<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTabStore } from '@/stores/modules/tab';
import { useThemeStore } from '@/stores/theme';

withDefaults(defineProps<Props>(), {
  showPadding: true,
});

defineOptions({
  name: 'AppMain',
});

interface Props {
  /** Show padding for content */
  showPadding?: boolean;
}

const tabStore = useTabStore();
const themeStore = useThemeStore();

// 页面动画相关状态
const enableAnimate = computed(() => themeStore.pageFeatures.pageTransitionEnabled);
const animateMode = computed(() => themeStore.pageFeatures.pageTransition);
const transitionName = computed(() => (enableAnimate.value ? animateMode.value : ''));

// 内容区域滚动控制
const contentXScrollable = ref(false);
const setContentXScrollable = (value: boolean) => {
  contentXScrollable.value = value;
};

// 页面重载标志
const reloadFlag = ref(true);

// 缓存路由列表
const cacheRoutes = computed(() => {
  return tabStore.tabs.filter((tab) => tab.cached).map((tab) => tab.name);
});

// 重置滚动位置
function resetScroll() {
  const el = document.querySelector('.sidebar-inset');
  el?.scrollTo({ left: 0, top: 0 });
}

// 获取路由对应的标签ID
function getTabIdByRoute(route: any) {
  return route.path;
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="transitionName"
      mode="out-in"
      @before-leave="setContentXScrollable(true)"
      @after-leave="resetScroll"
      @after-enter="setContentXScrollable(false)"
    >
      <KeepAlive :include="cacheRoutes">
        <component
          :is="Component"
          v-if="reloadFlag"
          :key="getTabIdByRoute(route)"
          :class="{ 'p-4': showPadding }"
          class="flex-grow bg-background transition-all duration-300 h-full b"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
