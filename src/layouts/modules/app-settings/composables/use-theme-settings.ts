import { useThemeStore } from '@/stores/theme';
import { ref, computed } from 'vue';

// 更新CSS变量的统一函数
export function updateCSSVariable(name: string, value: string | number) {
  document.documentElement.style.setProperty(name, value.toString());
}

// 主题设置组合式函数
export function useThemeSettings() {
  const themeStore = useThemeStore();

  // 主题色彩设置
  const primaryColor = ref(themeStore.primaryColor || '#8b5cf6');

  // 页面功能配置
  const pageFeatures = computed(() => themeStore.pageFeatures);

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

  // CSS变量配置
  const cssVars = {
    boolean: [
      { key: 'darkSidebar', cssVar: '--dark-sidebar' },
      { key: 'grayMode', cssVar: '--gray-mode' },
      { key: 'colorWeakMode', cssVar: '--color-weak' },
    ],
    dimension: [],
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

  // 主题模式
  const themeMode = computed(() => (themeStore.isDark ? 'dark' : 'light'));

  // 设置主题模式
  function setThemeMode(mode: 'dark' | 'light' | 'system') {
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
      tabsStyle: 'chrome',
      scrollMode: 'mainScroll',
    };
    primaryColor.value = '#8b5cf6';
    initializeThemeVariables();
    saveConfig();
  }

  return {
    themeStore,
    primaryColor,
    pageFeatures,
    formData,
    cssVars,
    themeMode,
    saveConfig,
    setThemeMode,
    initializeThemeVariables,
    resetConfig,
    updateCSSVariable,
  };
}
