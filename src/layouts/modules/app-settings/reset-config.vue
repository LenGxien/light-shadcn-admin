<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/theme';
import { hexToHSL } from '@/lib/utils';

const themeStore = useThemeStore();

// 表单数据的默认值
const defaultFormData = {
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
  tabsStyle: 'chrome',
  scrollMode: 'mainScroll',
};

// 更新CSS变量的统一函数
function updateCSSVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

// 重置配置
function resetConfig() {
  // 设置亮色主题
  setThemeMode('light');

  // 重置CSS类
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.remove('dark-sidebar');
  document.documentElement.classList.remove('gray-mode');
  document.documentElement.classList.remove('color-weak');

  // 重置CSS变量
  updateCSSVariable('--dark-sidebar', '0');
  updateCSSVariable('--gray-mode', '0');
  updateCSSVariable('--color-weak', '0');
  updateCSSVariable('--theme-mode', 'light');

  // 重置主题颜色
  themeStore.setPrimaryColor('#8b5cf6');
  updateCSSVariable('--primary-color', '#8b5cf6');
  const hsl = hexToHSL('#8b5cf6');
  if (hsl) {
    updateCSSVariable('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  }

  // 更新主题相关配置
  themeStore.darkSidebar = defaultFormData.darkSidebar;
  themeStore.grayMode = defaultFormData.grayMode;
  themeStore.colorWeakMode = defaultFormData.colorWeakMode;

  // 更新页面功能配置
  themeStore.updatePageFeatures({
    reloadStrategy: defaultFormData.reloadStrategy,
    pageTransitionEnabled: defaultFormData.pageTransitionEnabled,
    pageTransition: defaultFormData.pageTransition,
    showBreadcrumb: defaultFormData.showBreadcrumb,
    showBreadcrumbIcon: defaultFormData.showBreadcrumbIcon,
    showTabs: defaultFormData.showTabs,
    tabsStyle: defaultFormData.tabsStyle,
    scrollMode: defaultFormData.scrollMode,
  });

  // 保存状态到localStorage
  themeStore.saveState();
}

// 设置主题模式
function setThemeMode(mode) {
  if (mode === 'light') {
    themeStore.isDark = false;
    updateCSSVariable('--theme-mode', 'light');
    document.documentElement.classList.remove('dark');
  }
}
</script>

<template>
  <div class="mt-8 space-y-4">
    <Button class="w-full" @click="resetConfig"> 重置配置 </Button>
  </div>
</template>
