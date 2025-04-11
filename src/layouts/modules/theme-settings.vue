<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Sun, Moon, Monitor } from 'lucide-vue-next';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { ref, computed, watch, onMounted } from 'vue';
import { hexToHSL } from '@/lib/utils';

const themeStore = useThemeStore();

// 主题色彩设置
const primaryColor = ref(themeStore.primaryColor || '#8b5cf6');

// 页面功能配置
const pageFeatures = computed(() => themeStore.pageFeatures);

// 预设颜色选项
const colorPresets = [
  { name: 'Zinc', value: '#71717a' },
  { name: 'Slate', value: '#64748b' },
  { name: 'Stone', value: '#78716c' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Neutral', value: '#737373' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Violet', value: '#8b5cf6' },
];

// 表单数据
const formData = ref({
  darkSidebar: themeStore.darkSidebar,
  grayMode: themeStore.grayMode,
  colorWeakMode: themeStore.colorWeakMode,
  reloadStrategy: pageFeatures.value.reloadStrategy,
  pageTransitionEnabled: pageFeatures.value.pageTransitionEnabled,
  pageTransition: pageFeatures.value.pageTransition,
  showBreadcrumb: pageFeatures.value.showBreadcrumb,
  showBreadcrumbIcon: pageFeatures.value.showBreadcrumbIcon,
  showTabs: pageFeatures.value.showTabs,
  tabsStyle: pageFeatures.value.tabsStyle,
  scrollMode: pageFeatures.value.scrollMode,
  primaryColor: primaryColor.value,
});

// 更新CSS变量的统一函数
function updateCSSVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

// CSS变量配置
const cssVars = {
  boolean: [
    { key: 'darkSidebar', cssVar: '--dark-sidebar' },
    { key: 'grayMode', cssVar: '--gray-mode' },
    { key: 'colorWeakMode', cssVar: '--color-weak' },
    { key: 'pageTransitionEnabled', cssVar: '--transition-enabled' },
  ],
  dimension: [],
  string: [
    { key: 'pageTransition', cssVar: '--transition-type' },
    { key: 'tabsStyle', cssVar: '--tabs-style' },
    { key: 'reloadStrategy', cssVar: '--reload-strategy' },
    { key: 'scrollMode', cssVar: '--scroll-mode' },
  ],
};

// 保存配置到store
function saveConfig() {
  // 更新主题相关配置
  themeStore.darkSidebar = formData.value.darkSidebar;
  themeStore.grayMode = formData.value.grayMode;
  themeStore.colorWeakMode = formData.value.colorWeakMode;

  // 更新页面功能配置
  themeStore.updatePageFeatures({
    reloadStrategy: formData.value.reloadStrategy,
    pageTransitionEnabled: formData.value.pageTransitionEnabled,
    pageTransition: formData.value.pageTransition,
    showBreadcrumb: formData.value.showBreadcrumb,
    showBreadcrumbIcon: formData.value.showBreadcrumbIcon,
    showTabs: formData.value.showTabs,
    tabsStyle: formData.value.tabsStyle,
    scrollMode: formData.value.scrollMode,
  });

  // 保存状态到localStorage
  themeStore.saveState();
}

// 设置监听器
function setupWatchers() {
  // 监听布尔值类型的CSS变量
  cssVars.boolean.forEach(({ key, cssVar }) => {
    watch(
      () => formData.value[key],
      (newValue) => {
        updateCSSVariable(cssVar, newValue ? '1' : '0');
        saveConfig(); // 保存到store
      }
    );
  });

  // 监听字符串类型的CSS变量
  cssVars.string.forEach(({ key, cssVar }) => {
    watch(
      () => formData.value[key],
      (newValue) => {
        updateCSSVariable(cssVar, newValue);
        saveConfig(); // 保存到store
      }
    );
  });

  // 监听主题颜色变化
  watch(
    () => primaryColor.value,
    (newColor) => {
      themeStore.setPrimaryColor(newColor);
      updateCSSVariable('--primary-color', newColor);
      const hsl = hexToHSL(newColor);
      if (hsl) {
        updateCSSVariable('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      }
      saveConfig(); // 保存到store
    },
    { immediate: true }
  );

  // 主题变更监听
  watch(
    () => themeStore.isDark,
    (isDark) => {
      formData.value.darkMode = isDark;
      updateCSSVariable('--theme-mode', isDark ? 'dark' : 'light');
    },
    { immediate: true }
  );

  // 监听页面功能配置变更
  watch(
    () => formData.value.showBreadcrumb,
    (value) => {
      themeStore.updatePageFeatures({ showBreadcrumb: value });
    }
  );

  watch(
    () => formData.value.showBreadcrumbIcon,
    (value) => {
      themeStore.updatePageFeatures({ showBreadcrumbIcon: value });
    }
  );

  watch(
    () => formData.value.showTabs,
    (value) => {
      themeStore.updatePageFeatures({ showTabs: value });
    }
  );

  watch(
    () => formData.value.tabsStyle,
    (value) => {
      themeStore.updatePageFeatures({ tabsStyle: value });
    }
  );

  // 滚动模式监听
  watch(
    () => formData.value.scrollMode,
    (value) => {
      themeStore.updatePageFeatures({ scrollMode: value });
      updateCSSVariable('--scroll-mode', value);
      saveConfig(); // 保存到store
    }
  );

  // 灰度模式监听
  watch(
    () => formData.value.grayMode,
    (value) => {
      if (value) {
        document.documentElement.classList.add('gray-mode');
      } else {
        document.documentElement.classList.remove('gray-mode');
      }
      themeStore.grayMode = value; // 直接更新store
      themeStore.saveState(); // 保存状态
    }
  );

  // 色弱模式监听
  watch(
    () => formData.value.colorWeakMode,
    (value) => {
      if (value) {
        document.documentElement.classList.add('color-weak');
      } else {
        document.documentElement.classList.remove('color-weak');
      }
      themeStore.colorWeakMode = value; // 直接更新store
      themeStore.saveState(); // 保存状态
    }
  );

  // 暗色侧边栏监听
  watch(
    () => formData.value.darkSidebar,
    (value) => {
      if (value) {
        document.documentElement.classList.add('dark-sidebar');
      } else {
        document.documentElement.classList.remove('dark-sidebar');
      }
      themeStore.darkSidebar = value; // 直接更新store
      themeStore.saveState(); // 保存状态
    }
  );
}

// 主题模式
const themeMode = computed(() => (themeStore.isDark ? 'dark' : 'light'));

// 设置主题模式
function setThemeMode(mode) {
  if (mode === 'dark') {
    themeStore.toggleDark();
    updateCSSVariable('--theme-mode', 'dark');
    document.documentElement.classList.add('dark');
  } else if (mode === 'light') {
    themeStore.isDark = false;
    updateCSSVariable('--theme-mode', 'light');
    document.documentElement.classList.remove('dark');
  } else if (mode === 'system') {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeStore.isDark = isDarkMode;
    updateCSSVariable('--theme-mode', isDarkMode ? 'dark' : 'light');
    isDarkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
}

// 选择预设颜色
function selectColor(color) {
  primaryColor.value = color;
}

// 初始化应用所有CSS变量
function initializeThemeVariables() {
  // 应用布尔值类型的CSS变量
  cssVars.boolean.forEach(({ key, cssVar }) => {
    updateCSSVariable(cssVar, formData.value[key] ? '1' : '0');
  });

  // 应用字符串类型的CSS变量
  cssVars.string.forEach(({ key, cssVar }) => {
    updateCSSVariable(cssVar, formData.value[key]);
  });

  // 应用主题模式
  updateCSSVariable('--theme-mode', themeStore.isDark ? 'dark' : 'light');

  // 应用灰度模式和色弱模式的CSS类
  if (formData.value.grayMode) {
    document.documentElement.classList.add('gray-mode');
  } else {
    document.documentElement.classList.remove('gray-mode');
  }

  if (formData.value.colorWeakMode) {
    document.documentElement.classList.add('color-weak');
  } else {
    document.documentElement.classList.remove('color-weak');
  }

  // 应用暗色侧边栏
  if (formData.value.darkSidebar) {
    document.documentElement.classList.add('dark-sidebar');
  } else {
    document.documentElement.classList.remove('dark-sidebar');
  }
}

// 重置配置
function resetConfig() {
  setThemeMode('light');
  formData.value = {
    darkSidebar: false,
    grayMode: false,
    colorWeakMode: false,
    primaryColor: '#8b5cf6',
    reloadStrategy: '关闭页面',
    pageTransition: 'slide',
    pageTransitionEnabled: true,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTabs: true,
    tabsStyle: '谷歌风格',
    scrollMode: 'mainScroll',
  };
  primaryColor.value = '#8b5cf6';
  initializeThemeVariables();
  saveConfig();
}

// 初始化
onMounted(() => {
  initializeThemeVariables();
  setupWatchers();
});
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon">
        <Settings class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-80 sm:w-[400px]">
      <SheetHeader>
        <SheetTitle>主题配置</SheetTitle>
      </SheetHeader>
      <ScrollArea class="h-[calc(100vh-4rem)] pr-3">
        <!-- 主题模式 -->
        <div class="mb-6">
          <Separator class="my-6" label="主题模式" />
          <div class="mt-3 flex justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              class="h-10 w-16"
              :class="{ 'bg-primary text-primary-foreground': themeMode === 'light' }"
              @click="setThemeMode('light')"
              type="button"
            >
              <Sun class="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              class="h-10 w-16"
              :class="{ 'bg-primary text-primary-foreground': themeMode === 'dark' }"
              @click="setThemeMode('dark')"
              type="button"
            >
              <Moon class="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              class="h-10 w-16"
              :class="{ 'bg-primary text-primary-foreground': themeMode === 'system' }"
              @click="setThemeMode('system')"
              type="button"
            >
              <Monitor class="h-5 w-5" />
            </Button>
          </div>
        </div>

        <!-- 系统功能 -->
        <div class="mb-6">
          <Separator class="my-6" label="系统功能" />
          <div class="grid gap-4">
            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">暗色侧边栏</Label>
              <Switch v-model="formData.darkSidebar" />
            </div>

            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">灰度模式</Label>
              <Switch v-model="formData.grayMode" />
            </div>

            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">色弱模式</Label>
              <Switch v-model="formData.colorWeakMode" />
            </div>
          </div>
        </div>

        <!-- 页面功能配置 -->
        <div class="mb-6">
          <Separator class="my-6" label="页面功能" />

          <div class="grid gap-4">
            <!-- 重置缓存策略 -->
            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">重置缓存策略</Label>
              <Select v-model="formData.reloadStrategy">
                <SelectTrigger class="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="关闭页面">关闭页面</SelectItem>
                  <SelectItem value="刷新页面">刷新页面</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- 滚动模式 -->
            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">滚动模式</Label>
              <Select v-model="formData.scrollMode">
                <SelectTrigger class="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainScroll">主体滚动</SelectItem>
                  <SelectItem value="outScroll">外层滚动</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- 页面切换动画 -->
            <div class="flex items-center justify-between space-y-0">
              <Label class="flex-1">页面切换动画</Label>
              <Switch v-model="formData.pageTransitionEnabled" />
            </div>
            <div
              class="flex items-center justify-between space-y-0"
              v-if="formData.pageTransitionEnabled"
            >
              <Label class="flex-1">切换动画类型</Label>
              <Select v-model="formData.pageTransition">
                <SelectTrigger class="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slide">滑动</SelectItem>
                  <SelectItem value="fade">淡入淡出</SelectItem>
                  <SelectItem value="scale">缩放消退</SelectItem>
                  <SelectItem value="fade-bottom">底部消退</SelectItem>
                  <SelectItem value="zoom-fade">渐变</SelectItem>
                  <SelectItem value="zoom-out">闪现</SelectItem>
                  <SelectItem value="none">无</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- 面包屑设置 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between space-y-0">
                <Label class="flex-1">显示面包屑</Label>
                <Switch v-model="formData.showBreadcrumb" />
              </div>
              <div v-if="formData.showBreadcrumb" class="flex items-center justify-between pt-1">
                <Label class="flex-1">面包屑图标</Label>
                <Switch
                  v-model="formData.showBreadcrumbIcon"
                  :disabled="!formData.showBreadcrumb"
                />
              </div>
            </div>

            <!-- 标签栏设置 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between space-y-0">
                <Label class="flex-1">显示标签栏</Label>
                <Switch v-model="formData.showTabs" />
              </div>
              <div v-if="formData.showTabs">
                <div class="flex items-center justify-between space-y-0">
                  <Label class="flex-1">标签栏风格</Label>
                  <Select v-model="formData.tabsStyle" :disabled="!formData.showTabs">
                    <SelectTrigger class="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome">谷歌风格</SelectItem>
                      <SelectItem value="card">卡片风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 主题颜色 -->
        <div class="mb-6">
          <Separator class="my-6" label="主题颜色" />

          <!-- 预设颜色选项 -->
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div
              v-for="color in colorPresets"
              :key="color.value"
              class="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:bg-muted transition-colors"
              :class="{ 'border-primary': primaryColor === color.value }"
              @click="selectColor(color.value)"
            >
              <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: color.value }"></div>
              <span class="text-xs">{{ color.name }}</span>
              <div v-if="primaryColor === color.value" class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-8 space-y-4">
          <Button class="w-full" @click="resetConfig"> 重置配置 </Button>
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>

<style>
:root {
  --transition-duration: 0.3s;
  --dark-sidebar: 0;
  --gray-mode: 0;
  --color-weak: 0;
  --transition-enabled: 1;
  --transition-type: 'slide';
  --tabs-style: '谷歌风格';
  --reload-strategy: '关闭页面';
  --scroll-mode: 'mainScroll';
  --theme-mode: 'light';
}

/* 暗色侧边栏 */
:root[style*='--dark-sidebar:1'] [data-sidebar='sidebar'] {
  --sidebar-background: theme('colors.slate.950');
  --sidebar-foreground: theme('colors.slate.50');
  background-color: var(--sidebar-background) !important;
  color: var(--sidebar-foreground) !important;
}

.dark-sidebar [data-sidebar='sidebar'] {
  --sidebar-background: theme('colors.slate.950');
  --sidebar-foreground: theme('colors.slate.50');
  background-color: var(--sidebar-background) !important;
  color: var(--sidebar-foreground) !important;
}
</style>
